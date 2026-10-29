/* 电路 · 计算题（C9~C15 考点） */
window.QUESTIONS = (window.QUESTIONS || []).concat([

  /* ---------------- C9 谐振与频率特性 ---------------- */
  {
    id: "QC-21", subject: "电路", type: "calc", kp: ["C9"], source: "自编·串联谐振", tag: "对应考点 C9",
    brief: "RLC串联电路谐振，求谐振频率、品质因数、通频带与谐振时电容电压",
    stem: "RLC 串联电路，$R = 10\\ \\Omega$，$L = 0.1\\ \\text{H}$，$C = 10\\ \\mu\\text{F}$，外加正弦电压有效值 $U = 10\\ \\text{V}$，调节频率使电路谐振。求谐振角频率 $\\omega_0$、谐振频率 $f_0$、品质因数 $Q$、通频带 $\\Delta\\omega$，以及谐振时的电容电压 $U_C$。",
    answerText: "$\\omega_0 = 1000\\ \\text{rad/s}$，$f_0 \\approx 159\\ \\text{Hz}$，$Q = 10$，$\\Delta\\omega = 100\\ \\text{rad/s}$，$U_C = 100\\ \\text{V}$",
    solution: "思路：串联谐振条件是 $X_L = X_C$，即 $\\omega_0L = \\dfrac{1}{\\omega_0C}$，此时阻抗最小且为纯电阻。\n$\\omega_0 = \\dfrac{1}{\\sqrt{LC}} = \\dfrac{1}{\\sqrt{0.1\\times10\\times10^{-6}}} = \\dfrac{1}{10^{-3}} = 1000\\ \\text{rad/s}$。\n$f_0 = \\dfrac{\\omega_0}{2\\pi} = \\dfrac{1000}{6.283} \\approx 159\\ \\text{Hz}$。\n$Q = \\dfrac{\\omega_0L}{R} = \\dfrac{1000\\times0.1}{10} = 10$。\n$\\Delta\\omega = \\dfrac{\\omega_0}{Q} = \\dfrac{1000}{10} = 100\\ \\text{rad/s}$，对应 $\\Delta f \\approx 15.9\\ \\text{Hz}$。\n谐振电流 $I_0 = \\dfrac{U}{R} = 1\\ \\text{A}$，$U_C = I_0X_C = 1\\times\\dfrac{1}{1000\\times10\\times10^{-6}} = 100\\ \\text{V}$。\n校验：$U_C = QU = 10\\times10 = 100\\ \\text{V}$ ✓；此时 $U_L = U_C$ 相互抵消，电源只需提供 $U_R = 10\\ \\text{V}$。\n结论：$\\omega_0 = 1000\\ \\text{rad/s}$，$Q = 10$，$\\Delta\\omega = 100\\ \\text{rad/s}$，$U_C = 100\\ \\text{V}$（是电源电压的 $Q$ 倍，故称电压谐振）。",
    difficulty: 3
  },
  {
    id: "QC-22", subject: "电路", type: "calc", kp: ["C9"], source: "自编·频率响应", tag: "对应考点 C9",
    brief: "RC一阶低通网络，求网络函数、截止频率及两个频点的分贝与相移",
    stem: "一阶 RC 低通网络，$R = 10\\ \\text{k}\\Omega$，$C = 0.01\\ \\mu\\text{F}$，输出取自电容两端。求网络函数 $H(s) = \\dfrac{U_2(s)}{U_1(s)}$、截止角频率 $\\omega_c$，并求 $\\omega = \\omega_c$ 与 $\\omega = 10\\omega_c$ 时的幅值（以 dB 表示）和相移。",
    answerText: "$H(s) = \\dfrac{1}{1+sRC}$，$\\omega_c = 10^{4}\\ \\text{rad/s}$；$\\omega_c$ 处 $-3\\ \\text{dB}$、$-45^\\circ$；$10\\omega_c$ 处 $-20\\ \\text{dB}$、$-84.3^\\circ$",
    solution: "思路：由分压关系得网络函数，令 $s = j\\omega$ 后分别求幅频与相频特性。\n$H(s) = \\dfrac{\\frac{1}{sC}}{R+\\frac{1}{sC}} = \\dfrac{1}{1+sRC}$，为一阶低通网络函数。\n$RC = 10^{4}\\times10^{-8} = 10^{-4}\\ \\text{s}$，$\\omega_c = \\dfrac{1}{RC} = 10^{4}\\ \\text{rad/s}$，$f_c \\approx 1592\\ \\text{Hz}$。\n$\\omega = \\omega_c$ 时 $|H| = \\dfrac{1}{\\sqrt{1+1}} = 0.707$，$20\\lg0.707 \\approx -3\\ \\text{dB}$，$\\varphi = -45^\\circ$。\n$\\omega = 10\\omega_c$ 时 $|H| = \\dfrac{1}{\\sqrt{1+100}} = 0.0995$。\n$20\\lg0.0995 \\approx -20\\ \\text{dB}$，$\\varphi = -\\arctan10 = -84.3^\\circ$。\n幅频特性（波特图定性）：低频段为 $0\\ \\text{dB}$ 水平线，高频段以 $-20\\ \\text{dB}/\text{十倍频}$ 下降，转折点即 $\\omega_c$，相频从 $0^\\circ$ 经 $-45^\\circ$ 趋向 $-90^\\circ$。\n结论：$\\omega_c = 10^{4}\\ \\text{rad/s}$；该网络对 10 倍频信号衰减约 $17\\ \\text{dB}$，可作为一阶抗混叠/去噪低通。",
    difficulty: 4
  },
  {
    id: "QC-23", subject: "电路", type: "calc", kp: ["C9"], source: "自编·并联谐振", tag: "对应考点 C9",
    brief: "实际并联谐振电路，线圈含电阻，求谐振角频率、品质因数与谐振阻抗",
    stem: "实际并联谐振电路：线圈电阻 $R = 10\\ \\Omega$ 与 $L = 1\\ \\text{mH}$ 串联后，再与 $C = 1\\ \\mu\\text{F}$ 并联。求谐振角频率 $\\omega_0$、品质因数 $Q$、谐振阻抗 $Z_0$ 与通频带 $\\Delta\\omega$。",
    answerText: "$\\omega_0 = 3\\times10^{4}\\ \\text{rad/s}$，$Q = 3$，$Z_0 = 100\\ \\Omega$，$\\Delta\\omega = 10^{4}\\ \\text{rad/s}$",
    solution: "思路：实际并联谐振必须计入线圈电阻，谐振条件是总导纳的虚部为零。\n$Y = j\\omega C+\\dfrac{1}{R+j\\omega L} = j\\omega C+\\dfrac{R-j\\omega L}{R^{2}+(\\omega L)^{2}}$。\n令虚部为零：$\\omega_0C = \\dfrac{\\omega_0L}{R^{2}+\\omega_0^{2}L^{2}}$，解得 $\\omega_0 = \\sqrt{\\dfrac{1}{LC}-\\left(\\dfrac{R}{L}\\right)^{2}}$。\n$\\dfrac{1}{LC} = \\dfrac{1}{10^{-3}\\times10^{-6}} = 10^{9}$，$\\left(\\dfrac{R}{L}\\right)^{2} = \\left(\\dfrac{10}{10^{-3}}\\right)^{2} = 10^{8}$。\n$\\omega_0 = \\sqrt{10^{9}-10^{8}} = \\sqrt{9\\times10^{8}} = 3\\times10^{4}\\ \\text{rad/s}$，$f_0 \\approx 4.77\\ \\text{kHz}$。\n$Q = \\dfrac{\\omega_0L}{R} = \\dfrac{3\\times10^{4}\\times10^{-3}}{10} = 3$。\n谐振阻抗 $Z_0 = \\dfrac{L}{RC} = \\dfrac{10^{-3}}{10\\times10^{-6}} = 100\\ \\Omega$。\n$\\Delta\\omega = \\dfrac{\\omega_0}{Q} = 10^{4}\\ \\text{rad/s}$。\n校验：谐振时 $\\omega_0L = 30\\ \\Omega$，$Y = \\dfrac{10}{10^{2}+30^{2}} = 0.01\\ \\text{S}$，故 $Z = 100\\ \\Omega$ ✓；又因 $R \\ne 0$，$\\omega_0$ 比 $1/\\sqrt{LC}$ 略低。",
    difficulty: 5
  },

  /* ---------------- C10 互感与理想变压器 ---------------- */
  {
    id: "QC-24", subject: "电路", type: "calc", kp: ["C10"], source: "自编·互感电压", tag: "对应考点 C10",
    brief: "两耦合线圈，其一通正弦电流，求耦合系数与另一线圈开路电压",
    stem: "两耦合线圈 $L_1 = 0.1\\ \\text{H}$、$L_2 = 0.04\\ \\text{H}$，互感 $M = 0.02\\ \\text{H}$，已知线圈 1 的 1 端与线圈 2 的 2 端为同名端。线圈 1 中通正弦电流，其相量 $\\dot I_1 = 2\\angle0^\\circ\\ \\text{A}$，$\\omega = 1000\\ \\text{rad/s}$，电流由 1 端流入；线圈 2 开路，其端电压 $u_2$ 的正极取在 2 端。求 (1) 耦合系数 $k$；(2) 开路电压相量 $\\dot U_2$ 及它与 $\\dot I_1$ 的相位差；(3) 若 $i_1$ 改由线圈 1 的异名端流入，$\\dot U_2$ 如何变化。",
    answerText: "$k \\approx 0.316$；$\\dot U_2 = j40\\ \\text{V}$，$U_2 = 40\\ \\text{V}$ 且超前 $\\dot I_1$ 共 $90^\\circ$；改从异名端流入时为 $-j40\\ \\text{V}$（反相 $180^\\circ$）",
    solution: "思路：线圈 2 开路时其中只有互感电压，$u_2 = \\pm M\\dfrac{di_1}{dt}$，正负由同名端与电压参考极性共同决定。\n耦合系数 $k = \\dfrac{M}{\\sqrt{L_1L_2}} = \\dfrac{0.02}{\\sqrt{0.1\\times0.04}} = \\dfrac{0.02}{0.0632} \\approx 0.316$（松耦合）。\n各电抗：$\\omega L_1 = 100\\ \\Omega$，$\\omega L_2 = 40\\ \\Omega$，$\\omega M = 1000\\times0.02 = 20\\ \\Omega$。\n因 $i_1$ 从同名端流入、$u_2$ 的正极也在同名端，互感电压取正号：$\\dot U_2 = j\\omega M\\dot I_1$。\n$\\dot U_2 = j20\\times2 = j40\\ \\text{V}$，即 $U_2 = 40\\ \\text{V}$，相位超前 $\\dot I_1$ 共 $90^\\circ$。\n若 $i_1$ 改由异名端流入，同名端关系反转，$\\dot U_2 = -j40\\ \\text{V}$，幅值不变而相位差 $180^\\circ$。\n校验：$k<1$ 说明漏磁存在，$\\omega M < \\sqrt{\\omega L_1\\cdot\\omega L_2} = \\sqrt{4000} \\approx 63.2\\ \\Omega$ ✓。\n结论：$k \\approx 0.316$，$U_2 = 40\\ \\text{V}$ 且超前 $90^\\circ$；互感电压的极性只由同名端与电流方向决定，与线圈实际绕向无关。",
    difficulty: 3
  },
  {
    id: "QC-25", subject: "电路", type: "calc", kp: ["C10"], source: "自编·理想变压器", tag: "对应考点 C10",
    brief: "理想变压器降压接负载，求副边电压电流、原边等效电阻与功率",
    stem: "理想变压器匝数比 $n = \\dfrac{N_1}{N_2} = 10$，副边接负载 $R_L = 8\\ \\Omega$，原边加正弦电压有效值 $U_1 = 100\\ \\text{V}$。求副边电压 $U_2$、副边电流 $I_2$、原边电流 $I_1$、原边等效电阻 $R_{in}$ 及负载消耗的功率 $P$。",
    answerText: "$U_2 = 10\\ \\text{V}$，$I_2 = 1.25\\ \\text{A}$，$I_1 = 0.125\\ \\text{A}$，$R_{in} = 800\\ \\Omega$，$P = 12.5\\ \\text{W}$",
    solution: "思路：理想变压器电压比等于匝比、电流比等于匝比的倒数，副边阻抗按 $n^{2}$ 折算到原边。\n$U_2 = \\dfrac{U_1}{n} = \\dfrac{100}{10} = 10\\ \\text{V}$（降压）。\n$I_2 = \\dfrac{U_2}{R_L} = \\dfrac{10}{8} = 1.25\\ \\text{A}$。\n$I_1 = \\dfrac{I_2}{n} = \\dfrac{1.25}{10} = 0.125\\ \\text{A}$。\n$R_{in} = n^{2}R_L = 100\\times8 = 800\\ \\Omega$，校验 $\\dfrac{U_1}{I_1} = \\dfrac{100}{0.125} = 800\\ \\Omega$ ✓。\n$P = U_2I_2 = 10\\times1.25 = 12.5\\ \\text{W}$，也等于 $U_1I_1 = 100\\times0.125 = 12.5\\ \\text{W}$ ✓（理想变压器不耗能、不储能）。\n校验：$R_{in} = \\dfrac{U_1^{2}}{P} = \\dfrac{100^{2}}{12.5} = 800\\ \\Omega$ ✓。\n结论：$U_2 = 10\\ \\text{V}$，$I_2 = 1.25\\ \\text{A}$，$R_{in} = 800\\ \\Omega$，$P = 12.5\\ \\text{W}$；降压变压器把负载放大 $n^{2}$ 倍反映到原边，是阻抗变换与阻抗匹配的基本手段。",
    difficulty: 4
  },
  {
    id: "QC-26", subject: "电路", type: "calc", kp: ["C10"], source: "自编·互感串联", tag: "对应考点 C10",
    brief: "两耦合线圈顺串与反串，求耦合系数与两种接法的等效电感",
    stem: "两耦合线圈 $L_1 = 0.4\\ \\text{H}$、$L_2 = 0.1\\ \\text{H}$，互感 $M = 0.1\\ \\text{H}$。求 (1) 耦合系数 $k$；(2) 两线圈顺串（异名端相接，电流同时从两同名端流入）时的等效电感 $L_{\text{顺}}$；(3) 两线圈反串（同名端相接）时的等效电感 $L_{\text{反}}$。",
    answerText: "$k = 0.5$；$L_{\text{顺}} = 0.7\\ \\text{H}$；$L_{\text{反}} = 0.3\\ \\text{H}$",
    solution: "思路：串联时两线圈通同一电流，顺串的互感电压与自感电压同向相加，反串则相减。\n耦合系数 $k = \\dfrac{M}{\\sqrt{L_1L_2}} = \\dfrac{0.1}{\\sqrt{0.4\\times0.1}} = \\dfrac{0.1}{0.2} = 0.5$。\n顺串：$L_{\text{顺}} = L_1+L_2+2M = 0.4+0.1+2\\times0.1 = 0.7\\ \\text{H}$。\n反串：$L_{\text{反}} = L_1+L_2-2M = 0.4+0.1-2\\times0.1 = 0.3\\ \\text{H}$。\n校验：$k<1$ 且反串结果 $0.3\\ \\text{H}>0$，说明耦合未超过极限（$M \\le \\sqrt{L_1L_2} = 0.2\\ \\text{H}$）✓。\n工程意义：$L_{\text{顺}}-L_{\text{反}} = 4M = 0.4\\ \\text{H}$，故可用两次测量求出 $M = \\dfrac{L_{\text{顺}}-L_{\text{反}}}{4} = 0.1\\ \\text{H}$。\n结论：$k = 0.5$，顺串 $0.7\\ \\text{H}$、反串 $0.3\\ \\text{H}$；同名端接法不同，等效电感相差 $4M$，这是判断同名端的实验依据。",
    difficulty: 4
  },

  /* ---------------- C11 二端口网络 ---------------- */
  {
    id: "QC-27", subject: "电路", type: "calc", kp: ["C11"], source: "自编·Z参数", tag: "对应考点 C11",
    brief: "T形二端口网络，由串臂与并臂阻抗求Z参数并判断互易与对称",
    stem: "T 形二端口网络：端口 1 串臂 $Z_1 = 10\\ \\Omega$，端口 2 串臂 $Z_2 = 20\\ \\Omega$，公共并臂 $Z_3 = 30\\ \\Omega$。求 Z 参数矩阵，并判断该网络是否互易、是否对称。",
    answerText: "$Z_{11} = 40\\ \\Omega$，$Z_{12} = Z_{21} = 30\\ \\Omega$，$Z_{22} = 50\\ \\Omega$；互易但不对称",
    solution: "思路：T 形网络令端口 2 开路（$I_2 = 0$）求 $Z_{11}$、$Z_{21}$；令端口 1 开路（$I_1 = 0$）求 $Z_{22}$、$Z_{12}$。\n$I_2 = 0$ 时：$U_1 = (Z_1+Z_3)I_1 = (10+30)I_1 = 40I_1$，故 $Z_{11} = 40\\ \\Omega$。\n$I_2 = 0$ 时：$U_2 = Z_3I_1 = 30I_1$，故 $Z_{21} = 30\\ \\Omega$。\n$I_1 = 0$ 时：$U_2 = (Z_2+Z_3)I_2 = 50I_2$，故 $Z_{22} = 50\\ \\Omega$；同时 $U_1 = Z_3I_2$，故 $Z_{12} = 30\\ \\Omega$。\n写成矩阵：$Z = \\begin{bmatrix}40 & 30\\\\ 30 & 50\\end{bmatrix}\\Omega$。\n互易判据 $Z_{12} = Z_{21} = 30\\ \\Omega$ ✓；网络为无源线性（不含受控源），必互易。\n对称判据 $Z_{11} = Z_{22}$？$40 \\ne 50$，故不对称。\n结论：$Z_{11}=40$、$Z_{12}=Z_{21}=30$、$Z_{22}=50\\ \\Omega$；T 形无源网络恒互易，只有 $Z_1 = Z_2$ 时才对称。",
    difficulty: 2
  },
  {
    id: "QC-28", subject: "电路", type: "calc", kp: ["C11"], source: "自编·Y参数", tag: "对应考点 C11",
    brief: "Π形二端口网络，由各臂导纳求Y参数并判断互易与对称",
    stem: "Π 形二端口网络：串臂导纳 $Y_s = 0.1\\ \\text{S}$，端口 1 并臂导纳 $Y_1 = 0.2\\ \\text{S}$，端口 2 并臂导纳 $Y_2 = 0.25\\ \\text{S}$。求 Y 参数矩阵，并判断是否互易、是否对称。",
    answerText: "$Y_{11} = 0.3\\ \\text{S}$，$Y_{12} = Y_{21} = -0.1\\ \\text{S}$，$Y_{22} = 0.35\\ \\text{S}$；互易但不对称",
    solution: "思路：Π 形令端口 2 短路（$U_2 = 0$）求 $Y_{11}$、$Y_{21}$；令端口 1 短路（$U_1 = 0$）求 $Y_{22}$、$Y_{12}$。\n$U_2 = 0$ 时端口 2 的并臂被短接，从端口 1 看进去是 $Y_1$ 与 $Y_s$ 并联：$Y_{11} = Y_1+Y_s = 0.2+0.1 = 0.3\\ \\text{S}$。\n$U_2 = 0$ 时流过串臂的电流为 $Y_sU_1$，由端口 1 流向端口 2，而 $I_2$ 定义为流入端口 2，故 $I_2 = -Y_sU_1$，$Y_{21} = -0.1\\ \\text{S}$。\n$U_1 = 0$ 时同理：$Y_{22} = Y_2+Y_s = 0.25+0.1 = 0.35\\ \\text{S}$，$Y_{12} = -Y_s = -0.1\\ \\text{S}$。\n矩阵：$Y = \\begin{bmatrix}0.3 & -0.1\\\\ -0.1 & 0.35\\end{bmatrix}\\text{S}$。\n$Y_{12} = Y_{21} = -0.1\\ \\text{S}$，故互易 ✓；$Y_{11} \\ne Y_{22}$，故不对称。\n结论：Π 形互易网络的 $Y_{12} = Y_{21} = -Y_s$ 恒成立，对称条件是 $Y_1 = Y_2$。",
    difficulty: 3
  },
  {
    id: "QC-29", subject: "电路", type: "calc", kp: ["C11"], source: "自编·H参数", tag: "对应考点 C11",
    brief: "L形二端口网络，按定义求H参数并判断互易与对称",
    stem: "L 形二端口网络：端口 1 的两端之间并接 $R_1 = 10\\ \\Omega$，端口 1 的上端经 $R_2 = 10\\ \\Omega$ 接到端口 2 的上端，两端口的下端为公共端。按定义求 H 参数矩阵，并判断是否互易、是否对称。",
    answerText: "$h_{11} = 5\\ \\Omega$，$h_{12} = 0.5$，$h_{21} = -0.5$，$h_{22} = 0.05\\ \\text{S}$；互易但不对称",
    solution: "思路：H 参数方程 $U_1 = h_{11}I_1+h_{12}U_2$、$I_2 = h_{21}I_1+h_{22}U_2$，故令端口 2 短路求 $h_{11}$、$h_{21}$，令端口 1 开路求 $h_{12}$、$h_{22}$。\n端口 2 短路（$U_2 = 0$）：$R_2$ 与 $R_1$ 并联接在端口 1，$h_{11} = R_1\\parallel R_2 = \\dfrac{10\\times10}{20} = 5\\ \\Omega$。\n此时 $U_1 = 5I_1$，流过 $R_2$ 的电流为 $\\dfrac{U_1}{R_2} = 0.5I_1$ 且由端口 2 流出，故 $I_2 = -0.5I_1$，$h_{21} = -0.5$。\n端口 1 开路（$I_1 = 0$）：$R_1$、$R_2$ 串联，$U_2 = (R_1+R_2)I_2 = 20I_2$，$U_1 = R_1I_2 = 10I_2$。\n故 $h_{12} = \\dfrac{U_1}{U_2} = \\dfrac{10}{20} = 0.5$，$h_{22} = \\dfrac{I_2}{U_2} = \\dfrac{1}{20} = 0.05\\ \\text{S}$。\n矩阵：$H = \\begin{bmatrix}5 & 0.5\\\\ -0.5 & 0.05\\end{bmatrix}$（$h_{11}$ 单位 $\\Omega$，$h_{22}$ 单位 $\\text{S}$，$h_{12}$、$h_{21}$ 无量纲）。\n互易判据 $h_{12} = -h_{21}$：$0.5 = -(-0.5)$ ✓ 互易；对称判据 $\\Delta h = h_{11}h_{22}-h_{12}h_{21} = 5\\times0.05-(0.5)(-0.5) = 0.5 \\ne 1$，故不对称。\n结论：$h_{11}=5\\ \\Omega$、$h_{12}=0.5$、$h_{21}=-0.5$、$h_{22}=0.05\\ \\text{S}$；L 形无源网络互易但不对称。",
    difficulty: 4
  },
  {
    id: "QC-30", subject: "电路", type: "calc", kp: ["C11"], source: "自编·T参数级联", tag: "对应考点 C11",
    brief: "串联阻抗与并联导纳级联二端口，求T参数、互易性及端接输入电阻",
    stem: "二端口 $N_1$ 为串联阻抗 $Z = 10\\ \\Omega$，二端口 $N_2$ 为并联导纳 $Y = 0.05\\ \\text{S}$，二者级联（$N_1$ 在输入端一侧）。求级联后二端口的 T（传输）参数矩阵，判断是否互易、是否对称，并求输出端开路与短路时的输入电阻。",
    answerText: "$A = 1.5$，$B = 10\\ \\Omega$，$C = 0.05\\ \\text{S}$，$D = 1$；互易但不对称；输出开路 $R_{in} = 30\\ \\Omega$，输出短路 $R_{in} = 10\\ \\Omega$",
    solution: "思路：级联二端口的 T 矩阵等于各级 T 矩阵按级联顺序相乘，$T = T_1T_2$；再由端接条件求输入电阻。\n串联阻抗的传输矩阵：$T_1 = \\begin{bmatrix}1 & Z\\\\ 0 & 1\\end{bmatrix} = \\begin{bmatrix}1 & 10\\\\ 0 & 1\\end{bmatrix}$。\n并联导纳的传输矩阵：$T_2 = \\begin{bmatrix}1 & 0\\\\ Y & 1\\end{bmatrix} = \\begin{bmatrix}1 & 0\\\\ 0.05 & 1\\end{bmatrix}$。\n$T = T_1T_2 = \\begin{bmatrix}1 & 10\\\\ 0 & 1\\end{bmatrix}\\begin{bmatrix}1 & 0\\\\ 0.05 & 1\\end{bmatrix} = \\begin{bmatrix}1.5 & 10\\\\ 0.05 & 1\\end{bmatrix}$。\n互易判据 $AD-BC = 1.5\\times1-10\\times0.05 = 1.5-0.5 = 1$ ✓ 互易；$A \\ne D$，故不对称。\n输出开路（$I_2 = 0$）：$R_{in} = \\dfrac{A}{C} = \\dfrac{1.5}{0.05} = 30\\ \\Omega$。\n输出短路（$U_2 = 0$）：$R_{in} = \\dfrac{B}{D} = \\dfrac{10}{1} = 10\\ \\Omega$。\n物理校验：输出短路时 $1/Y$ 被短接，输入端只看到串联阻抗 $10\\ \\Omega$；输出开路时 $Z$ 与 $1/Y = 20\\ \\Omega$ 串联得 $30\\ \\Omega$ ✓。",
    difficulty: 5
  },

  /* ---------------- C12 运算放大器 ---------------- */
  {
    id: "QC-31", subject: "电路", type: "calc", kp: ["C12"], source: "自编·反相比例", tag: "对应考点 C12",
    brief: "反相比例运放电路，求电压增益、输出电压与平衡电阻",
    stem: "理想运放构成反相比例电路：$R_1 = 10\\ \\text{k}\\Omega$ 接在输入端与反相端之间，$R_f = 40\\ \\text{k}\\Omega$ 接在反相端与输出端之间，同相端经平衡电阻 $R_2$ 接地，$u_i = 0.5\\ \\text{V}$，运放工作在线性区。求电压增益 $A_u$、输出 $u_o$、平衡电阻 $R_2$ 及闭环输入电阻 $R_{if}$。",
    answerText: "$A_u = -4$，$u_o = -2\\ \\text{V}$，$R_2 = 8\\ \\text{k}\\Omega$，$R_{if} = 10\\ \\text{k}\\Omega$",
    solution: "思路：虚短使 $u_- = u_+ = 0$（反相端虚地），虚断使 $R_1$ 与 $R_f$ 中电流相等。\n反相端节点电流方程：$\\dfrac{u_i-0}{R_1} = \\dfrac{0-u_o}{R_f}$。\n解得 $u_o = -\\dfrac{R_f}{R_1}u_i = -\\dfrac{40}{10}\\times0.5 = -2\\ \\text{V}$，故 $A_u = -4$。\n平衡电阻取两电阻并联，以抵消输入偏置电流：$R_2 = R_1\\parallel R_f = \\dfrac{10\\times40}{10+40} = 8\\ \\text{k}\\Omega$。\n闭环输入电阻即 $R_1$：$R_{if} = 10\\ \\text{k}\\Omega$（虚地使 $R_f$ 右端等效接地，$R_f$ 不分流）。\n校验：$R_1$ 中电流 $\\dfrac{0.5}{10\\text{k}} = 50\\ \\mu\\text{A}$，$R_f$ 中电流 $\\dfrac{2}{40\\text{k}} = 50\\ \\mu\\text{A}$ ✓，虚断成立。\n结论：$A_u = -4$，$u_o = -2\\ \\text{V}$，$R_2 = 8\\ \\text{k}\\Omega$；反相比例只改变幅值和极性，$|A_u| = R_f/R_1$。",
    difficulty: 2
  },
  {
    id: "QC-32", subject: "电路", type: "calc", kp: ["C12"], source: "自编·同相比例", tag: "对应考点 C12",
    brief: "同相比例运放电路，求电压增益、输出电压及反馈支路电流",
    stem: "理想运放构成同相比例电路：$u_i = 0.15\\ \\text{V}$ 加在同相端，反相端经 $R_1 = 10\\ \\text{k}\\Omega$ 接地、经 $R_f = 90\\ \\text{k}\\Omega$ 接输出端。求电压增益 $A_u$、输出电压 $u_o$ 及 $R_1$ 中的电流。",
    answerText: "$A_u = 10$，$u_o = 1.5\\ \\text{V}$，$i_{R_1} = 15\\ \\mu\\text{A}$",
    solution: "思路：虚短使 $u_- = u_+ = u_i = 0.15\\ \\text{V}$，虚断使 $R_1$ 中电流等于 $R_f$ 中电流。\n对反相端列 KCL：$\\dfrac{u_-}{R_1}+\\dfrac{u_--u_o}{R_f} = 0$。\n代入 $u_- = u_i$ 得 $u_o = \\left(1+\\dfrac{R_f}{R_1}\\right)u_i$，即 $A_u = 1+\\dfrac{90}{10} = 10$。\n$u_o = 10\\times0.15 = 1.5\\ \\text{V}$。\n$i_{R_1} = \\dfrac{u_-}{R_1} = \\dfrac{0.15}{10^{4}} = 15\\ \\mu\\text{A}$。\n校验：$i_{R_f} = \\dfrac{u_o-u_-}{R_f} = \\dfrac{1.5-0.15}{90\\text{k}} = \\dfrac{1.35}{90\\text{k}} = 15\\ \\mu\\text{A}$ ✓，与 $i_{R_1}$ 相等。\n结论：$A_u = 10$，$u_o = 1.5\\ \\text{V}$；同相端不取电流，输入电阻趋于无穷，增益恒大于 1 且输出与输入同相。",
    difficulty: 3
  },
  {
    id: "QC-33", subject: "电路", type: "calc", kp: ["C12"], source: "自编·反相加法器", tag: "对应考点 C12",
    brief: "反相加法器，两路不同输入与权重，求输出电压与平衡电阻",
    stem: "理想运放构成反相加法器：$R_f = 20\\ \\text{k}\\Omega$ 跨接在反相端与输出端之间，$R_1 = 10\\ \\text{k}\\Omega$ 接 $u_1 = 1\\ \\text{V}$，$R_2 = 20\\ \\text{k}\\Omega$ 接 $u_2 = 2\\ \\text{V}$，同相端经平衡电阻 $R'$ 接地。求输出电压 $u_o$ 与平衡电阻 $R'$。",
    answerText: "$u_o = -4\\ \\text{V}$，$R' = 5\\ \\text{k}\\Omega$",
    solution: "思路：反相端为虚地，各输入支路电流在虚地点汇合后全部流入 $R_f$。\n对虚地点列 KCL：$\\dfrac{u_1}{R_1}+\\dfrac{u_2}{R_2}+\\dfrac{u_o}{R_f} = 0$。\n两路权重分别由 $R_f/R_k$ 决定：$\\dfrac{R_f}{R_1} = \\dfrac{20}{10} = 2$，$\\dfrac{R_f}{R_2} = \\dfrac{20}{20} = 1$。\n$u_o = -\\left(2\\times1+1\\times2\\right) = -4\\ \\text{V}$。\n平衡电阻：$R' = R_1\\parallel R_2\\parallel R_f = \\dfrac{1}{\\dfrac{1}{10}+\\dfrac{1}{20}+\\dfrac{1}{20}}\\ \\text{k}\\Omega = \\dfrac{1}{0.2}\\ \\text{k}\\Omega = 5\\ \\text{k}\\Omega$。\n校验：流入虚地点的总电流 $\\dfrac{1}{10\\text{k}}+\\dfrac{2}{20\\text{k}} = 100+100 = 200\\ \\mu\\text{A}$，而 $R_f$ 中电流 $\\dfrac{4}{20\\text{k}} = 200\\ \\mu\\text{A}$ ✓。\n结论：$u_o = -4\\ \\text{V}$，$R' = 5\\ \\text{k}\\Omega$；各路增益互不影响，可独立设计权重，这是加减运算电路的基础。",
    difficulty: 4
  },

  /* ---------------- C13 非线性电路 ---------------- */
  {
    id: "QC-34", subject: "电路", type: "calc", kp: ["C13"], source: "自编·非线性工作点", tag: "对应考点 C13",
    brief: "非线性电阻与线性电阻串联，求直流工作点与动态电阻",
    stem: "非线性电阻的伏安特性为 $u = i^{2}$（$u$ 以 V、$i$ 以 A 计，$i \\ge 0$），与线性电阻 $R = 1\\ \\Omega$ 串联接在 $12\\ \\text{V}$ 直流电源上。求直流工作点 $(I_Q,\\ U_Q)$、工作点处的动态电阻 $r_d$ 和静态电阻 $R_Q$，并说明工作点是否唯一。",
    answerText: "$I_Q = 3\\ \\text{A}$，$U_Q = 9\\ \\text{V}$，$r_d = 6\\ \\Omega$，$R_Q = 3\\ \\Omega$；工作点唯一",
    solution: "思路：工作点由外电路的负载线与非线性电阻的伏安特性交点确定，联立两方程求解。\n列方程：$Ri+u = 12$，即 $i+i^{2} = 12$。\n整理得 $i^{2}+i-12 = 0$，因式分解 $(i+4)(i-3) = 0$。\n按 $i \\ge 0$ 取根：$I_Q = 3\\ \\text{A}$，$U_Q = I_Q^{2} = 9\\ \\text{V}$。\n校验：$RI_Q+U_Q = 3+9 = 12\\ \\text{V}$ ✓，与电源电压相符。\n静态电阻 $R_Q = \\dfrac{U_Q}{I_Q} = \\dfrac{9}{3} = 3\\ \\Omega$（工作点与原点连线的斜率）。\n动态电阻 $r_d = \\left.\\dfrac{du}{di}\\right|_{I_Q} = 2I_Q = 6\\ \\Omega$（特性曲线切线斜率，用于小信号等效）。\n唯一性：函数 $i+i^{2}$ 在 $i\\ge0$ 上严格单调增，负载线 $u = 12-i$ 与特性曲线只有一个交点，故工作点唯一。\n结论：$I_Q = 3\\ \\text{A}$，$U_Q = 9\\ \\text{V}$，$R_Q = 3\\ \\Omega$，$r_d = 6\\ \\Omega$；串联正电阻保证工作点唯一，本题中 $r_d \\ne R_Q$ 说明特性非线性。",
    difficulty: 4
  },
  {
    id: "QC-35", subject: "电路", type: "calc", kp: ["C13"], source: "自编·分段线性化", tag: "对应考点 C13",
    brief: "分段线性化非线性电阻，用假设检验法求两种电源下的工作点",
    stem: "某非线性电阻的伏安特性为分段线性：$u<4\\ \\text{V}$ 时 $i = 0$；$u \\ge 4\\ \\text{V}$ 时 $u = 4+2i$（$u$ 以 V、$i$ 以 A 计）。它与 $R = 2\\ \\Omega$ 串联接直流电源 $U_S$。求 (1) $U_S = 12\\ \\text{V}$ 时的电流与非线性电阻电压；(2) $U_S = 3\\ \\text{V}$ 时的电流与电压；(3) 说明该特性可等效为哪些理想元件串联。",
    answerText: "(1) $i = 2\\ \\text{A}$，$u = 8\\ \\text{V}$；(2) $i = 0$，$u = 3\\ \\text{V}$；(3) 等效为理想二极管、$4\\ \\text{V}$ 理想电压源与 $2\\ \\Omega$ 电阻串联",
    solution: "思路：分段线性化后先假设工作在某一段，解出结果再检验是否落在该段范围内，不成立则换段。\n两段特性：$u<4\\ \\text{V}$ 时 $i = 0$（截止段）；$u\\ge4\\ \\text{V}$ 时 $i = \\dfrac{u-4}{2}$（导通段）。\n$U_S = 12\\ \\text{V}$：先设导通，$2i+4+2i = 12$，解得 $i = 2\\ \\text{A}$。\n对应 $u = 4+2\\times2 = 8\\ \\text{V}$，检验 $u = 8\\ \\text{V}\\ge4\\ \\text{V}$ ✓ 且 $i>0$ ✓，假设成立。\n$U_S = 3\\ \\text{V}$：若导通则 $i = \\dfrac{3-4}{4} = -0.25\\ \\text{A}<0$，与单向导电矛盾，故工作在截止段。\n截止时 $i = 0$，非线性电阻上电压 $u = U_S-Ri = 3\\ \\text{V}$，检验 $3\\ \\text{V}<4\\ \\text{V}$ ✓。\n转折电压 $4\\ \\text{V}$ 就是导通判据：$U_S\\le4\\ \\text{V}$ 时恒截止，$U_S>4\\ \\text{V}$ 时导通。\n等效模型：导通段 $u = 4+2i$ 说明该元件等效为理想二极管、$4\\ \\text{V}$ 理想电压源和 $2\\ \\Omega$ 电阻三者串联（类似发光二极管或稳压管的折线模型）。\n结论：(1) $i = 2\\ \\text{A}$、$u = 8\\ \\text{V}$；(2) $i = 0$、$u = 3\\ \\text{V}$；(3) 理想二极管 + $4\\ \\text{V}$ 源 + $2\\ \\Omega$ 串联。",
    difficulty: 5
  },
  {
    id: "QC-36", subject: "电路", type: "calc", kp: ["C13"], source: "自编·小信号分析", tag: "对应考点 C13",
    brief: "非线性电阻加直流偏置与小信号，求静态工作点与动态电阻",
    stem: "非线性电阻的伏安特性为 $i = \\dfrac{u^{2}}{8}$（$u\\ge0$，$u$ 以 V、$i$ 以 A 计），与 $R = 4\\ \\Omega$ 串联接直流电源 $E = 12\\ \\text{V}$。求静态工作点 $(U_Q,\\ I_Q)$ 和工作点处的动态电阻 $r_d$；若在电源上再叠加幅值为 $1\\ \\text{V}$ 的小信号 $u_s$，求非线性电阻上小信号电压与电流的幅值。",
    answerText: "$U_Q = 4\\ \\text{V}$，$I_Q = 2\\ \\text{A}$，$r_d = 1\\ \\Omega$；小信号 $\\Delta u = 0.2\\ \\text{V}$，$\\Delta i = 0.2\\ \\text{A}$",
    solution: "思路：先按直流大信号求静态工作点，再在该点线性化得到动态电阻，最后用小信号等效电路求解。\n直流方程：$Ri_Q+U_Q = E$，即 $4i+u = 12$，代入 $i = \\dfrac{u^{2}}{8}$ 得 $\\dfrac{u^{2}}{2}+u-12 = 0$。\n整理 $u^{2}+2u-24 = 0$，即 $(u+6)(u-4) = 0$，取 $u\\ge0$ 的根 $U_Q = 4\\ \\text{V}$。\n$I_Q = \\dfrac{U_Q^{2}}{8} = \\dfrac{16}{8} = 2\\ \\text{A}$，校验 $4\\times2+4 = 12\\ \\text{V}$ ✓。\n动态电导 $g_d = \\dfrac{di}{du} = \\dfrac{u}{4}$，在 $U_Q = 4\\ \\text{V}$ 处 $g_d = 1\\ \\text{S}$，故 $r_d = \\dfrac{1}{g_d} = 1\\ \\Omega$。\n小信号等效电路：$u_s$ 与 $R = 4\\ \\Omega$、$r_d = 1\\ \\Omega$ 串联，分压得 $\\Delta u = u_s\\dfrac{r_d}{R+r_d} = \\dfrac{1\\times1}{5} = 0.2\\ \\text{V}$。\n$\\Delta i = \\dfrac{\\Delta u}{r_d} = \\dfrac{0.2}{1} = 0.2\\ \\text{A}$，也可由 $\\dfrac{u_s}{R+r_d} = \\dfrac{1}{5} = 0.2\\ \\text{A}$ 直接得到 ✓。\n校验线性化条件：$\\Delta u = 0.2\\ \\text{V}$ 仅为 $U_Q = 4\\ \\text{V}$ 的 5%，小信号假设成立。\n结论：$U_Q = 4\\ \\text{V}$，$I_Q = 2\\ \\text{A}$，$r_d = 1\\ \\Omega$；小信号 $\\Delta u = 0.2\\ \\text{V}$、$\\Delta i = 0.2\\ \\text{A}$。",
    difficulty: 5
  },

  /* ---------------- C14 非正弦周期电流电路 ---------------- */
  {
    id: "QC-37", subject: "电路", type: "calc", kp: ["C14"], source: "自编·非正弦有效值", tag: "对应考点 C14",
    brief: "非正弦周期电压含直流与两个谐波，求有效值与平均值",
    stem: "非正弦周期电压 $u(t) = 100+141.4\\sin(\\omega t+30^\\circ)+70.7\\sin3\\omega t\\ \\text{V}$。求其有效值 $U$ 和平均值 $U_{av}$。",
    answerText: "$U = 150\\ \\text{V}$，$U_{av} = 100\\ \\text{V}$",
    solution: "思路：非正弦周期量的有效值等于直流分量与各次谐波有效值的平方和再开方，不同频率分量互不影响。\n直流分量 $U_0 = 100\\ \\text{V}$。\n基波幅值 $141.4 \\approx 100\\sqrt{2}$，故基波有效值 $U_1 = \\dfrac{141.4}{\\sqrt{2}} = 100\\ \\text{V}$。\n三次谐波幅值 $70.7 \\approx 50\\sqrt{2}$，故 $U_3 = \\dfrac{70.7}{\\sqrt{2}} = 50\\ \\text{V}$。\n$U = \\sqrt{U_0^{2}+U_1^{2}+U_3^{2}} = \\sqrt{100^{2}+100^{2}+50^{2}} = \\sqrt{22500}$。\n$U = 150\\ \\text{V}$。\n平均值（一个周期内的算术平均值）只由直流分量决定：$U_{av} = 100\\ \\text{V}$。\n注意：初相 $30^\\circ$ 不改变有效值，只影响波形在时间轴上的位置。\n结论：$U = 150\\ \\text{V}$，$U_{av} = 100\\ \\text{V}$；有效值不等于各分量幅值直接相加，必须按平方和开方。",
    difficulty: 3
  },
  {
    id: "QC-38", subject: "电路", type: "calc", kp: ["C14"], source: "自编·谐波叠加", tag: "对应考点 C14",
    brief: "直流与两个谐波共同作用的R-L电路，求电流有效值、功率与电感电压",
    stem: "非正弦电压 $u = 50+50\\sqrt{2}\\sin1000t+50\\sqrt{2}\\sin3000t\\ \\text{V}$ 加在 $R = 10\\ \\Omega$、$L = 10\\ \\text{mH}$ 的串联电路上。求电流有效值 $I$、平均功率 $P$ 和电感电压有效值 $U_L$。",
    answerText: "$I = \\sqrt{40} \\approx 6.32\\ \\text{A}$，$P = 400\\ \\text{W}$，$U_L \\approx 59.2\\ \\text{V}$",
    solution: "思路：直流、基波、三次谐波分别作用（叠加定理），各次按对应频率的阻抗求出电流后再合成有效值。\n直流分量：电感相当于短路，$I_0 = \\dfrac{U_0}{R} = \\dfrac{50}{10} = 5\\ \\text{A}$，$P_0 = I_0^{2}R = 250\\ \\text{W}$。\n基波（$\\omega = 1000$）：$X_{L1} = \\omega L = 10\\ \\Omega$，$|Z_1| = \\sqrt{10^{2}+10^{2}} = 10\\sqrt{2}\\ \\Omega$，$I_1 = \\dfrac{50}{10\\sqrt{2}} = 3.54\\ \\text{A}$。\n基波功率 $P_1 = I_1^{2}R = 12.5\\times10 = 125\\ \\text{W}$。\n三次谐波：$X_{L3} = 3\\omega L = 30\\ \\Omega$，$|Z_3| = \\sqrt{10^{2}+30^{2}} = 10\\sqrt{10}\\ \\Omega$，$I_3 = \\dfrac{50}{10\\sqrt{10}} = 1.58\\ \\text{A}$。\n三次谐波功率 $P_3 = I_3^{2}R = 2.5\\times10 = 25\\ \\text{W}$。\n$I = \\sqrt{I_0^{2}+I_1^{2}+I_3^{2}} = \\sqrt{25+12.5+2.5} = \\sqrt{40} \\approx 6.32\\ \\text{A}$。\n$P = 250+125+25 = 400\\ \\text{W}$，也等于 $I^{2}R = 40\\times10 = 400\\ \\text{W}$ ✓。\n电感电压：$U_L = \\sqrt{(X_{L1}I_1)^{2}+(X_{L3}I_3)^{2}} = \\sqrt{35.4^{2}+47.4^{2}} \\approx 59.2\\ \\text{V}$。\n校验：$U = \\sqrt{50^{2}+50^{2}+50^{2}} = 86.6\\ \\text{V}$，而 $\\sqrt{(IR)^{2}+U_L^{2}} = \\sqrt{63.2^{2}+59.2^{2}} \\approx 86.6\\ \\text{V}$ ✓。",
    difficulty: 4
  },

  /* ---------------- C15 三相电路 ---------------- */
  {
    id: "QC-39", subject: "电路", type: "calc", kp: ["C15"], source: "自编·二瓦计", tag: "对应考点 C15",
    brief: "对称三相三线制负载，求每相阻抗、三相功率与二瓦计读数",
    stem: "对称三相三线制电路，线电压 $U_l = 380\\ \\text{V}$，Y 形联接的对称感性负载，线电流 $I_l = 10\\ \\text{A}$，功率因数 $\\cos\\varphi = 0.866$。(1) 求每相阻抗 $Z$（极坐标与直角坐标）、三相有功功率 $P$、无功功率 $Q$ 与视在功率 $S$；(2) 用二瓦计法测量三相功率，求两表读数 $P_1$、$P_2$。",
    answerText: "$|Z| = 22\\ \\Omega$，$\\varphi = 30^\\circ$，$Z = 22\\angle30^\\circ = 19.1+j11\\ \\Omega$；$P = 5700\\ \\text{W}$，$Q \\approx 3291\\ \\text{var}$，$S \\approx 6582\\ \\text{VA}$；$P_1 = 3800\\ \\text{W}$，$P_2 = 1900\\ \\text{W}$",
    solution: "思路：Y 接时 $I_l = I_p$、$U_l = \\sqrt{3}U_p$；再用二瓦计两表读数与 $P$、$Q$ 的关系求解。\n相电压 $U_p = \\dfrac{U_l}{\\sqrt{3}} = 220\\ \\text{V}$，故 $|Z| = \\dfrac{U_p}{I_p} = \\dfrac{220}{10} = 22\\ \\Omega$。\n由 $\\cos\\varphi = 0.866$ 得 $\\varphi = 30^\\circ$（感性，电流滞后），$Z = 22\\angle30^\\circ = 19.1+j11\\ \\Omega$。\n$P = \\sqrt{3}U_lI_l\\cos\\varphi = 1.732\\times380\\times10\\times0.866 \\approx 5700\\ \\text{W}$。\n$Q = \\sqrt{3}U_lI_l\\sin\\varphi = 1.732\\times3800\\times0.5 \\approx 3291\\ \\text{var}$，$S = \\sqrt{3}U_lI_l \\approx 6582\\ \\text{VA}$。\n二瓦计：$P_1 = U_lI_l\\cos(\\varphi-30^\\circ) = 3800\\times\\cos0^\\circ = 3800\\ \\text{W}$。\n$P_2 = U_lI_l\\cos(\\varphi+30^\\circ) = 3800\\times\\cos60^\\circ = 1900\\ \\text{W}$。\n校验：$P_1+P_2 = 5700 = P$ ✓；$\\sqrt{3}(P_1-P_2) = 1.732\\times1900 \\approx 3291 = Q$ ✓。\n结论：$Z = 22\\angle30^\\circ\\ \\Omega$，$P = 5700\\ \\text{W}$，$S \\approx 6582\\ \\text{VA}$，$P_1 = 3800\\ \\text{W}$、$P_2 = 1900\\ \\text{W}$；两表读数之差反映无功，是二瓦计的核心判据。",
    difficulty: 4
  },
  {
    id: "QC-40", subject: "电路", type: "calc", kp: ["C15"], source: "自编·不对称三相", tag: "对应考点 C15",
    brief: "不对称三相四线制，求各相电流与中线电流，并分析中线断开后的位移",
    stem: "三相四线制电源相电压 $220\\ \\text{V}$，负载为纯电阻：$R_A = R_B = 22\\ \\Omega$，$R_C = 11\\ \\Omega$，中性线阻抗忽略。(1) 求各相电流与中性线电流 $I_N$；(2) 若中性线断开，求中性点位移电压 $U_{N'N}$ 及各相负载上的电压。",
    answerText: "$I_A = I_B = 10\\ \\text{A}$，$I_C = 20\\ \\text{A}$，$I_N = 10\\ \\text{A}$；中性线断开后 $U_{N'N} = 55\\ \\text{V}$（$\\angle120^\\circ$），$U_C' = 165\\ \\text{V}$，$U_A' = U_B' \\approx 252\\ \\text{V}$",
    solution: "思路：有中性线时各相彼此独立，按单相计算；中性线断开后用节点电压法求中性点位移。\n$I_A = \\dfrac{220}{22} = 10\\ \\text{A}$，$I_B = \\dfrac{220}{22} = 10\\ \\text{A}$，$I_C = \\dfrac{220}{11} = 20\\ \\text{A}$，均与各自相电压同相。\n$\\dot I_N = \\dot I_A+\\dot I_B+\\dot I_C = 10\\angle0^\\circ+10\\angle{-120^\\circ}+20\\angle120^\\circ$。\n实部 $10-5-10 = -5$，虚部 $0-8.66+17.32 = 8.66$，故 $\\dot I_N = -5+j8.66 = 10\\angle120^\\circ\\ \\text{A}$，即 $I_N = 10\\ \\text{A}$。\n中性线断开：$\\dot U_{N'N} = \\dfrac{\\sum\\dot U_kY_k}{\\sum Y_k}$，其中 $Y_A = Y_B = \\dfrac{1}{22}\\ \\text{S}$，$Y_C = \\dfrac{1}{11}\\ \\text{S}$。\n分子 $= \\dfrac{\\dot U_A+\\dot U_B}{22}+\\dfrac{\\dot U_C}{11} = -\\dfrac{\\dot U_C}{22}+\\dfrac{2\\dot U_C}{22} = \\dfrac{\\dot U_C}{22}$，分母 $= \\dfrac{4}{22}$，故 $\\dot U_{N'N} = \\dfrac{\\dot U_C}{4} = 55\\angle120^\\circ\\ \\text{V}$，即 $U_{N'N} = 55\\ \\text{V}$。\n$\\dot U_C' = \\dot U_C-\\dot U_{N'N} = 220\\angle120^\\circ-55\\angle120^\\circ = 165\\angle120^\\circ\\ \\text{V}$，即 $U_C' = 165\\ \\text{V}$（欠压）。\n$\\dot U_A' = 220-55\\angle120^\\circ = 247.5-j47.6\\ \\text{V}$，$|\\dot U_A'| = \\sqrt{247.5^{2}+47.6^{2}} \\approx 252\\ \\text{V}$，同理 $|\\dot U_B'| \\approx 252\\ \\text{V}$（过压）。\n结论：$I_N = 10\\ \\text{A}$；断中性线后中性点位移 $55\\ \\text{V}$，C 相降至 $165\\ \\text{V}$、A、B 相升至约 $252\\ \\text{V}$，故三相四线制的中性线上不允许装熔断器或开关。",
    difficulty: 5
  }

]);