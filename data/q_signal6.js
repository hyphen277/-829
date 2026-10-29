/* 信号与系统 · 考点训练题（第三批 SIG-92 ~ SIG-105）
 * 全部为第 7 章：z 变换与离散系统，每考点 2 题、两题换角度。
 * 字段顺序：id, subject, type, kp, difficulty, source, stem, options, answer, solution
 */
window.QSIGNAL = (window.QSIGNAL || []).concat([
  /* ---------- S7-1 离散信号与差分方程 ---------- */
  {
    id: "SIG-92", subject: "信号", type: "choice", kp: ["S7-1"], difficulty: 2,
    source: "自编·差分方程的递推求解",
    stem: "差分方程 $y[n]-0.5y[n-1]=x[n]$，激励 $x[n]=\\varepsilon[n]$，初始状态 $y[-1]=0$，则 $y[2]=$（　）。",
    options: ["$\\dfrac{7}{4}$", "$\\dfrac{3}{2}$", "$2$", "$1$"],
    answer: 0,
    solution: "把方程写成递推形式 $y[n]=0.5y[n-1]+x[n]$，从 $n=0$ 起逐项代入（$n\\ge0$ 时 $x[n]=1$）：\n\n$$y[0]=0.5y[-1]+1=1,\\quad y[1]=0.5\\times1+1=\\frac32,\\quad y[2]=0.5\\times\\frac32+1=\\frac74$$\n\n$y[-1]$ 只是 $n=0$ 之前的一个状态，只参与 $y[0]$ 的计算，不能每一步重复代入。\n\n选 $\\dfrac32$ 是停在 $y[1]$、少递推一步；选 $2$ 是把 $n\\to\\infty$ 的稳态值 $\\dfrac{1}{1-0.5}=2$ 当成了 $y[2]$，而 $y[2]=1.75$ 尚未到达稳态；选 $1$ 只算出 $y[0]$ 就收手。"
  },
  {
    id: "SIG-93", subject: "信号", type: "choice", kp: ["S7-1"], difficulty: 3,
    source: "自编·差分方程的特解形式",
    stem: "差分方程 $y[n]-3y[n-1]+2y[n-2]=x[n]$，激励 $x[n]=1$，则其特解应设为（　）。",
    options: ["$A$", "$An$", "$An^{2}$", "$A\\cdot2^{n}$"],
    answer: 1,
    solution: "设齐次解 $y[n]=\\lambda^{n}$ 代入齐次方程，约去 $\\lambda^{n-2}$ 得特征方程 $\\lambda^{2}-3\\lambda+2=0$，特征根 $\\lambda_{1}=1$、$\\lambda_{2}=2$。\n\n激励 $x[n]=1=1^{n}$ 的底数 $1$ 与特征根 $\\lambda_{1}=1$ **重合**，属于离散域的共振，特解须在常数上乘 $n$，即设为 $An$；代回可定出 $A$。\n\n选 $A$ 没有检查共振：代入左端得 $A-3A+2A=0$，恒为零，根本无法匹配右端的 $1$；选 $An^{2}$ 对应 $\\lambda=1$ 是**二重根**的情形（特征方程应为 $(\\lambda-1)^{2}=0$），本题 $1$ 只是单根；选 $A\\cdot2^{n}$ 拿另一个特征根 $2$ 当激励底数，同样与齐次解重合而失效。"
  },

  /* ---------- S7-2 z 变换定义与收敛域 ---------- */
  {
    id: "SIG-94", subject: "信号", type: "choice", kp: ["S7-2"], difficulty: 3,
    source: "自编·有限长序列的收敛域",
    stem: "序列 $x[n]=\\delta[n]+2\\delta[n-1]+3\\delta[n-2]$ 的 z 变换及其收敛域为（　）。",
    options: [
      "$1+2z^{-1}+3z^{-2},\\ |z|>1$",
      "$1+2z+3z^{2},\\ 0<|z|\\le\\infty$",
      "$1+2z^{-1}+3z^{-2},\\ |z|<1$",
      "$1+2z^{-1}+3z^{-2},\\ 0<|z|\\le\\infty$"
    ],
    answer: 3,
    solution: "按定义只有三项求和：\n\n$$X(z)=\\sum_{n=0}^{2}x[n]z^{-n}=1+2z^{-1}+3z^{-2}$$\n\n它的极点只出现在 $z=0$（$z^{-1}$、$z^{-2}$ 在原点发散），此外任何有限 $z$ 都收敛；$z\\to\\infty$ 时 $X(z)\\to1$ 也收敛，故收敛域为 $0<|z|\\le\\infty$。\n\n选 $|z|>1$、$|z|<1$ 都是照搬无限长因果/反因果序列的收敛域形式：有限长序列没有「极点半径」可作边界，边界只由 $z=0$ 与 $z=\\infty$ 决定。选 $1+2z+3z^{2}$ 把幂次写反，那是把 $x[n]$ 当成 $n\\le0$ 的左边序列才有的结果。"
  },
  {
    id: "SIG-95", subject: "信号", type: "choice", kp: ["S7-2"], difficulty: 4,
    source: "自编·z 变换存在的条件",
    stem: "下列序列中，双边 z 变换不存在的是（　）。",
    options: [
      "$2^{n}\\varepsilon[n]$",
      "$-2^{n}\\varepsilon[-n-1]$",
      "$2^{n},\\ -\\infty<n<+\\infty$",
      "$\\delta[n]$"
    ],
    answer: 2,
    solution: "z 变换存在的充要条件是收敛域非空，即各部分（右边部分与左边部分）的收敛域有公共区域。\n\n逐项看：$2^{n}\\varepsilon[n]$ 是右边序列，$|z|>2$；$-2^{n}\\varepsilon[-n-1]$ 是左边序列，$|z|<2$；$\\delta[n]$ 只有一项，除 $z=0$、$z=\\infty$ 的个别点外全平面收敛。三者收敛域都非空。\n\n而 $2^{n}$（$-\\infty<n<+\\infty$）须拆成 $2^{n}\\varepsilon[n]+2^{n}\\varepsilon[-n-1]$：前者要 $|z|>2$、后者要 $|z|<2$，交集为空，故其双边 z 变换**不存在**。\n\n注意 $2^{n}\\varepsilon[n]$ 与 $-2^{n}\\varepsilon[-n-1]$ 的变换式同为 $\\dfrac{z}{z-2}$，靠收敛域（$|z|>2$ 与 $|z|<2$）区分，这正是「同一表达式、两个序列」的典型例子。"
  },

  /* ---------- S7-3 常用 z 变换对 ---------- */
  {
    id: "SIG-96", subject: "信号", type: "choice", kp: ["S7-3"], difficulty: 3,
    source: "自编·余弦序列的 z 变换",
    stem: "$\\mathscr{Z}\\big[\\cos(\\omega_{0}n)\\,\\varepsilon[n]\\big]=$（　）。",
    options: [
      "$\\dfrac{z\\sin\\omega_{0}}{z^{2}-2z\\cos\\omega_{0}+1},\\ |z|>1$",
      "$\\dfrac{z(z-\\cos\\omega_{0})}{z^{2}-2z\\cos\\omega_{0}+1},\\ |z|>1$",
      "$\\dfrac{z(z-\\cos\\omega_{0})}{z^{2}-2z\\cos\\omega_{0}+1},\\ |z|<1$",
      "$\\dfrac{z^{2}}{z^{2}-2z\\cos\\omega_{0}+1},\\ |z|>1$"
    ],
    answer: 1,
    solution: "由欧拉公式 $\\cos\\omega_{0}n=\\dfrac12\\big(e^{j\\omega_{0}n}+e^{-j\\omega_{0}n}\\big)$，再用指数序列变换对 $a^{n}\\varepsilon[n]\\leftrightarrow\\dfrac{z}{z-a}$（$|z|>|a|$），取 $a=e^{\\pm j\\omega_{0}}$：\n\n$$X(z)=\\frac12\\left[\\frac{z}{z-e^{j\\omega_{0}}}+\\frac{z}{z-e^{-j\\omega_{0}}}\\right]=\\frac{z(z-\\cos\\omega_{0})}{z^{2}-2z\\cos\\omega_{0}+1}$$\n\n极点为 $z=e^{\\pm j\\omega_{0}}$，位于单位圆上，因果序列的收敛域取圆外 $|z|>1$。\n\n选 $\\dfrac{z\\sin\\omega_{0}}{z^{2}-2z\\cos\\omega_{0}+1}$ 是 $\\sin\\omega_{0}n$ 的变换，分子应为 $z\\sin\\omega_{0}$ 而不是 $z(z-\\cos\\omega_{0})$，两个序列的分子只差这一项；选 $|z|<1$ 把收敛域取到极点圆内侧，与 $\\varepsilon[n]$ 的因果性矛盾；选分子为 $z^{2}$ 的选项丢掉了 $-z\\cos\\omega_{0}$，反变换会多出一个常数偏移项。"
  },
  {
    id: "SIG-97", subject: "信号", type: "choice", kp: ["S7-3"], difficulty: 2,
    source: "自编·斜坡序列的 z 变换",
    stem: "$\\mathscr{Z}\\big[n\\,\\varepsilon[n]\\big]$ 及其收敛域为（　）。",
    options: [
      "$\\dfrac{z}{(z-1)^{2}},\\ |z|>1$",
      "$\\dfrac{z^{2}}{(z-1)^{2}},\\ |z|>1$",
      "$\\dfrac{1}{(z-1)^{2}},\\ |z|>1$",
      "$\\dfrac{z}{(z-1)^{2}},\\ |z|<1$"
    ],
    answer: 0,
    solution: "写成幂级数 $\\sum_{n=0}^{\\infty}nz^{-n}$，或对已知变换对 $\\varepsilon[n]\\leftrightarrow\\dfrac{z}{z-1}$ 用 z 域微分性质 $nx[n]\\leftrightarrow-z\\dfrac{dX(z)}{dz}$：\n\n$$-z\\frac{d}{dz}\\left(\\frac{z}{z-1}\\right)=-z\\cdot\\frac{-1}{(z-1)^{2}}=\\frac{z}{(z-1)^{2}}$$\n\n极点为 $z=1$（二阶），因果序列收敛域在最外极点之外，即 $|z|>1$。\n\n选 $\\dfrac{z^{2}}{(z-1)^{2}}$ 多乘了一个 $z$，对应序列是 $(n+1)\\varepsilon[n]$（右移一位的结果）；选 $\\dfrac{1}{(z-1)^{2}}$ 漏掉分子上的 $z$，其反变换是 $(n-1)\\varepsilon[n-1]$ 一类的序列，不是 $n\\varepsilon[n]$；选 $|z|<1$ 把收敛域取在了极点圆内。"
  },

  /* ---------- S7-4 z 变换的性质 ---------- */
  {
    id: "SIG-98", subject: "信号", type: "choice", kp: ["S7-4"], difficulty: 2,
    source: "自编·移位性质",
    stem: "已知 $x[n]\\leftrightarrow X(z)$，收敛域为 $R$，则 $x[n-2]$ 的 z 变换及其收敛域为（　）。",
    options: [
      "$z^{2}X(z)$，收敛域仍为 $R$",
      "$X(z-2)$，收敛域为 $R$ 平移",
      "$z^{-2}X(z)$，收敛域仍为 $R$",
      "$z^{-2}X(z)$，收敛域为 $|z|>2$"
    ],
    answer: 2,
    solution: "由定义 $Z\\{x[n-2]\\}=\\sum_{n}x[n-2]z^{-n}$，令 $m=n-2$ 得 $\\sum_{m}x[m]z^{-(m+2)}=z^{-2}X(z)$。\n\n乘 $z^{-2}$ 只在 $z=0$ 处新引入二阶极点、在 $z=\\infty$ 处去掉两个零点，开环的环带 $R$ 本身不变，故收敛域仍为 $R$（至多在 $z=0$、$z=\\infty$ 两个端点上增减）。\n\n选 $z^{2}X(z)$ 是超前（$x[n+2]$）的公式，移位方向反了；选 $X(z-2)$ 是把连续域的 s 域平移 $e^{2t}f(t)\\leftrightarrow F(s-2)$ 直接照搬，z 域的「延迟」是乘 $z^{-m}$，不是自变量平移；选「收敛域为 $|z|>2$」把移位量 $m=2$ 误当成极点半径，收敛域的边界只能由 $X(z)$ 的极点位置决定。"
  },
  {
    id: "SIG-99", subject: "信号", type: "choice", kp: ["S7-4"], difficulty: 3,
    source: "自编·卷积和性质",
    stem: "已知 $x_{1}[n]=x_{2}[n]=\\varepsilon[n]$，则 $y[n]=x_{1}[n]*x_{2}[n]=$（　）。",
    options: ["$n\\,\\varepsilon[n]$", "$(n-1)\\varepsilon[n]$", "$\\varepsilon[n]$", "$(n+1)\\varepsilon[n]$"],
    answer: 3,
    solution: "时域卷积和对应 z 域相乘：\n\n$$Y(z)=X_{1}(z)X_{2}(z)=\\frac{z}{z-1}\\cdot\\frac{z}{z-1}=\\frac{z^{2}}{(z-1)^{2}},\\qquad |z|>1$$\n\n注意 $\\dfrac{z^{2}}{(z-1)^{2}}=z\\cdot\\dfrac{z}{(z-1)^{2}}$，而 $\\dfrac{z}{(z-1)^{2}}\\leftrightarrow n\\varepsilon[n]$，乘 $z$ 相当于右移一位，故 $y[n]=(n+1)\\varepsilon[n]$。\n\n直接按定义验算：$y[n]=\\sum_{k=0}^{n}1=n+1$（$n\\ge0$），与结果一致。\n\n选 $n\\varepsilon[n]$ 是漏掉了右移带来的 $+1$；选 $(n-1)\\varepsilon[n]$ 把移位方向弄反；选 $\\varepsilon[n]$ 把两个阶跃的卷积当成了一个阶跃，实际累加结果是随 $n$ 线性增长的。"
  },

  /* ---------- S7-5 逆 z 变换 ---------- */
  {
    id: "SIG-100", subject: "信号", type: "choice", kp: ["S7-5"], difficulty: 4,
    source: "自编·部分分式法求逆 z 变换",
    stem: "$X(z)=\\dfrac{z^{2}}{(z-1)(z-3)}$，收敛域 $|z|>3$，则 $x[n]=$（　）。",
    options: [
      "$\\dfrac12(3^{n}-1)\\varepsilon[n]$",
      "$\\dfrac12(3^{n+1}-1)\\varepsilon[n]$",
      "$\\dfrac12(3^{n+1}+1)\\varepsilon[n]$",
      "$(3^{n+1}-1)\\varepsilon[n]$"
    ],
    answer: 1,
    solution: "分子也是 $z$ 的幂，先对 $\\dfrac{X(z)}{z}$ 展开再用遮盖法：\n\n$$\\frac{X(z)}{z}=\\frac{z}{(z-1)(z-3)}=\\frac{-1/2}{z-1}+\\frac{3/2}{z-3}$$\n\n两边乘 $z$ 得 $X(z)=-\\dfrac12\\cdot\\dfrac{z}{z-1}+\\dfrac32\\cdot\\dfrac{z}{z-3}$。收敛域 $|z|>3$ 在最外极点之外，两项都取因果支：\n\n$$x[n]=\\left(-\\frac12+\\frac32\\cdot3^{n}\\right)\\varepsilon[n]=\\frac12(3^{n+1}-1)\\varepsilon[n]$$\n\n用初值校验：$x[0]=\\lim_{z\\to\\infty}X(z)=1$，而 $\\dfrac12(3-1)=1$ ✓。\n\n选 $\\dfrac12(3^{n}-1)$ 把 $\\dfrac{3/2}{z-3}$ 的留数当成 $\\dfrac12$，少了一个因子 $3$；选 $\\dfrac12(3^{n+1}+1)$ 把 $z=1$ 处留数的符号弄错；选 $(3^{n+1}-1)$ 漏掉整体系数 $\\dfrac12$。"
  },
  {
    id: "SIG-101", subject: "信号", type: "choice", kp: ["S7-5"], difficulty: 3,
    source: "自编·幂级数法求逆 z 变换",
    stem: "$X(z)=\\dfrac{1}{1-z^{-1}+0.5z^{-2}}$，收敛域 $|z|>\\dfrac{\\sqrt2}{2}$，则 $x[2]=$（　）。",
    options: ["$1$", "$-0.5$", "$0.5$", "$0.25$"],
    answer: 2,
    solution: "收敛域为某圆外区域，对应因果（右边）序列，把 $X(z)$ 按 $z^{-1}$ 的幂展开（长除法）：\n\n$$X(z)=x[0]+x[1]z^{-1}+x[2]z^{-2}+\\cdots$$\n\n将 $X(z)\\cdot(1-z^{-1}+0.5z^{-2})=1$ 两边比较同幂次系数，得递推 $x[n]=x[n-1]-0.5x[n-2]$，且 $x[-1]=x[-2]=0$：\n\n$$x[0]=1,\\quad x[1]=x[0]=1,\\quad x[2]=x[1]-0.5x[0]=1-0.5=0.5$$\n\n（分母的极点为 $z=\\dfrac{1\\pm j}{2}$，模为 $\\dfrac{\\sqrt2}{2}$，故 $|z|>\\dfrac{\\sqrt2}{2}$ 正是因果序列的收敛域，与长除法方向一致。）\n\n选 $1$ 漏掉了 $-0.5x[n-2]$ 这一项，把 $x[2]$ 直接当成 $x[1]$；选 $-0.5$ 把第二项的符号弄反，得到 $x[1]+0.5x[0]$；选 $0.25$ 把 $0.5x[0]$ 又乘了一次 $0.5$。"
  },

  /* ---------- S7-6 系统函数 H(z) 与稳定性 ---------- */
  {
    id: "SIG-102", subject: "信号", type: "choice", kp: ["S7-6"], difficulty: 3,
    source: "自编·因果系统的收敛域与稳定性",
    stem: "系统函数 $H(z)=\\dfrac{z}{(z-0.5)(z-2)}$，若该系统是因果的，则其收敛域与稳定性为（　）。",
    options: [
      "$|z|>2$，系统不稳定",
      "$|z|>0.5$，系统稳定",
      "$0.5<|z|<2$，系统稳定",
      "$|z|<0.5$，系统不稳定"
    ],
    answer: 0,
    solution: "分母的两个极点为 $z=0.5$ 与 $z=2$。因果系统的收敛域是最外极点之外的区域，故为 $|z|>2$。\n\n稳定性要求收敛域包含单位圆 $|z|=1$。$|z|>2$ 不含单位圆，故系统不稳定；从时域看，极点 $z=2$ 对应的 $2^{n}$ 模态随 $n$ 发散。\n\n选 $|z|>0.5$ 虽含单位圆，但它以 $z=0.5$ 为边界，会把极点 $z=2$ 包进收敛域（收敛域内不得有极点），且对应的系统不是因果的；选 $0.5<|z|<2$ 是双边（非因果）情形的收敛域，它确实含单位圆、对应稳定系统，但与题设「因果」矛盾；选 $|z|<0.5$ 是反因果情形的收敛域，同样不满足因果性。"
  },
  {
    id: "SIG-103", subject: "信号", type: "choice", kp: ["S7-6"], difficulty: 3,
    source: "自编·由差分方程求系统函数",
    stem: "系统 $y[n]-0.5y[n-1]=x[n]+x[n-1]$ 的系统函数及其零点、极点为（　）。",
    options: [
      "$H(z)=\\dfrac{z-1}{z-0.5}$，零点 $z=1$，极点 $z=0.5$",
      "$H(z)=\\dfrac{z+1}{z+0.5}$，零点 $z=-1$，极点 $z=-0.5$",
      "$H(z)=\\dfrac{z-0.5}{z+1}$，零点 $z=0.5$，极点 $z=-1$",
      "$H(z)=\\dfrac{z+1}{z-0.5}$，零点 $z=-1$，极点 $z=0.5$"
    ],
    answer: 3,
    solution: "零初始条件下对方程两边取 z 变换，用移位性质 $y[n-1]\\leftrightarrow z^{-1}Y(z)$、$x[n-1]\\leftrightarrow z^{-1}X(z)$：\n\n$$Y(z)-0.5z^{-1}Y(z)=X(z)+z^{-1}X(z)$$\n\n$$H(z)=\\frac{Y(z)}{X(z)}=\\frac{1+z^{-1}}{1-0.5z^{-1}}=\\frac{z+1}{z-0.5}$$\n\n分子 $z+1=0$ 给零点 $z=-1$，分母 $z-0.5=0$ 给极点 $z=0.5$。\n\n选 $\\dfrac{z-1}{z-0.5}$ 把右端 $x[n]+x[n-1]$ 的加号写成减号，零点会被误判为 $z=1$；选 $\\dfrac{z+1}{z+0.5}$ 把反馈系数 $-0.5$ 的符号弄反，极点跑到 $z=-0.5$；选 $\\dfrac{z-0.5}{z+1}$ 把分子分母整个颠倒，零点与极点互换。"
  },

  /* ---------- S7-7 离散系统频率响应 ---------- */
  {
    id: "SIG-104", subject: "信号", type: "choice", kp: ["S7-7"], difficulty: 2,
    source: "自编·频率响应的数值计算",
    stem: "系统 $H(z)=\\dfrac{1}{1+z^{-1}}$（收敛域含单位圆）在 $\\omega=\\dfrac{\\pi}{2}$ 处的幅频值为（　）。",
    options: ["$1$", "$\\sqrt{2}$", "$\\dfrac{\\sqrt{2}}{2}$", "$\\dfrac12$"],
    answer: 2,
    solution: "频率响应是 $H(z)$ 在单位圆上的取值：$H(e^{j\\omega})=\\dfrac{1}{1+e^{-j\\omega}}$。\n\n代入 $\\omega=\\dfrac{\\pi}{2}$，$e^{-j\\pi/2}=-j$，故 $H(e^{j\\pi/2})=\\dfrac{1}{1-j}$，取模：\n\n$$\\left|H(e^{j\\pi/2})\\right|=\\frac{1}{|1-j|}=\\frac{1}{\\sqrt{1^{2}+1^{2}}}=\\frac{\\sqrt2}{2}$$\n\n几何法同样可得：分母是 $e^{j\\omega}$ 到极点 $z=-1$ 的矢量长度，$\\omega=\\dfrac{\\pi}{2}$ 时该长度为 $\\sqrt2$，取倒数即 $\\dfrac{\\sqrt2}{2}$。\n\n选 $1$ 是只取了分母的实部，把 $|1+e^{-j\\omega}|$ 当成了 $1$；选 $\\sqrt2$ 只算出分母矢量长度、忘了取倒数；选 $\\dfrac12$ 是 $\\omega=0$ 处的值 $H(e^{j0})=\\dfrac{1}{1+1}$，频率代错了。"
  },
  {
    id: "SIG-105", subject: "信号", type: "choice", kp: ["S7-7"], difficulty: 4,
    source: "自编·由差分方程判断滤波特性",
    stem: "系统 $y[n]=x[n]-x[n-2]$ 的幅频特性 $|H(e^{j\\omega})|=2|\\sin\\omega|$，该系统是（　）。",
    options: ["低通滤波器", "带通滤波器", "高通滤波器", "带阻滤波器"],
    answer: 1,
    solution: "由移位性质，$y[n]=x[n]-x[n-2]$ 对应 $H(z)=1-z^{-2}$，故\n\n$$H(e^{j\\omega})=1-e^{-j2\\omega}=e^{-j\\omega}\\big(e^{j\\omega}-e^{-j\\omega}\\big)=2je^{-j\\omega}\\sin\\omega,\\qquad |H|=2|\\sin\\omega|$$\n\n关键取值：$\\omega=0$（直流）处 $|H|=0$，$\\omega=\\pi$（最高频）处 $|H|=0$，而 $\\omega=\\dfrac{\\pi}{2}$ 处 $|H|=2$ 取最大值。\n\n两端都被抑制、中间频段通过，故为带通滤波器。两个零点 $z=\\pm1$ 正好落在单位圆上的 $\\omega=0$ 与 $\\omega=\\pi$ 处，这就是两端为零的几何解释。\n\n选低通是只看到 $\\omega=0$ 附近曲线、把零点当成了通带起点；选高通把零点位置记反（高通应在 $\\omega=\\pi$ 处取最大值、在 $\\omega=0$ 处为零）；选带阻是把「两端有零点」误当成「两端是阻带」——本题的阻带只是 $\\omega=0$ 与 $\\omega=\\pi$ 两个孤立频率点，中间整段都是通带。"
  }
]);