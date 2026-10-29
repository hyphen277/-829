window.QUESTIONS = [
 {
  "id": "L01-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第01课练习 T1",
  "tag": "对应 3-14 变式",
  "brief": "电路：24 V 电源经开关接 R₁ = 3 Ω 与 R₂ = 6 Ω 串联，R₂ 两端并 C = 2 μF。t = 0 ",
  "stem": "电路：24 V 电源经开关接 R₁ = 3 Ω 与 R₂ = 6 Ω 串联，R₂ 两端并 C = 2 μF。t = 0 闭合，闭合前稳定。求 **u_C(0₊)、i_C(0₊)、i_{R2}(0₊)**。",
  "answerText": "$$u_C(0_+) = 24\\times\\frac{6}{9} = 16\\ \\text{V}$$\n0₊ 时电容钳位 R₂ → $i_{R_2}(0_+) = 16/6 = \\dfrac83$ A；$i_{R_1}(0_+) = (24-16)/3 = \\dfrac83$ A\n$$\\boxed{i_C(0_+) = \\frac83 - \\frac83 = 0\\ \\text{A}}$$",
  "solution": "$$u_C(0_+) = 24\\times\\frac{6}{9} = 16\\ \\text{V}$$\n0₊ 时电容钳位 R₂ → $i_{R_2}(0_+) = 16/6 = \\dfrac83$ A；$i_{R_1}(0_+) = (24-16)/3 = \\dfrac83$ A\n$$\\boxed{i_C(0_+) = \\frac83 - \\frac83 = 0\\ \\text{A}}$$\n\n（与例题 1 结构相同：R₁/R₂ = 3/6 与 12 V 时的 2/4 成比例，所以都是\"充到一半时 i_C = 0\"。）",
  "difficulty": 3
 },
 {
  "id": "L01-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第01课练习 T2",
  "tag": "对应 3-30 变式",
  "brief": "一阶 RL 电路：L = 20 mH，从电感端口看进去（含受控源）的等效电阻 R_eq = 4 Ω。求 **τ**。",
  "stem": "一阶 RL 电路：L = 20 mH，从电感端口看进去（含受控源）的等效电阻 R_eq = 4 Ω。求 **τ**。",
  "answerText": "$$\\tau = \\frac{L}{R_{eq}} = \\frac{20\\times10^{-3}}{4} = 5\\times10^{-3}\\ \\text{s} = 5\\ \\text{ms}$$",
  "solution": "$$\\tau = \\frac{L}{R_{eq}} = \\frac{20\\times10^{-3}}{4} = 5\\times10^{-3}\\ \\text{s} = 5\\ \\text{ms}$$",
  "difficulty": 3
 },
 {
  "id": "L01-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第01课练习 T3",
  "tag": "对应 3-19 变式",
  "brief": "电路：15 V 电源经开关接 R₁ = 6 Ω 与 R₂ = 3 Ω 串联，C = 0.2 F 并在 R₂ 两端。t =",
  "stem": "电路：15 V 电源经开关接 R₁ = 6 Ω 与 R₂ = 3 Ω 串联，C = 0.2 F 并在 R₂ 两端。t = 0 闭合，闭合前 u_C(0₋) = 3 V。求 **u_C(t), t ≥ 0**。",
  "answerText": "$$u_C(0_+) = 3\\ \\text{V},\\qquad u_C(\\infty) = 15\\times\\frac{3}{6+3} = 5\\ \\text{V}$$\n$$R_{eq} = R_1\\parallel R_2 = \\frac{6\\times3}{9} = 2\\ \\Omega,\\qquad \\tau = 2\\times0.2 = 0.4\\ \\text{s}$$\n$$\\boxed{u_C(t) = 5 + (3-5)e^{-t/0.4} = 5 - 2e^{-2.5t}\\ \\text{V},\\quad t\\ge0}$$",
  "solution": "$$u_C(0_+) = 3\\ \\text{V},\\qquad u_C(\\infty) = 15\\times\\frac{3}{6+3} = 5\\ \\text{V}$$\n$$R_{eq} = R_1\\parallel R_2 = \\frac{6\\times3}{9} = 2\\ \\Omega,\\qquad \\tau = 2\\times0.2 = 0.4\\ \\text{s}$$\n$$\\boxed{u_C(t) = 5 + (3-5)e^{-t/0.4} = 5 - 2e^{-2.5t}\\ \\text{V},\\quad t\\ge0}$$",
  "difficulty": 3
 },
 {
  "id": "L01-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第01课练习 T4",
  "tag": "对应 3-31 变式",
  "brief": "电路：电流源 i_S = 6 A 并联 R₁ = 2 Ω、R₂ = 4 Ω，L = 1 H 串在 R₂ 支路中。t = ",
  "stem": "电路：电流源 i_S = 6 A 并联 R₁ = 2 Ω、R₂ = 4 Ω，L = 1 H 串在 R₂ 支路中。t = 0 时开关使 R₁ 与电流源脱离，仅剩 R₂–L 闭合回路。换路前稳定。求 **i_L(t), t ≥ 0**。",
  "answerText": "$$i_L(0_+) = i_L(0_-) = 6\\times\\frac{2}{2+4} = 2\\ \\text{A},\\qquad i_L(\\infty) = 0$$\n$$R_{eq} = R_2 = 4\\ \\Omega,\\qquad \\tau = \\frac{1}{4} = 0.25\\ \\text{s}$$\n$$\\boxed{i_L(t) = 2e^{-4t}\\ \\text{A},\\quad t\\ge0}$$",
  "solution": "$$i_L(0_+) = i_L(0_-) = 6\\times\\frac{2}{2+4} = 2\\ \\text{A},\\qquad i_L(\\infty) = 0$$\n$$R_{eq} = R_2 = 4\\ \\Omega,\\qquad \\tau = \\frac{1}{4} = 0.25\\ \\text{s}$$\n$$\\boxed{i_L(t) = 2e^{-4t}\\ \\text{A},\\quad t\\ge0}$$",
  "difficulty": 3
 },
 {
  "id": "L01-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第01课练习 T5",
  "tag": "综合，含受控源",
  "brief": "电路：30 V 电源经开关接 R₁ = 5 Ω 到节点 A，A 点接 R₂ = 10 Ω 到地，A 点接 C = 0.4",
  "stem": "电路：30 V 电源经开关接 R₁ = 5 Ω 到节点 A，A 点接 R₂ = 10 Ω 到地，A 点接 C = 0.4 F 到地。R₁ 支路中串一个受控电压源 $2i_1$（i₁ 为 R₁ 支路电流，关联方向）。t = 0 闭合，换路前 u_C(0₋) = 0。求 **u_C(t), t ≥ 0**。\n\n---",
  "answerText": "**① 稳态值**：电容开路 → i₁ = 0 → 受控源输出 0\n$$u_C(\\infty) = 30\\times\\frac{10}{5+10} = 20\\ \\text{V}$$",
  "solution": "**① 稳态值**：电容开路 → i₁ = 0 → 受控源输出 0\n$$u_C(\\infty) = 30\\times\\frac{10}{5+10} = 20\\ \\text{V}$$\n\n**② 求 R_eq**：把 C 拔出，从 A–地端口看进去。外加电压 u，流入电流 i。\n\nR₂ 并在端口上 → $i_{R_2} = u/10$；流过 R₁ 支路 $i_1 = i - u/10$。\n\nKVL（电源短路）：$u = 5i_1 + 2i_1 = 7i_1 = 7\\left(i - \\dfrac{u}{10}\\right)$\n\n$$u = 7i - 0.7u \\implies 1.7u = 7i \\implies R_{eq} = \\frac{7}{1.7} = \\frac{70}{17}\\ \\Omega$$\n\n**③ 时间常数**\n$$\\tau = R_{eq}C = \\frac{70}{17}\\times0.4 = \\frac{28}{17}\\ \\text{s}$$\n\n**④ 结果**\n$$\\boxed{u_C(t) = 20\\left(1 - e^{-17t/28}\\right)\\ \\text{V},\\quad t\\ge0}$$\n\n---",
  "difficulty": 3
 },
 {
  "id": "L02-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第02课练习 T1",
  "tag": "30 秒判别题，每题 5 分",
  "brief": "判断下列各电路的阻尼类型，并写出特征根（或 $\\omega_d$）。 **(a)** RLC 串联：R = 6 Ω，L ",
  "stem": "判断下列各电路的阻尼类型，并写出特征根（或 $\\omega_d$）。\n\n**(a)** RLC 串联：R = 6 Ω，L = 1 H，C = 0.04 F\n**(b)** RLC 串联：R = 1 Ω，L = 1 H，C = 1 F\n**(c)** RLC 串联：R = 2 Ω，L = 2 H，C = 1 F\n**(d)** GCL 并联：G = 2 S，C = 1 F，L = 0.25 H\n**(e)** GCL 并联：G = 0.5 S，C = 1 F，L = 1 H",
  "answerText": "**(a)** $\\alpha = \\dfrac{R}{2L} = 3$，$\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{1}{\\sqrt{0.04}} = 5$\n$\\alpha < \\omega_0$ → **欠阻尼**；$s = -3 \\pm j4$（$\\omega_d = 4$ rad/s）\n（校验：临界电阻 $2\\sqrt{L/C} = 2\\sqrt{25} = 10$ Ω > 6 Ω → 欠阻尼 ✓）",
  "solution": "**(a)** $\\alpha = \\dfrac{R}{2L} = 3$，$\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{1}{\\sqrt{0.04}} = 5$\n$\\alpha < \\omega_0$ → **欠阻尼**；$s = -3 \\pm j4$（$\\omega_d = 4$ rad/s）\n（校验：临界电阻 $2\\sqrt{L/C} = 2\\sqrt{25} = 10$ Ω > 6 Ω → 欠阻尼 ✓）\n\n**(b)** $\\alpha = 0.5$，$\\omega_0 = 1$ → $\\alpha < \\omega_0$ → **欠阻尼**；$\\omega_d = \\sqrt{1-0.25} = \\dfrac{\\sqrt3}{2} \\approx 0.866$；$s = -0.5 \\pm j0.866$\n\n**(c)** $\\alpha = \\dfrac{2}{4} = 0.5$，$\\omega_0 = \\dfrac{1}{\\sqrt2} \\approx 0.707$\n$\\alpha < \\omega_0$ → **欠阻尼**；$\\omega_d = \\sqrt{0.5 - 0.25} = 0.5$；$s = -0.5 \\pm j0.5$\n\n**(d)** $\\alpha = \\dfrac{G}{2C} = 1$，$\\omega_0 = \\dfrac{1}{\\sqrt{0.25}} = 2$\n$\\alpha < \\omega_0$ → **欠阻尼**；$\\omega_d = \\sqrt{4-1} = \\sqrt3 \\approx 1.732$；$s = -1 \\pm j\\sqrt3$\n\n**(e)** $\\alpha = \\dfrac{0.5}{2} = 0.25$，$\\omega_0 = \\dfrac{1}{\\sqrt1} = 1$\n$\\alpha < \\omega_0$ → **欠阻尼**；$\\omega_d = \\sqrt{1 - 0.0625} = \\dfrac{\\sqrt{15}}{4} \\approx 0.968$；$s = -0.25 \\pm j0.968$\n\n> **观察**：这五题全是欠阻尼！**说明\"欠阻尼\"是最常见的状态**（因为 R 往往小于临界电阻）。**但要小心——考试偏偏爱考\"临界\"和\"过阻尼\"，因为那是陷阱。**\n>\n> 顺便给你一个过阻尼的例子：RLC 串联 R = 20 Ω，L = 1 H，C = 0.04 F → α = 10 > ω₀ = 5 → 过阻尼。",
  "difficulty": 3
 },
 {
  "id": "L02-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第02课练习 T2",
  "tag": "对应 3-10 变式",
  "brief": "RLC 串联电路：R = 4 Ω，L = 1 H，C = 0.25 F。t = 0 接入 8 V 直流电压源，换路前 u",
  "stem": "RLC 串联电路：R = 4 Ω，L = 1 H，C = 0.25 F。t = 0 接入 8 V 直流电压源，换路前 u_C(0₋) = 0、i_L(0₋) = 0。\n求 **(1)** 阻尼类型与特征根；**(2)** $u_C(t)$，t ≥ 0。",
  "answerText": "**(1)** $\\alpha = \\dfrac{4}{2} = 2$，$\\omega_0 = \\dfrac{1}{\\sqrt{0.25}} = 2$",
  "solution": "**(1)** $\\alpha = \\dfrac{4}{2} = 2$，$\\omega_0 = \\dfrac{1}{\\sqrt{0.25}} = 2$\n\n$$\\alpha = \\omega_0 \\quad\\Longrightarrow\\quad \\textbf{临界阻尼}$$\n\n特征方程 $s^2 + \\dfrac{R}{L}s + \\dfrac{1}{LC} = s^2 + 4s + 4 = 0$ → $s_{1,2} = -2$（**重根**）\n\n**(2)** 稳态：$u_C(\\infty) = 8$ V\n\n$$u_C(t) = 8 + (A_1 + A_2t)e^{-2t}$$\n\n**条件一**：$u_C(0) = 8 + A_1 = 0 \\Rightarrow A_1 = -8$\n\n**条件二**：0₊ 电路：电容短路（0 V），电感开路（0 A）→ R = 4 Ω 上承受 8 V\n\n$$i_C(0_+) = \\frac{8}{4} = 2\\ \\text{A} \\quad\\Longrightarrow\\quad u_C'(0_+) = \\frac{2}{0.25} = 8\\ \\text{V/s}$$\n\n求导：$u_C'(t) = A_2e^{-2t} - 2(A_1+A_2t)e^{-2t}$ → $u_C'(0) = A_2 - 2A_1 = A_2 + 16$\n\n令 $= 8$：$A_2 = -8$\n\n$$\\boxed{u_C(t) = 8 - 8(1+t)e^{-2t} = 8\\left[1 - (1+t)e^{-2t}\\right]\\ \\text{V},\\quad t\\ge0}$$\n\n**校验**：t = 0 → 8(1−1) = 0 ✓；t→∞ → 8 ✓；求导得 $64te^{-2t} > 0$（t>0）→ **单调上升，无过冲** ✓ 符合临界阻尼。",
  "difficulty": 3
 },
 {
  "id": "L02-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第02课练习 T3",
  "tag": "对应 3-29 变式",
  "brief": "RLC 串联电路：L = 0.5 H，C = 0.2 F。求 **(1)** 临界阻尼对应的 R；**(2)** 又若要",
  "stem": "RLC 串联电路：L = 0.5 H，C = 0.2 F。求 **(1)** 临界阻尼对应的 R；**(2)** 又若要求 $\\alpha = 2$ rad/s 时的 R。",
  "answerText": "**(1) 临界阻尼**",
  "solution": "**(1) 临界阻尼**\n\n$$\\alpha = \\omega_0:\\quad \\frac{R}{2L} = \\frac{1}{\\sqrt{LC}} = \\frac{1}{\\sqrt{0.5\\times0.2}} = \\frac{1}{\\sqrt{0.1}} = \\sqrt{10}$$\n\n$$R = 2L\\sqrt{10} = 2\\times0.5\\times\\sqrt{10} = \\sqrt{10} \\approx 3.162\\ \\Omega$$\n\n**校验**：$R = 2\\sqrt{L/C} = 2\\sqrt{0.5/0.2} = 2\\sqrt{2.5} = 2\\times1.5811 = 3.162$ Ω ✓\n\n**(2) 要求 α = 2**\n\n$$\\frac{R}{2L} = 2 \\quad\\Longrightarrow\\quad R = 4L = 4\\times0.5 = 2\\ \\Omega$$\n\n**校验**：此时 $\\omega_0 = \\sqrt{10}\\approx3.162 > 2$ → 仍是欠阻尼（因为要求 α < ω₀）。",
  "difficulty": 3
 },
 {
  "id": "L02-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第02课练习 T4",
  "tag": "综合",
  "brief": "二阶电路动态方程： $$\\frac{d^2y}{dt^2} + 4\\frac{dy}{dt} + 13y = 26,\\q",
  "stem": "二阶电路动态方程：\n\n$$\\frac{d^2y}{dt^2} + 4\\frac{dy}{dt} + 13y = 26,\\qquad y(0_+)=0,\\ y'(0_+)=0$$\n\n求 **(1)** 阻尼类型、α、$\\omega_d$、$\\omega_0$；**(2)** $y(t)$。",
  "answerText": "**(1)** 特征方程 $s^2 + 4s + 13 = 0$",
  "solution": "**(1)** 特征方程 $s^2 + 4s + 13 = 0$\n\n$$\\Delta = 16 - 52 = -36 < 0 \\quad\\Longrightarrow\\quad \\textbf{欠阻尼}$$\n\n$$s_{1,2} = \\frac{-4\\pm j6}{2} = -2 \\pm j3$$\n\n$$\\alpha = 2,\\quad \\omega_d = 3,\\quad \\omega_0 = \\sqrt{2^2+3^2} = \\sqrt{13}\\ (\\approx 3.606)$$\n\n（校验：$c = 13 = \\omega_0^2$ ✓）\n\n**(2)** 稳态：$y(\\infty) = 26/13 = 2$\n\n$$y(t) = 2 + e^{-2t}(A_1\\cos3t + A_2\\sin3t)$$\n\n**条件一**：$y(0) = 2 + A_1 = 0 \\Rightarrow A_1 = -2$\n\n**条件二**：用速记公式 $y'(0) = -\\alpha A_1 + \\omega_d A_2 = -2(-2) + 3A_2 = 4 + 3A_2$\n\n令 $= 0$：$A_2 = -\\dfrac43$\n\n$$\\boxed{y(t) = 2 - e^{-2t}\\left(2\\cos3t + \\frac43\\sin3t\\right),\\quad t\\ge0}$$\n\n**校验**：t=0 → 2−2 = 0 ✓；t→∞ → 2 ✓。",
  "difficulty": 3
 },
 {
  "id": "L02-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C6"
  ],
  "source": "第02课练习 T5",
  "tag": "定性判断",
  "brief": "某二阶电路阶跃响应的波形表现为：从 0 单调上升，无过冲，且**比同一电路在临界阻尼时的响应慢**。问该电路处于什么阻尼",
  "stem": "某二阶电路阶跃响应的波形表现为：从 0 单调上升，无过冲，且**比同一电路在临界阻尼时的响应慢**。问该电路处于什么阻尼状态？为什么？\n\n---",
  "answerText": "**答：过阻尼。**",
  "solution": "**答：过阻尼。**\n\n**理由**：\n1. **单调无过冲** → 排除欠阻尼（欠阻尼会穿越稳态值、有过冲）\n2. 单调无过冲的情况只有**过阻尼**与**临界阻尼**两种\n3. 题中说\"**比临界阻尼更慢**\" → 过阻尼的过渡过程持续时间更长（因为其响应由\"离虚轴更近\"的那个特征根主导，衰减更慢），而临界阻尼是**非振荡情形中衰减最快**的\n\n所以：**过阻尼**。\n\n**补充**：也可以从特征根看。过阻尼 $|s_1| < |s_2|$，主导项 $e^{s_1t}$ 衰减慢 → 整体慢。临界阻尼重根 $s=-b/2a$，恰好落在两个实根之间，且响应含 $te^{st}$ 项在短时间内可提供更快的初始变化。\n\n---",
  "difficulty": 3
 },
 {
  "id": "L03-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T1",
  "tag": "串联基础",
  "brief": "R = 6 Ω 与 C 串联，$\\omega C = 0.125$ S，接在 $u_S(t) = 100\\sqrt2\\c",
  "stem": "R = 6 Ω 与 C 串联，$\\omega C = 0.125$ S，接在 $u_S(t) = 100\\sqrt2\\cos(\\omega t)$ V 上。\n求 **(1)** 阻抗 Z 与阻抗角；(2) 电流相量与瞬时值；(3) 各元件电压有效值；**(4)** 验证 $U_S \\ne U_R + U_C$。",
  "answerText": "**(1)** $\\omega C = 0.125$ S → $X_C = \\dfrac{1}{\\omega C} = 8\\ \\Omega$ → $Z_C = -j8\\ \\Omega$",
  "solution": "**(1)** $\\omega C = 0.125$ S → $X_C = \\dfrac{1}{\\omega C} = 8\\ \\Omega$ → $Z_C = -j8\\ \\Omega$\n\n$$Z = 6 - j8\\ \\Omega,\\qquad |Z| = \\sqrt{36+64} = 10\\ \\Omega,\\qquad \\varphi_Z = \\arctan\\frac{-8}{6} = -53.13°$$\n\n**（容性，电流超前电压 53.13°）**\n\n**(2)** $\\dot I = \\dfrac{100\\angle0°}{10\\angle{-53.13°}} = 10\\angle{53.13°}\\ \\text{A}$\n\n$$i(t) = 10\\sqrt2\\cos(\\omega t + 53.13°)\\ \\text{A}$$\n\n**(3)** $U_R = I\\times R = 10\\times6 = 60$ V；$U_C = 10\\times8 = 80$ V\n\n**(4)** $U_R + U_C = 140$ V，而 $U_S = 100$ V —— **不相等！**\n\n正确关系：$U_S = \\sqrt{U_R^2 + U_C^2} = \\sqrt{3600+6400} = \\sqrt{10000} = 100$ V ✓\n\n> **★ 6-8-10 是第二高频勾股组**（仅次于 3-4-5）。看到 6 和 8 就该条件反射想到 10。",
  "difficulty": 3
 },
 {
  "id": "L03-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T2",
  "tag": "串联电压分配陷阱",
  "brief": "R = 5 Ω 与 L 串联，$\\omega L = 12\\ \\Omega$，接在 $u_S = 130\\sqrt2\\c",
  "stem": "R = 5 Ω 与 L 串联，$\\omega L = 12\\ \\Omega$，接在 $u_S = 130\\sqrt2\\cos(\\omega t)$ V 上。\n求 $U_R$、$U_L$、$U$，并说明为什么 $U_R + U_L \\ne U$。",
  "answerText": "$$|Z| = \\sqrt{5^2+12^2} = 13\\ \\Omega,\\qquad I = \\frac{130}{13} = 10\\ \\text{A}$$",
  "solution": "$$|Z| = \\sqrt{5^2+12^2} = 13\\ \\Omega,\\qquad I = \\frac{130}{13} = 10\\ \\text{A}$$\n\n$$U_R = 10\\times5 = 50\\ \\text{V},\\qquad U_L = 10\\times12 = 120\\ \\text{V}$$\n\n$$U = \\sqrt{50^2+120^2} = \\sqrt{2500+14400} = \\sqrt{16900} = 130\\ \\text{V}\\ ✓$$\n\n**为什么 $U_R + U_L \\ne U$**：$\\dot U_R$ 与 $\\dot U_L$ 相位差 90°（$\\dot U_R$ 与 $\\dot I$ 同相，$\\dot U_L$ 超前 $\\dot I$ 90°），所以必须相量相加（矢量合成），不能代数相加。\n\n**★ 5-12-13 是第三高频勾股组。**",
  "difficulty": 3
 },
 {
  "id": "L03-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T3",
  "tag": "并联",
  "brief": "R = 3 Ω 与 L 并联，$\\omega L = 4\\ \\Omega$，接在 $u_S(t) = 20\\sqrt2\\",
  "stem": "R = 3 Ω 与 L 并联，$\\omega L = 4\\ \\Omega$，接在 $u_S(t) = 20\\sqrt2\\cos(\\omega t)$ V 上。\n求 **(1)** 各支路电流相量；**(2)** 总电流相量与有效值；**(3)** 等效阻抗 Z 与导纳 Y；**(4)** 验证 $I \\ne I_R + I_L$。",
  "answerText": "**(1)** $Z_R = 3\\ \\Omega$，$Z_L = j4\\ \\Omega$",
  "solution": "**(1)** $Z_R = 3\\ \\Omega$，$Z_L = j4\\ \\Omega$\n\n$$\\dot I_R = \\frac{20\\angle0°}{3} = 6.667\\angle0°\\ \\text{A},\\qquad \\dot I_L = \\frac{20\\angle0°}{j4} = 5\\angle{-90°} = -j5\\ \\text{A}$$\n\n**(2)** $\\dot I = 6.667 - j5 = 8.333\\angle{-36.87°}\\ \\text{A}$\n\n精确分数形式：$I = \\sqrt{\\left(\\frac{20}{3}\\right)^2 + 5^2} = \\sqrt{\\frac{400}{9}+25} = \\sqrt{\\frac{625}{9}} = \\frac{25}{3} \\approx 8.333$ A\n\n**(3)** 用导纳：\n\n$$Y = \\frac13 + \\frac{1}{j4} = \\frac13 - j\\frac14 = \\frac{4-j3}{12}\\ \\text{S}$$\n\n$$Z = \\frac{1}{Y} = \\frac{12}{4-j3} = \\frac{12(4+j3)}{25} = \\frac{48+j36}{25} = 1.92 + j1.44\\ \\Omega$$\n\n**(4)** $I_R + I_L = 6.667+5 = 11.667 \\ne 8.333$ ✓ **不相等**，因为相位差 90°。\n\n**校验**：$\\sqrt{I_R^2+I_L^2} = \\sqrt{44.44+25} = \\sqrt{69.44} = 8.333$ ✓",
  "difficulty": 3
 },
 {
  "id": "L03-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T4",
  "tag": "电表读数，★★★",
  "brief": "电压源 $\\dot U = 220\\angle0°$ V，三条并联支路：纯电阻支路读数 6 A、纯电感支路读数 8 A、",
  "stem": "电压源 $\\dot U = 220\\angle0°$ V，三条并联支路：纯电阻支路读数 6 A、纯电感支路读数 8 A、纯电容支路读数 8 A。\n求 **(1)** 总电流有效值；**(2)** 三条支路各自的电阻/电抗值。",
  "answerText": "**(1)** 三条支路电流相量：",
  "solution": "**(1)** 三条支路电流相量：\n\n$$\\dot I_R = 6\\angle0° = 6,\\qquad \\dot I_L = 8\\angle{-90°} = -j8,\\qquad \\dot I_C = 8\\angle{90°} = j8$$\n\n$$\\dot I = 6 - j8 + j8 = 6\\ \\text{A}\\quad\\Longrightarrow\\quad \\boxed{I = 6\\ \\text{A}}$$\n\n**电感与电容电流完全抵消，总电流等于电阻电流！**\n\n**(2)**\n$$R = \\frac{U}{I_R} = \\frac{220}{6} = \\frac{110}{3} \\approx 36.67\\ \\Omega$$\n$$X_L = \\frac{U}{I_L} = \\frac{220}{8} = 27.5\\ \\Omega \\quad\\Longrightarrow\\quad L = \\frac{X_L}{\\omega}$$\n$$X_C = \\frac{U}{I_C} = 27.5\\ \\Omega \\quad\\Longrightarrow\\quad C = \\frac{1}{\\omega X_C}$$\n\n> **★★★ 这题是\"过电流抵消\"的经典**：单个支路 8 A，总电流只有 6 A（比任一条支路的 8 A 还小！）。这就是**并联谐振**的雏形（第 05 课）。",
  "difficulty": 5
 },
 {
  "id": "L03-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T5",
  "tag": "电桥",
  "brief": "交流电桥：$Z_1 = 10\\ \\Omega$、$Z_2 = 5\\ \\Omega$、$Z_3 = (4+j8)\\ \\Om",
  "stem": "交流电桥：$Z_1 = 10\\ \\Omega$、$Z_2 = 5\\ \\Omega$、$Z_3 = (4+j8)\\ \\Omega$、$Z_4 = ?$。\n求 **(1)** 使电桥平衡的 $Z_4$；**(2)** 若 $\\omega = 2$ rad/s，求 $Z_4$ 对应的 R、L 值。",
  "answerText": "**(1)** 平衡条件 $Z_1Z_4 = Z_2Z_3$：",
  "solution": "**(1)** 平衡条件 $Z_1Z_4 = Z_2Z_3$：\n\n$$Z_4 = \\frac{Z_2Z_3}{Z_1} = \\frac{5\\times(4+j8)}{10} = \\frac{4+j8}{2} = 2 + j4\\ \\Omega$$\n\n**(2)** $R = 2\\ \\Omega$；$j\\omega L = j4$ → $\\omega L = 4$ → $L = 4/2 = 2$ H\n\n**答案：$Z_4 = 2+j4$ Ω，R = 2 Ω，L = 2 H。**",
  "difficulty": 3
 },
 {
  "id": "L03-T6",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C7"
  ],
  "source": "第03课练习 T6",
  "tag": "含受控源",
  "brief": "电路：节点 A 接电流源 $\\dot I_S = 6\\angle0°$ A（流入 A），A 点接 R₁ = 2 Ω 到地",
  "stem": "电路：节点 A 接电流源 $\\dot I_S = 6\\angle0°$ A（流入 A），A 点接 R₁ = 2 Ω 到地，A 点接一个**受控电流源**从 A 流向地、值为 $0.5\\dot V_A$。A 点经 R₂ = 4 Ω 接节点 B，B 点接 R₃ = 4 Ω 到地。\n求 **(1)** $\\dot V_A$、$\\dot V_B$；**(2)** 电源发出的复功率。\n\n---",
  "answerText": "**(1)** 节点方程。",
  "solution": "**(1)** 节点方程。\n\n**节点 A**：\n$$\\frac{\\dot V_A}{2} + 0.5\\dot V_A + \\frac{\\dot V_A - \\dot V_B}{4} = 6$$\n\n**节点 B**：\n$$\\frac{\\dot V_B}{4} + \\frac{\\dot V_B - \\dot V_A}{4} = 0$$\n\n由节点 B：$2\\dot V_B = \\dot V_A$ → $\\dot V_B = 0.5\\dot V_A$\n\n代入节点 A：\n\n$$0.5\\dot V_A + 0.5\\dot V_A + 0.25(\\dot V_A - 0.5\\dot V_A) = 6$$\n\n$$1.0\\dot V_A + 0.25\\times0.5\\dot V_A = 6 \\quad\\Longrightarrow\\quad \\dot V_A(1 + 0.125) = 6$$\n\n$$\\dot V_A = \\frac{6}{1.125} = \\frac{6}{9/8} = \\frac{48}{9} = \\frac{16}{3} \\approx 5.333\\ \\text{V}$$\n\n$$\\dot V_B = \\frac{8}{3} \\approx 2.667\\ \\text{V}$$\n\n**（纯电阻电路，所有电压同相。）**\n\n**(2) 电源发出的复功率**\n\n$$\\tilde S = \\dot U_S \\dot I_S^*$$\n\n电源电压即节点 A 对地电压 $\\dot V_A = \\frac{16}{3}$ V（电源接在 A 与地之间）：\n\n$$\\tilde S = \\frac{16}{3}\\times6 = 32\\ \\text{W}\\quad (\\text{纯实数，}Q = 0)$$\n\n**校验（用电阻耗能）**：\n\n- $R_1$：$\\dfrac{V_A^2}{2} = \\dfrac{(16/3)^2}{2} = \\dfrac{256/9}{2} = \\dfrac{128}{9} \\approx 14.222$ W\n- $R_2$：$\\dfrac{(V_A-V_B)^2}{4} = \\dfrac{(8/3)^2}{4} = \\dfrac{64/9}{4} = \\dfrac{16}{9} \\approx 1.778$ W\n- $R_3$：$\\dfrac{V_B^2}{4} = \\dfrac{(8/3)^2}{4} = \\dfrac{16}{9} \\approx 1.778$ W\n- 受控源：$0.5V_A \\times V_A = 0.5\\times(16/3)^2 = 0.5\\times\\dfrac{256}{9} = \\dfrac{128}{9} \\approx 14.222$ W\n\n总和：$\\dfrac{128+16+16+128}{9} = \\dfrac{288}{9} = 32$ W ✓\n\n**答案：$\\dot V_A = 16/3$ V，$\\dot V_B = 8/3$ V，电源发出 32 W（纯有功）。**\n\n---",
  "difficulty": 3
 },
 {
  "id": "L04-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T1",
  "tag": "串联反解",
  "brief": "两耦合线圈串联：顺串时 $L = 20$ H，反串时 $L = 8$ H。 求 **(1)** M；**(2)** $L",
  "stem": "两耦合线圈串联：顺串时 $L = 20$ H，反串时 $L = 8$ H。\n求 **(1)** M；**(2)** $L_1+L_2$；**(3)** 若 $L_1 = 4L_2$，求 $k$。",
  "answerText": "**(1)** $M = \\dfrac{L_{\text{顺}}-L_{\text{反}}}{4} = \\dfrac{20-8}{4} = \\boxed{3\\ \\text{H}}$",
  "solution": "**(1)** $M = \\dfrac{L_{\text{顺}}-L_{\text{反}}}{4} = \\dfrac{20-8}{4} = \\boxed{3\\ \\text{H}}$\n\n**(2)** $L_1+L_2 = \\dfrac{L_{\text{顺}}+L_{\text{反}}}{2} = \\dfrac{20+8}{2} = \\boxed{14\\ \\text{H}}$\n\n**(3)** $L_1 = 4L_2$，$L_1+L_2 = 14$ → $5L_2 = 14$ → $L_2 = 2.8$ H，$L_1 = 11.2$ H\n\n$$k = \\frac{M}{\\sqrt{L_1L_2}} = \\frac{3}{\\sqrt{11.2\\times2.8}} = \\frac{3}{\\sqrt{31.36}} = \\frac{3}{5.6} = \\frac{30}{56} = \\boxed{\\frac{15}{28} \\approx 0.536}$$\n\n**答案：M = 3 H，$L_1+L_2 = 14$ H，$k = 15/28 \\approx 0.536$。**\n\n> **技巧**：$11.2\\times2.8 = 31.36 = 5.6^2$。看到这种数先想\"是不是完全平方\"——**考研数据都是设计过的**。",
  "difficulty": 3
 },
 {
  "id": "L04-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T2",
  "tag": "判号",
  "brief": "$L_1 = 6$ H，$L_2 = 4$ H，$M = 2$ H。 线圈 1 的**上端**是 ●，线圈 2 的**上",
  "stem": "$L_1 = 6$ H，$L_2 = 4$ H，$M = 2$ H。\n线圈 1 的**上端**是 ●，线圈 2 的**上端**是 ●。\n串联接法：线圈 1 上端接电源正极，线圈 1 下端接线圈 2 下端，线圈 2 上端接电源负极。\n求 **(1)** 顺串还是反串；**(2)** $L_{eq}$。",
  "answerText": "**(1) 判断**",
  "solution": "**(1) 判断**\n\n串联路径：电源正极 → 线圈 1 上端（**●**）→ 线圈 1 下端 → 线圈 2 下端 → 线圈 2 上端（**●**）→ 电源负极。\n\n电流从线圈 1 的**上端流入**（进 ●）；顺着路径，电流从线圈 2 的**下端流入**、从**上端流出**——所以进入线圈 2 的是**下端（非 ●）**。\n\n**一进 ●、一进非 ● → 反串。**\n\n**(2)** $L_{eq} = L_1 + L_2 - 2M = 6 + 4 - 4 = \\boxed{6\\ \\text{H}}$\n\n**答案：反串，$L_{eq} = 6$ H。**",
  "difficulty": 3
 },
 {
  "id": "L04-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T3",
  "tag": "T 形去耦",
  "brief": "$L_1 = 8$ H，$L_2 = 6$ H，$M = 3$ H。 线圈 1 的**下端**是 ●，线圈 2 的**上",
  "stem": "$L_1 = 8$ H，$L_2 = 6$ H，$M = 3$ H。\n线圈 1 的**下端**是 ●，线圈 2 的**上端**是 ●，这两个端子连在一起（公共节点）。\n求 **(1)** T 形去耦的三个电感值与接法；**(2)** 若 $\\omega = 1$ rad/s，A 端（线圈1上端）到地之间接一个 10 Ω 电阻，B 端（线圈2下端）接地，求从 A 端看进去的输入阻抗。",
  "answerText": "**(1) 去耦**",
  "solution": "**(1) 去耦**\n\n公共节点连的是：线圈 1 的**下端（●）** 和线圈 2 的**上端（●）** → **都是同名端 → 用 A 式**。\n\n$$L_a = L_1 - M = 8 - 3 = 5\\ \\text{H（A 端到 P）}$$\n$$L_b = L_2 - M = 6 - 3 = 3\\ \\text{H（P 到 B 端）}$$\n$$L_c = M = 3\\ \\text{H（P 到参考点）}$$\n\n**校验**：$L_a+L_c = 5+3 = 8 = L_1$ ✓；$L_b+L_c = 3+3 = 6 = L_2$ ✓\n\n**(2) 输入阻抗**\n\n$\\omega = 1$：$Z_a = j5$，$Z_b = j3$，$Z_c = j3$（Ω）\n\nA 端 →(j5)→ P；P 分两路：→(j3)→ 参考点；→(j3)→ B →(10 Ω)→ 参考点。\n\n$Z_c = j3$ 与 $(Z_b + 10) = (10+j3)$ 并联：\n\n$$\\frac{j3(10+j3)}{j3+10+j3} = \\frac{j30+j^2 9}{10+j6} = \\frac{-9+j30}{10+j6} = \\frac{(-9+j30)(10-j6)}{100+36} = \\frac{-90+j54+j300-j^2 180}{136}$$\n\n$$= \\frac{-90+180+j354}{136} = \\frac{90+j354}{136} = \\frac{45+j177}{68}\\ \\Omega$$\n\n$$Z_{in} = j5 + \\frac{45+j177}{68} = \\frac{j340 + 45 + j177}{68} = \\frac{45+j517}{68}\\ \\Omega$$\n\n$$\\boxed{Z_{in} = \\frac{45+j517}{68} \\approx 0.662 + j7.603\\ \\Omega}$$",
  "difficulty": 3
 },
 {
  "id": "L04-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T4",
  "tag": "理想变压器",
  "brief": "理想变压器 $N_1 = 500$，$N_2 = 50$，副边接 $R_L = 8\\ \\Omega$。 原边接 $\\do",
  "stem": "理想变压器 $N_1 = 500$，$N_2 = 50$，副边接 $R_L = 8\\ \\Omega$。\n原边接 $\\dot U_S = 100\\angle0°$ V，原边内阻 $R_S = 2\\ \\Omega$。\n求 **(1)** $Z_{in}$；**(2)** $\\dot I_1$、$\\dot I_2$、$\\dot U_2$；**(3)** 负载功率 $P_L$。",
  "answerText": "**(1)** $n = \\dfrac{500}{50} = 10$",
  "solution": "**(1)** $n = \\dfrac{500}{50} = 10$\n\n$$Z_{in} = n^2R_L = 100\\times8 = \\boxed{800\\ \\Omega}$$\n\n**(2)** 总阻抗 $= 2 + 800 = 802\\ \\Omega$\n\n$$\\dot I_1 = \\frac{100}{802} = \\frac{50}{401} \\approx 0.1247\\ \\text{A}$$\n\n$$\\dot U_1 = Z_{in}\\dot I_1 = 800\\times\\frac{50}{401} = \\frac{40000}{401} \\approx 99.75\\ \\text{V}$$\n\n$$\\dot U_2 = \\frac{\\dot U_1}{10} = \\frac{4000}{401} \\approx 9.975\\ \\text{V}$$\n\n$$\\dot I_2 = 10\\dot I_1 = \\frac{500}{401} \\approx 1.247\\ \\text{A}$$\n\n**校验**：$U_2/I_2 = (4000/401)/(500/401) = 8$ Ω = $R_L$ ✓\n\n**(3)** $P_L = I_2^2R_L = \\left(\\dfrac{500}{401}\\right)^2\\times8 = \\dfrac{250000}{160801}\\times8 = \\dfrac{2000000}{160801} \\approx 12.44\\ \\text{W}$\n\n**或**：$P_L = I_1^2Z_{in} = \\left(\\dfrac{50}{401}\\right)^2\\times800 = \\dfrac{2500\\times800}{160801} = \\dfrac{2000000}{160801} \\approx 12.44$ W ✓\n\n**答案：$Z_{in} = 800$ Ω；$\\dot I_1 \\approx 0.1247$ A，$\\dot I_2 \\approx 1.247$ A，$\\dot U_2 \\approx 9.975$ V；$P_L \\approx 12.44$ W。**",
  "difficulty": 3
 },
 {
  "id": "L04-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T5",
  "tag": "阻抗折算性质",
  "brief": "理想变压器 $n = N_1/N_2 = 5$。 副边接 $Z_L = 4 - j3\\ \\Omega$。 求 **(1)",
  "stem": "理想变压器 $n = N_1/N_2 = 5$。\n副边接 $Z_L = 4 - j3\\ \\Omega$。\n求 **(1)** 折算到原边的 $Z_{in}$；**(2)** 若原边接 $u_S(t) = 50\\sqrt2\\cos(\\omega t)$ V（内阻为 0），求原边电流相量与副边电流有效值。",
  "answerText": "**(1)** $Z_{in} = n^2Z_L = 25(4-j3) = 100 - j75\\ \\Omega$",
  "solution": "**(1)** $Z_{in} = n^2Z_L = 25(4-j3) = 100 - j75\\ \\Omega$\n\n**性质不变**：副边是容性（−j3），折算后仍是容性（−j75），只是**大小放大 25 倍**。\n\n**(2)** 内阻为 0 → 原边电压 = 电源电压\n\n$$\\dot I_1 = \\frac{\\dot U_S}{Z_{in}} = \\frac{50\\angle0°}{100-j75} = \\frac{50(100+j75)}{10000+5625} = \\frac{50(100+j75)}{15625} = \\frac{5000+j3750}{15625}$$\n\n$$= 0.32 + j0.24\\ \\text{A}$$\n\n模：$|\\dot I_1| = \\sqrt{0.32^2+0.24^2} = \\sqrt{0.1024+0.0576} = \\sqrt{0.16} = 0.4\\ \\text{A}$\n\n$$I_2 = nI_1 = 5\\times0.4 = \\boxed{2\\ \\text{A}}$$\n\n**答案：$Z_{in} = 100-j75$ Ω；$\\dot I_1 = 0.32+j0.24$ A（有效值 0.4 A）；$I_2 = 2$ A。**\n\n> **★ 观察**：$Z_{in} = 100-j75$，$|Z_{in}| = \\sqrt{10000+5625} = \\sqrt{15625} = 125$ Ω。\n> $I_1 = 50/125 = 0.4$ A ✓ —— **用模算有效值一步到位，比算复数再取模更快**。",
  "difficulty": 3
 },
 {
  "id": "L04-T6",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C10"
  ],
  "source": "第04课练习 T6",
  "tag": "反射阻抗",
  "brief": "$L_1 = 2$ H，$L_2 = 0.5$ H，$M = 0.5$ H，$\\omega = 4$ rad/s。 副边",
  "stem": "$L_1 = 2$ H，$L_2 = 0.5$ H，$M = 0.5$ H，$\\omega = 4$ rad/s。\n副边接 $Z_L = 1\\ \\Omega$。原边内阻为 0。\n求 **(1)** $Z_{22}$；**(2)** $Z_{ref}$；**(3)** $Z_{in}$。\n\n---",
  "answerText": "**(1)** $Z_{22} = j\\omega L_2 + Z_L = j(4\\times0.5) + 1 = 1 + j2\\ \\Omega$",
  "solution": "**(1)** $Z_{22} = j\\omega L_2 + Z_L = j(4\\times0.5) + 1 = 1 + j2\\ \\Omega$\n\n**(2)** $\\omega M = 4\\times0.5 = 2$，$(\\omega M)^2 = 4$\n\n$$Z_{ref} = \\frac{4}{1+j2} = \\frac{4(1-j2)}{1+4} = \\frac{4-j8}{5} = 0.8 - j1.6\\ \\Omega$$\n\n**(3)** $Z_{in} = j\\omega L_1 + Z_{ref} = j(4\\times2) + (0.8-j1.6) = j8 + 0.8 - j1.6 = 0.8 + j6.4\\ \\Omega$\n\n**答案：$Z_{22} = 1+j2$ Ω；$Z_{ref} = 0.8-j1.6$ Ω；$Z_{in} = 0.8+j6.4$ Ω。**\n\n> **★ 再次印证**：副边是**纯电阻 1 Ω**，反射到原边却产生了**容抗 −j1.6**。\n> **反射阻抗的实部 = 0.8 > 0**（消耗功率，符合能量守恒）✓\n\n---",
  "difficulty": 3
 },
 {
  "id": "L05-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T1",
  "tag": "串联谐振全套参数",
  "brief": "R = 5 Ω，L = 2 mH，C = 0.05 μF 串联。 求 **(1)** $\\omega_0$、$f_0$；",
  "stem": "R = 5 Ω，L = 2 mH，C = 0.05 μF 串联。\n求 **(1)** $\\omega_0$、$f_0$；**(2)** ρ；**(3)** Q；**(4)** $\\Delta f$；**(5)** 若 $U_S = 5$ V 且谐振，求 $U_L$、$U_C$、$I_0$。",
  "answerText": "**(1)** $LC = 2\\times10^{-3}\\times0.05\\times10^{-6} = 1\\times10^{-10}$",
  "solution": "**(1)** $LC = 2\\times10^{-3}\\times0.05\\times10^{-6} = 1\\times10^{-10}$\n\n$$\\omega_0 = \\frac{1}{\\sqrt{10^{-10}}} = \\frac{1}{10^{-5}} = 10^5\\ \\text{rad/s}$$\n\n$$f_0 = \\frac{10^5}{2\\pi} \\approx 15915\\ \\text{Hz} \\approx 15.9\\ \\text{kHz}$$\n\n**(2)** $\\rho = \\sqrt{\\dfrac{L}{C}} = \\sqrt{\\dfrac{2\\times10^{-3}}{0.05\\times10^{-6}}} = \\sqrt{4\\times10^4} = 200\\ \\Omega$\n\n**(3)** $Q = \\dfrac{\\rho}{R} = \\dfrac{200}{5} = \\boxed{40}$\n\n**校验**：$Q = \\omega_0L/R = 10^5\\times2\\times10^{-3}/5 = 200/5 = 40$ ✓\n\n**(4)** $\\Delta f = \\dfrac{f_0}{Q} = \\dfrac{15915}{40} \\approx 398\\ \\text{Hz}$\n\n**（rad/s：$BW = 10^5/40 = 2500$ rad/s）**\n\n**(5)** $I_0 = U_S/R = 5/5 = 1$ A\n\n$$U_L = U_C = QU_S = 40\\times5 = \\boxed{200\\ \\text{V}}$$",
  "difficulty": 3
 },
 {
  "id": "L05-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T2",
  "tag": "过电压反推",
  "brief": "RLC 串联谐振电路，$U_S = 30$ V，测得电容电压 $U_C = 600$ V。 求 **(1)** Q；**",
  "stem": "RLC 串联谐振电路，$U_S = 30$ V，测得电容电压 $U_C = 600$ V。\n求 **(1)** Q；**(2)** $U_L$；**(3)** 若 R = 6 Ω，求 ρ；**(4)** 若 $\\omega_0 = 10^5$ rad/s，求 L 与 C。",
  "answerText": "**(1)** $Q = \\dfrac{U_C}{U_S} = \\dfrac{600}{30} = \\boxed{20}$",
  "solution": "**(1)** $Q = \\dfrac{U_C}{U_S} = \\dfrac{600}{30} = \\boxed{20}$\n\n**(2)** $U_L = U_C = \\boxed{600\\ \\text{V}}$\n\n**(3)** $\\rho = QR = 20\\times6 = \\boxed{120\\ \\Omega}$\n\n**(4)** 由 $Q = \\dfrac{\\omega_0L}{R}$：$\\omega_0L = QR = 120$\n\n$$L = \\frac{120}{10^5} = 1.2\\times10^{-3}\\ \\text{H} = \\boxed{1.2\\ \\text{mH}}$$\n\n由 $\\rho = \\sqrt{L/C}$ → $C = \\dfrac{L}{\\rho^2} = \\dfrac{1.2\\times10^{-3}}{120^2} = \\dfrac{1.2\\times10^{-3}}{14400} = 8.33\\times10^{-8}$ F\n\n$$\\boxed{C \\approx 83.3\\ \\text{nF}}$$\n\n**校验**：$\\omega_0 = 1/\\sqrt{LC} = 1/\\sqrt{1.2\\times10^{-3}\\times8.333\\times10^{-8}} = 1/\\sqrt{10^{-10}} = 10^5$ ✓",
  "difficulty": 3
 },
 {
  "id": "L05-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T3",
  "tag": "并联谐振",
  "brief": "理想 RLC 并联，R = 500 Ω，L = 0.2 H，C = 20 μF，接 $I_S = 0.4$ A 电流源。",
  "stem": "理想 RLC 并联，R = 500 Ω，L = 0.2 H，C = 20 μF，接 $I_S = 0.4$ A 电流源。\n求 **(1)** $\\omega_0$；**(2)** ρ；**(3)** Q；**(4)** $I_L$、$I_C$；**(5)** 端电压 U；**(6)** 该电路消耗的有功功率。",
  "answerText": "**(1)** $LC = 0.2\\times20\\times10^{-6} = 4\\times10^{-6}$",
  "solution": "**(1)** $LC = 0.2\\times20\\times10^{-6} = 4\\times10^{-6}$\n\n$$\\omega_0 = \\frac{1}{\\sqrt{4\\times10^{-6}}} = \\frac{1}{2\\times10^{-3}} = \\boxed{500\\ \\text{rad/s}}$$\n\n**(2)** $\\rho = \\sqrt{\\dfrac{L}{C}} = \\sqrt{\\dfrac{0.2}{20\\times10^{-6}}} = \\sqrt{10^4} = \\boxed{100\\ \\Omega}$\n\n**(3)** $Q = \\dfrac{R}{\\rho} = \\dfrac{500}{100} = \\boxed{5}$\n\n**校验**：$Q = R/(\\omega_0L) = 500/(500\\times0.2) = 500/100 = 5$ ✓\n\n**(4)** $I_L = I_C = QI_S = 5\\times0.4 = \\boxed{2\\ \\text{A}}$\n\n**(5)** 谐振时 $Z = R = 500\\ \\Omega$\n\n$$U = I_SR = 0.4\\times500 = \\boxed{200\\ \\text{V}}$$\n\n**校验**：$I_L = U/(\\omega_0L) = 200/(500\\times0.2) = 200/100 = 2$ A ✓\n\n**(6)** $P = I_S^2R = 0.4^2\\times500 = 0.16\\times500 = \\boxed{80\\ \\text{W}}$\n\n**或**：$P = UI_S = 200\\times0.4 = 80$ W ✓",
  "difficulty": 3
 },
 {
  "id": "L05-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T4",
  "tag": "由 Q 求参数",
  "brief": "串联谐振电路，R = 25 Ω，$\\omega_0 = 5000$ rad/s，Q = 40。 求 **(1)** L、",
  "stem": "串联谐振电路，R = 25 Ω，$\\omega_0 = 5000$ rad/s，Q = 40。\n求 **(1)** L、C；**(2)** ρ；**(3)** 通频带（rad/s 与 Hz 两种）；**(4)** 上下限频率（近似值）。",
  "answerText": "**(1)** 由 $Q = \\omega_0L/R$：",
  "solution": "**(1)** 由 $Q = \\omega_0L/R$：\n\n$$\\omega_0L = QR = 40\\times25 = 1000 \\quad\\Longrightarrow\\quad L = \\frac{1000}{5000} = \\boxed{0.2\\ \\text{H}}$$\n\n$$LC = \\frac{1}{\\omega_0^2} = \\frac{1}{25\\times10^6} = 4\\times10^{-8}$$\n\n$$C = \\frac{4\\times10^{-8}}{0.2} = 2\\times10^{-7}\\ \\text{F} = \\boxed{0.2\\ \\mu\\text{F}}$$\n\n**(2)** $\\rho = \\sqrt{\\dfrac{L}{C}} = \\sqrt{\\dfrac{0.2}{2\\times10^{-7}}} = \\sqrt{10^6} = \\boxed{1000\\ \\Omega}$\n\n**校验**：$Q = \\rho/R = 1000/25 = 40$ ✓\n\n**(3)** $BW = \\dfrac{\\omega_0}{Q} = \\dfrac{5000}{40} = \\boxed{125\\ \\text{rad/s}}$\n\n$$f_0 = \\frac{5000}{2\\pi} \\approx 795.8\\ \\text{Hz},\\qquad \\Delta f = \\frac{795.8}{40} \\approx \\boxed{19.9\\ \\text{Hz}}$$\n\n**(4)** $\\omega_1 \\approx 5000 - 62.5 = \\boxed{4937.5\\ \\text{rad/s}}$，$\\omega_2 \\approx 5000+62.5 = \\boxed{5062.5\\ \\text{rad/s}}$\n\n**校验（几何对称）**：$\\omega_1\\omega_2 = 4937.5\\times5062.5 = 2.4996\\times10^7 \\approx 2.5\\times10^7 = \\omega_0^2$ ✓",
  "difficulty": 3
 },
 {
  "id": "L05-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T5",
  "tag": "判断与证明，★★ 概念题",
  "brief": "某串联电路在 $\\omega = 1000$ rad/s 时，$X_L = 40\\ \\Omega$，$X_C = 40\\",
  "stem": "某串联电路在 $\\omega = 1000$ rad/s 时，$X_L = 40\\ \\Omega$，$X_C = 40\\ \\Omega$，R = 2 Ω。接 $U_S = 2$ V 电压源。\n**(1)** 电路是否谐振？**(2)** 求 Q、$I_0$、$U_R$、$U_L$、$U_C$；**(3)** 有人算得\"总电压 = $U_R+U_L+U_C = 2+40+40 = 82$ V\"，错在哪？**(4)** 用相量验证总电压确实等于 2 V。",
  "answerText": "**(1)** $X_L = X_C = 40\\ \\Omega$ → **虚部抵消 → 是谐振状态。**",
  "solution": "**(1)** $X_L = X_C = 40\\ \\Omega$ → **虚部抵消 → 是谐振状态。**\n\n**(2)** $\\rho = X_L = 40\\ \\Omega$（谐振时 $\\rho = \\omega_0L = X_L$）\n\n$$Q = \\frac{\\rho}{R} = \\frac{40}{2} = \\boxed{20}$$\n\n$$I_0 = \\frac{U_S}{R} = \\frac{2}{2} = \\boxed{1\\ \\text{A}}$$\n\n$$U_R = I_0R = 1\\times2 = \\boxed{2\\ \\text{V}}\\ (=\\ U_S\\ ✓)$$\n\n$$U_L = U_C = X_LI_0 = 40\\times1 = \\boxed{40\\ \\text{V}}$$\n\n**校验**：$U_L = QU_S = 20\\times2 = 40$ V ✓\n\n**(3) 错在哪**\n\n错在**把相量当成了标量直接相加**。\n\n$\\dot U_L$ 与 $\\dot U_C$ **大小相等、相位差 180°（正好相反）**，两者**完全抵消**，所以\n\n$$\\dot U_S = \\dot U_R = 2\\angle0°\\ \\text{V} \\quad\\Longrightarrow\\quad U_S = 2\\ \\text{V}$$\n\n**而不是 82 V。**\n\n**(4) 相量验证**\n\n$$\\dot U_R = 2\\angle0° = 2,\\qquad \\dot U_L = 40\\angle90° = j40,\\qquad \\dot U_C = 40\\angle{-90°} = -j40$$\n\n$$\\dot U_R + \\dot U_L + \\dot U_C = 2 + j40 - j40 = 2\\angle0°\\ \\text{V}\\ ✓$$\n\n> **★★ 这就是\"谐振时元件电压远大于电源电压\"的根源**：\n> 电源 2 V，元件上各 40 V（**放大 20 倍**），但两者互相抵消，总电压仍是 2 V。\n>\n> **做题铁律**：**谐振（及任何正弦稳态）电路验证 KVL 时，必须写成相量求和，绝不能加模。**",
  "difficulty": 5
 },
 {
  "id": "L05-T6",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C9"
  ],
  "source": "第05课练习 T6",
  "tag": "综合",
  "brief": "串联电路 R = 8 Ω，L = 0.4 H，C 可变。接 $u_S(t) = 40\\sqrt2\\cos(1000t)$",
  "stem": "串联电路 R = 8 Ω，L = 0.4 H，C 可变。接 $u_S(t) = 40\\sqrt2\\cos(1000t)$ V。\n求 **(1)** 使电路谐振的 C 值；**(2)** 谐振时的电流有效值与各元件电压有效值；**(3)** 若把 C 调为谐振值的 2 倍，电路的阻抗模与电流有效值。\n\n---",
  "answerText": "**(1)** 谐振条件 $\\omega_0 L = \\dfrac{1}{\\omega_0 C}$，$\\omega = 1000$ rad/s：",
  "solution": "**(1)** 谐振条件 $\\omega_0 L = \\dfrac{1}{\\omega_0 C}$，$\\omega = 1000$ rad/s：\n\n$$\\omega L = 1000\\times0.4 = 400\\ \\Omega \\quad\\Longrightarrow\\quad \\frac{1}{\\omega C} = 400 \\quad\\Longrightarrow\\quad C = \\frac{1}{1000\\times400} = 2.5\\times10^{-6}\\ \\text{F} = \\boxed{2.5\\ \\mu\\text{F}}$$\n\n**(2)** $I_0 = \\dfrac{U_S}{R} = \\dfrac{40}{8} = 5\\ \\text{A}$\n\n$$U_R = 5\\times8 = 40\\ \\text{V}\\ (= U_S\\ ✓)$$\n\n$$U_L = U_C = \\omega L\\times I_0 = 400\\times5 = \\boxed{2000\\ \\text{V}}$$\n\n**（Q = 2000/40 = 50，放大 50 倍！）**\n\n**(3) C 调为谐振值的 2 倍**：$C' = 5\\ \\mu\\text{F}$\n\n$$X_C' = \\frac{1}{\\omega C'} = \\frac{1}{1000\\times5\\times10^{-6}} = \\frac{1}{5\\times10^{-3}} = 200\\ \\Omega$$\n\n$$Z = R + j(\\omega L - X_C') = 8 + j(400-200) = 8 + j200\\ \\Omega$$\n\n$$|Z| = \\sqrt{8^2+200^2} = \\sqrt{64+40000} = \\sqrt{40064} \\approx 200.16\\ \\Omega$$\n\n$$I = \\frac{40}{200.16} \\approx \\boxed{0.1998\\ \\text{A} \\approx 0.2\\ \\text{A}}$$\n\n**（电流从 5 A 掉到 0.2 A —— 说明电路**离谐振很远时电流急剧下降**，这正是谐振曲线尖锐的原因。）**\n\n---",
  "difficulty": 3
 },
 {
  "id": "L06-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T1",
  "tag": "四种功率",
  "brief": "一端口网络：$\\dot U = 200\\angle0°$ V，$\\dot I = 10\\angle{-36.87°}$ ",
  "stem": "一端口网络：$\\dot U = 200\\angle0°$ V，$\\dot I = 10\\angle{-36.87°}$ A。\n求 **(1)** P、Q、S；**(2)** 功率因数；**(3)** 等效阻抗（写成 R+jX 形式）；**(4)** 判断性质。",
  "answerText": "**(1)** $\\tilde S = \\dot U\\dot I^* = 200\\angle0°\\times10\\angle{36.87°} = 2000\\angle{36.87°}$ V·A",
  "solution": "**(1)** $\\tilde S = \\dot U\\dot I^* = 200\\angle0°\\times10\\angle{36.87°} = 2000\\angle{36.87°}$ V·A\n\n$\\cos36.87° = 0.8$，$\\sin36.87° = 0.6$\n\n$$P = 2000\\times0.8 = \\boxed{1600\\ \\text{W}}$$\n$$Q = 2000\\times0.6 = \\boxed{1200\\ \\text{var}}$$\n$$S = \\boxed{2000\\ \\text{V·A}}$$\n\n**(2)** $\\lambda = \\cos\\varphi = 0.8$（**滞后**，因为电流滞后电压）\n\n**(3)** $Z = \\dfrac{\\dot U}{\\dot I} = \\dfrac{200\\angle0°}{10\\angle{-36.87°}} = 20\\angle{36.87°} = 20(0.8+j0.6) = 16+j12\\ \\Omega$\n\n**(4)** 虚部为正 → **感性**。\n\n**校验**：$P = I^2R = 100\\times16 = 1600$ W ✓；$Q = I^2X = 100\\times12 = 1200$ var ✓",
  "difficulty": 3
 },
 {
  "id": "L06-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T2",
  "tag": "功率因数补偿，★★★",
  "brief": "感性负载接 220 V、50 Hz 电源，消耗 P = 8 kW，$\\cos\\varphi_1 = 0.6$（滞后）。 ",
  "stem": "感性负载接 220 V、50 Hz 电源，消耗 P = 8 kW，$\\cos\\varphi_1 = 0.6$（滞后）。\n要把功率因数提高到 (a) 0.8；(b) 1.0。求各需并联的电容值。\n并计算两种情况下的总电流。",
  "answerText": "**① 补偿前**",
  "solution": "**① 补偿前**\n\n$\\cos\\varphi_1 = 0.6$ → $\\tan\\varphi_1 = 4/3$\n\n$$Q_1 = P\\tan\\varphi_1 = 8\\times\\frac43 = 10.667\\ \\text{kvar}$$\n\n**(a) 补到 0.8**\n\n$\\cos\\varphi_2 = 0.8$ → $\\tan\\varphi_2 = 0.75$\n\n$$Q_2 = 8\\times0.75 = 6\\ \\text{kvar}$$\n\n$$Q_C = 10.667 - 6 = 4.667\\ \\text{kvar}$$\n\n$$\\omega = 100\\pi \\approx 314.16\\ \\text{rad/s},\\qquad U^2 = 220^2 = 48400$$\n\n$$C = \\frac{Q_C}{\\omega U^2} = \\frac{4667}{314.16\\times48400} = \\frac{4667}{1.5205\\times10^7} \\approx 3.069\\times10^{-4}\\ \\text{F} \\approx \\boxed{307\\ \\mu\\text{F}}$$\n\n**(b) 补到 1.0**\n\n$\\tan\\varphi_2 = 0$\n\n$$Q_C = 10.667 - 0 = 10.667\\ \\text{kvar}$$\n\n$$C = \\frac{10667}{1.5205\\times10^7} \\approx 7.016\\times10^{-4}\\ \\text{F} \\approx \\boxed{702\\ \\mu\\text{F}}$$\n\n**总电流**\n\n- 补偿前：$I_1 = \\dfrac{P}{U\\cos\\varphi_1} = \\dfrac{8000}{220\\times0.6} = \\dfrac{8000}{132} \\approx 60.6\\ \\text{A}$\n- 补到 0.8：$I_2 = \\dfrac{8000}{220\\times0.8} = \\dfrac{8000}{176} \\approx 45.5\\ \\text{A}$\n- 补到 1.0：$I_3 = \\dfrac{8000}{220\\times1.0} = \\dfrac{8000}{220} \\approx 36.4\\ \\text{A}$\n\n**答案：(a) C ≈ 307 μF，总电流 45.5 A；(b) C ≈ 702 μF，总电流 36.4 A。**\n**（补偿前总电流 60.6 A。）**\n\n> **★ 观察**：补到 0.8 后电流降了 25%；补到 1.0 后降了 40%。**补到 1.0 的电容是补到 0.8 的 2.3 倍，但电流只再降 15%** —— 这就是\"最后那点功率因数最贵\"。",
  "difficulty": 5
 },
 {
  "id": "L06-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T3",
  "tag": "并联功率",
  "brief": "电压源 $\\dot U = 100\\angle0°$ V 接三条并联支路： - 支路一：R = 10 Ω - 支路二：$",
  "stem": "电压源 $\\dot U = 100\\angle0°$ V 接三条并联支路：\n- 支路一：R = 10 Ω\n- 支路二：$X_L = 10\\ \\Omega$（纯电感）\n- 支路三：$X_C = 10\\ \\Omega$（纯电容）\n求 **(1)** 各支路电流；**(2)** 总电流；**(3)** 总有功功率 P；**(4)** 总无功功率 Q；**(5)** 整个电路的功率因数。",
  "answerText": "**(1) 各支路电流**",
  "solution": "**(1) 各支路电流**\n\n$$\\dot I_R = \\frac{100\\angle0°}{10} = 10\\angle0° = 10\\ \\text{A}$$\n\n$$\\dot I_L = \\frac{100\\angle0°}{j10} = \\frac{100}{j10} = -j10\\ \\text{A}$$\n\n$$\\dot I_C = \\frac{100\\angle0°}{-j10} = \\frac{100}{-j10} = j10\\ \\text{A}$$\n\n**(2) 总电流**\n\n$$\\dot I = 10 - j10 + j10 = \\boxed{10\\angle0°\\ \\text{A}}\\quad (I = 10\\ \\text{A})$$\n\n**★ 电感的 −j10 与电容的 +j10 完全抵消！**\n\n**(3) 总有功功率**\n\n只有电阻消耗有功：\n\n$$P = I_R^2R = 10^2\\times10 = \\boxed{1000\\ \\text{W}}$$\n\n**或**：$P = UI\\cos\\varphi = 100\\times10\\times\\cos0° = 1000$ W ✓\n\n**(4) 总无功功率**\n\n$$Q = Q_L + Q_C = I_L^2X_L + (-I_C^2X_C) = 10^2\\times10 - 10^2\\times10 = 0\\ \\text{var}$$\n\n$$\\boxed{Q = 0\\ \\text{var}}$$\n\n**(5) 功率因数**\n\n$$\\lambda = \\cos0° = \\boxed{1}$$\n\n**这是并联谐振状态**（$\\omega L$ 与 $1/(\\omega C)$ 使两条支路电流大小相等、相位相反）。\n\n**答案：$\\dot I_R = 10$ A，$\\dot I_L = -j10$ A，$\\dot I_C = j10$ A；$\\dot I = 10$ A；P = 1000 W；Q = 0；λ = 1。**\n\n> **★★ 本题的漂亮之处**：单条支路电流有效值是 10 A，**总电流也是 10 A**（L 与 C 的电流在内部循环，不流回电源）。\n>\n> **这正是第 05 课\"并联谐振过电流\"的功率视角解释。**",
  "difficulty": 3
 },
 {
  "id": "L06-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T4",
  "tag": "最大功率传输",
  "brief": "含源一端口网络，戴维南等效 $Z_{eq} = 6 - j8\\ \\Omega$（**容性**），开路电压 $U_{oc}",
  "stem": "含源一端口网络，戴维南等效 $Z_{eq} = 6 - j8\\ \\Omega$（**容性**），开路电压 $U_{oc} = 20$ V。\n求 **(1)** 最佳负载 $Z_L$；**(2)** $P_{max}$；**(3)** 若负载只能是纯电阻，$R_L$ 取何值？最大功率多少？",
  "answerText": "**(1) 最佳负载**",
  "solution": "**(1) 最佳负载**\n\n$$Z_L = Z_{eq}^* = 6 + j8\\ \\Omega$$\n\n**（电源内阻抗是容性 6−j8，所以负载要取**感性** 6+j8。）**\n\n**(2) 最大功率**\n\n$$R_{eq} = 6\\ \\Omega$$\n\n$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{20^2}{4\\times6} = \\frac{400}{24} = \\boxed{\\frac{50}{3} \\approx 16.67\\ \\text{W}}$$\n\n**校验**：总阻抗 $= (6-j8)+(6+j8) = 12\\ \\Omega$（纯电阻）\n\n$$I = \\frac{20}{12} = \\frac53\\ \\text{A},\\qquad P_L = I^2\\times6 = \\frac{25}{9}\\times6 = \\frac{50}{3} \\approx 16.67\\ \\text{W}\\ ✓$$\n\n**(3) 纯电阻负载**\n\n$$R_L = |Z_{eq}| = \\sqrt{36+64} = \\sqrt{100} = \\boxed{10\\ \\Omega}$$\n\n总阻抗 $= (6-j8)+10 = 16-j8$，$|Z| = \\sqrt{256+64} = \\sqrt{320} = 8\\sqrt5 \\approx 17.889$ Ω\n\n$$I = \\frac{20}{8\\sqrt5} = \\frac{2.5}{\\sqrt5} \\approx 1.118\\ \\text{A}$$\n\n$$P = I^2R_L = \\frac{6.25}{5}\\times10 = 1.25\\times10 = \\boxed{12.5\\ \\text{W}}$$\n\n**用公式校验**：$P_{max} = \\dfrac{U_{oc}^2}{2(|Z_{eq}|+R_{eq})} = \\dfrac{400}{2(10+6)} = \\dfrac{400}{32} = 12.5$ W ✓\n\n**答案：$Z_L = 6+j8$ Ω，$P_{max} = 50/3 \\approx 16.67$ W；$R_L = 10$ Ω，$P_{max} = 12.5$ W。**",
  "difficulty": 3
 },
 {
  "id": "L06-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T5",
  "tag": "非正弦基础",
  "brief": "电压 $u(t) = 20 + 30\\cos(\\omega t) + 10\\cos(3\\omega t)$ V 加在 R",
  "stem": "电压 $u(t) = 20 + 30\\cos(\\omega t) + 10\\cos(3\\omega t)$ V 加在 R = 5 Ω 与 L 串联（$\\omega L = 5\\ \\Omega$）上。\n求 **(1)** 电流瞬时值表达式；**(2)** 电流有效值；**(3)** 平均功率。",
  "answerText": "**(1) 分频率求解**",
  "solution": "**(1) 分频率求解**\n\n**① 直流（k=0）**：电感短路\n\n$$I_0 = \\frac{U_0}{R} = \\frac{20}{5} = 4\\ \\text{A}$$\n\n**② 基波（$\\omega L = 5\\ \\Omega$）**\n\n$$Z_1 = 5+j5\\ \\Omega,\\qquad |Z_1| = 5\\sqrt2 \\approx 7.071\\ \\Omega,\\qquad \\varphi_1 = 45°$$\n\n电流基波**幅值**：$I_{1m} = \\dfrac{30}{5\\sqrt2} = \\dfrac{6}{\\sqrt2} = 3\\sqrt2 \\approx 4.243$ A\n\n**③ 三次谐波（$3\\omega L = 15\\ \\Omega$）**\n\n$$Z_3 = 5+j15\\ \\Omega,\\qquad |Z_3| = \\sqrt{25+225} = \\sqrt{250} = 5\\sqrt{10} \\approx 15.811\\ \\Omega$$\n\n$$\\varphi_3 = \\arctan\\frac{15}{5} = \\arctan3 = 71.565°$$\n\n电流三次谐波**幅值**：$I_{3m} = \\dfrac{10}{5\\sqrt{10}} = \\dfrac{2}{\\sqrt{10}} \\approx 0.632$ A\n\n**④ 时域表达式**\n\n$$\\boxed{i(t) = 4 + 3\\sqrt2\\cos(\\omega t - 45°) + \\frac{2}{\\sqrt{10}}\\cos(3\\omega t - 71.57°)\\ \\text{A}}$$\n\n**(2) 电流有效值**\n\n$$I_0 = 4,\\qquad I_1 = \\frac{3\\sqrt2}{\\sqrt2} = 3,\\qquad I_3 = \\frac{2/\\sqrt{10}}{\\sqrt2} = \\frac{2}{\\sqrt{20}} = \\frac{1}{\\sqrt5} \\approx 0.4472$$\n\n$$I = \\sqrt{16 + 9 + 0.2} = \\sqrt{25.2} \\approx \\boxed{5.02\\ \\text{A}}$$\n\n**(3) 平均功率**\n\n$$P = I^2R = 25.2\\times5 = \\boxed{126\\ \\text{W}}$$\n\n**（校验：$P = I_0^2R + I_1^2R + I_3^2R = 5(16+9+0.2) = 5\\times25.2 = 126$ W ✓）**\n\n**答案：$i(t) = 4 + 3\\sqrt2\\cos(\\omega t-45°) + \\frac{2}{\\sqrt{10}}\\cos(3\\omega t-71.57°)$ A；I ≈ 5.02 A；P = 126 W。**",
  "difficulty": 3
 },
 {
  "id": "L06-T6",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C8",
   "C14"
  ],
  "source": "第06课练习 T6",
  "tag": "非正弦 + 有效值",
  "brief": "$u(t) = 60 + 80\\sqrt2\\cos(\\omega t) + 40\\sqrt2\\cos(3\\omega t",
  "stem": "$u(t) = 60 + 80\\sqrt2\\cos(\\omega t) + 40\\sqrt2\\cos(3\\omega t)$ V\n$i(t) = 2 + 5\\sqrt2\\cos(\\omega t - 30°) + 2\\sqrt2\\cos(3\\omega t - 60°)$ A（关联参考方向）\n求 **(1)** 电压有效值 U；**(2)** 电流有效值 I；**(3)** 平均功率 P；**(4)** 视在功率 S 与功率因数 λ。\n\n---",
  "answerText": "**(1) 电压有效值**",
  "solution": "**(1) 电压有效值**\n\n各项有效值：\n- 直流：$U_0 = 60$ V\n- 基波：$U_1 = 80$ V（因为幅值是 $80\\sqrt2$）\n- 三次：$U_3 = 40$ V（因为幅值是 $40\\sqrt2$）\n\n$$U = \\sqrt{60^2+80^2+40^2} = \\sqrt{3600+6400+1600} = \\sqrt{11600} = 20\\sqrt{29} \\approx \\boxed{107.70\\ \\text{V}}$$\n\n**(2) 电流有效值**\n\n- 直流：$I_0 = 2$ A\n- 基波：$I_1 = 5$ A\n- 三次：$I_3 = 2$ A\n\n$$I = \\sqrt{2^2+5^2+2^2} = \\sqrt{4+25+4} = \\sqrt{33} \\approx \\boxed{5.745\\ \\text{A}}$$\n\n**(3) 平均功率**\n\n$$P = U_0I_0 + U_1I_1\\cos\\varphi_1 + U_3I_3\\cos\\varphi_3$$\n\n$$= 60\\times2 + 80\\times5\\times\\cos30° + 40\\times2\\times\\cos60°$$\n\n$$= 120 + 400\\times\\frac{\\sqrt3}{2} + 80\\times0.5$$\n\n$$= 120 + 200\\sqrt3 + 40 = 160 + 346.41 = \\boxed{506.41\\ \\text{W}}$$\n\n> **★ 注意**：直流分量的相位差为 0，所以 $P_0 = U_0I_0 = 60\\times2 = 120$ W（**不需要乘 cos**）。\n\n**(4) 视在功率与功率因数**\n\n$$S = UI = 107.70\\times5.745 \\approx \\boxed{618.8\\ \\text{V·A}}$$\n\n$$\\lambda = \\frac{P}{S} = \\frac{506.41}{618.8} \\approx \\boxed{0.818}$$\n\n**答案：U ≈ 107.7 V；I ≈ 5.745 A；P ≈ 506.4 W；S ≈ 618.8 V·A；λ ≈ 0.818。**\n\n> **★ 观察**：基波的 $\\cos\\varphi_1 = \\cos30° = 0.866$，但**总功率因数只有 0.818** ——\n> 因为谐波的存在拉低了总功率因数（$\\lambda \\le \\cos\\varphi_1$）。\n> **这是非正弦电路的一个重要结论，也是简答题的考点。**\n\n---",
  "difficulty": 3
 },
 {
  "id": "L07-T1",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T1",
  "tag": "基础戴维南",
  "brief": "含源一端口：18 V 电压源串联 3 Ω，再并联一条 (6 Ω + 6 Ω) 串联支路。 端口从\"两 6 Ω 之间的节点",
  "stem": "含源一端口：18 V 电压源串联 3 Ω，再并联一条 (6 Ω + 6 Ω) 串联支路。\n端口从\"两 6 Ω 之间的节点\"到地与电源负端共点处引出。\n求 **(1)** $U_{oc}$；**(2)** $I_{sc}$；**(3)** $R_{eq}$（两法校验）；**(4)** $P_{max}$ 及对应 $R_L$。",
  "answerText": "**(1)** 开路时，6 Ω + 6 Ω 支路电流 $= \\dfrac{18}{3+12} = \\dfrac{18}{15} = 1.2$ A",
  "solution": "**(1)** 开路时，6 Ω + 6 Ω 支路电流 $= \\dfrac{18}{3+12} = \\dfrac{18}{15} = 1.2$ A\n\n$$U_{oc} = 1.2\\times6 = \\boxed{7.2\\ \\text{V}}$$\n\n**(2)** 短路时，端口节点接地 → 下方 6 Ω 被短路（两端都是地）→ 只剩 3 Ω 与上方 6 Ω 串联\n\n$$I_{sc} = \\frac{18}{3+6} = \\boxed{2\\ \\text{A}}$$\n\n**(3)** 开路短路法：$R_{eq} = \\dfrac{7.2}{2} = \\boxed{3.6\\ \\Omega}$\n\n**置零法校验**：18 V 短路 → 3 Ω 从节点 Q 到地；上方 6 Ω 从端口到 Q；下方 6 Ω 从端口到地\n\n从端口看：$6 \\parallel (6+3) = 6\\parallel9 = \\dfrac{54}{15} = 3.6\\ \\Omega$ ✓\n\n**(4)** $R_L = 3.6\\ \\Omega$\n\n$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{7.2^2}{4\\times3.6} = \\frac{51.84}{14.4} = \\boxed{3.6\\ \\text{W}}$$\n\n**校验**：$U_L = 3.6$ V，$P_L = 3.6^2/3.6 = 3.6$ W ✓",
  "difficulty": 3
 },
 {
  "id": "L07-T2",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T2",
  "tag": "电流源置零陷阱",
  "brief": "一端口内部：6 A 电流源并联 4 Ω（电流源从地流向节点 A）。 求 **(1)** $U_{oc}$；**(2)**",
  "stem": "一端口内部：6 A 电流源并联 4 Ω（电流源从地流向节点 A）。\n求 **(1)** $U_{oc}$；**(2)** $R_{eq}$；**(3)** $I_{sc}$；**(4)** 若改为\"6 A 电流源并联 4 Ω 再串联 2 Ω 到端口\"，求新的 $R_{eq}$ 和 $P_{max}$。",
  "answerText": "**(1)** 开路时，6 A 全部流过 4 Ω：",
  "solution": "**(1)** 开路时，6 A 全部流过 4 Ω：\n\n$$U_{oc} = 6\\times4 = 24\\ \\text{V}$$\n\n**(2)** 电流源置零（开路）→ 只剩 4 Ω\n\n$$R_{eq} = 4\\ \\Omega$$\n\n**(3)** $I_{sc} = \\dfrac{U_{oc}}{R_{eq}} = \\dfrac{24}{4} = 6$ A（**就是电流源本身的电流 ✓ 合理**）\n\n**(4)** 改为\"6 A 并联 4 Ω，再串联 2 Ω 到端口\"（端口在 2 Ω 外侧）：\n\n- $R_{eq} = 4 + 2 = 6\\ \\Omega$\n- $U_{oc} = 6\\times4 = 24$ V（串联的 2 Ω 在开路时无电流、无压降）\n\n$$P_{max} = \\frac{24^2}{4\\times6} = \\frac{576}{24} = \\boxed{24\\ \\text{W}}$$",
  "difficulty": 3
 },
 {
  "id": "L07-T3",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T3",
  "tag": "含受控源·外加电源法",
  "brief": "一端口（独立源已置零）： - 端口 A 接 3 Ω 到节点 Q - Q 到地接 6 Ω - Q 到地还有一个受控电流源 ",
  "stem": "一端口（独立源已置零）：\n- 端口 A 接 3 Ω 到节点 Q\n- Q 到地接 6 Ω\n- Q 到地还有一个受控电流源 $0.25U_Q$（从 Q 流向地）\n求 **(1)** $R_{eq}$；**(2)** 若 $U_{oc} = 8$ V，求最佳 $R_L$ 与 $P_{max}$。",
  "answerText": "**(1) 外加 1 V 到端口 A**",
  "solution": "**(1) 外加 1 V 到端口 A**\n\n设 $U_Q = q$。\n\nA 点电位 1 V，经 3 Ω 到 Q：电流 $= \\dfrac{1-q}{3}$\n\nQ 点 KCL：\n\n$$\\frac{1-q}{3} = \\frac{q}{6} + 0.25q$$\n\n两边乘 12：\n\n$$4(1-q) = 2q + 3q$$\n\n$$4 - 4q = 5q \\quad\\Longrightarrow\\quad q = \\frac{4}{9}\\ \\text{V}$$\n\n$$I_0 = \\frac{1-q}{3} = \\frac{1-\\frac49}{3} = \\frac{\\frac59}{3} = \\frac{5}{27}\\ \\text{A}$$\n\n$$R_{eq} = \\frac{1}{5/27} = \\boxed{\\frac{27}{5} = 5.4\\ \\Omega}$$\n\n**(2)** $R_L = 5.4\\ \\Omega$\n\n$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{8^2}{4\\times5.4} = \\frac{64}{21.6} = \\boxed{\\frac{80}{27} \\approx 2.963\\ \\text{W}}$$\n\n**校验**：$U_L = 4$ V，$P_L = 16/5.4 = 160/54 = 80/27$ W ✓",
  "difficulty": 3
 },
 {
  "id": "L07-T4",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T4",
  "tag": "含受控源·完整流程",
  "brief": "一端口：12 V 源正端接 P，负端接地；P 到 Q 接 4 Ω；Q 到地接 2 Ω；从 Q 到 R 接受控电压源 $3",
  "stem": "一端口：12 V 源正端接 P，负端接地；P 到 Q 接 4 Ω；Q 到地接 2 Ω；从 Q 到 R 接受控电压源 $3U_x$（正极在 Q）；R 到地接 4 Ω；端口为 R 与地。\n$U_x = U_P - U_Q$。\n求 **(1)** $U_{oc}$；**(2)** 外加电源法求 $R_{eq}$；**(3)** 开路短路法校验；**(4)** $P_{max}$。",
  "answerText": "**(1) 求 $U_{oc}$（R 开路）**",
  "solution": "**(1) 求 $U_{oc}$（R 开路）**\n\nR 开路 → R 到地的 4 Ω 无电流 → $U_{oc} = U_R = q - 3U_x$\n\n设 $U_Q = q$，$U_P = 12$。\n\n$U_x = 12 - q$\n\nQ 点 KCL（4 Ω 从 P 到 Q；2 Ω 从 Q 到地；4 Ω 从 Q 到 R 但 R 开路无电流）：\n\n$$\\frac{12-q}{4} = \\frac{q}{2}$$\n\n乘 4：$12 - q = 2q$ → $q = 4$ V\n\n$$U_x = 12 - 4 = 8\\ \\text{V}$$\n\n$$U_{oc} = U_R = q - 3U_x = 4 - 24 = \\boxed{-20\\ \\text{V}}$$\n\n**(2) 外加电源法**\n\n12 V 置零 → P 接地。加 $U_0 = 1$ V 到 R。\n\n设 $U_Q = q$，$U_P = 0$，$U_x = 0 - q = -q$。\n\nQ 点 KCL：\n- 从 P(地) 到 Q：$\\dfrac{0-q}{4} = -\\dfrac{q}{4}$\n- Q 到地：$\\dfrac{q}{2}$\n- Q 到 R(1 V)，经受控源（压降 $3U_x$）：$\\dfrac{q - 3U_x - 1}{4} = \\dfrac{q + 3q - 1}{4} = \\dfrac{4q-1}{4}$\n\n$$-\\frac{q}{4} = \\frac{q}{2} + \\frac{4q-1}{4}$$\n\n乘 4：$-q = 2q + 4q - 1$ → $7q = 1$ → $q = \\dfrac17$ V\n\nR 到 Q 的电流 $= \\dfrac{4q-1}{4} = \\dfrac{4/7-1}{4} = \\dfrac{-3/7}{4} = -\\dfrac{3}{28}$ A\n\n（负号表示电流实际从 Q 流向 R，即流入端口）\n\n$$I_0 = \\frac{3}{28}\\ \\text{A} \\quad\\Longrightarrow\\quad R_{eq} = \\frac{1}{3/28} = \\boxed{\\frac{28}{3} \\approx 9.333\\ \\Omega}$$\n\n**(3) 短路校验**\n\nR 短路到地，独立源恢复（$U_P = 12$）。\n\nQ 点 KCL：\n- 从 P 到 Q：$\\dfrac{12-q}{4}$\n- Q 到地（2 Ω）：$\\dfrac{q}{2}$\n- Q 到地（经受控源到 R，R 已接地）：$\\dfrac{q-3U_x}{4} = \\dfrac{q - 3(12-q)}{4} = \\dfrac{4q-36}{4} = q - 9$\n\n$$\\frac{12-q}{4} = \\frac{q}{2} + (q-9)$$\n\n乘 4：$12 - q = 2q + 4q - 36$\n\n$$48 = 7q \\quad\\Longrightarrow\\quad q = \\frac{48}{7}\\ \\text{V}$$\n\n$$I_{sc} = q - 9 = \\frac{48}{7} - \\frac{63}{7} = -\\frac{15}{7}\\ \\text{A}$$\n\n**校验**：$R_{eq} = \\dfrac{U_{oc}}{I_{sc}} = \\dfrac{-20}{-15/7} = 20\\times\\dfrac{7}{15} = \\dfrac{140}{15} = \\dfrac{28}{3}\\ \\Omega$ ✓\n\n**(4)** $R_L = \\dfrac{28}{3}\\ \\Omega$\n\n$$P_{max} = \\frac{(-20)^2}{4\\times28/3} = \\frac{400}{112/3} = \\frac{1200}{112} = \\boxed{\\frac{75}{7} \\approx 10.714\\ \\text{W}}$$",
  "difficulty": 3
 },
 {
  "id": "L07-T5",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T5",
  "tag": "电源合并",
  "brief": "- 源 1：20 V 电压源串联 5 Ω - 源 2：3 A 电流源并联 10 Ω 两者并联向节点 A 供电，A 到地接",
  "stem": "- 源 1：20 V 电压源串联 5 Ω\n- 源 2：3 A 电流源并联 10 Ω\n两者并联向节点 A 供电，A 到地接负载 $R_L$（3 A 源从地流向 A）。\n求 **(1)** $U_{oc}$；**(2)** $R_{eq}$；**(3)** $R_L$ 与 $P_{max}$。",
  "answerText": "**(1)** 源 1 诺顿化：$20/5 = 4$ A，并联 5 Ω",
  "solution": "**(1)** 源 1 诺顿化：$20/5 = 4$ A，并联 5 Ω\n\n合并：（$4+3$）= 7 A，$5\\parallel10 = \\dfrac{50}{15} = \\dfrac{10}{3}\\ \\Omega$\n\n$$U_{oc} = 7\\times\\frac{10}{3} = \\frac{70}{3} \\approx \\boxed{23.33\\ \\text{V}}$$\n\n**节点法校验**：设 $U_A = u$\n\n$$\\frac{20-u}{5} + 3 = \\frac{u}{10}$$\n\n乘 10：$2(20-u) + 30 = u$ → $40-2u+30 = u$ → $70 = 3u$ → $u = 70/3$ V ✓\n\n**(2)** $R_{eq} = 5\\parallel10 = \\dfrac{10}{3}\\ \\Omega \\approx 3.333\\ \\Omega$\n\n**(3)** $R_L = \\dfrac{10}{3}\\ \\Omega$\n\n$$P_{max} = \\frac{(70/3)^2}{4\\times10/3} = \\frac{4900/9}{40/3} = \\frac{4900}{9}\\times\\frac{3}{40} = \\frac{4900}{120} = \\boxed{\\frac{245}{6} \\approx 40.83\\ \\text{W}}$$\n\n**校验**：$U_L = 35/3$ V，$P_L = \\dfrac{(35/3)^2}{10/3} = \\dfrac{1225/9}{10/3} = \\dfrac{1225}{30} = \\dfrac{245}{6}$ W ✓",
  "difficulty": 3
 },
 {
  "id": "L07-T6",
  "subject": "电路",
  "type": "calc",
  "kp": [
   "C4",
   "C5"
  ],
  "source": "第07课练习 T6",
  "tag": "交流戴维南",
  "brief": "$\\omega = 2000$ rad/s。电压源 $\\dot U_S = 10\\angle0°$ V 串联 $R = ",
  "stem": "$\\omega = 2000$ rad/s。电压源 $\\dot U_S = 10\\angle0°$ V 串联 $R = 3\\ \\Omega$ 再串联 $L$（$\\omega L = 4\\ \\Omega$），端口 A、B。\n求 **(1)** $\\dot U_{oc}$；**(2)** $\\dot I_{sc}$；**(3)** $Z_{eq}$；**(4)** $Z_L$ 与 $P_{max}$。\n\n---",
  "answerText": "**(1)** $\\dot U_{oc} = \\dot U_S = \\boxed{10\\angle0°\\ \\text{V}}$",
  "solution": "**(1)** $\\dot U_{oc} = \\dot U_S = \\boxed{10\\angle0°\\ \\text{V}}$\n\n**(2)** $Z = 3 + j4\\ \\Omega$，$|Z| = 5\\ \\Omega$，$\\angle Z = 53.13°$\n\n$$\\dot I_{sc} = \\frac{10\\angle0°}{5\\angle53.13°} = \\boxed{2\\angle{-53.13°}\\ \\text{A}}$$\n\n**(3)** $Z_{eq} = \\dfrac{\\dot U_{oc}}{\\dot I_{sc}} = \\dfrac{10\\angle0°}{2\\angle{-53.13°}} = 5\\angle53.13° = \\boxed{3+j4\\ \\Omega}$\n\n**（就是内部阻抗 ✓）**\n\n**(4)** $Z_L = Z_{eq}^* = \\boxed{3-j4\\ \\Omega}$\n\n$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{10^2}{4\\times3} = \\frac{100}{12} = \\boxed{\\frac{25}{3} \\approx 8.333\\ \\text{W}}$$\n\n**校验**：总阻抗 $= 6\\ \\Omega$，$I = 10/6 = 5/3$ A，$P_L = (5/3)^2\\times3 = 25/3$ W ✓\n\n---",
  "difficulty": 3
 }
];
