/* 829 训练台 —— 单页应用
 * 依赖：data/*.js 预先赋值到 window；KaTeX 本地。
 * 所有数据存在 localStorage，可离线、可断网。
 */
(function () {
  "use strict";

  /* ============ 工具 ============ */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  };
  var pad = function (n) { return n < 10 ? "0" + n : "" + n; };
  /* 列表/摘要用的纯文本：去掉 $…$、$$…$$ 等公式定界符与常见 TeX 命令，
     避免「最近的错题」里出现 $\dot I_S = 6\angle 0°$ 这种裸源码 */
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
      .replace(/\\[a-zA-Z]+/g, "")
      .replace(/\$\$?/g, "")
      .replace(/\\[\[\]()]/g, "")
      .replace(/[{}]/g, "")
      .replace(/[ \t\u00a0]+/g, " ")
      .trim();
    return t;
  };
  var lead = function (s, n) {
    var t = plain(s);
    return t.length > n ? t.slice(0, n) + "…" : t;
  };
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

  /* ============ KaTeX ============ */
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

  /* ============ Markdown（保护公式 → 转义 → 解析 → 还原公式） ============ */
  function md(src) {
    if (!src) return "";
    var store = [];
    function keep(t, d) { store.push({ t: t, d: d }); return "\u0001" + (store.length - 1) + "\u0002"; }

    src = String(src);
    src = src.replace(/\$\$([\s\S]+?)\$\$/g, function (m, t) { return keep(t.trim(), true); });
    src = src.replace(/\\\[([\s\S]+?)\\\]/g, function (m, t) { return keep(t.trim(), true); });
    src = src.replace(/\\\(([\s\S]+?)\\\)/g, function (m, t) { return keep(t.trim(), false); });
    src = src.replace(/\$([^\$\n]+?)\$/g, function (m, t) { return keep(t.trim(), false); });

    /* 代码块先抽出 */
    var codes = [];
    src = src.replace(/```[a-zA-Z]*\n([\s\S]*?)```/g, function (m, c) {
      codes.push(c); return "\u0003" + (codes.length - 1) + "\u0004";
    });

    src = esc(src);
    var lines = src.split("\n");
    var out = [], i = 0;

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

  /* 给 AI 侧栏复用同一个渲染器 */
  window.MD = md;
  window.TEX = tex;

  /* ============ 存储 ============ */
  var KEY = "kaoyan829.v1";
  var DB = load();

  function load() {
    var o = null;
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) o = JSON.parse(raw);
    } catch (e) { o = null; }
    /* 存坏了也不能白屏：结构归一化后再用 */
    if (!o || typeof o !== "object" || Array.isArray(o)) o = {};
    /* 兼容：误把导出外层 {app,v,at,db} 整个塞进 localStorage 的情况 */
    if (o.db && typeof o.db === "object" && !o.q && !o.log) o = o.db;
    ["q", "log", "wrong"].forEach(function (k) {
      if (!o[k] || typeof o[k] !== "object" || Array.isArray(o[k])) o[k] = {};
    });
    if (!o.first) o.first = todayStr();
    return o;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(DB)); } catch (e) { }
  }

  /* 刷题进度：刷新/关掉再打开，还停在上次那道题 */
  var SESS_KEY = "kaoyan829.sess";
  function saveSess() {
    if (STATE.pin) return;
    try {
      localStorage.setItem(SESS_KEY, JSON.stringify({
        f: STATE.filter, qi: STATE.qi, at: Date.now()
      }));
    } catch (e) { }
  }
  function loadSess() {
    try {
      var o = JSON.parse(localStorage.getItem(SESS_KEY) || "null");
      if (!o || !o.f || typeof o.qi !== "number") return null;
      if (Date.now() - (o.at || 0) > 12 * 3600 * 1000) return null;
      return o;
    } catch (e) { return null; }
  }

  /* 备份：导出一份 JSON，导入时整体覆盖 */
  function exportDB() {
    var payload = { app: "kaoyan829", v: 1, at: new Date().toISOString(), db: DB };
    var blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "829学习记录_" + todayStr() + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }
  /* 轻提示：不用 alert 打断操作 */
  var toastTimer = null;
  function toast(msg, kind) {
    var el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      document.body.appendChild(el);
    }
    el.className = "toast on" + (kind ? " " + kind : "");
    el.textContent = msg;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.className = "toast"; }, 2600);
  }

  function importDB(file) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var o = JSON.parse(fr.result);
        var d = o.db || o;
        if (!d || typeof d !== "object" || !d.q) throw new Error("不是本网站的备份文件");
        d.log = d.log || {}; d.wrong = d.wrong || {}; d.q = d.q || {};
        DB = d;
        save();
        go(STATE.tab);
        toast("已导入：" + Object.keys(DB.q).length + " 道题的记录、" + Object.keys(DB.wrong).length + " 道错题", "ok");
      } catch (e) {
        toast("导入失败：" + e.message, "bad");
      }
    };
    fr.readAsText(file, "utf-8");
  }

  /* 清空全部记录：按钮点两次才生效，避免手滑把几个月的记录删掉 */
  var wipeArmed = null;
  function wipeDB(btn) {
    if (!btn) return;
    if (btn.dataset.armed !== "1") {
      btn.dataset.armed = "1";
      btn.classList.add("armed");
      /* 内联一份，避免个别浏览器把 .ghost 的透明底排在前面 */
      btn.style.background = "var(--bad)";
      btn.style.borderColor = "var(--bad)";
      btn.style.color = "#fff";
      btn.textContent = "再点一次，确认清空";
      if (wipeArmed) clearTimeout(wipeArmed);
      wipeArmed = setTimeout(function () {
        btn.dataset.armed = "";
        btn.classList.remove("armed");
        btn.style.background = "";
        btn.style.borderColor = "";
        btn.style.color = "";
        btn.textContent = "清空所有记录";
      }, 4000);
      return;
    }
    if (wipeArmed) clearTimeout(wipeArmed);
    DB = { q: {}, log: {}, wrong: {}, first: todayStr() };
    save();
    toast("记录已清空", "ok");
    go("today");
  }

  /* 间隔重复：答对升级，答错归零 */
  var STEPS = [1, 2, 4, 7, 15, 30];
  function record(qid, ok) {
    var r = DB.q[qid] || { lvl: 0, n: 0, ok: 0, due: todayStr(), last: null };
    r.n++;
    if (ok) {
      r.ok++;
      r.lvl = Math.min(r.lvl + 1, STEPS.length - 1);
      r.due = addDays(STEPS[r.lvl]);
      delete DB.wrong[qid];
    } else {
      r.lvl = 0;
      r.due = addDays(1);
      DB.wrong[qid] = { at: todayStr(), n: ((DB.wrong[qid] || {}).n || 0) + 1 };
    }
    r.last = todayStr();
    r.lastOk = !!ok;
    DB.q[qid] = r;

    var d = todayStr();
    var L = DB.log[d] || { n: 0, ok: 0 };
    L.n++; if (ok) L.ok++;
    DB.log[d] = L;
    save();
  }
  /* 只统计题库里还存在的题：题库改动或导入旧备份后，
     遗留在 DB.q 里的孤儿记录不该撑大「待复习」数字，
     否则会出现「待复习 1 题 → 开始复习 → 这个筛选条件下没有题」。 */
  function dueCount() {
    var t = todayStr(), c = 0;
    for (var i = 0; i < QS.length; i++) {
      var r = DB.q[QS[i].id];
      if (r && r.due && r.due <= t) c++;
    }
    return c;
  }
  function todayLog() { return DB.log[todayStr()] || { n: 0, ok: 0 }; }

  /* ============ 题与知识点索引 ============ */
  var QS = (window.QUESTIONS || []).slice().concat(window.QSIGNAL || []);
  var EXAMS = window.EXAMS || { problems: [] };
  var SUBJ = [
    { id: "电路", kp: window.KP_CIRCUIT },
    { id: "信号", kp: window.KP_SIGNAL }
  ];
  var KPMAP = {};
  var KPLIST = [];
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

  /* ============ 路由 ============ */
  var VIEW = $("#view");
  var STATE = { tab: "today", filter: { subject: "", kp: "", mode: "all" }, qi: 0, list: [], noteTab: "kp", q: "", pin: null };

  function go(tab) {
    STATE.tab = tab;
    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.toggle("on", tabs[i].dataset.tab === tab);
    }
    if (tab === "drill") buildList();
    render();
    window.scrollTo(0, 0);
    /* 让地址栏跟着走：刷新后还停在这一页 */
    if (!STATE.pin && /^(today|drill|wrong|stats)$/.test(tab)) {
      if (location.hash !== "#" + tab) {
        try { history.replaceState(null, "", "#" + tab); } catch (e) { }
      }
    } else if (tab === "notes" && !/^#lesson-/.test(location.hash)) {
      var want = "#notes/" + (STATE.noteTab || "kp");
      if (location.hash !== want) {
        try { history.replaceState(null, "", want); } catch (e) { }
      }
    }
  }

  function render() {
    if (STATE.tab === "today") VIEW.innerHTML = vToday();
    else if (STATE.tab === "drill") VIEW.innerHTML = vDrill();
    else if (STATE.tab === "notes") VIEW.innerHTML = vNotes();
    else if (STATE.tab === "wrong") VIEW.innerHTML = vWrong();
    else if (STATE.tab === "stats") VIEW.innerHTML = vStats();
    bindView();
    if (STATE.tab === "drill") { renderQuestionBody(); saveSess(); }
  }

  function pick(qid) {
    for (var i = 0; i < QS.length; i++) if (QS[i].id === qid) return QS[i];
    return null;
  }

  /* ============ 今日 ============ */
  function vToday() {
    var d = dayDiff(todayStr(), "2026-12-19");
    var L = todayLog();
    var rate = L.n ? Math.round(L.ok / L.n * 100) : 0;
    var due = dueCount();
    var bad = Object.keys(DB.wrong).length;

    var h = "";
    h += '<div class="stats">';
    h += '<div class="stat"><div class="v">' + L.n + '</div><div class="k">今日做题</div></div>';
    h += '<div class="stat"><div class="v">' + rate + '%</div><div class="k">正确率</div></div>';
    h += '<div class="stat"><div class="v">' + due + '</div><div class="k">待复习</div></div>';
    h += '</div>';

    h += '<div class="sec-title">今天做什么</div>';
    if (due > 0) {
      h += '<div class="card"><h3>先清复习队列（' + due + ' 题）</h3>';
      h += '<p class="muted">到期的题按 1→2→4→7→15→30 天间隔回滚。先做旧的，再做新的。</p>';
      h += '<button class="btn primary block" data-act="review">开始复习</button></div>';
    } else {
      var ever = Object.keys(DB.q || {}).length;
      if (ever === 0) {
        h += '<div class="card"><h3>今天先热身：随便刷几道</h3>';
        h += '<p class="muted">还没开始做题。挑一科先做十道找找手感——答错的会自动进错题本，之后按 1→2→4→7→15→30 天提醒你回来复习。</p>';
        h += '<div class="row"><button class="btn primary" data-act="drill-subj" data-v="信号" style="flex:1">刷信号题</button>' +
          '<button class="btn primary" data-act="drill-subj" data-v="电路" style="flex:1">刷电路题</button></div></div>';
      } else {
        h += '<div class="card"><h3>今天的复习都做完了</h3>';
        h += '<p class="muted">没有到期的题。可以接着做新题，或者回去看讲义。</p>';
        h += '<div class="row"><button class="btn primary" data-act="drill">刷新题</button><button class="btn" data-act="notes">看讲义</button></div></div>';
      }
    }

    if (bad > 0) {
      h += '<div class="sec-title">最近的错题</div><div class="card">';
      var ws = Object.keys(DB.wrong).slice(-3).reverse();
      ws.forEach(function (qid) {
        var q = pick(qid);
        h += '<div class="rowitem"><div class="num">✗</div><div class="main"><div class="t">' +
          esc(q ? lead(q.brief || q.stem || "", 46) : qid) + '</div><div class="s">' +
          (q ? q.subject : "") + ' · 错 ' + DB.wrong[qid].n + ' 次</div></div></div>';
      });
      h += '<button class="btn block" data-act="wrong" style="margin-top:10px">去错题本</button></div>';
    }

    h += '<div class="sec-title">资料</div><div class="card">';
    h += '<div class="rowitem tap" data-act="notes"><div class="num">▤</div><div class="main"><div class="t">' +
      KPLIST.length + ' 个考点 · ' + LESSONS.length + ' 篇讲义</div><div class="s">知识点 ↔ 公式 ↔ 真题 互相反查</div></div></div>';
    h += '<div class="rowitem tap" data-act="exam-map"><div class="num">✦</div><div class="main"><div class="t">真题地图</div><div class="s">' +
      (EXAMS.problems ? EXAMS.problems.length : 0) + ' 道题已归档' +
      (EXAMS.years && EXAMS.years.length ? " · " + EXAMS.years.length + " 个年份" : "") + '，可一键问 AI</div></div></div>';
    h += '<div class="rowitem tap" data-act="stats"><div class="num">📈</div><div class="main"><div class="t">学习统计</div><div class="s">近 14 天做题量、分科正确率、薄弱考点</div></div></div>';
    h += '</div>';

    h += '<div class="sec-title">数据</div><div class="card">';
    h += '<p class="muted" style="margin:0 0 10px">记录只存在这台设备的浏览器里。换设备或者清缓存前，导出一份备份。</p>';
    h += '<div class="row"><button class="btn" data-act="export" style="flex:1">导出备份</button>' +
      '<button class="btn" data-act="import" style="flex:1">导入备份</button></div>';
    h += '<button class="btn ghost block wipe" data-act="wipe">清空所有记录</button></div>';

    h += '<div class="empty tiny">距考试还有 ' + d + ' 天。</div>';
    return h;
  }

  /* ============ 刷题 ============ */
  function buildList() {
    if (STATE.pin) {
      var one = pick(STATE.pin);
      STATE.list = one ? [one] : [];
      STATE.qi = 0;
      return;
    }
    var f = STATE.filter;
    var t = todayStr();
    var arr = [];
    for (var i = 0; i < QS.length; i++) {
      var q = QS[i];
      if (f.subject && q.subject !== f.subject) continue;
      if (f.kp && (q.kp || []).indexOf(f.kp) < 0) continue;
      if (f.mode === "due") { var r = DB.q[q.id]; if (!r || r.due > t) continue; }
      if (f.mode === "wrong" && !DB.wrong[q.id]) continue;
      if (f.mode === "new" && DB.q[q.id]) continue;
      arr.push(q);
    }
    STATE.list = arr;
    if (STATE.qi >= arr.length) STATE.qi = 0;
  }

  function vDrill() {
    var f = STATE.filter;
    var h = "";

    h += '<div class="chips">';
    [["", "全部"], ["电路", "电路"], ["信号", "信号"]].forEach(function (p) {
      h += '<button class="chip' + (f.subject === p[0] ? " on" : "") + '" data-f="subject" data-v="' + p[0] + '">' + p[1] + '</button>';
    });
    ["all:全部题", "due:待复习", "wrong:错题", "new:没做过"].forEach(function (p) {
      var kv = p.split(":");
      h += '<button class="chip' + (f.mode === kv[0] ? " on" : "") + '" data-f="mode" data-v="' + kv[0] + '">' + kv[1] + '</button>';
    });
    h += '</div>';

    if (!QS.length) {
      h += '<div class="empty">题库还没装进来。<br>把题目写进 data/questions.js 就会出现在这里。</div>';
      return h;
    }
    if (!STATE.list.length) {
      h += '<div class="empty">这个筛选条件下没有题。<br>换个条件试试。</div>';
      return h;
    }

    var n = STATE.list.length;
    if (STATE.qi >= n) STATE.qi = 0;
    var q = STATE.list[STATE.qi];

    h += '<div class="progress"><i style="width:' + Math.round((STATE.qi + 1) / n * 100) + '%"></i></div>';
    var hint = q.type === "choice" ? "1-4 选，→ 下一题" : "r 看标准答案，→ 下一题";
    h += '<div class="tiny qbar">第 <input id="jump" class="jump" type="number" min="1" max="' + n +
      '" value="' + (STATE.qi + 1) + '"> / ' + n + ' 题　<span style="opacity:.6">' + hint + '</span></div>';

    h += '<div class="card">';
    h += '<div class="qhead"><div class="qmeta">';
    h += '<span class="tag ' + (q.subject === "信号" ? "sig" : "cir") + '">' + esc(q.subject) + '</span>';
    (q.kp || []).forEach(function (k) {
      var p = KPMAP[k];
      h += '<span class="tag">' + (p ? esc(p.name.slice(0, 12)) : esc(k)) + '</span>';
    });
    if (q.source) h += '<span class="tag y">' + esc(q.source) + '</span>';
    h += '</div><button class="askai" data-act="ask-ai" title="把这道题发给 AI">✦ 问 AI</button></div>';

    h += '<div class="stem">' + md(q.stem) + '</div>';
    h += '<div id="qbody"></div>';

    h += '<div class="hr"></div><div class="row">';
    if (STATE.pin) {
      h += '<button class="btn ghost" data-act="unpin">‹ 返回题库</button>';
    } else {
      h += '<button class="btn ghost" data-act="prev">上一题</button>';
      h += '<button class="btn ghost" data-act="next">下一题</button>';
      h += '<button class="btn ghost" data-act="skip">跳过</button>';
    }
    h += '</div>';
    h += '</div>';
    return h;
  }

  var picked = null;

  function renderQuestionBody() {
    var box = $("#qbody");
    if (!box) return;
    var q = STATE.list[STATE.qi];
    if (!q) return;
    picked = null;
    var h = "";

    if (q.type === "choice") {
      var correct = (q.answer === undefined || q.answer === null) ? 0 : q.answer;
      h += '<div id="opts">';
      q.options.forEach(function (o, i) {
        h += '<button class="opt" data-i="' + i + '"><b>' + "ABCDEF"[i] + '</b>' + md(o) + '</button>';
      });
      h += '</div><div id="qafter"></div>';
      box.innerHTML = h;

      var btns = box.querySelectorAll(".opt");
      for (var k = 0; k < btns.length; k++) {
        (function (b) {
          once(b, "click", function () {
            if (picked !== null) return;
            picked = +b.dataset.i;
            var right = picked === correct;
            var all = box.querySelectorAll(".opt");
            for (var j = 0; j < all.length; j++) {
              if (j === correct) all[j].classList.add("reveal");
            }
            b.classList.add(right ? "picked-ok" : "picked-bad");
            var after = $("#qafter");
            after.innerHTML =
              '<div class="answer-box"><div class="lbl">' + (right ? "答对" : "答错") +
              '　正确答案 ' + "ABCDEF"[correct] + '</div>' +
              (q.solution ? md(q.solution) : "") + '</div>' +
              '<div class="row" style="margin-top:10px"><button class="btn primary block" data-act="next">下一题</button></div>';
            record(q.id, right);
            bindView();
          });
        })(btns[k]);
      }
    } else {
      h += '<div class="row" style="margin-top:12px"><button class="btn primary block" data-act="reveal">看标准答案</button></div>';
      h += '<div id="qafter"></div>';
      box.innerHTML = h;
      bindView();
    }
  }

  function revealCalc() {
    var q = STATE.list[STATE.qi];
    var after = $("#qafter");
    if (!after || !q) return;
    after.innerHTML =
      '<div class="answer-box"><div class="lbl">标准答案</div>' + md(q.answerText || "") + '</div>' +
      (q.solution ? '<div class="solution"><div class="tiny" style="margin-bottom:6px">解析</div>' + md(q.solution) + '</div>' : "") +
      '<div class="sec-title" style="margin-top:16px">对照自评</div>' +
      '<div class="row"><button class="btn ok block" data-act="self-ok" style="flex:1">我算对了</button>' +
      '<button class="btn bad block" data-act="self-bad" style="flex:1">算错了 / 没思路</button></div>';
    bindView();
  }

  function nextAfterSelf() {
    var after = $("#qafter");
    if (!after) return;
    after.innerHTML = '<div class="answer-box" style="border-color:#cfd5dd;background:#f7f8fa"><div class="lbl" style="color:#5b6470">已记录</div>' +
      '已按你的自评更新复习队列。</div>' +
      '<div class="row" style="margin-top:10px"><button class="btn primary block" data-act="next">下一题</button></div>';
    bindView();
  }

  /* ============ 讲义 / 知识点 ============ */
  function vNotes() {
    var h = "";
    h += '<div class="chips">';
    h += '<button class="chip' + (STATE.noteTab === "kp" ? " on" : "") + '" data-nt="kp">知识点 · 公式</button>';
    h += '<button class="chip' + (STATE.noteTab === "lesson" ? " on" : "") + '" data-nt="lesson">课程讲义</button>';
    h += '<button class="chip' + (STATE.noteTab === "exam" ? " on" : "") + '" data-nt="exam">真题地图</button>';
    h += '</div>';

    if (STATE.noteTab === "kp") {
      h += '<input class="search" id="kpsearch" placeholder="搜知识点 / 公式关键词，如：初值定理、去耦、Q值" value="' + esc(STATE.q) + '">';
      h += '<div id="kplist" style="margin-top:12px">' + kpListHTML() + '</div>';
    } else if (STATE.noteTab === "lesson") {
      if (!LESSONS.length) {
        h += '<div class="empty">讲义还没装进来。</div>';
      } else {
        h += '<input class="search" id="lssearch" placeholder="搜讲义标题 / 摘要，如：抽样、三相、z 变换、留数" value="' + esc(STATE.lq || "") + '">';
        h += '<div id="lslist" style="margin-top:12px">' + lessonListHTML() + '</div>';
      }
    } else {
      h += examMapHTML();
    }
    return h;
  }

  function lessonListHTML() {
    var q = (STATE.lq || "").trim().toLowerCase();
    var groups = [], order = {};
    LESSONS.forEach(function (L) {
      var hay = (L.title + " " + (L.summary || "") + " " + (L.subject || "")).toLowerCase();
      if (q && hay.indexOf(q) < 0) return;
      var k = L.subject || "其他";
      if (!order[k]) { order[k] = { name: k, items: [] }; groups.push(order[k]); }
      order[k].items.push(L);
    });
    if (!groups.length) return '<div class="empty">没找到匹配的讲义。</div>';
    var h = "";
    groups.forEach(function (g) {
      h += '<div class="secrow"><span class="secname">' + esc(g.name) + '</span>' +
        '<span class="seccount">' + g.items.length + ' 篇</span></div>';
      h += '<div class="card" style="margin-bottom:14px">';
      g.items.forEach(function (L) {
        var words = L.md ? String(L.md).length : 0;
        var meta = (L.subject ? L.subject + " · " : "") + words + " 字";
        var sum = (L.summary || "").trim();
        var prose = /字$/.test(sum) ? "" : sum;
        h += '<div class="rowitem"><div class="main">' +
          '<div class="t"><a href="#lesson-' + L.id + '" style="color:inherit;text-decoration:none">' + esc(L.title) + '</a></div>' +
          '<div class="s">' + esc(meta) + '</div>' +
          (prose ? '<div class="s" style="margin-top:2px">' + esc(prose) + '</div>' : "") +
          '</div></div>';
      });
      h += '</div>';
    });
    return h;
  }

  /* 考点详情：按需渲染（全部一次性渲染会把 600KB 公式塞进 DOM） */
  function kpBodyHTML(p) {
    var h = "";
    (p.formulas || []).forEach(function (f) {
      h += '<div class="fml"><div class="tex">' + tex(f.t, false) + '</div><div class="note">' + esc(f.n || "") + '</div></div>';
    });
    if (p.keys && p.keys.length) {
      h += '<div class="tiny" style="margin-top:10px">关键词：' + p.keys.map(esc).join(" · ") + '</div>';
    }
    var rel = (EXAMS.problems || []).filter(function (x) {
      return (x.kp || []).indexOf(p.id) >= 0;
    });
    if (rel.length) {
      h += '<div class="tiny" style="margin-top:10px;color:#c2410c">真题命中 ' + rel.length + ' 次：' +
        rel.slice(0, 6).map(function (x) { return x.year + "·" + x.no; }).join("，") +
        (rel.length > 6 ? " …" : "") + '</div>';
    }
    return h;
  }

  function kpListHTML() {
    var q = (STATE.q || "").trim().toLowerCase();
    var h = "";
    SUBJ.forEach(function (s) {
      if (!s.kp || !s.kp.chapters) return;
      var groups = [];
      s.kp.chapters.forEach(function (ch) {
        var pts = ch.points.filter(function (p) {
          if (!q) return true;
          var hay = (p.name + " " + p.id + " " + (p.keys || []).join(" ") + " " +
            (p.formulas || []).map(function (f) { return f.t + " " + f.n; }).join(" ")).toLowerCase();
          return hay.indexOf(q) >= 0;
        });
        if (pts.length) groups.push({ name: ch.name, pts: pts });
      });
      if (!groups.length) return;
      var title = esc(s.id);
      if (s.kp.subject && s.kp.subject !== s.id) title += '　' + esc(s.kp.subject);
      h += '<div class="sec-title">' + title + '</div>';
      groups.forEach(function (g) {
        h += '<div class="tiny" style="margin:6px 4px 8px">' + esc(g.name) + '</div>';
        g.pts.forEach(function (p) {
          h += '<details class="kp" data-kp="' + esc(p.id) + '"><summary><span class="id">' + esc(p.id) + '</span>' + esc(p.name) +
            '<span class="stars">' + "★".repeat(p.stars || 1) + '</span></summary><div class="body"></div></details>';
        });
      });
    });
    return h || '<div class="empty">没有匹配的考点。</div>';
  }

  function examMapHTML() {
    var P = EXAMS.problems || [];
    if (!P.length) {
      return '<div class="empty">真题索引还没生成。<br>转录完成后会自动出现在这里。</div>';
    }
    var years = {};
    P.forEach(function (p) { (years[p.year] = years[p.year] || []).push(p); });
    var ys = Object.keys(years).map(Number).sort(function (a, b) { return b - a; });

    var h = '<div class="card"><h3>' + P.length + ' 道真题 · ' + ys.length + ' 个年份</h3>';
    h += '<p class="muted">每条都是按卷面转录的题面摘要。点「问 AI」让 AI 就这道题的考点和方法讲一遍；点考点标签跳到公式速查。</p>';
    var span = [];
    for (var yy = ys[ys.length - 1]; yy <= ys[0]; yy++) if (ys.indexOf(yy) < 0) span.push(yy);
    h += '<p class="muted" style="margin-bottom:0">' + ys[ys.length - 1] + '–' + ys[0] + ' 年连续 ' +
      (ys[0] - ys[ys.length - 1] + 1) + ' 届，已收 ' + ys.length + ' 届' +
      (span.length ? '；缺 ' + span.join("、") + ' 年（原卷暂未找到，补到就更新）' : '') +
      '。1998–2001 年卷为早期卷，题量少于现行 150 分制；2024 年起卷面并入电路部分（信号+电路），所以这两年才出现电路大题。</p></div>';

    h += '<div class="sec-title">按年份看</div>';
    /* 年份跳转条：29 张年份卡加起来近 3 万像素，没有索引几乎没法用 */
    h += '<div class="yrbar" id="yrbar">' + ys.map(function (y) {
      return '<button class="chip" data-act="yr" data-v="' + y + '">' + y + '</button>';
    }).join("") + '</div>';
    ys.forEach(function (y) {
      var list = years[y];
      var fu = 0;
      list.forEach(function (p) { fu += (p.points || 0); });
      h += '<div class="card exyear" id="y-' + y + '"><h3>' + y + ' 年 <span class="tiny" style="font-weight:400;opacity:.6">' +
        list.length + ' 题' + (fu ? " · " + fu + " 分" : "") + '</span></h3>';
      list.forEach(function (p) {
        var idx = P.indexOf(p);
        h += '<div class="exrow"><div class="exno">' + esc(p.no || "") + '</div><div class="exmain">';
        h += '<div class="exbrief">' + esc(p.brief || "") + '</div>';
        h += '<div class="qmeta">';
        (p.kp || []).forEach(function (k) {
          var kp = KPMAP[k];
          h += '<button class="tag kpjump" data-act="kp" data-v="' + esc(k) + '">' + (kp ? esc(kp.name.slice(0, 10)) : esc(k)) + '</button>';
        });
        if (p.points) h += '<span class="tag y">' + p.points + ' 分</span>';
        if (p.difficulty >= 5) h += '<span class="tag hot">难</span>';
        h += '</div></div>';
        h += '<button class="askai mini" data-act="ask-exam" data-i="' + idx + '" title="问 AI">✦</button>';
        h += '</div>';
      });
      h += '</div>';
    });

    var heat = [];
    KPLIST.forEach(function (p) {
      var rel = P.filter(function (x) { return (x.kp || []).indexOf(p.id) >= 0; });
      if (rel.length) heat.push({ id: p.id, name: p.name, n: rel.length, ys: rel.map(function (x) { return x.year; }) });
    });
    heat.sort(function (a, b) { return b.n - a.n; });
    if (heat.length) {
      var top = heat[0].n;
      h += '<div class="sec-title">考点热度：' + ys.length + ' 年真题命中次数</div><div class="card">';
      heat.forEach(function (r) {
        var w = Math.max(8, Math.round(r.n / top * 100));
        var seen = {}, ys2 = [];
        r.ys.forEach(function (v) { if (!seen[v]) { seen[v] = 1; ys2.push(v); } });
        ys2.sort(function (a, b) { return a - b; });
        h += '<div class="heatrow" data-act="kp" data-v="' + esc(r.id) + '"><div class="heatname">' +
          '<span class="id">' + esc(r.id) + '</span>' + esc(r.name) + '</div>' +
          '<div class="heatbar"><i style="width:' + w + '%"></i></div>' +
          '<div class="heatn">' + r.n + '</div></div>';
        h += '<div class="heatyrs">' + esc(ys2.join(" · ")) + '</div>';
      });
      h += '</div>';
    }

    h += '<div class="sec-title">按考点反查真题</div>';
    KPLIST.forEach(function (p) {
      var rel = P.filter(function (x) { return (x.kp || []).indexOf(p.id) >= 0; });
      if (!rel.length) return;
      h += '<details class="kp"><summary><span class="id">' + esc(p.id) + '</span>' + esc(p.name) +
        '<span class="stars">' + rel.length + ' 题</span></summary><div class="body">';
      rel.forEach(function (x) {
        h += '<div class="fml"><div class="tex tiny" style="font-size:13px">' + x.year + ' 年 ' + esc(x.no || "") +
          '（' + esc(x.part) + (x.points ? " " + x.points + "分" : "") + '）</div><div class="note">' + esc(x.brief || "") + '</div></div>';
      });
      h += '</div></details>';
    });
    return h;
  }

  function countIn(hay, needle) {
    var n = 0, i = 0;
    if (!needle) return 0;
    while ((i = hay.indexOf(needle, i)) >= 0) { n++; i += needle.length; }
    return n;
  }

  function shortTitle(t) {
    var s = String(t || "").replace(/^第\s*0*\d+\s*课\s*[·.、]?\s*/, "");
    s = s.replace(/^信号与系统[：:]\s*/, "");
    return s.length > 13 ? s.slice(0, 13) + "…" : s;
  }

  function vLesson(id) {
    var idx = -1, L = null, i;
    for (i = 0; i < LESSONS.length; i++) if (String(LESSONS[i].id) === String(id)) { L = LESSONS[i]; idx = i; }
    if (!L) return '<div class="empty">找不到这篇讲义。</div>';

    var sib = LESSONS.filter(function (x) { return x.subject === L.subject; });
    var k = sib.indexOf(L);
    var prev = k > 0 ? sib[k - 1] : null;
    var next = (k >= 0 && k < sib.length - 1) ? sib[k + 1] : null;

    var h = '<div class="row" style="margin-bottom:10px"><button class="btn ghost" data-act="back-notes">‹ 返回</button>' +
      '<span style="flex:1"></span>' +
      '<button class="btn ghost" data-act="drill-subj" data-v="' + esc(L.subject) + '">刷' + esc(L.subject) + '题</button></div>';

    /* 正文 + 目录：给二级标题编号，长讲义能直接跳到某一节 */
    var body = md(L.md), toc = [], tbox = document.createElement("div");
    body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, function (all, inner) {
      var n = toc.length + 1;
      tbox.innerHTML = inner;
      toc.push({ n: n, t: (tbox.textContent || "").replace(/\s+/g, " ").trim() });
      return '<h2 id="sec-' + n + '">' + inner + '</h2>';
    });
    if (toc.length >= 4) {
      h += '<details class="toc"><summary>目录 · 共 ' + toc.length + ' 节<span class="toc-hint">点一下跳过去</span></summary><ol>';
      toc.forEach(function (x) {
        h += '<li><a href="#sec-' + x.n + '" data-sec="' + x.n + '">' + esc(x.t) + '</a></li>';
      });
      h += '</ol></details>';
    }
    h += '<div class="lesson">' + body + '</div>';

    /* 相关考点：先按正文里出现的考点编号匹配，匹配不到再按考点名称匹配 */
    var mdText = L.md || "";
    var seen = {}, relKp = [];
    var pk = (L.subject === "电路") ? /^C/ : /^S/;
    var re = /\b([CS]\d{1,2}(?:-\d{1,2})?)\b/g, m;
    while ((m = re.exec(mdText))) if (pk.test(m[1])) seen[m[1]] = 1;
    var scored = [];
    KPLIST.forEach(function (p) {
      if (!pk.test(p.id)) return;
      var sc = seen[p.id] ? 6 : 0;
      var nm = String(p.name || "").split("（")[0];
      if (nm.length >= 4) sc += countIn(mdText, nm) * 3;
      (p.keys || []).forEach(function (kk) {
        if (String(kk).length >= 4) sc += countIn(mdText, kk);
      });
      if (sc > 0) scored.push({ p: p, sc: sc });
    });
    scored.sort(function (a, b) { return b.sc - a.sc; });
    for (var si = 0; si < scored.length && si < 8; si++) relKp.push(scored[si].p);
    if (relKp.length) {
      var ids = relKp.map(function (p) { return p.id; });
      var rel = (EXAMS.problems || []).filter(function (x) {
        return (x.kp || []).some(function (kk) { return ids.indexOf(kk) >= 0; });
      }).sort(function (a, b) { return b.year - a.year; });

      h += '<div class="card" style="margin-top:18px"><div class="tiny" style="margin-bottom:8px">这篇讲义牵到的考点（点一下看公式）</div>';
      relKp.slice(0, 12).forEach(function (p) {
        h += '<button class="tag kpjump" data-act="kp" data-v="' + esc(p.id) + '" style="margin:0 6px 6px 0">' +
          esc(p.id) + '　' + esc(p.name.slice(0, 12)) + '</button>';
      });
      if (rel.length) {
        h += '<div class="tiny" style="margin-top:8px">这些考点在 ' + rel.length + ' 道真题里出现过：' +
          rel.slice(0, 6).map(function (x) { return x.year + "·" + x.no; }).join("，") +
          (rel.length > 6 ? " …" : "") + '</div>';
      }
      h += '</div>';
    }

    h += '<div class="row" style="margin:14px 0 4px">';
    if (prev) h += '<button class="btn ghost" data-act="lesson" data-v="' + esc(prev.id) + '">‹ ' + esc(shortTitle(prev.title)) + '</button>';
    h += '<span style="flex:1"></span>';
    if (next) h += '<button class="btn ghost" data-act="lesson" data-v="' + esc(next.id) + '">' + esc(shortTitle(next.title)) + ' ›</button>';
    h += '</div>';
    return h;
  }

  /* ============ 统计 ============ */
  function vStats() {
    var i, id;
    var days = [];
    for (i = 13; i >= 0; i--) days.push(addDays(-i));

    var maxN = 1;
    days.forEach(function (d) { var L = DB.log[d]; if (L && L.n > maxN) maxN = L.n; });

    var h = '<div class="card"><h3>近 14 天</h3>';
    h += '<div class="bars">';
    days.forEach(function (d, k) {
      var L = DB.log[d] || { n: 0, ok: 0 };
      var hp = L.n ? Math.max(4, Math.round(L.n / maxN * 100)) : 0;
      var label = d.slice(5).replace("-", "/");
      h += '<div class="bar" title="' + d + '：' + L.n + ' 题">' +
        (hp ? '<i style="height:' + hp + '%;background:' + (L.n && L.ok / L.n >= 0.7 ? "var(--ok)" : "var(--brand)") + '"></i>' : '') +
        '<span>' + (k % 2 === 0 || L.n ? label : "") + '</span></div>';
    });
    h += '</div>';
    h += '<div class="tiny" style="margin-top:8px">绿 = 当天正确率 ≥70%　橙 = 低于 70%　空 = 没做题</div></div>';

    /* 总览 */
    var totalN = 0, totalOk = 0, learned = 0;
    for (id in DB.q) {
      totalN += DB.q[id].n || 0;
      totalOk += DB.q[id].ok || 0;
      if ((DB.q[id].n || 0) > 0) learned++;
    }
    var streak = 0;
    for (i = 0; i < 400; i++) {
      var d0 = addDays(-i);
      var L0 = DB.log[d0];
      if (L0 && L0.n > 0) streak++;
      else if (i > 0) break;
    }
    h += '<div class="stats" style="margin-bottom:12px">' +
      '<div class="stat"><div class="v">' + learned + '</div><div class="k">做过的题</div></div>' +
      '<div class="stat"><div class="v">' + (totalN ? Math.round(totalOk / totalN * 100) : 0) + '%</div><div class="k">累计正确率</div></div>' +
      '<div class="stat"><div class="v">' + streak + '</div><div class="k">连续天数</div></div>' +
      '</div>';

    /* 分科 */
    var bySubj = {};
    QS.forEach(function (q) {
      var r = DB.q[q.id]; if (!r || !r.n) return;
      var s = bySubj[q.subject] = bySubj[q.subject] || { n: 0, ok: 0, all: 0 };
      s.n += r.n; s.ok += r.ok || 0;
    });
    QS.forEach(function (q) { if (bySubj[q.subject]) bySubj[q.subject].all++; });
    h += '<div class="card"><h3>分科</h3>';
    Object.keys(bySubj).forEach(function (k) {
      var s = bySubj[k];
      var rate = Math.round(s.ok / s.n * 100);
      h += '<div class="subjrow"><div class="subjname">' + esc(k) + '</div>' +
        '<div class="subjbar"><i style="width:' + rate + '%"></i></div>' +
        '<div class="subjpct">' + rate + '%</div></div>';
      h += '<div class="tiny" style="margin:-2px 0 10px 44px">累计 ' + s.n + ' 次作答</div>';
    });
    if (!Object.keys(bySubj).length) h += '<div class="tiny">还没做过题。</div>';
    h += '</div>';

    /* 薄弱考点 */
    var kpStat = {};
    QS.forEach(function (q) {
      var r = DB.q[q.id]; if (!r || !r.n) return;
      (q.kp || []).forEach(function (k) {
        var s = kpStat[k] = kpStat[k] || { n: 0, ok: 0 };
        s.n += r.n; s.ok += r.ok || 0;
      });
    });
    var weak = Object.keys(kpStat).filter(function (k) { return kpStat[k].n >= 2; })
      .map(function (k) { return { k: k, n: kpStat[k].n, rate: kpStat[k].ok / kpStat[k].n }; })
      .sort(function (a, b) { return a.rate - b.rate || b.n - a.n; }).slice(0, 10);

    h += '<div class="card"><h3>最该补的考点</h3>';
    if (!weak.length) {
      h += '<div class="tiny">每个考点至少做 2 次，这里才会给出排序。先把题刷起来。</div>';
    } else {
      h += '<div class="tiny" style="margin-bottom:8px">按正确率从低到高，只统计作答 ≥2 次的考点。</div>';
      weak.forEach(function (w) {
        var p = KPMAP[w.k];
        h += '<div class="rowitem tap" data-act="kp" data-v="' + esc(w.k) + '"><div class="num" style="width:auto;min-width:34px;padding:0 5px;font-size:12px;color:' +
          (w.rate < 0.5 ? "var(--bad)" : "var(--ink2)") + ';background:' + (w.rate < 0.5 ? "var(--bad-soft)" : "#f1f3f5") + '">' +
          Math.round(w.rate * 100) + '%</div><div class="main"><div class="t">' + (p ? esc(p.name) : esc(w.k)) + '</div>' +
          '<div class="s">' + esc(w.k) + ' · 作答 ' + w.n + ' 次 · 点开看公式</div></div></div>';
      });
    }
    h += '</div>';

    /* 题库覆盖：哪些考点题量还偏少 */
    var kpN = {};
    QS.forEach(function (q) { (q.kp || []).forEach(function (k) { kpN[k] = (kpN[k] || 0) + 1; }); });
    var thin = KPLIST.filter(function (p) { return (kpN[p.id] || 0) < 3; })
      .sort(function (a, b) { return (kpN[a.id] || 0) - (kpN[b.id] || 0); });
    h += '<div class="card"><h3>题库覆盖 · ' + QS.length + ' 题 / ' + KPLIST.length + ' 个考点</h3>';
    if (!thin.length) {
      h += '<div class="tiny">每个考点都有 3 道以上，随便挑一个刷都行。</div>';
    } else {
      h += '<div class="tiny" style="margin-bottom:8px">这些考点题量还偏少（不足 3 道），点开直接刷它。</div>';
      thin.slice(0, 18).forEach(function (p) {
        h += '<div class="rowitem tap" data-act="kp" data-v="' + esc(p.id) + '"><div class="num">' + (kpN[p.id] || 0) +
          '</div><div class="main"><div class="t">' + esc(p.id) + '　' + esc(p.name) + '</div><div class="s">' +
          esc(p._subj || "") + (p._chapter ? " · " + esc(p._chapter) : "") + '</div></div></div>';
      });
      if (thin.length > 18) h += '<div class="tiny" style="margin-top:8px">还有 ' + (thin.length - 18) + ' 个考点没列出来。</div>';
    }
    h += '</div>';
    return h;
  }

  /* ============ 错题本 ============ */
  function vWrong() {
    var ids = Object.keys(DB.wrong);
    if (!ids.length) {
      return '<div class="empty">错题本是空的。<br>刷题时答错或自评「算错了」，就会自动进来。</div>';
    }
    var t = todayStr();
    var h = '<div class="card"><h3>' + ids.length + ' 道错题</h3><p class="muted">答对就升级，连续答对 6 次才算真正掌握（间隔 1→2→4→7→15→30 天）。</p>' +
      '<button class="btn primary block" data-act="redo-wrong">全部重做</button></div>';

    ids.sort(function (a, b) {
      var ra = DB.q[a] || {}, rb = DB.q[b] || {};
      return (ra.due || "") < (rb.due || "") ? -1 : 1;
    });
    h += '<div class="card">';
    ids.forEach(function (qid, i) {
      var q = pick(qid);
      var r = DB.q[qid] || {};
      var due = r.due ? (r.due <= t ? "今天该复习" : "下次 " + r.due) : "";
      h += '<div class="rowitem tap" data-act="open-q" data-id="' + esc(qid) + '"><div class="num">' + (i + 1) + '</div><div class="main">' +
        '<div class="t">' + esc(q ? lead(q.brief || q.stem || "", 50) : qid) + '</div>' +
        '<div class="s">' + esc(q ? q.subject : "") + ' · 错 ' + (DB.wrong[qid].n || 1) + ' 次 · ' + due + ' · 点开重做</div></div></div>';
    });
    h += '</div>';
    return h;
  }

  /* ============ 事件绑定 ============ */
  /* 同一元素只绑一次：bindView 会在局部重绘后再调用，重复绑会让「下一题」一次跳两题 */
  function once(el, type, fn) {
    if (!el) return;
    var k = "__b_" + type;
    if (el[k]) return;
    el[k] = 1;
    el.addEventListener(type, fn);
  }

  /* 双击收起时保留已渲染内容，只首次展开时生成公式 */
  function listFills() {
    var ds = VIEW.querySelectorAll("details.kp[data-kp]");
    for (var i = 0; i < ds.length; i++) {
      (function (d) {
        once(d, "toggle", function () {
          if (!d.open) return;
          var b = d.querySelector(".body");
          if (!b || b.innerHTML) return;
          var p = KPMAP[d.getAttribute("data-kp")];
          if (p) b.innerHTML = kpBodyHTML(p);
        });
      })(ds[i]);
    }
  }

  /* 年份跳转：吸顶的顶栏 + 年份条会盖住锚点，滚动位置要扣掉它们 */
  function chromeH() {
    var tb = $(".topbar"), yb = $("#yrbar");
    return (tb ? tb.offsetHeight : 0) + (yb ? yb.offsetHeight : 0);
  }
  function jumpYear(y) {
    var el = document.getElementById("y-" + y);
    var bar = $("#yrbar");
    if (bar) {
      var cs = bar.querySelectorAll(".chip");
      for (var k = 0; k < cs.length; k++) cs[k].classList.toggle("on", cs[k].dataset.v === String(y));
    }
    if (!el) return;
    var top = el.getBoundingClientRect().top + window.pageYOffset - chromeH() - 10;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    /* 让选中的年份在横条里居中，长条也能一眼看到当前在哪一年 */
    if (bar) {
      var act = bar.querySelector(".chip.on");
      if (act) bar.scrollLeft = Math.max(0, act.offsetLeft - bar.clientWidth / 2 + act.offsetWidth / 2);
    }
  }

  function bindView() {
    var i, els;

    els = VIEW.querySelectorAll("[data-f]");
    for (i = 0; i < els.length; i++) {
      (function (b) {
        once(b, "click", function () {
          STATE.pin = null;
          STATE.filter[b.dataset.f] = b.dataset.v;
          STATE.qi = 0;
          buildList(); render();
        });
      })(els[i]);
    }

    els = VIEW.querySelectorAll("[data-nt]");
    for (i = 0; i < els.length; i++) {
      (function (b) {
        once(b, "click", function () {
          STATE.noteTab = b.dataset.nt; STATE.q = ""; STATE.lq = ""; render();
        });
      })(els[i]);
    }

    var s = $("#kpsearch");
    if (s) {
      once(s, "input", function () {
        STATE.q = s.value;
        var box = $("#kplist");
        if (box) { box.innerHTML = kpListHTML(); listFills(); }
      });
    }

    listFills();

    var ls = $("#lssearch");
    if (ls) {
      once(ls, "input", function () {
        STATE.lq = ls.value;
        var box2 = $("#lslist");
        if (box2) box2.innerHTML = lessonListHTML();
      });
    }

    var jp = $("#jump");
    if (jp) {
      /* 聚焦时全选，直接输入数字就是跳转，不用先删掉原来的题号 */
      jp.addEventListener("focus", function () { try { jp.select(); } catch (e) { } });
      jp.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); jp.blur(); }
      });
      once(jp, "change", function () {
        var v = parseInt(jp.value, 10);
        if (v >= 1 && v <= STATE.list.length) { STATE.qi = v - 1; render(); }
        else { jp.value = STATE.qi + 1; }
      });
    }

    els = VIEW.querySelectorAll("[data-act]");
    for (i = 0; i < els.length; i++) {
      (function (b) {
        once(b, "click", function () {
          var a = b.dataset.act;
          if (a === "next") { STATE.qi++; if (STATE.qi >= STATE.list.length) STATE.qi = 0; render(); }
          else if (a === "prev") { STATE.qi = (STATE.qi - 1 + STATE.list.length) % STATE.list.length; render(); }
          else if (a === "skip") { STATE.qi = (STATE.qi + 1) % STATE.list.length; render(); }
          else if (a === "reveal") { revealCalc(); }
          else if (a === "ask-ai") { if (window.AI) window.AI.askAbout(STATE.list[STATE.qi]); }
          else if (a === "ask-exam") { if (window.AI) window.AI.askExam(EXAMS.problems[+b.dataset.i]); }
          else if (a === "kp") { STATE.noteTab = "kp"; STATE.q = b.dataset.v; go("notes"); }
          else if (a === "self-ok") { record(STATE.list[STATE.qi].id, true); nextAfterSelf(); }
          else if (a === "self-bad") { record(STATE.list[STATE.qi].id, false); nextAfterSelf(); }
          else if (a === "review") { STATE.filter.mode = "due"; go("drill"); }
          else if (a === "drill") { go("drill"); }
          else if (a === "notes") { go("notes"); }
          else if (a === "wrong") { go("wrong"); }
          else if (a === "redo-wrong") { STATE.pin = null; STATE.filter.mode = "wrong"; go("drill"); }
          else if (a === "open-q") {
            STATE.pin = b.dataset.id;
            try { history.replaceState(null, "", "#q/" + STATE.pin); } catch (e) { }
            go("drill");
          }
          else if (a === "unpin") {
            STATE.pin = null;
            try { history.replaceState(null, "", "#drill"); } catch (e) { }
            go("drill");
          }
          else if (a === "export") { exportDB(); }
          else if (a === "import") { var fi = $("#importFile"); if (fi) fi.click(); }
          else if (a === "wipe") { wipeDB(b); }
          else if (a === "stats") { go("stats"); }
          else if (a === "exam-map") { STATE.noteTab = "exam"; go("notes"); }
          else if (a === "back-notes") { location.hash = ""; go("notes"); }
          else if (a === "lesson") { location.hash = "#lesson-" + b.dataset.v; }
          else if (a === "drill-subj") { STATE.filter.subject = b.dataset.v; STATE.filter.mode = "all"; go("drill"); }
          else if (a === "yr") { jumpYear(b.dataset.v); }
        });
      })(els[i]);
    }

    /* 讲义目录：滚到对应小节，别改 hash（改了会打断路由） */
    var tls = VIEW.querySelectorAll(".toc a[data-sec]");
    for (var ti = 0; ti < tls.length; ti++) {
      (function (a) {
        once(a, "click", function (e) {
          e.preventDefault();
          var t = document.getElementById("sec-" + a.dataset.sec);
          if (!t) return;
          var y = t.getBoundingClientRect().top + window.pageYOffset - chromeH() - 12;
          window.scrollTo({ top: y < 0 ? 0 : y, behavior: "smooth" });
        });
      })(tls[ti]);
    }
  }

  /* ============ 倒计时 ============ */
  function tick() {
    var d = dayDiff(todayStr(), "2026-12-19");
    var el = $("#countdown");
    if (el) el.innerHTML = d > 0 ? '距考试 <b>' + d + '</b> 天' : '考试周';
  }

  /* ============ 路由入口 ============ */
  function onHash() {
    var raw = location.hash.replace(/^#/, "");
    var sub = raw.match(/^notes\/(kp|lesson|exam)$/);
    if (sub) { STATE.noteTab = sub[1]; STATE.q = ""; go("notes"); return; }
    if (/^(today|drill|notes|wrong|stats)$/.test(raw)) { go(raw); return; }
    if (raw === "dark" || raw === "light") { applyTheme(raw); return; }
    var qm = raw.match(/^q\/([A-Za-z0-9_.\-]+)$/);
    if (qm) { STATE.pin = qm[1]; go("drill"); return; }
    var m = location.hash.match(/^#lesson-(.+)$/);
    if (m) {
      var tabs = document.querySelectorAll(".tab");
      for (var i = 0; i < tabs.length; i++) tabs[i].classList.toggle("on", tabs[i].dataset.tab === "notes");
      STATE.tab = "notes";
      VIEW.innerHTML = vLesson(m[1]);
      bindView();
      window.scrollTo(0, 0);
    }
  }

  /* ============ 启动 ============ */
  var THEME = "light";
  function applyTheme(t) {
    THEME = (t === "dark") ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", THEME);
    try { localStorage.setItem("kaoyan829_theme", THEME); } catch (e) { }
    var b = $("#themeBtn");
    if (b) { b.textContent = THEME === "dark" ? "☀" : "◐"; b.title = THEME === "dark" ? "切到浅色" : "切到深色"; }
  }

  function boot() {
    tick();
    setInterval(tick, 60000);

    /* 吸顶栏高度：年份跳转条要贴在它下面 */
    var syncChrome = function () {
      var hd = $(".topbar");
      document.documentElement.style.setProperty("--toph", (hd ? hd.offsetHeight : 0) + "px");
    };
    syncChrome();
    window.addEventListener("resize", syncChrome);
    window.addEventListener("orientationchange", function () { setTimeout(syncChrome, 250); });

    /* 滚动时让年份条跟着高亮，不然手动滑动时不知道自己在哪一年 */
    var yrRaf = 0;
    var yrSync = function () {
      yrRaf = 0;
      var bar = $("#yrbar");
      if (!bar) return;
      var cards = document.querySelectorAll(".exyear");
      if (!cards.length) return;
      var line = chromeH() + 48, cur = cards[0];
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].getBoundingClientRect().top <= line) cur = cards[i];
        else break;
      }
      var y = cur.id.replace("y-", "");
      var chip = bar.querySelector('.chip[data-v="' + y + '"]');
      if (!chip) return;
      if (chip.classList.contains("on")) return;
      var cs = bar.querySelectorAll(".chip");
      for (var k = 0; k < cs.length; k++) cs[k].classList.remove("on");
      chip.classList.add("on");
      /* 只在选中的年份滑出视野时才动横条，避免跟手打架 */
      var lo = bar.scrollLeft, hi = lo + bar.clientWidth;
      if (chip.offsetLeft < lo + 8 || chip.offsetLeft + chip.offsetWidth > hi - 8) {
        bar.scrollLeft = Math.max(0, chip.offsetLeft - bar.clientWidth / 2 + chip.offsetWidth / 2);
      }
    };
    window.addEventListener("scroll", function () {
      if (yrRaf) return;
      yrRaf = requestAnimationFrame(yrSync);
    }, { passive: true });

    /* 主题 */
    var th = "light";
    try { th = localStorage.getItem("kaoyan829_theme") || "light"; } catch (e) { }
    applyTheme(th);
    var tb = $("#themeBtn");
    if (tb) {
      once(tb, "click", function () {
        applyTheme(THEME === "dark" ? "light" : "dark");
      });
    }

    var tabs = document.querySelectorAll(".tab");
    for (var i = 0; i < tabs.length; i++) {
      (function (b) {
        once(b, "click", function () { go(b.dataset.tab); });
      })(tabs[i]);
    }

    window.addEventListener("hashchange", onHash);

    /* 键盘：1-4/ABCD 选项，→ / Enter 下一题，← 上一题，R 看答案 */
    document.addEventListener("keydown", function (e) {
      if (STATE.tab !== "drill" || !STATE.list.length) return;
      var ae = document.activeElement;
      if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      var q = STATE.list[STATE.qi];
      var k = e.key.toLowerCase();

      if (q && q.type === "choice" && /^[1-4a-d]$/.test(k)) {
        var idx = k >= "1" && k <= "4" ? (+k - 1) : "abcd".indexOf(k);
        var opts = document.querySelectorAll("#opts .opt");
        if (opts[idx]) { opts[idx].click(); e.preventDefault(); }
        return;
      }
      if (k === "enter" || k === "arrowright") {
        e.preventDefault();
        STATE.qi++; if (STATE.qi >= STATE.list.length) STATE.qi = 0;
        render();
      } else if (k === "arrowleft") {
        e.preventDefault();
        STATE.qi = (STATE.qi - 1 + STATE.list.length) % STATE.list.length;
        render();
      } else if (k === "r" && q && q.type !== "choice") {
        e.preventDefault(); revealCalc();
      }
    });

    var fi = $("#importFile");
    if (fi) {
      fi.addEventListener("change", function () {
        if (fi.files && fi.files[0]) importDB(fi.files[0]);
        fi.value = "";
      });
    }

    /* 回到顶部：滚过一屏才出现，长讲义/真题地图里很有用 */
    var tb = $("#topBtn");
    if (tb) {
      tb.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    var lastOn = false;
    window.addEventListener("scroll", function () {
      var on = window.pageYOffset > 900;
      if (on !== lastOn && tb) { lastOn = on; tb.classList.toggle("on", on); }
    }, { passive: true });

    var s = loadSess();
    if (s) {
      STATE.filter = {
        subject: s.f.subject || "",
        kp: s.f.kp || "",
        mode: s.f.mode || "all"
      };
      STATE.qi = s.qi;
    }

    /* go() 会改写地址栏，先记下打开时带的 hash，路由完再复原 */
    var bootHash = location.hash;
    go("today");
    if (bootHash !== "#today") {
      try { history.replaceState(null, "", bootHash || location.pathname); } catch (e) { }
    }
    onHash();
  }

  boot();
})();