/* 电路 · 计算题（第二批，C1~C8 考点） */
window.QUESTIONS = (window.QUESTIONS || []).concat([
  /* ---------- C1 电路元件与基本定律 ---------- */
  {
    id: "QC-01", subject: "电路", type: "calc", kp: ["C1"],
    source: "自编·单节点 KCL 与功率平衡", tag: "对应考点 C1",
    brief: "单节点电路，用 KCL 求节点电压并校验功率平衡",
    stem: "电路：$10\\ \\text{V}$ 电压源经 $R_1 = 2\\ \\Omega$ 接到节点 A；A 再经 $R_2 = 3\\ \\Omega$、$R_3 = 6\\ \\Omega$ 两条支路接地；另有 $2\\ \\text{A}$ 理想电流源由地流入节点 A。求节点电压 $u_A$ 与三条支路电流（均取流入 A 为正），并校验功率平衡。",
    answerText: "$$u_A = 7\\ \\text{V},\\quad i_1 = \\frac{10-7}{2} = 1.5\\ \\text{A},\\quad i_2 = \\frac{7}{3}\\ \\text{A},\\quad i_3 = \\frac{7}{6}\\ \\text{A}$$\n两电源共发出 $15 + 14 = 29\\ \\text{W}$，三电阻共吸收 $4.5 + 16.33 + 8.17 = 29\\ \\text{W}$。",
    solution: "**思路**：A 是唯一未知节点，对 A 列一个 KCL 即可，再用功率平衡验算。\n\n**① 列 KCL**（流出 A 为正，电流源流入故取负号）：\n$$\\frac{u_A-10}{2} + \\frac{u_A}{3} + \\frac{u_A}{6} - 2 = 0$$\n\n**② 解方程**：两边同乘 6\n$$3(u_A-10) + 2u_A + u_A = 12 \\;\\Rightarrow\\; 6u_A = 42 \\;\\Rightarrow\\; u_A = 7\\ \\text{V}$$\n\n**③ 各支路电流**：\n$$i_1 = \\frac{10-7}{2} = 1.5\\ \\text{A},\\quad i_2 = \\frac{7}{3} \\approx 2.333\\ \\text{A},\\quad i_3 = \\frac{7}{6} \\approx 1.167\\ \\text{A}$$\n校验：$1.5 + 2 = 3.5$，而 $\\frac{7}{3} + \\frac{7}{6} = \\frac{14+7}{6} = 3.5$，KCL 成立。\n\n**④ 功率校验**：电压源 $P = 10 \\times 1.5 = 15\\ \\text{W}$ 发出；电流源 $P = 7 \\times 2 = 14\\ \\text{W}$ 发出。\n电阻 $P_1 = 1.5^2 \\times 2 = 4.5\\ \\text{W}$，$P_2 = \\left(\\frac{7}{3}\\right)^2 \\times 3 = \\frac{49}{3} \\approx 16.33\\ \\text{W}$，$P_3 = \\left(\\frac{7}{6}\\right)^2 \\times 6 = \\frac{49}{6} \\approx 8.17\\ \\text{W}$。\n\n**结论**：$u_A = 7\\ \\text{V}$；发出 $29\\ \\text{W}$ 与吸收 $4.5+16.33+8.17 = 29\\ \\text{W}$ 相等，结果自洽。",
    difficulty: 2
  },
  {
    id: "QC-02", subject: "电路", type: "calc", kp: ["C1"],
    source: "自编·单回路 KVL 与电源功率", tag: "对应考点 C1",
    brief: "两电压源反向串联，求回路电流并判断各电源吸收或发出",
    stem: "单回路电路：左侧支路为 $12\\ \\text{V}$ 电压源（$+$ 端朝上），右侧支路为 $6\\ \\text{V}$ 电压源（$+$ 端也朝上），上边导线接 $R_1 = 2\\ \\Omega$，下边导线接 $R_2 = 4\\ \\Omega$，四者构成闭合回路。求回路电流 $i$，并判断两个电源各自是发出还是吸收功率、数值多少。",
    answerText: "$$i = \\frac{12-6}{2+4} = 1\\ \\text{A}$$\n方向为顺时针（自 $12\\ \\text{V}$ 源 $+$ 端流出）。$12\\ \\text{V}$ 源发出 $12\\ \\text{W}$；$6\\ \\text{V}$ 源吸收 $6\\ \\text{W}$；$R_1$ 吸收 $2\\ \\text{W}$，$R_2$ 吸收 $4\\ \\text{W}$。",
    solution: "**思路**：两源极性同向朝上，但在回路中一升一降，沿顺时针方向列一个 KVL 即可。\n\n**① 列 KVL**（设 $i$ 顺时针，左支路自下而上穿过 $12\\ \\text{V}$ 源为电压升 $12\\ \\text{V}$，右支路自上而下穿过 $6\\ \\text{V}$ 源为电压降 $6\\ \\text{V}$）：\n$$-12 + 2i + 6 + 4i = 0 \\;\\Rightarrow\\; 6i = 6 \\;\\Rightarrow\\; i = 1\\ \\text{A}$$\n\n**② 判断电源功率**：电流 $1\\ \\text{A}$ 从 $12\\ \\text{V}$ 源的 $+$ 端流出，故它发出 $P = 12 \\times 1 = 12\\ \\text{W}$；\n电流 $1\\ \\text{A}$ 从 $6\\ \\text{V}$ 源的 $+$ 端流入，故它吸收 $P = 6 \\times 1 = 6\\ \\text{W}$（相当于被充电）。\n\n**③ 电阻功率**：$P_{R1} = i^2 R_1 = 1^2 \\times 2 = 2\\ \\text{W}$，$P_{R2} = 1^2 \\times 4 = 4\\ \\text{W}$。\n\n**④ 校验**：发出 $12\\ \\text{W}$ = 吸收 $6 + 2 + 4 = 12\\ \\text{W}$，功率平衡。\n\n**结论**：$i = 1\\ \\text{A}$ 顺时针；$6\\ \\text{V}$ 源吸收 $6\\ \\text{W}$，$12\\ \\text{V}$ 源发出 $12\\ \\text{W}$。",
    difficulty: 2
  },
  /* ---------- C2 等效变换、串并联、Y-Δ ---------- */
  {
    id: "QC-03", subject: "电路", type: "calc", kp: ["C2"],
    source: "自编·混联网络等效电阻", tag: "对应考点 C2",
    brief: "五电阻混联网络，逐步化简求端口等效电阻",
    stem: "端口 a、b 之间接如下网络：$R_1 = 4\\ \\Omega$ 与（$R_2 = 6\\ \\Omega$ 并联 $R_3 = 12\\ \\Omega$）串联，再与 $R_4 = 8\\ \\Omega$ 并联，最后串联 $R_5 = 2\\ \\Omega$。求端口等效电阻 $R_{ab}$。",
    answerText: "$$R_{ab} = 6\\ \\Omega$$\n化简链：$6 \\parallel 12 = 4$，$4+4 = 8$，$8 \\parallel 8 = 4$，$4+2 = 6$。",
    solution: "**思路**：从最里层括号开始，先并后串，一层层化简到端口。\n\n**① 最内层并联**：\n$$R_2 \\parallel R_3 = \\frac{6 \\times 12}{6+12} = \\frac{72}{18} = 4\\ \\Omega$$\n\n**② 与 $R_1$ 串联**：\n$$R_{13} = R_1 + 4 = 4 + 4 = 8\\ \\Omega$$\n\n**③ 与 $R_4$ 并联**：\n$$R_{134} = \\frac{8 \\times 8}{8+8} = 4\\ \\Omega$$\n\n**④ 再串 $R_5$**：\n$$R_{ab} = 4 + 2 = 6\\ \\Omega$$\n\n**结论**：$R_{ab} = 6\\ \\Omega$。注意并联时分子是两电阻之积、分母是两电阻之和，同名端不接错顺序即可。",
    difficulty: 3
  },
  {
    id: "QC-04", subject: "电路", type: "calc", kp: ["C2"],
    source: "自编·电源等效变换化简", tag: "对应考点 C2",
    brief: "电压源与电流源并联化简，求负载电流电压与功率",
    stem: "$12\\ \\text{V}$ 电压源（$+$ 端朝上）与 $R_1 = 4\\ \\Omega$ 串联后，与 $6\\ \\text{A}$ 理想电流源（方向向上）并联，组成有源二端网络；其两端再接负载 $R_L = 8\\ \\Omega$。求负载电流 $i$、负载电压 $u$、负载功率，并说明 $12\\ \\text{V}$ 源与 $6\\ \\text{A}$ 源各发出或吸收多少功率。",
    answerText: "$$i = 3\\ \\text{A},\\qquad u = 24\\ \\text{V},\\qquad P_L = 72\\ \\text{W}$$\n$6\\ \\text{A}$ 源发出 $144\\ \\text{W}$；$12\\ \\text{V}$ 源吸收 $36\\ \\text{W}$；$R_1$ 吸收 $36\\ \\text{W}$。",
    solution: "**思路**：先用电源等效把「电压源串电阻」化为「电流源并电阻」，与 $6\\ \\text{A}$ 源合并，再化回电压源形式接负载。\n\n**① 电压源变电流源**：$12\\ \\text{V}$ 串 $4\\ \\Omega$ 化为 $i_s = 12/4 = 3\\ \\text{A}$ 与 $4\\ \\Omega$ 并联（方向向上）。\n\n**② 电流源合并**：两个电流源同向，$i_s' = 3 + 6 = 9\\ \\text{A}$，并联电阻仍为 $4\\ \\Omega$。\n\n**③ 化回电压源**：$9\\ \\text{A} \\parallel 4\\ \\Omega \\;\\Rightarrow\\; 9 \\times 4 = 36\\ \\text{V}$ 串 $4\\ \\Omega$。\n\n**④ 接负载求解**：\n$$i = \\frac{36}{4+8} = 3\\ \\text{A},\\qquad u = 3 \\times 8 = 24\\ \\text{V},\\qquad P_L = 24 \\times 3 = 72\\ \\text{W}$$\n\n**⑤ 功率核对**：$6\\ \\text{A}$ 源端电压 $24\\ \\text{V}$，电流从 $+$ 端流出，发出 $24 \\times 6 = 144\\ \\text{W}$；\n$12\\ \\text{V}$ 源中电流为 $(24-12)/4 = 3\\ \\text{A}$ 且从 $+$ 端流入，吸收 $36\\ \\text{W}$；$R_1$ 吸收 $3^2 \\times 4 = 36\\ \\text{W}$，负载 $72\\ \\text{W}$。\n\n**结论**：$144 = 36 + 36 + 72$，功率平衡；负载电流 $3\\ \\text{A}$、电压 $24\\ \\text{V}$。",
    difficulty: 3
  },
  /* ---------- C3 网孔电流法与节点电压法 ---------- */
  {
    id: "QC-05", subject: "电路", type: "calc", kp: ["C3"],
    source: "自编·两节点节点电压法", tag: "对应考点 C3",
    brief: "两节点电路，用节点电压法求两节点电压与支路电流",
    stem: "$12\\ \\text{V}$ 电压源经 $R_1 = 2\\ \\Omega$ 接到节点 1；节点 1 经 $R_2 = 2\\ \\Omega$ 接节点 2、经 $R_3 = 4\\ \\Omega$ 接地；节点 2 经 $R_4 = 2\\ \\Omega$ 接地，并有 $2\\ \\text{A}$ 电流源由地注入节点 2。用节点电压法求 $u_1$、$u_2$ 及各支路电流。",
    answerText: "$$u_1 = 7\\ \\text{V},\\qquad u_2 = 5.5\\ \\text{V}$$\n$i_{R1} = 2.5\\ \\text{A}$（流入节点 1），$i_{R2} = 0.75\\ \\text{A}$，$i_{R3} = 1.75\\ \\text{A}$，$i_{R4} = 2.75\\ \\text{A}$。",
    solution: "**思路**：取地为参考点，只有两个独立节点，列两个节点方程即可（电压源串电阻按「电压源/电阻」并入自导项）。\n\n**① 节点 1 方程**：\n$$\\left(\\frac12+\\frac12+\\frac14\\right)u_1 - \\frac12 u_2 = \\frac{12}{2}$$\n即 $1.25u_1 - 0.5u_2 = 6$，两边乘 4：$5u_1 - 2u_2 = 24$。\n\n**② 节点 2 方程**（电流源注入，移到等号右边）：\n$$-\\frac12 u_1 + \\left(\\frac12+\\frac12\\right)u_2 = 2$$\n即 $-u_1 + 2u_2 = 4$。\n\n**③ 联立求解**：两式相加得 $4u_1 = 28$，故\n$$u_1 = 7\\ \\text{V},\\qquad u_2 = \\frac{4+7}{2} = 5.5\\ \\text{V}$$\n\n**④ 支路电流**：\n$$i_{R1} = \\frac{12-7}{2} = 2.5\\ \\text{A},\\quad i_{R2} = \\frac{7-5.5}{2} = 0.75\\ \\text{A},\\quad i_{R3} = \\frac{7}{4} = 1.75\\ \\text{A},\\quad i_{R4} = \\frac{5.5}{2} = 2.75\\ \\text{A}$$\n\n**⑤ 校验**：节点 1 处 $2.5 = 0.75 + 1.75$ ✓；节点 2 处 $0.75 + 2 = 2.75$ ✓。\n\n**结论**：$u_1 = 7\\ \\text{V}$，$u_2 = 5.5\\ \\text{V}$，各支路电流如上。",
    difficulty: 4
  },
  {
    id: "QC-06", subject: "电路", type: "calc", kp: ["C3"],
    source: "自编·双网孔网孔电流法", tag: "对应考点 C3",
    brief: "双网孔含两个电压源，用网孔电流法求网孔电流",
    stem: "双网孔电路：左网孔含 $8\\ \\text{V}$ 电压源（沿顺时针方向为电压升）与 $R_1 = 2\\ \\Omega$，两网孔公共支路为 $R_2 = 4\\ \\Omega$；右网孔含 $R_3 = 6\\ \\Omega$ 与 $2\\ \\text{V}$ 电压源（沿顺时针网孔电流 $i_2$ 的方向为电压升）。用网孔电流法求 $i_1$、$i_2$、公共支路 $R_2$ 中的电流及 $R_2$ 两端电压。",
    answerText: "$$i_1 = 2\\ \\text{A},\\qquad i_2 = 1\\ \\text{A}$$\n公共支路电流 $i_1 - i_2 = 1\\ \\text{A}$（方向同 $i_1$），$u_{R2} = 4\\ \\text{V}$。",
    solution: "**思路**：设两网孔电流均为顺时针，自阻、互阻代入标准方程；与网孔电流同向的电压源作电压升写在等号右边。\n\n**① 左网孔（自阻 $2+4$）**：\n$$(2+4)i_1 - 4i_2 = 8 \\;\\Rightarrow\\; 6i_1 - 4i_2 = 8$$\n\n**② 右网孔（自阻 $4+6$，$2\\ \\text{V}$ 源升写在右边）**：\n$$-4i_1 + (4+6)i_2 = 2 \\;\\Rightarrow\\; -4i_1 + 10i_2 = 2$$\n\n**③ 联立求解**：由第一式 $3i_1 - 2i_2 = 4$，得 $i_1 = \\frac{4+2i_2}{3}$，代入第二式：\n$$-4 \\cdot \\frac{4+2i_2}{3} + 10i_2 = 2 \\;\\Rightarrow\\; -16 - 8i_2 + 30i_2 = 6 \\;\\Rightarrow\\; 22i_2 = 22$$\n$$i_2 = 1\\ \\text{A},\\qquad i_1 = \\frac{4+2}{3} = 2\\ \\text{A}$$\n\n**④ 公共支路与电压**：$i_{R2} = i_1 - i_2 = 1\\ \\text{A}$，$u_{R2} = 4 \\times 1 = 4\\ \\text{V}$。\n\n**⑤ 功率校验**：$8\\ \\text{V}$ 源发出 $8 \\times 2 = 16\\ \\text{W}$，$2\\ \\text{V}$ 源发出 $2 \\times 1 = 2\\ \\text{W}$，共 $18\\ \\text{W}$；电阻吸收 $2^2 \\times 2 + 1^2 \\times 4 + 1^2 \\times 6 = 4+4+6 = 18\\ \\text{W}$ ✓\n\n**结论**：$i_1 = 2\\ \\text{A}$，$i_2 = 1\\ \\text{A}$，$R_2$ 中电流 $1\\ \\text{A}$、电压 $4\\ \\text{V}$。",
    difficulty: 4
  },
  {
    id: "QC-07", subject: "电路", type: "calc", kp: ["C3"],
    source: "自编·超节点法处理理想电压源", tag: "对应考点 C3",
    brief: "理想电压源跨接两节点，用超节点法求节点电压与源电流",
    stem: "$12\\ \\text{V}$ 理想电压源接在节点 1（$+$ 端）与节点 2（$-$ 端）之间；节点 1 经 $R_1 = 2\\ \\Omega$ 接地，节点 2 经 $R_2 = 4\\ \\Omega$ 接地；另有 $3\\ \\text{A}$ 电流源由地注入节点 1。求 $u_1$、$u_2$ 及流过 $12\\ \\text{V}$ 源的电流（说明方向），并校验功率。",
    answerText: "$$u_1 = 8\\ \\text{V},\\qquad u_2 = -4\\ \\text{V}$$\n流过 $12\\ \\text{V}$ 源的电流为 $1\\ \\text{A}$，方向由节点 2 经电源内部流向节点 1（电源发出 $12\\ \\text{W}$）。",
    solution: "**思路**：理想电压源跨接在两个非参考节点之间，把节点 1、2 合并成一个超节点列 KCL，再加电压源约束方程。\n\n**① 电压源约束**：\n$$u_1 - u_2 = 12$$\n\n**② 超节点 KCL**（把 1、2 看成整体，$3\\ \\text{A}$ 注入，两电阻流出）：\n$$\\frac{u_1}{2} + \\frac{u_2}{4} = 3$$\n\n**③ 代入消元**：令 $u_1 = u_2 + 12$，\n$$\\frac{u_2+12}{2} + \\frac{u_2}{4} = 3 \\;\\Rightarrow\\; 2u_2 + 24 + u_2 = 12 \\;\\Rightarrow\\; 3u_2 = -12$$\n$$u_2 = -4\\ \\text{V},\\qquad u_1 = 8\\ \\text{V}$$\n\n**④ 求电源电流**：对节点 2 列 KCL，$R_2$ 中电流 $u_2/4 = -1\\ \\text{A}$（即 $1\\ \\text{A}$ 由地流入节点 2），这 $1\\ \\text{A}$ 只能经电源流向节点 1，故电源电流 $1\\ \\text{A}$ 由节点 2 流向节点 1。\n\n**⑤ 校验**：$3\\ \\text{A}$ 源发出 $3 \\times 8 = 24\\ \\text{W}$，$12\\ \\text{V}$ 源发出 $12 \\times 1 = 12\\ \\text{W}$，共 $36\\ \\text{W}$；$R_1$ 吸收 $8^2/2 = 32\\ \\text{W}$，$R_2$ 吸收 $4^2/4 = 4\\ \\text{W}$，共 $36\\ \\text{W}$ ✓\n\n**结论**：$u_1 = 8\\ \\text{V}$，$u_2 = -4\\ \\text{V}$，电源电流 $1\\ \\text{A}$（节点 2 → 节点 1）。",
    difficulty: 5
  },
  /* ---------- C4 电路定理 ---------- */
  {
    id: "QC-08", subject: "电路", type: "calc", kp: ["C4"],
    source: "自编·叠加定理求支路电流", tag: "对应考点 C4",
    brief: "电压源与电流源共同作用，用叠加定理求支路电流",
    stem: "$12\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 2\\ \\Omega$ 接到节点 A；A 经 $R_2 = 4\\ \\Omega$ 接地；同时有 $2\\ \\text{A}$ 电流源由地注入节点 A。用叠加定理求 $R_2$ 中的电流 $i$（取由 A 流向地为正），并用节点电压法校验。",
    answerText: "$$i = 2 + \\frac{2}{3} = \\frac{8}{3}\\ \\text{A} \\approx 2.667\\ \\text{A}$$\n此时 $u_A = \\frac{32}{3}\\ \\text{V} \\approx 10.67\\ \\text{V}$。",
    solution: "**思路**：分别让一个电源单独作用（另一电源置零：电压源短路、电流源开路），再把两次结果按参考方向代数相加。\n\n**① $12\\ \\text{V}$ 源单独作用**（$2\\ \\text{A}$ 源开路）：\n$$u_A' = 12 \\times \\frac{4}{2+4} = 8\\ \\text{V},\\qquad i' = \\frac{8}{4} = 2\\ \\text{A}$$\n\n**② $2\\ \\text{A}$ 源单独作用**（$12\\ \\text{V}$ 源短路，$R_1 \\parallel R_2$）：\n$$u_A'' = 2 \\times (2 \\parallel 4) = 2 \\times \\frac{8}{6} = \\frac{8}{3}\\ \\text{V},\\qquad i'' = \\frac{u_A''}{4} = \\frac{2}{3}\\ \\text{A}$$\n\n**③ 叠加**：\n$$i = i' + i'' = 2 + \\frac{2}{3} = \\frac{8}{3}\\ \\text{A} \\approx 2.667\\ \\text{A}$$\n\n**④ 节点电压法校验**：\n$$\\frac{u_A - 12}{2} + \\frac{u_A}{4} = 2 \\;\\Rightarrow\\; 2u_A - 24 + u_A = 8 \\;\\Rightarrow\\; u_A = \\frac{32}{3}\\ \\text{V}$$\n$$i = \\frac{u_A}{4} = \\frac{8}{3}\\ \\text{A}$$\n两种方法一致。\n\n**结论**：$i = \\frac{8}{3}\\ \\text{A} \\approx 2.667\\ \\text{A}$，其中电压源贡献 $2\\ \\text{A}$、电流源贡献 $\\frac{2}{3}\\ \\text{A}$。",
    difficulty: 3
  },
  {
    id: "QC-09", subject: "电路", type: "calc", kp: ["C4"],
    source: "自编·戴维南等效", tag: "对应考点 C4",
    brief: "含电压源与电流源的二端网络，求戴维南等效电路",
    stem: "二端网络：$24\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 6\\ \\Omega$ 接节点 a；a 经 $R_2 = 6\\ \\Omega$ 接节点 b（b 为参考点）；另有 $3\\ \\text{A}$ 电流源由 b 注入 a。求 a、b 端的开路电压 $U_{oc}$ 与等效电阻 $R_{eq}$，并写出等效电路。",
    answerText: "$$U_{oc} = 21\\ \\text{V},\\qquad R_{eq} = 3\\ \\Omega$$\n等效电路：$21\\ \\text{V}$ 电压源串 $3\\ \\Omega$ 电阻（$+$ 端接 a）。",
    solution: "**思路**：开路电压用节点法（端口开路，a 点 KCL）；等效电阻令所有独立源置零后从端口看进去。\n\n**① 求 $U_{oc}$**：端口开路时 $u_a = U_{oc}$，对 a 列 KCL：\n$$\\frac{u_a - 24}{6} + \\frac{u_a}{6} - 3 = 0 \\;\\Rightarrow\\; u_a - 24 + u_a = 18 \\;\\Rightarrow\\; 2u_a = 42$$\n$$U_{oc} = u_a = 21\\ \\text{V}$$\n\n**② 求 $R_{eq}$**：$24\\ \\text{V}$ 源短路、$3\\ \\text{A}$ 源开路，从 a、b 看进去是 $R_1$ 与 $R_2$ 并联：\n$$R_{eq} = 6 \\parallel 6 = 3\\ \\Omega$$\n\n**③ 校验**：接 $R_L = 3\\ \\Omega$ 时 $i_L = 21/6 = 3.5\\ \\text{A}$。用原电路核对：$u_a$ 满足 $\\frac{u_a-24}{6} + \\frac{u_a}{6} + \\frac{u_a}{3} = 3$，即 $u_a - 24 + u_a + 2u_a = 18$，$4u_a = 42$，$u_a = 10.5\\ \\text{V}$，$i_L = 10.5/3 = 3.5\\ \\text{A}$ ✓\n\n**④ 说明**：求 $R_{eq}$ 时电压源短路、电流源开路，受控源则必须保留（本题无受控源）。\n\n**结论**：$U_{oc} = 21\\ \\text{V}$，$R_{eq} = 3\\ \\Omega$，等效为 $21\\ \\text{V}$ 串 $3\\ \\Omega$。",
    difficulty: 3
  },
  {
    id: "QC-10", subject: "电路", type: "calc", kp: ["C4"],
    source: "自编·诺顿等效与短路电流", tag: "对应考点 C4",
    brief: "含电流源的三支路网络，求诺顿等效与短路电流",
    stem: "二端网络：$12\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 6\\ \\Omega$ 接节点 a；a 经 $R_2 = 3\\ \\Omega$、$R_3 = 6\\ \\Omega$ 两条支路接参考点 b；另有 $4\\ \\text{A}$ 电流源由 b 注入 a。求短路电流 $I_{sc}$、等效电阻 $R_{eq}$ 与开路电压 $U_{oc}$。",
    answerText: "$$I_{sc} = 6\\ \\text{A},\\qquad R_{eq} = 1.5\\ \\Omega,\\qquad U_{oc} = 9\\ \\text{V}$$\n且 $U_{oc} = I_{sc} R_{eq} = 6 \\times 1.5 = 9\\ \\text{V}$ ✓",
    solution: "**思路**：先求开路电压（节点法），再求等效电阻（独立源置零），最后用 $I_{sc} = U_{oc}/R_{eq}$ 得短路电流；也可直接短接端口验算。\n\n**① 求 $U_{oc}$**（端口开路，对 a 列 KCL）：\n$$\\frac{u_a - 12}{6} + \\frac{u_a}{3} + \\frac{u_a}{6} - 4 = 0 \\;\\Rightarrow\\; u_a - 12 + 2u_a + u_a = 24$$\n$$4u_a = 36 \\;\\Rightarrow\\; U_{oc} = 9\\ \\text{V}$$\n\n**② 求 $R_{eq}$**：电压源短路、电流源开路，三条支路并联：\n$$R_{eq} = 6 \\parallel 3 \\parallel 6 = \\frac{1}{\\frac16+\\frac13+\\frac16} = \\frac{1}{\\frac23} = 1.5\\ \\Omega$$\n\n**③ 求 $I_{sc}$**：\n$$I_{sc} = \\frac{U_{oc}}{R_{eq}} = \\frac{9}{1.5} = 6\\ \\text{A}$$\n\n**④ 直接验算**：把 a、b 短接，$R_2$、$R_3$ 被短路，$12\\ \\text{V}$ 源经 $R_1$ 提供 $12/6 = 2\\ \\text{A}$，加上 $4\\ \\text{A}$ 电流源，共 $I_{sc} = 6\\ \\text{A}$ ✓\n\n**结论**：诺顿等效为 $6\\ \\text{A}$ 电流源并 $1.5\\ \\Omega$；开路电压 $9\\ \\text{V}$。",
    difficulty: 4
  },
  {
    id: "QC-11", subject: "电路", type: "calc", kp: ["C4"],
    source: "自编·最大功率传输", tag: "对应考点 C4",
    brief: "有源二端网络接可变负载，求最大功率条件与最大功率",
    stem: "$24\\ \\text{V}$ 电压源（$+$ 端朝上）与 $R_1 = 6\\ \\Omega$ 串联，再与 $2\\ \\text{A}$ 电流源（方向向上）及 $R_2 = 6\\ \\Omega$ 并联，构成有源二端网络；负载 $R_L$ 接在其两端。求 $R_L$ 为多大时获得最大功率，并求此最大功率 $P_{max}$。",
    answerText: "$$R_L = R_{eq} = 3\\ \\Omega,\\qquad P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{18^2}{4 \\times 3} = 27\\ \\text{W}$$\n其中 $U_{oc} = 18\\ \\text{V}$，$R_{eq} = 3\\ \\Omega$。",
    solution: "**思路**：先做戴维南等效求 $U_{oc}$、$R_{eq}$，再用最大功率条件 $R_L = R_{eq}$ 与 $P_{max} = U_{oc}^2/(4R_{eq})$。\n\n**① 电源等效化简**：$24\\ \\text{V}$ 串 $6\\ \\Omega$ 化为 $4\\ \\text{A} \\parallel 6\\ \\Omega$；与 $2\\ \\text{A}$ 同向合并为 $6\\ \\text{A} \\parallel 6\\ \\Omega$。\n\n**② 并入 $R_2$**：$R_{eq} = 6 \\parallel 6 = 3\\ \\Omega$，开路电压\n$$U_{oc} = 6 \\times 3 = 18\\ \\text{V}$$\n\n**③ 最大功率条件**：$R_L = R_{eq} = 3\\ \\Omega$ 时负载获得最大功率。\n\n**④ 最大功率**：负载电压 $u_L = 18/2 = 9\\ \\text{V}$，电流 $i_L = 3\\ \\text{A}$，\n$$P_{max} = \\frac{U_{oc}^2}{4R_{eq}} = \\frac{324}{12} = 27\\ \\text{W}$$\n\n**⑤ 校验**：$R_L = 3\\ \\Omega$ 时总电流 $18/(3+3) = 3\\ \\text{A}$，$P_L = 3^2 \\times 3 = 27\\ \\text{W}$ ✓\n\n**结论**：$R_L = 3\\ \\Omega$ 时获得最大功率 $27\\ \\text{W}$。",
    difficulty: 5
  },
  /* ---------- C5 含受控源电路 ---------- */
  {
    id: "QC-12", subject: "电路", type: "calc", kp: ["C5"],
    source: "自编·含压控电压源电路", tag: "对应考点 C5",
    brief: "含压控电压源电路，求两节点电压与受控源功率",
    stem: "$20\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 4\\ \\Omega$ 接节点 A；A 经 $R_2 = 4\\ \\Omega$ 接地，又经 $R_3 = 4\\ \\Omega$ 接节点 B；B 经压控电压源 $0.5u_A$（$+$ 端在 B）接地，控制量为 $u_A$。求 $u_A$、$u_B$、$R_3$ 中的电流及受控源吸收（或发出）的功率。",
    answerText: "$$u_A = 8\\ \\text{V},\\qquad u_B = 0.5u_A = 4\\ \\text{V}$$\n$R_3$ 中电流 $1\\ \\text{A}$（由 A 流向 B）；受控源吸收 $4\\ \\text{W}$。",
    solution: "**思路**：受控源先按独立源对待，把控制量 $u_B = 0.5u_A$ 代入节点方程，最后只剩一个未知量 $u_A$。\n\n**① 控制关系**：\n$$u_B = 0.5u_A$$\n\n**② 对节点 A 列 KCL**（流入 $R_1$、$R_2$、$R_3$ 的电流代数和为零）：\n$$\\frac{u_A - 20}{4} + \\frac{u_A}{4} + \\frac{u_A - u_B}{4} = 0$$\n\n**③ 代入 $u_B$ 求解**：两边乘 4，\n$$u_A - 20 + u_A + u_A - 0.5u_A = 0 \\;\\Rightarrow\\; 2.5u_A = 20 \\;\\Rightarrow\\; u_A = 8\\ \\text{V}$$\n$$u_B = 0.5 \\times 8 = 4\\ \\text{V}$$\n\n**④ 支路电流**：$R_3$ 中电流 $\\frac{u_A - u_B}{R_3} = \\frac{8-4}{4} = 1\\ \\text{A}$（A → B）；\n$R_1$ 中 $\\frac{20-8}{4} = 3\\ \\text{A}$，$R_2$ 中 $\\frac{8}{4} = 2\\ \\text{A}$，节点 A 处 $3 = 2 + 1$ ✓\n\n**⑤ 受控源功率**：$1\\ \\text{A}$ 由 B 流入受控源 $+$ 端，与端电压 $u_B = 4\\ \\text{V}$ 关联，故\n$$P = u_B \\times 1 = 4\\ \\text{W} > 0$$\n即吸收 $4\\ \\text{W}$。\n\n**⑥ 功率校验**：$20\\ \\text{V}$ 源发出 $60\\ \\text{W}$；吸收为 $R_1$ 的 $9 \\times 4 = 36\\ \\text{W}$、$R_2$ 的 $4 \\times 4 = 16\\ \\text{W}$、$R_3$ 的 $1^2 \\times 4 = 4\\ \\text{W}$、受控源 $4\\ \\text{W}$，合计 $60\\ \\text{W}$ ✓\n\n**结论**：$u_A = 8\\ \\text{V}$，$u_B = 4\\ \\text{V}$，$R_3$ 中电流 $1\\ \\text{A}$，受控源吸收 $4\\ \\text{W}$。",
    difficulty: 4
  },
  {
    id: "QC-13", subject: "电路", type: "calc", kp: ["C5"],
    source: "自编·含流控电压源的输入电阻", tag: "对应考点 C5",
    brief: "含流控电压源的端口，用外加电源法求输入电阻",
    stem: "求端口 a、b 的输入电阻 $R_{in}$：电流 $i$ 自 a 端流入，经 $R_1 = 2\\ \\Omega$ 到节点 c；c 经 $R_2 = 6\\ \\Omega$ 接 b，同时经流控电压源 $3i$ 接 b（$+$ 端在 c，控制量即端口电流 $i$）。",
    answerText: "$$R_{in} = \\frac{u_{ab}}{i} = 5\\ \\Omega$$",
    solution: "**思路**：含受控源的端口不能直接串并联，采用外加电源法：在端口加 $u$、设流入电流 $i$，找到 $u$ 与 $i$ 的关系，比值即 $R_{in}$。\n\n**① 受控源钳位**：$c$、$b$ 之间并联着受控电压源，其值为 $3i$，故\n$$u_{cb} = 3i$$\n\n**② 分流**：$R_2$ 上的电流\n$$i_{R2} = \\frac{u_{cb}}{R_2} = \\frac{3i}{6} = 0.5i$$\n由 KCL，流过受控源的电流 $i_{s} = i - 0.5i = 0.5i$。\n\n**③ 端口电压**：\n$$u_{ab} = u_{ac} + u_{cb} = R_1 i + 3i = 2i + 3i = 5i$$\n\n**④ 求比值**：\n$$R_{in} = \\frac{u_{ab}}{i} = 5\\ \\Omega$$\n\n**⑤ 说明**：若把受控源误当独立源置零（视为短路），会得到 $R_{in} = 2 + 6 = 8\\ \\Omega$，这是典型错误；受控源必须保留。\n\n**结论**：$R_{in} = 5\\ \\Omega$。",
    difficulty: 4
  },
  {
    id: "QC-14", subject: "电路", type: "calc", kp: ["C5"],
    source: "自编·含流控电流源的节点法", tag: "对应考点 C5",
    brief: "含流控电流源电路，用节点法求电压与受控源功率",
    stem: "$24\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 6\\ \\Omega$ 接节点 a；a 经 $R_2 = 3\\ \\Omega$ 接地；a 还经流控电流源 $0.5i_2$ 接地，控制量 $i_2$ 为流过 $R_2$ 的电流（方向由 a 到地，与受控源电流同向）。求 $u_a$、$i_2$、电压源电流及受控源吸收的功率。",
    answerText: "$$u_a = 6\\ \\text{V},\\qquad i_2 = 2\\ \\text{A},\\qquad i_s = 3\\ \\text{A}$$\n受控源电流 $0.5i_2 = 1\\ \\text{A}$，吸收 $6\\ \\text{W}$。",
    solution: "**思路**：控制量用节点电压表示（$i_2 = u_a/R_2$），受控源按独立电流源写入 KCL，方程中只留 $u_a$。\n\n**① 控制量代换**：\n$$i_2 = \\frac{u_a}{3},\\qquad 0.5i_2 = \\frac{u_a}{6}$$\n\n**② 对节点 a 列 KCL**：\n$$\\frac{u_a - 24}{6} + \\frac{u_a}{3} + 0.5i_2 = 0 \\;\\Rightarrow\\; \\frac{u_a-24}{6} + \\frac{u_a}{3} + \\frac{u_a}{6} = 0$$\n\n**③ 解方程**：两边乘 6，\n$$u_a - 24 + 2u_a + u_a = 0 \\;\\Rightarrow\\; 4u_a = 24 \\;\\Rightarrow\\; u_a = 6\\ \\text{V}$$\n\n**④ 各电流**：\n$$i_2 = \\frac{6}{3} = 2\\ \\text{A},\\quad i_{cs} = 0.5 \\times 2 = 1\\ \\text{A},\\quad i_s = \\frac{24-6}{6} = 3\\ \\text{A}$$\n节点 a 处 $3 = 2 + 1$ ✓\n\n**⑤ 受控源功率**：$i_{cs} = 1\\ \\text{A}$ 由 a 流向地，与端电压 $u_a = 6\\ \\text{V}$ 关联，\n$$P = 6 \\times 1 = 6\\ \\text{W} > 0$$\n即吸收 $6\\ \\text{W}$。\n\n**⑥ 功率校验**：$24\\ \\text{V}$ 源发出 $24 \\times 3 = 72\\ \\text{W}$；$R_1$ 吸收 $3^2 \\times 6 = 54\\ \\text{W}$，$R_2$ 吸收 $2^2 \\times 3 = 12\\ \\text{W}$，受控源 $6\\ \\text{W}$，合计 $72\\ \\text{W}$ ✓\n\n**结论**：$u_a = 6\\ \\text{V}$，$i_2 = 2\\ \\text{A}$，电压源电流 $3\\ \\text{A}$，受控源吸收 $6\\ \\text{W}$。",
    difficulty: 4
  },
  /* ---------- C6 动态电路与三要素法 ---------- */
  {
    id: "QC-15", subject: "电路", type: "calc", kp: ["C6"],
    source: "自编·RC 一阶电路三要素", tag: "对应考点 C6",
    brief: "RC 充电电路，用三要素法求电容电压与初始电流",
    stem: "$12\\ \\text{V}$ 电压源与 $R_1 = 2\\ \\Omega$ 串联后接节点 A；A 经 $R_2 = 4\\ \\Omega$ 与 $C = 0.5\\ \\text{F}$ 并联接地。$t<0$ 时开关断开、电路已达稳态 $u_C(0_-) = 2\\ \\text{V}$；$t = 0$ 闭合开关接入电源。用三要素法求 $u_C(t)\\ (t \\ge 0)$ 及 $i_C(0_+)$。",
    answerText: "$$u_C(t) = 8 - 6e^{-1.5t}\\ \\text{V},\\quad t \\ge 0$$\n$$i_C(0_+) = C\\left.\\frac{du_C}{dt}\\right|_{0_+} = 0.5 \\times 9 = 4.5\\ \\text{A}$$",
    solution: "**思路**：三要素 $u_C(0_+)$、$u_C(\\infty)$、$\\tau = R_{eq}C$，其中 $R_{eq}$ 是换路后从电容端口看进去的等效电阻。\n\n**① 初始值**：电容电压不跃变，\n$$u_C(0_+) = u_C(0_-) = 2\\ \\text{V}$$\n\n**② 稳态值**：$t \\to \\infty$ 电容开路，$R_1$、$R_2$ 串联分压，\n$$u_C(\\infty) = 12 \\times \\frac{4}{2+4} = 8\\ \\text{V}$$\n\n**③ 时间常数**：换路后把电容拿掉，从 A 到地看进去，电压源短路后 $R_1 \\parallel R_2$：\n$$R_{eq} = \\frac{2 \\times 4}{6} = \\frac43\\ \\Omega,\\qquad \\tau = R_{eq}C = \\frac43 \\times 0.5 = \\frac23\\ \\text{s},\\quad \\frac1\\tau = 1.5\\ \\text{s}^{-1}$$\n\n**④ 写三要素式**：\n$$u_C(t) = u_C(\\infty) + \\left[u_C(0_+) - u_C(\\infty)\\right]e^{-t/\\tau} = 8 + (2-8)e^{-1.5t} = 8 - 6e^{-1.5t}\\ \\text{V}$$\n\n**⑤ 求 $i_C(0_+)$**：\n$$\\frac{du_C}{dt} = 9e^{-1.5t}\\ \\text{V/s} \\;\\Rightarrow\\; i_C(0_+) = 0.5 \\times 9 = 4.5\\ \\text{A}$$\n用电路核对：$0_+$ 时 $u_C = 2\\ \\text{V}$，$R_1$ 中 $(12-2)/2 = 5\\ \\text{A}$，$R_2$ 中 $2/4 = 0.5\\ \\text{A}$，流入电容 $5 - 0.5 = 4.5\\ \\text{A}$ ✓\n\n**结论**：$u_C(t) = 8 - 6e^{-1.5t}\\ \\text{V}$，$i_C(0_+) = 4.5\\ \\text{A}$，$\\tau = \\frac23\\ \\text{s}$。",
    difficulty: 3
  },
  {
    id: "QC-16", subject: "电路", type: "calc", kp: ["C6"],
    source: "自编·RL 一阶电路放电", tag: "对应考点 C6",
    brief: "RL 放电电路，求电感电流与换路瞬间电感电压",
    stem: "$24\\ \\text{V}$ 电压源与 $R_1 = 6\\ \\Omega$、$L = 0.5\\ \\text{H}$ 串联成回路，$t<0$ 时开关闭合电路已稳定；$t = 0$ 时开关断开，电源与 $R_1$ 被切除，电感经 $R_2 = 10\\ \\Omega$ 形成新的闭合回路。求 $i_L(t)\\ (t \\ge 0)$、时间常数 $\\tau$、$u_L(0_+)$ 以及 $t = 0.1\\ \\text{s}$ 时的 $i_L$。",
    answerText: "$$i_L(t) = 4e^{-20t}\\ \\text{A},\\quad t \\ge 0;\\qquad \\tau = 0.05\\ \\text{s}$$\n$$u_L(0_+) = -R_2 i_L(0_+) = -40\\ \\text{V},\\qquad i_L(0.1) = 4e^{-2} \\approx 0.541\\ \\text{A}$$",
    solution: "**思路**：换路前求 $i_L(0_-)$（电感短路），换路后用三要素法，注意换路后电源撤除故稳态为零。\n\n**① 初始值**：换路前电感视为短路，\n$$i_L(0_+) = i_L(0_-) = \\frac{24}{6} = 4\\ \\text{A}$$\n\n**② 稳态值**：换路后无电源，\n$$i_L(\\infty) = 0$$\n\n**③ 时间常数**：换路后回路只剩 $L$ 与 $R_2$，\n$$\\tau = \\frac{L}{R_2} = \\frac{0.5}{10} = 0.05\\ \\text{s},\\qquad \\frac1\\tau = 20\\ \\text{s}^{-1}$$\n\n**④ 写式**：\n$$i_L(t) = 0 + (4-0)e^{-20t} = 4e^{-20t}\\ \\text{A}$$\n\n**⑤ 电感电压**：取 $u_L$ 与 $i_L$ 关联（上正下负），\n$$u_L = L\\frac{di_L}{dt} = 0.5 \\times (-80e^{-20t}) = -40e^{-20t}\\ \\text{V}$$\n故 $u_L(0_+) = -40\\ \\text{V}$，也可由回路 KVL 直接得 $u_L = -R_2 i_L = -40\\ \\text{V}$（电感此时相当于电源）。\n\n**⑥ 代入 $t = 0.1\\ \\text{s}$**：\n$$i_L(0.1) = 4e^{-2} = 4 \\times 0.1353 \\approx 0.541\\ \\text{A}$$\n即经过 $2\\tau$ 衰减到初值的 $13.5\\%$。\n\n**结论**：$i_L(t) = 4e^{-20t}\\ \\text{A}$，$\\tau = 0.05\\ \\text{s}$，$u_L(0_+) = -40\\ \\text{V}$，$i_L(0.1) \\approx 0.541\\ \\text{A}$。",
    difficulty: 3
  },
  {
    id: "QC-17", subject: "电路", type: "calc", kp: ["C6"],
    source: "自编·受控源影响时间常数", tag: "对应考点 C6",
    brief: "含压控电流源的 RC 电路，求等效电阻与电容电压",
    stem: "$10\\ \\text{V}$ 电压源（$+$ 端朝上）与 $R_1 = 2\\ \\Omega$ 串联后接节点 A；A 经 $C = 0.5\\ \\text{F}$ 接地，并经压控电流源 $0.5u_C$ 接地（控制量 $u_C$，电流方向由 A 到地）。$t<0$ 时 $u_C(0_-) = 0$，$t = 0$ 接入电源。求 $u_C(t)$、时间常数 $\\tau$，以及稳态时受控源的电流。",
    answerText: "$$u_C(t) = 5\\left(1 - e^{-2t}\\right)\\ \\text{V},\\quad t \\ge 0;\\qquad \\tau = 0.5\\ \\text{s}$$\n稳态 $u_C(\\infty) = 5\\ \\text{V}$，受控源电流 $0.5 \\times 5 = 2.5\\ \\text{A}$。",
    solution: "**思路**：受控源使等效电阻不是简单串并联，需用外加电源法求 $R_{eq}$；稳态时电容开路但受控源仍按 $u_C$ 抽电流。\n\n**① 稳态值**：$t \\to \\infty$ 电容开路，节点 A 只有 $R_1$ 与受控源，KCL：\n$$\\frac{10 - u_C}{2} = 0.5u_C \\;\\Rightarrow\\; 10 - u_C = u_C \\;\\Rightarrow\\; u_C(\\infty) = 5\\ \\text{V}$$\n\n**② 求 $R_{eq}$**：移去电容，在 A 端外加 $u$、设流入电流 $i$（电压源短路接地）：\n$$i = \\frac{u}{R_1} + 0.5u = 0.5u + 0.5u = u \\;\\Rightarrow\\; R_{eq} = \\frac{u}{i} = 1\\ \\Omega$$\n\n**③ 时间常数**：\n$$\\tau = R_{eq}C = 1 \\times 0.5 = 0.5\\ \\text{s},\\qquad \\frac1\\tau = 2\\ \\text{s}^{-1}$$\n\n**④ 三要素写式**（$u_C(0_+) = 0$）：\n$$u_C(t) = 5 + (0-5)e^{-2t} = 5\\left(1 - e^{-2t}\\right)\\ \\text{V}$$\n\n**⑤ 稳态受控源电流**：$0.5u_C(\\infty) = 0.5 \\times 5 = 2.5\\ \\text{A}$，与 $R_1$ 中 $(10-5)/2 = 2.5\\ \\text{A}$ 相等，KCL 成立 ✓\n\n**⑥ 说明**：若忽略受控源，会得到 $R_{eq} = R_1 = 2\\ \\Omega$、$\\tau = 1\\ \\text{s}$，结果偏大一倍，这是本题的易错点。\n\n**结论**：$u_C(t) = 5(1-e^{-2t})\\ \\text{V}$，$\\tau = 0.5\\ \\text{s}$，稳态受控源电流 $2.5\\ \\text{A}$。",
    difficulty: 5
  },
  {
    id: "QC-18", subject: "电路", type: "calc", kp: ["C6"],
    source: "自编·一阶电路求达到指定电压的时刻", tag: "对应考点 C6",
    brief: "RC 电路求电容电压达指定值的时刻与电容储能",
    stem: "$10\\ \\text{V}$ 电压源（$+$ 端朝上）经 $R_1 = 2\\ \\Omega$ 接节点 A；A 经 $R_2 = 2\\ \\Omega$ 与 $C = 0.25\\ \\text{F}$ 并联接地。$u_C(0_-) = 0$，$t = 0$ 接入电源。求 $u_C(t)$、$u_C$ 达到 $4\\ \\text{V}$ 的时刻 $t_1$，以及此时电容储存的能量。",
    answerText: "$$u_C(t) = 5\\left(1 - e^{-4t}\\right)\\ \\text{V},\\qquad t_1 = \\frac{\\ln 5}{4} \\approx 0.402\\ \\text{s}$$\n$$W_C = \\frac12 C u_C^2 = \\frac12 \\times 0.25 \\times 4^2 = 2\\ \\text{J}$$",
    solution: "**思路**：先三要素写出 $u_C(t)$，再令 $u_C = 4\\ \\text{V}$ 反解时间，最后用 $W_C = \\frac12 Cu^2$ 求储能。\n\n**① 稳态值**：电容开路，$R_1$、$R_2$ 串联分压，\n$$u_C(\\infty) = 10 \\times \\frac{2}{2+2} = 5\\ \\text{V}$$\n\n**② 时间常数**：从电容端口看进去 $R_1 \\parallel R_2 = 1\\ \\Omega$，\n$$\\tau = 1 \\times 0.25 = 0.25\\ \\text{s},\\qquad \\frac1\\tau = 4\\ \\text{s}^{-1}$$\n\n**③ 三要素写式**（$u_C(0_+) = 0$）：\n$$u_C(t) = 5 + (0-5)e^{-4t} = 5\\left(1 - e^{-4t}\\right)\\ \\text{V}$$\n\n**④ 反解时刻**：令 $u_C(t_1) = 4\\ \\text{V}$，\n$$5\\left(1 - e^{-4t_1}\\right) = 4 \\;\\Rightarrow\\; e^{-4t_1} = 0.2 \\;\\Rightarrow\\; t_1 = \\frac{\\ln 5}{4} \\approx \\frac{1.609}{4} \\approx 0.402\\ \\text{s}$$\n\n**⑤ 储能**：\n$$W_C = \\frac12 C u_C^2 = \\frac12 \\times 0.25 \\times 16 = 2\\ \\text{J}$$\n\n**⑥ 校验**：$t_1 \\approx 0.402\\ \\text{s} = 1.61\\tau$，约 $1.6$ 个时间常数充到 $80\\%$（$4/5$），量级合理。\n\n**结论**：$u_C(t) = 5(1-e^{-4t})\\ \\text{V}$，$t_1 = \\frac{\\ln5}{4} \\approx 0.402\\ \\text{s}$，储能 $2\\ \\text{J}$。",
    difficulty: 4
  },
  /* ---------- C7 正弦稳态与相量法 ---------- */
  {
    id: "QC-19", subject: "电路", type: "calc", kp: ["C7"],
    source: "自编·R-L 串联相量法", tag: "对应考点 C7",
    brief: "R-L 串联正弦稳态，求电流瞬时式与各元件电压",
    stem: "$R = 3\\ \\Omega$ 的电阻与电感 $L$ 串联，接正弦电压 $u(t) = 10\\sqrt{2}\\sin(1000t)\\ \\text{V}$，已知感抗 $X_L = 4\\ \\Omega$。求 $L$、电流相量 $\\dot{I}$、$i(t)$、$u_R(t)$、$u_L(t)$，并指出电压三角形关系。",
    answerText: "$$L = \\frac{X_L}{\\omega} = \\frac{4}{1000} = 4\\ \\text{mH},\\qquad \\dot{I} = 2\\angle{-53.13^\\circ}\\ \\text{A}$$\n$$i(t) = 2\\sqrt{2}\\sin(1000t - 53.13^\\circ)\\ \\text{A}$$\n$$u_R(t) = 6\\sqrt{2}\\sin(1000t - 53.13^\\circ)\\ \\text{V},\\qquad u_L(t) = 8\\sqrt{2}\\sin(1000t + 36.87^\\circ)\\ \\text{V}$$",
    solution: "**思路**：先把 $u(t)$ 写成相量，用复阻抗 $Z = R + jX_L$ 求 $\\dot I$，再回写瞬时值；元件电压由 $U_R = RI$、$U_L = X_L I$ 得。\n\n**① 求 $L$**：\n$$L = \\frac{X_L}{\\omega} = \\frac{4}{1000} = 4 \\times 10^{-3}\\ \\text{H} = 4\\ \\text{mH}$$\n\n**② 电压相量与阻抗**（有效值相量）：\n$$\\dot{U} = 10\\angle 0^\\circ\\ \\text{V},\\qquad Z = 3 + j4 = 5\\angle 53.13^\\circ\\ \\Omega$$\n\n**③ 电流相量**：\n$$\\dot{I} = \\frac{\\dot{U}}{Z} = \\frac{10\\angle 0^\\circ}{5\\angle 53.13^\\circ} = 2\\angle{-53.13^\\circ}\\ \\text{A}$$\n$$i(t) = 2\\sqrt{2}\\sin(1000t - 53.13^\\circ)\\ \\text{A}$$\n\n**④ 元件电压**：\n$$U_R = RI = 3 \\times 2 = 6\\ \\text{V},\\qquad U_L = X_L I = 4 \\times 2 = 8\\ \\text{V}$$\n$u_R$ 与 $i$ 同相：$u_R(t) = 6\\sqrt{2}\\sin(1000t - 53.13^\\circ)\\ \\text{V}$；\n$u_L$ 超前 $i$ 的 $90^\\circ$：$u_L(t) = 8\\sqrt{2}\\sin(1000t - 53.13^\\circ + 90^\\circ) = 8\\sqrt{2}\\sin(1000t + 36.87^\\circ)\\ \\text{V}$。\n\n**⑤ 电压三角形**：$U = \\sqrt{U_R^2 + U_L^2} = \\sqrt{6^2 + 8^2} = 10\\ \\text{V}$，且 $\\varphi = \\arctan\\frac{8}{6} = 53.13^\\circ$，与 $Z$ 的幅角一致，电路呈感性。\n\n**结论**：$L = 4\\ \\text{mH}$，$i(t) = 2\\sqrt{2}\\sin(1000t-53.13^\\circ)\\ \\text{A}$，$U_R = 6\\ \\text{V}$，$U_L = 8\\ \\text{V}$。",
    difficulty: 4
  },
  /* ---------- C8 正弦稳态功率与功率因数 ---------- */
  {
    id: "QC-20", subject: "电路", type: "calc", kp: ["C8"],
    source: "自编·功率因数与电容补偿", tag: "对应考点 C8",
    brief: "感性负载功率因数与并联电容补偿计算",
    stem: "感性负载接 $U = 100\\ \\text{V}$、$\\omega = 1000\\ \\text{rad/s}$ 的正弦电源，测得有功功率 $P = 600\\ \\text{W}$、功率因数 $\\cos\\varphi = 0.6$。求负载电流、阻抗模、等效电阻 $R$ 与电感 $L$；若在负载两端并联电容把 $\\cos\\varphi$ 提高到 $1$，求所需电容 $C$ 及补偿后的电源电流。",
    answerText: "$$I = \\frac{P}{U\\cos\\varphi} = 10\\ \\text{A},\\qquad |Z| = \\frac{U}{I} = 10\\ \\Omega$$\n$$R = |Z|\\cos\\varphi = 6\\ \\Omega,\\qquad X_L = 8\\ \\Omega,\\qquad L = 8\\ \\text{mH}$$\n$$C = \\frac{Q}{\\omega U^2} = \\frac{800}{1000 \\times 10^4} = 80\\ \\mu\\text{F},\\qquad I' = 6\\ \\text{A}$$",
    solution: "**思路**：由 $P$、$\\cos\\varphi$、$U$ 先定 $I$ 与 $S$、$Q$，再由 $|Z|$ 与 $\\varphi$ 分解出 $R$、$X_L$；补偿到 $\\cos\\varphi = 1$ 时电容无功等于负载无功（电容无功取负）。\n\n**① 电流与视在功率**：\n$$I = \\frac{P}{U\\cos\\varphi} = \\frac{600}{100 \\times 0.6} = 10\\ \\text{A},\\qquad S = UI = 1000\\ \\text{V\\cdot A}$$\n\n**② 无功功率**：$\\varphi = \\arccos 0.6 = 53.13^\\circ$，\n$$Q = S\\sin\\varphi = 1000 \\times 0.8 = 800\\ \\text{var}$$\n\n**③ 阻抗分解**：\n$$|Z| = \\frac{U}{I} = 10\\ \\Omega,\\qquad R = \\frac{P}{I^2} = \\frac{600}{100} = 6\\ \\Omega$$\n$$X_L = \\sqrt{|Z|^2 - R^2} = \\sqrt{100 - 36} = 8\\ \\Omega,\\qquad L = \\frac{X_L}{\\omega} = 8\\ \\text{mH}$$\n\n**④ 补偿电容**：要求 $\\cos\\varphi' = 1$，电容无功须抵消全部 $Q_L$：\n$$Q_C = \\frac{U^2}{X_C} = \\omega C U^2 = 800 \\;\\Rightarrow\\; C = \\frac{800}{1000 \\times 100^2} = 80\\ \\mu\\text{F}$$\n\n**⑤ 补偿后电流**：$\\cos\\varphi' = 1$，电源只供有功：\n$$I' = \\frac{P}{U} = \\frac{600}{100} = 6\\ \\text{A}$$\n\n**⑥ 说明**：并联电容后有功功率不变（电容不耗有功），但视在功率由 $1000\\ \\text{V\\cdot A}$ 降为 $600\\ \\text{V\\cdot A}$，线路电流由 $10\\ \\text{A}$ 降到 $6\\ \\text{A}$。\n\n**结论**：$R = 6\\ \\Omega$、$L = 8\\ \\text{mH}$，补偿电容 $C = 80\\ \\mu\\text{F}$，补偿后电流 $6\\ \\text{A}$。",
    difficulty: 5
  }
]);