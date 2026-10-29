/* 信号与系统 · 考点训练题（第三批 SIG-61 ~ SIG-69） */
window.QSIGNAL = (window.QSIGNAL || []).concat([
  /* ---------- 第 1 章 ---------- */
  {
    id: "SIG-61", subject: "信号", type: "choice", kp: ["S1-2"], difficulty: 3,
    source: "自编·冲激与阶跃的微积分关系",
    stem: "计算 $\\dfrac{d}{dt}\\big[e^{-2t}\\varepsilon(t)\\big]$。",
    options: [
      "$-2e^{-2t}\\varepsilon(t)$",
      "$\\delta(t)+2e^{-2t}\\varepsilon(t)$",
      "$\\delta(t)-2e^{-2t}\\varepsilon(t)$",
      "$-2e^{-2t}\\varepsilon(t)-\\delta(t)$"
    ],
    answer: 2,
    solution: "按乘积求导法则：$\\dfrac{d}{dt}\\big[e^{-2t}\\varepsilon(t)\\big]=-2e^{-2t}\\varepsilon(t)+e^{-2t}\\delta(t)$。\n\n由 $\\delta(t)=\\dfrac{d\\varepsilon(t)}{dt}$，$t=0$ 处的单位跃变贡献一个冲激；又 $e^{-2t}$ 在 $t=0$ 取值为 $1$，冲激项化简为 $\\delta(t)$。\n\n故结果为 $\\delta(t)-2e^{-2t}\\varepsilon(t)$，$t=0$ 处函数从 $0$ 跳到 $1$，冲激系数为正。\n\n$-2e^{-2t}\\varepsilon(t)$ 只对 $t>0$ 段求了导，完全漏掉跃变点的冲激；$\\delta(t)+2e^{-2t}\\varepsilon(t)$ 把指数求导产生的负号丢了；$-2e^{-2t}\\varepsilon(t)-\\delta(t)$ 的冲激符号错，跃变是上升的，冲激必须是正的。"
  },
  {
    id: "SIG-62", subject: "信号", type: "choice", kp: ["S1-3"], difficulty: 3,
    source: "自编·积分器系统的性质",
    stem: "系统 $y(t)=\\int_{-\\infty}^{t}f(\\tau)\\,d\\tau$ 的性质是（　）。",
    options: [
      "线性、时不变、因果、稳定",
      "线性、时不变、因果、不稳定",
      "线性、时变、因果、不稳定",
      "非线性、时不变、非因果、不稳定"
    ],
    answer: 1,
    solution: "**线性**：积分是线性运算，$af_{1}+bf_{2}$ 的积分等于 $ay_{1}+by_{2}$。\n\n**时不变**：输入延迟 $t_{0}$ 后输出为 $\\int_{-\\infty}^{t}f(\\tau-t_{0})d\\tau$，令 $u=\\tau-t_{0}$ 得 $\\int_{-\\infty}^{t-t_{0}}f(u)du=y(t-t_{0})$，与输出的延迟完全一致。\n\n**因果**：$t$ 时刻输出只用到 $\\tau\\le t$ 的输入。\n\n**不稳定**：取有界输入 $f(t)=\\varepsilon(t)$（$|f|\\le1$），输出 $y(t)=t\\varepsilon(t)$ 无界，不满足 BIBO 稳定；等价地 $h(t)=\\varepsilon(t)$，$\\int_{-\\infty}^{+\\infty}|h(t)|dt=\\infty$。\n\n判「稳定」的选项只核对了线性与因果，漏了冲激响应绝对可积这一条；判「时变」的选项把积分上限的平移误当成尺度变换；「非线性」与积分运算的线性性直接矛盾。"
  },

  /* ---------- 第 2 章 ---------- */
  {
    id: "SIG-63", subject: "信号", type: "choice", kp: ["S2-1"], difficulty: 2,
    source: "自编·重特征根对应的齐次解",
    stem: "微分方程 $y''(t)+2y'(t)+y(t)=f(t)$ 的齐次解形式为（　）。",
    options: [
      "$C_{1}e^{-t}+C_{2}e^{t}$",
      "$C_{1}e^{-t}+C_{2}e^{-2t}$",
      "$C_{1}\\cos t+C_{2}\\sin t$",
      "$(C_{1}+C_{2}t)e^{-t}$"
    ],
    answer: 3,
    solution: "令 $y=e^{\\lambda t}$ 代入齐次方程，约去公因子得特征方程 $\\lambda^{2}+2\\lambda+1=0$，即 $(\\lambda+1)^{2}=0$，得**二重根** $\\lambda_{1}=\\lambda_{2}=-1$。\n\n二重根对应的齐次解为 $(C_{1}+C_{2}t)e^{-t}$，第二个待定常数必须挂在 $t$ 上，只有这样才能凑出两个线性无关的解 $e^{-t}$ 与 $te^{-t}$。\n\n$C_{1}e^{-t}+C_{2}e^{t}$ 把根号看反，用了 $\\lambda=+1$；$C_{1}e^{-t}+C_{2}e^{-2t}$ 是 $\\lambda^{2}+3\\lambda+2=0$ 的根，与本题方程不符；含 $\\cos t$、$\\sin t$ 的形式对应共轭复根 $\\pm j$，本题没有复根。"
  },
  {
    id: "SIG-64", subject: "信号", type: "choice", kp: ["S2-1"], difficulty: 3,
    source: "自编·待定系数法求特解",
    stem: "微分方程 $y''(t)+3y'(t)+2y(t)=e^{-3t}$ 的特解 $y_{p}(t)=$（　）。",
    options: [
      "$\\dfrac12 e^{-3t}$",
      "$\\dfrac13 e^{-3t}$",
      "$\\dfrac12 t e^{-3t}$",
      "$\\dfrac12 e^{-t}$"
    ],
    answer: 0,
    solution: "特征方程 $\\lambda^{2}+3\\lambda+2=0$ 的根为 $-1$、$-2$，激励指数 $-3$ **不是**特征根，不发生共振，故设 $y_{p}=Ae^{-3t}$。\n\n代入：$y_{p}'=-3Ae^{-3t}$，$y_{p}''=9Ae^{-3t}$，左端为 $(9A-9A+2A)e^{-3t}=2Ae^{-3t}$，与右端 $e^{-3t}$ 比较得 $2A=1$，即 $A=\\dfrac12$。\n\n所以 $y_{p}(t)=\\dfrac12e^{-3t}$。\n\n$\\dfrac13e^{-3t}$ 是把 $y_{p}''$ 与 $3y_{p}'$ 的对消算错、把系数 $2$ 当成 $3$；$\\dfrac12te^{-3t}$ 是误判共振（只有 $-3$ 为特征根时才乘 $t$）；$\\dfrac12e^{-t}$ 拿特征根 $-1$ 当指数，那是齐次解的一项，不可能成为特解。"
  },
  {
    id: "SIG-65", subject: "信号", type: "choice", kp: ["S2-2"], difficulty: 3,
    source: "自编·一阶系统全响应的分解",
    stem: "系统 $y'(t)+2y(t)=f(t)$，$f(t)=4\\varepsilon(t)$，$y(0_{-})=1$，则 $t\\ge0$ 时 $y(t)=$（　）。",
    options: [
      "$2+e^{-2t}$",
      "$2-2e^{-2t}$",
      "$2-e^{-2t}$",
      "$1-e^{-2t}$"
    ],
    answer: 2,
    solution: "**零输入响应**：由 $y_{zi}'+2y_{zi}=0$、$y_{zi}(0)=1$ 得 $y_{zi}=e^{-2t}$。\n\n**零状态响应**：$H(s)=\\dfrac{1}{s+2}$，$F(s)=\\dfrac4s$，故 $Y_{zs}(s)=\\dfrac{4}{s(s+2)}=\\dfrac2s-\\dfrac{2}{s+2}$，反变换 $y_{zs}=2(1-e^{-2t})$。\n\n相加得 $y(t)=2(1-e^{-2t})+e^{-2t}=2-e^{-2t}$，$t\\ge0$。\n\n校验：$y(0_{+})=1$ 与初值相符，$y(\\infty)=2$ 与稳态值 $\\dfrac42$ 相符，两点都过才算对。\n\n$2-2e^{-2t}$ 只留了零状态响应，把初始状态丢了；$2+e^{-2t}$ 把零输入项的符号写成同号，那样 $t\\to\\infty$ 时该项不衰减反而拖累稳态；$1-e^{-2t}$ 把稳态值算成 $1$，漏了增益 $\\dfrac{4}{2}=2$ 带来的放大。"
  },
  {
    id: "SIG-66", subject: "信号", type: "choice", kp: ["S2-2"], difficulty: 4,
    source: "自编·两个指数信号的卷积",
    stem: "系统 $h(t)=e^{-t}\\varepsilon(t)$，激励 $f(t)=e^{-3t}\\varepsilon(t)$，则零状态响应 $y_{zs}(t)=$（　）。",
    options: [
      "$(e^{-t}-e^{-3t})\\varepsilon(t)$",
      "$\\dfrac12(e^{-t}-e^{-3t})\\varepsilon(t)$",
      "$\\dfrac12(e^{-3t}-e^{-t})\\varepsilon(t)$",
      "$\\dfrac14(e^{-t}-e^{-3t})\\varepsilon(t)$"
    ],
    answer: 1,
    solution: "按定义作卷积：$y_{zs}(t)=\\int_{0}^{t}e^{-\\tau}e^{-3(t-\\tau)}d\\tau=e^{-3t}\\int_{0}^{t}e^{2\\tau}d\\tau=\\dfrac12e^{-3t}(e^{2t}-1)=\\dfrac12(e^{-t}-e^{-3t})$，$t\\ge0$。\n\n拉氏域复核：$Y_{zs}(s)=\\dfrac{1}{s+1}\\cdot\\dfrac{1}{s+3}=\\dfrac12\\left(\\dfrac{1}{s+1}-\\dfrac{1}{s+3}\\right)$，反变换完全一致。\n\n也可用终值/初值定性检查：$y_{zs}(0_{+})=0$（两个因果信号卷积起点为零），$y_{zs}(\\infty)=0$。\n\n$(e^{-t}-e^{-3t})\\varepsilon(t)$ 漏了部分分式的系数 $\\dfrac12$；$\\dfrac12(e^{-3t}-e^{-t})\\varepsilon(t)$ 把两个留数的符号弄反，该式在 $t>0$ 时为负，与实际响应恒正矛盾；$\\dfrac14$ 的选项把极点间距 $2$ 重复除了两次。"
  },
  {
    id: "SIG-67", subject: "信号", type: "choice", kp: ["S2-3"], difficulty: 2,
    source: "自编·含冲激项的阶跃响应",
    stem: "某线性时不变系统的冲激响应 $h(t)=\\delta(t)-e^{-t}\\varepsilon(t)$，则其阶跃响应 $g(t)=$（　）。",
    options: [
      "$e^{-t}\\varepsilon(t)$",
      "$(1-e^{-t})\\varepsilon(t)$",
      "$(2-e^{-t})\\varepsilon(t)$",
      "$\\delta(t)-e^{-t}\\varepsilon(t)$"
    ],
    answer: 0,
    solution: "阶跃响应是冲激响应的积分：$g(t)=\\int_{-\\infty}^{t}h(\\tau)d\\tau=\\varepsilon(t)-\\int_{0}^{t}e^{-\\tau}d\\tau$。\n\n其中 $\\int_{0}^{t}e^{-\\tau}d\\tau=1-e^{-t}$（$t\\ge0$），故 $g(t)=\\varepsilon(t)-(1-e^{-t})\\varepsilon(t)=e^{-t}\\varepsilon(t)$。\n\n$s$ 域更直观：$G(s)=\\dfrac{H(s)}{s}=\\dfrac{1}{s}\\left(1-\\dfrac{1}{s+1}\\right)=\\dfrac{1}{s+1}$，反变换即 $e^{-t}\\varepsilon(t)$，$\\delta(t)$ 那一项恰好被积分抵掉了直流。\n\n$(1-e^{-t})\\varepsilon(t)$ 漏掉了 $\\delta(t)$ 积分出的 $\\varepsilon(t)$，只剩第二项的积分；$(2-e^{-t})\\varepsilon(t)$ 把第二项的积分符号写反，成了 $+1-(1-e^{-t})$；$\\delta(t)-e^{-t}\\varepsilon(t)$ 直接把 $h(t)$ 抄下来，根本没做积分。"
  },
  {
    id: "SIG-68", subject: "信号", type: "choice", kp: ["S2-5"], difficulty: 2,
    source: "自编·级联框图的系统函数",
    stem: "两子系统 $H_{1}(s)=\\dfrac{1}{s+1}$ 与 $H_{2}(s)=\\dfrac{s+1}{s+3}$ 级联，总系统函数 $H(s)=$（　）。",
    options: [
      "$\\dfrac{1}{(s+1)(s+3)}$",
      "$\\dfrac{s+1}{s+3}$",
      "$\\dfrac{1}{s+1}+\\dfrac{s+1}{s+3}$",
      "$\\dfrac{1}{s+3}$"
    ],
    answer: 3,
    solution: "级联（串联）框图中前一级的输出就是后一级的输入，故总系统函数**相乘**：\n\n$$H(s)=H_{1}(s)H_{2}(s)=\\frac{1}{s+1}\\cdot\\frac{s+1}{s+3}=\\frac{1}{s+3}$$\n\n$H_{2}$ 的零点 $s=-1$ 与 $H_{1}$ 的极点 $s=-1$ 对消，该模态在总系统中既不表现为极点也不表现为零点，系统由二阶降为一阶，极点只剩 $s=-3$。\n\n$\\dfrac{1}{(s+1)(s+3)}$ 漏乘了 $H_{2}$ 的分子 $s+1$；$\\dfrac{s+1}{s+3}$ 只取了 $H_{2}$、把前一级整个丢掉；$\\dfrac{1}{s+1}+\\dfrac{s+1}{s+3}$ 用的是并联（相加）公式，级联必须相乘。"
  },
  {
    id: "SIG-69", subject: "信号", type: "choice", kp: ["S2-5"], difficulty: 4,
    source: "自编·负反馈闭环的系统函数",
    stem: "负反馈框图的前向通路 $H_{1}(s)=\\dfrac{1}{s+1}$、反馈通路 $H_{2}(s)=1$，则闭环系统函数 $H(s)=$（　）。",
    options: [
      "$\\dfrac{1}{s+1}$",
      "$\\dfrac{1}{s+2}$",
      "$\\dfrac{1}{s+3}$",
      "$\\dfrac{s+1}{s+2}$"
    ],
    answer: 1,
    solution: "负反馈闭环公式为 $H(s)=\\dfrac{H_{1}}{1+H_{1}H_{2}}$，代入 $H_{1}=\\dfrac{1}{s+1}$、$H_{2}=1$：\n\n$$H(s)=\\dfrac{\\dfrac{1}{s+1}}{1+\\dfrac{1}{s+1}}=\\dfrac{1}{s+2}$$\n\n负反馈把极点由 $-1$ 移到 $-2$，时间常数从 $1$ 减为 $\\dfrac12$，响应更快、更稳；分母的 $1+$ 就是负反馈的标志，正反馈则写成 $1-H_{1}H_{2}$。\n\n$\\dfrac{1}{s+1}$ 是开环系统函数，完全没接反馈支路；$\\dfrac{1}{s+3}$ 把分母中的 $1$ 当成 $2$，算成了 $1+2H_{1}H_{2}$；$\\dfrac{s+1}{s+2}$ 把闭环公式倒过来用，得到的是 $(1+H_{1}H_{2})/H_{1}$。"
  }
]);