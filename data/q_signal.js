/* 信号与系统 · 自编考点训练题（客观题）
 * 每章 2–4 题，覆盖 34 个考点里的高频项。
 * 字段：id / subject / type / kp / stem / options / answer(下标) / solution / source / difficulty
 */
window.QSIGNAL = [
  /* ---------- 第 1 章 ---------- */
  {
    id: "SIG-01", subject: "信号", type: "choice", kp: ["S1-2"], difficulty: 3,
    source: "自编·冲激函数性质",
    stem: "计算 $\\int_{-\\infty}^{+\\infty}(t^2+1)\\,\\delta'(t-1)\\,dt$ 的值。",
    options: ["$2$", "$-2$", "$0$", "$1$"],
    answer: 1,
    solution: "由冲激偶的抽样性质 $\\int_{-\\infty}^{+\\infty}f(t)\\delta'(t-a)dt=-f'(a)$。取 $f(t)=t^2+1$，$f'(t)=2t$，$f'(1)=2$，故结果为 $-2$。\n\n注意**符号**：奇次导数带负号，这一步是丢分高发区。"
  },
  {
    id: "SIG-02", subject: "信号", type: "choice", kp: ["S1-3"], difficulty: 2,
    source: "自编·系统性质",
    stem: "系统 $y(t)=f(t)\\cos(2t)$ 属于（　）。",
    options: ["线性时不变系统", "线性时变系统", "非线性时变系统", "非线性时不变系统"],
    answer: 1,
    solution: "**线性**：设 $f_1\\to y_1$、$f_2\\to y_2$，则 $af_1+bf_2\\to (af_1+bf_2)\\cos 2t=ay_1+by_2$，满足齐次性与可加性。\n\n**时变**：把输入延迟 $t_0$，输出为 $f(t-t_0)\\cos 2t$；而 $y(t-t_0)=f(t-t_0)\\cos 2(t-t_0)$。两者不等，故时变。\n\n判时变的通用办法：看系数里有没有显含 $t$ 的因子。"
  },
  {
    id: "SIG-03", subject: "信号", type: "choice", kp: ["S1-1"], difficulty: 4,
    source: "自编·波形变换顺序",
    stem: "由 $f(t)$ 的波形得到 $f(3-2t)$ 的波形，正确的变换顺序是（　）。",
    options: [
      "先反转，再压缩为原来的 $1/2$，最后右移 $1.5$",
      "先反转，再压缩为原来的 $1/2$，最后左移 $1.5$",
      "先右移 $3$，再反转，最后压缩为 $1/2$",
      "先压缩为 $1/2$，再反转，最后左移 $3$"
    ],
    answer: 0,
    solution: "先把自变量写成「$a\\,(t-b)$」的标准形：\n\n$$f(3-2t)=f\\big(-2(t-1.5)\\big)$$\n\n于是顺序是：**反转**（$t\\to-t$）→ **压缩** $1/2$（$t\\to 2t$）→ **右移** $1.5$（$t\\to t-1.5$）。\n\n口诀：**先缩放后平移**，平移量按缩放后的时间轴算。若先平移再缩放，平移量要除以缩放系数。"
  },

  /* ---------- 第 2 章 ---------- */
  {
    id: "SIG-04", subject: "信号", type: "choice", kp: ["S2-2"], difficulty: 4,
    source: "自编·零输入响应",
    stem: "某二阶系统的特征根为 $-1$ 和 $-3$，初始状态 $y(0_-)=2$、$y'(0_-)=0$，则零输入响应 $y_{zi}(t)=$（　）。",
    options: [
      "$3e^{-t}-e^{-3t}$",
      "$e^{-t}+e^{-3t}$",
      "$2e^{-t}$",
      "$-3e^{-t}+e^{-3t}$"
    ],
    answer: 0,
    solution: "特征根 $-1,-3$ 对应 $y_{zi}=Ae^{-t}+Be^{-3t}$。代入初值：\n\n$$A+B=2,\\qquad -A-3B=0$$\n\n解得 $A=3$、$B=-1$，即 $y_{zi}(t)=3e^{-t}-e^{-3t}$，$t\\ge 0$。\n\n**验证**：$t=0$ 时为 $2$ ✓。零输入响应只由初始状态决定，与输入无关。"
  },
  {
    id: "SIG-05", subject: "信号", type: "choice", kp: ["S2-3"], difficulty: 3,
    source: "自编·冲激响应",
    stem: "系统 $y'(t)+2y(t)=f(t)$ 的冲激响应 $h(t)=$（　）。",
    options: [
      "$e^{-2t}\\varepsilon(t)$",
      "$e^{2t}\\varepsilon(t)$",
      "$\\frac12 e^{-2t}\\varepsilon(t)$",
      "$\\delta(t)-2e^{-2t}\\varepsilon(t)$"
    ],
    answer: 0,
    solution: "令 $f(t)=\\delta(t)$，则 $h'(t)+2h(t)=\\delta(t)$。两边取拉氏变换：$(s+2)H(s)=1$，得 $H(s)=\\dfrac{1}{s+2}$，逆变换 $h(t)=e^{-2t}\\varepsilon(t)$。\n\n一般地，一阶系统 $y'+ay=f$ 的 $h(t)=e^{-at}\\varepsilon(t)$，**系数是 1 不是 $1/a$**。"
  },
  {
    id: "SIG-06", subject: "信号", type: "choice", kp: ["S2-4"], difficulty: 3,
    source: "自编·卷积几何意义",
    stem: "两个宽度均为 $\\tau$、高度均为 $E$ 的矩形脉冲相卷积，结果是（　）。",
    options: [
      "矩形脉冲，宽度 $2\\tau$，高度 $E$",
      "三角脉冲，底宽 $2\\tau$，峰值 $E^2\\tau$",
      "三角脉冲，底宽 $\\tau$，峰值 $E\\tau$",
      "冲激函数"
    ],
    answer: 1,
    solution: "卷积的「面积 × 宽度」规律：两个门宽 $\\tau$ 的矩形卷积得到**底宽 $\\tau+\\tau=2\\tau$** 的三角脉冲；峰值等于两矩形重叠面积的最大值 $E\\cdot E\\cdot\\tau=E^2\\tau$。\n\n记住三条：**宽度相加**、**形状由窄变宽（梯形/三角）**、**总面积 = 两面积之积**。"
  },
  {
    id: "SIG-07", subject: "信号", type: "choice", kp: ["S2-4"], difficulty: 3,
    source: "自编·卷积计算",
    stem: "$t\\varepsilon(t)*\\varepsilon(t)=$（　）。",
    options: [
      "$\\frac12 t^2\\varepsilon(t)$",
      "$t^2\\varepsilon(t)$",
      "$\\frac12 t\\,\\varepsilon(t)$",
      "$t\\,\\varepsilon(t)$"
    ],
    answer: 0,
    solution: "$$t\\varepsilon(t)*\\varepsilon(t)=\\int_{-\\infty}^{+\\infty}\\tau\\varepsilon(\\tau)\\,\\varepsilon(t-\\tau)\\,d\\tau=\\int_0^{t}\\tau\\,d\\tau=\\frac{t^2}{2}\\varepsilon(t)$$\n\n一般结论：$t^{m}\\varepsilon(t)*t^{n}\\varepsilon(t)=\\dfrac{m!\\,n!}{(m+n+1)!}t^{m+n+1}\\varepsilon(t)$。"
  },

  /* ---------- 第 3 章 ---------- */
  {
    id: "SIG-08", subject: "信号", type: "choice", kp: ["S3-1"], difficulty: 2,
    source: "自编·对称性",
    stem: "实偶周期信号的傅里叶级数展开式中（　）。",
    options: [
      "只含正弦项",
      "只含直流分量与余弦项",
      "只含奇次谐波",
      "只有直流分量"
    ],
    answer: 1,
    solution: "由系数公式 $b_n=\\dfrac{2}{T}\\int_{-T/2}^{T/2}f(t)\\sin(n\\omega_1 t)dt$：$f$ 为偶函数、$\\sin$ 为奇函数，被积函数为奇，积分为 $0$，故 $b_n=0$。\n\n**四句口诀**：偶函数只余弦、奇函数只正弦、奇谐波只奇次、偶谐波只偶次。"
  },
  {
    id: "SIG-09", subject: "信号", type: "choice", kp: ["S3-2"], difficulty: 4,
    source: "自编·周期矩形脉冲频谱",
    stem: "周期矩形脉冲的脉宽 $\\tau=1\\,$ms、周期 $T=4\\,$ms，其频谱包络相邻零点之间的频率间隔为（　）。",
    options: ["$250\\,$Hz", "$500\\,$Hz", "$1000\\,$Hz", "$4000\\,$Hz"],
    answer: 2,
    solution: "包络为 $\\dfrac{E\\tau}{T_1}Sa\\!\\left(\\dfrac{n\\omega_1\\tau}{2}\\right)$，零点满足 $\\dfrac{n\\omega_1\\tau}{2}=k\\pi$，即 $f=\\dfrac{k}{\\tau}$。\n\n相邻零点间隔 $\\Delta f=\\dfrac{1}{\\tau}=\\dfrac{1}{10^{-3}}=1000\\,$Hz，**与周期 $T$ 无关**。\n\n注意区分：谱线间隔是 $1/T=250\\,$Hz，零点间隔是 $1/\\tau$。"
  },
  {
    id: "SIG-10", subject: "信号", type: "choice", kp: ["S3-3"], difficulty: 3,
    source: "自编·帕塞瓦尔",
    stem: "周期信号 $f(t)=1+2\\cos(\\omega_1 t)$ 的平均功率为（　）。",
    options: ["$3\\,$W", "$5\\,$W", "$1\\,$W", "$2\\,$W"],
    answer: 0,
    solution: "指数形式系数：$F_0=1$，$F_{\\pm 1}=1$。由帕塞瓦尔定理 $P=\\sum_{n=-\\infty}^{+\\infty}|F_n|^2$：\n\n$$P=1^2+1^2+1^2=3$$\n\n等价做法：$P=A_0^2+\\dfrac{1}{2}\\sum A_n^2=1+\\dfrac{2^2}{2}=3$。**余弦项要除以 2**，这是最常见的错法。"
  },
  {
    id: "SIG-11", subject: "信号", type: "choice", kp: ["S3-1"], difficulty: 3,
    source: "自编·两种形式互换",
    stem: "三角形式 $f(t)=a_0+\\sum_{n=1}^{\\infty}\\big(a_n\\cos n\\omega_1 t+b_n\\sin n\\omega_1 t\\big)$ 与指数形式系数 $F_n$ 的关系是（　）。",
    options: [
      "$F_n=\\frac12(a_n+jb_n)$",
      "$F_n=\\frac12(a_n-jb_n)$",
      "$F_n=a_n-jb_n$",
      "$F_n=\\frac{1}{T_1}(a_n-jb_n)$"
    ],
    answer: 1,
    solution: "由 $\\cos\\theta=\\dfrac{e^{j\\theta}+e^{-j\\theta}}{2}$、$\\sin\\theta=\\dfrac{e^{j\\theta}-e^{-j\\theta}}{2j}$ 代入合并，比较 $e^{jn\\omega_1t}$ 的系数得\n\n$$F_n=\\frac12(a_n-jb_n),\\qquad F_{-n}=\\frac12(a_n+jb_n)=\\overline{F_n}$$\n\n且 $F_0=a_0$。实信号必有 $|F_n|=|F_{-n}|$（幅度偶对称）、相位奇对称。"
  },

  /* ---------- 第 4 章 ---------- */
  {
    id: "SIG-12", subject: "信号", type: "choice", kp: ["S4-1"], difficulty: 2,
    source: "自编·常用变换对",
    stem: "$\\mathscr{F}[\\varepsilon(t)]=$（　）。",
    options: [
      "$\\dfrac{1}{j\\omega}$",
      "$\\dfrac{1}{j\\omega}+\\pi\\delta(\\omega)$",
      "$\\pi\\delta(\\omega)$",
      "$\\dfrac{1}{j\\omega}+\\delta(\\omega)$"
    ],
    answer: 1,
    solution: "阶跃函数不满足绝对可积，要借 $\\varepsilon(t)=\\dfrac12+\\dfrac12\\mathrm{sgn}(t)$ 与 $\\mathscr{F}[\\mathrm{sgn}(t)]=\\dfrac{2}{j\\omega}$ 得\n\n$$\\mathscr{F}[\\varepsilon(t)]=\\frac{1}{j\\omega}+\\pi\\delta(\\omega)$$\n\n**$\\pi\\delta(\\omega)$ 这一项就是直流分量 $\\tfrac12$ 的谱**，丢了它就丢分。"
  },
  {
    id: "SIG-13", subject: "信号", type: "choice", kp: ["S4-2"], difficulty: 2,
    source: "自编·尺度变换",
    stem: "若 $f(t)$ 的最高频率为 $B$（带宽 $B$），则 $f(3t)$ 的带宽为（　）。",
    options: ["$B/3$", "$B$", "$3B$", "$9B$"],
    answer: 2,
    solution: "由尺度变换 $f(at)\\leftrightarrow\\dfrac{1}{|a|}F\\!\\left(\\dfrac{j\\omega}{a}\\right)$：$a=3$ 时频谱被**展宽 3 倍**，带宽变 $3B$；幅度被压缩到 $1/3$。\n\n时域压缩 ↔ 频域展宽。这条性质直接决定抽样率：波形压得越窄，需要的采样率越高。"
  },
  {
    id: "SIG-14", subject: "信号", type: "choice", kp: ["S4-2"], difficulty: 3,
    source: "自编·频移（调制）",
    stem: "$f(t)\\cos(\\omega_0 t)$ 的频谱为（　）。",
    options: [
      "$F(j\\omega-j\\omega_0)$",
      "$\\frac12\\big[F(j\\omega-j\\omega_0)+F(j\\omega+j\\omega_0)\\big]$",
      "$F(j\\omega+j\\omega_0)$",
      "$2F(j\\omega)\\cos(\\omega_0 t)$"
    ],
    answer: 1,
    solution: "把 $\\cos$ 拆成指数：$f(t)\\cos\\omega_0t=\\dfrac12f(t)e^{j\\omega_0t}+\\dfrac12f(t)e^{-j\\omega_0t}$，再用频移性质得\n\n$$\\frac12\\big[F(j(\\omega-\\omega_0))+F(j(\\omega+\\omega_0))\\big]$$\n\n**频谱搬移 + 幅度减半**。这就是调制的本质，也是同步解调的基础。"
  },
  {
    id: "SIG-15", subject: "信号", type: "choice", kp: ["S4-3"], difficulty: 3,
    source: "自编·周期信号的傅里叶变换",
    stem: "$\\mathscr{F}[\\cos(\\omega_0 t)]=$（　）。",
    options: [
      "$\\pi\\big[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\big]$",
      "$\\frac12\\big[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\big]$",
      "$2\\pi\\big[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)\\big]$",
      "$\\pi\\delta(\\omega-\\omega_0)$"
    ],
    answer: 0,
    solution: "由 $\\mathscr{F}[e^{j\\omega_0t}]=2\\pi\\delta(\\omega-\\omega_0)$ 与欧拉公式：\n\n$$\\mathscr{F}[\\cos\\omega_0t]=\\pi[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)]$$\n\n**两个冲激，系数 $\\pi$**（正弦则多出 $-j$ 与 $+j$ 的符号差）。"
  },
  {
    id: "SIG-16", subject: "信号", type: "choice", kp: ["S4-5"], difficulty: 2,
    source: "自编·无失真传输",
    stem: "线性系统实现无失真传输的条件是（　）。",
    options: [
      "$|H(j\\omega)|=K$（常数），$\\varphi(\\omega)=-\\omega t_d$（线性）",
      "$|H(j\\omega)|=1$，$\\varphi(\\omega)=0$",
      "$|H(j\\omega)|$ 任意，$\\varphi(\\omega)=0$",
      "$|H(j\\omega)|=K\\omega$，$\\varphi(\\omega)=-\\omega t_d$"
    ],
    answer: 0,
    solution: "无失真要求输出 $y(t)=Kf(t-t_d)$，故\n\n$$H(j\\omega)=Ke^{-j\\omega t_d}\\ \\Rightarrow\\ |H|=K,\\ \\varphi(\\omega)=-\\omega t_d$$\n\n**幅频为常数、相频为过原点的直线**。只有幅频平坦不够——相频非线性会造成相位失真（波形畸变）。"
  },

  /* ---------- 第 5 章 ---------- */
  {
    id: "SIG-17", subject: "信号", type: "choice", kp: ["S5-1"], difficulty: 2,
    source: "自编·抽样定理",
    stem: "对 $f(t)=\\cos(2\\pi\\cdot100t)$ 抽样，不产生混叠的最低抽样频率为（　）。",
    options: ["$100\\,$Hz", "$200\\,$Hz", "$400\\,$Hz", "$800\\,$Hz"],
    answer: 1,
    solution: "该余弦只有一根谱线在 $f=100\\,$Hz，最高频率 $f_m=100\\,$Hz。由奈奎斯特准则\n\n$$f_s\\ge 2f_m=200\\ \\text{Hz}$$\n\n注意**临界抽样（恰好 $2f_m$）只是理论上可行**，工程上一般取 $3\\sim5$ 倍留余量。"
  },
  {
    id: "SIG-18", subject: "信号", type: "choice", kp: ["S5-2"], difficulty: 4,
    source: "自编·混叠频率",
    stem: "上题信号若用 $150\\,$Hz 抽样，重建后出现的混叠频率为（　）。",
    options: ["$50\\,$Hz", "$100\\,$Hz", "$150\\,$Hz", "$250\\,$Hz"],
    answer: 0,
    solution: "抽样后谱线出现在 $100+k\\cdot150$：$\\cdots,-200,-50,100,250,\\cdots$。落在 $[0,f_s/2]=[0,75]$ 内的只有 $50\\,$Hz，故混叠频率为 $50\\,$Hz。\n\n**通用算法**：$f_{alias}=|f_0-kf_s|$ 取最小非负值。"
  },

  /* ---------- 第 6 章 ---------- */
  {
    id: "SIG-19", subject: "信号", type: "choice", kp: ["S6-2"], difficulty: 2,
    source: "自编·拉氏变换对与收敛域",
    stem: "$\\mathscr{L}[e^{-3t}\\varepsilon(t)]$ 及其收敛域是（　）。",
    options: [
      "$\\dfrac{1}{s+3},\\ \\mathrm{Re}(s)>-3$",
      "$\\dfrac{1}{s-3},\\ \\mathrm{Re}(s)>3$",
      "$\\dfrac{1}{s+3},\\ \\mathrm{Re}(s)<-3$",
      "$\\dfrac{1}{s^2+3}$"
    ],
    answer: 0,
    solution: "$$\\int_0^{\\infty}e^{-3t}e^{-st}dt=\\frac{1}{s+3},\\qquad \\mathrm{Re}(s)>-3$$\n\n**极点在 $s=-3$，收敛域在其右侧**（因果信号的收敛域总是极点右侧）。写拉氏变换不写收敛域，考试要扣分。"
  },
  {
    id: "SIG-20", subject: "信号", type: "choice", kp: ["S6-4"], difficulty: 4,
    source: "自编·部分分式逆变换",
    stem: "$F(s)=\\dfrac{1}{s(s+2)}$ 的逆变换 $f(t)=$（　）。",
    options: [
      "$\\frac12\\big(1-e^{-2t}\\big)\\varepsilon(t)$",
      "$\\big(1-e^{-2t}\\big)\\varepsilon(t)$",
      "$\\frac12 e^{-2t}\\varepsilon(t)$",
      "$\\frac12\\big(1+e^{-2t}\\big)\\varepsilon(t)$"
    ],
    answer: 0,
    solution: "部分分式：$\\dfrac{1}{s(s+2)}=\\dfrac{1/2}{s}-\\dfrac{1/2}{s+2}$，故\n\n$$f(t)=\\frac12\\big(1-e^{-2t}\\big)\\varepsilon(t)$$\n\n**验算**：$f(0_+)=\\lim_{s\\to\\infty}sF(s)=0$ ✓；$f(\\infty)=\\lim_{s\\to0}sF(s)=\\tfrac12$ ✓。用初值/终值定理快速自检，能抓出大部分符号错误。"
  },
  {
    id: "SIG-21", subject: "信号", type: "choice", kp: ["S6-6"], difficulty: 3,
    source: "自编·稳定性判据",
    stem: "系统函数 $H(s)=\\dfrac{1}{s^2+2s+5}$ 所描述的系统是（　）。",
    options: [
      "稳定系统，极点 $-1\\pm j2$ 均在左半平面",
      "不稳定系统，极点在右半平面",
      "临界稳定，极点在虚轴上",
      "无法判断，需看输入"
    ],
    answer: 0,
    solution: "解 $s^2+2s+5=0$：$s=-1\\pm j2$，实部 $-1<0$，**全部极点在左半平面**，故因果系统稳定。\n\n判据：因果系统稳定 $\\Leftrightarrow$ 全部极点在左半平面（离散系统则要求极点在单位圆内）。"
  },
  {
    id: "SIG-22", subject: "信号", type: "choice", kp: ["S6-3"], difficulty: 3,
    source: "自编·初值定理",
    stem: "已知 $F(s)=\\dfrac{1}{s+2}$，则 $f(0_+)=$（　）。",
    options: ["$1$", "$0$", "$1/2$", "$\\infty$"],
    answer: 0,
    solution: "由初值定理 $f(0_+)=\\lim_{s\\to\\infty}sF(s)=\\lim_{s\\to\\infty}\\dfrac{s}{s+2}=1$。\n\n注意定理成立的前提：$F(s)$ 为**真分式**（分子阶次低于分母）。若为假分式，先做长除。"
  },

  /* ---------- 第 7 章 ---------- */
  {
    id: "SIG-23", subject: "信号", type: "choice", kp: ["S7-3"], difficulty: 2,
    source: "自编·常用 z 变换对",
    stem: "$\\mathscr{Z}[a^n\\varepsilon(n)]$ 及其收敛域是（　）。",
    options: [
      "$\\dfrac{z}{z-a},\\ |z|>|a|$",
      "$\\dfrac{z}{z+a},\\ |z|>|a|$",
      "$\\dfrac{1}{z-a},\\ |z|>|a|$",
      "$\\dfrac{z}{z-a},\\ |z|<|a|$"
    ],
    answer: 0,
    solution: "$$\\sum_{n=0}^{\\infty}a^nz^{-n}=\\frac{1}{1-az^{-1}}=\\frac{z}{z-a},\\qquad |z|>|a|$$\n\n**极点在 $z=a$，因果序列收敛域在圆外**。$a$ 换成 $e^{j\\omega_0}$ 即得 $\\cos/\\sin$ 的 z 变换。"
  },
  {
    id: "SIG-24", subject: "信号", type: "choice", kp: ["S7-6"], difficulty: 3,
    source: "自编·离散系统稳定性",
    stem: "因果系统 $H(z)=\\dfrac{z}{z-0.8}$ 的稳定性为（　）。",
    options: [
      "稳定，极点在单位圆内",
      "不稳定，极点在单位圆外",
      "临界稳定，极点在单位圆上",
      "无法判断"
    ],
    answer: 0,
    solution: "极点 $z=0.8$，$|0.8|<1$，位于单位圆内，因果系统稳定。\n\n对照记忆：**连续看左半平面，离散看单位圆内**。$s$ 平面左半平面经 $z=e^{sT}$ 映射到单位圆内，两套判据本质是一回事。"
  },

  /* ---------- 第 8 章 ---------- */
  {
    id: "SIG-25", subject: "信号", type: "choice", kp: ["S8-1"], difficulty: 3,
    source: "自编·状态转移矩阵",
    stem: "对状态方程 $\\dot{\\boldsymbol{x}}=A\\boldsymbol{x}+Bf$，其状态转移矩阵 $\\Phi(t)$ 满足（　）。",
    options: [
      "$\\Phi(t)=e^{At}$，且 $\\Phi(s)=(sI-A)^{-1}$",
      "$\\Phi(t)=e^{-At}$，且 $\\Phi(s)=(sI+A)^{-1}$",
      "$\\Phi(t)=Ae^{t}$，且 $\\Phi(s)=A/(s-1)$",
      "$\\Phi(t)=e^{At}$，且 $\\Phi(s)=(sI-A)$"
    ],
    answer: 0,
    solution: "齐次方程 $\\dot{\\boldsymbol{x}}=A\\boldsymbol{x}$ 的解为 $\\boldsymbol{x}(t)=e^{At}\\boldsymbol{x}(0)$，故 $\\Phi(t)=e^{At}$；取拉氏变换 $(sI-A)\\boldsymbol{X}(s)=\\boldsymbol{x}(0)$ 得\n\n$$\\Phi(s)=(sI-A)^{-1}$$\n\n求 $e^{At}$ 的两条路：**级数展开**或**拉氏反变换 $(sI-A)^{-1}$**，考试多用后者。"
  }
];