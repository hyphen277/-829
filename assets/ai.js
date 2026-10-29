/* AI 侧栏 —— 直连 OpenAI 兼容接口（默认 DeepSeek）
 * 纯前端，无后端；Key 只存在本机 localStorage。
 */
(function () {
  "use strict";

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  };

  var CFG_KEY = "kaoyan829.ai.cfg";
  var CHAT_KEY = "kaoyan829.ai.msgs";
  var MAX_HIST = 60;

  var SYS = [
    "你是考研 829（信号与系统 + 电路）的答疑助教，服务对象是正在备考的考生。",
    "要求：",
    "1. 用中文回答，先给结论，再给步骤，不要客套话。",
    "2. 数学公式一律用 LaTeX：行内 $...$，独立成行 $$...$$。",
    "3. 讲题时按「考点 → 思路 → 关键一步 → 易错点」的顺序，控制在 300 字内，除非用户要求展开。",
    "4. 不要复述题目原文。"
  ].join("\n");

  var CFG = loadCfg();
  function loadCfg() {
    try {
      var raw = localStorage.getItem(CFG_KEY);
      if (raw) {
        var o = JSON.parse(raw);
        if (o && o.base) return o;
      }
    } catch (e) { }
    return { base: "https://api.deepseek.com", model: "deepseek-chat", key: "" };
  }
  function saveCfg() {
    try { localStorage.setItem(CFG_KEY, JSON.stringify(CFG)); } catch (e) { }
  }

  var MSGS = loadMsgs();
  /* 点「问 AI」时如果还没填 Key，先把要问的内容存这儿，配好 Key 自动发出去 */
  var PENDING = null;
  function loadMsgs() {
    try {
      var raw = localStorage.getItem(CHAT_KEY);
      if (raw) { var a = JSON.parse(raw); if (a && a.length) return a; }
    } catch (e) { }
    return [];
  }
  function saveMsgs() {
    try { localStorage.setItem(CHAT_KEY, JSON.stringify(MSGS.slice(-MAX_HIST))); } catch (e) { }
  }

  var root = $("#ai");
  var bodyEl = $("#aiBody");
  var formEl = $("#aiForm");
  var inputEl = $("#aiInput");
  var sendEl = $("#aiSend");
  var modelEl = $("#aiModel");
  var fabEl = $("#fab");

  var busy = false;
  var pending = null;      // 正在流式输出的消息节点
  var rafId = 0;

  /* ---------- 渲染 ---------- */
  function md(t) {
    if (window.MD) { try { return window.MD(t); } catch (e) { } }
    return "<p>" + esc(t).replace(/\n/g, "<br>") + "</p>";
  }

  function bubble(m) {
    var d = document.createElement("div");
    d.className = "msg " + (m.role === "user" ? "user" : "ai") + (m.err ? " err" : "");
    var b = document.createElement("div");
    b.className = "bub";
    if (m.role === "user") b.textContent = m.content;
    else b.innerHTML = m.content ? md(m.content) : '<span class="ai-wait"><i></i><i></i><i></i></span>';
    d.appendChild(b);
    return d;
  }

  function renderAll() {
    if (!bodyEl) return;
    bodyEl.innerHTML = "";
    if (!MSGS.length) {
      bodyEl.innerHTML =
        '<div class="msg ai welcome"><div class="bub">' +
        "我是这台电脑上的 AI 助教。刷题时点题卡右上角的「✦ 问 AI」，题目会带过来。" +
        "<br><br>也可以直接在这里问：初值定理怎么用？为什么这道题要除以 jω？" +
        "</div></div>";
      return;
    }
    MSGS.forEach(function (m) { bodyEl.appendChild(bubble(m)); });
    scrollBottom();
  }

  function scrollBottom() {
    if (bodyEl) bodyEl.scrollTop = bodyEl.scrollHeight;
  }

  function schedulePaint(node, m) {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = 0;
      if (!node) return;
      var b = node.querySelector(".bub");
      if (!b) return;
      b.innerHTML = m.content ? md(m.content) : '<span class="ai-wait"><i></i><i></i><i></i></span>';
      scrollBottom();
    });
  }

  /* ---------- 面板开关 ---------- */
  function isDesktop() { return window.innerWidth >= 1100; }

  function open() {
    if (isDesktop()) {
      document.body.classList.add("ai-on");
      try { localStorage.setItem("kaoyan829.ai.open", "1"); } catch (e) { }
    } else {
      root.classList.add("open");
      document.body.classList.add("ai-lock");
    }
    checkSetup();
    setTimeout(function () { if (inputEl) inputEl.focus({ preventScroll: true }); scrollBottom(); }, 260);
  }
  function close() {
    if (isDesktop()) {
      document.body.classList.remove("ai-on");
      try { localStorage.setItem("kaoyan829.ai.open", "0"); } catch (e) { }
    } else {
      root.classList.remove("open");
      document.body.classList.remove("ai-lock");
    }
  }

  fabEl && fabEl.addEventListener("click", open);
  $("#aiClose") && $("#aiClose").addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && root.classList.contains("open")) close();
  });

  /* ---------- 设置 ---------- */
  function checkSetup() {
    if (modelEl) modelEl.textContent = CFG.key ? CFG.model : "未配置";
    var ex = $("#aiSetup");
    if (!CFG.key && !ex) showSetup();
    if (CFG.key && ex) ex.remove();
  }

  function showSetup() {
    var old = $("#aiSetup");
    if (old) old.remove();
    var d = document.createElement("div");
    d.className = "ai-setup";
    d.id = "aiSetup";
    d.innerHTML =
      '<h3>接一个大模型</h3>' +
      '<p class="lead">这个学习网站是纯本地文件，没有服务器。填一个你自己的 API Key，就能在右边直接问，题目会自动带过去。</p>' +
      '<label>接口地址</label>' +
      '<input class="cfg-in" id="cfgBase" value="' + esc(CFG.base) + '" placeholder="https://api.deepseek.com">' +
      '<label>模型名</label>' +
      '<input class="cfg-in" id="cfgModel" value="' + esc(CFG.model) + '" placeholder="deepseek-chat">' +
      '<label>API Key</label>' +
      '<input class="cfg-in" id="cfgKey" type="password" value="' + esc(CFG.key) + '" placeholder="sk-…">' +
      '<p class="tip">Key 只存在这台电脑的浏览器里，请求直接从浏览器发给你填的服务商，不经过任何中间服务器。</p>' +
      '<p class="tip">还没有 Key？<a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noreferrer">去 DeepSeek 申请</a>（注册送额度）。也支持任何 OpenAI 兼容接口，比如 Moonshot、通义千问。</p>' +
      '<button class="btn primary block" id="cfgSave">保存并开始</button>';
    root.appendChild(d);
    $("#cfgSave").addEventListener("click", function () {
      var b = $("#cfgBase").value.trim() || "https://api.deepseek.com";
      var m = $("#cfgModel").value.trim() || "deepseek-chat";
      var k = $("#cfgKey").value.trim();
      if (!k) { $("#cfgKey").focus(); return; }
      CFG = { base: b.replace(/\/+$/, ""), model: m, key: k };
      saveCfg();
      d.remove();
      checkSetup();
      inputEl && inputEl.focus({ preventScroll: true });
      if (PENDING) {
        var p = PENDING; PENDING = null;
        setTimeout(function () { send(p); }, 60);
      }
    });
  }

  $("#aiCfg") && $("#aiCfg").addEventListener("click", showSetup);
  $("#aiClear") && $("#aiClear").addEventListener("click", function () {
    if (busy) return;
    MSGS = []; pending = null; saveMsgs(); renderAll();
  });

  /* ---------- 发送 ---------- */
  function setBusy(v) {
    busy = v;
    if (sendEl) sendEl.disabled = v;
  }

  function push(role, content, node) {
    var m = { role: role, content: content };
    MSGS.push(m);
    var n = node || bubble(m);
    if (bodyEl) { bodyEl.appendChild(n); scrollBottom(); }
    saveMsgs();
    return { m: m, n: n };
  }

  function errText(e) {
    var s = String(e && e.message || e);
    if (/401|invalid.*key|Unauthorized/i.test(s)) return "API Key 无效（401）。点右上角 ⚙ 重新填。";
    if (/402|insufficient|balance/i.test(s)) return "账户余额不足（402）。";
    if (/429|rate.?limit/i.test(s)) return "请求太频繁（429），等几秒再发。";
    if (/Failed to fetch|NetworkError|Load failed/i.test(s)) return "连不上接口。检查：①地址后缀要不要带 /v1 ②网络/代理 ③Key 是否属于这个地址。原始信息：" + s;
    if (/404/.test(s)) return "接口路径 404：地址可能少了或多了 /v1。DeepSeek 用 https://api.deepseek.com，会自动补 /chat/completions。原始信息：" + s;
    return s;
  }

  async function send(text) {
    text = (text || "").trim();
    if (!text || busy) return;
    if (!CFG.key) { showSetup(); return; }

    setBusy(true);
    var w = bodyEl.querySelector(".msg.welcome");
    if (w) w.remove();
    push("user", text);
    var node = bubble({ role: "assistant", content: "" });
    var holder = { role: "assistant", content: "" };
    MSGS.push(holder);
    bodyEl.appendChild(node);
    scrollBottom();
    pending = node;

    var url = CFG.base.replace(/\/+$/, "");
    if (!/\/chat\/completions$/.test(url)) url += "/chat/completions";

    try {
      var res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + CFG.key
        },
        body: JSON.stringify({
          model: CFG.model,
          stream: true,
          temperature: 0.3,
          messages: [{ role: "system", content: SYS }].concat(
            MSGS.slice(0, -1).map(function (x) { return { role: x.role, content: x.content }; })
          )
        })
      });

      if (!res.ok) {
        var t = "";
        try { t = await res.text(); } catch (e) { }
        throw new Error(res.status + " " + (t || res.statusText));
      }
      if (!res.body) throw new Error("浏览器不支持流式响应");

      var reader = res.body.getReader();
      var dec = new TextDecoder("utf-8");
      var buf = "";

      while (true) {
        var r = await reader.read();
        if (r.done) break;
        buf += dec.decode(r.value, { stream: true });
        var lines = buf.split("\n");
        buf = lines.pop();
        for (var i = 0; i < lines.length; i++) {
          var line = lines[i].trim();
          if (!line || line.charAt(0) === ":") continue;
          if (line.indexOf("data:") !== 0) continue;
          var payload = line.slice(5).trim();
          if (payload === "[DONE]") continue;
          var j;
          try { j = JSON.parse(payload); } catch (e) { continue; }
          var d = j.choices && j.choices[0] && (j.choices[0].delta || {});
          var piece = d.content || "";
          if (piece) {
            holder.content += piece;
            schedulePaint(node, holder);
          }
        }
      }

      if (!holder.content) {
        holder.content = "（模型没有返回内容，换个问法试试。）";
        schedulePaint(node, holder);
      }
      saveMsgs();
    } catch (e) {
      MSGS.pop();
      holder.content = errText(e);
      holder.err = true;
      pending = null;
      var b = node.querySelector(".bub");
      node.className = "msg ai err";
      if (b) b.textContent = holder.content;
      MSGS.push(holder);
      saveMsgs();
      scrollBottom();
    }

    pending = null;
    setBusy(false);
  }

  /* ---------- 输入框 ---------- */
  if (formEl) {
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = inputEl.value;
      inputEl.value = "";
      autosize();
      send(v);
    });
  }
  function autosize() {
    if (!inputEl) return;
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 132) + "px";
  }
  if (inputEl) {
    inputEl.addEventListener("input", autosize);
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        var v = inputEl.value;
        inputEl.value = "";
        autosize();
        send(v);
      }
    });
  }

  /* ---------- 快捷问 ---------- */
  var quick = $("#aiQuick");
  if (quick) {
    quick.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-q]");
      if (!b) return;
      send(b.dataset.q);
    });
  }

  /* ---------- 对外接口 ---------- */
  function strip(s) {
    return String(s || "").replace(/<[^>]+>/g, "").trim();
  }
  function kpNames(q) {
    var out = [];
    (q.kp || []).forEach(function (k) {
      var p = window.KPMAP && window.KPMAP[k];
      out.push(p ? p.name : k);
    });
    return out.join("、") || "未标注";
  }

  function askAbout(q) {
    if (!q) return;
    open();

    var parts = [];
    parts.push("【" + q.subject + "】考点：" + kpNames(q));
    if (q.source) parts.push("来源：" + q.source);
    parts.push("");
    parts.push("题目：" + strip(q.stem));
    if (q.type === "choice" && q.options) {
      parts.push("选项：" + q.options.map(function (o, i) {
        return "ABCDEF"[i] + ". " + strip(o);
      }).join("　"));
      parts.push("正确答案：" + ("ABCDEF"[q.answer] || "?"));
    }
    if (q.answerText) parts.push("标准答案：" + strip(q.answerText));
    if (q.solution) parts.push("官方解析：" + strip(q.solution));
    parts.push("");
    parts.push("请按「考点 → 思路 → 关键一步 → 易错点」讲一遍，别重复题目。");

    if (!CFG.key) { PENDING = parts.join("\n"); showSetup(); return; }
    send(parts.join("\n"));
  }

  function askExam(p) {
    if (!p) return;
    open();

    var parts = [];
    parts.push("【" + (p.year || "") + " 年真题 · " + (p.part || "") + " · " + (p.no || "") + "】");
    if (p.points) parts.push("分值：" + p.points + " 分");
    parts.push("考点：" + kpNames({ kp: p.kp }));
    parts.push("");
    parts.push("题目（卷面转录摘要）：" + p.brief);
    parts.push("");
    parts.push("请按这个顺序回答：① 这题真正在考什么；② 完整解题步骤（写出关键公式和代入的数值）；③ 最容易丢分的那一步。");
    parts.push("如果摘要里的数值不足以唯一确定答案，直接把缺的条件说出来，然后把方法讲到能照着套为止，不要含糊。");

    if (!CFG.key) { PENDING = parts.join("\n"); showSetup(); return; }
    send(parts.join("\n"));
  }

  window.AI = { open: open, close: close, askAbout: askAbout, askExam: askExam, setup: showSetup };

  /* ---------- 启动 ---------- */
  renderAll();
  checkSetup();
  try {
    if (localStorage.getItem("kaoyan829.ai.open") !== "0" && isDesktop()) {
      document.body.classList.add("ai-on");
    }
  } catch (e) { }
})();