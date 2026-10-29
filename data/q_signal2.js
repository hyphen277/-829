/* 信号与系统 · 考点训练题（第二批 SIG-26 ~ SIG-60） */
window.QSIGNAL = (window.QSIGNAL || []).concat([
  /* ---------- 第 1 章 ---------- */
  {
    id: "SIG-26", subject: "信号", type: "choice", kp: ["S1-2"], difficulty: 3,
    source: "自编·冲激函数的尺度性质",
    stem: "计算 $\\int_{-\\infty}^{+\\infty}(t^{2}+1)\\,\\delta(2t-4)\\,dt$ 的值。",
    options: ["$5$", "$\\dfrac{5}{2}$", "$\\dfrac{5}{4}$", "$0$"],
    answer: 1,
    solution: "先用尺度性质 $\\delta(at)=\\dfrac{1}{|a|}\\delta(t)$ 化简：$\\delta(2t-4)=\\delta\\big(2(t-2)\\big)=\\dfrac12\\delta(t-2)$。\n\n再抽样：$\\int_{-\\infty}^{+\\infty}f(t)\\delta(t-2)dt=f(2)=2^{2}+1=5$，乘上尺度因子 $\\dfrac12$ 得 $\\dfrac52$。\n\n选 $5$ 是只用抽样性质、漏了 $1/|a|$；选 $\\dfrac54$ 是把因子当成 $1/a^{2}$；选 $0$ 是误以为 $\\delta$ 只在 $t=0$ 处取样。"
  },
  {
    id: "SIG-27", subject: "信号", type: "choice", kp: ["S1-1"], difficulty: 2,
    source: "自编·信号的奇偶分解",
    stem: "信号 $f(t)=e^{-2t}\\varepsilon(t)$ 的偶部 $f_{e}(t)=$（　）。",
    options: ["$\\dfrac12 e^{-2|t|}$", "$e^{-2|t|}$", "$\\dfrac12 e^{2t}$", "$e^{-2t}\\varepsilon(t)$"],
    answer: 0,
    solution: "偶部定义 $f_{e}(t)=\\dfrac12\\big[f(t)+f(-t)\\big]$，其中 $f(-t)=e^{2t}\\varepsilon(-t)$ 只在 $t<0$ 时非零。\n\n于是 $t>0$ 时 $f_{e}(t)=\\dfrac12e^{-2t}$，$t<0$ 时 $f_{e}(t)=\\dfrac12e^{2t}$，两段合写为 $\\dfrac12e^{-2|t|}$。\n\n选 $e^{-2|t|}$ 漏了系数 $\\dfrac12$；选 $\\dfrac12e^{2t}$ 只算了 $t<0$ 一支；选 $e^{-2t}\\varepsilon(t)$ 根本没有做奇偶分解（它本身是原信号的因果部分）。"
  },
  {
    id: "SIG-28", subject: "信号", type: "choice", kp: ["S1-3"], difficulty: 3,
    source: "自编·时变与时不变判定",
    stem: "系统 $y(t)=f\\left(\\dfrac{t}{2}\\right)$ 属于（　）。",
    options: ["线性时不变系统", "线性时变系统", "非线性时不变系统", "非线性时变系统"],
    answer: 1,
    solution: "**线性**：输入 $af_{1}+bf_{2}$ 时输出为 $af_{1}(t/2)+bf_{2}(t/2)=ay_{1}+by_{2}$，齐次性与可加性都成立。\n\n**时变**：把输入延迟 $t_{0}$ 得到 $f(t-t_{0})$，代入系统得输出 $f\\left(\\dfrac t2-t_{0}\\right)$；而原输出的延迟是 $y(t-t_{0})=f\\left(\\dfrac{t-t_{0}}{2}\\right)=f\\left(\\dfrac t2-\\dfrac{t_{0}}{2}\\right)$。两者对同一个 $t$ 取值不同（延迟量被尺度因子压缩了一半），故系统时变。\n\n一般结论：$y(t)=f(at+b)$ 只有 $a=1$ 时才时不变；凡含时间尺度因子 $a\\ne1$ 的，一律时变——因为缩放会把延迟量也一起缩放。"
  },
  {
    id: "SIG-29", subject: "信号", type: "choice", kp: ["S1-1"], difficulty: 3,
    source: "自编·信号周期性的判定",
    stem: "信号 $f(t)=\\sin(2t)+\\cos(\\pi t)$ 是（　）。",
    options: ["周期信号，周期为 $\\pi$", "周期信号，周期为 $2\\pi$", "周期信号，周期为 $2$", "非周期信号"],
    answer: 3,
    solution: "$\\sin(2t)$ 的周期 $T_{1}=\\dfrac{2\\pi}{2}=\\pi$，$\\cos(\\pi t)$ 的周期 $T_{2}=\\dfrac{2\\pi}{\\pi}=2$。\n\n两个周期信号之和仍为周期信号的条件是 $T_{1}/T_{2}$ 为有理数。本题 $T_{1}/T_{2}=\\dfrac{\\pi}{2}$ 是无理数，不存在公共周期，故 $f(t)$ 非周期。\n\n选 $\\pi$ 或 $2$ 是只看了其中一项；选 $2\\pi$ 是套用「默认周期 $2\\pi$」的错误直觉。"
  },

  /* ---------- 第 2 章 ---------- */
  {
    id: "SIG-30", subject: "信号", type: "choice", kp: ["S2-1"], difficulty: 4,
    source: "自编·共振时的特解形式",
    stem: "微分方程 $y''(t)+3y'(t)+2y(t)=f(t)$，若 $f(t)=e^{-t}\\varepsilon(t)$，则其特解应设为（　）。",
    options: ["$Ae^{-t}$", "$Ae^{-2t}$", "$Ate^{-t}$", "$At^{2}e^{-t}$"],
    answer: 2,
    solution: "特征方程 $\\lambda^{2}+3\\lambda+2=0$，特征根 $\\lambda_{1}=-1$、$\\lambda_{2}=-2$。\n\n激励 $e^{-t}$ 的指数 $-1$ 恰是**单特征根**（发生共振），故特解必须乘 $t$，设为 $Ate^{-t}$。\n\n代回可定系数：$(Ate^{-t})''+3(Ate^{-t})'+2(Ate^{-t})=Ae^{-t}$，与右端 $e^{-t}$ 比较得 $A=1$，特解就是 $te^{-t}$。\n\n选 $Ae^{-t}$ 是没检查共振；选 $Ae^{-2t}$ 是把另一个特征根当成激励指数；选 $At^{2}e^{-t}$ 对应 $-1$ 为**二重**根的情形。"
  },
  {
    id: "SIG-31", subject: "信号", type: "choice", kp: ["S2-5"], difficulty: 2,
    source: "自编·直接型模拟框图",
    stem: "微分方程 $y''(t)+3y'(t)+2y(t)=f'(t)+f(t)$ 的直接型模拟框图中，积分器的个数为（　）。",
    options: ["$1$", "$2$", "$3$", "$4$"],
    answer: 1,
    solution: "直接型框图所需积分器个数等于微分方程的阶数，即 $y$ 的最高阶导数与最低阶之间的阶差。\n\n本题最高为 $y''$、最低为 $y$，阶数 $n=2$（对应两个状态变量），故需 2 个积分器串接。\n\n右端出现的 $f'$ 只改变前馈支路的系数（把 $f'$ 与 $f$ 按比例送入求和点），不会增加积分器数目。\n\n选 $1$ 是按 $f$ 的最高阶导数来数；选 $3$、$4$ 是把右端的导数项也算成了积分器。"
  },
  {
    id: "SIG-32", subject: "信号", type: "choice", kp: ["S2-4"], difficulty: 5,
    source: "自编·卷积的尺度性质",
    stem: "已知 $f_{1}(t)*f_{2}(t)=y(t)$，则 $f_{1}(2t)*f_{2}(2t)=$（　）。",
    options: ["$y(2t)$", "$2y(2t)$", "$\\dfrac12 y(2t)$", "$\\dfrac14 y(2t)$"],
    answer: 2,
    solution: "直接按定义展开：$f_{1}(2t)*f_{2}(2t)=\\int_{-\\infty}^{\\infty}f_{1}(2\\tau)f_{2}\\big(2(t-\\tau)\\big)d\\tau$。\n\n令 $u=2\\tau$，则 $d\\tau=\\dfrac{du}{2}$，上式 $=\\dfrac12\\int f_{1}(u)f_{2}(2t-u)du=\\dfrac12 y(2t)$。\n\n结论：两个信号都压缩 $a$ 倍时，卷积结果也压缩 $a$ 倍，并额外乘 $\\dfrac{1}{a}$。\n\n选 $y(2t)$ 漏了 $1/a$；选 $2y(2t)$ 把因子方向弄反；选 $\\dfrac14y(2t)$ 是把尺度因子重复计了两次。"
  },
  {
    id: "SIG-33", subject: "信号", type: "choice", kp: ["S2-3"], difficulty: 3,
    source: "自编·冲激响应与阶跃响应",
    stem: "某线性时不变系统的冲激响应 $h(t)=e^{-2t}\\varepsilon(t)$，则其阶跃响应 $g(t)=$（　）。",
    options: ["$(1-e^{-2t})\\varepsilon(t)$", "$\\dfrac12e^{-2t}\\varepsilon(t)$", "$\\dfrac12(1+e^{-2t})\\varepsilon(t)$", "$\\dfrac12(1-e^{-2t})\\varepsilon(t)$"],
    answer: 3,
    solution: "阶跃响应是冲激响应的积分：$g(t)=\\int_{-\\infty}^{t}h(\\tau)d\\tau=\\int_{0}^{t}e^{-2\\tau}d\\tau=\\dfrac12(1-e^{-2t})$，$t\\ge0$。\n\n也可用拉氏变换验证：$G(s)=H(s)\\cdot\\dfrac1s=\\dfrac{1}{s(s+2)}=\\dfrac12\\left(\\dfrac1s-\\dfrac1{s+2}\\right)$，反变换同样是 $\\dfrac12(1-e^{-2t})\\varepsilon(t)$。\n\n选 $(1-e^{-2t})\\varepsilon(t)$ 漏了 $\\dfrac12$；选 $\\dfrac12e^{-2t}\\varepsilon(t)$ 把积分当成了求导；选 $\\dfrac12(1+e^{-2t})$ 的稳态值算错（应为 $\\dfrac12$ 而不是 $1$）。"
  },

  /* ---------- 第 3 章 ---------- */
  {
    id: "SIG-34", subject: "信号", type: "choice", kp: ["S3-1"], difficulty: 3,
    source: "自编·两种级数形式的系数换算",
    stem: "周期信号 $f(t)=2+3\\cos\\left(\\omega_{1}t-30^{\\circ}\\right)$ 的指数形式傅里叶级数中，系数 $F_{1}=$（　）。",
    options: ["$\\dfrac32 e^{-j30^{\\circ}}$", "$3e^{-j30^{\\circ}}$", "$\\dfrac32 e^{j30^{\\circ}}$", "$3e^{j30^{\\circ}}$"],
    answer: 0,
    solution: "由 $A_{n}\\cos(n\\omega_{1}t+\\varphi_{n})=\\dfrac{A_{n}}{2}e^{j\\varphi_{n}}e^{jn\\omega_{1}t}+\\dfrac{A_{n}}{2}e^{-j\\varphi_{n}}e^{-jn\\omega_{1}t}$，得 $F_{n}=\\dfrac{A_{n}}{2}e^{j\\varphi_{n}}$（$n>0$）。\n\n本题 $f(t)$ 已是标准形式 $3\\cos(\\omega_{1}t-30^{\\circ})$，即 $A_{1}=3$、$\\varphi_{1}=-30^{\\circ}$，故 $F_{1}=\\dfrac32e^{-j30^{\\circ}}$，且 $F_{-1}=\\dfrac32e^{j30^{\\circ}}=F_{1}^{*}$。\n\n选 $3e^{-j30^{\\circ}}$ 漏了 $\\dfrac12$；两个带 $+j30^{\\circ}$ 的选项把相位符号写反，破坏了 $F_{-n}=F_{n}^{*}$ 的共轭对称关系。"
  },
  {
    id: "SIG-35", subject: "信号", type: "choice", kp: ["S3-2"], difficulty: 4,
    source: "自编·周期矩形脉冲频谱随脉宽的变化",
    stem: "周期矩形脉冲（周期 $T$、脉宽 $\\tau$、幅度 $E$）若保持 $T$ 不变而把 $\\tau$ 减半，则（　）。",
    options: [
      "谱线间隔加倍，第一个零点频率不变，谐波幅度减半",
      "谱线间隔不变，第一个零点频率减半，谐波幅度加倍",
      "谱线间隔不变，第一个零点频率加倍，谐波幅度减半",
      "谱线间隔减半，第一个零点频率加倍，谐波幅度不变"
    ],
    answer: 2,
    solution: "谱线间隔由周期决定：$\\omega_{1}=\\dfrac{2\\pi}{T}$，$T$ 不变则谱线间隔不变。\n\n包络零点由脉宽决定：$F_{n}=\\dfrac{E\\tau}{T}\\mathrm{Sa}\\left(\\dfrac{n\\omega_{1}\\tau}{2}\\right)$，第一个零点在 $f=\\dfrac{1}{\\tau}$，$\\tau$ 减半则零点频率加倍（带宽加倍）。\n\n各次谐波幅度正比于 $\\dfrac{E\\tau}{T}$，故幅度减半。这正是「时域变窄、频域变宽、幅度变低」的尺度对偶。\n\n其余选项分别错在把谱线间隔也说成变化，或把零点频率的增减方向弄反。"
  },
  {
    id: "SIG-36", subject: "信号", type: "choice", kp: ["S3-3"], difficulty: 3,
    source: "自编·帕塞瓦尔定理求平均功率",
    stem: "周期信号 $f(t)=1+2\\cos(\\omega_{1}t)+4\\sin(3\\omega_{1}t)$ 的平均功率为（　）。",
    options: ["$21$", "$11$", "$10.5$", "$7$"],
    answer: 1,
    solution: "由帕塞瓦尔定理，不同频率的正弦项在一个周期内正交，交叉项平均为零，故 $P=A_{0}^{2}+\\sum_{n\\ge1}\\dfrac{A_{n}^{2}+B_{n}^{2}}{2}$。\n\n逐项算：直流 $1$ 贡献 $1^{2}=1$；$2\\cos(\\omega_{1}t)$ 贡献 $\\dfrac{2^{2}}{2}=2$；$4\\sin(3\\omega_{1}t)$ 贡献 $\\dfrac{4^{2}}{2}=8$。\n\n合计 $P=1+2+8=11$。\n\n选 $21$ 是把幅度平方直接相加、忘了 $\\dfrac12$；选 $10.5$ 是连直流也乘了 $\\dfrac12$；选 $7$ 是直接相加幅度。"
  },
  {
    id: "SIG-37", subject: "信号", type: "choice", kp: ["S3-4"], difficulty: 4,
    source: "自编·半波对称的谐波特性",
    stem: "若周期信号满足 $f(t)=-f\\left(t\\pm\\dfrac{T}{2}\\right)$（半波对称），则其傅里叶级数（　）。",
    options: ["只含偶次谐波", "只含直流与偶次谐波", "含有全部谐波", "只含奇次谐波"],
    answer: 3,
    solution: "把 $f(t)=\\sum_{n}F_{n}e^{jn\\omega_{1}t}$ 代入条件 $f(t)=-f(t+T/2)$：右端 $=-\\sum_{n}F_{n}e^{jn\\omega_{1}(t+T/2)}=-\\sum_{n}F_{n}e^{jn\\pi}e^{jn\\omega_{1}t}$。\n\n比较同次谐波系数得 $F_{n}=-(-1)^{n}F_{n}$，即 $\\big(1+(-1)^{n}\\big)F_{n}=0$。\n\n$n$ 为偶数时 $F_{n}=0$，只有 $n$ 为奇数的项存在；$n=0$ 属偶数，故直流也为零。对称方波正是这种波形的典型例子。\n\n选「偶次」是把结论记反；选「含直流」忽略了 $n=0$ 也是偶数；选「含全部」没有利用对称条件。"
  },
  {
    id: "SIG-38", subject: "信号", type: "choice", kp: ["S3-2"], difficulty: 4,
    source: "自编·频谱包络零点的位置",
    stem: "周期矩形脉冲的周期为 $T$、脉宽为 $\\tau=\\dfrac{T}{4}$，其频谱包络的第一个零点出现在第（　）次谐波处。",
    options: ["$4$", "$2$", "$8$", "$16$"],
    answer: 0,
    solution: "谱线位于 $n\\omega_{1}=\\dfrac{2\\pi n}{T}$，包络为 $\\mathrm{Sa}\\left(\\dfrac{n\\omega_{1}\\tau}{2}\\right)=\\mathrm{Sa}\\left(\\dfrac{n\\pi\\tau}{T}\\right)$。\n\n零点条件 $\\dfrac{n\\pi\\tau}{T}=k\\pi$，即 $n\\tau=kT$，也就是 $n=k\\dfrac{T}{\\tau}$。\n\n代入 $\\tau=\\dfrac{T}{4}$ 得 $n=4k$，第一个零点（$k=1$）在 $n=4$；此时零点间隔 $\\dfrac{2\\pi}{\\tau}$ 恰为谱线间隔 $\\dfrac{2\\pi}{T}$ 的 4 倍，跨过 4 根谱线。\n\n选 $2$ 是把 $\\tau$ 错当成 $\\dfrac{T}{2}$；选 $8$、$16$ 是把零点间隔与谱线间隔的关系倒过来用。"
  },

  /* ---------- 第 4 章 ---------- */
  {
    id: "SIG-39", subject: "信号", type: "choice", kp: ["S4-2"], difficulty: 3,
    source: "自编·尺度变换性质",
    stem: "已知 $f(t)\\leftrightarrow F(j\\omega)$，则 $f(2t)$ 的频谱为（　）。",
    options: [
      "$F\\!\\left(j\\dfrac{\\omega}{2}\\right)$",
      "$2F(j2\\omega)$",
      "$\\dfrac12 F\\!\\left(j\\dfrac{\\omega}{2}\\right)$",
      "$\\dfrac12 F(j2\\omega)$"
    ],
    answer: 2,
    solution: "由定义 $\\mathscr{F}[f(at)]=\\int_{-\\infty}^{\\infty}f(at)e^{-j\\omega t}dt$，令 $\\tau=at$（$a>0$）得 $\\dfrac1a\\int f(\\tau)e^{-j(\\omega/a)\\tau}d\\tau=\\dfrac1aF\\!\\left(j\\dfrac{\\omega}{a}\\right)$。\n\n取 $a=2$：$f(2t)\\leftrightarrow\\dfrac12F\\!\\left(j\\dfrac{\\omega}{2}\\right)$，即幅度乘 $\\dfrac{1}{|a|}$、频率轴以 $\\dfrac{\\omega}{a}$ 代换。\n\n选 $F(j\\omega/2)$ 漏了 $\\dfrac{1}{|a|}$；两个含 $F(j2\\omega)$ 的选项把代换方向弄反（时域压缩应对应频域展宽，用 $\\omega/a$ 而非 $a\\omega$）。"
  },
  {
    id: "SIG-40", subject: "信号", type: "choice", kp: ["S4-4"], difficulty: 4,
    source: "自编·能量谱与帕塞瓦尔定理",
    stem: "信号 $f(t)=\\mathrm{Sa}(t)=\\dfrac{\\sin t}{t}$ 的能量为（　）。",
    options: ["$\\dfrac{\\pi}{2}$", "$\\pi$", "$2\\pi$", "$\\pi^{2}$"],
    answer: 1,
    solution: "由常用变换对 $\\mathrm{Sa}(t)\\leftrightarrow\\pi\\,\\mathrm{rect}\\left(\\dfrac{\\omega}{2}\\right)$，即 $|\\omega|<1$ 时 $F(j\\omega)=\\pi$，其余为 $0$。\n\n用帕塞瓦尔定理：$E=\\dfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty}|F(j\\omega)|^{2}d\\omega=\\dfrac{1}{2\\pi}\\int_{-1}^{1}\\pi^{2}d\\omega=\\dfrac{\\pi^{2}\\cdot2}{2\\pi}=\\pi$。\n\n选 $\\pi^{2}$ 是忘了 $\\dfrac{1}{2\\pi}$；选 $\\dfrac{\\pi}{2}$ 或 $2\\pi$ 是把带宽或系数取错。"
  },
  {
    id: "SIG-41", subject: "信号", type: "choice", kp: ["S4-4", "S4-2"], difficulty: 5,
    source: "自编·尺度变换对能量的影响",
    stem: "若 $f(t)$ 的能量为 $E$，则 $f(2t)$ 的能量为（　）。",
    options: ["$E$", "$2E$", "$\\dfrac{E}{2}$", "$\\dfrac{E}{4}$"],
    answer: 2,
    solution: "按定义作代换：$E'=\\int_{-\\infty}^{\\infty}|f(2t)|^{2}dt$，令 $\\tau=2t$、$dt=\\dfrac{d\\tau}{2}$，得 $E'=\\dfrac12\\int|f(\\tau)|^{2}d\\tau=\\dfrac E2$。\n\n用频谱验证：$f(2t)\\leftrightarrow\\dfrac12F\\!\\left(j\\dfrac{\\omega}{2}\\right)$，于是 $E'=\\dfrac{1}{2\\pi}\\int\\dfrac14\\left|F\\!\\left(j\\dfrac{\\omega}{2}\\right)\\right|^{2}d\\omega$，令 $\\omega=2u$ 得 $\\dfrac{1}{2\\pi}\\cdot\\dfrac14\\cdot2\\int|F(ju)|^{2}du=\\dfrac E2$。\n\n选 $E$ 认为能量与尺度无关；选 $2E$ 把因子方向弄反；选 $\\dfrac{E}{4}$ 只保留了幅度平方的 $\\dfrac14$、漏了频带展宽带来的 2 倍。"
  },
  {
    id: "SIG-42", subject: "信号", type: "choice", kp: ["S4-5"], difficulty: 3,
    source: "自编·理想低通滤波器的可实现性",
    stem: "理想低通滤波器 $H(j\\omega)=\\mathrm{rect}\\left(\\dfrac{\\omega}{2\\omega_{c}}\\right)$（相频特性为零）是（　）。",
    options: ["因果、物理可实现", "因果但临界稳定", "非因果但物理可实现", "非因果、物理不可实现"],
    answer: 3,
    solution: "其冲激响应为 $h(t)=\\dfrac{\\omega_{c}}{\\pi}\\mathrm{Sa}(\\omega_{c}t)$，在 $t<0$ 时已有非零值，说明 $t=0$ 时刻的输出取决于未来的输入，故**非因果**。\n\n矩形幅频特性在 $\\omega_{c}$ 处由 $1$ 突降为 $0$，不满足佩利-维纳准则，因此**物理不可实现**，工程上只能用有过渡带的滤波器逼近。\n\n选「因果」是只看了 $h(t)$ 中随 $t$ 增长的可见部分、忽略了负时间轴上的拖尾；选「非因果但可实现」把因果性与可实现性割裂（对 LTI 系统两者等价）。"
  },
  {
    id: "SIG-43", subject: "信号", type: "choice", kp: ["S4-3"], difficulty: 5,
    source: "自编·周期冲激串的傅里叶变换",
    stem: "周期冲激串 $\\delta_{T}(t)=\\sum_{n=-\\infty}^{\\infty}\\delta(t-nT)$ 的傅里叶变换为（　）。",
    options: [
      "$\\omega_{1}\\sum_{n=-\\infty}^{\\infty}\\delta(\\omega-n\\omega_{1})$",
      "$\\sum_{n=-\\infty}^{\\infty}\\delta(\\omega-n\\omega_{1})$",
      "$T\\sum_{n=-\\infty}^{\\infty}\\delta(\\omega-n\\omega_{1})$",
      "$\\dfrac{1}{\\omega_{1}}\\sum_{n=-\\infty}^{\\infty}\\delta(\\omega-n\\omega_{1})$"
    ],
    answer: 0,
    solution: "周期信号的傅里叶变换为 $2\\pi\\sum F_{n}\\delta(\\omega-n\\omega_{1})$，其中 $\\omega_{1}=\\dfrac{2\\pi}{T}$。\n\n对 $\\delta_{T}(t)$ 求系数：$F_{n}=\\dfrac1T\\int_{-T/2}^{T/2}\\delta(t)e^{-jn\\omega_{1}t}dt=\\dfrac1T$，即所有谐波系数都相等。\n\n故 $\\mathscr{F}[\\delta_{T}(t)]=2\\pi\\cdot\\dfrac1T\\sum\\delta(\\omega-n\\omega_{1})=\\omega_{1}\\sum\\delta(\\omega-n\\omega_{1})$。\n\n选 $\\sum\\delta$ 漏了 $2\\pi/T$；选 $T\\sum\\delta$ 把 $T$ 与 $\\dfrac1T$ 用反；选 $\\dfrac{1}{\\omega_{1}}\\sum\\delta$ 得到的是 $\\dfrac{T}{2\\pi}$。"
  },

  /* ---------- 第 5 章 ---------- */
  {
    id: "SIG-44", subject: "信号", type: "choice", kp: ["S5-1"], difficulty: 2,
    source: "自编·抽样信号频谱的周期",
    stem: "最高频率为 $5\\,$kHz 的带限信号，用 $f_{s}=12\\,$kHz 的理想冲激抽样，则抽样信号频谱中相邻两个频谱块中心之间的间隔为（　）。",
    options: ["$5\\,$kHz", "$6\\,$kHz", "$12\\,$kHz", "$24\\,$kHz"],
    answer: 2,
    solution: "抽样后频谱是原频谱以 $\\omega_{s}=2\\pi f_{s}$ 为周期的延拓：$F_{s}(j\\omega)=\\dfrac1T\\sum_{n}F\\big(j(\\omega-n\\omega_{s})\\big)$。\n\n因此相邻频谱块中心的间隔就是抽样频率 $f_{s}=12\\,$kHz，与信号带宽无关。\n\n这里 $f_{s}=12\\,$kHz $>2f_{m}=10\\,$kHz，满足抽样定理，频谱块之间留有 $2\\,$kHz 的保护间隔，不会有混叠。\n\n选 $6\\,$kHz 是错把 $f_{s}/2$ 当间隔；选 $5\\,$kHz 是拿信号的最高频率当间隔；选 $24\\,$kHz 是又乘了一个 2。"
  },
  {
    id: "SIG-45", subject: "信号", type: "choice", kp: ["S5-1"], difficulty: 4,
    source: "自编·抽样频谱的幅度因子",
    stem: "理想冲激抽样 $f_{s}(t)=f(t)\\sum_{n=-\\infty}^{\\infty}\\delta(t-nT)$ 的频谱中，每个延拓频谱块的幅度相对于 $F(j\\omega)$ 被乘上的因子是（　）。",
    options: ["$1$", "$\\dfrac{1}{T}$", "$T$", "$\\dfrac{2\\pi}{T}$"],
    answer: 1,
    solution: "时域相乘对应频域卷积（带 $\\dfrac{1}{2\\pi}$ 系数）：$F_{s}(j\\omega)=\\dfrac{1}{2\\pi}F(j\\omega)*\\left[\\omega_{s}\\sum_{n}\\delta(\\omega-n\\omega_{s})\\right]$。\n\n把 $\\omega_{s}=\\dfrac{2\\pi}{T}$ 代入，系数 $\\dfrac{1}{2\\pi}\\cdot\\dfrac{2\\pi}{T}=\\dfrac1T$，即 $F_{s}(j\\omega)=\\dfrac1T\\sum_{n}F\\big(j(\\omega-n\\omega_{s})\\big)$。\n\n所以每个频谱块的幅度是原来的 $\\dfrac1T$（数值上等于抽样频率 $f_{s}$），这也是重建时低通滤波器要取增益 $T$ 的原因。\n\n选 $1$ 忽略了卷积系数与冲激串强度；选 $T$ 把乘除弄反；选 $\\dfrac{2\\pi}{T}$ 只算了冲激串强度、漏了 $\\dfrac{1}{2\\pi}$。"
  },
  {
    id: "SIG-46", subject: "信号", type: "choice", kp: ["S5-2"], difficulty: 2,
    source: "自编·混叠频率的计算",
    stem: "对 $f(t)=\\cos(2\\pi\\cdot3000t)$ 以 $f_{s}=4\\,$kHz 抽样并理想重建，恢复出的正弦频率为（　）。",
    options: ["$1\\,$kHz", "$2\\,$kHz", "$3.5\\,$kHz", "$7\\,$kHz"],
    answer: 0,
    solution: "信号频率 $f_{0}=3\\,$kHz，而 $f_{s}=4\\,$kHz $<2f_{0}=6\\,$kHz，不满足抽样定理，必然混叠。\n\n混叠频率是 $|f_{0}-kf_{s}|$ 中落在 $\\left(0,\\dfrac{f_{s}}{2}\\right]$ 内的那个：$|3000-4000|=1000\\,$Hz。\n\n从频谱看，$3\\,$kHz 的谱线经以 $4\\,$kHz 为周期的延拓后在 $-1\\,$kHz 处出现镜像，取正频率即 $1\\,$kHz。\n\n选 $2\\,$kHz 是 $\\dfrac{f_{s}}{2}$；选 $3.5\\,$kHz、$7\\,$kHz 既不在重建带宽内，也不符合混叠公式。"
  },
  {
    id: "SIG-47", subject: "信号", type: "choice", kp: ["S5-2"], difficulty: 4,
    source: "自编·混叠的不可逆性",
    stem: "若带限信号以低于奈奎斯特率的频率抽样，则（　）。",
    options: [
      "提高重建滤波器的阶数即可完全恢复原信号",
      "混叠分量与有用分量在频域重叠，无法用线性滤波消除",
      "只要把重建滤波器增益取为 $T$ 就能完全恢复",
      "混叠只改变幅度、不改变频率，故不影响恢复"
    ],
    answer: 1,
    solution: "抽样后频谱是原谱以 $f_{s}$ 为周期的延拓；当 $f_{s}<2f_{m}$ 时，相邻频谱块相互重叠，高频分量被搬到低频位置。\n\n重叠意味着混叠分量与有用分量占据同一频段，任何线性滤波器都无法把它们分开——信息已被不可逆地混合，只能靠提高抽样率或加前置抗混叠滤波器预防。\n\n选「提高阶数」混淆了滤波器选择性与混叠；选「增益取 $T$」只解决幅度标定；选「只改幅度」与事实相反，混叠改变的正是频率位置。"
  },

  /* ---------- 第 6 章 ---------- */
  {
    id: "SIG-48", subject: "信号", type: "choice", kp: ["S6-1"], difficulty: 4,
    source: "自编·双边信号的收敛域",
    stem: "信号 $f(t)=e^{-2t}\\varepsilon(t)+e^{3t}\\varepsilon(-t)$ 的拉氏变换的收敛域为（　）。",
    options: [
      "$-2<\\mathrm{Re}(s)<3$",
      "$\\mathrm{Re}(s)<3$",
      "$\\mathrm{Re}(s)>-2$",
      "$\\mathrm{Re}(s)>3$"
    ],
    answer: 0,
    solution: "第一项 $e^{-2t}\\varepsilon(t)$ 是右边信号，极点在 $s=-2$，收敛域为 $\\mathrm{Re}(s)>-2$。\n\n第二项 $e^{3t}\\varepsilon(-t)$ 是左边信号，极点在 $s=3$，由 $\\int_{-\\infty}^{0}e^{(3-s)t}dt$ 收敛得 $\\mathrm{Re}(s)<3$。\n\n两者相加为双边信号，收敛域取交集：$-2<\\mathrm{Re}(s)<3$，是一条竖直带，带内不含任何极点。\n\n选单边收敛域是只算了一项；选 $\\mathrm{Re}(s)>3$ 是把两项都当成右边信号。"
  },
  {
    id: "SIG-49", subject: "信号", type: "choice", kp: ["S6-4"], difficulty: 5,
    source: "自编·部分分式法求逆拉氏变换",
    stem: "$F(s)=\\dfrac{s+3}{(s+1)(s+2)}$，收敛域为 $\\mathrm{Re}(s)>-1$，则 $f(t)=$（　）。",
    options: [
      "$(e^{-t}-2e^{-2t})\\varepsilon(t)$",
      "$(2e^{-t}+e^{-2t})\\varepsilon(t)$",
      "$(2e^{-t}-e^{-2t})\\varepsilon(t)$",
      "$(2e^{-2t}-e^{-t})\\varepsilon(t)$"
    ],
    answer: 2,
    solution: "设 $\\dfrac{s+3}{(s+1)(s+2)}=\\dfrac{K_{1}}{s+1}+\\dfrac{K_{2}}{s+2}$，用留数法：$K_{1}=\\left.\\dfrac{s+3}{s+2}\\right|_{s=-1}=2$，$K_{2}=\\left.\\dfrac{s+3}{s+1}\\right|_{s=-2}=-1$。\n\n验证：$\\dfrac{2}{s+1}-\\dfrac{1}{s+2}=\\dfrac{2(s+2)-(s+1)}{(s+1)(s+2)}=\\dfrac{s+3}{(s+1)(s+2)}$ ✓。\n\n收敛域 $\\mathrm{Re}(s)>-1$ 在最右极点右侧，对应右边信号，故 $f(t)=(2e^{-t}-e^{-2t})\\varepsilon(t)$。\n\n可用初值定理校验：$f(0_{+})=\\lim_{s\\to\\infty}sF(s)=1$，而正确解的 $f(0_{+})=2-1=1$ ✓；选项 $(e^{-t}-2e^{-2t})$ 给出 $-1$、$(2e^{-t}+e^{-2t})$ 给出 $3$，都与初值矛盾。"
  },
  {
    id: "SIG-50", subject: "信号", type: "choice", kp: ["S6-5"], difficulty: 4,
    source: "自编·拉氏变换解微分方程（含初值）",
    stem: "系统 $y''(t)+3y'(t)+2y(t)=f(t)$，已知 $y(0_{-})=0$、$y'(0_{-})=1$、$f(t)=0$，则零输入响应 $y_{zi}(t)=$（　）。",
    options: [
      "$(e^{-2t}-e^{-t})\\varepsilon(t)$",
      "$(2e^{-t}-e^{-2t})\\varepsilon(t)$",
      "$e^{-t}\\varepsilon(t)$",
      "$(e^{-t}-e^{-2t})\\varepsilon(t)$"
    ],
    answer: 3,
    solution: "对零输入情形取拉氏变换，注意 $\\mathscr{L}[y'']=s^{2}Y-sy(0_{-})-y'(0_{-})$：\n\n$(s^{2}Y-0-1)+3(sY-0)+2Y=0$，得 $(s^{2}+3s+2)Y=1$，即 $Y(s)=\\dfrac{1}{(s+1)(s+2)}$。\n\n部分分式 $\\dfrac{1}{(s+1)(s+2)}=\\dfrac{1}{s+1}-\\dfrac{1}{s+2}$，反变换得 $y_{zi}(t)=(e^{-t}-e^{-2t})\\varepsilon(t)$。\n\n检验：$y(0_{+})=0$ ✓，$y'(0_{+})=-1+2=1$ ✓。选 $(e^{-2t}-e^{-t})$ 符号反了；选 $(2e^{-t}-e^{-2t})$ 对应 $y(0_{-})=1$ 的情形；选 $e^{-t}$ 丢了一个极点。"
  },
  {
    id: "SIG-51", subject: "信号", type: "choice", kp: ["S6-7"], difficulty: 5,
    source: "自编·由系统函数判断滤波特性",
    stem: "系统函数 $H(s)=\\dfrac{s-1}{s+1}$ 所描述的系统是（　）。",
    options: ["低通滤波器", "高通滤波器", "全通滤波器", "带通滤波器"],
    answer: 2,
    solution: "令 $s=j\\omega$：$H(j\\omega)=\\dfrac{j\\omega-1}{j\\omega+1}$，其模 $|H(j\\omega)|=\\dfrac{\\sqrt{\\omega^{2}+1}}{\\sqrt{\\omega^{2}+1}}=1$ 对一切 $\\omega$ 恒成立。\n\n幅频特性完全平坦、只改变相位，故为全通滤波器。零极点图上零点 $s=1$ 与极点 $s=-1$ 关于虚轴镜像对称，这是一阶全通滤波器的原型。\n\n不能判为低通或高通：$\\omega=0$ 时 $H=-1$、$\\omega\\to\\infty$ 时 $H\\to1$，两端幅度都等于 1，只有相位从 $180^{\\circ}$ 变到 $0^{\\circ}$。"
  },

  /* ---------- 第 7 章 ---------- */
  {
    id: "SIG-52", subject: "信号", type: "choice", kp: ["S7-2"], difficulty: 4,
    source: "自编·z 变换收敛域的判定",
    stem: "序列 $x[n]=2^{n}\\varepsilon[n]+3^{n}\\varepsilon[-n-1]$ 的 z 变换收敛域为（　）。",
    options: ["$|z|>3$", "$2<|z|<3$", "$|z|<2$", "$|z|>2$"],
    answer: 1,
    solution: "$2^{n}\\varepsilon[n]$ 是右边序列，极点在 $z=2$，收敛域 $|z|>2$。\n\n$3^{n}\\varepsilon[-n-1]$ 是左边序列，极点在 $z=3$，收敛域 $|z|<3$。\n\n两者相加的收敛域取交集，得环状区域 $2<|z|<3$；该环内不含极点，变换存在。\n\n选 $|z|>3$ 或 $|z|<2$ 都只取了其中一项；选 $|z|>2$ 忽略了左边序列要求 $|z|<3$。"
  },
  {
    id: "SIG-53", subject: "信号", type: "choice", kp: ["S7-4"], difficulty: 3,
    source: "自编·z 域的尺度变换性质",
    stem: "若 $x[n]\\leftrightarrow X(z)$（收敛域为 $R$），则 $a^{n}x[n]$ 的 z 变换为（　）。",
    options: ["$X(az)$", "$aX(z)$", "$X(z-a)$", "$X\\!\\left(\\dfrac{z}{a}\\right)$"],
    answer: 3,
    solution: "由定义 $Z\\{a^{n}x[n]\\}=\\sum_{n}a^{n}x[n]z^{-n}=\\sum_{n}x[n]\\left(\\dfrac{z}{a}\\right)^{-n}=X\\!\\left(\\dfrac{z}{a}\\right)$。\n\n收敛域随之缩放为 $|a|R$（把原收敛域的边界乘以 $|a|$），极点位置也整体乘 $a$。\n\n这是 z 域的尺度（伸缩）性质，与连续域 $e^{at}f(t)\\leftrightarrow F(s-a)$ 的「平移」形式不同——离散域的指数加权使 $z$ 被除以 $a$。\n\n选 $X(az)$ 把乘除颠倒；选 $aX(z)$ 误当幅度加权；选 $X(z-a)$ 是照搬了连续域的平移公式。"
  },
  {
    id: "SIG-54", subject: "信号", type: "choice", kp: ["S7-5"], difficulty: 4,
    source: "自编·逆 z 变换（部分分式展开）",
    stem: "$F(z)=\\dfrac{z}{(z-1)(z-2)}$，收敛域 $|z|>2$，则 $f[n]=$（　）。",
    options: [
      "$(2^{n}-1)\\varepsilon[n]$",
      "$(1-2^{n})\\varepsilon[n]$",
      "$(2^{n}+1)\\varepsilon[n]$",
      "$2^{n-1}\\varepsilon[n]$"
    ],
    answer: 0,
    solution: "先展开 $\\dfrac{F(z)}{z}$：$\\dfrac{F(z)}{z}=\\dfrac{1}{(z-1)(z-2)}=\\dfrac{-1}{z-1}+\\dfrac{1}{z-2}$，两边乘 $z$ 得 $F(z)=\\dfrac{-z}{z-1}+\\dfrac{z}{z-2}$。\n\n由基本变换对 $\\dfrac{z}{z-a}\\leftrightarrow a^{n}\\varepsilon[n]$（$|z|>|a|$），得 $f[n]=2^{n}\\varepsilon[n]-\\varepsilon[n]=(2^{n}-1)\\varepsilon[n]$。\n\n收敛域 $|z|>2$ 在最外极点之外，对应右边（因果）序列，两项都取 $\\varepsilon[n]$。若收敛域改为 $1<|z|<2$，第二项要取左边，结果完全不同。\n\n选 $(1-2^{n})$ 符号反了；选 $(2^{n}+1)$ 是把 $-1$ 的留数符号弄错；选 $2^{n-1}\\varepsilon[n]$ 是把留数当成 $\\dfrac12$ 的结果。"
  },
  {
    id: "SIG-55", subject: "信号", type: "choice", kp: ["S7-1"], difficulty: 3,
    source: "自编·差分方程齐次解的形式",
    stem: "差分方程 $y[n]-3y[n-1]+2y[n-2]=x[n]$ 的齐次解形式为（　）。",
    options: [
      "$C_{1}\\cdot2^{n}+C_{2}\\cdot3^{n}$",
      "$C_{1}+C_{2}\\cdot2^{n}$",
      "$C_{1}+C_{2}\\cdot(-2)^{n}$",
      "$(C_{1}+C_{2}n)\\cdot2^{n}$"
    ],
    answer: 1,
    solution: "令齐次方程 $y[n]-3y[n-1]+2y[n-2]=0$，设 $y[n]=\\lambda^{n}$，代入后约去 $\\lambda^{n-2}$ 得特征方程 $\\lambda^{2}-3\\lambda+2=0$。\n\n因式分解 $(\\lambda-1)(\\lambda-2)=0$，特征根 $\\lambda_{1}=1$、$\\lambda_{2}=2$，两个互异单根对应 $y_{h}[n]=C_{1}\\cdot1^{n}+C_{2}\\cdot2^{n}=C_{1}+C_{2}\\cdot2^{n}$。\n\n选 $C_{1}2^{n}+C_{2}3^{n}$ 是把特征根当成了 2 和 3（对应 $y[n]-5y[n-1]+6y[n-2]=0$）；选含 $(-2)^{n}$ 的符号写错；选重根形式 $(C_{1}+C_{2}n)2^{n}$ 只在 $\\lambda=2$ 为二重根时成立。"
  },
  {
    id: "SIG-56", subject: "信号", type: "choice", kp: ["S7-7"], difficulty: 3,
    source: "自编·离散系统频率响应与滤波特性",
    stem: "系统 $H(z)=\\dfrac{1}{1-0.5z^{-1}}$（收敛域 $|z|>0.5$）是（　）。",
    options: ["低通滤波器", "高通滤波器", "带通滤波器", "全通滤波器"],
    answer: 0,
    solution: "频率响应 $H(e^{j\\omega})=\\dfrac{1}{1-0.5e^{-j\\omega}}$，其模为 $|H(e^{j\\omega})|=\\dfrac{1}{\\sqrt{1.25-\\cos\\omega}}$。\n\n$\\omega=0$ 时分母最小、$|H|=2$（最大值）；$\\omega=\\pi$ 时 $|H|=\\dfrac{1}{1.5}\\approx0.667$（最小值），故低频增益大、高频衰减，是低通。\n\n极点 $z=0.5$ 落在正实轴且靠近单位圆，峰值出现在 $\\omega=0$ 一侧，这正是低通的特征；极点若移到 $z=-0.5$ 则变成高通。\n\n选高通是把极点位置与通带位置的对应关系弄反；选带通、全通与本例的单极点结构不符。"
  },

  /* ---------- 第 8 章 ---------- */
  {
    id: "SIG-57", subject: "信号", type: "choice", kp: ["S8-1"], difficulty: 5,
    source: "自编·由微分方程列状态方程",
    stem: "系统 $y''(t)+3y'(t)+2y(t)=f(t)$，取状态变量 $x_{1}=y$、$x_{2}=\\dot y$，则系统矩阵 $A=$（　）。",
    options: [
      "$\\begin{bmatrix}0&1\\\\2&3\\end{bmatrix}$",
      "$\\begin{bmatrix}-2&-3\\\\0&1\\end{bmatrix}$",
      "$\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}$",
      "$\\begin{bmatrix}-3&-2\\\\1&0\\end{bmatrix}$"
    ],
    answer: 2,
    solution: "由 $x_{1}=y$、$x_{2}=\\dot y$ 得 $\\dot x_{1}=x_{2}$；再由原方程解出最高阶导数：$\\ddot y=f-3\\dot y-2y=f-3x_{2}-2x_{1}$，即 $\\dot x_{2}=-2x_{1}-3x_{2}+f$。\n\n写成矩阵形式 $\\dot{\\boldsymbol x}=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}\\boldsymbol x+\\begin{bmatrix}0\\\\1\\end{bmatrix}f$，故 $A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}$。\n\n验算：$\\det(sI-A)=s(s+3)+2=s^{2}+3s+2$，特征根 $-1,-2$，与微分方程的特征根一致。\n\n选含 $[2,3]$ 的是移项后漏了负号；选首行为 $[-2,-3]$ 的是把系数直接按原顺序摆放、忘了伴随形结构。"
  },
  {
    id: "SIG-58", subject: "信号", type: "choice", kp: ["S8-1"], difficulty: 2,
    source: "自编·对角系统的状态转移矩阵",
    stem: "状态方程 $\\dot{\\boldsymbol x}=\\begin{bmatrix}-1&0\\\\0&-2\\end{bmatrix}\\boldsymbol x$ 的状态转移矩阵 $\\Phi(t)=$（　）。",
    options: [
      "$\\begin{bmatrix}e^{t}&0\\\\0&e^{2t}\\end{bmatrix}$",
      "$\\begin{bmatrix}e^{-2t}&0\\\\0&e^{-t}\\end{bmatrix}$",
      "$\\begin{bmatrix}0&e^{-t}\\\\e^{-2t}&0\\end{bmatrix}$",
      "$\\begin{bmatrix}e^{-t}&0\\\\0&e^{-2t}\\end{bmatrix}$"
    ],
    answer: 3,
    solution: "对角矩阵的矩阵指数等于各对角元分别取指数：$e^{At}=\\mathrm{diag}\\left(e^{\\lambda_{1}t},e^{\\lambda_{2}t}\\right)$，本题 $\\lambda_{1}=-1$、$\\lambda_{2}=-2$。\n\n也可由 $\\Phi(t)=\\mathscr{L}^{-1}\\left[(sI-A)^{-1}\\right]$ 验证：$(sI-A)^{-1}=\\mathrm{diag}\\left(\\dfrac{1}{s+1},\\dfrac{1}{s+2}\\right)$，逐项反变换即得。\n\n物理意义：两个状态变量相互独立，各自按 $e^{-t}$、$e^{-2t}$ 衰减，互不耦合。\n\n选正指数的是漏了 $\\lambda$ 的负号；选反对角阵是把对角情形与非对角（存在耦合）情形搞混；选 $e^{-2t}$、$e^{-t}$ 顺序颠倒的是把状态编号与特征值对应错了。"
  },
  {
    id: "SIG-59", subject: "信号", type: "choice", kp: ["S8-1"], difficulty: 3,
    source: "自编·状态转移矩阵的基本性质",
    stem: "关于状态转移矩阵 $\\Phi(t)=e^{At}$，下列关系正确的是（　）。",
    options: [
      "$\\Phi(0)=0$",
      "$\\Phi(t_{1}+t_{2})=\\Phi(t_{1})+\\Phi(t_{2})$",
      "$\\Phi^{-1}(t)=\\Phi(-t)$",
      "$\\Phi(t)\\Phi(-t)=-I$"
    ],
    answer: 2,
    solution: "由级数定义 $e^{At}=I+At+\\dfrac{1}{2!}A^{2}t^{2}+\\cdots$，取 $t=0$ 得 $\\Phi(0)=I$，而不是零矩阵。\n\n同一矩阵的指数可交换，故 $\\Phi(t_{1}+t_{2})=e^{A(t_{1}+t_{2})}=e^{At_{1}}e^{At_{2}}=\\Phi(t_{1})\\Phi(t_{2})$，是乘法半群关系而非相加。\n\n又 $\\Phi(t)\\Phi(-t)=e^{At}e^{-At}=I$，故 $\\Phi^{-1}(t)=\\Phi(-t)$，此项正确。\n\n选 $\\Phi(0)=0$ 把矩阵指数与标量函数的零点混淆；选相加关系是把状态转移当成了线性算子；选 $\\Phi(t)\\Phi(-t)=-I$ 把单位阵错写成负单位阵。"
  },
  {
    id: "SIG-60", subject: "信号", type: "choice", kp: ["S8-1"], difficulty: 4,
    source: "自编·由系统矩阵求特征多项式",
    stem: "系统矩阵 $A=\\begin{bmatrix}0&1\\\\-2&-3\\end{bmatrix}$，其特征多项式 $\\det(sI-A)$ 为（　）。",
    options: ["$s^{2}+3s+2$", "$s^{2}+3s-2$", "$s^{2}-3s+2$", "$s^{2}+2s+3$"],
    answer: 0,
    solution: "$sI-A=\\begin{bmatrix}s&-1\\\\2&s+3\\end{bmatrix}$，二阶行列式按 $s(s+3)-(-1)\\cdot2$ 计算。\n\n$s(s+3)+2=s^{2}+3s+2$。注意两个副对角元 $-1$ 与 $2$ 的乘积为 $-2$，而这一项在行列式中是被**减去**的，减负得正，故常数项为 $+2$。\n\n令其为零得特征根 $-1,-2$，与 $y''+3y'+2y=f$ 的特征根一致，可作为验算。\n\n选 $s^{2}+3s-2$ 是符号算错；选 $s^{2}-3s+2$ 把对角元符号弄反；选 $s^{2}+2s+3$ 是把矩阵元素直接拼进多项式。"
  }
]);