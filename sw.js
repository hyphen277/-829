/* 829 训练台 service worker：离线打开 + 秒开。
   策略：页面与代码网络优先（保证更新），图片字体缓存优先（省流量、快）。 */
const V = "1559f58775";
const CORE = [
  "./index.html",
  "./manifest.webmanifest",
  "./assets/pwa/icon-180.png",
  "./assets/katex/katex.min.css",
  "./assets/v2.css",
  "./assets/katex/katex.min.js",
  "./data/kp_signal.js",
  "./data/kp_circuit.js",
  "./data/q_signal.js",
  "./data/q_signal2.js",
  "./data/q_signal3.js",
  "./data/q_signal4.js",
  "./data/q_signal5.js",
  "./data/q_signal6.js",
  "./data/lessons_meta.js",
  "./data/questions.js",
  "./data/q_circuit2.js",
  "./data/q_circuit3.js",
  "./data/q_circuit4.js",
  "./data/exams.js",
  "./data/exams_guet.js",
  "./data/kp_talk.js",
  "./data/kp_lesson.js",
  "./data/formulas.js",
  "./assets/app.v2.js"
];
const C = "829-" + V;

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(C).then(function (c) {
      return Promise.all(CORE.map(function (u) {
        return fetch(new Request(u, { cache: "reload" })).then(function (r) {
          if (r && (r.ok || r.type === "opaque")) return c.put(u, r);
        }).catch(function () { });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (ks) {
      return Promise.all(ks.filter(function (k) { return k !== C; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

const CODE = /\.(?:html?|js|css|json|webmanifest)$/i;

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  let u;
  try { u = new URL(req.url); } catch (x) { return; }
  if (u.origin !== self.location.origin) return;
  if (u.pathname.indexOf("/sw.js") >= 0) return;

  const isNav = req.mode === "navigate" ||
    ((req.headers.get("accept") || "").indexOf("text/html") >= 0);
  if (isNav) {
    e.respondWith(
      fetch(req).then(function (r) {
        const cp = r.clone();
        caches.open(C).then(function (c) { c.put("index.html", cp); });
        return r;
      }).catch(function () {
        return caches.match("index.html").then(function (m) { return m || caches.match(req); });
      })
    );
    return;
  }

  if (CODE.test(u.pathname)) {
    e.respondWith(
      fetch(req).then(function (r) {
        if (r && r.status === 200) {
          const cp = r.clone();
          caches.open(C).then(function (c) { c.put(req, cp); });
        }
        return r;
      }).catch(function () { return caches.match(req); })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (m) {
      if (m) return m;
      return fetch(req).then(function (r) {
        if (r && r.status === 200) {
          const cp = r.clone();
          caches.open(C).then(function (c) { c.put(req, cp); });
        }
        return r;
      });
    })
  );
});