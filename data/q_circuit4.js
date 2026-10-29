/* 电路 · 计算题（补 C1 / C2 / C15 三个考点，使每个考点≥3 题） */
window.QUESTIONS = (window.QUESTIONS || []).concat([
 {
  "id": "QC-41",
  "subject": "电路",
  "type": "calc",
  "kp": ["C1"],
  "source": "自编·功率与参考方向",
  "tag": "对应考点 C1",
  "brief": "元件电压电流取关联参考方向，u=10 V、i=-2 A，求元件吸收功率并判断是吸收还是发出",
  "stem": "某二端元件上电压 $u$ 与电流 $i$ 取关联参考方向，已知 $u = 10\\ \\text{V}$，$i = -2\\ \\text{A}$。求该元件吸收的功率 $P$，并说明它实际是在吸收还是在发出功率。",
  "answerText": "$P = ui = -20\\ \\text{W}$：吸收功率为负，说明该元件实际在发出 $20\\ \\text{W}$ 功率。",
  "solution": "思路：关联参考方向下，吸收功率直接用 $P = ui$ 计算，符号由乘积自然给出，不必先改电流方向。\n$P = ui = 10\\times(-2) = -20\\ \\text{W}$。\n$P<0$ 表示该元件吸收功率为负，即实际向电路发出 $20\\ \\text{W}$ 功率，此时它相当于电源。\n易错点：若先把 $i$ 取反成 $2\\ \\text{A}$ 再套公式，就会漏掉“非关联参考方向要加负号”这一步，得到 $+20\\ \\text{W}$ 的错误结论。记住一句话：关联方向用 $P=ui$，非关联方向用 $P=-ui$，算出的正负号本身就代表吸收或发出。",
  "difficulty": 2
 },
 {
  "id": "QC-42",
  "subject": "电路",
  "type": "calc",
  "kp": ["C2"],
  "source": "自编·Y-Δ 等效",
  "tag": "对应考点 C2",
  "brief": "三个 3 Ω 电阻作星形连接，求等效为三角形连接后每臂阻值及两端点间等效电阻",
  "stem": "三个阻值均为 $3\\ \\Omega$ 的电阻接成星形（Y）连接，三个外端点记为 A、B、C。求等效三角形（$\\Delta$）连接时每臂的阻值，并求 A、B 两端点之间的等效电阻 $R_{AB}$。",
  "answerText": "等效 $\\Delta$ 每臂 $R_\\Delta = 3R_Y = 9\\ \\Omega$；$R_{AB} = 9\\parallel(9+9) = 6\\ \\Omega$。",
  "solution": "思路：对称 Y-$\\Delta$ 变换用 $R_\\Delta = 3R_Y$，换成三角形后端口间就是干净的串并联。\n（1）$R_\\Delta = 3R_Y = 3\\times3 = 9\\ \\Omega$，即三角形三臂各 $9\\ \\Omega$。\n（2）求 $R_{AB}$ 时端点 C 悬空：A、B 之间是“直接那一臂 $9\\ \\Omega$”与“经 C 的两臂串联 $9+9=18\\ \\Omega$”并联：\n$R_{AB} = \\dfrac{9\\times18}{9+18} = \\dfrac{162}{27} = 6\\ \\Omega$。\n（3）校验：不换 $\\Delta$，直接在 Y 形上求——A、B 之间只有两条 $3\\ \\Omega$ 臂串联（第三条臂接悬空的 C），$R_{AB}=3+3=6\\ \\Omega$，与 $\\Delta$ 变换结果一致。\n易错点：反向公式是 $R_Y = R_\\Delta/3$，方向别用反；求端口电阻时接悬空端点的那个臂不参与，别把它也算进并联。",
  "difficulty": 2
 },
 {
  "id": "QC-43",
  "subject": "电路",
  "type": "calc",
  "kp": ["C15"],
  "source": "自编·对称三相 Y 接",
  "tag": "对应考点 C15",
  "brief": "对称三相电源线电压 380 V，Y 接负载每相阻抗 10∠30° Ω，求线电流与三相有功功率",
  "stem": "对称三相电源的线电压有效值为 $380\\ \\text{V}$，接一组对称星形（Y）负载，每相阻抗 $Z = 10\\angle30^\\circ\\ \\Omega$。求线电流 $I_l$ 和三相总有功功率 $P$。",
  "answerText": "$I_l = I_p = \\dfrac{380/\\sqrt3}{10} \\approx 21.9\\ \\text{A}$；$P = 3I_p^2 R = 3\\times21.9^2\\times8.66 \\approx 12.5\\ \\text{kW}$。",
  "solution": "思路：Y 接时线电流等于相电流，相电压是线电压的 $1/\\sqrt3$，先算相电流再算功率。\n（1）相电压 $U_p = \\dfrac{U_l}{\\sqrt3} = \\dfrac{380}{1.732} \\approx 219.4\\ \\text{V}$。\n（2）相电流 $I_p = \\dfrac{U_p}{|Z|} = \\dfrac{219.4}{10} \\approx 21.9\\ \\text{A}$，Y 接线电流 $I_l = I_p \\approx 21.9\\ \\text{A}$。\n（3）每相阻抗角 $30^\\circ$，故 $R = |Z|\\cos30^\\circ = 8.66\\ \\Omega$：\n$P = 3I_p^2R = 3\\times21.9^2\\times8.66 \\approx 12.5\\ \\text{kW}$。\n也可用 $P = \\sqrt3 U_l I_l\\cos\\varphi = 1.732\\times380\\times21.9\\times0.866 \\approx 12.5\\ \\text{kW}$，两式一致。\n易错点：$\\sqrt3$ 只出现在“线—相”换算里；若把 380 V 直接当相电压代入，$I_l$ 会偏大 $\\sqrt3$ 倍；功率别忘乘 $\\cos\\varphi$（本题 $\\cos30^\\circ=0.866$，不是 1）。",
  "difficulty": 3
 }
]);