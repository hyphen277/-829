/* 自编练习题的示意图（按题干参数手绘，画不准的一律不给图） */
window.QFIGS = {
  /* ---- 一阶 / 二阶：串联回路 ---- */
  "L01-T1": { t: "loop", a: { srcL: "24 V", sw: true, swL: "t = 0 闭合",
    els: [{ k: "R", l: "R₁ 3 Ω" }, { k: "R", l: "R₂ 6 Ω", par: { k: "C", l: "C 2 μF" } }] } },
  "L01-T3": { t: "loop", a: { srcL: "15 V", sw: true, swL: "t = 0 闭合",
    els: [{ k: "R", l: "R₁ 6 Ω" }, { k: "R", l: "R₂ 3 Ω", par: { k: "C", l: "C 0.2 F" } }] } },
  "L02-T1": { t: "loop", a: { srcL: "u_S",
    els: [{ k: "R", l: "R" }, { k: "L", l: "L" }, { k: "C", l: "C" }] } },
  "L02-T2": { t: "loop", a: { srcL: "8 V",
    els: [{ k: "R", l: "R 4 Ω" }, { k: "L", l: "L 1 H" }, { k: "C", l: "C 0.25 F" }] } },
  "L02-T3": { t: "loop", a: { srcL: "u_S",
    els: [{ k: "R", l: "R = ?" }, { k: "L", l: "L 0.5 H" }, { k: "C", l: "C 0.2 F" }] } },

  /* ---- 正弦稳态：RC / RL 串并联 ---- */
  "L03-T1": { t: "loop", a: { srcL: "u_S 100√2 cos ωt",
    els: [{ k: "R", l: "R 6 Ω" }, { k: "C", l: "C（ωC = 0.125 S）" }] } },
  "L03-T2": { t: "loop", a: { srcL: "u_S 130√2 cos ωt",
    els: [{ k: "R", l: "R 5 Ω" }, { k: "L", l: "L（ωL = 12 Ω）" }] } },
  "L03-T3": { t: "parallel", a: { src: { k: "V", l: "u_S 20√2 cos ωt" },
    br: [{ k: "R", l: "R 3 Ω" }, { k: "L", l: "L（ωL = 4 Ω）" }] } },
  "L03-T4": { t: "parallel", a: { src: { k: "V", l: "U̇ 220∠0° V" },
    br: [{ k: "R", l: "纯电阻 6 A" }, { k: "L", l: "纯电感 8 A" }, { k: "C", l: "纯电容 8 A" }] } },

  /* ---- 谐振 ---- */
  "L05-T1": { t: "loop", a: { srcL: "U_S",
    els: [{ k: "R", l: "R 5 Ω" }, { k: "L", l: "L 2 mH" }, { k: "C", l: "C 0.05 μF" }] } },
  "L05-T2": { t: "loop", a: { srcL: "U_S 30 V",
    els: [{ k: "R", l: "R" }, { k: "L", l: "L" }, { k: "C", l: "C" }] } },
  "L05-T3": { t: "parallel", a: { src: { k: "I", l: "I_S 0.4 A" },
    br: [{ k: "R", l: "R 500 Ω" }, { k: "L", l: "L 0.2 H" }, { k: "C", l: "C 20 μF" }] } },
  "L05-T4": { t: "loop", a: { srcL: "U_S",
    els: [{ k: "R", l: "R 25 Ω" }, { k: "L", l: "L" }, { k: "C", l: "C" }] } },
  "L05-T5": { t: "loop", a: { srcL: "U_S 2 V",
    els: [{ k: "R", l: "R 2 Ω" }, { k: "L", l: "X_L 40 Ω" }, { k: "C", l: "X_C 40 Ω" }] } },
  "L05-T6": { t: "loop", a: { srcL: "u_S 40√2 cos 1000t",
    els: [{ k: "R", l: "R 8 Ω" }, { k: "L", l: "L 0.4 H" }, { k: "C", l: "C 可变" }] } },

  /* ---- 一端口 / 功率 ---- */
  "L06-T1": { t: "box", a: { name: "一端口 N", sub: "U̇ 200∠0° V · İ 10∠−36.87° A", load: { k: "R", l: "" }, loadL: "" } },
  "L06-T5": { t: "loop", a: { srcL: "u = 20 + 30cos ωt + 10cos 3ωt",
    els: [{ k: "R", l: "R 5 Ω" }, { k: "L", l: "L（ωL = 5 Ω）" }] } },

  /* ---- 直流网络 ---- */
  "QC-02": { t: "loop", a: { srcL: "12 V", rightSrc: true, rightSrcL: "6 V",
    els: [{ k: "R", l: "R₁ 2 Ω" }], extraBottom: true } },

  /* ---- 教材习题（QC-2x 系列） ---- */
  "QC-21": { t: "loop", a: { srcL: "U 10 V",
    els: [{ k: "R", l: "R 10 Ω" }, { k: "L", l: "L 0.1 H" }, { k: "C", l: "C 10 μF" }] } },
  "QC-22": { t: "loop", a: { srcL: "U₁",
    els: [{ k: "R", l: "R 10 kΩ" }, { k: "C", l: "C 0.01 μF（u₂ 取电容两端）" }] } },
  "QC-23": { t: "parallel", a: { src: { k: "I", l: "İ_S" },
    br: [{ els: [{ k: "R", l: "R 10 Ω" }, { k: "L", l: "L 1 mH" }] }, { k: "C", l: "C 1 μF" }] } },
  "QC-59": { t: "loop", a: { srcL: "u 10√2 sin 1000t",
    els: [{ k: "R", l: "R 3 Ω" }, { k: "L", l: "L（X_L = 4 Ω）" }] } },
  "QC-61": { t: "loop", a: { srcL: "U 10 V",
    els: [{ k: "R", l: "R 10 Ω" }, { k: "L", l: "L 0.1 H" }, { k: "C", l: "C 10 μF" }] } },
  "QC-78": { t: "loop", a: { srcL: "u 非正弦",
    els: [{ k: "R", l: "R 10 Ω" }, { k: "L", l: "L 10 mH" }] } }
};