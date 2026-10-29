/* 829 训练台 v2 · 单文件构建（由 _build/p*.js 合成，勿手改） */
/* ==========================================================================
   829 训练台 v2 · p1 核心：工具 / 存储 / 数据索引 / 学习模型
   ========================================================================== */
(function (A) {
  "use strict";

  /* ---------- 工具 ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  var plain = function (s) {
    var t = String(s == null ? "" : s);
    t = t.replace(/\$\$([\s\S]+?)\$\$/g, " $1 ")
      .replace(/\\\[([\s\S]+?)\\\]/g, " $1 ")
      .replace(/\\\(([\s\S]+?)\\\)/g, " $1 ")
      .replace(/\$([^$\n]+?)\$/g, " $1 ");
    t = t.replace(/\\frac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2")
      .replace(/\\dfrac\s*\{([^{}]*)\}\s*\{([^{}]*)\}/g, "$1/$2")
      .replace(/\\sqrt\s*\{([^{}]*)\}/g, "√$1")
      .replace(/\\times/g, "×").replace(/\\cdot/g, "·")
      .replace(/\\angle/g, "∠").replace(/\\le/g, "≤").replace(/\\ge/g, "≥")
      .replace(/\\Omega/g, "Ω").replace(/\\omega/g, "ω").replace(/\\mu/g, "μ")
      .replace(/\\varphi/g, "φ").replace(/\\phi/g, "φ").replace(/\\theta/g, "θ")
      .replace(/\\alpha/g, "α").replace(/\\beta/g, "β").replace(/\\lambda/g, "λ")
      .replace(/\\tau/g, "τ").replace(/\\pi/g, "π").replace(/\\Delta/g, "Δ")
      .replace(/\\infty/g, "∞").replace(/\\pm/g, "±").replace(/\\approx/g, "≈")
      .replace(/\\neq/g, "≠").replace(/\\circ/g, "°")
      .replace(/\\[a-zA-Z]+/g, "")
      .replace(/\$\$?/g, "")
      .replace(/\\[\[\]()]/g, "")
      .replace(/[{}]/g, "")
      .replace(/\\/g, "")
      .replace(/[ \t\u00a0]+/g, " ")
      .trim();
    return t;
  };
  var lead = function (s, n) { var t = plain(s); return t.length > n ? t.slice(0, n) + "…" : t; };
  var todayStr = function (d) {
    d = d || new Date();
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  };
  var dayDiff = function (a, b) {
    return Math.round((new Date(b + "T00:00:00") - new Date(a + "T00:00:00")) / 86400000);
  };
  var addDays = function (n) {
    var d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n);
    return todayStr(d);
  };
  var num = function (v, dft) { var n = parseFloat(v); return isNaN(n) ? dft : n; };

  /* ---------- 配置：考试日期、每日目标 ---------- */
  var CFG_DEF = { examDate: "2026-12-19", goal: 30 };
  function cfg() {
    var c = (DB && DB.cfg) || {};
    return {
      examDate: c.examDate || CFG_DEF.examDate,
      goal: num(c.goal, CFG_DEF.goal)
    };
  }
  function setCfg(k, v) {
    DB.cfg = DB.cfg || {};
    if (k === "goal") { v = num(v, 0); if (!(v > 0)) return; }
    if (k === "examDate") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(String(v))) return;
    }
    DB.cfg[k] = v;
    save();
  }
  function daysLeft() {
    var c = cfg();
    return dayDiff(todayStr(), c.examDate);
  }

  function tex(s, display) {
    if (window.katex) {
      try {
        return window.katex.renderToString(s, {
          displayMode: !!display, throwOnError: false, strict: false
        });
      } catch (e) { /* fall through */ }
    }
    return "<code>" + esc(s) + "</code>";
  }

  /* Markdown：保护公式 → 转义 → 解析 → 还原公式 */
  function md(src) {
    if (!src) return "";
    var store = [];
    function keep(t, d) { store.push({ t: t, d: d }); return "\u0001" + (store.length - 1) + "\u0002"; }
    src = String(src);
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, function (m, t) { return keep(t.trim(), true); });
    src = src.replace(/\\\[([\s\S]+?)\\\]/g, function (m, t) { return keep(t.trim(), true); });
    src = src.replace(/\\\(([\s\S]+?)\\\)/g, function (m, t) { return keep(t.trim(), false); });
    src = src.replace(/\$([^\$\n]+?)\$/g, function (m, t) { return keep(t.trim(), false); });
    var codes = [];
    src = src.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, function (m, c) {
      codes.push(c); return "\u0003" + (codes.length - 1) + "\u0004";
    });
    src = esc(src);
    var lines = src.split("\n"), out = [], i = 0;
    function inline(s) {
      s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
      s = s.replace(/(^|[^\*])\*([^\*\n]+)\*/g, "$1<em>$2</em>");
      s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
      s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>');
      return s;
    }
    function isBlockStart(l) {
      return /^\s*$/.test(l) || /^#{1,6}\s/.test(l) || /^\s*[-*+]\s+/.test(l) ||
        /^\s*\d+[.)]\s+/.test(l) || /^\s*(?:>|&gt;)\s?/.test(l) || /^\s*\|/.test(l) ||
        /^\s*---+\s*$/.test(l) || /^\s*```/.test(l);
    }
    while (i < lines.length) {
      var line = lines[i];
      if (/^\s*$/.test(line)) { i++; continue; }
      if (/^\s*```/.test(line)) { i++; continue; }
      var h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        var lv = Math.min(h[1].length, 3);
        out.push("<h" + lv + ">" + inline(h[2].trim()) + "</h" + lv + ">");
        i++; continue;
      }
      if (/^\s*---+\s*$/.test(line)) { out.push("<hr>"); i++; continue; }
      if (/^\s*(?:>|&gt;)\s?/.test(line)) {
        var q = [];
        while (i < lines.length && /^\s*(?:>|&gt;)\s?/.test(lines[i])) {
          q.push(lines[i].replace(/^\s*(?:>|&gt;)\s?/, "")); i++;
        }
        out.push("<blockquote>" + inline(q.join("<br>")) + "</blockquote>");
        continue;
      }
      if (/^\s*\|/.test(line)) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        var tb = "<table>";
        rows.forEach(function (r, idx) {
          if (/^[\s\-:|]+$/.test(r) && idx > 0) return;
          var cells = r.trim().replace(/^\|/, "").replace(/\|$/, "").split("|");
          var tag = idx === 0 ? "th" : "td";
          tb += "<tr>" + cells.map(function (c) {
            return "<" + tag + ">" + inline(c.trim()) + "</" + tag + ">";
          }).join("") + "</tr>";
        });
        out.push('<div class="tblwrap">' + tb + '</table></div>');
        continue;
      }
      if (/^\s*[-*+]\s+/.test(line)) {
        var items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(lines[i].replace(/^\s*[-*+]\s+/, "")); i++;
        }
        out.push("<ul>" + items.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ul>");
        continue;
      }
      if (/^\s*\d+[.)]\s+/.test(line)) {
        var oit = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          oit.push(lines[i].replace(/^\s*\d+[.)]\s+/, "")); i++;
        }
        out.push("<ol>" + oit.map(function (x) { return "<li>" + inline(x) + "</li>"; }).join("") + "</ol>");
        continue;
      }
      var para = [];
      while (i < lines.length && !isBlockStart(lines[i])) { para.push(lines[i]); i++; }
      if (para.length) out.push("<p>" + inline(para.join("<br>")) + "</p>");
      else i++;
    }
    var html2 = out.join("\n");
    html2 = html2.replace(/\u0003(\d+)\u0004/g, function (m, n) {
      return "<pre><code>" + esc(codes[+n]) + "</code></pre>";
    });
    html2 = html2.replace(/\u0001(\d+)\u0002/g, function (m, n) {
      var o = store[+n];
      return o.d ? '<div class="katex-display">' + tex(o.t, true) + "</div>" : tex(o.t, false);
    });
    return html2;
  }

  A.$ = $; A.$$ = $$; A.esc = esc; A.plain = plain; A.lead = lead;
  A.todayStr = todayStr; A.dayDiff = dayDiff; A.cfg = cfg; A.setCfg = setCfg; A.daysLeft = daysLeft; A.addDays = addDays; A.num = num;
  A.tex = tex; A.md = md;
  window.MD = md; window.TEX = tex;

  /* ---------- 存储 ---------- */
  var KEY = "kaoyan829.v1";
  var DB = null;

  function blank() {
    return {
      v: 3, q: {}, log: {}, wrong: {}, star: {}, mock: {}, exam: {}, note: {}, read: {}, pos: {}, fs: 0,
      first: todayStr(), tipSeen: 0, sum: {}
    };
  }
  function migrate(o) {
    o = o || {};
    var b = blank();
    o.v = 3;
    o.q = o.q || {};
    o.log = o.log || {};
    o.wrong = o.wrong || {};
    o.star = o.star || {};
    o.mock = o.mock || {};
    o.exam = o.exam || {};
    o.note = o.note || {};
    o.read = o.read || {};
    o.pos = o.pos || {};
    o.first = o.first || b.first;
    o.tipSeen = o.tipSeen || 0;
    /* v1 的 wrong 只有 {at,n}，没有分类：一律记成「不会」 */
    Object.keys(o.wrong).forEach(function (k) {
      var w = o.wrong[k];
      if (!w || typeof w !== "object") { o.wrong[k] = { at: todayStr(), n: 1, kind: "no" }; return; }
      if (!w.kind) w.kind = "no";
      if (!w.n) w.n = 1;
      if (!w.at) w.at = todayStr();
    });
    /* 旧 em 字段挪到 sum（挂起统计），保证结构一致 */
    return o;
  }
  function load() {
    var o = null;
    try { o = JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { o = null; }
    return migrate(o);
  }
  var saveTimer = null;
  function save() {
    if (saveTimer) return;
    saveTimer = setTimeout(function () {
      saveTimer = null;
      try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { }
    }, 120);
  }
  function saveNow() {
    if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }
    try { localStorage.setItem(KEY, JSON.stringify(DB)); return true; }
    catch (e) { return false; }
  }

  DB = load();
  A.DB = DB;
  A.save = save; A.saveNow = saveNow;
  A.reload = function () { DB = A.DB = load(); return DB; };

  /* ---------- 上次刷题位置（断点续做） ---------- */
  function lastPos() {
    var l = DB.last;
    return (l && l.qid && l.total) ? l : null;
  }
  function saveLast() {
    var st = A.ST;
    if (!st || !st.list || !st.list.length) return;
    var q = st.list[st.qi];
    if (!q) return;
    var f = st.flt || {};
    DB.last = {
      qid: q.id, qi: st.qi, total: st.list.length, at: Date.now(),
      flt: { mode: f.mode || "all", kp: f.kp || "", subject: f.subject || "" },
      pin: st.pin || ""
    };
    save();
  }
  A.saveLast = saveLast;
  A.lastPos = lastPos;

  var MODEN = {
    all: "混合刷", due: "待复习", wrong: "重测", star: "收藏",
    new: "没做过", basic: "基础题", hard: "压轴题", random: "随机 10 道", kp: "按考点"
  };
  A.modeName = function (f) {
    f = f || {};
    if (f.mode === "kp") {
      var p = A.KPMAP && A.KPMAP[f.kp];
      return "考点：" + ((p && p.name) || f.kp || "");
    }
    var s = MODEN[f.mode || "all"] || "混合刷";
    if (f.subject) s += " · " + f.subject;
    return s;
  };
  A.agoText = function (ts) {
    if (!ts) return "";
    var d = Math.floor((Date.now() - ts) / 1000);
    if (d < 60) return "刚刚";
    if (d < 3600) return Math.floor(d / 60) + " 分钟前";
    if (d < 86400) return Math.floor(d / 3600) + " 小时前";
    if (d < 172800) return "昨天";
    return Math.floor(d / 86400) + " 天前";
  };

  /* ---------- toast ---------- */
  var toastTimer = null;
  function toast(msg, kind) {
    var el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast"; el.className = "toast";
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.className = "toast on" + (kind ? " " + kind : "");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "toast"; }, 1900);
  }
  A.toast = toast;

  /* ---------- 导入导出 ---------- */
  function exportDB() {
    var payload = { app: "kaoyan829", v: 2, at: new Date().toISOString(), db: DB };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "829备份-" + todayStr() + ".json";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
    toast("已导出备份文件", "ok");
  }
  function importDB(file) {
    var fr = new FileReader();
    fr.onload = function () {
      var o = null;
      try { o = JSON.parse(fr.result); } catch (e) { toast("文件不是合法 JSON", "bad"); return; }
      var d = (o && o.db) ? o.db : o;
      if (!d || !d.q) { toast("这不像是 829 的备份文件", "bad"); return; }
      /* 导入前确认：优先用站内确认框 */
      function doImport() {
        DB = A.DB = migrate(d);
        saveNow(); toast("导入成功", "ok");
        A.render();
      }
      if (A.ask) A.ask("导入会覆盖当前所有记录，确定吗？", doImport, "导入");
      else if (confirm("导入会覆盖当前所有记录，确定吗？")) doImport();
      return;
    };
    fr.readAsText(file);
  }
  /* 错题 / 收藏导出成 CSV（Excel 直接打开） */
  function exportCSV(which) {
    var rows = [["科目", "题号", "类型", "考点", "来源", "题干摘要", "标记", "次数"]];
    var src = which === "star" ? DB.star : DB.wrong;
    Object.keys(src).forEach(function (id) {
      var q = A.QMAP[id]; if (!q) return;
      var w = (which === "star") ? { n: "" } : DB.wrong[id];
      rows.push([
        q.subject || "", q.id, q.type === "choice" ? "选择" : "计算",
        (q.kp || []).map(function (k) { var p = A.KPMAP[k]; return p ? p.name : k; }).join(" / "),
        q.source || "", plain(q.brief || q.stem).slice(0, 120),
        which === "star" ? "收藏" : (w.kind === "fuzzy" ? "不熟悉" : "不会"), w.n || ""
      ]);
    });
    var csv = rows.map(function (r) {
      return r.map(function (c) {
        c = String(c == null ? "" : c);
        return /[",\n]/.test(c) ? '"' + c.replace(/"/g, '""') + '"' : c;
      }).join(",");
    }).join("\r\n");
    var blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (which === "star" ? "829收藏题-" : "829错题本-") + todayStr() + ".csv";
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 800);
    toast("已导出 CSV，可用 Excel 打开", "ok");
  }
  function wipeDB() {
    DB = A.DB = blank();
    saveNow(); toast("记录已清空", "ok"); A.render();
  }
  A.exportDB = exportDB; A.importDB = importDB; A.exportCSV = exportCSV; A.wipeDB = wipeDB;

  /* ---------- 数据索引 ---------- */
  /* 题库分两个数组：QUESTIONS（电路）与 QSIGNAL（信号），这里合并成一个池 */
  var QS = (window.QUESTIONS || []).slice().concat(window.QSIGNAL || []);
  var seen = {}, uniq = [];
  QS.forEach(function (q) {
    if (!q || !q.id || seen[q.id]) return;
    seen[q.id] = 1; uniq.push(q);
  });
  QS = uniq;
  var QMAP = {};
  QS.forEach(function (q) { QMAP[q.id] = q; });

  var EXAMS = window.EXAMS || { problems: [] };
  var EPROB = (EXAMS.problems || []).slice();
  EPROB.forEach(function (p, i) { p._i = i; p.id = p.id || ("Y" + p.year + "-" + p.no); });

  /* ---------- 院校层：真题按学校分开存 ---------- */
  var GUET = window.EXAMS_GUET || { problems: [] };
  var GUETPROB = (GUET.problems || []).slice();
  GUETPROB.forEach(function (p, i) {
    p._i = i; p._school = "guet";
    p.id = p.id || ("G" + (p.year || "") + "-" + (p.no || i));
  });
  EPROB.forEach(function (p) { p._school = "shu"; });

  var SCHOOLS = [
    { id: "shu", name: "上海大学 829", short: "上大 829", list: EPROB, ready: EPROB.length > 0 },
    { id: "guet", name: "桂林电子科技大学 806", short: "桂电 806", list: GUETPROB, ready: GUETPROB.length > 0 }
  ];
  function schoolOf(id) {
    for (var i = 0; i < SCHOOLS.length; i++) if (SCHOOLS[i].id === id) return SCHOOLS[i];
    return SCHOOLS[0];
  }

  var SUBJ = [
    { id: "电路", kp: window.KP_CIRCUIT },
    { id: "信号", kp: window.KP_SIGNAL }
  ];
  var KPMAP = {}, KPLIST = [];
  SUBJ.forEach(function (s) {
    if (!s.kp || !s.kp.chapters) return;
    s.kp.chapters.forEach(function (ch) {
      ch.points.forEach(function (p) {
        p._subj = s.id; p._chapter = ch.name;
        KPMAP[p.id] = p; KPLIST.push(p);
      });
    });
  });
  window.KPMAP = KPMAP;

  var LESSONS = (window.LESSONS || []).slice();
  var LESSON_MAP = {};
  LESSONS.forEach(function (l) { LESSON_MAP[l.id] = l; });

  A.QS = QS; A.QMAP = QMAP; A.EXAMS = EXAMS; A.EPROB = EPROB;
  A.SCHOOLS = SCHOOLS; A.schoolOf = schoolOf; A.GUETPROB = GUETPROB;
  A.SUBJ = SUBJ; A.KPMAP = KPMAP; A.KPLIST = KPLIST; A.LESSONS = LESSONS; A.LESSON_MAP = LESSON_MAP;

  /* 考点 ↔ 讲义 */
  var KP_LESSON = window.KP_LESSON || {};
  var LESSON_KPS = {};
  Object.keys(KP_LESSON).forEach(function (k) {
    var lid = KP_LESSON[k];
    (LESSON_KPS[lid] = LESSON_KPS[lid] || []).push(k);
  });
  A.KP_LESSON = KP_LESSON;
  A.LESSON_KPS = LESSON_KPS;
  A.lessonOfKp = function (k) { return KP_LESSON[k] || null; };
  A.kpsOfLesson = function (id) { return LESSON_KPS[id] || []; };

  /* 考频：这套卷子里该考点出现过几次（近 10 年单列） */
  var FREQ = {}, FREQ10 = {}, TYPE_OF_KP = {};
  EPROB.forEach(function (p) {
    (p.kp || []).forEach(function (k) {
      FREQ[k] = (FREQ[k] || 0) + 1;
      if (p.year >= 2016) FREQ10[k] = (FREQ10[k] || 0) + 1;
      var t = TYPE_OF_KP[k] = TYPE_OF_KP[k] || {};
      t[p.type || "?"] = (t[p.type || "?"] || 0) + 1;
    });
  });
  A.FREQ = FREQ; A.FREQ10 = FREQ10; A.TYPE_OF_KP = TYPE_OF_KP;
  A.freq = function (k) { return FREQ[k] || 0; };
  /* 每个考点的题量（题库） */
  var KN = {};
  QS.forEach(function (q) { (q.kp || []).forEach(function (k) { KN[k] = (KN[k] || 0) + 1; }); });
  A.kpCount = function (k) { return KN[k] || 0; };

  /* ---------- 学习模型 ---------- */
  /* 三档：ok 正确 / fuzzy 不熟悉 / no 不会 */
  var STEPS = [1, 2, 4, 7, 15, 30, 60];

  function record(qid, g) {
    if (!qid || !QMAP[qid]) return;
    var r = DB.q[qid] || { lvl: 0, n: 0, ok: 0, due: todayStr(), last: null };
    r.n++;
    if (g === "ok") {
      r.ok++;
      r.okSeq = (r.okSeq || 0) + 1;
      r.lvl = Math.min((r.lvl || 0) + 1, STEPS.length - 1);
      r.due = addDays(STEPS[r.lvl]);
      /* 连续答对 3 次才真正移出重测，避免蒙对一次就消失 */
      if (r.okSeq >= 3) delete DB.wrong[qid];
    } else {
      r.okSeq = 0;
      r.lvl = 0;
      r.due = addDays(g === "fuzzy" ? 2 : 1);
      var w = DB.wrong[qid] || { at: todayStr(), n: 0 };
      w.n = (w.n || 0) + 1;
      w.kind = (g === "fuzzy") ? "fuzzy" : "no";
      w.at = todayStr();
      DB.wrong[qid] = w;
    }
    r.last = todayStr();
    r.g = g;
    DB.q[qid] = r;

    var d = todayStr();
    var L = DB.log[d] || { n: 0, ok: 0, fuzzy: 0, no: 0 };
    L.n++;
    if (g === "ok") L.ok++;
    else if (g === "fuzzy") L.fuzzy = (L.fuzzy || 0) + 1;
    else L.no = (L.no || 0) + 1;
    DB.log[d] = L;
    save();
  }
  /* 真题自评：真题没有题库条目，单独记在 DB.exam，不参与重测队列 */
  function recordExam(qid, g) {
    if (!qid) return;
    var r = DB.exam[qid] || { n: 0, ok: 0 };
    r.n++;
    if (g === "ok") r.ok++;
    r.g = g;
    r.at = todayStr();
    DB.exam[qid] = r;

    var d = todayStr();
    var L = DB.log[d] || { n: 0, ok: 0, fuzzy: 0, no: 0 };
    L.n++;
    if (g === "ok") L.ok++;
    else if (g === "fuzzy") L.fuzzy = (L.fuzzy || 0) + 1;
    else L.no = (L.no || 0) + 1;
    DB.log[d] = L;
    save();
    return r;
  }
  function examDone(qid) { return !!(DB.exam && DB.exam[qid]); }

  /* 每题个人笔记 */
  function noteGet(qid) { return (DB.note && DB.note[qid]) || ""; }
  function noteSet(qid, txt) {
    if (!qid) return;
    DB.note = DB.note || {};
    txt = String(txt == null ? "" : txt);
    if (txt.trim()) DB.note[qid] = txt; else delete DB.note[qid];
    save();
  }
  function noteCount() { return DB.note ? Object.keys(DB.note).length : 0; }

  /* 讲义阅读进度 */
  function markRead(id) { if (!id) return; DB.read = DB.read || {}; if (!DB.read[id]) { DB.read[id] = 1; save(); } }
  function isRead(id) { return !!(DB.read && DB.read[id]); }
  function readCount() { return DB.read ? Object.keys(DB.read).length : 0; }
  function posGet(id) { return (DB.pos && DB.pos[id]) || 0; }
  function posSet(id, y) {
    if (!id) return;
    DB.pos = DB.pos || {};
    if (y > 40) DB.pos[id] = Math.round(y); else delete DB.pos[id];
    save();
  }

  /* 标记「已经会了」：移出复习周期，但保留历史 */
  function master(qid) {
    var r = DB.q[qid] || { n: 0, ok: 0, lvl: 0 };
    r.master = 1;
    r.lvl = STEPS.length - 1;
    r.due = addDays(180);
    r.last = todayStr();
    DB.q[qid] = r;
    delete DB.wrong[qid];
    save();
    toast("已标记掌握，移出复习队列", "ok");
  }
  function unmaster(qid) {
    var r = DB.q[qid];
    if (r) { delete r.master; r.lvl = 0; r.due = addDays(1); }
    save();
  }
  function toggleStar(qid) {
    if (DB.star[qid]) { delete DB.star[qid]; toast("已取消收藏"); }
    else { DB.star[qid] = todayStr(); toast("已收藏", "ok"); }
    save();
    return !!DB.star[qid];
  }

  /* 待复习：题库里还存在的题，且到期 */
  function dueList() {
    var t = todayStr(), out = [];
    for (var i = 0; i < QS.length; i++) {
      var r = DB.q[QS[i].id];
      if (r && r.due && r.due <= t && !r.master) out.push(QS[i]);
    }
    out.sort(function (a, b) {
      var ra = DB.q[a.id] || {}, rb = DB.q[b.id] || {};
      return String(ra.due || "").localeCompare(String(rb.due || ""));
    });
    return out;
  }
  /* 今日新题/复习的推荐序列：待复习优先，其次没做过的 */
  function todayQueue() {
    var due = dueList();
    var fresh = QS.filter(function (q) { return !DB.q[q.id]; });
    return { due: due, fresh: fresh };
  }

  function todayLog() { return DB.log[todayStr()] || { n: 0, ok: 0, fuzzy: 0, no: 0 }; }
  function streak() {
    var n = 0;
    for (var i = 0; i < 400; i++) {
      var L = DB.log[addDays(-i)];
      if (L && L.n) n++;
      else if (i === 0) continue;   /* 今天还没做不算断 */
      else break;
    }
    return n;
  }
  function progress() {
    var done = 0, okd = 0;
    QS.forEach(function (q) {
      var r = DB.q[q.id];
      if (r && r.n) { done++; if (r.master) okd++; }
    });
    return { done: done, total: QS.length, pct: QS.length ? Math.round(done / QS.length * 100) : 0, mastered: okd };
  }
  function totalN() {
    var n = 0, ok = 0;
    for (var k in DB.log) { n += DB.log[k].n || 0; ok += DB.log[k].ok || 0; }
    return { n: n, ok: ok };
  }
  /* 每日一题：按日期固定挑一道真题风格的计算题 */
  function dailyQ() {
    if (!QS.length) return null;
    var seed = 0, s = todayStr();
    for (var i = 0; i < s.length; i++) seed = (seed * 31 + s.charCodeAt(i)) % 99991;
    var pool = QS.filter(function (q) { return q.type !== "choice"; });
    if (!pool.length) pool = QS;
    return pool[seed % pool.length];
  }

  /* 每日一题：按日期固定挑一道真题（原卷上有电路图，不会出现「没图没法做」） */
  function dailyExam() {
    var all = A.EPROB || [];
    if (!all.length) return null;
    var seed = 0, s = todayStr(), i;
    for (i = 0; i < s.length; i++) seed = (seed * 31 + s.charCodeAt(i)) % 99991;
    var hot = all.filter(function (p) {
      return (p.kp || []).some(function (k) { return (A.FREQ10[k] || 0) >= 3; });
    });
    var pool = hot.length ? hot : all;
    /* 优先有页图的，保证能看到原卷 */
    var withPage = pool.filter(function (p) { return !!p.page; });
    if (withPage.length) pool = withPage;
    return pool[seed % pool.length];
  }
  A.dailyExam = dailyExam;

  A.record = record; A.recordExam = recordExam; A.examDone = examDone; A.noteGet = noteGet; A.noteSet = noteSet; A.noteCount = noteCount;
  A.markRead = markRead; A.isRead = isRead; A.readCount = readCount; A.posGet = posGet; A.posSet = posSet; A.master = master; A.unmaster = unmaster; A.toggleStar = toggleStar;
  A.dueList = dueList; A.dueCount = function () { return dueList().length; };
  A.todayQueue = todayQueue; A.todayLog = todayLog; A.streak = streak;
  A.progress = progress; A.totalN = totalN; A.dailyQ = dailyQ;
  A.isStar = function (id) { return !!DB.star[id]; };

  /* ---------- 主题 / 倒计时 ---------- */
  var THEME = "light";
  function applyTheme(t) {
    THEME = (t === "dark") ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", THEME);
    try { localStorage.setItem("kaoyan829_theme", THEME); } catch (e) { }
    var b = $("#themeBtn");
    if (b) { b.textContent = THEME === "dark" ? "☀" : "◐"; b.title = THEME === "dark" ? "切到浅色" : "切到深色"; }
  }
  A.applyTheme = applyTheme;
  A.THEME = function () { return THEME; };
  A.tick = function () {
    var d = dayDiff(todayStr(), "2026-12-19");
    var el = $("#countdown");
    if (el) el.innerHTML = d > 0 ? '距考试 <b>' + d + '</b> 天' : '考试周';
  };

})(window.A = window.A || {});
/* ==========================================================================
   829 训练台 v2 · p2 刷题引擎（三档自评 / 即时解析 / 真题原卷）
   ========================================================================== */
(function (A) {
  "use strict";
  var esc = A.esc, md = A.md, plain = A.plain, $ = A.$, $$ = A.$$;

  /* ---------- 全局状态 ---------- */
  var ST = {
    tab: "today",
    flt: { mode: "all", subject: "", kp: "", year: 0 },
    qi: 0, list: [], pin: null,
    answered: {},          /* 本轮已看答案的题 id（避免刷新后重复判分） */
    noteTab: "kp", lq: "", nq: "",
    examSchool: "shu",
    examYear: 0, examType: "", examDiff: "", examPart: "", examHot: 0,
    aiq: null,             /* 当前问 AI 的题 */
    zoom: null,            /* 放大查看的图片 */
    kpOpen: false, kpSub: "电路"
  };
  A.ST = ST;

  var TYPE_CN = { choice: "选择", calc: "计算", fill: "填空", proof: "证明", short: "简答" };
  A.TYPE_CN = TYPE_CN;

  function diffStars(d) {
    d = A.num(d, 3);
    var n = Math.max(1, Math.min(5, Math.round(d)));
    var s = "";
    for (var i = 0; i < 5; i++) s += i < n ? "★" : "☆";
    return s;
  }
  function diffName(d) {
    d = A.num(d, 3);
    return d <= 2 ? "基础" : (d === 3 ? "中档" : "压轴");
  }
  A.diffName = diffName;

  /* ---------- 图片（真题原卷 / 题图） ---------- */
  function figHTML(list, alt) {
    if (!list || !list.length) return "";
    var h = '<div class="figs">';
    list.forEach(function (f) {
      var src = /^https?:/.test(f) ? f : ("assets/zt/" + f);
      h += '<button class="fig" data-act="zoom" data-src="' + esc(src) + '" data-alt="' + esc(alt || "") + '">' +
        '<img src="' + esc(src) + '" alt="' + esc(alt || "题图") + '" loading="lazy" decoding="async">' +
        '<span class="fig-tip">点击放大</span></button>';
    });
    return h + '</div>';
  }
  A.figHTML = figHTML;
  function pagesOf(p) {
    /* 一道真题可能跨页：page 之后就近取，最多 2 页 */
    if (!p) return [];
    var a = [];
    if (p.page) a.push("p" + String(p.page).padStart(3, "0") + ".jpg");
    if (p.page2) a.push("p" + String(p.page2).padStart(3, "0") + ".jpg");
    return a;
  }
  A.pagesOf = pagesOf;

  /* ---------- 选题列表 ---------- */
  function buildList() {
    if (ST.pin) {
      var one = A.QMAP[ST.pin];
      ST.list = one ? [one] : [];
      ST.qi = 0;
      return;
    }
    var f = ST.flt, arr = [], i, q;
    for (i = 0; i < A.QS.length; i++) {
      q = A.QS[i];
      if (f.subject && q.subject !== f.subject) continue;
      if (f.kp && (q.kp || []).indexOf(f.kp) < 0) continue;
      arr.push(q);
    }
    if (f.mode === "due") {
      var dueIds = {};
      A.dueList().forEach(function (x) { dueIds[x.id] = 1; });
      arr = arr.filter(function (x) { return dueIds[x.id]; });
    } else if (f.mode === "wrong") {
      arr = arr.filter(function (x) { return A.DB.wrong[x.id]; });
    } else if (f.mode === "star") {
      arr = arr.filter(function (x) { return A.DB.star[x.id]; });
    } else if (f.mode === "new") {
      arr = arr.filter(function (x) { return !A.DB.q[x.id]; });
    } else if (f.mode === "hard") {
      arr = arr.filter(function (x) { return A.num(x.difficulty, 3) >= 4; });
    } else if (f.mode === "basic") {
      arr = arr.filter(function (x) { return A.num(x.difficulty, 3) <= 2; });
    } else if (f.mode === "random") {
      arr = arr.slice();
      for (i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
      arr = arr.slice(0, 10);
    } else if (f.mode === "kp") {
      /* 已由 f.kp 过滤 */
    }
    if (ST.qi >= arr.length) ST.qi = 0;
    ST.list = arr;
  }
  A.buildList = buildList;

  /* ---------- 题目卡片 ---------- */
  function kpChips(q, clickable) {
    var h = "";
    (q.kp || []).forEach(function (k) {
      var p = A.KPMAP[k];
      var name = p ? p.name : k;
      var fq = A.freq(k), fq10 = A.FREQ10[k] || 0;
      var tip = "近十年真题考了 " + fq10 + " 次 · 本考点共 " + A.kpCount(k) + " 道练习题";
      if (clickable) {
        h += '<button class="tag kptag" data-act="kp" data-v="' + esc(k) + '" title="' + esc(tip) + '">' +
          esc(name.length > 14 ? name.slice(0, 14) + "…" : name) + '</button>';
      } else {
        h += '<span class="tag" title="' + esc(tip) + '">' + esc(name) + "</span>";
      }
    });
    return h;
  }
  A.kpChips = kpChips;

  function verdictHTML(q) {
    var a = q.answer;
    if (q.type === "choice" && a != null) {
      return "正确答案 <b>" + "ABCDEF"[a] + "</b>";
    }
    return "";
  }

  /* 答题反馈：解析 + 考点 + 易错点 + 三档自评 */
  var G3 = [
    { g: "ok", t: "正确", s: "✓", cls: "ok", tip: "直接过，按 1/2/4/7/15/30 天复习" },
    { g: "fuzzy", t: "不熟悉", s: "◐", cls: "fuzzy", tip: "做过但有犹豫 → 进重测" },
    { g: "no", t: "不会", s: "✗", cls: "no", tip: "完全没思路 → 进重测" }
  ];
  function feedbackHTML(q, mark) {
    var h = '<div class="fb">';
    if (mark) h += '<div class="fb-verdict">' + mark + "</div>";

    if (q.plain) {
      h += '<div class="fb-sec"><div class="fb-h"><i>💡</i>白话讲解</div><div class="fb-body">' + md(q.plain) + "</div></div>";
    } else {
      /* 没有逐题白话的，用该考点的「这类题怎么想」顶上 */
      var talk = null, tk = (q.kp || [])[0];
      if (tk && window.KP_TALK && window.KP_TALK[tk]) talk = window.KP_TALK[tk];
      if (talk) {
        var kpName = (A.KPMAP[tk] || {}).name || tk;
        h += '<div class="fb-sec fb-talk">' +
          '<div class="fb-h"><i>💡</i>这类题怎么想 · ' + esc(kpName) + "</div>" +
          '<div class="fb-body">' + md(talk[0]) + "</div></div>";
      }
    }
    if (q.solution) {
      h += '<div class="fb-sec"><div class="fb-h"><i>🧮</i>' + (q.plain ? "完整步骤" : "解析") + '</div><div class="fb-body">' + md(q.solution) + "</div></div>";
    }
    if (q.pitfall) {
      h += '<div class="fb-pit"><b>易错点</b>' + md(q.pitfall) + "</div>";
    } else {
      var tk2 = (q.kp || [])[0], t2 = tk2 && window.KP_TALK && window.KP_TALK[tk2];
      if (t2 && t2[1]) h += '<div class="fb-pit"><b>易错点</b>' + md(t2[1]) + "</div>";
    }
    if (q.type !== "choice" && q.answerText) {
      h += '<div class="fb-sec"><div class="fb-h"><i>🎯</i>标准答案</div><div class="fb-body">' + md(q.answerText) + "</div></div>";
    }

    h += '<div class="fb-kp"><span class="fb-kplabel">考什么</span>' + kpChips(q, true) + "</div>";
    h += '<div class="grade3">';
    G3.forEach(function (x) {
      h += '<button class="gbtn ' + x.cls + '" data-act="grade" data-g="' + x.g + '" title="' + esc(x.tip) + '">' +
        '<span class="gs">' + x.s + '</span><span class="gt">' + x.t + "</span></button>";
    });
    h += "</div>";
    h += '<div class="tiny gradehint">正确 → 直接过；不熟悉 / 不会 → 收进「重测」，之后单独刷</div>';
    h += "</div>";
    return h;
  }
  A.feedbackHTML = feedbackHTML;

  function questionCard(q, idx, total) {
    var h = '<div class="qcard">';
    h += '<div class="qtop">';
    h += '<span class="tag ' + (q.subject === "信号" ? "sig" : "cir") + '">' + esc(q.subject) + "</span>";
    h += '<span class="tag t">' + esc(TYPE_CN[q.type] || q.type || "题") + "</span>";
    (q.kp || []).slice(0, 2).forEach(function (k) {
      var p = A.KPMAP[k];
      if (p) h += '<span class="tag">' + esc(p.name.length > 12 ? p.name.slice(0, 12) + "…" : p.name) + "</span>";
    });
    if (q.source) h += '<span class="tag y">' + esc(q.source) + "</span>";
    h += '<span class="tag d" title="难度 ' + esc(A.num(q.difficulty, 3)) + '">' + diffStars(q.difficulty) + "</span>";
    h += '<button class="starbtn' + (A.isStar(q.id) ? " on" : "") + '" data-act="star" data-v="' + esc(q.id) + '" title="收藏这道题">' +
      (A.isStar(q.id) ? "★" : "☆") + "</button>";
    h += "</div>";

    h += '<div class="stem">' + md(q.stem) + "</div>";
    if (q.fig && q.fig.length) h += figHTML(q.fig, "题图");
    h += '<div class="qbody" id="qbody"></div>';
    h += '<div id="qafter"></div>';

    var nt = A.noteGet(q.id);
    h += '<details class="notebox"' + (nt ? " open" : "") + "><summary>📝 我的笔记" +
      '<span class="tiny muted">　' + (nt ? nt.length + " 字 · 自动保存" : "点开写，自动保存") + "</span></summary>" +
      '<textarea id="nq" data-q="' + esc(q.id) + '" placeholder="记这题的坑：漏了哪个条件、公式怎么来的、下次从哪下手…">' +
      esc(nt) + "</textarea></details>";

    if (!ST.pin && total > 1) {
      h += '<div class="qfoot">' +
        '<button class="btn ghost" data-act="prev">‹ 上一题</button>' +
        '<span class="qn">' + (idx + 1) + " / " + total + "</span>" +
        '<button class="btn ghost" data-act="next">下一题 ›</button>' +
        "</div>";
    }
    h += "</div>";
    return h;
  }

  /* 渲染题干下方的选项 / 看答案按钮 */
  function mountBody() {
    var box = $("#qbody");
    if (!box) return;
    var q = ST.list[ST.qi];
    if (!q) return;
    if (q.type === "choice") {
      var h = '<div class="opts">';
      (q.options || []).forEach(function (o, i) {
        h += '<button class="opt" data-act="pick" data-i="' + i + '"><b>' + "ABCDEF"[i] + "</b><span>" + md(o) + "</span></button>";
      });
      h += "</div>";
      box.innerHTML = h;
    } else {
      box.innerHTML = '<button class="btn primary block revealbtn" data-act="reveal">看答案 · 自己判分</button>';
    }
  }
  A.mountBody = mountBody;

  /* 选选项：只揭晓对错，不直接判分（分数交给三按钮） */
  function pickOption(i) {
    var q = ST.list[ST.qi];
    if (!q || q.__picked != null) return;
    q.__picked = i;
    var right = (q.answer == null) ? null : (i === q.answer);
    A.$$("#qbody .opt").forEach(function (b, j) {
      b.classList.add("dim");
      if (q.answer != null && j === q.answer) b.classList.add("right");
      if (j === i && right === false) b.classList.add("wrong");
      if (j === i) b.classList.add("chosen");
    });
    A.$$("#qbody .opt").forEach(function (b) { b.disabled = true; });
    var mark = right === true ? '<span class="ok">你选对了</span>' :
      right === false ? '<span class="bad">选错了</span>' :
        '<span class="muted">已揭晓</span>';
    mark += '　正确答案 <b>' + "ABCDEF"[q.answer == null ? 0 : q.answer] + "</b>";
    var af = $("#qafter");
    if (af) af.innerHTML = feedbackHTML(q, mark);
    A.$("#qbody").classList.add("done");
  }
  A.pickOption = pickOption;

  function revealCalc() {
    var q = ST.list[ST.qi];
    if (!q) return;
    var af = $("#qafter");
    if (!af) return;
    af.innerHTML = feedbackHTML(q, "");
    var rb = $(".revealbtn");
    if (rb) rb.classList.add("off");
  }
  A.revealCalc = revealCalc;

  /* ---------- 刷题视图 ---------- */
  function chipRow(arr, cur, attr) {
    var h = '<div class="chips">';
    arr.forEach(function (p) {
      h += '<button class="chip' + (String(cur) === String(p[0]) ? " on" : "") + '" data-f="' + attr +
        '" data-v="' + esc(p[0]) + '">' + p[1] + "</button>";
    });
    return h + "</div>";
  }

  function kpPicker() {
    var subj = ST.kpSub, h = "";
    var chapters = [];
    A.SUBJ.forEach(function (s) {
      if (s.id !== subj || !s.kp) return;
      chapters = s.kp.chapters;
    });
    h += '<div class="kpsel">';
    A.SUBJ.forEach(function (s) {
      h += '<button class="chip' + (subj === s.id ? " on" : "") + '" data-act="kpsub" data-v="' + esc(s.id) + '">' + esc(s.id) + "</button>";
    });
    h += "</div>";
    chapters.forEach(function (ch) {
      var pts = ch.points.filter(function (p) { return A.kpCount(p.id) > 0; });
      if (!pts.length) return;
      h += '<div class="kpgroup"><div class="kpgt">' + esc(ch.name) + "</div><div class=\'kpg\'>";
      pts.forEach(function (p) {
        var n = A.kpCount(p.id), fq = A.FREQ[p.id] || 0;
        h += '<button class="kpitem' + (ST.flt.kp === p.id ? " on" : "") + '" data-act="pickkp" data-v="' + esc(p.id) + '">' +
          '<span class="kn">' + esc(p.name) + "</span>" +
          '<span class="kc">' + n + " 题" + (fq ? " · 真题 " + fq + " 次" : "") + "</span></button>";
      });
      h += "</div></div>";
    });
    return h + "</div>";
  }

  function vDrill() {
    var f = ST.flt, h = "";

    /* 场景 */
    var scenarios = [
      ["all", "混合刷"], ["due", "待复习 " + A.dueCount()], ["wrong", "重测 " + Object.keys(A.DB.wrong).length],
      ["star", "收藏 " + Object.keys(A.DB.star).length], ["new", "没做过"],
      ["basic", "基础"], ["hard", "压轴"], ["random", "随机 10 道"], ["kp", "按考点"]
    ];
    h += '<div class="chips scrow">';
    scenarios.forEach(function (p) {
      h += '<button class="chip' + (f.mode === p[0] ? " on" : "") + '" data-f="mode" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";

    h += chipRow([["", "全部科目"], ["电路", "电路"], ["信号", "信号"]], f.subject, "subject");

    if (f.mode === "kp") {
      h += '<div class="card kpcard">' + (ST.kpOpen || !f.kp ? kpPicker() : "") + "</div>";
      if (f.kp && A.KPMAP[f.kp]) {
        h += '<div class="kpline">当前考点：<b>' + esc(A.KPMAP[f.kp].name) + "</b> · " + A.kpCount(f.kp) +
          ' 题　<button class="link" data-act="kpreset">换一个</button></div>';
      }
    }

    if (!A.QS.length) return h + '<div class="empty">题库还没装进来。</div>';
    if (!ST.list.length) buildList();
    if (!ST.list.length) {
      return h + '<div class="empty">这个筛选条件下没有题。<br><span class="tiny">换个场景试试</span></div>';
    }

    var n = ST.list.length;
    if (ST.qi >= n) ST.qi = 0;
    var q = ST.list[ST.qi];

    h += '<div class="progress"><i style="width:' + Math.round((ST.qi + 1) / n * 100) + '%"></i></div>';
    h += '<div class="tiny qbar">第 <input id="jump" class="jump" type="number" min="1" max="' + n + '" value="' +
      (ST.qi + 1) + '"> / ' + n + ' 题　<span class="kbdhint">' +
      (q.type === "choice" ? "1-4 选答案" : "空格看答案") + "</span>" +
      '<button class="cardbtn' + (ST.cardOpen ? " on" : "") + '" data-act="card">▤ 答题卡</button></div>';
if (ST.cardOpen) {
      var cOk = 0, cFu = 0, cNo = 0, cNew = 0, grid = "";
      ST.list.forEach(function (qq, i) {
        var r = A.DB.q[qq.id], cls = "ci";
        if (r && r.n) {
          if (r.g === "ok") { cls += " cok"; cOk++; }
          else if (r.g === "fuzzy") { cls += " cfu"; cFu++; }
          else { cls += " cno"; cNo++; }
        } else cNew++;
        if (A.DB.wrong[qq.id]) cls += " cw";
        if (i === ST.qi) cls += " cur";
        grid += '<button class="' + cls + '" data-act="goto" data-v="' + i + '">' + (i + 1) + "</button>";
      });
      h += '<div class="card cardpanel"><div class="h4">答题卡' +
        '<span class="tiny muted">　对 ' + cOk + " · 不熟 " + cFu + " · 不会 " + cNo + " · 未做 " + cNew + "</span></div>" +
        '<div class="cardgrid">' + grid + "</div></div>";
    }

    h += questionCard(q, ST.qi, n);

    if (ST.pin) h += '<div class="row"><button class="btn ghost block" data-act="unpin">‹ 返回题库</button></div>';
    return h;
  }
  A.vDrill = vDrill;

  /* ---------- 真题（原卷 + 分类） ---------- */
  function examFilterChips() {
    var h = '<div class="chips">';
    var types = [["", "全部题型"], ["选择", "选择"], ["填空", "填空"], ["计算", "计算"], ["证明", "证明"], ["简答", "简答"]];
    types.forEach(function (p) {
      h += '<button class="chip' + (ST.examType === p[0] ? " on" : "") + '" data-f="examType" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";
    h += '<div class="chips">';
    [["", "全部难度"], ["1", "基础"], ["2", "中档"], ["3", "压轴"]].forEach(function (p) {
      h += '<button class="chip' + (ST.examDiff === p[0] ? " on" : "") + '" data-f="examDiff" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += '<button class="chip' + (ST.examHot ? " on" : "") + '" data-f="examHot" data-v="' + (ST.examHot ? "0" : "1") + '">只看高频</button>';
    h += "</div>";
    h += '<div class="chips">';
    [["", "电路+信号"], ["电路", "电路"], ["信号", "信号"]].forEach(function (p) {
      h += '<button class="chip' + (ST.examPart === p[0] ? " on" : "") + '" data-f="examPart" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";
    return h;
  }

  function examMatch(p) {
    if (ST.examYear && Number(p.year) !== Number(ST.examYear)) return false;
    if (ST.examQ) {
      var q = String(ST.examQ).toLowerCase();
      var hay = (p.brief || "") + " " + (p.year || "") + " " + (p.no || "") + " " + (p.part || "") + " " + (p.type || "");
      (p.kp || []).forEach(function (k) { hay += " " + ((A.KPMAP[k] || {}).name || ""); });
      if (hay.toLowerCase().indexOf(q) < 0) return false;
    }
    if (ST.examType && (p.type || "") !== ST.examType) return false;
    if (ST.examPart && (p.part || "") !== ST.examPart) return false;
    if (ST.examDiff === "1" && A.num(p.difficulty, 3) > 2) return false;
    if (ST.examDiff === "2" && A.num(p.difficulty, 3) !== 3) return false;
    if (ST.examDiff === "3" && A.num(p.difficulty, 3) < 4) return false;
    if (ST.examHot) {
      var hot = false;
      (p.kp || []).forEach(function (k) { if ((A.FREQ10[k] || 0) >= 3) hot = true; });
      if (!hot) return false;
    }
    return true;
  }

  /* 院校选择条：先选学校，再选年份 */
  function schoolChips() {
    var cur = ST.examSchool || "shu";
    var h = '<div class="chips schoolchips">';
    A.SCHOOLS.forEach(function (s) {
      h += '<button class="chip schoolchip' + (cur === s.id ? " on" : "") + (s.ready ? "" : " wait") +
        '" data-f="school" data-v="' + s.id + '">' + esc(s.short) +
        (s.ready ? "" : '<i class="wtag2">待接入</i>') + "</button>";
    });
    h += "</div>";
    return h;
  }

  function vExam() {
    var h = "";
    var sch = A.schoolOf(ST.examSchool || "shu");
    var all = sch.list;

    h += '<div class="card examhead">';
    h += schoolChips();

    if (!sch.ready) {
      h += '<div class="muted tiny" style="margin-top:10px">' + esc(sch.name) +
        " 的卷子还没接入。拿到可打开的 PDF 后，按年份切好页图放到 assets 里，这里就会出现年份条和题目列表。</div>";
      h += "</div>";
      return h;
    }

    var years = {};
    all.forEach(function (p) { (years[p.year] = years[p.year] || []).push(p); });
    var ys = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });

    var nShown = all.filter(examMatch).length;
    var doneAll = all.filter(function (p) { return A.examDone(p.id); }).length;
    h += '<h3>' + esc(sch.name) + " · " + all.length + " 道真题 · " + ys.length + " 个年份</h3>";
    h += '<div class="tiny muted" style="margin:-2px 0 2px">已自评 ' + doneAll + " / " + all.length + " 道</div>";
    h += '<p class="muted tiny">题干按原卷整理成索引；点「原卷」看当年扫描页，题干和电路图都在上面，改动为零。' +
      "做题时用三档自评，判分由你自己来。</p>";
    /* 年份选择条：全放进来，横滑即可 */
    h += '<div class="yearchips">';
    h += '<button class="chip yearchip' + (!ST.examYear ? " on" : "") + '" data-f="year" data-v="0">全部</button>';
    ys.forEach(function (y) {
      h += '<button class="chip yearchip' + (Number(ST.examYear) === y ? " on" : "") +
        '" data-f="year" data-v="' + y + '">' + y + "</button>";
    });
    h += "</div>";
    h += "</div>";

    h += examFilterChips();
    h += '<div class="searchwrap"><input id="exq" class="searchbox" type="search" placeholder="搜关键词，如 戴维南 / 三相 / 触发器" value="' +
      esc(ST.examQ || "") + '">' +
      (ST.examQ ? '<button class="clr" data-act="examq-clear">✕</button>' : "") + "</div>";
    h += '<div class="tiny muted" style="margin:2px 2px 10px">共 ' + nShown + " 道符合当前筛选</div>";

    ys.forEach(function (y) {
      var list = years[y].filter(examMatch);
      if (!list.length) return;
      var pts = 0;
      list.forEach(function (p) { pts += A.num(p.points, 0); });
      h += '<div class="card examyear" id="ey-' + y + '">';
      h += '<div class="eyhead"><b>' + y + " 年</b><span class='tiny muted'>" + list.length + " 题" +
        (pts ? " · " + pts + " 分" : "") + "</span></div>";
      h += '<div class="exlist">';
      list.forEach(function (p) {
        var done = A.DB.exam[p.id];
        var hot = (p.kp || []).some(function (k) { return (A.FREQ10[k] || 0) >= 3; });
        h += '<div class="exrow' + (done ? " done" : "") + '" data-act="open-exam" data-s="' + esc(p._school || "shu") + '" data-v="' + p._i + '">';
        h += '<div class="exno">' + esc(p.no || "") + "</div>";
        h += '<div class="exmain"><div class="exbrief">' + esc(p.brief || "") + "</div>" +
          '<div class="exmeta"><span class="tag">' + esc(p.part || "") + "</span>" +
          (p.type ? '<span class="tag t">' + esc(p.type) + "</span>" : "") +
          (p.points ? '<span class="tag">' + p.points + " 分</span>" : "") +
          '<span class="tag d">' + diffStars(p.difficulty) + "</span>" +
          (hot ? '<span class="tag hot">高频</span>' : "") +
          (done ? '<span class="tag ok">做过</span>' : "") +
          "</div></div>";
        h += '<div class="exacts"><button class="link" data-act="open-exam" data-s="' + esc(p._school || "shu") + '" data-v="' + p._i + '">原卷 ›</button></div>';
        h += "</div>";
      });
      h += "</div></div>";
    });
    if (!nShown) h += '<div class="empty">这个筛选下没有真题，放宽条件试试。' +
      (ST.examHot ? '<br><span class="tiny">再点一下上面的「只看高频」就能取消。</span>' : "") + "</div>";
    return h;
  }
  A.vExam = vExam;

  /* 单道真题：摘要 + 原卷页 + 三档自评 */
  function vExamOne(i) {
    var p = A.schoolOf(ST.examSchool || "shu").list[i];
    if (!p) return '<div class="empty">没找到这道题</div>';
    var sch = A.schoolOf(p._school || ST.examSchool || "shu");
    var lst = A.schoolOf(ST.examSchool || "shu").list;
    var h = '<div class="row" style="margin-bottom:10px"><button class="btn ghost" data-act="exam-back">‹ 真题列表</button></div>';
    h += '<div class="card">';
    h += '<div class="qtop"><span class="tag y">' + esc(sch.short) + " · " + esc(String(p.year)) + " 年 " + esc(p.no || "") + "</span>" +
      '<span class="tag ' + (p.part === "信号" ? "sig" : "cir") + '">' + esc(p.part || "") + "</span>" +
      (p.type ? '<span class="tag t">' + esc(p.type) + "</span>" : "") +
      (p.points ? '<span class="tag">' + p.points + " 分</span>" : "") +
      '<span class="tag d">' + diffStars(p.difficulty) + "</span></div>";
    h += '<div class="exbrief big">' + esc(p.brief || "") + "</div>";
    h += '<div class="fb-kp"><span class="fb-kplabel">考什么</span>' + kpChips(p, true) + "</div>";
    h += figHTML(pagesOf(p), p.year + " 年原卷");
    h += '<div class="tiny muted">上面是当年原卷扫描页（题干、电路图、数据都在里面）。做完自己判：</div>';
    h += '<div class="grade3">';
    G3.forEach(function (x) {
      h += '<button class="gbtn ' + x.cls + '" data-act="grade-exam" data-v="' + i + '" data-g="' + x.g + '">' +
        '<span class="gs">' + x.s + '</span><span class="gt">' + x.t + "</span></button>";
    });
    h += "</div>";
    h += '<div class="row" style="margin-top:12px;gap:8px">' +
      (i > 0 ? '<button class="btn ghost sm" data-act="open-exam" data-v="' + (i - 1) + '">‹ 上一题</button>' : "") +
      (i < lst.length - 1 ? '<button class="btn ghost sm" data-act="open-exam" data-v="' + (i + 1) + '">下一题 ›</button>' : "") +
      '<span class="tiny muted" style="margin-left:auto">' + (i + 1) + " / " + lst.length + "</span></div>";
    h += "</div>";
    return h;
  }
  A.vExamOne = vExamOne;

  /* ---------- 图片放大 ---------- */
  function openZoom(src, alt) {
    ST.zoom = { src: src, alt: alt || "" };
    var el = document.getElementById("zoom");
    if (!el) {
      el = document.createElement("div");
      el.id = "zoom"; el.className = "zoom";
      el.innerHTML = '<button class="zoom-x" data-act="zoom-close">✕</button><div class="zoom-in"><img id="zoomimg" alt=""></div>';
      document.body.appendChild(el);
    }
    var img = document.getElementById("zoomimg");
    if (img) { img.src = src; img.alt = alt || ""; }
    el.classList.add("on");
    document.body.classList.add("noscroll");
  }
  function closeZoom() {
    var el = document.getElementById("zoom");
    if (el) el.classList.remove("on");
    document.body.classList.remove("noscroll");
    ST.zoom = null;
  }
  A.openZoom = openZoom; A.closeZoom = closeZoom;

})(window.A);
/* ==========================================================================
   829 训练台 v2 · p3 视图：今日 / 讲义 / 公式 / 错题 / 统计
   ========================================================================== */
(function (A) {
  "use strict";
  var esc = A.esc, md = A.md, plain = A.plain, $ = A.$;

  /* ---------- 今日 ---------- */
  function vToday() {
    var t = A.todayStr(), L = A.todayLog(), due = A.dueCount();
    var tot = A.totalN(), pr = A.progress(), sk = A.streak();
    var h = "";

    /* 立即刷题 / 接着上次停的地方 */
    var lp = A.lastPos();
    h += '<div class="card resumecard">';
    if (lp) {
      h += '<div class="restop"><span class="h4">继续上次</span>' +
        '<span class="tiny muted">' + esc(A.agoText(lp.at)) + "</span></div>";
      h += '<div class="tiny muted">' + esc(A.modeName(lp.flt)) + " · 停在 " + (lp.qi + 1) + " / " + lp.total + " 题</div>";
      h += '<button class="btn primary block" data-act="resume">接着刷 · 第 ' + (lp.qi + 1) + " 题</button>";
      h += '<div class="row"><button class="btn ghost sm" data-act="resume-new">换一组新的</button></div>';
    } else {
      h += '<div class="h4">立即刷题</div>';
      h += '<div class="tiny muted">从混合题库开始；答「不熟」或「不会」的自动进重测。</div>';
      h += '<button class="btn primary block" data-act="resume">开始刷题</button>';
    }
    h += "</div>";

    /* 倒计时 + 今日目标 */
    var c = A.cfg(), dl = A.daysLeft(), goal = c.goal || 30;
    var gpct = Math.min(100, Math.round((L.n || 0) / goal * 100));
    h += '<div class="card goalcard">';
    h += '<div class="goalrow"><span class="goalnum">' + (dl > 0 ? dl : 0) + '</span>' +
      '<span class="goaltxt">' + (dl > 0 ? "天后上考场" : dl === 0 ? "今天上考场" : "考试已结束") +
      '<br><i class="tiny muted">' + esc(c.examDate) + "</i></span>" +
      '<span class="goalrate">' + (L.n || 0) + " / " + goal + "</span></div>";
    h += '<div class="pbar thin" style="margin-top:8px"><i style="width:' + gpct + '%"></i><span>今日目标 ' + gpct + "%</span></div>";
    h += "</div>";

    /* 加到桌面（PWA）引导：独立窗口里就不显示了 */
    var standalone = false;
    try {
      standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true;
    } catch (e2) { }
    if (!standalone && !(A.DB.cfg && A.DB.cfg.hidePwa)) {
      var ios = /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
      h += '<div class="card pwatip">' +
        '<div class="h4">装到桌面，断网也能做题</div>' +
        '<div class="tiny muted">' + (ios
          ? "iPhone：点底部「分享」→「添加到主屏幕」。之后从图标直接打开，像 App 一样全屏。"
          : "安卓 Chrome：右上角「⋮」→「添加到主屏幕」／「安装应用」。之后从图标直接打开，断网也能用。") + "</div>" +
        '<div class="row"><button class="btn ghost sm" data-act="pwa-hide">知道了</button></div>' +
        "</div>";
    }

    /* 待复习优先条：符合艾宾浩斯，先把到期的清掉 */
    if (due > 0) {
      h += '<div class="card duecard">';
      h += '<div class="duetop"><span class="duenum">' + due + '</span><span class="duetxt">道题今天该复习</span></div>';
      h += '<div class="tiny muted">按遗忘曲线排的，先清复习再开新题，记得牢。</div>';
      h += '<button class="btn primary block" data-act="start-due">开始复习</button>';
      h += "</div>";
    } else {
      h += '<div class="card donecard">';
      h += '<div class="donetop">✓ 今天的复习清空了</div>';
      h += '<div class="tiny muted">可以开新题，或者把重测里的硬骨头啃一啃。</div>';
      h += '<div class="row"><button class="btn primary" data-act="start-new">做新题</button>' +
        '<button class="btn ghost" data-act="start-wrong">重测</button></div>';
      h += "</div>";
    }

    /* 每日一题：给一道真题，原卷页图直接摆在卡上（题目、电路图都在卷面里） */
    var dq = A.dailyExam();
    if (dq) {
      var pg = A.pagesOf(dq);
      h += '<div class="card daily">';
      h += '<div class="dh"><span class="dtag">每日一题</span><span class="tiny muted">' + esc(String(dq.year)) + " 年" +
        (dq.no ? " · " + esc(dq.no) : "") + (dq.points ? " · " + dq.points + " 分" : "") + "</span></div>";
      h += '<div class="dst">' + md(A.lead(dq.brief || "", 110)) + "</div>";
      if (pg.length) {
        h += '<div class="dthumb">' + A.figHTML(pg.slice(0, 1), "原卷") + "</div>";
        h += '<div class="tiny muted">点缩略图放大；题干和电路图都在原卷扫描页上。</div>';
      }
      h += '<div class="row"><button class="btn primary" data-act="open-exam" data-s="' + esc(dq._school || "shu") + '" data-v="' + dq._i + '">看原卷做题 ›</button></div>';
      h += "</div>";
    }

    /* 今日数据 */
    var rate = L.n ? Math.round(L.ok / L.n * 100) : 0;
    h += '<div class="card">';
    h += '<div class="h4">今天</div>';
    h += '<div class="stats4">';
    h += statBox(L.n, "做题");
    h += statBox(rate + "%", "正确率");
    h += statBox(L.fuzzy || 0, "不熟悉");
    h += statBox(L.no || 0, "不会");
    h += "</div></div>";

    /* 总进度 */
    h += '<div class="card">';
    h += '<div class="h4">总进度</div>';
    h += '<div class="pbar"><i style="width:' + pr.pct + '%"></i><span>' + pr.pct + "%</span></div>";
    h += '<div class="tiny muted" style="margin-top:6px">做过 ' + pr.done + " / " + pr.total + " 题 · 已掌握 " + pr.mastered +
      " 题 · 累计 " + tot.n + " 次 · 连续打卡 " + sk + " 天</div>";
    h += "</div>";

    /* 最近错题 */
    var ws = Object.keys(A.DB.wrong).map(function (id) { return { id: id, w: A.DB.wrong[id] }; })
      .sort(function (a, b) { return String(b.w.at).localeCompare(String(a.w.at)); }).slice(0, 3);
    if (ws.length) {
      h += '<div class="card"><div class="h4">最近的硬骨头</div>';
      ws.forEach(function (x) {
        var q = A.QMAP[x.id]; if (!q) return;
        h += '<div class="wrow" data-act="open-q" data-q="' + esc(x.id) + '">' +
          '<span class="wtag ' + (x.w.kind === "fuzzy" ? "fz" : "no") + '">' + (x.w.kind === "fuzzy" ? "不熟" : "不会") + "</span>" +
          '<span class="wtxt">' + esc(A.lead(q.stem, 42)) + "</span></div>";
      });
      h += '<button class="btn ghost block" data-act="start-wrong">全部重测 ›</button></div>';
    }

    /* 备份提醒：数据只在浏览器里 */
    h += '<div class="card tipcard">';
    h += '<div class="h4">数据只存在这台设备</div>';
    h += '<div class="tiny muted">清缓存 / 换设备就没了。建议每周导出一次备份。</div>';
    h += '<div class="row"><button class="btn ghost sm" data-act="export">导出备份</button>' +
      '<button class="btn ghost sm" data-act="import">导入备份</button></div>';
    h += "</div>";
    return h;
  }
  A.vToday = vToday;

  function statBox(v, label) {
    return '<div class="sbox"><b>' + v + "</b><span>" + label + "</span></div>";
  }

  /* ---------- 讲义（科目 → 章节 → 考点/课程） ---------- */
  function chaptersOf(subj) {
    var out = [];
    A.SUBJ.forEach(function (s) {
      if (subj && s.id !== subj) return;
      if (!s.kp || !s.kp.chapters) return;
      s.kp.chapters.forEach(function (ch) { ch._subj = s.id; out.push(ch); });
    });
    return out;
  }

  function lessonCountForChapter(ch) {
    var ids = {};
    ch.points.forEach(function (p) { ids[p.id] = 1; });
    return A.LESSONS.filter(function (l) {
      for (var i = 0; i < ch.points.length; i++) {
        if (String(l.md || "").indexOf(ch.points[i].id) >= 0) return true;
      }
      return false;
    }).length;
  }

  function vNotes() {
    var h = "";
    var subj = A.ST.nsubj || "";
    h += '<div class="chips subjchips">';
    [["", "全部"], ["电路", "电路"], ["信号", "信号"]].forEach(function (p) {
      h += '<button class="chip' + (subj === p[0] ? " on" : "") + '" data-act="nsubj" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += '<button class="chip alt" data-act="formula">∑ 公式速查</button>';
    h += "</div>";

    h += '<div class="chips">';
    [["kp", "考点"], ["lesson", "课程讲义"], ["exam", "真题地图"]].forEach(function (p) {
      h += '<button class="chip' + (A.ST.noteTab === p[0] ? " on" : "") + '" data-nt="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";

    if (A.ST.noteTab === "lesson") return h + lessonListHTML(subj);
    if (A.ST.noteTab === "exam") return h + examMapHTML();

    /* 考点：按章节分组，带考情 */
    h += '<input class="search" id="kpsearch" placeholder="搜考点 / 关键词，比如 拉普拉斯、戴维南" value="' + esc(A.ST.nq || "") + '">';
    h += '<div id="kplist">' + kpListHTML(subj) + "</div>";
    return h;
  }
  A.vNotes = vNotes;

  function kpListHTML(subj) {
    var q = (A.ST.nq || "").trim().toLowerCase();
    var h = "";
    chaptersOf(subj).forEach(function (ch) {
      var pts = ch.points.filter(function (p) {
        if (!q) return true;
        var hay = (p.name + " " + p.id + " " + (p.keys || []).join(" ")).toLowerCase();
        return hay.indexOf(q) >= 0;
      });
      if (!pts.length) return;
      h += '<div class="chblock"><div class="chhead"><b>' + esc(ch.name) + "</b>" +
        '<span class="tiny muted">' + esc(ch._subj) + " · " + pts.length + " 个考点</span></div>";
      pts.forEach(function (p) {
        var fq10 = A.FREQ10[p.id] || 0, fq = A.FREQ[p.id] || 0, n = A.kpCount(p.id);
        var r = A.DB.q["__kp__" + p.id];
        h += '<details class="kp" data-kp="' + esc(p.id) + '">';
        h += '<summary><span class="kpname">' + esc(p.name) + "</span>" +
          '<span class="kpm">' + (fq10 ? '<i class="hot">近十年 ' + fq10 + " 次</i>" : "") +
          '<i class="cnt">练习 ' + n + "</i></span></summary>";
        h += '<div class="body">';
        h += '<div class="kptip">' + (fq ? "真题里出现过 " + fq + " 次" : "真题里没单独考过，但属于基础") +
          (p.keys && p.keys.length ? " · 关键词：" + esc(p.keys.join("、")) : "") + "</div>";
        if (p.formulas && p.formulas.length) {
          h += '<div class="kpf">';
          p.formulas.forEach(function (f) { h += "<div>" + md(f) + "</div>"; });
          h += "</div>";
        }
        h += '<div class="row">' +
          '<button class="btn sm" data-act="drill-kp" data-v="' + esc(p.id) + '">练这个考点 (' + n + ")</button>" +
          '<button class="btn ghost sm" data-act="find-lesson" data-v="' + esc(p.id) + '">看讲义</button>' +
          "</div>";
        h += "</div></details>";
      });
      h += "</div>";
    });
    if (!h) h = '<div class="empty">没找到这个考点。</div>';
    return h;
  }

  function lessonListHTML(subj) {
    var q = (A.ST.lq || "").trim().toLowerCase();
    var h = '<input class="search" id="lssearch" placeholder="搜讲义标题 / 内容" value="' + esc(A.ST.lq || "") + '">';
    h += '<div id="lslist">';
    var groups = {};
    A.LESSONS.forEach(function (l) {
      if (subj && l.subject !== subj) return;
      if (q) {
        var hay = (l.title + " " + (l.summary || "") + " " + l.subject).toLowerCase();
        if (hay.indexOf(q) < 0) return;
      }
      (groups[l.subject || "其他"] = groups[l.subject || "其他"] || []).push(l);
    });
    Object.keys(groups).forEach(function (k) {
      var rd = groups[k].filter(function (l) { return A.isRead(l.id); }).length;
      h += '<div class="chhead"><b>' + esc(k) + "</b><span class='tiny muted'>" + groups[k].length +
        " 讲" + (rd ? " · 已读 " + rd : "") + "</span></div>";
      groups[k].forEach(function (l) {
        var words = l.md ? String(l.md).length : 0;
        var sum = (l.summary || "").trim();
        h += '<div class="lessonrow" data-act="lesson" data-v="' + esc(l.id) + '">' +
          '<div class="lt">' + esc(l.title) + (A.isRead(l.id) ? '<span class="readmark">✓</span>' : "") + "</div>" +
          '<div class="ls">' + esc(sum || words + " 字") + "</div></div>";
      });
    });
    if (!Object.keys(groups).length) h += '<div class="empty">没找到。</div>';
    return h + "</div>";
  }

  /* 真题地图：按考点看考频 */
  function examMapHTML() {
    var P = A.EPROB;
    var h = '<div class="card"><h3>' + P.length + " 道真题" + "</h3>" +
      '<p class="tiny muted">按考点统计考频，高频的优先攻。</p></div>';
    var rows = A.KPLIST.map(function (p) {
      return { p: p, n: A.FREQ[p.id] || 0, n10: A.FREQ10[p.id] || 0 };
    }).filter(function (x) { return x.n > 0; }).sort(function (a, b) { return b.n10 - a.n10 || b.n - a.n; });
    var top = rows.length ? (rows[0].n10 || rows[0].n) : 1;
    h += '<div class="card">';
    rows.slice(0, 40).forEach(function (r) {
      var w = Math.max(6, Math.round((r.n10 || r.n) / top * 100));
      h += '<div class="heatrow" data-act="drill-kp" data-v="' + esc(r.p.id) + '">' +
        '<span class="heatname">' + esc(r.p.name) + "</span>" +
        '<span class="heatbar"><i style="width:' + w + '%"></i></span>' +
        '<span class="heatn">' + r.n10 + " / " + r.n + "</span></div>";
    });
    h += '<div class="tiny muted">左边数字＝近十年考了几次 / 总共几次。点一行直接练这个考点。</div>';
    h += "</div>";
    return h;
  }

  /* ---------- 公式速查 ---------- */
  function vFormula() {
    var q = (A.ST.fq || "").trim().toLowerCase();
    var h = '<div class="row" style="margin-bottom:10px"><button class="btn ghost" data-act="formula-back">‹ 返回</button></div>';
    h += '<input class="search" id="fsearch" placeholder="搜公式：卷积、拉氏、戴维南、谐振…" value="' + esc(A.ST.fq || "") + '">';
    h += '<div id="flist">' + formulaList(q) + "</div>";
    return h;
  }
  A.vFormula = vFormula;

  function formulaList(q) {
    var F = window.FORMULAS || [];
    if (!F.length) return '<div class="empty">公式库还没装进来。</div>';
    var h = "", last = "";
    F.forEach(function (f) {
      var hay = (f.ch + " " + f.name + " " + (f.tags || []).join(" ") + " " + f.tex).toLowerCase();
      if (q && hay.indexOf(q) < 0) return;
      if (f.ch !== last) { h += '<div class="chhead"><b>' + esc(f.ch) + "</b></div>"; last = f.ch; }
      h += '<div class="fmlcard"><div class="fname">' + esc(f.name) + "</div>" +
        '<div class="fml">' + md(f.tex) + "</div>" + "</div>";
    });
    return h || '<div class="empty">没找到这个公式。</div>';
  }

  /* ---------- 错题 / 重测 ---------- */
  function vWrong() {
    var tab = A.ST.wtab || "all";
    var ids = Object.keys(A.DB.wrong);
    var star = Object.keys(A.DB.star);
    var no = ids.filter(function (id) { return (A.DB.wrong[id].kind || "no") === "no"; });
    var fz = ids.filter(function (id) { return A.DB.wrong[id].kind === "fuzzy"; });

    var h = "";
    h += '<div class="card"><h3>重测题库</h3>' +
      '<p class="tiny muted">答「不熟悉」或「不会」的题自动进来；连续答对 3 次才移出。</p>' +
      '<div class="row"><button class="btn primary" data-act="start-wrong">全部重测 (' + ids.length + ")</button>" +
      '<button class="btn ghost" data-act="export-csv">导出 CSV</button></div></div>';

    h += '<div class="chips">';
    [["all", "全部 " + ids.length], ["no", "不会 " + no.length], ["fuzzy", "不熟悉 " + fz.length], ["star", "收藏 " + star.length]]
      .forEach(function (p) {
        h += '<button class="chip' + (tab === p[0] ? " on" : "") + '" data-act="wtab" data-v="' + p[0] + '">' + p[1] + "</button>";
      });
    h += "</div>";

    var list;
    if (tab === "star") list = star.map(function (id) { return { id: id, w: { kind: "star", n: "" } }; });
    else if (tab === "no") list = no.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });
    else if (tab === "fuzzy") list = fz.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });
    else list = ids.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });

    list = list.filter(function (x) { return !!A.QMAP[x.id]; });
    list.sort(function (a, b) { return String(b.w.at || "").localeCompare(String(a.w.at || "")); });

    if (!list.length) return h + '<div class="empty">这里还是空的。<br><span class="tiny">做题时点「不熟悉」或「不会」就会收进来。</span></div>';

    h += '<div class="card">';
    list.forEach(function (x) {
      var q = A.QMAP[x.id];
      var r = A.DB.q[x.id] || {};
      h += '<div class="wcard">';
      h += '<div class="wtop"><span class="wtag ' + (x.w.kind === "fuzzy" ? "fz" : x.w.kind === "star" ? "st" : "no") + '">' +
        (x.w.kind === "fuzzy" ? "不熟" : x.w.kind === "star" ? "收藏" : "不会") + "</span>" +
        '<span class="tag ' + (q.subject === "信号" ? "sig" : "cir") + '">' + esc(q.subject) + "</span>" +
        (x.w.n ? '<span class="tiny muted">错 ' + x.w.n + " 次</span>" : "") +
        '<span class="tiny muted">' + (r.due ? "下次 " + r.due : "") + "</span></div>";
      h += '<div class="wstem" data-act="open-q" data-q="' + esc(x.id) + '">' + esc(A.lead(q.stem, 90)) + "</div>";
      h += '<div class="row">' +
        '<button class="btn sm" data-act="open-q" data-q="' + esc(x.id) + '">重做</button>' +
        '<button class="btn ghost sm" data-act="master" data-v="' + esc(x.id) + '">已经会了</button>' +
        '<button class="btn ghost sm" data-act="unstar" data-v="' + esc(x.id) + '">' + (A.isStar(x.id) ? "取消收藏" : "收藏") + "</button>" +
        "</div>";
      h += "</div>";
    });
    h += "</div>";
    return h;
  }
  A.vWrong = vWrong;

  /* ---------- 统计 ---------- */
  function vStats() {
    var tot = A.totalN(), pr = A.progress(), sk = A.streak(), c = A.cfg();
    var h = "";

    h += '<div class="card">';
    h += '<div class="stats4">' +
      statBox(tot.n, "累计做题") +
      statBox(tot.n ? Math.round(tot.ok / tot.n * 100) + "%" : "—", "总正确率") +
      statBox(sk, "连续打卡") +
      statBox(pr.pct + "%", "完成度") +
      "</div>";
    h += '<div class="pbar thin"><i style="width:' + pr.pct + '%"></i><span>' + pr.done + " / " + pr.total + "</span></div>";
    h += "</div>";

    /* 14 天 */
    var days = [], maxN = 1;
    for (var i = 13; i >= 0; i--) {
      var d = A.addDays(-i), L = A.DB.log[d] || { n: 0, ok: 0 };
      days.push({ d: d, n: L.n, ok: L.ok });
      if (L.n > maxN) maxN = L.n;
    }
    h += '<div class="card"><div class="h4">近 14 天</div><div class="bars">';
    days.forEach(function (x) {
      var hp = x.n ? Math.max(6, Math.round(x.n / maxN * 100)) : 2;
      var op = x.n ? Math.round(x.ok / x.n * 100) : 0;
      h += '<div class="bar" title="' + x.d + "：" + x.n + " 题，正确 " + op + '%">' +
        '<i style="height:' + hp + '%;opacity:' + (x.n ? 1 : 0.25) + '"></i>' +
        '<span>' + x.d.slice(5).replace("-", "/") + "</span></div>";
    });
    h += "</div></div>";

    /* 章节正确率 */
    h += '<div class="card"><div class="h4">各章正确率</div>';
    var rows = [];
    A.SUBJ.forEach(function (s) {
      if (!s.kp) return;
      s.kp.chapters.forEach(function (ch) {
        var ids = {};
        ch.points.forEach(function (p) { ids[p.id] = 1; });
        var n = 0, ok = 0;
        A.QS.forEach(function (q) {
          var r = A.DB.q[q.id]; if (!r || !r.n) return;
          var hit = (q.kp || []).some(function (k) { return ids[k]; });
          if (!hit) return;
          n += r.n; ok += r.ok;
        });
        if (n) rows.push({ name: ch.name, subj: s.id, n: n, rate: Math.round(ok / n * 100) });
      });
    });
    rows.sort(function (a, b) { return a.rate - b.rate; });
    if (!rows.length) h += '<div class="tiny muted">还没数据，做几道题就有了。</div>';
    rows.forEach(function (r) {
      h += '<div class="secrow"><span class="secname">' + esc(r.name) + "</span>" +
        '<span class="secbar"><i style="width:' + r.rate + '%;background:' + (r.rate >= 70 ? "#2f9e63" : r.rate >= 50 ? "#c98a1b" : "#c0392b") + '"></i></span>' +
        '<span class="seccount">' + r.rate + "% · " + r.n + " 次</span></div>";
    });
    h += "</div>";

    /* 薄弱考点 + 去补练 */
    var kpStat = {};
    A.QS.forEach(function (q) {
      var r = A.DB.q[q.id]; if (!r || !r.n) return;
      (q.kp || []).forEach(function (k) {
        var s = kpStat[k] = kpStat[k] || { n: 0, ok: 0 };
        s.n += r.n; s.ok += r.ok;
      });
    });
    var weak = Object.keys(kpStat).filter(function (k) { return kpStat[k].n >= 2; })
      .map(function (k) { return { k: k, rate: kpStat[k].ok / kpStat[k].n, n: kpStat[k].n }; })
      .filter(function (x) { return x.rate < 0.7; })
      .sort(function (a, b) { return a.rate - b.rate; }).slice(0, 8);

    h += '<div class="card"><div class="h4">薄弱考点</div>';
    if (!weak.length) h += '<div class="tiny muted">暂时没有薄弱的，保持。</div>';
    weak.forEach(function (w) {
      var p = A.KPMAP[w.k] || { name: w.k };
      h += '<div class="secrow"><span class="secname">' + esc(p.name) + "</span>" +
        '<span class="seccount">' + Math.round(w.rate * 100) + "% · " + w.n + " 次</span>" +
        '<button class="btn sm" data-act="drill-kp" data-v="' + esc(w.k) + '">去补练</button></div>';
    });
    h += "</div>";

    /* 笔记总览 */
    var nk = Object.keys(A.DB.note || {});
    h += '<div class="card"><div class="h4">我的笔记 <span class="tiny muted">' + nk.length + " 条</span></div>";
    if (!nk.length) {
      h += '<div class="tiny muted">刷题时每道题下面都能写笔记，写完会汇总到这里。</div>';
    } else {
      h += "<details" + (nk.length <= 6 ? " open" : "") + "><summary class=\"tiny\">展开笔记列表</summary>";
      nk.slice().reverse().forEach(function (id) {
        var q = A.QMAP[id];
        if (!q) return;
        h += '<div class="noterow"><div class="nrq">' + esc(A.lead(q.stem, 40)) + "</div>" +
          '<div class="nrt">' + esc(A.lead(A.noteGet(id), 70)) + "</div>" +
          '<button class="link" data-act="open-q" data-v="' + esc(id) + '">去做 ›</button></div>';
      });
      h += "</details>";
    }
    h += "</div>";

    /* AI 答疑（可选） */
    var hasKey = false;
    try { hasKey = !!localStorage.getItem("kaoyan829.aikey"); } catch (e) { }
    h += '<div class="card"><div class="h4">AI 答疑 <span class="tiny muted">' + (hasKey ? "已设置 Key" : "未设置（可选）") + "</span></div>";
    if (hasKey) {
      h += '<div class="tiny muted">刷题时右下角 ✦ 就能问，会带上当前这道题。回答只花你自己的额度。</div>' +
        '<div class="row"><button class="btn sm" data-act="askai">打开问 AI</button></div>';
    } else {
      h += '<ol class="ailist">' +
        "<li>打开 platform.deepseek.com 注册，实名后送一点额度（够问很多题）。</li>" +
        "<li>左侧「API keys」→ 新建，复制以 sk- 开头的那串。</li>" +
        "<li>回到本页右下角 ✦，把 Key 粘进去点保存，只存在这台手机上。</li>" +
        "</ol>" +
        '<div class="tiny muted">不想弄 Key 也完全不影响做题，只是没有 AI 讲解。</div>' +
        '<div class="row"><button class="btn ghost sm" data-act="askai">我先看看长什么样</button></div>';
    }
    h += "</div>";

    /* 数据管理 */
    h += '<div class="card"><div class="h4">设置</div>' +
      '<div class="cfgrow"><label for="cfgd">考试日期</label>' +
      '<input type="date" id="cfgd" value="' + esc(c.examDate) + '"></div>' +
      '<div class="cfgrow"><label for="cfgg">每日目标</label>' +
      '<input type="number" id="cfgg" min="5" max="300" step="5" value="' + (c.goal || 30) + '"><span class="tiny muted">题</span></div>' +
      "</div>";

    h += '<div class="card"><div class="h4">数据</div>' +
      '<div class="tiny muted">记录只存在这台设备的浏览器里。换设备或清缓存前先导出。</div>' +
      '<div class="row"><button class="btn sm" data-act="export">导出备份</button>' +
      '<button class="btn ghost sm" data-act="import">导入备份</button>' +
      '<button class="btn ghost sm" data-act="export-csv">导出错题 CSV</button></div>' +
      '<div class="row"><button class="btn danger sm" id="wipeBtn" data-act="wipe">清空所有记录</button></div>' +
      "</div>";
    h += '<div class="tiny muted center" style="margin:18px 0">829 训练台 · 电路 + 信号　本地离线可用</div>';
    return h;
  }
  A.vStats = vStats;

  /* ---------- 讲义单页 ---------- */
  function vLesson(id) {
    var L = A.LESSON_MAP[id];
    if (!L) return '<div class="empty">没找到这一讲。</div>';
    var sib = A.LESSONS.filter(function (x) { return x.subject === L.subject; });
    var k = sib.indexOf(L);
    var prev = k > 0 ? sib[k - 1] : null;
    var next = (k >= 0 && k < sib.length - 1) ? sib[k + 1] : null;

    var h = '<div class="lsbar"><button class="btn ghost sm" data-act="lesson-back">‹ 讲义</button>' +
      '<span class="fsbtns"><button class="fsb" data-act="fs" data-v="-1">A−</button>' +
      '<button class="fsb" data-act="fs" data-v="1">A+</button></span>' +
      (A.isRead(L.id) ? '<span class="tiny muted">✓ 已读</span>' : "") + "</div>";
    h += '<article class="lessonpage fs' + (A.DB.fs || 0) + '">' + md(L.md) + "</article>";
    var kps = A.kpsOfLesson(L.id);
    if (kps.length) {
      h += '<div class="card" style="margin-top:14px"><div class="h4">本讲对应考点</div><div class="chips">';
      kps.forEach(function (k) {
        var kp = A.KPMAP[k] || {};
        h += '<button class="chip" data-act="drill-kp" data-v="' + esc(k) + '">' + esc(kp.name || k) + "</button>";
      });
      h += '</div><div class="tiny muted">点考点直接去练这个考点。</div>';
      /* 本讲相关的真题：直接翻到原卷那一页 */
      var hits = [];
      (A.EPROB || []).forEach(function (p, i) {
        var ks = p.kp || [], hit = false;
        for (var j = 0; j < ks.length; j++) if (kps.indexOf(ks[j]) >= 0) { hit = true; break; }
        if (hit) hits.push({ i: i, p: p });
      });
      if (hits.length) {
        h += '<div class="h4" style="margin-top:12px">本讲考过的真题 <span class="tiny muted">' + hits.length + ' 道</span></div>';
        hits.slice(0, 8).forEach(function (x) {
          h += '<button class="exrow" data-act="open-exam" data-v="' + x.i + '" data-s="shu">' +
            '<b>' + esc(String(x.p.year)) + "</b>" +
            '<span class="exno">' + esc(x.p.no || "") + "</span>" +
            '<span class="exbrief tiny muted">' + esc(A.lead(A.plain(x.p.brief || ""), 24)) + "</span>" +
            "</button>";
        });
        if (hits.length > 8) h += '<div class="tiny muted">只列最近 8 道，去「真题」页按年份、考点筛更多。</div>';
      }
      h += "</div>";
    }
    h += '<div class="row" style="margin-top:18px">';
    if (prev) h += '<button class="btn ghost" data-act="lesson" data-v="' + esc(prev.id) + '">‹ ' + esc(A.lead(prev.title, 12)) + "</button>";
    if (next) h += '<button class="btn ghost" data-act="lesson" data-v="' + esc(next.id) + '">' + esc(A.lead(next.title, 12)) + " ›</button>";
    h += "</div>";
    return h;
  }
  A.vLesson = vLesson;

})(window.A);
/* ==========================================================================
   829 训练台 v2 · p4 应用外壳：路由 / 导航 / 事件 / 问 AI
   ========================================================================== */
(function (A) {
  "use strict";
  var esc = A.esc, md = A.md, $ = A.$, $$ = A.$$, ST = A.ST;

  var TABS = [
    { id: "today", t: "今日", i: "◎", view: A.vToday },
    { id: "drill", t: "刷题", i: "✎", view: A.vDrill },
    { id: "exam", t: "真题", i: "▤", view: A.vExam },
    { id: "notes", t: "讲义", i: "▥", view: A.vNotes },
    { id: "wrong", t: "重测", i: "↺", view: A.vWrong },
    { id: "stats", t: "我的", i: "▦", view: A.vStats }
  ];
  var SUB = A.SUBVIEW || (A.SUBVIEW = { lesson: null, formula: 0, examone: -1, examschool: "shu" });

  /* 当前院校的真题数组里取第 i 道 */
  function examAt(i) {
    return A.schoolOf(SUB.examschool || ST.examSchool || "shu").list[i];
  }

  function currentView() {
    if (SUB.lesson) return { id: "lesson", html: A.vLesson(SUB.lesson) };
    if (SUB.formula) return { id: "formula", html: A.vFormula() };
    if (SUB.examone >= 0) return { id: "examone", html: A.vExamOne(SUB.examone) };
    var t = ST.tab || "today";
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].id === t) return { id: t, html: TABS[i].view() };
    }
    return { id: "today", html: A.vToday() };
  }

  /* ---------- 渲染 ---------- */
  var lastView = "";
  function render() {
    var v = currentView();
    var box = $("#view");
    if (!box) return;
    var y = window.scrollY;
    box.innerHTML = v.html;
    if (v.id !== lastView) window.scrollTo(0, 0);
    else if (y < 200) window.scrollTo(0, 0);
    lastView = v.id;
    paintNav(v.id);
    A.tick();
    if (v.id === "drill") {
      A.mountBody();
      if (ST.__answered) restoreAnswered();
      /* 记住停在哪，供「今日 → 立即刷题」接着做 */
      if (ST.list && ST.list.length) A.saveLast();
    }
    hookSearch();
    if (window.renderMathInElement) { /* katex 已经嵌在 md 里 */ }
  }
  A.render = function () { render(); };
  A.render = render;

  function paintNav(id) {
    $$("#nav .ntab").forEach(function (b) {
      var on = b.getAttribute("data-tab") === id;
      b.classList.toggle("on", on);
    });
  }

  /* 已经答过的当前题：重绘时恢复反馈区 */
  function restoreAnswered() {
    var q = ST.list[ST.qi];
    if (!q) return;
    var key = q.id + "#" + (ST.__stamp || "");
    if (ST.answered[key]) {
      var af = $("#qafter");
      if (af && !af.innerHTML) {
        af.innerHTML = A.feedbackHTML(q, ST.answered[key]);
        var rb = $(".revealbtn"); if (rb) rb.classList.add("off");
      }
    }
  }

  /* ---------- 路由 ---------- */
  function go(tab) {
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1;
    ST.tab = tab;
    if (tab === "drill") { ST.pin = null; A.buildList(); }
    render();
  }
  A.go = go;

  /* ---------- 搜索框防抖 ---------- */
  var searchTimer = null;
  function hookSearch() {
    [["#kpsearch", "nq", "kplist"], ["#lssearch", "lq", "lslist"], ["#fsearch", "fq", "flist"]].forEach(function (p) {
      var el = $(p[0]);
      if (!el) return;
      el.addEventListener("input", function () {
        ST[p[1]] = el.value;
        if (searchTimer) clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          render();
          var e2 = $(p[0]);
          if (e2) { e2.focus(); e2.setSelectionRange(e2.value.length, e2.value.length); }
        }, 260);
      });
    });
    var jp = $("#jump");
    if (jp) {
      jp.addEventListener("change", function () {
        var n = parseInt(jp.value, 10);
        if (n > 0 && n <= ST.list.length) { ST.qi = n - 1; render(); }
      });
    }
  }

  /* ---------- 事件 ---------- */
  var ACT = {};
  function on(name, fn) { ACT[name] = fn; }

  /* 今日 */
  on("start-due", function () { ST.flt.mode = "due"; ST.flt.kp = ""; ST.pin = null; go("drill"); });
  on("start-new", function () { ST.flt.mode = "new"; go("drill"); });

  /* 今日页：接着上次 / 换一组新的 */
  on("resume", function () {
    var l = A.lastPos();
    if (!l) { ST.flt.mode = "all"; ST.flt.kp = ""; ST.qi = 0; go("drill"); return; }
    var f = l.flt || {};
    ST.flt.mode = f.mode || "all";
    ST.flt.kp = f.kp || "";
    ST.flt.subject = f.subject || "";
    go("drill");                                  /* 会 buildList 并按 flt 重排 */
    if (l.pin) { ST.pin = l.pin; A.buildList(); } /* pin = 单题回看，需在 go 之后恢复 */
    var idx = -1, i;
    for (i = 0; i < ST.list.length; i++) if (ST.list[i].id === l.qid) { idx = i; break; }
    ST.qi = idx >= 0 ? idx : Math.min(l.qi || 0, Math.max(0, ST.list.length - 1));
    render();
    A.toast("接着上次：第 " + (ST.qi + 1) + " 题", "ok");
  });
  on("resume-new", function () {
    ST.flt.mode = "all"; ST.flt.kp = ""; ST.flt.subject = ""; ST.pin = null;
    ST.qi = 0;
    go("drill");
  });
  on("start-wrong", function () { ST.flt.mode = "wrong"; go("drill"); });
  on("open-q", function (el) {
    var id = el.getAttribute("data-q");
    if (!A.QMAP[id]) return;
    ST.pin = id; ST.tab = "drill"; A.buildList();
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1;
    render();
  });

  /* 讲义 */
  on("nsubj", function (el) { ST.nsubj = el.getAttribute("data-v"); render(); });
  on("formula", function () { SUB.formula = 1; render(); });
  on("formula-back", function () { SUB.formula = 0; render(); });
  on("drill-kp", function (el) {
    var k = el.getAttribute("data-v");
    ST.flt.mode = "kp"; ST.flt.kp = k; ST.flt.subject = "";
    ST.pin = null; go("drill");
  });
  on("find-lesson", function (el) {
    var k = el.getAttribute("data-v");
    var hit = A.LESSONS.filter(function (l) { return String(l.md || "").indexOf(k) >= 0; });
    if (!hit.length) { A.toast("这一讲的讲义里没单独写它，去题库练更直接", "warn"); return; }
    ST.noteTab = "lesson"; ST.lq = hit[0].title.slice(0, 6);
    SUB.lesson = hit[0].id; render();
  });
  function openLesson(id) {
    go("notes");              /* go 会清空 SUB，必须先 go 再设 */
    SUB.lesson = id;
    A.markRead(id);
    render();
    window.scrollTo(0, 0);
  }

  on("lesson", function (el) {
    var id = el.getAttribute("data-v");
    SUB.lesson = id;
    A.markRead(id);
    render();
    window.scrollTo(0, A.posGet(id));
  });
  on("lesson-back", function () { SUB.lesson = null; render(); window.scrollTo(0, 0); });

  /* 讲义字号 */
  on("fs", function (el) {
    var d = parseInt(el.getAttribute("data-v"), 10) || 0;
    var v = (A.DB.fs || 0) + d;
    if (v < -1) v = -1;
    if (v > 2) v = 2;
    A.DB.fs = v; A.save();
    var y = window.scrollY;
    render();
    window.scrollTo(0, y);
  });

  /* 新版本提示：站点更新后告诉用户刷一下 */
  (function () {
    try {
      if (!("serviceWorker" in navigator) || location.protocol === "file:") return;
      navigator.serviceWorker.register("sw.js", { scope: "./" }).then(function (reg) {
        reg.addEventListener("updatefound", function () {
          var nw = reg.installing;
          if (!nw) return;
          nw.addEventListener("statechange", function () {
            if (nw.state === "installed" && navigator.serviceWorker.controller) {
              A.toast("有新版本，下拉刷新即可更新", "ok");
            }
          });
        });
      }).catch(function () { });
    } catch (e) { }
  })();

  /* 记住讲义读到哪 */
  var PT = null;
  window.addEventListener("scroll", function () {
    if (ST.tab !== "notes" || !SUB.lesson) return;
    clearTimeout(PT);
    PT = setTimeout(function () { A.posSet(SUB.lesson, window.scrollY); }, 400);
  }, { passive: true });

  /* 重测 */
  on("wtab", function (el) { ST.wtab = el.getAttribute("data-v"); render(); });
  on("master", function (el) { A.master(el.getAttribute("data-v")); render(); });
  on("unstar", function (el) {
    var id = el.getAttribute("data-v");
    A.toggleStar(id);
    if (ST.wtab === "star") render(); else render();
  });
  on("export", function () { A.exportDB(); });
  on("export-csv", function () { A.exportCSV(); });
  on("import", function () {
    var inp = document.createElement("input");
    inp.type = "file"; inp.accept = ".json,application/json";
    inp.onchange = function () { if (inp.files[0]) A.importDB(inp.files[0]); };
    inp.click();
  });
  on("wipe", function () {
    A.ask("清空所有做题记录？这个动作不可撤销。建议先导出备份。", function () { A.wipeDB(); }, "清空");
  });

  /* 刷题 */
  on("prev", function () { if (ST.qi > 0) { ST.qi--; render(); } });
  on("next", function () { if (ST.qi < ST.list.length - 1) { ST.qi++; render(); } });

  /* 答题卡开关 + 跳题 */
  on("card", function () { ST.cardOpen = !ST.cardOpen; render(); });
  on("goto", function (el) {
    var i = parseInt(el.getAttribute("data-v"), 10);
    if (isNaN(i) || i < 0 || i >= ST.list.length) return;
    ST.qi = i; ST.cardOpen = false; ST.ans = null; render();
    window.scrollTo(0, 0);
  });
  on("unpin", function () { ST.pin = null; A.buildList(); render(); });

  /* 从笔记跳到单题 */
  on("open-q", function (el) {
    var id = el.getAttribute("data-v");
    if (!A.QMAP[id]) { A.toast("这道题不在题库里了", "warn"); return; }
    ST.pin = id; ST.tab = "drill"; A.buildList(); render();
  });
  on("pwa-hide", function () { A.setCfg("hidePwa", true); render(); });
  on("kpsub", function (el) { ST.kpSub = el.getAttribute("data-v"); render(); });
  on("kpreset", function () { ST.kpOpen = true; ST.flt.kp = ""; render(); });
  on("pickkp", function (el) {
    ST.flt.kp = el.getAttribute("data-v"); ST.flt.mode = "kp"; ST.kpOpen = false;
    ST.qi = 0; A.buildList(); render();
  });
  on("pick", function (el) {
    var i = parseInt(el.getAttribute("data-i"), 10);
    A.pickOption(i); saveAns();
  });
  on("reveal", function () { A.revealCalc(); });
  on("grade", function (el) { grade(A.ST.list[ST.qi], el.getAttribute("data-g")); });
  on("star", function (el) {
    var id = el.getAttribute("data-v");
    var now = A.toggleStar(id);
    el.classList.toggle("on", now);
    el.textContent = now ? "★" : "☆";
  });

  function saveAns() {
    var q = ST.list[ST.qi];
    if (!q) return;
    ST.answered[(q.id + "#" + (ST.__stamp || ""))] = '<span class="muted">已揭晓</span>';
  }

  function grade(q, g) {
    if (!q) return;
    A.record(q.id, g);
    var msg = g === "ok" ? "记下了：会 · 下次 " + (A.DB.q[q.id] && A.DB.q[q.id].due) : "已进重测队列";
    A.toast(msg, g === "ok" ? "ok" : "warn");
    var btns = $$(".grade3 .gbtn");
    btns.forEach(function (b) { b.classList.remove("sel"); });
    var cur = $$('.grade3 .gbtn[data-g="' + g + '"]')[0];
    if (cur) cur.classList.add("sel");
    setTimeout(function () {
      if (ST.qi < ST.list.length - 1) { ST.qi++; render(); }
      else { A.toast("这一组刷完了，换一组或明天再来", "ok"); }
    }, 320);
  }

  /* 真题 */
  on("exam-all", function () {
    ST.examType = ""; ST.examPart = ""; ST.examDiff = ""; ST.examHot = 0; render();
  });
  on("open-exam", function (el) {
    SUB.retLesson = SUB.lesson || null;   /* 从讲义点进来的，返回时回讲义 */
    SUB.lesson = null; SUB.formula = 0;
    SUB.examone = parseInt(el.getAttribute("data-v"), 10);
    SUB.examschool = el.getAttribute("data-s") || ST.examSchool || "shu";
    ST.examSchool = SUB.examschool;
    render();
    window.scrollTo(0, 0);
  });
  on("exam-back", function () {
    var back = SUB.retLesson;
    SUB.examone = -1; SUB.retLesson = null;
    if (back) { openLesson(back); return; }
    render();
  });
  on("grade-exam", function (el) {
    var i = parseInt(el.getAttribute("data-v"), 10);
    var g = el.getAttribute("data-g");
    var p = examAt(i);
    if (!p) return;
    A.recordExam(p.id, g);
    var r = (g === "ok" ? "右侧 " : "") + (g === "ok" ? "会" : g === "fuzzy" ? "不熟" : "不会");
    A.toast("已记录：" + r, g === "ok" ? "ok" : "warn");
    $$(".grade3 .gbtn").forEach(function (b) { b.classList.remove("sel"); });
    el.classList.add("sel");
  });

  /* 单选题卡里的考点标签：点开先告诉考频，再决定要不要去练 */
  on("kp", function (el) {
    var k = el.getAttribute("data-v");
    var p = A.KPMAP[k] || {};
    var name = p.name || k;
    var fq10 = A.FREQ10[k] || 0;
    var n = A.kpCount(k);
    var lid = A.lessonOfKp(k);
    var extra = lid && A.LESSON_MAP[lid]
      ? [{ t: "先看讲义", fn: function () { openLesson(lid); } }]
      : [];
    A.ask("【" + name + "】近十年真题考了 " + fq10 + " 次，本考点有 " + n + " 道练习题。" +
      (extra.length ? "\n对应讲义：" + A.LESSON_MAP[lid].title : "") + "去练这个考点？",
      function () {
        ST.flt.mode = "kp"; ST.flt.kp = k; ST.flt.subject = ""; ST.pin = null;
        go("drill");
      }, "去练", extra);
  });

  /* 图片放大 */
  on("zoom", function (el) { A.openZoom(el.getAttribute("data-src"), el.getAttribute("data-alt")); });
  on("zoom-close", function () { A.closeZoom(); });

  /* 主题 / 胶囊按钮 */
  on("theme", function () { A.applyTheme(A.THEME() === "dark" ? "light" : "dark"); });

  /* ---------- 站内确认框（替掉原生 confirm，手机上更稳） ---------- */
  function ask(msg, okFn, okText, extras) {
    var old = $("#asksheet"); if (old && old.remove) old.remove();
    var d = document.createElement("div");
    d.id = "asksheet";
    d.className = "asksheet";
    var ex = "";
    (extras || []).forEach(function (x, i) {
      ex += '<button class="btn ghost" data-extra="' + i + '">' + esc(x.t) + "</button>";
    });
    d.innerHTML = '<div class="askbox"><p>' + esc(msg) + "</p>" +
      '<div class="askbtns"><button class="btn ghost" data-ask="0">取消</button>' + ex +
      '<button class="btn primary" data-ask="1">' + esc(okText || "确定") + "</button></div></div>";
    document.body.appendChild(d);
    d.addEventListener("click", function (e) {
      if (e.target === d) { d.remove(); return; }
      var b = e.target.closest ? e.target.closest("[data-ask]") : null;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      d.remove();
      if (b.getAttribute("data-ask") === "1" && okFn) okFn();
    });
    d.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-extra]") : null;
      if (!b) return;
      e.preventDefault(); e.stopPropagation();
      var i = parseInt(b.getAttribute("data-extra"), 10);
      d.remove();
      var x = (extras || [])[i];
      if (x && x.fn) x.fn();
    });
  }
  A.ask = ask;

  /* ---------- 问 AI（手动触发） ---------- */
  var AIKEY = "kaoyan829.aikey";
  function aiKey() { try { return localStorage.getItem(AIKEY) || ""; } catch (e) { return ""; } }

  on("askai", function () { openAI(); });

  function currentQuestion() {
    if (SUB.examone >= 0) {
      var p = examAt(SUB.examone);
      if (!p) return null;
      return {
        title: p.year + " 年 " + (p.no || "") + "（" + (p.part || "") + " 真题）",
        body: (p.brief || "") + "\n考点：" + (p.kp || []).map(function (k) { return (A.KPMAP[k] || {}).name || k; }).join("、")
      };
    }
    var q = ST.list && ST.list[ST.qi];
    if (!q) return null;
    var s = q.stem;
    if (q.type === "choice" && q.options) {
      s += "\n" + q.options.map(function (o, i) { return "ABCDEF"[i] + ". " + A.plain(o); }).join("\n");
    }
    return { title: q.id, body: s };
  }

  function openAI() {
    var cur = currentQuestion();
    var el = document.getElementById("aisheet");
    if (!el) {
      el = document.createElement("div");
      el.id = "aisheet"; el.className = "sheet";
      el.innerHTML =
        '<div class="sheet-bg" data-act="ai-close"></div>' +
        '<div class="sheet-in">' +
        '<div class="sheet-h"><b>问 AI</b><button class="x" data-act="ai-close">✕</button></div>' +
        '<div class="ai-ctx tiny muted"></div>' +
        '<textarea id="aiq" class="aiq" rows="3" placeholder="哪里不懂就问，比如：第二步为什么这么设节点？"></textarea>' +
        '<div class="row"><input id="aikey" class="aikey" type="password" placeholder="DeepSeek API Key（只存在本机）">' +
        '<button class="btn ghost sm" data-act="ai-savekey">保存</button></div>' +
        '<details class="aiadv"><summary class="tiny">换模型 / 换接口（可选）</summary>' +
        '<input id="aibase" class="aikey" placeholder="接口地址，默认 https://api.deepseek.com">' +
        '<input id="aimodel" class="aikey" placeholder="模型，默认 deepseek-chat">' +
        '<div class="tiny muted">可填任何 OpenAI 兼容接口（如硅基流动、智谱、通义）。</div></details>' +
        '<div class="row"><button class="btn primary block" data-act="ai-send">发送</button></div>' +
        '<div id="aiout" class="aiout"></div>' +
        '<div class="tiny muted">Key 只写进本机 localStorage，不会发给别人。没有 Key 也能做题。</div>' +
        "</div>";
      document.body.appendChild(el);
    }
    el.querySelector(".ai-ctx").textContent = cur ? cur.title : "没有正在看的题";
    el.classList.add("on");
    document.body.classList.add("noscroll");
    var k = document.getElementById("aikey");
    if (k) k.value = aiKey();
    var b = document.getElementById("aibase");
    if (b) b.value = (localStorage.getItem("kaoyan829.v2.aibase") || "");
    var m = document.getElementById("aimodel");
    if (m) m.value = (localStorage.getItem("kaoyan829.v2.aimodel") || "");
    var out0 = document.getElementById("aiout");
    var past = cur && A.DB.ai ? A.DB.ai[cur.id] : null;
    out0.innerHTML = past
      ? '<div class="tiny muted">上次的回答</div><div class="aitext">' + md(past) + "</div>"
      : "";
    var t = document.getElementById("aiq");
    if (t) { t.value = ""; setTimeout(function () { t.focus(); }, 120); }
    document.getElementById("aiout").innerHTML = "";
  }
  on("ai-close", function () {
    var el = document.getElementById("aisheet");
    if (el) el.classList.remove("on");
    document.body.classList.remove("noscroll");
  });
  on("ai-savekey", function () {
    var k = document.getElementById("aikey");
    try { localStorage.setItem(AIKEY, k.value.trim()); A.toast("Key 已存在本机", "ok"); }
    catch (e) { A.toast("存不进去，浏览器禁用了本地存储", "bad"); }
  });
  on("ai-send", function () { sendAI(); });

  function sendAI() {
    var key = (document.getElementById("aikey") || {}).value || "";
    key = key.trim();
    if (!key) { A.toast("先填 API Key（platform.deepseek.com 申请）", "warn"); return; }
    var q = (document.getElementById("aiq") || {}).value || "";
    if (!q.trim()) { A.toast("先写一下想问什么", "warn"); return; }
    var cur = currentQuestion();
    var out = document.getElementById("aiout");
    out.innerHTML = '<div class="aiwait">思考中…</div>';

    var base = ((document.getElementById("aibase") || {}).value || "").trim() || "https://api.deepseek.com";
    var model = ((document.getElementById("aimodel") || {}).value || "").trim() || "deepseek-chat";
    try {
      localStorage.setItem("kaoyan829.v2.aibase", base);
      localStorage.setItem("kaoyan829.v2.aimodel", model);
    } catch (e) {}
    base = base.replace(/\/+$/, "");
    if (!/\/chat\/completions$/.test(base)) {
      if (/\/v\d+$/.test(base)) base += "/chat/completions";
      else base += "/v1/chat/completions";
    }
    var sys = "你是考研电路与信号系统的辅导老师。用最直白的中文解释，先讲这一步在干什么，再讲为什么这么做，" +
      "最后提醒易错点。不要长篇大论，控制在 300 字内。公式用 $...$ 包裹。";
    var user = (cur ? "题目：" + cur.body + "\n\n" : "") + "我的问题：" + q;

    fetch(base, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": "Bearer " + key },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "system", content: sys }, { role: "user", content: user }],
        temperature: 0.4, max_tokens: 900, stream: true
      })
    }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status + (r.status === 401 ? "（Key 不对）" : ""));
      var reader = r.body.getReader(), dec = new TextDecoder(), buf = "", acc = "";
      out.innerHTML = '<div class="aitext"></div>';
      var box = out.querySelector(".aitext");
      function pump() {
        return reader.read().then(function (res) {
          if (res.done) {
            A.toast("回答完成", "ok");
            var cq = currentQuestion();
            if (cq && acc) {
              A.DB.ai = A.DB.ai || {};
              A.DB.ai[cq.id] = acc;
              try { A.save(); } catch (e) {}
            }
            return;
          }
          buf += dec.decode(res.value, { stream: true });
          var lines = buf.split("\n"); buf = lines.pop();
          lines.forEach(function (ln) {
            ln = ln.trim();
            if (!ln || ln.indexOf("data:") !== 0) return;
            var d = ln.slice(5).trim();
            if (d === "[DONE]") return;
            try {
              var j = JSON.parse(d);
              var t = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
              if (t) { acc += t; box.innerHTML = md(acc); }
            } catch (e) { }
          });
          return pump();
        });
      }
      return pump();
    }).catch(function (err) {
      out.innerHTML = '<div class="aibad">失败了：' + esc(err.message) + "</div>" +
        '<div class="tiny muted">常见原因：Key 错、网络不通（需要能访问 api.deepseek.com）、余额不足。</div>';
    });
  }

  /* ---------- 全局点击委托 ---------- */
  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target.closest("[data-act],[data-f],[data-nt]") : null;
    if (!el) return;
    var act = el.getAttribute("data-act");
    var fn = ACT[act];
    if (fn) { e.preventDefault(); fn(el, e); return; }
    var f = el.getAttribute("data-f");
    if (f) {
      e.preventDefault();
      ST[f] = el.getAttribute("data-v");
      if (f === "examHot") ST.examHot = el.getAttribute("data-v") === "1" ? 1 : 0;
      if (f === "year") ST.examYear = parseInt(el.getAttribute("data-v"), 10) || 0;
      if (f === "school") { ST.examSchool = el.getAttribute("data-v"); ST.examYear = 0; ST.examType = ""; ST.examPart = ""; ST.examDiff = ""; ST.examHot = 0; }
      if (f === "mode") { ST.qi = 0; if (el.getAttribute("data-v") !== "kp") ST.kpOpen = false; }
      if (f === "subject") { ST.flt.subject = el.getAttribute("data-v"); ST.qi = 0; }
      A.buildList(); render();
      return;
    }
    var nt = el.getAttribute("data-nt");
    if (nt) { e.preventDefault(); ST.noteTab = nt; render(); return; }
  });

  /* 用事件委托接管 chips 的 data-act="nsubj" 等已覆盖；这里补 tab 点击 */
  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("#nav .ntab") : null;
    if (!b) return;
    e.preventDefault();
    go(b.getAttribute("data-tab"));
  });

  on("examq-clear", function () { ST.examQ = ""; render(); });

  /* 真题搜索：边打边筛，保住输入框焦点和光标 */
  var TQ = null;
  document.addEventListener("input", function (e) {
    var t = e.target;
    if (t && t.id === "nq") {
      var qid = t.getAttribute("data-q");
      clearTimeout(TQ);
      TQ = setTimeout(function () { A.noteSet(qid, t.value); }, 500);
      return;
    }
    if (!t || t.id !== "exq") return;
    ST.examQ = t.value;
    clearTimeout(TQ);
    TQ = setTimeout(function () {
      render();
      var el = document.getElementById("exq");
      if (el) { el.focus(); var n = el.value.length; try { el.setSelectionRange(n, n); } catch (x) { } }
    }, 220);
  });

  /* ---------- 设置项变更 ---------- */
  document.addEventListener("focusout", function (e) {
    var t = e.target;
    if (t && t.id === "nq") A.noteSet(t.getAttribute("data-q"), t.value);
  });

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (!t || !t.id) return;
    if (t.id === "cfgd") { A.setCfg("examDate", t.value); A.toast("考试日期： " + t.value, "ok"); render(); }
    else if (t.id === "cfgg") {
      var v = parseInt(t.value, 10);
      if (v >= 5 && v <= 300) { A.setCfg("goal", v); A.toast("每日目标： " + v + " 题", "ok"); render(); }
    }
  });

  /* ---------- 键盘 ---------- */
  document.addEventListener("keydown", function (e) {
    if (/^(INPUT|TEXTAREA)$/.test((e.target.tagName || "").toUpperCase())) return;
    if (ST.tab !== "drill" || !ST.list.length) return;
    var q = ST.list[ST.qi];
    if (!q) return;
    var k = e.key;
    if (k === " " && q.type !== "choice") { e.preventDefault(); A.revealCalc(); return; }
    if (e.key === "ArrowLeft") { if (ST.qi > 0) { ST.qi--; render(); } return; }
    if (e.key === "ArrowRight") { if (ST.qi < ST.list.length - 1) { ST.qi++; render(); } return; }
    if (q.type === "choice" && /^[1-6]$/.test(k)) {
      var idx = parseInt(k, 10) - 1;
      if (idx < (q.options || []).length) { A.pickOption(idx); saveAns(); }
      return;
    }
    if (!q.type || q.type !== "choice") {
      if (k === "1") grade(q, "ok");
      else if (k === "2") grade(q, "fuzzy");
      else if (k === "3") grade(q, "no");
    }
  });

  /* ---------- 启动 ---------- */
  function boot() {
    var th = "light";
    try { th = localStorage.getItem("kaoyan829_theme") || "light"; } catch (e) { }
    A.applyTheme(th);
    render();
    setInterval(function () { A.tick();  }, 1000);
    /* 数据只在本地：第一次来给个提醒 */
    try {
      if (!localStorage.getItem("kaoyan829.tip")) {
        localStorage.setItem("kaoyan829.tip", "1");
        setTimeout(function () { A.toast("进度只存在这台设备，记得常备份", "warn"); }, 1200);
      }
    } catch (e) { }
  }

  A.boot = boot;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

})(window.A);
