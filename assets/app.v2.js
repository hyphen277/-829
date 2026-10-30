/* 829 训练台 v2 · 单文件构建（由 _build/p*.js 合成，勿手改） */
/* ============================================================
   p0_fig.js —— 简笔电路图（SVG）
   给自编练习题配示意图。原则：
   · 只画题干里讲清楚的连接关系，参数照抄题干；
   · 画不准就不画（宁可没有图，也不给错图）；
   · 图上标「示意图 · 以题干文字为准」。
   图元统一按「水平放置、占 x∈[-16,16]」绘制，竖放时整体旋转 90°。
   ============================================================ */
(function (A) {
  var C = "#55606d";
  var CF = "#f7f9fb";
  var TX = "#2b3542";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function W(x1, y1, x2, y2) { return "M" + x1 + " " + y1 + "L" + x2 + " " + y2; }
  function wire(x1, y1, x2, y2) { return '<path d="' + W(x1, y1, x2, y2) + '"/>'; }
  function dot(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="2.8" fill="' + C + '" stroke="none"/>'; }
  function cjkW(str) {
    var w = 0;
    for (var i = 0; i < str.length; i++) w += str.charCodeAt(i) > 255 ? 1 : 0.56;
    return w;
  }
  function fit(t, max) {
    if (!t) return t;
    t = String(t);
    if (cjkW(t) <= max) return t;
    var out = "";
    for (var i = 0; i < t.length; i++) {
      if (cjkW(out + t[i]) > max - 1) return out + "…";
      out += t[i];
    }
    return out;
  }
  function lbl(x, y, t, anchor, size) {
    if (!t) return "";
    t = String(t);
    var sz = size || (cjkW(t) > 15 ? 8.4 : cjkW(t) > 11 ? 9.2 : 10.5);
    return '<text x="' + x + '" y="' + y + '" font-size="' + sz + '" fill="' + TX + '"' +
      (anchor ? ' text-anchor="' + anchor + '"' : "") + ">" + esc(t) + "</text>";
  }

  /* ---------- 图元（水平、以原点为中心、端点 ±16） ---------- */
  function bodyR() {
    return '<rect x="-16" y="-6" width="32" height="12" rx="1.5" fill="' + CF + '"/>';
  }
  function bodyC() {
    return '<path d="M-16 0H-4M4 0H16"/>' +
      '<path d="M-4 -11V11M4 -11V11"/>';
  }
  function bodyL() {
    var d = "M-16 0h4";
    for (var i = 0; i < 4; i++) d += "a4 4 0 0 1 8 0";
    return '<path d="' + d + '"/>';
  }
  function bodyV(plus) {
    var s = '<path d="M-16 0H-13M13 0H16"/><circle cx="0" cy="0" r="13" fill="' + CF + '"/>';
    if (plus === "up") s += lbl(-6.5, 4, "+", "middle", 10) + lbl(6, 4, "−", "middle", 10);
    else s += lbl(-6.5, 4, "−", "middle", 10) + lbl(6, 4, "+", "middle", 10);
    return s;
  }
  function bodyI(up) {
    var s = '<path d="M-16 0H-13M13 0H16"/><circle cx="0" cy="0" r="13" fill="' + CF + '"/>';
    s += up
      ? '<path d="M0 9V-9"/><path d="M-4 -4L0 -9L4 -4Z" fill="' + C + '" stroke="none"/>'
      : '<path d="M0 -9V9"/><path d="M-4 4L0 9L4 4Z" fill="' + C + '" stroke="none"/>';
    return s;
  }
  function bodyD(kind) {
    var s = '<path d="M-16 0H-13M13 0H16"/><path d="M0 -13L13 0L0 13L-13 0Z" fill="' + CF + '"/>';
    if (kind === "i") s += '<path d="M0 7V-7"/><path d="M-4 -3L0 -8L4 -3Z" fill="' + C + '" stroke="none"/>';
    else s += lbl(-5, 4, "+", "middle", 9) + lbl(5, 4, "−", "middle", 9);
    return s;
  }
  function bodySW(closed) {
    return dot(-14, 0) + dot(14, 0) + '<path d="M-16 0H-14M14 0H16"/>' +
      (closed ? '<path d="M-13 0H13"/>' : '<path d="M-13 0L8 -13"/>');
  }
  function bodyGND() {
    return '<path d="M0 -16V-4M-9 -4H9M-6 0H6M-3 4H3"/>';
  }

  /* 元件统一入口：vert = 竖放 */
  function elAt(x, y, e, vert) {
    if (!e) return "";
    var k = e.k, body, lab;
    var up = e._below ? 1 : 0;   /* 标签放到元件另一侧，错开相邻标签 */
    var ly = up ? 22 : -1, lyc = up ? 26 : -1;
    if (k === "R") { body = bodyR(); lab = lbl(0, up ? 21 : -12, fit(e.l, 17), "middle"); }
    else if (k === "C") { body = bodyC(); lab = lbl(0, up ? 24 : -16, e.l, "middle"); }
    else if (k === "L") { body = bodyL(); lab = lbl(0, up ? 20 : -10, e.l, "middle"); }
    else if (k === "V") { body = bodyV(e.plus); lab = lbl(0, up ? 28 : -18, e.l, "middle"); }
    else if (k === "I") { body = bodyI(e.dir !== "down"); lab = lbl(0, up ? 28 : -18, e.l, "middle"); }
    else if (k === "CV") { body = bodyD("v"); lab = lbl(0, up ? 30 : -20, e.l, "middle"); }
    else if (k === "CI") { body = bodyD("i"); lab = lbl(0, up ? 30 : -20, e.l, "middle"); }
    else if (k === "sw") { body = bodySW(e.closed); lab = lbl(0, up ? 20 : -16, e.l, "middle"); }
    else if (k === "gnd") { body = bodyGND(); lab = ""; }
    else return lbl(x, y, e.l);

    if (vert) {
      /* 竖放：绕自身旋转 90°，标签放到右侧 */
      return '<g transform="translate(' + x + "," + y + ') rotate(90)">' + body + "</g>" +
        (e.l ? (e._left ? lbl(x - 17, y + 3.5, fit(e.l, 22), "end") : lbl(x + 17, y + 3.5, fit(e.l, 22))) : "");
    }
    /* 横放：图形与标签一起平移（标签此前漏了平移，会跑到左上角） */
    return '<g transform="translate(' + x + "," + y + ')">' + body + lab + "</g>";
  }

  /* ---------- 串联回路 ---------- */
  function genLoop(a) {
    var els = a.els || [];
    var hasPar = els.some(function (e) { return e.par; });
    var Wd = a.w || 320, Hd = a.h || 148;
    if (hasPar) Hd += 30;
    var x0 = 36, x1 = Wd - 26, yT = 40, yB = Hd - 30;
    var s = "";
    s += wire(x0, yT, x0, yB) + wire(x1, yT, x1, yB) + wire(x0, yB, x1, yB);
    if (a.rightSrc) {
      s += elAt(x1, (yT + yB) / 2, { k: "V", l: a.rightSrcL, plus: a.rightPlus || "up" }, true);
    }
    /* 电源在左边竖放 */
    var my = (yT + yB) / 2;
    s += elAt(x0, my, { k: "V", l: a.srcL, plus: a.plus || "up" }, true);
    /* 顶边：元件均分 */
    var n = Math.max(1, els.length), step = (x1 - x0) / n;
    s += wire(x0, yT, x1, yT);
    els.forEach(function (e, i) {
      var cx = x0 + step * (i + 0.5);
      var ee = {}; for (var kk in e) ee[kk] = e[kk];
      ee._below = (i % 2 === 1);
      s += elAt(cx, yT, ee, false);
      s += dot(cx - 16, yT) + dot(cx + 16, yT);
      if (e.par) {
        var py = yT + 36;
        s += wire(cx - 16, yT, cx - 16, py) + wire(cx + 16, yT, cx + 16, py);
        var pp = {}; for (var kk in e.par) pp[kk] = e.par[kk]; pp._below = true;
        s += elAt(cx, py, pp, false) + dot(cx - 16, py) + dot(cx + 16, py);
      }
    });
    if (a.sw) s += elAt(x0 + 56, yB, { k: "sw", l: a.swL || "开关", closed: !!a.swClosed }, false);
    return { w: Wd, h: Hd, body: s };
  }

  /* ---------- 并联（电流源或电压源 + 若干横支路） ---------- */
  function genParallel(a) {
    var br = a.br || [], Wd = a.w || 356, Hd = a.h || 132;
    var x0 = 108, x1 = Wd - 26, yT = 40, yB = Hd - 30;
    var s = wire(x0, yT, x1, yT) + wire(x0, yB, x1, yB);
    var srcE = {}; for (var q in (a.src || { k: "V", l: "U", plus: "up" })) srcE[q] = a.src[q];
    if (!a.src) { srcE = { k: "V", l: "U", plus: "up" }; }
    srcE._left = true;
    s += elAt(x0, (yT + yB) / 2, srcE, true);
    var n = br.length, step = (x1 - x0) / (n + 0.8);
    br.forEach(function (e, i) {
      var cx = x0 + step * (i + 0.9);
      s += dot(cx, yT) + dot(cx, yB);
      if (e && e.els) s += elStack(cx, yT + 8, yB - 8, e.els);
      else { var ee = {}; for (var kk in e) ee[kk] = e[kk]; ee._below = (i % 2 === 1); s += elAt(cx, (yT + yB) / 2, ee, true); }
    });
    return { w: Wd, h: Hd, body: s };
  }

  /* ---------- 节点式：节点 + 向下的支路栈（可含电源支路） ---------- */
  function elStack(x, y1, y2, els) {
    if (!els || !els.length) return wire(x, y1, x, y2);
    var n = els.length, h = (y2 - y1) / n, s = "";
    els.forEach(function (e, i) {
      s += elAt(x, y1 + h * (i + 0.5), e, true);
    });
    return s;
  }
  function genNode(a) {
    var nodes = a.nodes || [], Wd = a.w || 330, Hd = a.h || 176;
    var yN = 40, yG = Hd - 30, x0 = a.leftChain ? 96 : 44;
    var s = "";
    var xs = nodes.map(function (_, i) { return x0 + i * (a.gap || 92); });
    /* 左电源链：从电源到第一个节点，横着排 */
    if (a.leftChain) {
      var y = yN, cx = 36;
      s += elAt(cx, y, a.leftChain[0], false);
      var x = cx + 20;
      for (var i = 1; i < a.leftChain.length; i++) {
        x += 34;
        s += elAt(x, y, a.leftChain[i], false);
      }
      s += wire(x + 16, y, xs[0], y);
      s += elAt(cx, yG, { k: "gnd" }, true) + wire(cx, yG, cx, y + 16);
    }
    s += wire(x0, yG, xs[xs.length - 1], yG);
    if (xs.length > 1) s += wire(xs[0], yN, xs[xs.length - 1], yN);
    nodes.forEach(function (nd, i) {
      var x = xs[i];
      s += dot(x, yN) + (nd.n ? lbl(x + 6, yN - 8, nd.n) : "");
      var brs = nd.br || [];
      brs.forEach(function (b, k) {
        var bx = x + (k === 0 ? 0 : (k % 2 ? 1 : -1) * 32 * Math.ceil(k / 2));
        if (k) s += wire(x, yN, bx, yN) + dot(x, yN);
        var els = b.els || (b.k ? [b] : []);
        s += wire(bx, yN, bx, yN + 10);
        s += elStack(bx, yN + 10, yG - 10, els);
        s += wire(bx, yG - 10, bx, yG);
        if (b.land) s += dot(bx, yG) + lbl(bx + 5, yG + 13, b.land);
        else s += elAt(bx, yG, { k: "gnd" }, true);
      });
    });
    return { w: Wd, h: Hd, body: s };
  }


  /* ---------- 一端口 / 二端网络盒子 ---------- */
  function genBox(a) {
    var Wd = a.w || 300, Hd = a.h || 150;
    var bx = 96, by = 44, bw = 104, bh = 66;
    var s = "";
    s += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" rx="3" fill="' + CF + '"/>';
    s += lbl(bx + bw / 2, by + bh / 2 + 4, a.name || "含源一端口 N", "middle", 10.5);
    if (a.sub) s += lbl(bx + bw / 2, by + bh + 16, a.sub, "middle", 9);
    /* 右端两个端子 a / b */
    s += dot(bx + bw, by + 14) + lbl(bx + bw + 6, by + 10, "a");
    s += dot(bx + bw, by + bh - 14) + lbl(bx + bw + 6, by + bh - 18, "b");
    if (a.load) {
      var lx = bx + bw + 54;
      s += wire(bx + bw, by + 14, lx, by + 14) + wire(bx + bw, by + bh - 14, lx, by + bh - 14) +
        wire(lx, by + 14, lx, by + 22) + wire(lx, by + bh - 22, lx, by + bh - 14) +
        elAt(lx, (by + 14 + by + bh - 14) / 2, a.load, true);
      s += lbl(lx + 17, by + bh / 2 + 4, a.loadL || "");
    }
    if (a.left) {
      s += wire(16, by + 14, bx, by + 14) + wire(16, by + bh - 14, bx, by + bh - 14);
      s += lbl(18, by + 8, a.left[0] || "") ;
      if (a.leftMesh !== false) s += elAt(16, (by + 14 + by + bh - 14) / 2, { k: "V", l: a.leftL || "U" }, true);
    }
    return { w: Wd, h: Hd, body: s };
  }

  function svg(o) {
    var pad = 8;
    var W2 = o.w + pad * 2, H2 = o.h + pad * 2;
    return '<svg class="cfig" viewBox="0 0 ' + W2 + " " + H2 + '" ' +
      'style="display:block;width:100%;max-width:' + W2 + 'px;height:auto" role="img">' +
      '<g stroke="' + C + '" stroke-width="1.7" stroke-linecap="round" fill="none" transform="translate(' + pad + "," + pad + ')">' +
      o.body + "</g>" +
      '<text x="' + (W2 - pad) + '" y="' + (H2 - 3) + '" font-size="9.5" fill="#a7b1bd" text-anchor="end">仅供参考</text>' +
      "</svg>";
  }

  A.cfig = function (kind, a) {
    var o;
    if (kind === "loop") o = genLoop(a || {});
    else if (kind === "parallel") o = genParallel(a || {});
    else if (kind === "node") o = genNode(a || {});
    else if (kind === "box") o = genBox(a || {});
    else return "";
    return svg(o);
  };
})(window.A = window.A || {});
/* 题目 id → 图 */
(function (A) {
  A.qfig = function (id) {
    var spec = window.QFIGS && window.QFIGS[id];
    if (!spec) return "";
    try { return A.cfig(spec.t, spec.a); } catch (e) { return ""; }
  };
})(window.A = window.A || {});

﻿/* ==========================================================================
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
  /* 上下标：纯文本预览里也把 R_2 / i_{R2} / ^{2} 变成 R₂ / iR₂ / ²，别退化成 R2 */
  var SUBMAP = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉",
    "+": "₊", "-": "₋", "=": "₌", "(": "₍", ")": "₎",
    a: "ₐ", e: "ₑ", h: "ₕ", i: "ᵢ", j: "ⱼ", k: "ₖ", l: "ₗ", m: "ₘ", n: "ₙ", o: "ₒ", p: "ₚ", r: "ᵣ", s: "ₛ", t: "ₜ", u: "ᵤ", v: "ᵥ", x: "ₓ" };
  var SUPMAP = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    "+": "⁺", "-": "⁻", "=": "⁼", "(": "⁽", ")": "⁾", n: "ⁿ", i: "ⁱ" };
  var toSub = function (s) {
    var o = "";
    for (var i = 0; i < s.length; i++) {
      var c = SUBMAP[s.charAt(i)] || SUBMAP[s.charAt(i).toLowerCase()];
      if (!c) return null;
      o += c;
    }
    return o;
  };
  var toSup = function (s) {
    var o = "";
    for (var i = 0; i < s.length; i++) {
      var c = SUPMAP[s.charAt(i)];
      if (!c) return null;
      o += c;
    }
    return o;
  };
  var subsup = function (s) {
    return String(s)
      .replace(/_\{([^{}]{1,6})\}/g, function (m, x) { return toSub(x) || x; })
      .replace(/\^\{([^{}]{1,6})\}/g, function (m, x) { return toSup(x) || x; })
      .replace(/_([0-9A-Za-z])/g, function (m, x) { return toSub(x) || x; })
      .replace(/\^([0-9])/g, function (m, x) { return toSup(x) || x; });
  };
  A.subsup = subsup;
  var plain = function (s) {
    var t = subsup(String(s == null ? "" : s));
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
      v: 3, q: {}, log: {}, wrong: {}, star: {}, mock: {}, exam: {}, note: {}, hl: {}, read: {}, pos: {}, fs: 0,
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
    o.hl = o.hl || {};
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

  /* 手机切走/关页时立刻落盘，别让 120ms 的延迟吞掉最后一条记录 */
  (function () {
    function flush() { try { saveNow(); } catch (e) { } }
    if (document.addEventListener) {
      document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") flush(); });
      window.addEventListener("pagehide", flush);
      window.addEventListener("beforeunload", flush);
    }
  })();
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
      flt: { mode: f.mode || "all", kp: f.kp || "", subject: f.subject || "", kw: f.kw || "" },
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
    if (f.kw) s += " · 搜「" + (String(f.kw).length > 8 ? String(f.kw).slice(0, 8) + "…" : f.kw) + "」";
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
    DB.backupAt = Date.now();
    save();
    var payload = { app: "kaoyan829", v: 3, at: new Date().toISOString(), db: DB };
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
        DB.backupAt = Date.now();
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

  /* 粘贴文本导入：与文件导入同一套校验与确认 */
  function importText(txt) {
    var o = null;
    try { o = JSON.parse(String(txt || "").trim()); } catch (e) { toast("这段文本不是合法 JSON，检查有没有复制完整", "bad"); return; }
    var d = (o && o.db) ? o.db : o;
    if (!d || !d.q) { toast("这不像是 829 的备份", "bad"); return; }
    if (A.ask) A.ask("导入会覆盖当前所有记录，确定吗？", function () {
      DB = A.DB = migrate(d);
      DB.backupAt = Date.now();
      saveNow(); toast("导入成功", "ok");
      A.render();
    }, "导入");
  }
  A.importText = importText;
  A.backupInfo = function () {
    var at = DB.backupAt || 0;
    if (!at) return { at: 0, days: -1, text: "还没导出过备份", warn: true };
    var days = Math.floor((Date.now() - at) / 86400000);
    return {
      at: at, days: days, warn: days >= 7,
      text: days <= 0 ? "今天已经备份过" : ("上次备份：" + days + " 天前")
    };
  };

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
    p._i = i; p._school = "guet"; p._imgdir = "gt";
    p.id = p.id || ("G" + (p.year || "") + "-" + (p.no || i));
  });
  EPROB.forEach(function (p) { p._school = "shu"; p._imgdir = "zt"; });

  var SCHOOLS = [
    { id: "shu", name: "上海大学 829", short: "上大 829", imgdir: "zt", list: EPROB, ready: EPROB.length > 0 },
    { id: "guet", name: "桂林电子科技大学 806", short: "桂电 806", imgdir: "gt", list: GUETPROB,
      ready: GUETPROB.length > 0, papers: GUET.papers || null }
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

  var LESSONS = (window.LESSONS_META || window.LESSONS || []).slice();
  var LESSON_MAP = {};
  LESSONS.forEach(function (l) { LESSON_MAP[l.id] = l; });

  /* 讲义正文是按科目懒加载的大文件（电路 200KB / 信号 400KB），首屏只带 meta */
  var LSRC = ["data/lessons_body_circuit.js", "data/lessons_body_signal.js"];
  var L_LOADING = false, L_CB = [], L_FAIL = 0;
  A.lessonsReady = function () {
    if (!LESSONS.length) return true;
    for (var i = 0; i < LESSONS.length; i++) if (!LESSONS[i].md) return false;
    return true;
  };
  A.ensureLessons = function (cb) {
    if (A.lessonsReady()) { if (cb) cb(); return; }
    if (cb) L_CB.push(cb);
    if (L_LOADING) return;
    L_LOADING = true;
    var i = 0;
    (function next() {
      if (i >= LSRC.length) {
        L_LOADING = false;
        var B = window.LESSONS_BODY || {};
        LESSONS.forEach(function (l) { if (!l.md && B[l.id]) l.md = B[l.id]; });
        var cbs = L_CB.splice(0);
        cbs.forEach(function (f) { try { f(); } catch (e) { } });
        return;
      }
      var s = document.createElement("script");
      s.src = LSRC[i++]; s.async = false;
      s.onload = next;
      s.onerror = function () {
        L_LOADING = false; L_FAIL++;
        if (A.toast) {
          A.toast(navigator.onLine === false
            ? "现在没网，这一讲的正文还没缓存过；连上网再打开一次就会存下来"
            : "讲义正文加载失败，检查网络后重试");
        }
        var cbs = L_CB.splice(0); cbs.forEach(function (f) { try { f(); } catch (e) { } });
      };
      document.head.appendChild(s);
    })();
  };

  A.QS = QS; A.QMAP = QMAP; A.EXAMS = EXAMS; A.EPROB = EPROB;
  A.SCHOOLS = SCHOOLS; A.schoolOf = schoolOf; A.GUETPROB = GUETPROB;
  A.SUBJ = SUBJ; A.KPMAP = KPMAP; A.KPLIST = KPLIST; A.LESSONS = LESSONS; A.LESSON_MAP = LESSON_MAP;

  /* 某考点的历年真题（只对上大有考点标注的有效） */
  function examByKp(kp, limit) {
    var out = [];
    (EPROB || []).forEach(function (p, i) {
      if ((p.kp || []).indexOf(kp) >= 0) out.push({ i: i, p: p });
    });
    out.sort(function (a, b) { return Number(b.p.year) - Number(a.p.year); });
    return out.slice(0, limit || 4);
  }
  A.examByKp = examByKp;

  /* 读图专项：两个院校里所有「电路」真题，全部带原卷图 */
  var FIGLIST = null;
  function figList() {
    if (FIGLIST) return FIGLIST;
    var out = [];
    ["shu", "guet"].forEach(function (sid) {
      var sch = schoolOf(sid);
      (sch.list || []).forEach(function (p) {
        var part = String(p.part || "");
        if (part.indexOf("电路") < 0) return;
        if (!p.page) return;
        out.push({ sid: sid, sch: sch, p: p });
      });
    });
    out.sort(function (a, b) {
      if (a.sid !== b.sid) return a.sid === "shu" ? -1 : 1;   /* 先上大，再桂电 */
      if (Number(b.p.year) !== Number(a.p.year)) return Number(b.p.year) - Number(a.p.year);
      return String(a.p.no || "").localeCompare(String(b.p.no || ""));
    });
    FIGLIST = out;
    return out;
  }
  A.figList = figList;

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
  /* 真题自评：真题没有题库条目，单独记在 DB.exam；同样按艾宾浩斯排到期日 */
  function recordExam(qid, g) {
    if (!qid) return;
    var r = DB.exam[qid] || { n: 0, ok: 0, lvl: 0, okSeq: 0, due: todayStr() };
    r.n++;
    if (g === "ok") {
      r.ok++;
      r.okSeq = (r.okSeq || 0) + 1;
      r.lvl = Math.min((r.lvl || 0) + 1, STEPS.length - 1);
      r.due = addDays(STEPS[r.lvl]);
    } else {
      r.okSeq = 0;
      r.lvl = 0;
      r.due = addDays(g === "fuzzy" ? 2 : 1);
    }
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
  function examGrade(qid) { var r = DB.exam && DB.exam[qid]; return r ? (r.g || "") : ""; }
  A.examGrade = examGrade;

  /* 真题到期复习：今天该重看的真题 id 列表（不会/不熟且到期） */
  function examIsDue(qid) {
    var r = DB.exam && DB.exam[qid];
    if (!r || !r.due) return false;
    if (r.g === "ok" && (r.okSeq || 0) >= 3) return false;
    return r.due <= todayStr();
  }
  function examDueList() {
    var out = [], k;
    for (k in (DB.exam || {})) if (examIsDue(k)) out.push(k);
    return out;
  }

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

  /* ---------- 讲义划线重点：DB.hl[lessonId] = [{t:"选中的文字", at:"日期"}] ---------- */
  function hlList(id) { return (DB.hl && DB.hl[id]) ? DB.hl[id].slice() : []; }
  function hlCount(id) { return hlList(id).length; }
  function hlAdd(id, t) {
    t = String(t || "").replace(/\s+/g, " ").trim();
    if (!id || t.length < 2) return false;
    if (t.length > 160) t = t.slice(0, 160);
    DB.hl = DB.hl || {};
    var arr = DB.hl[id] = DB.hl[id] || [];
    for (var i = 0; i < arr.length; i++) if (arr[i].t === t) return false;
    arr.push({ t: t, at: todayStr() });
    save();
    return true;
  }
  function hlDel(id, t) {
    if (!DB.hl || !DB.hl[id]) return false;
    var before = DB.hl[id].length;
    DB.hl[id] = DB.hl[id].filter(function (x) { return x.t !== t; });
    if (!DB.hl[id].length) delete DB.hl[id];
    save();
    return DB.hl[id] ? DB.hl[id].length !== before : true;
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
  /* 某一年的整套卷子涉及哪些扫描页（升序，去重） */
  A.paperPages = function (schoolId, year) {
    var sch = schoolOf(schoolId || "shu"), set = {};
    if (sch.papers && sch.papers[year] && sch.papers[year].length) {
      return sch.papers[year].slice().sort(function (a, b) { return a - b; });
    }
    (sch.list || []).forEach(function (p) {
      if (Number(p.year) !== Number(year)) return;
      if (p.page) set[p.page] = 1;
      if (p.page2) set[p.page2] = 1;
      (p.pages || []).forEach(function (x) { if (x) set[x] = 1; });
    });
    return Object.keys(set).map(Number).sort(function (a, b) { return a - b; });
  };

  /* 薄弱考点：按正确率从低到高（做题次数不够的不算） */
  A.weakKps = function (minN, limit) {
    var kpStat = {};
    (A.QS || []).forEach(function (q) {
      var r = A.DB && A.DB.q && A.DB.q[q.id]; if (!r || !r.n) return;
      (q.kp || []).forEach(function (k) {
        var st = kpStat[k] = kpStat[k] || { n: 0, ok: 0 };
        st.n += r.n; st.ok += r.ok;
      });
    });
    return Object.keys(kpStat).filter(function (k) { return kpStat[k].n >= (minN || 2); })
      .map(function (k) { return { k: k, rate: kpStat[k].ok / kpStat[k].n, n: kpStat[k].n }; })
      .filter(function (x) { return x.rate < 0.7; })
      .sort(function (a, b) { return a.rate - b.rate; })
      .slice(0, limit || 8);
  };

  /* 全部考点的做题统计（做过的和没做过的都返回），供热力图用 */
  A.kpStats = function () {
    var st = {};
    (A.QS || []).forEach(function (q) {
      var r = A.DB && A.DB.q && A.DB.q[q.id]; if (!r || !r.n) return;
      (q.kp || []).forEach(function (k) {
        var o = st[k] = st[k] || { n: 0, ok: 0 };
        o.n += r.n; o.ok += r.ok;
      });
    });
    var out = [];
    Object.keys(A.KPMAP || {}).forEach(function (k) {
      var s = st[k] || { n: 0, ok: 0 };
      out.push({ k: k, name: (A.KPMAP[k] || {}).name || k, n: s.n, ok: s.ok, rate: s.n ? s.ok / s.n : -1 });
    });
    return out;
  };

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

  A.record = record; A.recordExam = recordExam; A.examDone = examDone; A.examIsDue = examIsDue; A.examDueList = examDueList; A.noteGet = noteGet; A.noteSet = noteSet; A.noteCount = noteCount;

  /* 错因标签：同一个错题只挂一个标签，再点一次取消 */
  function setWhy(qid, why) {
    var w = DB.wrong && DB.wrong[qid];
    if (!w) return;
    if (w.why === why) delete w.why; else w.why = why;
    save();
  }
  function whyStats() {
    var c = {}, k, w;
    for (k in (DB.wrong || {})) {
      w = DB.wrong[k];
      if (w && w.why) c[w.why] = (c[w.why] || 0) + 1;
    }
    return c;
  }
  A.setWhy = setWhy; A.whyStats = whyStats;
  A.markRead = markRead; A.isRead = isRead; A.readCount = readCount; A.posGet = posGet; A.posSet = posSet; A.master = master; A.unmaster = unmaster; A.toggleStar = toggleStar;
  A.hlList = hlList; A.hlCount = hlCount; A.hlAdd = hlAdd; A.hlDel = hlDel;

  /* 讲义全文搜索：把 md 去掉符号后找关键词，返回命中处数与前后文 */
  function mdPlain(s) {
    return String(s || "")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[#>*`_~|]/g, " ")
      .replace(/\s+/g, " ");
  }
  function lessonSearch(q) {
    q = String(q || "").trim().toLowerCase();
    if (q.length < 1) return [];
    if (!A.lessonsReady()) { A.ensureLessons(null); return []; }
    var out = [];
    (A.LESSONS || []).forEach(function (l) {
      var s = mdPlain(l.md), low = s.toLowerCase();
      var at = low.indexOf(q);
      if (at < 0) return;
      var n = 0, p = 0;
      while (at >= 0 && n < 999) { n++; p = at + q.length; at = low.indexOf(q, p); }
      var snip = [], k = 0, pos = 0;
      while (snip.length < 2) {
        var i2 = low.indexOf(q, pos);
        if (i2 < 0) break;
        var st = Math.max(0, i2 - 26), en = Math.min(s.length, i2 + q.length + 32);
        snip.push((st > 0 ? "…" : "") + s.slice(st, en).trim() + (en < s.length ? "…" : ""));
        pos = i2 + q.length;
      }
      out.push({ id: l.id, title: l.title, subject: l.subject, n: n, snip: snip });
    });
    out.sort(function (a, b) { return b.n - a.n; });
    return out;
  }
  A.mdPlain = mdPlain; A.lessonSearch = lessonSearch;

  /* 全站搜索：一个框同时搜题库 / 真题 / 考点 / 讲义 */
  function gsearch(q) {
    q = String(q || "").trim();
    var out = { q: q, qs: [], exams: [], kps: [], lessons: [], n: 0 };
    if (q.length < 1) return out;
    var low = q.toLowerCase(), i, o;
    for (i = 0; i < (A.QS || []).length && out.qs.length < 8; i++) {
      o = A.QS[i];
      var hay = (o.stem || "") + " " + (o.solution || "") + " " + (o.subject || "") + " " +
        (o.kp || []).map(function (k) { var p = A.KPMAP[k]; return p ? p.name : k; }).join(" ");
      if (hay.toLowerCase().indexOf(low) >= 0) out.qs.push(o);
    }
    for (i = 0; i < (A.EPROB || []).length && out.exams.length < 6; i++) {
      o = A.EPROB[i];
      var eh = String(o.year) + " " + (o.no || "") + " " + (o.brief || "") + " " + (o.kp || []).join(" ");
      if (eh.toLowerCase().indexOf(low) >= 0) out.exams.push({ i: i, p: o });
    }
    for (i = 0; i < (A.KPLIST || []).length && out.kps.length < 6; i++) {
      o = A.KPLIST[i];
      if (((o.name || "") + " " + (o.id || "")).toLowerCase().indexOf(low) >= 0) out.kps.push(o);
    }
    out.lessons = lessonSearch(q).slice(0, 4);
    out.n = out.qs.length + out.exams.length + out.kps.length + out.lessons.length;
    return out;
  }
  A.gsearch = gsearch;
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
    flt: { mode: "all", subject: "", kp: "", year: 0, kw: "" },
    qi: 0, list: [], pin: null,
    answered: {},          /* 本轮已看答案的题 id（避免刷新后重复判分） */
    noteTab: "kp", lq: "", nq: "",
    examSchool: "shu",
    examYear: 0, examType: "", examDiff: "", examPart: "", examHot: 0, examDue: 0,
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
  function imgSrc(f) {
    if (!f) return "";
    if (/^https?:/.test(f) || /^assets\//.test(f)) return f;
    return "assets/zt/" + f;
  }
  A.imgSrc = imgSrc;
  function pageImg(dir, n) {
    return "assets/" + (dir || "zt") + "/p" + String(n).padStart(3, "0") + ".jpg";
  }
  A.pageImg = pageImg;
  function figHTML(list, alt) {
    if (!list || !list.length) return "";
    var h = '<div class="figs">';
    list.forEach(function (f) {
      var src = imgSrc(f);
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
    var dir = (p && p._imgdir) || "zt";
    if (p.img && p.img.length) return p.img.slice();
    if (p.page) a.push(pageImg(dir, p.page));
    if (p.page2) a.push(pageImg(dir, p.page2));
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
    if (f.kw) {
      var kw = String(f.kw).toLowerCase();
      arr = arr.filter(function (q) {
        var kpText = (q.kp || []).map(function (k) { return (A.KPMAP[k] && A.KPMAP[k].name) || k; }).join(" ");
        var hay = (q.stem || "") + " " + (q.solution || "") + " " + kpText + " " + (q.subject || "");
        return hay.toLowerCase().indexOf(kw) >= 0;
      });
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

    h += '<div class="fb-kp"><span class="fb-kplabel">考什么</span>' + kpChips(q, true) +
      (function () {
        var lid = null;
        (q.kp || []).some(function (k) { var l = A.lessonOfKp && A.lessonOfKp(k); if (l) { lid = l; return true; } return false; });
        if (!lid || !A.LESSON_MAP[lid]) return "";
        return '<button class="fblink" data-act="gotolesson" data-v="' + esc(lid) + '">看本考点讲义 ›</button>';
      })() + "</div>";
    /* 同考点的真题：练习题做完就能看到真实的原卷（带电路图） */
    (function () {
      var ks = q.kp || [], hits = [], seen = {};
      ks.forEach(function (k) {
        (A.examByKp(k, 3) || []).forEach(function (x) {
          if (seen[x.p.id]) return;
          seen[x.p.id] = 1; hits.push(x);
        });
      });
      if (!hits.length) return;
      hits.sort(function (a, b) { return Number(b.p.year) - Number(a.p.year); });
      h += '<div class="fb-sec"><div class="fb-h"><i>🧾</i>同考点真题 · 原卷带图</div><div class="exlist">';
      hits.slice(0, 3).forEach(function (x) {
        h += '<button class="exrow" data-act="open-exam" data-s="shu" data-v="' + x.i + '">' +
          "<b>" + esc(String(x.p.year)) + "</b>" +
          '<span class="exno">' + esc(x.p.no || "") + "</span>" +
          '<span class="exbrief tiny muted">' + esc(A.lead(A.plain(x.p.brief || ""), 20)) + "</span></button>";
      });
      h += '</div><div class="tiny muted">点开是当年卷子的扫描页，电路图就在卷面上。</div></div>';
      h += '<div class="row" style="margin:2px 0 10px"><button class="btn ghost sm" data-act="figdrill">⚡ 去「读图专项」练带图的电路题</button></div>';
    })();

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
    /* 这道题的考点在真题里考过几次（只对高频才显示，避免噪音） */
    var fqMax = 0;
    (q.kp || []).forEach(function (k) { var n = A.FREQ10[k] || 0; if (n > fqMax) fqMax = n; });
    if (fqMax >= 2) h += '<span class="tag hot" title="近十年真题里这个考点出现的次数">近十年考 ' + fqMax + " 次</span>";
    h += '<span class="tag d" title="难度 ' + esc(A.num(q.difficulty, 3)) + '">' + diffStars(q.difficulty) + "</span>";
    h += '<button class="starbtn' + (A.isStar(q.id) ? " on" : "") + '" data-act="star" data-v="' + esc(q.id) + '" title="收藏这道题">' +
      (A.isStar(q.id) ? "★" : "☆") + "</button>";
    h += "</div>";

    h += '<div class="stem">' + md(q.stem) + "</div>";
    if (A.qfig) { var fg = A.qfig(q.id); if (fg) h += '<div class="qfig">' + fg + '<div class="figcap">示意图由题干参数生成 · 仅供参考</div></div>'; }
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

    /* 读图专项：换一种练法，专门看带电路图的真题 */
    h += '<div class="row" style="margin:2px 0 6px"><button class="btn ghost sm figentry" data-act="figdrill">' +
      '⚡ 读图专项 · 只看带电路图的真题（' + (A.figList() || []).length + " 道）</button></div>";

    /* 关键词筛选：只在本轮列表里搜，不动题库 */
    h += '<div class="kwrow"><input id="kwsearch" class="kwsearch" type="search" placeholder="搜题干 / 解析 / 考点关键词" value="' +
      esc(f.kw || "") + '">' +
      (f.kw ? '<button class="btn ghost sm" data-act="kwclear">清空</button>' : "") + "</div>";

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
    if (f.kw) h += '<div class="tiny muted kwline">关键词「' + esc(f.kw) + "」匹配到 " + ST.list.length + " 道（搜题干、解析、考点名）</div>";
    if (!f.kw && !f.kp) h += '<div class="tiny muted kwline">下面是随堂练习 ' + A.QS.length +
      " 道（自编，带解析）；真题原卷 " + (A.EPROB || []).length + " 道在「真题」页</div>";

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
    var nd = A.examDueList().length;
    if (nd) {
      h += '<button class="chip alt' + (ST.examDue ? " on" : "") + '" data-f="examDue" data-v="' + (ST.examDue ? "0" : "1") + '">真题待复习 ' + nd + "</button>";
    }
    h += "</div>";
    h += '<div class="chips">';
    [["", "电路+信号"], ["电路", "电路"], ["信号", "信号"]].forEach(function (p) {
      h += '<button class="chip' + (ST.examPart === p[0] ? " on" : "") + '" data-f="examPart" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";
    return h;
  }

  function examMatch(p) {
    if (ST.examDue && !A.examIsDue(p.id)) return false;
    if (ST.examYear && Number(p.year) !== Number(ST.examYear)) return false;
    if (ST.examKp && (p.kp || []).indexOf(ST.examKp) < 0) return false;
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

  /* 整卷模式：一年一套，按页翻原卷，适合掐时间做整套 */
  function vPaper(year, idx) {
    var sch = A.schoolOf(ST.examSchool || "shu");
    var pages = A.paperPages(sch.id, year);
    var total = pages.length;
    if (!total) return '<div class="card"><p>这一年的原卷页还没接入。</p></div>';
    var i = Math.max(0, Math.min(total - 1, A.num(idx, 0)));
    var f = A.pageImg(sch.imgdir, pages[i]);
    var probs = (sch.list || []).filter(function (p) {
      return Number(p.year) === Number(year) && (!ST.examYear || Number(p.year) === Number(ST.examYear));
    });
    var h = '<div class="paperhead"><button class="btn ghost sm" data-act="paper-close">‹ 真题列表</button>' +
      "<b>" + esc(sch.short) + " · " + esc(String(year)) + " 年整卷</b>" +
      '<span class="tiny muted">第 ' + (i + 1) + " / " + total + " 页</span></div>";
    h += '<div class="paperwrap"><img src="' + esc(f) + '" alt="' + esc(String(year)) + " 年第 " + (i + 1) + ' 页" ' +
      'data-act="zoom" data-src="' + esc(f) + '" data-alt="原卷"></div>';
    h += '<div class="ptimerbar" id="ptimerbar">' +
      '<span class="ptimer" id="ptimer">--:--</span>' +
      '<button class="btn ghost sm" data-act="ptimer">开始计时（3 小时）</button>' +
      '<button class="btn ghost sm" data-act="ptimer-clear">清零</button>' +
      '<button class="btn primary sm" data-act="paper-submit">交卷复盘</button></div>';
    var rv = ST.paperReview;
    if (rv) {
      var cnt = { ok: 0, fuzzy: 0, no: 0 }, done = 0;
      probs.forEach(function (p) { var g = A.examGrade(p.id); if (g) { done++; cnt[g] = (cnt[g] || 0) + 1; } });
      var rate = done ? Math.round(cnt.ok / done * 100) : 0;
      h += '<div class="card reviewcard"><div class="h4">本卷复盘 <span class="tiny muted">' + esc(sch.short) + " · " + esc(String(year)) + " 年</span></div>";
      h += '<div class="stats4">' +
        '<div class="sb"><b>' + (rv.used == null ? "--" : rv.used) + '</b><span>用时(分)</span></div>' +
        '<div class="sb"><b>' + done + "/" + probs.length + '</b><span>已自评</span></div>' +
        '<div class="sb"><b>' + rate + '%</b><span>会做率</span></div>' +
        '<div class="sb"><b>' + (cnt.fuzzy + cnt.no) + '</b><span>待补</span></div></div>';
      if (done < probs.length) {
        h += '<div class="tiny muted" style="margin-top:6px">还有 ' + (probs.length - done) + " 道没自评，下面逐题点一下就能补上，统计会实时更新。</div>";
      }
      h += '<div class="revlist">';
      probs.forEach(function (p) {
        var g = A.examGrade(p.id);
        var mark = g === "ok" ? '<i class="rvok">会</i>' : g === "fuzzy" ? '<i class="rvfu">不熟</i>' : g === "no" ? '<i class="rvno">不会</i>' : '<i class="rvnone">未评</i>';
        h += '<div class="rvrow' + (g === "no" || g === "fuzzy" ? " weak" : "") + '">' +
          '<span class="rvno">' + esc(p.no || "") + "</span>" + mark +
          '<span class="rvbtns">' +
          '<button class="gbtn g-ok' + (g === "ok" ? " sel" : "") + '" data-act="grade-exam" data-v="' + p._i + '" data-g="ok">会</button>' +
          '<button class="gbtn g-fu' + (g === "fuzzy" ? " sel" : "") + '" data-act="grade-exam" data-v="' + p._i + '" data-g="fuzzy">不熟</button>' +
          '<button class="gbtn g-no' + (g === "no" ? " sel" : "") + '" data-act="grade-exam" data-v="' + p._i + '" data-g="no">不会</button>' +
          "</span>" +
          '<button class="ibtn" data-act="review-open" data-v="' + p._i + '" title="看这道题">›</button></div>';
      });
      h += "</div>";
      h += '<div class="tiny muted" style="margin-top:8px">不熟和不会的题已经进了「重测」，明天会在首页提醒你再做一遍；想马上二刷就点每题右边的 ›。</div>';
      h += "</div>";
    }
    h += '<div class="paperbar">' +
      '<button class="btn ghost' + (i === 0 ? " dis" : "") + '" data-act="paper-go" data-v="' + (i - 1) + '">‹ 上一页</button>' +
      '<span class="paperno">' + (i + 1) + " / " + total + "</span>" +
      '<button class="btn ghost' + (i === total - 1 ? " dis" : "") + '" data-act="paper-go" data-v="' + (i + 1) + '">下一页 ›</button>' +
      "</div>";
    if (probs.length) {
      h += '<div class="card"><div class="h4">这套卷子的题 <span class="tiny muted">' + probs.length + ' 道</span></div>' +
        '<div class="tiny muted">整套做完再逐题自评，也可以直接点某一题去看它对应的原卷位置。</div>';
      probs.forEach(function (p) {
        h += '<button class="exrow" data-act="open-exam" data-s="' + esc(p._school || sch.id) + '" data-v="' + p._i + '">' +
          '<b>' + esc(p.no || "") + "</b>" +
          '<span class="exno">' + esc(p.part || "") + "</span>" +
          '<span class="exbrief tiny muted">' + esc(A.lead(A.plain(p.brief || ""), 20)) + "</span></button>";
      });
      h += "</div>";
    }
    return h;
  }
  A.vPaper = vPaper;

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
    h += '<div class="tiny muted" style="margin:-2px 0 2px">已自评 ' + doneAll + " / " + all.length + " 道　·　" +
      "这里只放真题原卷；随堂练习 " + A.QS.length + " 道在「刷题」页，两套互不重复</div>";
    h += '<p class="muted tiny">题干按原卷整理成索引；点「原卷」看当年扫描页，题干和电路图都在上面，改动为零。' +
      "做题时用三档自评，判分由你自己来。选好年份后可以「看整卷」，配 3 小时倒计时模拟考场。</p>";
    /* 年份选择条：全放进来，横滑即可 */
    h += '<div class="yearchips">';
    h += '<button class="chip yearchip' + (!ST.examYear ? " on" : "") + '" data-f="year" data-v="0">全部</button>';
    ys.forEach(function (y) {
      var arr = years[y] || [];
      var dn = arr.filter(function (p) { return A.examDone(p.id); }).length;
      h += '<button class="chip yearchip' + (Number(ST.examYear) === y ? " on" : "") +
        '" data-f="year" data-v="' + y + '">' + y +
        '<i class="yc-n">' + arr.length + "</i>" +
        (dn >= arr.length ? '<i class="yc-ok">✓</i>' : "") + "</button>";
    });
    h += "</div>";
    if (ST.examYear) {
      var py = A.paperPages(sch.id, ST.examYear);
      if (py.length) {
        h += '<button class="btn sm paperbtn" data-act="paper" data-v="' + ST.examYear + '">' +
          "📄 看 " + ST.examYear + " 年整卷（" + py.length + " 页）</button>";
      }
    }
    h += "</div>";

    /* 考点条：只看某个考点的历年真题（取考频最高的 14 个） */
    var krows = A.KPLIST.map(function (p) { return { p: p, n: A.FREQ[p.id] || 0, n10: A.FREQ10[p.id] || 0 }; })
      .filter(function (x) { return x.n > 0; })
      .sort(function (a, b) { return b.n10 - a.n10 || b.n - a.n; })
      .slice(0, 14);
    if (krows.length) {
      h += '<div class="kchips"><span class="kchipslb">考点</span>' +
        '<button class="chip' + (!ST.examKp ? " on" : "") + '" data-f="examKp" data-v="">全部</button>';
      krows.forEach(function (x) {
        h += '<button class="chip' + (ST.examKp === x.p.id ? " on" : "") + '" data-f="examKp" data-v="' + esc(x.p.id) + '">' +
          esc(x.p.name) + "</button>";
      });
      h += "</div>";
    }

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
    h += '<div class="fb-kp"><span class="fb-kplabel">考什么</span>' + kpChips(p, true) +
      (function () {
        var lid = null;
        (p.kp || []).some(function (k) { var l = A.lessonOfKp && A.lessonOfKp(k); if (l) { lid = l; return true; } return false; });
        if (!lid || !A.LESSON_MAP[lid]) return "";
        return '<button class="fblink" data-act="gotolesson" data-v="' + esc(lid) + '">看考点讲义 ›</button>';
      })() + "</div>";
    h += figHTML(pagesOf(p), p.year + " 年原卷");
    if (p.ans) h += '<details class="ansbox"><summary>看参考答案（原卷第 ' + p.ans + " 页起）</summary>" +
      figHTML([A.pageImg("gt", p.ans)], p.year + " 年参考答案") +
      '<div class="tiny muted">参考答案在原卷后面的解析部分，页内可放大细看。</div></details>';
    h += '<div class="tiny muted">上面是当年原卷扫描页（题干、电路图、数据都在里面）。做完自己判：</div>';
    (function () {
      var r = A.DB.exam && A.DB.exam[p.id];
      if (!r || !r.n) return;
      var gname = r.g === "ok" ? "会" : (r.g === "fuzzy" ? "不熟" : "不会");
      h += '<div class="tiny muted exrev">已自评 ' + r.n + " 次 · 上次「" + gname + "」" +
        (r.due ? " · 下次复习 " + String(r.due).slice(5) : "") + "</div>";
    })();
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

    /* 同考点的其他真题：把这个考点的历年考法一次看完 */
    var rel = [];
    lst.forEach(function (x, j) {
      if (j === i || x.year === p.year) return;
      var hit = (x.kp || []).some(function (k) { return (p.kp || []).indexOf(k) >= 0; });
      if (hit) rel.push({ i: j, p: x });
    });
    rel.sort(function (a, b) { return Number(b.p.year) - Number(a.p.year); });
    if (rel.length) {
      h += '<div class="card relbox"><div class="h4">同考点真题 <span class="tiny muted">' + rel.length + " 道</span></div>";
      rel.slice(0, 8).forEach(function (x) {
        h += '<button class="exrow" data-act="open-exam" data-v="' + x.i + '">' +
          "<b>" + esc(String(x.p.year)) + "</b>" +
          '<span class="exno">' + esc(x.p.no || "") + "</span>" +
          '<span class="exbrief tiny muted">' + esc(A.lead(x.p.brief || "", 22)) + "</span></button>";
      });
      if (rel.length > 8) h += '<div class="tiny muted">只列最近 8 道，用上面的考点条筛全部。</div>';
      h += "</div>";
    }
    return h;
  }
  A.vExamOne = vExamOne;

  /* ---------- 读图专项：先选题，再一题一屏 ---------- */
  function figPick() {
    var st = A.ST.figSetup || {};
    return (A.figList() || []).filter(function (x) {
      if (st.school && x.sch.short !== st.school) return false;
      if (st.year && String(x.p.year) !== String(st.year)) return false;
      return true;
    });
  }
  A.figPick = figPick;

  function figSetupHTML() {
    var st = A.ST.figSetup || (A.ST.figSetup = { school: "", year: "", n: 10 });
    var all = A.figList() || [];
    var schools = [], years = [];
    all.forEach(function (x) {
      if (schools.indexOf(x.sch.short) < 0) schools.push(x.sch.short);
      if (st.school && x.sch.short !== st.school) return;
      var y = String(x.p.year);
      if (years.indexOf(y) < 0) years.push(y);
    });
    years.sort(function (a, b) { return b - a; });
    var picked = figPick();
    var h = '<div class="row" style="margin-bottom:8px">' +
      '<button class="btn ghost sm" data-act="figdrill-close">‹ 退出</button></div>';
    h += '<div class="card">';
    h += '<div class="h4">读图专项</div>';
    h += '<div class="tiny muted" style="margin:4px 0 14px">只练带电路图的真题。选好范围后一道一道来：先看题干摘要和原卷页，自己判断「会 / 不熟 / 不会」，系统按遗忘曲线排下次复习。</div>';
    h += '<div class="fslabel">院校</div><div class="chips">';
    h += '<button class="chip' + (!st.school ? " on" : "") + '" data-act="figSchool" data-v="">全部</button>';
    schools.forEach(function (s) {
      h += '<button class="chip' + (st.school === s ? " on" : "") + '" data-act="figSchool" data-v="' + esc(s) + '">' + esc(s) + "</button>";
    });
    h += "</div>";
    h += '<div class="fslabel">年份</div><div class="chips yearchips">';
    h += '<button class="chip' + (!st.year ? " on" : "") + '" data-act="figYear" data-v="">全部</button>';
    years.forEach(function (y) {
      h += '<button class="chip' + (String(st.year) === y ? " on" : "") + '" data-act="figYear" data-v="' + y + '">' + y + "</button>";
    });
    h += "</div>";
    h += '<div class="fslabel">这一轮做几道</div><div class="chips">';
    [[10, "10 道"], [20, "20 道"], [0, "全部"]].forEach(function (p) {
      h += '<button class="chip' + (A.num(st.n, 10) === p[0] ? " on" : "") + '" data-act="figN" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";
    h += '<div class="figcnt tiny muted" style="margin:12px 0">符合条件 ' + picked.length + " 道" +
      (A.num(st.n, 10) ? "，这一轮做前 " + Math.min(A.num(st.n, 10), picked.length) + " 道" : "") + "</div>";
    h += '<button class="btn primary block" data-act="fig-start"' + (picked.length ? "" : " disabled") + ">开始读图</button>";
    h += "</div>";
    return h;
  }

  function vFigDrill(idx) {
    var run = A.ST.figRun;
    var all = A.figList() || [];
    if (!run || !run.ids || !run.ids.length) return figSetupHTML();
    var map = {};
    all.forEach(function (x) { map[x.p.id] = x; });
    var n = run.ids.length;
    var i = Math.max(0, Math.min(n - 1, A.num(idx, 0)));
    var x = map[run.ids[i]];
    if (!x) return figSetupHTML();
    var p = x.p, sch = x.sch;
    var h = '<div class="row" style="margin-bottom:10px;gap:8px">' +
      '<button class="btn ghost sm" data-act="figback">‹ 重选</button>' +
      '<button class="btn ghost sm" data-act="figdrill-close">退出</button>' +
      '<span class="tiny muted figprog" style="margin-left:auto">第 ' + (i + 1) + " / " + n + " 题</span></div>";
    h += '<div class="card">';
    h += '<div class="qtop"><span class="tag y">' + esc(sch.short) + " · " + esc(String(p.year)) + " 年 " + esc(p.no || "") + "</span>" +
      '<span class="tag cir">' + esc(p.part || "电路") + "</span>" +
      (p.points ? '<span class="tag">' + p.points + " 分</span>" : "") + "</div>";
    if (p.brief) h += '<div class="figbrief">' + esc(A.lead(A.plain(p.brief), 180)) + "</div>";
    (function () {
      var r = A.DB.exam && A.DB.exam[p.id];
      if (!r || !r.n) return;
      var gname = r.g === "ok" ? "会" : (r.g === "fuzzy" ? "不熟" : "不会");
      h += '<div class="tiny muted exrev">已自评 ' + r.n + " 次 · 上次「" + gname + "」" +
        (r.due ? " · 下次复习 " + String(r.due).slice(5) : "") + "</div>";
    })();
    /* 原卷图默认折叠，不糊一脸 */
    h += '<button class="btn ghost block figopen" data-act="fig-img">' +
      (A.ST.figImg ? "收起原卷页" : "看原卷页（第 " + p.page + " 页）") + "</button>";
    if (A.ST.figImg) h += figHTML([A.pageImg(sch.imgdir, p.page)], "原卷 · 第 " + p.page + " 页");
    h += '<div class="grade3" style="margin-top:12px">';
    G3.forEach(function (g) {
      h += '<button class="gbtn ' + g.cls + '" data-act="figgrade" data-g="' + g.g + '">' +
        '<span class="gs">' + g.s + '</span><span class="gt">' + g.t + "</span></button>";
    });
    h += "</div>";
    h += '<div class="row" style="margin-top:12px;gap:8px">' +
      (i > 0 ? '<button class="btn ghost sm" data-act="fig-go" data-v="' + (i - 1) + '">‹ 上一题</button>' : "") +
      (i < n - 1 ? '<button class="btn ghost sm" data-act="fig-go" data-v="' + (i + 1) + '">下一题 ›</button>' : "") +
      "</div></div>";
    return h;
  }
  A.vFigDrill = vFigDrill;

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
  /* 全站搜索结果 */
  function gsearchHTML(q) {
    var r = A.gsearch(q), h = "";
    if (!r.n) {
      return '<div class="card"><div class="empty">没搜到「' + esc(q) + "」。<br>换个更短的词试试：戴维南、奈奎斯特、采样定理。</div></div>";
    }
    if (r.kps.length) {
      h += '<div class="card"><div class="h4">考点 <span class="tiny muted">' + r.kps.length + " 个</span></div><div class=\"chips\">";
      r.kps.forEach(function (k) {
        h += '<button class="chip" data-act="gs-kp" data-v="' + esc(k.id) + '">' + esc(k.name || k.id) + "</button>";
      });
      h += "</div></div>";
    }
    if (r.qs.length) {
      h += '<div class="card"><div class="h4">题库 <span class="tiny muted">' + r.qs.length + " 道</span></div>";
      r.qs.forEach(function (o) {
        var kn = (o.kp || []).map(function (k) { var p = A.KPMAP[k]; return p ? p.name : k; }).join(" / ");
        h += '<div class="lessonrow" data-act="gs-q" data-v="' + esc(o.id) + '">' +
          '<div class="lt">' + esc(A.lead(A.plain(o.stem || ""), 34)) + "</div>" +
          '<div class="ls">' + esc(kn || o.subject || "") + "</div></div>";
      });
      h += "</div>";
    }
    if (r.exams.length) {
      h += '<div class="card"><div class="h4">真题 <span class="tiny muted">' + r.exams.length + " 道</span></div>";
      r.exams.forEach(function (x) {
        h += '<button class="exrow" data-act="gs-exam" data-v="' + x.i + '" data-s="shu">' +
          "<b>" + esc(String(x.p.year)) + "</b>" +
          '<span class="exno">' + esc(x.p.no || "") + "</span>" +
          '<span class="exbrief tiny muted">' + esc(A.lead(A.plain(x.p.brief || ""), 26)) + "</span></button>";
      });
      h += "</div>";
    }
    if (r.lessons.length) {
      h += '<div class="card"><div class="h4">讲义 <span class="tiny muted">' + r.lessons.length + " 讲</span></div>";
      r.lessons.forEach(function (x) {
        h += '<div class="lessonrow hitrow" data-act="gs-lesson" data-v="' + esc(x.id) + '" data-q="' + esc(q) + '">' +
          '<div class="lt">' + esc(x.title) + '<span class="tiny hln">命中 ' + x.n + " 处</span></div>" +
          '<div class="ls hitline">' + esc(x.snip[0] || "") + "</div></div>";
      });
      h += "</div>";
    }
    return h;
  }

  function vToday() {
    var t = A.todayStr(), L = A.todayLog(), due = A.dueCount();
    var tot = A.totalN(), pr = A.progress(), sk = A.streak();
    var h = "";

    /* 全站搜索：一个框搜题库 / 真题 / 考点 / 讲义 */
    var gq = (A.ST.gq || "").trim();
    h += '<div class="card gscard">' +
      '<input class="search" id="gsearch" placeholder="全站搜：题干 / 考点 / 真题 / 讲义" value="' + esc(A.ST.gq || "") + '">' +
      "</div>";
    if (gq) return h + gsearchHTML(gq);

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

    /* 倒计时方框 + 今日目标 */
    var c = A.cfg(), dl = A.daysLeft(), goal = c.goal || 30;
    var gpct = Math.min(100, Math.round((L.n || 0) / goal * 100));
    var todayCount = L.n || 0;
    var left = dl > 0 ? dl : 0;
    h += '<div class="card cdbox">' +
      '<div class="cdnum"><b>' + left + '</b><span>天后上考场</span></div>' +
      '<div class="cdsub">' + esc(c.examDate || "") + "</div>" +
      '<div class="cdtip">按每天 ' + goal + " 题算，还能刷 " + (left * goal) + " 题</div>" +
      "</div>";
    h += '<div class="goalline">' +
      '<div class="goalcap"><span>今日目标</span><b>' + todayCount + " / " + goal + "</b><i>" + gpct + "%</i></div>" +
      '<div class="pbar"><i style="width:' + gpct + '%"></i></div></div>';

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

    /* 真题到期复习：标过「不会/不熟」的真题按遗忘曲线排到期 */
    var ed = A.examDueList().length;
    if (ed) {
      h += '<div class="card duecard">';
      h += '<div class="duetop"><span class="duenum">' + ed + '</span><span class="duetxt">道真题该重做了</span></div>';
      h += '<div class="tiny muted">上次标了「不会 / 不熟」的真题到复习日了，重看一遍原卷比刷新题划算。</div>';
      h += '<button class="btn primary block" data-act="exam-due">去重做</button>';
      h += "</div>";
    }

    /* 该补的考点：只挑最弱的一两个，给一条明确指令 */
    var wk = A.weakKps(3, 2);
    if (wk.length) {
      h += '<div class="card weakcard"><div class="h4">最该补的两个考点</div>';
      wk.forEach(function (w) {
        var p = A.KPMAP[w.k] || { name: w.k };
        h += '<div class="secrow"><span class="secname">' + esc(p.name) + "</span>" +
          '<span class="seccount">' + Math.round(w.rate * 100) + "% · 练过 " + w.n + " 次</span>" +
          '<button class="btn sm" data-act="drill-kp" data-v="' + esc(w.k) + '">练它</button></div>';
      });
      h += '<div class="tiny muted">正确率低于 70% 且练过 3 次以上的考点，按最差排的。</div></div>';
    }

    /* 错因集中提示：同一类错反复出现，说明方法不对，不是练得少 */
    (function () {
      var wc = A.whyStats(), top = "", tn = 0, total = Object.keys(A.DB.wrong || {}).length, k;
      for (k in wc) if (wc[k] > tn) { tn = wc[k]; top = k; }
      if (!top || total < 5 || tn / total < 0.4) return;
      var NAME = { "概念": "概念不清", "计算": "算错", "图示": "看图错", "思路": "没思路" };
      h += '<div class="card whyhint">' +
        '<div class="tiny">错题里 <b>' + Math.round(tn / total * 100) + "%</b> 是「" + esc(NAME[top] || top) +
        "」这一类。这类错光刷新题压不住，先去讲义把那一讲讲透，再回来重测。</div>" +
        '<div class="row"><button class="btn ghost sm" data-act="start-wrong">去重测</button></div></div>';
    })();

    /* 每日一题：给一道真题，原卷页图直接摆在卡上（题目、电路图都在卷面里） */
    var dq = A.dailyExam();
    if (dq) {
      var pg = A.pagesOf(dq);
      h += '<div class="card daily">';
      h += '<div class="dh"><span class="dtag">每日一题</span><span class="tiny muted">' + esc(String(dq.year)) + " 年" +
        (dq.no ? " · " + esc(dq.no) : "") + (dq.points ? " · " + dq.points + " 分" : "") + "</span></div>";
      h += '<div class="dst">' + md(dq.brief || "") + "</div>";
      if (pg.length) {
        h += '<div class="dthumb">' + A.figHTML(pg.slice(0, 1), "原卷") + "</div>";
        var pn = (String(pg[0] || "").match(/p(\d+)\.jpg/) || [])[1];
        h += '<div class="tiny muted">上面是原卷' + (pn ? "第 " + Number(pn) + " 页" : "扫描页") + "，点图放大看完整题目和电路图。</div>";
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
    var bk = A.backupInfo();
    h += '<div class="card tipcard' + (bk.warn ? " warn" : "") + '">';
    h += '<div class="h4">数据只存在这台设备</div>';
    h += '<div class="tiny ' + (bk.warn ? "" : "muted") + '">' + esc(bk.text) +
      (bk.warn ? "。清缓存 / 换设备就没了，先导一份。" : "。清缓存 / 换设备就没了。") + "</div>";
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
          p.formulas.forEach(function (f) {
            /* 数据里是 {t: LaTeX, n: 中文说明}；也兼容纯字符串 */
            if (f && typeof f === "object") {
              var ft = String(f.t == null ? "" : f.t);
              h += '<div class="kpfrow"><div class="kpftex">' + A.tex(ft.replace(/^\$+|\$+$/g, "")) + "</div>" +
                (f.n ? '<div class="kpfnote">' + esc(f.n) + "</div>" : "") + "</div>";
            } else {
              h += '<div class="kpfrow"><div class="kpftex">' + md(String(f == null ? "" : f)) + "</div></div>";
            }
          });
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
    /* 有关键词：走全文搜索，按命中次数排，带前后文 */
    if (q) {
      if (!A.lessonsReady()) {
        A.ensureLessons(function () { if (A.render) A.render(); });
        return h + '<div class="empty">正在加载讲义正文，加载完会自动搜「' + esc(A.ST.lq) + '」…</div></div>';
      }
      var hits = A.lessonSearch(q).filter(function (x) { return !subj || x.subject === subj; });
      if (!hits.length) return h + '<div class="empty">讲义里没找到「' + esc(A.ST.lq) + '」。试试更短的词，或者去考点页搜。</div></div>';
      var total = hits.reduce(function (a, b) { return a + b.n; }, 0);
      h += '<div class="tiny muted" style="margin:2px 0 8px">' + hits.length + " 讲里共命中 " + total + " 处</div>";
      hits.forEach(function (x) {
        h += '<div class="lessonrow hitrow" data-act="lesson" data-v="' + esc(x.id) + '" data-q="' + esc(A.ST.lq) + '">' +
          '<div class="lt">' + esc(x.title) + '<span class="tiny hln">命中 ' + x.n + " 处</span></div>";
        x.snip.forEach(function (s) {
          h += '<div class="ls hitline">' + esc(s) + "</div>";
        });
        h += "</div>";
      });
      return h + "</div>";
    }
    var groups = {};
    A.LESSONS.forEach(function (l) {
      if (subj && l.subject !== subj) return;
      (groups[l.subject || "其他"] = groups[l.subject || "其他"] || []).push(l);
    });
    Object.keys(groups).forEach(function (k) {
      var rd = groups[k].filter(function (l) { return A.isRead(l.id); }).length;
      h += '<div class="chhead"><b>' + esc(k) + "</b><span class='tiny muted'>" + groups[k].length +
        " 讲" + (rd ? " · 已读 " + rd : "") + "</span></div>";
      groups[k].forEach(function (l) {
        var words = l.md ? String(l.md).length : (l.chars || 0);
        var sum = (l.summary || "").trim();
        h += '<div class="lessonrow" data-act="lesson" data-v="' + esc(l.id) + '">' +
          '<div class="lt">' + esc(l.title) + (A.isRead(l.id) ? '<span class="readmark">✓</span>' : "") +
          (A.hlCount(l.id) ? '<span class="tiny hlcount">✎' + A.hlCount(l.id) + "</span>" : "") + "</div>" +
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
    /* 分组标题里已经带了「电路」「信号」，卡片就不再重复一遍 */
    var short = function (c) { return String(c).replace(/^(电路|信号)\s*·\s*/, "").trim(); };
    F.forEach(function (f) {
      if (f.name === f.ch) return;            /* 纯分组标题行，不渲染成卡 */
      var hay = (f.ch + " " + f.name + " " + (f.tags || []).join(" ") + " " + f.tex).toLowerCase();
      if (q && hay.indexOf(q) < 0) return;
      if (f.ch !== last) { h += '<div class="chhead"><b>' + esc(short(f.ch)) + "</b></div>"; last = f.ch; }
      var nm = short(f.name);
      h += '<div class="fmlcard">' + '<div class="fname">' + esc(nm) + "</div>" +
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
      '<p class="tiny muted">两个队列别搞混：<b>首页「今天该复习」</b>是按遗忘曲线到期的题（清完当天就不用再管）；<b>这里</b>是累积的错题本，什么时候想重做都行。连续答对 3 次才移出。</p>' +
      '<div class="row"><button class="btn primary" data-act="start-wrong">全部重测 (' + ids.length + ")</button>" +
      '<button class="btn ghost" data-act="export-csv">导出 CSV</button></div></div>';

    h += '<div class="chips">';
    [["all", "全部 " + ids.length], ["no", "不会 " + no.length], ["fuzzy", "不熟悉 " + fz.length], ["star", "收藏 " + star.length]]
      .forEach(function (p) {
        h += '<button class="chip' + (tab === p[0] ? " on" : "") + '" data-act="wtab" data-v="' + p[0] + '">' + p[1] + "</button>";
      });
    h += "</div>";

    /* 按科目分 + 按错因分：看出「为什么错」比看出「错了哪些」更有用 */
    var wsubj = A.ST.wsubj || "";
    var whyCount = A.whyStats();
    var WHY = [["概念", "概念不清"], ["计算", "算错"], ["图示", "看图错"], ["思路", "没思路"]];
    var nWhy = 0;
    WHY.forEach(function (x) { nWhy += whyCount[x[0]] || 0; });
    if (nWhy) {
      h += '<div class="chips whychips">';
      h += '<button class="chip' + (!A.ST.wwhy ? " on" : "") + '" data-act="wwhy" data-v="">错因不限</button>';
      WHY.forEach(function (x) {
        if (!whyCount[x[0]]) return;
        h += '<button class="chip' + (A.ST.wwhy === x[0] ? " on" : "") + '" data-act="wwhy" data-v="' + x[0] + '">' +
          x[1] + " " + whyCount[x[0]] + "</button>";
      });
      h += "</div>";
    }
    h += '<div class="chips">';
    [["", "全部科目"], ["电路", "电路"], ["信号", "信号"]].forEach(function (p) {
      h += '<button class="chip' + (wsubj === p[0] ? " on" : "") + '" data-act="wsubj" data-v="' + p[0] + '">' + p[1] + "</button>";
    });
    h += "</div>";

    h += '<input class="search" id="wsearch" placeholder="在错题里搜：题干 / 考点 / 关键词" value="' + esc(A.ST.wq || "") + '">';

    var list;
    if (tab === "star") list = star.map(function (id) { return { id: id, w: { kind: "star", n: "" } }; });
    else if (tab === "no") list = no.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });
    else if (tab === "fuzzy") list = fz.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });
    else list = ids.map(function (id) { return { id: id, w: A.DB.wrong[id] }; });

    list = list.filter(function (x) { return !!A.QMAP[x.id]; });
    if (wsubj) list = list.filter(function (x) { return A.QMAP[x.id].subject === wsubj; });
    if (A.ST.wwhy) list = list.filter(function (x) { return x.w && x.w.why === A.ST.wwhy; });
    var wq = (A.ST.wq || "").trim().toLowerCase();
    if (wq) list = list.filter(function (x) {
      var q = A.QMAP[x.id];
      var names = (q.kp || []).map(function (k) { return (A.KPMAP[k] || {}).name || k; }).join(" ");
      var hay = (String(q.stem || "") + " " + names + " " + (q.subject || "")).toLowerCase();
      return hay.indexOf(wq) >= 0;
    });
    list.sort(function (a, b) {
      var ra = A.DB.q[a.id] || {}, rb = A.DB.q[b.id] || {};
      var da = ra.due || "9999-99-99", db2 = rb.due || "9999-99-99";
      if (da !== db2) return da < db2 ? -1 : 1;              /* 先做到期的 */
      return String(b.w.at || "").localeCompare(String(a.w.at || ""));
    });

    if (!list.length) {
      if (ids.length || star.length) return h + '<div class="empty">这个筛选下没有题。<br><span class="tiny">换个错因或科目看看。</span></div>';
      return h + '<div class="empty">这里还是空的。<br><span class="tiny">做题时点「不熟悉」或「不会」就会收进来。</span></div>';
    }

    h += '<div class="card">';
    list.forEach(function (x) {
      var q = A.QMAP[x.id];
      var r = A.DB.q[x.id] || {};
      h += '<div class="wcard">';
      h += '<div class="wtop"><span class="wtag ' + (x.w.kind === "fuzzy" ? "fz" : x.w.kind === "star" ? "st" : "no") + '">' +
        (x.w.kind === "fuzzy" ? "不熟" : x.w.kind === "star" ? "收藏" : "不会") + "</span>" +
        '<span class="tag ' + (q.subject === "信号" ? "sig" : "cir") + '">' + esc(q.subject) + "</span>" +
        (x.w.n ? '<span class="tiny muted">错 ' + x.w.n + " 次</span>" : "") +
        (r.due ? (r.due <= A.todayStr() ? '<span class="tag due">今天该复习</span>' : '<span class="tiny muted">下次 ' + r.due + "</span>") : "") + "</div>";
      h += '<div class="wstem" data-act="open-q" data-q="' + esc(x.id) + '">' + esc(A.lead(q.stem, 90)) + "</div>";
      if (x.w.kind !== "star") {
        h += '<div class="whyrow">';
        [["概念", "概念不清"], ["计算", "算错了"], ["图示", "看图错"], ["思路", "没思路"]].forEach(function (y) {
          h += '<button class="whychip' + (x.w.why === y[0] ? " on" : "") + '" data-act="why" data-q="' + esc(x.id) +
            '" data-v="' + y[0] + '">' + y[1] + "</button>";
        });
        h += "</div>";
      }
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
  function helpHTML() {
    var S = function (t) { return '<div class="hh">' + t + '</div>'; };
    var I = function (arr) {
      return '<ul class="hl">' + arr.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
    };
    var h = "";
    h += S("每天怎么用（10 分钟起步）");
    h += I([
      "打开就点「今日」页的 <b>接着刷</b>（或「立即刷题」），是从上次停下的位置继续。",
      "每道题：选择题点选项即判；计算题先自己写，再点 <b>看答案</b>，然后按 <b>会 / 模糊 / 不会</b> 自评。",
      "自评「不会 / 模糊」的题自动进错题本，第二天、第三天、第七天会提醒你重测。",
      "每天的目标题数、考试倒计时在「我的 → 设置」里改。"
    ]);
    h += S("刷题页");
    h += I([
      "手机上 <b>左右滑动</b> 切上一题/下一题；电脑上 <b>← →</b> 切题、<b>1-4</b> 选答案、<b>空格</b> 看答案。",
      "题号右边 <b>▤ 答题卡</b>：一次看全部题目状态，点号直接跳。",
      "题下有 <b>写笔记</b>（只给自己看），右上 <b>★</b> 收藏。",
      "看不懂点右下 <b>✎ AI</b>：可以问这道题，也能让它「出 3 道同类题」；没配 Key 也能用，只是没有 AI。",
      "题目上方若写「近十年考 N 次」，说明这考点是真题常客，值得细做。"
    ]);
    h += S("讲义");
    h += I([
      "「讲义 → 课程讲义」顶部搜索框是 <b>全文搜索</b>，点结果直接翻到那一讲、那一句会高亮。",
      "读到关键句，<b>长按选中</b>会弹出「标重点」，标过的句子下次打开还是黄的，讲义列表会显示 ✎ 数量。",
      "右上 <b>A− / A+</b> 调字号；一讲读完自动记「已读」。"
    ]);
    h += S("真题");
    h += I([
      "上面选 <b>院校 → 年份 → 考点</b>，年份后面数字是题数，绿勾表示这年已全部自评完。",
      "<b>院校</b>可切：上海大学 829（210 道，27 年）、桂林电子科技大学 806（356 道，14 年）。桂电的单题页里还有「看参考答案」折叠，能直接翻到当年答案页。",
      "点一道题进 <b>原卷页</b>：看到的是真题扫描图，手指放大看细节，然后按 <b>会 / 模糊 / 不会</b> 自评。",
      "「整卷」可以按页翻完一整年的卷子，带 3 小时计时器，适合周末模拟。",
      "<b>⚡ 读图专项</b>：只刷带电路图的真题（196 道，先上大后桂电），专门练「看图列方程」这件事。",
      "「今日」页的 <b>每日一题</b> 就是一道真题，直接带你到原卷。"
    ]);
    h += S("错题与复习");
    h += I([
      "「刷题 → 错题」：可以按科目、错因筛选，也能 <b>搜关键词</b>。",
      "每道错题下方能标 <b>错因</b>（概念不清 / 算错 / 看错题 / 没思路），标完「我的」页会按错因统计你的主要失分方式。",
      "到期的题会标红，点「重测」按遗忘曲线过一遍。"
    ]);
    h += S("统计与计划");
    h += I([
      "「我的」页：正确率、连续天数、<b>本周小结</b>（和上周比多了还是少了）、<b>14 天柱状图</b>。",
      "考点 <b>热力图</b>：红=没掌握，绿=稳了，灰=还没练过。点一块直接去练那个考点。",
      "进考场 <b>预测分</b> 只是按你目前的正确率估的，看趋势就好。"
    ]);
    h += S("数据与离线");
    h += I([
      "所有记录只存在这台设备上。换手机、清缓存前，先「我的 → 数据 → <b>导出备份</b>」。",
      "手机浏览器菜单里选「<b>添加到主屏幕</b>」，之后像 App 一样打开；打开过一次后断网也能用。",
      "想换设备：旧机导出 → 把文件发到新机 → 新机「导入备份」。"
    ]);
    return h;
  }

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

    /* 本周小结：做题量 / 正确率与上周对比 */
    var wN = 0, wOk = 0, pN = 0, pOk = 0;
    for (var wi = 6; wi >= 0; wi--) {
      var wl = A.DB.log[A.addDays(-wi)] || { n: 0, ok: 0 };
      wN += wl.n || 0; wOk += wl.ok || 0;
    }
    for (var pi = 13; pi >= 7; pi--) {
      var pl = A.DB.log[A.addDays(-pi)] || { n: 0, ok: 0 };
      pN += pl.n || 0; pOk += pl.ok || 0;
    }
    var wRate = wN ? Math.round(wOk / wN * 100) : 0;
    var pRate = pN ? Math.round(pOk / pN * 100) : 0;
    var dN = wN - pN, dR = (wN && pN) ? wRate - pRate : 0;
    var sign = function (v, unit) { return (v > 0 ? "+" : "") + v + (unit || ""); };
    h += '<div class="card wrep"><div class="h4">本周小结 <span class="tiny muted">' + A.addDays(-6).slice(5) + " ~ " + A.addDays(0).slice(5) + "</span></div>";
    h += '<div class="wrow"><span class="wk">做题</span><b>' + wN + '</b><span class="tiny muted">题</span>' +
      (pN || wN ? '<span class="dg ' + (dN > 0 ? "up" : dN < 0 ? "down" : "") + '">' + (dN === 0 ? "与上周持平" : sign(dN) + " 题 vs 上周") + "</span>" : "") + "</div>";
    h += '<div class="wrow"><span class="wk">正确率</span><b>' + (wN ? wRate + "%" : "—") + "</b>" +
      (wN && pN ? '<span class="dg ' + (dR > 0 ? "up" : dR < 0 ? "down" : "") + '">' + (dR === 0 ? "与上周持平" : sign(dR, "%") + " vs 上周") + "</span>" : "") +
      '<span class="tiny muted">上周 ' + (pN ? pN + " 题 · " + pRate + "%" : "没做题") + "</span></div>";
    var wk = A.weakKps ? A.weakKps() : [];
    if (wk.length) {
      h += '<div class="wrow"><span class="wk">最薄弱</span><span class="weakchips">';
      wk.slice(0, 3).forEach(function (x) {
        var nm = (A.KPMAP[x.k] || {}).name || x.k;
        h += '<button class="chip tiny" data-act="drill-kp" data-v="' + esc(x.k) + '">' + esc(nm) + " " + Math.round(x.rate * 100) + "%</button>";
      });
      h += "</span></div>";
    }
    h += "</div>";

    /* 考点掌握热力图 */
    var ks = A.kpStats ? A.kpStats().sort(function (a, b) {
      if (a.rate < 0 && b.rate < 0) return a.k - b.k;
      if (a.rate < 0) return 1;
      if (b.rate < 0) return -1;
      return a.rate - b.rate;
    }) : [];
    if (ks.length) {
      var doneN = ks.filter(function (x) { return x.n > 0; }).length;
      h += '<div class="card"><div class="h4">考点掌握 <span class="tiny muted">练过 ' + doneN + " / " + ks.length + "</span></div>";
      h += '<div class="hmgrid">';
      ks.forEach(function (x) {
        var cls = x.n === 0 ? "hm0" : x.rate < 0.5 ? "hm1" : x.rate < 0.75 ? "hm2" : "hm3";
        var txt = x.n === 0 ? "—" : Math.round(x.rate * 100) + "%";
        h += '<button class="hmcell ' + cls + '" data-act="drill-kp" data-v="' + esc(x.k) + '" title="' +
          esc(x.name) + "：" + (x.n ? "做 " + x.n + " 次，对 " + x.ok + " 次" : "还没练过") + '">' + txt + "</button>";
      });
      h += "</div>";
      h += '<div class="hmlegend tiny muted"><span><i class="hm0"></i>没练</span><span><i class="hm1"></i>&lt;50%</span><span><i class="hm2"></i>50~75%</span><span><i class="hm3"></i>&ge;75%</span></div>';
      h += '<div class="tiny muted">格子越红越该补，点一下直接去练那个考点。</div></div>';
    }
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
    var weak = A.weakKps(2, 8);

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
        '<div class="tiny muted">Key 只存在这台设备的浏览器里；公共电脑用完记得清掉。</div>' +
        '<div class="row"><button class="btn sm" data-act="askai">打开问 AI</button>' +
        '<button class="btn ghost sm" data-act="ai-clearkey">清除本机 Key</button></div>';
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

    /* 使用说明：功能越堆越多，藏起来等于没有 */
    h += '<div class="card"><details class="helpmd"><summary>使用说明 · 有哪些功能、怎么用</summary>' + helpHTML() + "</details></div>";

    /* 数据管理 */
    h += '<div class="card"><div class="h4">设置</div>' +
      '<div class="cfgrow"><label for="cfgd">考试日期</label>' +
      '<input type="date" id="cfgd" value="' + esc(c.examDate) + '"></div>' +
      '<div class="cfgrow"><label for="cfgg">每日目标</label>' +
      '<input type="number" id="cfgg" min="5" max="300" step="5" value="' + (c.goal || 30) + '"><span class="tiny muted">题</span></div>' +
      "</div>";

    h += '<div class="card"><div class="h4">数据</div>' +
      '<div class="tiny ' + (A.backupInfo().warn ? "" : "muted") + '">' + esc(A.backupInfo().text) +
      '。记录只存在这台设备的浏览器里，换设备或清缓存前先导出。</div>' +
      '<div class="row"><button class="btn sm" data-act="export">导出备份</button>' +
      '<button class="btn ghost sm" data-act="import">选文件导入</button>' +
      '<button class="btn ghost sm" data-act="export-csv">导出错题 CSV</button></div>' +
      '<div class="row"><button class="btn ghost sm" data-act="import-paste">粘贴备份文本导入</button></div>' +
      '<div class="tiny muted">备份里带版本号，以后题库升级了旧备份也能认。换设备最方便的做法：旧手机「导出备份」把文字发给自己，新手机点「粘贴备份文本导入」。</div>' +
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
    if (!L.md) {
      A.ensureLessons(function () { if (A.render) A.render(); });
      return '<div class="lsbar"><button class="btn ghost sm" data-act="lesson-back">‹ 讲义</button></div>' +
        '<div class="card"><div class="h4">' + esc(L.title) + '</div>' +
        '<div class="tiny muted">正在加载这一讲…（第一次打开讲义要下载正文，之后就存在手机里了）</div></div>';
    }
    var sib = A.LESSONS.filter(function (x) { return x.subject === L.subject; });
    var k = sib.indexOf(L);
    var prev = k > 0 ? sib[k - 1] : null;
    var next = (k >= 0 && k < sib.length - 1) ? sib[k + 1] : null;

    var hls = A.hlList(L.id);
    var h = '<div class="lsbar"><button class="btn ghost sm" data-act="lesson-back">‹ 讲义</button>' +
      '<span class="fsbtns"><button class="fsb" data-act="fs" data-v="-1">A−</button>' +
      '<button class="fsb" data-act="fs" data-v="1">A+</button></span>' +
      (hls.length ? '<span class="tiny hlcount">✎ ' + hls.length + " 处重点</span>" : "") +
      (A.isRead(L.id) ? '<span class="tiny muted">✓ 已读</span>' : "") + "</div>";
    h += '<article class="lessonpage fs' + (A.DB.fs || 0) + '">' + md(L.md) + "</article>";
    h += '<div class="tiny muted hltip">长按或选中正文里的句子，就能标成重点，下次打开还在这儿。</div>';
    if (hls.length) {
      h += '<div class="card"><div class="h4">本讲重点 <span class="tiny muted">' + hls.length + " 处</span></div>";
      hls.forEach(function (x, i) {
        h += '<div class="hlrow"><span class="hltxt">' + esc(x.t) + "</span>" +
          '<button class="ibtn" data-act="hl-del" data-v="' + esc(x.t) + '" title="删除">✕</button></div>';
      });
      h += "</div>";
    }
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
  var SUB = A.SUBVIEW || (A.SUBVIEW = { lesson: null, formula: 0, examone: -1, examschool: "shu", fig: -1 });

  /* 当前院校的真题数组里取第 i 道 */
  function examAt(i) {
    return A.schoolOf(SUB.examschool || ST.examSchool || "shu").list[i];
  }

  function currentView() {
    if (SUB.paper && SUB.paper.year) return { id: "paper", html: A.vPaper(SUB.paper.year, SUB.paper.i) };
    if (SUB.lesson) return { id: "lesson", html: A.vLesson(SUB.lesson) };
    if (SUB.formula) return { id: "formula", html: A.vFormula() };
    if (SUB.examone >= 0) return { id: "examone", html: A.vExamOne(SUB.examone) };
    if (SUB.fig >= 0) return { id: "figdrill", html: A.vFigDrill(SUB.fig) };
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
    if (v.id === "lesson") applyHL(SUB.lesson);
    else { var hb = document.getElementById("hlbar"); if (hb) hb.classList.remove("on"); }
    if (v.id === "drill") {
      A.mountBody();
      if (ST.__answered) restoreAnswered();
      /* 记住停在哪，供「今日 → 立即刷题」接着做 */
      if (ST.list && ST.list.length) A.saveLast();
      /* 第一次进刷题：教一下手势/键位 */
      if (ST.list && ST.list.length && !(A.DB.tipSeen & 1)) {
        A.DB.tipSeen = (A.DB.tipSeen || 0) | 1; A.save();
        setTimeout(function () { A.toast("左右滑动切题；电脑上 ←→ 切题、1-4 选答案、空格看答案"); }, 700);
      }
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
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1; SUB.fig = -1;
    if (tab !== "exam") ST.paperReview = null;   /* 离开真题页就不再显示上一份复盘 */
    ST.tab = tab;
    if (tab === "drill") { ST.pin = null; A.buildList(); }
    render();
  }
  A.go = go;

  /* ---------- 搜索框防抖 ---------- */
  var searchTimer = null;
  function hookSearch() {
    [["#gsearch", "gq", "today"], ["#kpsearch", "nq", "kplist"], ["#lssearch", "lq", "lslist"], ["#fsearch", "fq", "flist"], ["#wsearch", "wq", "wlist"]].forEach(function (p) {
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
    var kws = $("#kwsearch");
    if (kws) {
      kws.addEventListener("input", function () {
        ST.flt.kw = kws.value;
        if (searchTimer) clearTimeout(searchTimer);
        searchTimer = setTimeout(function () {
          ST.qi = 0; A.buildList(); render();
          var e2 = $("#kwsearch");
          if (e2) { e2.focus(); e2.setSelectionRange(e2.value.length, e2.value.length); }
        }, 240);
      });
    }
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
    ST.flt.kw = f.kw || "";
    go("drill");                                  /* 会 buildList 并按 flt 重排 */
    if (l.pin) { ST.pin = l.pin; A.buildList(); } /* pin = 单题回看，需在 go 之后恢复 */
    var idx = -1, i;
    for (i = 0; i < ST.list.length; i++) if (ST.list[i].id === l.qid) { idx = i; break; }
    ST.qi = idx >= 0 ? idx : Math.min(l.qi || 0, Math.max(0, ST.list.length - 1));
    render();
    A.toast("接着上次：第 " + (ST.qi + 1) + " 题", "ok");
  });
  on("resume-new", function () {
    ST.flt.mode = "all"; ST.flt.kp = ""; ST.flt.subject = ""; ST.flt.kw = ""; ST.pin = null;
    ST.qi = 0;
    go("drill");
  });
  on("kwclear", function () {
    ST.flt.kw = ""; ST.qi = 0; A.buildList(); render();
  });
  on("why", function (el) {
    A.setWhy(el.getAttribute("data-q"), el.getAttribute("data-v"));
    render();
  });
  on("wwhy", function (el) { ST.wwhy = el.getAttribute("data-v") || ""; render(); });
  on("wsubj", function (el) { ST.wsubj = el.getAttribute("data-v") || ""; render(); });
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
    var lid = A.lessonOfKp ? A.lessonOfKp(k) : null;
    if (!lid) {
      A.toast("这个考点没有单独成讲的讲义，直接去题库练更快", "warn");
      return;
    }
    function jump() {
      ST.lq = "";                 /* 不再把课程标题塞进搜索框 */
      openLesson(lid);
      var p = A.KPMAP[k] || {};
      var cands = (p.keys || []).slice(0, 6).concat([p.name || "", k]);
      setTimeout(function () {
        var root = document.querySelector(".lessonpage");
        var txt = root ? (root.textContent || "").toLowerCase() : "";
        var kw = "";
        for (var i = 0; i < cands.length; i++) {
          var c = String(cands[i] || "").trim();
          if (c.length >= 2 && txt.indexOf(c.toLowerCase()) >= 0) { kw = c; break; }
        }
        var mk = kw ? findHighlight(kw) : null;
        var lm = A.LESSON_MAP[lid];
        if (mk) {
          mk.scrollIntoView({ block: "center" });
          A.toast("已打开「" + A.lead(lm ? lm.title : "讲义", 12) + "」，正文里标出的地方就是它", "ok");
        } else {
          window.scrollTo(0, 0);
          A.toast("这一讲的正文没单独写这个考点，去题库练它更直接", "warn");
        }
      }, 120);
    }
    if (!A.lessonsReady()) {
      A.ensureLessons(function () { jump(); });
      A.toast("正在加载讲义…");
      return;
    }
    jump();
  });
  function openLesson(id) {
    go("notes");              /* go 会清空 SUB，必须先 go 再设 */
    ST.lq = "";               /* 进正文就把列表搜索清空，回来是干净的 */
    SUB.lesson = id;
    A.markRead(id);
    render();
    window.scrollTo(0, 0);
  }

  /* 讲义全文搜索命中处染色，返回第一个命中元素 */
  function findHighlight(q) {
    var root = document.querySelector(".lessonpage");
    if (!root || !q) return null;
    var low = q.toLowerCase(), first = null, nodes = [];
    var w = document.createTreeWalker(root, 4, null), n;
    while ((n = w.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var v = node.nodeValue || "", i = v.toLowerCase().indexOf(low);
      if (i < 0) return;
      var before = v.slice(0, i), mid = v.slice(i, i + q.length), after = v.slice(i + q.length);
      var mk = document.createElement("mark");
      mk.className = "findhl";
      mk.textContent = mid;
      var p = node.parentNode;
      if (before) p.insertBefore(document.createTextNode(before), node);
      p.insertBefore(mk, node);
      if (after) p.insertBefore(document.createTextNode(after), node);
      p.removeChild(node);
      if (!first) first = mk;
    });
    return first;
  }

  /* 全站搜索结果跳转 */
  on("gs-q", function (el) {
    var id = el.getAttribute("data-v");
    if (!A.QMAP[id]) return A.toast("这道题不在题库里了", "warn");
    ST.gq = ""; ST.pin = id; ST.tab = "drill"; A.buildList();
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1; SUB.paper = null;
    render();
  });
  on("gs-exam", function (el) {
    ST.gq = "";
    SUB.examone = parseInt(el.getAttribute("data-v"), 10);
    SUB.examschool = el.getAttribute("data-s") || "shu";
    ST.examSchool = SUB.examschool;
    SUB.lesson = null; SUB.formula = 0; SUB.paper = null;
    render();
    window.scrollTo(0, 0);
  });
  on("gs-kp", function (el) {
    ST.gq = "";
    ST.flt.mode = "kp"; ST.flt.kp = el.getAttribute("data-v"); ST.flt.subject = "";
    ST.pin = null; ST.qi = 0;
    go("drill");
  });
  on("gs-lesson", function (el) {
    var id = el.getAttribute("data-v"), q = el.getAttribute("data-q") || "";
    ST.gq = "";
    SUB.lesson = id;
    A.markRead(id);
    render();
    var m = findHighlight(q);
    if (m) m.scrollIntoView({ block: "center" });
    else window.scrollTo(0, 0);
  });

  on("lesson", function (el) {
    var id = el.getAttribute("data-v");
    var q = (el.getAttribute("data-q") || "").trim();
    SUB.lesson = id;
    A.markRead(id);
    render();
    if (q) {
      var m = findHighlight(q);
      if (m) m.scrollIntoView({ block: "center" });
      else window.scrollTo(0, A.posGet(id));
    } else window.scrollTo(0, A.posGet(id));
  });
  on("lesson-back", function () { SUB.lesson = null; render(); window.scrollTo(0, 0); });

  /* ---------- 讲义划线重点 ---------- */
  var pendingHL = "";
  function wrapOnce(node, t) {
    var v = node.nodeValue || "";
    var i = v.indexOf(t);
    if (i < 0) return null;
    var parent = node.parentNode;
    if (!parent) return null;
    var before = v.slice(0, i), after = v.slice(i + t.length);
    var mark = document.createElement("mark");
    mark.className = "hl";
    mark.textContent = t;
    if (before) parent.insertBefore(document.createTextNode(before), node);
    parent.insertBefore(mark, node);
    var tail = null;
    if (after) { tail = document.createTextNode(after); parent.insertBefore(tail, node); }
    parent.removeChild(node);
    return tail;
  }
  function wrapAll(root, t) {
    if (!t) return 0;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var nodes = [], n;
    while ((n = w.nextNode())) if (n.nodeValue && n.nodeValue.length >= t.length) nodes.push(n);
    var hits = 0;
    for (var i = 0; i < nodes.length; i++) {
      var cur = nodes[i];
      while (cur) {
        if (cur.parentNode && cur.parentNode.nodeName === "MARK") break;
        var tail = wrapOnce(cur, t);
        if (tail === null) break;
        hits++;
        cur = tail;
      }
    }
    return hits;
  }
  function applyHL(id) {
    var root = document.querySelector(".lessonpage");
    if (!root || !id) return;
    A.hlList(id).forEach(function (x) { wrapAll(root, x.t); });
  }
  A.applyHL = applyHL;

  function hlBar() { return $("#hlbar"); }
  function refreshHLBar() {
    var bar = hlBar();
    if (!bar) return;
    var sel = window.getSelection();
    var t = sel ? String(sel.toString()) : "";
    t = t.replace(/\s+/g, " ").trim();
    var page = document.querySelector(".lessonpage");
    var ok = !!(page && t && t.length >= 2 && t.length <= 160 && sel.anchorNode && page.contains(sel.anchorNode));
    if (!ok) { pendingHL = ""; bar.classList.remove("on"); return; }
    pendingHL = t;
    var sn = bar.querySelector(".hlsnip");
    if (sn) sn.textContent = t.length > 42 ? t.slice(0, 42) + "…" : t;
    bar.classList.add("on");
  }
  document.addEventListener("selectionchange", function () {
    if (!SUB.lesson) { var b = hlBar(); if (b) b.classList.remove("on"); return; }
    refreshHLBar();
  });
  on("hl-add", function () {
    if (!SUB.lesson || !pendingHL) return;
    var ok = A.hlAdd(SUB.lesson, pendingHL);
    try { window.getSelection().removeAllRanges(); } catch (e) {}
    var b = hlBar(); if (b) b.classList.remove("on");
    var y = window.scrollY;
    render();
    window.scrollTo(0, y);
    A.toast(ok ? "已标为重点" : "这句已经在重点里了");
  });
  on("hl-cancel", function () {
    try { window.getSelection().removeAllRanges(); } catch (e) {}
    var b = hlBar(); if (b) b.classList.remove("on");
    pendingHL = "";
  });
  on("hl-del", function (el) {
    var t = el.getAttribute("data-v");
    if (!SUB.lesson || !t) return;
    A.hlDel(SUB.lesson, t);
    var y = window.scrollY;
    render();
    window.scrollTo(0, y);
    A.toast("已删除这处重点");
  });

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

  /* 粘贴文本导入：换设备时比传文件方便 */
  on("import-paste", function () {
    A.ask("把旧设备导出的备份文字粘进来（很长也没关系），粘贴完点确定。",
      function (txt) { A.importText(txt); }, "导入", null, "paste");
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
  /* 真题待复习：跳真题页并只看到期的那些 */
  on("exam-due", function () {
    ST.examDue = 1; ST.examYear = 0; ST.examType = ""; ST.examPart = ""; ST.examDiff = ""; ST.examHot = 0; ST.examQ = "";
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1; SUB.paper = null;
    go("exam");
  });
  on("open-exam", function (el) {
    SUB.retLesson = SUB.lesson || null;   /* 从讲义点进来的，返回时回讲义 */
    SUB.retPaper = SUB.paper ? SUB.paper.year : null;  /* 从整卷点进来的，返回时回整卷 */
    SUB.retPaperIdx = SUB.paper ? SUB.paper.i : 0;
    SUB.paper = null;
    SUB.lesson = null; SUB.formula = 0;
    SUB.examone = parseInt(el.getAttribute("data-v"), 10);
    SUB.examschool = el.getAttribute("data-s") || ST.examSchool || "shu";
    ST.examSchool = SUB.examschool;
    render();
    window.scrollTo(0, 0);
  });
  /* 整卷模式：一年一套卷，翻页看原卷 */
  on("paper", function (el) {
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1;
    SUB.paper = { year: parseInt(el.getAttribute("data-v"), 10), i: 0 };
    render();
    window.scrollTo(0, 0);
  });
  on("paper-go", function (el) {
    if (!SUB.paper) return;
    var i = parseInt(el.getAttribute("data-v"), 10);
    var total = A.paperPages(ST.examSchool || "shu", SUB.paper.year).length;
    if (i < 0 || i >= total) return;
    SUB.paper.i = i;
    render();
    window.scrollTo(0, 0);
  });
  on("paper-close", function () { SUB.paper = null; render(); });

  /* 整卷计时：模拟考场，3 小时倒计时，刷新也不丢 */
  var TIMER_KEY = "kaoyan829.v2.ptimer";
  function timerMap() { try { return JSON.parse(localStorage.getItem(TIMER_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function timerEnd(y) { return timerMap()[y] || 0; }
  function timerSet(y, ts) { var m = timerMap(); m[y] = ts; try { localStorage.setItem(TIMER_KEY, JSON.stringify(m)); } catch (e) { } }
  function fmtLeft(ms) {
    if (ms < 0) ms = 0;
    var s = Math.floor(ms / 1000), hh = Math.floor(s / 3600), mm = Math.floor((s % 3600) / 60), ss = s % 60;
    return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
  }
  function paintTimer() {
    var el = document.getElementById("ptimer");
    if (!el || !SUB.paper) return;
    var y = SUB.paper.year, end = timerEnd(y);
    if (!end) { el.textContent = "03:00:00"; el.className = "ptimer"; return; }
    var left = end - Date.now();
    el.textContent = left > 0 ? fmtLeft(left) : "时间到";
    el.className = "ptimer" + (left <= 0 ? " over" : (left < 15 * 60 * 1000 ? " warn" : ""));
  }
  on("ptimer", function () {
    if (!SUB.paper) return;
    var y = SUB.paper.year;
    if (timerEnd(y)) { timerSet(y, 0); timerSet("start-" + y, 0); A.toast("已清零"); }
    else {
      timerSet(y, Date.now() + 3 * 3600 * 1000);
      timerSet("start-" + y, Date.now());
      A.toast("开始计时，3 小时");
    }
    paintTimer();
    render();
  });
  on("ptimer-clear", function () {
    if (!SUB.paper) return;
    timerSet(SUB.paper.year, 0); timerSet("start-" + SUB.paper.year, 0); render(); A.toast("已清零");
  });

  /* 交卷：停表 + 生成本卷复盘（用时、会做率、逐题对错） */
  on("paper-submit", function () {
    if (!SUB.paper) return;
    var y = SUB.paper.year, st = timerMap()["start-" + y] || 0;
    var used = st ? Math.max(1, Math.round((Date.now() - st) / 60000)) : null;
    timerSet(y, 0);
    ST.paperReview = { used: used, at: Date.now() };
    render();
    window.scrollTo(0, 0);
    A.toast(used ? "已交卷，用时 " + used + " 分钟" : "已交卷（没开计时，用时未知）", "ok");
  });
  on("review-open", function (el) {
    var i = parseInt(el.getAttribute("data-v"), 10);
    var s = el.getAttribute("data-s") || ST.examSchool || "shu";
    var p = examAt(i);
    if (!p) return;
    ST.paperReview = null;
    SUB.paper = null;
    SUB.examone = i;
    SUB.examschool = p._school || s;
    ST.examSchool = SUB.examschool;
    render();
    window.scrollTo(0, 0);
  });
  setInterval(paintTimer, 1000);

  /* 读图专项：先选题，再一题一屏 */
  on("figdrill", function () {
    SUB.lesson = null; SUB.formula = 0; SUB.examone = -1; SUB.paper = null;
    SUB.fig = 0; A.ST.figRun = null; A.ST.figImg = false;
    A.ST.figSetup = A.ST.figSetup || { school: "", year: "", n: 10 };
    render();
    window.scrollTo(0, 0);
  });
  on("figdrill-close", function () { SUB.fig = -1; A.ST.figRun = null; A.ST.figImg = false; render(); window.scrollTo(0, 0); });
  on("figback", function () { A.ST.figRun = null; A.ST.figImg = false; SUB.fig = 0; render(); window.scrollTo(0, 0); });
  on("figSchool", function (el) {
    var st = A.ST.figSetup || (A.ST.figSetup = {});
    st.school = el.getAttribute("data-v") || "";
    st.year = "";
    render();
  });
  on("figYear", function (el) {
    var st = A.ST.figSetup || (A.ST.figSetup = {});
    st.year = el.getAttribute("data-v") || "";
    render();
  });
  on("figN", function (el) {
    var st = A.ST.figSetup || (A.ST.figSetup = {});
    st.n = parseInt(el.getAttribute("data-v"), 10) || 0;
    render();
  });
  on("fig-start", function () {
    var st = A.ST.figSetup || {};
    var list = A.figPick();
    var n = A.num(st.n, 10) || list.length;
    A.ST.figRun = { ids: list.slice(0, n).map(function (x) { return x.p.id; }) };
    SUB.fig = 0; A.ST.figImg = false;
    render();
    window.scrollTo(0, 0);
  });
  on("fig-img", function () { A.ST.figImg = !A.ST.figImg; render(); });
  on("fig-go", function (el) {
    SUB.fig = Math.max(0, parseInt(el.getAttribute("data-v"), 10) || 0);
    A.ST.figImg = false;
    render();
    window.scrollTo(0, 0);
  });
  on("figgrade", function (el) {
    var run = A.ST.figRun;
    if (!run || !run.ids) return;
    var id = run.ids[SUB.fig || 0];
    if (!id) return;
    var g = el.getAttribute("data-g");
    A.recordExam(id, g);
    if (SUB.fig < run.ids.length - 1) SUB.fig++;
    A.ST.figImg = false;
    render();
    window.scrollTo(0, 0);
  });
  on("exam-back", function () {
    var back = SUB.retLesson, bp = SUB.retPaper;
    SUB.examone = -1; SUB.retLesson = null; SUB.retPaper = null;
    if (back) { openLesson(back); return; }
    if (bp) { SUB.paper = { year: bp, i: SUB.retPaperIdx || 0 }; SUB.retPaperIdx = 0; render(); return; }
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
    if (ST.paperReview) { render(); return; }   /* 复盘面板里改了判定，立刻重算统计 */
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
  on("gotolesson", function (el) { openLesson(el.getAttribute("data-v")); });

  on("zoom", function (el) { A.openZoom(el.getAttribute("data-src"), el.getAttribute("data-alt")); });
  on("zoom-close", function () { A.closeZoom(); });

  /* 主题 / 胶囊按钮 */
  on("theme", function () { A.applyTheme(A.THEME() === "dark" ? "light" : "dark"); });

  /* ---------- 站内确认框（替掉原生 confirm，手机上更稳） ---------- */
  function ask(msg, okFn, okText, extras, mode) {
    var old = $("#asksheet"); if (old && old.remove) old.remove();
    var d = document.createElement("div");
    d.id = "asksheet";
    d.className = "asksheet";
    var ex = "";
    (extras || []).forEach(function (x, i) {
      ex += '<button class="btn ghost" data-extra="' + i + '">' + esc(x.t) + "</button>";
    });
    d.innerHTML = '<div class="askbox"><p>' + esc(msg) + "</p>" +
      (mode === "paste" ? '<textarea id="askpaste" class="askpaste" placeholder="粘贴备份 JSON 文本"></textarea>' : "") +
      '<div class="askbtns"><button class="btn ghost" data-ask="0">取消</button>' + ex +
      '<button class="btn primary" data-ask="1">' + esc(okText || "确定") + "</button></div></div>";
    document.body.appendChild(d);
    d.addEventListener("click", function (e) {
      if (e.target === d) { d.remove(); return; }
      var b = e.target.closest ? e.target.closest("[data-ask]") : null;
      if (!b) return;
      e.preventDefault();
      e.stopPropagation();
      var ta = document.getElementById("askpaste");
      var val = ta ? ta.value : "";
      d.remove();
      if (b.getAttribute("data-ask") === "1" && okFn) okFn(val);
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
      var msg = String(err && err.message || err || "");
      var hint = "常见原因：Key 不对、网络不通（要能访问接口地址）、余额不足。";
      if (/401|403/.test(msg)) hint = "Key 不对或没有权限：去「我的 → AI 答疑」重新粘一次 Key。";
      else if (/429/.test(msg)) hint = "请求太频繁或额度用完：等一会儿再试，或去平台看余额。";
      else if (/Failed to fetch|NetworkError|network/i.test(msg)) hint = "网络没通：确认手机能上网，或者这个接口地址被墙。";
      out.innerHTML = '<div class="aibad">失败了：' + esc(msg) + "</div>" +
        '<div class="tiny muted">' + esc(hint) + "</div>" +
        '<div class="row"><button class="btn ghost sm" data-act="ai-send">再试一次</button></div>';
    });
  }

  /* 清掉本机 Key（公共电脑 / 换设备） */
  on("ai-clearkey", function () {
    A.ask("清除这台设备上保存的 API Key？清完 AI 就不能用了，做题不受影响。", function () {
      try { localStorage.removeItem(AIKEY); } catch (e) { }
      A.toast("已清除本机 Key", "ok");
      render();
    }, "清除");
  });

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
      if (f === "examDue") ST.examDue = el.getAttribute("data-v") === "1" ? 1 : 0;
      if (f === "year") ST.examYear = parseInt(el.getAttribute("data-v"), 10) || 0;
      if (f === "school") { ST.examSchool = el.getAttribute("data-v"); ST.examYear = 0; ST.examKp = ""; ST.examType = ""; ST.examPart = ""; ST.examDiff = ""; ST.examHot = 0; ST.examDue = 0; }
      if (f === "mode") { ST.qi = 0; ST.flt.kw = ""; if (el.getAttribute("data-v") !== "kp") ST.kpOpen = false; }
      if (f === "subject") { ST.flt.subject = el.getAttribute("data-v"); ST.flt.kw = ""; ST.qi = 0; }
      A.buildList(); render();
      return;
    }
    var nt = el.getAttribute("data-nt");
    if (nt) {
      e.preventDefault();
      /* 切换二级页签时清掉上一页的搜索词与筛选，避免「一进来就带着上次的关键词」 */
      ST.noteTab = nt;
      ST.lq = ""; ST.nq = "";
      if (nt !== "exam") { ST.examQ = ""; }
      SUB.lesson = null;
      render();
      window.scrollTo(0, 0);
      return;
    }
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
    /* 空闲时把讲义正文悄悄拉下来：首屏不背这个包，但断网时讲义也能看 */
    setTimeout(function () {
      try {
        var c = navigator.connection || {};
        if (c.saveData || /(^|-)2g$/i.test(c.effectiveType || "")) return;
        if (typeof requestIdleCallback === "function") {
          requestIdleCallback(function () { A.ensureLessons(null); }, { timeout: 8000 });
        } else { A.ensureLessons(null); }
      } catch (e) { }
    }, 4000);
    /* 数据只在本地：第一次来给个提醒 */
    try {
      if (!localStorage.getItem("kaoyan829.tip")) {
        localStorage.setItem("kaoyan829.tip", "1");
        setTimeout(function () { A.toast("进度只存在这台设备，记得常备份", "warn"); }, 1200);
      }
    } catch (e) { }
  }

  /* ---------- 手势与快捷键：手机左右滑动切题，电脑用键盘 ---------- */
  function drillActive() {
    try { return currentView().id === "drill"; } catch (e) { return false; }
  }
  function clickIf(sel) {
    var e = document.querySelector(sel);
    if (e && !e.disabled) { e.click(); return true; }
    return false;
  }

  var tX = 0, tY = 0, tT = 0;
  document.addEventListener("touchstart", function (e) {
    if (!drillActive() || !e.touches || e.touches.length !== 1) return;
    tX = e.touches[0].clientX; tY = e.touches[0].clientY; tT = Date.now();
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (!drillActive()) return;
    var t = e.changedTouches && e.changedTouches[0];
    if (!t) return;
    var dx = t.clientX - tX, dy = t.clientY - tY, dt = Date.now() - tT;
    if (dt > 900 || Math.abs(dx) < 70 || Math.abs(dy) > 55) return;
    /* 从屏幕边缘起手多半是系统返回手势，放过 */
    if (dx > 0 && tX < 24) return;
    if (dx < 0) clickIf('[data-act="next"]');
    else clickIf('[data-act="prev"]');
  }, { passive: true });

  A.SUB = SUB; A.ST = ST;
  A.boot = boot;
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();

})(window.A);
