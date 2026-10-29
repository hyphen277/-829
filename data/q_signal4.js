/* 信号与系统 · 考点训练题（第四批 SIG-70 ~ SIG-78）
 * 覆盖第 3、4 章：周期信号功率、波形对称性、常用变换对、变换性质、周期信号频谱、能量谱、调制与滤波。
 */
window.QSIGNAL = (window.QSIGNAL || []).concat([
  {
    id: "SIG-70", subject: "信号", type: "choice", kp: ["S3-3"], difficulty: 3,
    source: "自编·复系数求平均功率",
    stem: "某周期信号的指数形式傅里叶系数满足 $F_0=2$、$|F_{\\pm1}|=1$、$|F_{\\pm2}|=3$，其余系数为零，则该信号的平均功率为（　）。",
    options: ["$14$", "$24$", "$22$", "$6$"],
    answer: 1,
    solution: "指数形式的帕塞瓦尔定理：$P=\\sum_{n=-\\infty}^{\\infty}|F_n|^{2}$，每条谱线贡献系数的模平方，正负频率各算一次。\n\n逐项累加：直流 $|F_0|^{2}=2^{2}=4$；一次谐波 $|F_{\\pm1}|^{2}=1$ 对应 $n=\\pm1$ 两根谱线，贡献 $2\\times1=2$；二次谐波 $|F_{\\pm2}|^{2}=9$，贡献 $2\\times9=18$。\n\n故 $P=4+2+18=24$。\n\n选 $22$ 是把直流按一次方计入（$2+2+18$）；选 $14$ 只累加了正频率一侧（$4+1+9$），漏掉负频率的镜像谱线；选 $6$ 是把系数的模直接相加（$2+1+3$），忘了功率对应模的平方。"
  },
  {
    id: "SIG-71", subject: "信号", type: "choice", kp: ["S3-4"], difficulty: 3,
    source: "自编·全波整流的谐波成分",
    stem: "周期信号 $f(t)=|\\sin(\\omega_1 t)|$ 的傅里叶级数中（　）。",
    options: ["只含偶次谐波，无直流", "只含直流与奇次谐波", "含直流与偶次谐波", "含全部整数次谐波"],
    answer: 2,
    solution: "$|\\sin(\\omega_1 t)|$ 的最小正周期是 $\\dfrac{T}{2}$，其中 $T=\\dfrac{2\\pi}{\\omega_1}$，即基频被抬成了 $2\\omega_1$。\n\n级数中每项都是基频的整数倍，频率只能取 $2k\\omega_1$，故 $n$ 为奇数时系数必为零，只剩偶次谐波。\n\n再看直流：一个周期的平均值 $F_0=\\dfrac{2}{\\pi}$，不为零。\n\n选「无直流」忽略了整流后波形恒非负、均值不可能为零；选「奇次谐波」把最小周期误判为 $T$，于是以为基频仍是 $\\omega_1$；选「全部整数次谐波」等于否认 $\\dfrac{T}{2}$ 是最小周期。"
  },
  {
    id: "SIG-72", subject: "信号", type: "choice", kp: ["S3-4"], difficulty: 4,
    source: "自编·三角波的对称性判定",
    stem: "某周期三角波在 $t=0$ 处取峰值 $E$、在 $t=\\dfrac{T}{2}$ 处取谷值 $-E$，两点之间线性变化，周期为 $T$。其傅里叶级数中（　）。",
    options: ["只含奇次余弦项", "含直流与奇次余弦项", "只含奇次正弦项", "只含偶次余弦项"],
    answer: 0,
    solution: "先看奇偶性：峰值落在 $t=0$，波形关于纵轴对称，$f(-t)=f(t)$，故 $b_n=0$，正弦项全为零。\n\n再看半波对称：由 $E$ 线性降到 $-E$，后半个周期恰是前半个周期取反，即 $f\\left(t+\\dfrac{T}{2}\\right)=-f(t)$。代入级数比较同次系数得 $F_n=-(-1)^{n}F_n$，偶数 $n$ 的系数为零，$n=0$ 也在此列，故无直流。\n\n两条合起来：只含奇次余弦项。\n\n选「含直流」忽略了正负半周面积相消；选「正弦项」错判了奇偶性；选「偶次」错判了半波对称。"
  },
  {
    id: "SIG-73", subject: "信号", type: "choice", kp: ["S4-1"], difficulty: 2,
    source: "自编·双边指数变换对",
    stem: "信号 $f(t)=e^{-2|t|}$ 的傅里叶变换为（　）。",
    options: ["$\\dfrac{2}{4+\\omega^{2}}$", "$\\dfrac{1}{2+j\\omega}$", "$\\dfrac{4}{2+\\omega^{2}}$", "$\\dfrac{4}{4+\\omega^{2}}$"],
    answer: 3,
    solution: "$f(t)$ 为偶函数，频谱取实值，按定义只需积分余弦部分：\n\n$$F(j\\omega)=2\\int_{0}^{\\infty}e^{-2t}\\cos\\omega t\\,dt=\\dfrac{2\\cdot2}{2^{2}+\\omega^{2}}=\\dfrac{4}{4+\\omega^{2}}$$\n\n与常用对 $e^{-a|t|}\\leftrightarrow\\dfrac{2a}{a^{2}+\\omega^{2}}$ 取 $a=2$ 一致。校验：$F(0)=1$，恰等于波形面积 $2\\int_{0}^{\\infty}e^{-2t}dt=1$。\n\n选 $\\dfrac{2}{4+\\omega^{2}}$ 把分子上的 $2a$ 写成了 $a$；选 $\\dfrac{1}{2+j\\omega}$ 是单边指数 $e^{-2t}\\varepsilon(t)$ 的频谱，双边信号不该出现复分母；选 $\\dfrac{4}{2+\\omega^{2}}$ 把分母的 $a^{2}$ 写成了 $a$。"
  },
  {
    id: "SIG-74", subject: "信号", type: "choice", kp: ["S4-1"], difficulty: 2,
    source: "自编·门函数的频谱",
    stem: "设 $g_{\\tau}(t)=1$ 当 $|t|<\\dfrac{\\tau}{2}$，其余为零，则 $\\mathscr{F}[g_{\\tau}(t)]=$（　）。",
    options: [
      "$2\\tau\\,\\mathrm{Sa}(\\omega\\tau)$",
      "$\\tau\\,\\mathrm{Sa}\\!\\left(\\dfrac{\\omega\\tau}{2}\\right)$",
      "$\\tau\\,\\mathrm{Sa}(\\omega\\tau)$",
      "$\\dfrac{1}{\\tau}\\,\\mathrm{Sa}\\!\\left(\\dfrac{\\omega\\tau}{2}\\right)$"
    ],
    answer: 1,
    solution: "按定义积分：\n\n$$F(j\\omega)=\\int_{-\\tau/2}^{\\tau/2}e^{-j\\omega t}dt=\\dfrac{2\\sin(\\omega\\tau/2)}{\\omega}=\\tau\\,\\mathrm{Sa}\\!\\left(\\dfrac{\\omega\\tau}{2}\\right)$$\n\n校验：$F(0)=\\tau$ 等于门函数面积；第一个零点满足 $\\omega\\tau/2=\\pi$，即 $f=\\dfrac{1}{\\tau}$，脉宽越窄零点越远。\n\n选 $2\\tau\\,\\mathrm{Sa}(\\omega\\tau)$ 把门宽当成了 $2\\tau$；选 $\\tau\\,\\mathrm{Sa}(\\omega\\tau)$ 漏了宗量里的 $\\dfrac12$；选 $\\dfrac{1}{\\tau}\\mathrm{Sa}\\left(\\dfrac{\\omega\\tau}{2}\\right)$ 与量纲矛盾，$F(0)$ 应等于面积 $\\tau$ 而非 $\\dfrac{1}{\\tau}$。"
  },
  {
    id: "SIG-75", subject: "信号", type: "choice", kp: ["S4-2"], difficulty: 4,
    source: "自编·时域积分性质",
    stem: "已知 $f(t)\\leftrightarrow F(j\\omega)$ 且 $F(0)\\ne0$，则 $\\mathscr{F}\\left[\\int_{-\\infty}^{t}f(\\tau)\\,d\\tau\\right]=$（　）。",
    options: [
      "$\\dfrac{F(j\\omega)}{j\\omega}$",
      "$j\\omega F(j\\omega)+\\pi F(0)\\delta(\\omega)$",
      "$\\dfrac{F(j\\omega)}{j\\omega}+\\pi F(0)\\delta(\\omega)$",
      "$\\dfrac{F(j\\omega)}{j\\omega}+F(0)\\delta(\\omega)$"
    ],
    answer: 2,
    solution: "把积分写成与阶跃的卷积：$\\int_{-\\infty}^{t}f(\\tau)d\\tau=f(t)*\\varepsilon(t)$。\n\n代入 $\\mathscr{F}[\\varepsilon(t)]=\\dfrac{1}{j\\omega}+\\pi\\delta(\\omega)$ 并用卷积定理：\n\n$$F(j\\omega)\\left[\\dfrac{1}{j\\omega}+\\pi\\delta(\\omega)\\right]=\\dfrac{F(j\\omega)}{j\\omega}+\\pi F(0)\\delta(\\omega)$$\n\n末步用了 $F(j\\omega)\\delta(\\omega)=F(0)\\delta(\\omega)$。冲激项不能省：积分会引入非零直流，例如 $\\varepsilon(t)$ 的积分是斜变信号。\n\n选 $\\dfrac{F(j\\omega)}{j\\omega}$ 丢了冲激项，仅在 $F(0)=0$ 时才碰巧成立；选含 $j\\omega F(j\\omega)$ 的项误用了时域微分性质；选 $F(0)\\delta(\\omega)$ 漏了系数 $\\pi$。"
  },
  {
    id: "SIG-76", subject: "信号", type: "choice", kp: ["S4-3"], difficulty: 3,
    source: "自编·周期脉冲的冲激强度",
    stem: "幅度为 $1$、脉宽为 $0.5\\,\\mathrm{ms}$、周期为 $2\\,\\mathrm{ms}$ 的周期矩形脉冲，其傅里叶变换在 $\\omega=0$ 处的冲激强度为（　）。",
    options: ["$\\dfrac{\\pi}{2}$", "$\\dfrac14$", "$\\dfrac{\\pi}{4}$", "$2\\pi$"],
    answer: 0,
    solution: "周期信号的傅里叶变换是一串冲激：$\\mathscr{F}[f_T(t)]=2\\pi\\sum_{n}F_n\\delta(\\omega-n\\omega_1)$，$\\omega=0$ 处的强度为 $2\\pi F_0$。\n\n$F_0$ 是一个周期的平均值：\n\n$$F_0=\\dfrac{1}{T}\\int_{T}f(t)dt=\\dfrac{E\\tau}{T}=\\dfrac{1\\times0.5}{2}=\\dfrac14$$\n\n故冲激强度 $2\\pi F_0=\\dfrac{\\pi}{2}$。\n\n选 $\\dfrac14$ 只给出傅里叶系数，漏了因子 $2\\pi$；选 $\\dfrac{\\pi}{4}$ 把因子记成了 $\\pi$；选 $2\\pi$ 忽略了占空比，等于把 $F_0$ 当成 $E=1$。"
  },
  {
    id: "SIG-77", subject: "信号", type: "choice", kp: ["S4-4"], difficulty: 2,
    source: "自编·帕塞瓦尔求能量",
    stem: "信号 $f(t)=e^{-2t}\\varepsilon(t)$ 的能量为（　）。",
    options: ["$\\dfrac12$", "$\\infty$", "$\\dfrac{\\pi}{2}$", "$\\dfrac14$"],
    answer: 3,
    solution: "由变换对得 $F(j\\omega)=\\dfrac{1}{2+j\\omega}$，故 $|F(j\\omega)|^{2}=\\dfrac{1}{4+\\omega^{2}}$。\n\n用帕塞瓦尔定理：\n\n$$E=\\dfrac{1}{2\\pi}\\int_{-\\infty}^{\\infty}\\dfrac{d\\omega}{4+\\omega^{2}}=\\dfrac{1}{2\\pi}\\cdot\\dfrac{\\pi}{2}=\\dfrac14$$\n\n时域验算：$E=\\int_{0}^{\\infty}e^{-4t}dt=\\dfrac14$。\n\n选 $\\dfrac12$ 是时域忘了平方，算成了 $\\int_{0}^{\\infty}e^{-2t}dt$；选 $\\dfrac{\\pi}{2}$ 是频域积分后没除 $2\\pi$；选 $\\infty$ 把非时限信号误判成能量无限，$e^{-2t}$ 衰减足够快，属能量信号。"
  },
  {
    id: "SIG-78", subject: "信号", type: "choice", kp: ["S4-5"], difficulty: 3,
    source: "自编·同步解调",
    stem: "带限信号 $f(t)$ 的最高频率为 $f_m$，且 $f_m\\ll f_0$。把 $f(t)\\cos(2\\pi f_0 t)$ 再乘 $\\cos(2\\pi f_0 t)$，然后送入截止频率为 $f_m$ 的理想低通滤波器，输出为（　）。",
    options: ["$\\dfrac12 f(t)$", "$f(t)$", "$\\dfrac14 f(t)$", "$f(t)\\cos(4\\pi f_0 t)$"],
    answer: 0,
    solution: "先用倍角公式展开乘积：\n\n$$f(t)\\cos^{2}(2\\pi f_0 t)=\\dfrac12 f(t)+\\dfrac12 f(t)\\cos(4\\pi f_0 t)$$\n\n第一项是基带分量，频谱落在 $|f|<f_m$；第二项被搬到 $\\pm2f_0$ 附近，占据 $2f_0-f_m<|f|<2f_0+f_m$。\n\n$f_m\\ll f_0$ 保证两段频谱不重叠，截止频率取 $f_m$ 的低通只放过基带项，输出 $\\dfrac12 f(t)$。\n\n选 $f(t)$ 以为两次相乘完全抵消，忘了 $\\cos^{2}$ 的平均值只有 $\\dfrac12$；选 $\\dfrac14 f(t)$ 把两次调制的 $\\dfrac12$ 重复计了一次；选 $f(t)\\cos(4\\pi f_0 t)$ 挑错了项，它落在 $2f_0$ 附近，会被低通滤掉。"
  }
]);