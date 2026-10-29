/* 信号与系统 · 第 6 章 拉普拉斯变换专项（SIG-79 ~ SIG-91） */
window.QSIGNAL = (window.QSIGNAL || []).concat([
  /* ---------- S6-1 定义与收敛域 ---------- */
  {
    id: "SIG-79", subject: "信号", type: "choice", kp: ["S6-1"], difficulty: 2,
    source: "自编·有限长信号的收敛域",
    stem: "信号 $f(t)=\\varepsilon(t)-\\varepsilon(t-2)$ 的拉氏变换的收敛域是（　）。",
    options: ["$\\sigma>0$", "整个 $s$ 平面", "$\\sigma<0$", "$0<\\sigma<2$"],
    answer: 1,
    solution: "该信号只在 $0<t<2$ 内非零，故\n\n$$F(s)=\\int_{0}^{2}e^{-st}dt=\\frac{1-e^{-2s}}{s}$$\n\n对任意有限 $s$：$\\left|\\int_{0}^{2}e^{-st}dt\\right|\\le\\int_{0}^{2}e^{-\\sigma t}dt<\\infty$，所以收敛域是**整个 $s$ 平面**。$s=0$ 是**可去奇点**（$F(0)=2$），不是极点，因此不能套用「因果信号收敛域在最右极点右侧」这句话。\n\n选 $\\sigma>0$ 是把 $\\varepsilon(t)$ 的收敛域直接搬来，忽略了信号已被截断成有限长；选 $\\sigma<0$ 把因果判据的方向用反；选 $0<\\sigma<2$ 是把信号的持续时长 $2$ 误当成收敛域边界——时长只改变 $F(s)$ 的分子，与收敛域无关。"
  },
  {
    id: "SIG-80", subject: "信号", type: "choice", kp: ["S6-1"], difficulty: 3,
    source: "自编·左边信号的收敛域",
    stem: "已知 $F(s)=\\dfrac{1}{s+3}$，且对应信号 $f(t)$ 为左边信号（$t>0$ 时 $f(t)=0$），则其收敛域为（　）。",
    options: ["$\\sigma>-3$", "$\\sigma>0$", "$\\sigma<-3$", "$-3<\\sigma<0$"],
    answer: 2,
    solution: "左边信号在本题只能是 $f(t)=-e^{-3t}\\varepsilon(-t)$，于是\n\n$$F(s)=\\int_{-\\infty}^{0}\\left(-e^{-3t}\\right)e^{-st}dt=\\frac{1}{s+3}$$\n\n积分在 $t\\to-\\infty$ 一端的收敛条件是 $\\mathrm{Re}(s+3)<0$，即 $\\sigma<-3$：收敛域落在最左极点 $s=-3$ 的**左侧**。同一个 $F(s)$ 配不同收敛域对应完全不同的时间信号，写变换必须带收敛域。\n\n选 $\\sigma>-3$ 是默认信号因果，那是右边信号的结论；选 $\\sigma>0$ 与极点位置无关，纯属照搬阶跃的收敛域；选 $-3<\\sigma<0$ 是带状收敛域，只有双边信号才可能出现。"
  },

  /* ---------- S6-2 常用变换对 ---------- */
  {
    id: "SIG-81", subject: "信号", type: "choice", kp: ["S6-2"], difficulty: 2,
    source: "自编·正弦的拉氏变换对",
    stem: "$\\mathscr{L}[\\sin(3t)\\varepsilon(t)]=$（　）。",
    options: ["$\\dfrac{3}{s^{2}+9}$", "$\\dfrac{s}{s^{2}+9}$", "$\\dfrac{3}{s^{2}-9}$", "$\\dfrac{1}{s^{2}+9}$"],
    answer: 0,
    solution: "按定义算：$\\int_{0}^{\\infty}\\sin(3t)e^{-st}dt=\\dfrac{3}{s^{2}+9}$，收敛域 $\\sigma>0$。\n\n记住成对的结构：$\\sin(\\omega_{0}t)\\leftrightarrow\\dfrac{\\omega_{0}}{s^{2}+\\omega_{0}^{2}}$，$\\cos(\\omega_{0}t)\\leftrightarrow\\dfrac{s}{s^{2}+\\omega_{0}^{2}}$——**正弦分子是 $\\omega_{0}$，余弦分子是 $s$**，这是两对唯一的区别。\n\n选 $\\dfrac{s}{s^{2}+9}$ 张冠李戴用了余弦对；选 $\\dfrac{3}{s^{2}-9}$ 把分母的加号写成减号，那是 $\\sinh(3t)$ 的变换；选 $\\dfrac{1}{s^{2}+9}$ 漏掉了分子 $\\omega_{0}=3$，与 $t=0_{+}$ 处 $f(0)=0$、$f'(0)=3$ 的初值也对不上。"
  },
  {
    id: "SIG-82", subject: "信号", type: "choice", kp: ["S6-2"], difficulty: 3,
    source: "自编·冲激与余弦的组合",
    stem: "$\\mathscr{L}[2\\delta(t)+3\\cos(2t)\\varepsilon(t)]=$（　）。",
    options: [
      "$2+\\dfrac{3}{s^{2}+4}$",
      "$2+\\dfrac{6}{s^{2}+4}$",
      "$2s+\\dfrac{3s}{s^{2}+4}$",
      "$2+\\dfrac{3s}{s^{2}+4}$"
    ],
    answer: 3,
    solution: "拉氏变换是线性运算，逐项查表即可：$\\mathscr{L}[\\delta(t)]=1$，$\\mathscr{L}[\\cos(2t)\\varepsilon(t)]=\\dfrac{s}{s^{2}+4}$。\n\n$$\\mathscr{L}[2\\delta(t)+3\\cos(2t)\\varepsilon(t)]=2\\cdot1+3\\cdot\\frac{s}{s^{2}+4}=2+\\frac{3s}{s^{2}+4}$$\n\n注意 $\\delta(t)$ 的变换是常数 $1$，与 $\\sigma$ 无关。\n\n选 $2+\\dfrac{3}{s^{2}+4}$ 把余弦写成正弦型（分子错成 $\\omega_{0}=2$，又只留了幅度 $3$）；选 $2+\\dfrac{6}{s^{2}+4}$ 既用了正弦型，又把幅度 $3$ 与 $\\omega_{0}=2$ 相乘；选 $2s+\\dfrac{3s}{s^{2}+4}$ 把 $\\delta(t)$ 的变换记成 $s$——$s$ 对应的是 $\\delta'(t)$。"
  },

  /* ---------- S6-3 拉氏变换的性质 ---------- */
  {
    id: "SIG-83", subject: "信号", type: "choice", kp: ["S6-3"], difficulty: 2,
    source: "自编·s 域平移",
    stem: "$\\mathscr{L}[te^{-2t}\\varepsilon(t)]=$（　）。",
    options: [
      "$\\dfrac{1}{(s-2)^{2}}$",
      "$\\dfrac{1}{(s+2)^{2}}$",
      "$\\dfrac{1}{s^{2}+4}$",
      "$\\dfrac{1}{s+2}$"
    ],
    answer: 1,
    solution: "先查基本对 $t\\varepsilon(t)\\leftrightarrow\\dfrac{1}{s^{2}}$，再用 $s$ 域平移 $e^{-at}f(t)\\leftrightarrow F(s+a)$，取 $a=2$：\n\n$$\\mathscr{L}[te^{-2t}\\varepsilon(t)]=\\left.\\frac{1}{s^{2}}\\right|_{s\\to s+2}=\\frac{1}{(s+2)^{2}}$$\n\n方向要记牢：时域乘 $e^{-2t}$ 让极点从 $0$ 左移到 $-2$，所以是 $s\\to s+2$；乘 $e^{+2t}$ 才是 $s\\to s-2$。\n\n选 $\\dfrac{1}{(s-2)^{2}}$ 平移方向反了，那是 $te^{2t}\\varepsilon(t)$ 的变换；选 $\\dfrac{1}{s^{2}+4}$ 把 $e^{-2t}$ 当成尺度因子去改 $s^{2}$，混淆了平移与伸缩；选 $\\dfrac{1}{s+2}$ 丢了 $t$ 因子，那是 $e^{-2t}\\varepsilon(t)$ 自己的变换。"
  },
  {
    id: "SIG-84", subject: "信号", type: "choice", kp: ["S6-3"], difficulty: 4,
    source: "自编·时移与时域线性",
    stem: "已知 $\\mathscr{L}[t\\varepsilon(t)]=\\dfrac{1}{s^{2}}$，则 $\\mathscr{L}[t\\varepsilon(t-1)]=$（　）。",
    options: [
      "$\\dfrac{e^{-s}}{s^{2}}$",
      "$e^{-s}\\left(\\dfrac{1}{s^{2}}-\\dfrac{1}{s}\\right)$",
      "$e^{-s}\\left(\\dfrac{1}{s^{2}}+\\dfrac{1}{s}\\right)$",
      "$\\dfrac{1}{s^{2}}+\\dfrac{e^{-s}}{s}$"
    ],
    answer: 2,
    solution: "时移性质只对「整体延迟」的函数成立，而 $t\\varepsilon(t-1)$ 的因子 $t$ 没有跟着延迟。先把 $t$ 改写成 $(t-1)+1$：\n\n$$t\\varepsilon(t-1)=(t-1)\\varepsilon(t-1)+\\varepsilon(t-1)$$\n\n两项分别用 $f(t-t_{0})\\varepsilon(t-t_{0})\\leftrightarrow e^{-st_{0}}F(s)$：$(t-1)\\varepsilon(t-1)\\leftrightarrow\\dfrac{e^{-s}}{s^{2}}$，$\\varepsilon(t-1)\\leftrightarrow\\dfrac{e^{-s}}{s}$，相加得\n\n$$\\mathscr{L}[t\\varepsilon(t-1)]=e^{-s}\\left(\\frac{1}{s^{2}}+\\frac{1}{s}\\right)$$\n\n选 $\\dfrac{e^{-s}}{s^{2}}$ 只处理了 $(t-1)\\varepsilon(t-1)$，漏掉补充的 $\\varepsilon(t-1)$ 项；选 $e^{-s}\\left(\\dfrac{1}{s^{2}}-\\dfrac{1}{s}\\right)$ 把拆分写成 $(t-1)-1$，符号错；选 $\\dfrac{1}{s^{2}}+\\dfrac{e^{-s}}{s}$ 只给第二项加了延迟因子，而同一函数的两项必须同步时移。"
  },

  /* ---------- S6-4 拉氏逆变换 ---------- */
  {
    id: "SIG-85", subject: "信号", type: "choice", kp: ["S6-4"], difficulty: 3,
    source: "自编·共轭极点部分分式",
    stem: "$F(s)=\\dfrac{1}{s^{2}+2s+5}$ 的逆变换 $f(t)=$（　）。",
    options: [
      "$e^{-t}\\sin(2t)\\varepsilon(t)$",
      "$\\dfrac{1}{2}e^{-t}\\cos(2t)\\varepsilon(t)$",
      "$e^{-2t}\\sin(t)\\varepsilon(t)$",
      "$\\dfrac{1}{2}e^{-t}\\sin(2t)\\varepsilon(t)$"
    ],
    answer: 3,
    solution: "分母配方：$s^{2}+2s+5=(s+1)^{2}+4=(s+1)^{2}+2^{2}$，极点为一对共轭复根 $-1\\pm j2$。\n\n查表 $\\dfrac{\\omega_{0}}{(s+a)^{2}+\\omega_{0}^{2}}\\leftrightarrow e^{-at}\\sin(\\omega_{0}t)\\varepsilon(t)$，此处 $a=1$、$\\omega_{0}=2$，而分子是 $1$ 不是 $2$，必须补系数：\n\n$$f(t)=\\frac{1}{2}e^{-t}\\sin(2t)\\varepsilon(t)$$\n\n选 $e^{-t}\\sin(2t)\\varepsilon(t)$ 漏了 $\\dfrac{1}{\\omega_{0}}=\\dfrac{1}{2}$；选 $\\dfrac{1}{2}e^{-t}\\cos(2t)\\varepsilon(t)$ 用了余弦对，余弦的分子应含 $(s+a)$；选 $e^{-2t}\\sin(t)\\varepsilon(t)$ 把配方结果读成 $(s+2)^{2}+1$，$a$ 与 $\\omega_{0}$ 同时取错。"
  },

  /* ---------- S6-5 用拉氏变换解微分方程 ---------- */
  {
    id: "SIG-86", subject: "信号", type: "choice", kp: ["S6-5"], difficulty: 3,
    source: "自编·零状态响应（阶跃激励）",
    stem: "系统 $y''(t)+3y'(t)+2y(t)=f(t)$，$y(0_{-})=y'(0_{-})=0$，$f(t)=\\varepsilon(t)$，则零状态响应 $y_{zs}(t)=$（　）。",
    options: [
      "$\\left(\\dfrac{1}{2}-e^{-t}+\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$",
      "$\\left(\\dfrac{1}{2}+e^{-t}-\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$",
      "$\\left(1-e^{-t}\\right)\\varepsilon(t)$",
      "$\\left(\\dfrac{1}{2}-e^{-t}-\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$"
    ],
    answer: 0,
    solution: "零状态下直接取拉氏变换：$(s^{2}+3s+2)Y(s)=\\dfrac{1}{s}$，即\n\n$$Y(s)=\\frac{1}{s(s+1)(s+2)}=\\frac{1/2}{s}+\\frac{-1}{s+1}+\\frac{1/2}{s+2}$$\n\n留数校验：$s=0$ 处为 $\\dfrac{1}{1\\cdot2}=\\dfrac12$；$s=-1$ 处为 $\\dfrac{1}{(-1)\\cdot1}=-1$；$s=-2$ 处为 $\\dfrac{1}{(-2)(-1)}=\\dfrac12$。反变换得\n\n$$y_{zs}(t)=\\left(\\frac{1}{2}-e^{-t}+\\frac{1}{2}e^{-2t}\\right)\\varepsilon(t)$$\n\n校验：$y(0_{+})=\\dfrac12-1+\\dfrac12=0$ ✓，$y(\\infty)=\\lim_{s\\to0}sY(s)=\\dfrac12$ ✓。\n\n选含 $+e^{-t}$ 的是把 $s=-1$ 处留数的符号算错；选 $(1-e^{-t})\\varepsilon(t)$ 只保留一个极点，把二阶系统当成一阶，稳态值也错成 $1$；选 $\\dfrac12-e^{-t}-\\dfrac12e^{-2t}$ 把 $s=-2$ 处留数的符号弄反，代入 $t=0$ 得 $y(0_{+})=-1\\ne0$，与零状态响应的初值矛盾。"
  },
  {
    id: "SIG-87", subject: "信号", type: "choice", kp: ["S6-5"], difficulty: 4,
    source: "自编·含初值的全响应",
    stem: "系统 $y''(t)+3y'(t)+2y(t)=f(t)$，$y(0_{-})=1$、$y'(0_{-})=-1$，$f(t)=\\varepsilon(t)$，则全响应 $y(t)=$（　）。",
    options: [
      "$\\left(\\dfrac{1}{2}-\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$",
      "$\\left(1-\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$",
      "$\\left(\\dfrac{1}{2}+\\dfrac{1}{2}e^{-2t}\\right)\\varepsilon(t)$",
      "$\\left(\\dfrac{1}{2}+e^{-2t}\\right)\\varepsilon(t)$"
    ],
    answer: 2,
    solution: "对含初值的方程取单边拉氏变换，$\\mathscr{L}[y'']=s^{2}Y-sy(0_{-})-y'(0_{-})$、$\\mathscr{L}[y']=sY-y(0_{-})$：\n\n$$(s^{2}+3s+2)Y-s-(-1)-3=\\frac{1}{s}$$\n\n整理得 $(s^{2}+3s+2)Y=s+2+\\dfrac{1}{s}$，即\n\n$$Y(s)=\\frac{1}{s(s+1)(s+2)}+\\frac{1}{s+1}$$\n\n第一项是零状态响应 $\\left(\\dfrac12-e^{-t}+\\dfrac12e^{-2t}\\right)\\varepsilon(t)$，第二项是零输入响应 $e^{-t}\\varepsilon(t)$，两者相加时 $e^{-t}$ 正好抵消：\n\n$$y(t)=\\left(\\frac{1}{2}+\\frac{1}{2}e^{-2t}\\right)\\varepsilon(t)$$\n\n校验：$y(0_{+})=\\dfrac12+\\dfrac12=1$ ✓，$y'(0_{+})=-1$ ✓，代回方程右端也得 $1$ ✓。\n\n选 $\\dfrac12-\\dfrac12e^{-2t}$ 使 $y(0_{+})=0$，把初值丢了；选 $1-\\dfrac12e^{-2t}$ 使 $y(0_{+})=\\dfrac12$；选 $\\dfrac12+e^{-2t}$ 使 $y(0_{+})=\\dfrac32$——三者都过不了初值校验。"
  },

  /* ---------- S6-6 系统函数、零极点与稳定性 ---------- */
  {
    id: "SIG-88", subject: "信号", type: "choice", kp: ["S6-6"], difficulty: 3,
    source: "自编·由微分方程求零点",
    stem: "系统由 $y''(t)+2y'(t)+5y(t)=f''(t)+3f'(t)$ 描述，其系统函数 $H(s)$ 的零点为（　）。",
    options: [
      "$s=-1\\pm j2$",
      "$s=0$ 与 $s=-3$",
      "$s=0$ 与 $s=3$",
      "$s=-3$ 与 $s=-2$"
    ],
    answer: 1,
    solution: "零状态下对方程两边取拉氏变换（$\\mathscr{L}[y'']=s^{2}Y$、$\\mathscr{L}[f'']=s^{2}F$）：\n\n$$(s^{2}+2s+5)Y(s)=(s^{2}+3s)F(s)\\ \\Rightarrow\\ H(s)=\\frac{s^{2}+3s}{s^{2}+2s+5}=\\frac{s(s+3)}{(s+1)^{2}+4}$$\n\n零点由分子为零确定：$s=0$ 与 $s=-3$。其中 $s=0$ 这个零点是右端 $f'$ 项带来的——输入端做微分相当于在原点插一个零点，所以系统对直流增益为零。\n\n选 $s=-1\\pm j2$ 是分母 $s^{2}+2s+5=0$ 的根，那是**极点**，恰好与零点混淆；选 $s=0$ 与 $s=3$ 把 $(s+3)$ 的根符号写反；选 $s=-3$ 与 $s=-2$ 是把分母错拆成 $(s+2)(s+3)$，那对应 $s^{2}+5s+6$。"
  },
  {
    id: "SIG-89", subject: "信号", type: "choice", kp: ["S6-6"], difficulty: 4,
    source: "自编·劳斯判据定参数范围",
    stem: "系统函数 $H(s)=\\dfrac{1}{s^{3}+2s^{2}+3s+K}$，为使该系统稳定，$K$ 的取值范围是（　）。",
    options: ["$K>0$", "$0<K<2$", "$K>6$", "$0<K<6$"],
    answer: 3,
    solution: "因果系统稳定等价于极点全在左半平面，对 $D(s)=s^{3}+2s^{2}+3s+K$ 列劳斯表：\n\n$$\\begin{array}{c|cc}s^{3}&1&3\\\\ s^{2}&2&K\\\\ s^{1}&\\dfrac{6-K}{2}&0\\\\ s^{0}&K&\\end{array}$$\n\n首列全为正才稳定：$\\dfrac{6-K}{2}>0$ 且 $K>0$，联立得 $0<K<6$。\n\n选 $K>0$ 只用了 $s^{0}$ 行，漏掉 $s^{1}$ 行的约束；选 $0<K<2$ 把 $s^{2}$ 行的首元 $2$ 当成了临界值（真正的临界值出自 $2\\cdot3-1\\cdot K=0$）；选 $K>6$ 把不等号方向弄反——$K=6$ 时 $s^{1}$ 行整行为零，出现一对纯虚根，属临界稳定而非稳定。"
  },

  /* ---------- S6-7 频率响应与零极点图 ---------- */
  {
    id: "SIG-90", subject: "信号", type: "choice", kp: ["S6-7"], difficulty: 2,
    source: "自编·幅频特性取值",
    stem: "已知 $H(s)=\\dfrac{1}{s+1}$，则 $\\omega=1\\,\\mathrm{rad/s}$ 处幅频特性的值 $|H(j1)|=$（　）。",
    options: ["$\\dfrac{1}{\\sqrt{2}}$", "$\\sqrt{2}$", "$\\dfrac{1}{2}$", "$1$"],
    answer: 0,
    solution: "令 $s=j\\omega$ 得频率响应 $H(j\\omega)=\\dfrac{1}{1+j\\omega}$，其模为\n\n$$|H(j\\omega)|=\\frac{1}{\\sqrt{1+\\omega^{2}}}$$\n\n代入 $\\omega=1$：$|H(j1)|=\\dfrac{1}{\\sqrt{2}}\\approx0.707$，相角为 $-45^{\\circ}$。几何上就是极点 $-1$ 到考察点 $j1$ 的距离 $\\sqrt{2}$ 取倒数。\n\n选 $\\sqrt{2}$ 把分子分母颠倒（算成了极点矢量的长度）；选 $1$ 只算了 $\\omega=0$ 处的直流增益；选 $\\dfrac12$ 求的是模的平方 $|H|^{2}=\\dfrac{1}{1+\\omega^{2}}$ 在 $\\omega=1$ 的值，漏了开方。"
  },
  {
    id: "SIG-91", subject: "信号", type: "choice", kp: ["S6-7"], difficulty: 3,
    source: "自编·由零点位置判滤波特性",
    stem: "系统函数 $H(s)=\\dfrac{s}{s+1}$ 所描述的系统是（　）。",
    options: ["低通滤波器", "带通滤波器", "高通滤波器", "全通滤波器"],
    answer: 2,
    solution: "令 $s=j\\omega$：$H(j\\omega)=\\dfrac{j\\omega}{j\\omega+1}$，模为\n\n$$|H(j\\omega)|=\\frac{\\omega}{\\sqrt{1+\\omega^{2}}}$$\n\n$\\omega\\to0$ 时 $|H|\\to0$——零点在原点，把直流分量挡掉；$\\omega\\to\\infty$ 时 $|H|\\to1$——高频直通。低频衰减、高频通过，故为**高通**。\n\n零极点图上：零点 $s=0$ 紧贴原点、极点 $s=-1$ 在其左侧，靠近原点的零点决定了 $\\omega\\approx0$ 附近的深度衰减，这正是高通的原型。\n\n选低通是把「有一个左半平面极点」误当判据——单极点系统既可能低通也可能高通，必须看零点位置；选带通需要一对共轭极点形成谐振峰，本例没有；选全通要求 $|H(j\\omega)|$ 恒为常数（如 $\\dfrac{s-1}{s+1}$），而本例低频处为 $0$。"
  }
]);