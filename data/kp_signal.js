/* 信号与系统 知识点 + 公式库
 * 结构：KP_SIGNAL.chapters[].points[]
 * 每个 point: {id, name, stars, formulas:[{t:tex, n:备注}], keys:[检索关键词]}
 * tex 不带 $ 定界符，前端用 katex.render 渲染。
 */
window.KP_SIGNAL = {
  subject: "信号与系统",
  chapters: [
    {
      id: "S1",
      name: "第1章 信号与系统的基本概念",
      points: [
        {
          id: "S1-1", name: "信号的运算与波形变换", stars: 3,
          formulas: [
            { t: "f(at+b)=f\\left(a\\left(t+\\frac{b}{a}\\right)\\right)", n: "先按 1/|a| 尺度变换，再平移 −b/a" },
            { t: "a>1\\ \\Rightarrow\\ \\text{压缩}", n: "a>1 时间压缩；0<a<1 时间扩展" },
            { t: "f(-t)", n: "反转：以纵轴为对称翻折" }
          ],
          keys: ["平移", "反转", "尺度变换", "压缩", "扩展", "波形变换", "自变量变换"]
        },
        {
          id: "S1-2", name: "冲激函数与奇异信号", stars: 3,
          formulas: [
            { t: "\\int_{-\\infty}^{\\infty}f(t)\\delta(t-t_0)\\,dt=f(t_0)", n: "抽样（筛分）性——最常用" },
            { t: "f(t)\\delta(t-t_0)=f(t_0)\\delta(t-t_0)", n: "冲激的乘积性质" },
            { t: "\\delta(at)=\\frac{1}{|a|}\\delta(t)", n: "尺度变换，注意 1/|a|" },
            { t: "\\int_{-\\infty}^{\\infty}f(t)\\delta'(t-t_0)\\,dt=-f'(t_0)", n: "冲激偶：负号是命门" },
            { t: "\\delta(t)=\\frac{du(t)}{dt}", n: "冲激与阶跃互为微积分" },
            { t: "f(t)*\\delta(t-t_0)=f(t-t_0)", n: "与冲激卷积 = 平移" }
          ],
          keys: ["冲激函数", "δ函数", "抽样性", "筛分", "冲激偶", "阶跃函数", "奇异信号"]
        },
        {
          id: "S1-3", name: "系统性质判定", stars: 2,
          formulas: [
            { t: "T[a f_1+b f_2]=aT[f_1]+bT[f_2]", n: "线性 = 齐次性 + 叠加性" },
            { t: "f(t-t_0)\\to y(t-t_0)", n: "时不变性" },
            { t: "h(t)=0,\\ t<0", n: "因果性判据（因果系统冲激响应在 t<0 为零）" },
            { t: "\\int_{-\\infty}^{\\infty}|h(t)|\\,dt<\\infty", n: "BIBO 稳定判据" }
          ],
          keys: ["线性", "时不变", "因果", "稳定", "BIBO", "记忆系统", "系统性质"]
        }
      ]
    },
    {
      id: "S2",
      name: "第2章 连续系统的时域分析",
      points: [
        {
          id: "S2-1", name: "微分方程的经典解", stars: 2,
          formulas: [
            { t: "y(t)=y_h(t)+y_p(t)", n: "完全解 = 齐次解 + 特解" },
            { t: "\\lambda^n+a_{n-1}\\lambda^{n-1}+\\cdots+a_0=0", n: "特征方程，特征根决定齐次解形式" }
          ],
          keys: ["微分方程", "齐次解", "特解", "特征根", "经典法"]
        },
        {
          id: "S2-2", name: "零输入响应与零状态响应", stars: 3,
          formulas: [
            { t: "y(t)=y_{zi}(t)+y_{zs}(t)", n: "全响应分解" },
            { t: "y_{zi}\\ \\text{由初始状态定},\\quad y_{zs}=f(t)*h(t)", n: "零输入只看初始状态；零状态用卷积" }
          ],
          keys: ["零输入响应", "零状态响应", "全响应", "初始状态", "分解"]
        },
        {
          id: "S2-3", name: "冲激响应与阶跃响应", stars: 3,
          formulas: [
            { t: "h(t)=\\frac{dg(t)}{dt}", n: "冲激响应 = 阶跃响应的导数" },
            { t: "g(t)=\\int_{-\\infty}^{t}h(\\tau)\\,d\\tau", n: "阶跃响应 = 冲激响应的积分" }
          ],
          keys: ["冲激响应", "阶跃响应", "h(t)", "g(t)", "互求"]
        },
        {
          id: "S2-4", name: "卷积积分及性质", stars: 3,
          formulas: [
            { t: "y(t)=\\int_{-\\infty}^{\\infty}f_1(\\tau)f_2(t-\\tau)\\,d\\tau", n: "卷积定义" },
            { t: "f(t)*u(t)=\\int_{-\\infty}^{t}f(\\tau)\\,d\\tau", n: "与阶跃卷积 = 积分" },
            { t: "f(t)*\\delta(t-t_0)=f(t-t_0)", n: "与冲激卷积 = 平移" },
            { t: "\\frac{d}{dt}[f_1*f_2]=f_1'*f_2=f_1*f_2'", n: "微分性质" },
            { t: "t_1+t_2", n: "卷积结果的时间长度 = 两信号时长之和" }
          ],
          keys: ["卷积", "卷积积分", "交换律", "分配律", "结合律", "卷积时长", "图解法"]
        },
        {
          id: "S2-5", name: "系统模拟框图", stars: 1,
          formulas: [
            { t: "\\frac{1}{s}", n: "积分器" },
            { t: "\\sum", n: "加法器" }
          ],
          keys: ["系统框图", "积分器", "加法器", "数乘器", "模拟", "信号流图"]
        }
      ]
    },
    {
      id: "S3",
      name: "第3章 傅里叶级数（周期信号频域分析）",
      points: [
        {
          id: "S3-1", name: "傅里叶级数的两种形式", stars: 3,
          formulas: [
            { t: "f(t)=a_0+\\sum_{n=1}^{\\infty}\\left[a_n\\cos(n\\omega_1 t)+b_n\\sin(n\\omega_1 t)\\right]", n: "三角形式" },
            { t: "f(t)=\\sum_{n=-\\infty}^{\\infty}F_n e^{jn\\omega_1 t}", n: "指数（复指数）形式" },
            { t: "F_n=\\frac{1}{T_1}\\int_{T_1}f(t)e^{-jn\\omega_1 t}\\,dt", n: "复系数公式" },
            { t: "F_n=\\frac{1}{2}(a_n-jb_n),\\quad |F_n|=\\frac{1}{2}\\sqrt{a_n^2+b_n^2}", n: "两种系数的换算（2024 年真题要的就是这个）" },
            { t: "\\omega_1=\\frac{2\\pi}{T_1}", n: "基波角频率" }
          ],
          keys: ["傅里叶级数", "三角形式", "指数形式", "复系数", "基波", "谐波", "频谱"]
        },
        {
          id: "S3-2", name: "周期矩形脉冲的频谱", stars: 3,
          formulas: [
            { t: "F_n=\\frac{E\\tau}{T_1}Sa\\left(\\frac{n\\omega_1\\tau}{2}\\right)", n: "幅度为 E、宽度为 τ 的周期矩形脉冲" },
            { t: "Sa(x)=\\frac{\\sin x}{x}", n: "抽样函数（有的书写作 Sa 或 sinc）" },
            { t: "\\frac{n\\omega_1\\tau}{2}=k\\pi\\ \\Rightarrow\\ \\text{零点}", n: "包络零点位置" },
            { t: "B_f=\\frac{1}{\\tau}", n: "频带宽度（第一个零点）——脉宽越窄，频带越宽" }
          ],
          keys: ["矩形脉冲", "Sa函数", "抽样函数", "包络", "谱线间隔", "频带宽度", "脉宽"]
        },
        {
          id: "S3-3", name: "周期信号的功率（帕塞瓦尔）", stars: 2,
          formulas: [
            { t: "P=\\frac{1}{T_1}\\int_{T_1}f^2(t)\\,dt=\\sum_{n=-\\infty}^{\\infty}|F_n|^2", n: "时域功率 = 各次谐波功率之和" },
            { t: "P=a_0^2+\\frac{1}{2}\\sum_{n=1}^{\\infty}(a_n^2+b_n^2)", n: "三角形式写法" }
          ],
          keys: ["帕塞瓦尔", "平均功率", "周期信号功率", "功率谱"]
        },
        {
          id: "S3-4", name: "波形对称性与谐波特性", stars: 2,
          formulas: [
            { t: "b_n=0", n: "偶函数 → 只有余弦项（含直流）" },
            { t: "a_n=0,\\ a_0=0", n: "奇函数 → 只有正弦项" },
            { t: "f(t)=-f\\left(t\\pm\\frac{T_1}{2}\\right)", n: "半波对称 → 只有奇次谐波" }
          ],
          keys: ["对称性", "偶函数", "奇函数", "半波对称", "奇次谐波", "谐波特性"]
        }
      ]
    },
    {
      id: "S4",
      name: "第4章 傅里叶变换（非周期信号频域分析）",
      points: [
        {
          id: "S4-1", name: "傅里叶变换定义与常用变换对", stars: 3,
          formulas: [
            { t: "F(j\\omega)=\\int_{-\\infty}^{\\infty}f(t)e^{-j\\omega t}\\,dt", n: "正变换" },
            { t: "f(t)=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}F(j\\omega)e^{j\\omega t}\\,d\\omega", n: "反变换" },
            { t: "F(0)=\\int_{-\\infty}^{\\infty}f(t)\\,dt", n: "零频值 = 波形面积" },
            { t: "e^{-at}u(t)\\ \\leftrightarrow\\ \\frac{1}{a+j\\omega}", n: "a>0" },
            { t: "e^{-a|t|}\\ \\leftrightarrow\\ \\frac{2a}{a^2+\\omega^2}", n: "双边指数" },
            { t: "\\delta(t)\\leftrightarrow 1,\\quad 1\\leftrightarrow 2\\pi\\delta(\\omega)", n: "冲激与直流" },
            { t: "u(t)\\leftrightarrow \\pi\\delta(\\omega)+\\frac{1}{j\\omega}", n: "阶跃" }
          ],
          keys: ["傅里叶变换", "频谱密度", "常用变换对", "指数信号", "冲激", "阶跃"]
        },
        {
          id: "S4-2", name: "傅里叶变换的性质", stars: 3,
          formulas: [
            { t: "f(t-t_0)\\leftrightarrow F(j\\omega)e^{-j\\omega t_0}", n: "时移 → 频域乘相移（幅度不变）" },
            { t: "f(t)e^{j\\omega_0 t}\\leftrightarrow F(j(\\omega-\\omega_0))", n: "频移 → 频谱搬移（调制的基础）" },
            { t: "f(at)\\leftrightarrow\\frac{1}{|a|}F\\left(j\\frac{\\omega}{a}\\right)", n: "尺度变换" },
            { t: "f_1(t)*f_2(t)\\leftrightarrow F_1(j\\omega)F_2(j\\omega)", n: "时域卷积 ↔ 频域相乘" },
            { t: "f_1(t)f_2(t)\\leftrightarrow\\frac{1}{2\\pi}F_1(j\\omega)*F_2(j\\omega)", n: "时域相乘 ↔ 频域卷积" },
            { t: "\\frac{df(t)}{dt}\\leftrightarrow j\\omega F(j\\omega)", n: "时域微分" },
            { t: "\\int_{-\\infty}^{t}f(\\tau)d\\tau\\leftrightarrow\\frac{F(j\\omega)}{j\\omega}+\\pi F(0)\\delta(\\omega)", n: "时域积分（别丢冲激项）" },
            { t: "F(-\\omega)=F^{*}(\\omega)", n: "实信号的共轭对称性" }
          ],
          keys: ["时移", "频移", "尺度", "卷积定理", "微分性质", "积分性质", "对称性"]
        },
        {
          id: "S4-3", name: "周期信号的傅里叶变换", stars: 2,
          formulas: [
            { t: "f_{T_1}(t)\\leftrightarrow 2\\pi\\sum_{n=-\\infty}^{\\infty}F_n\\delta(\\omega-n\\omega_1)", n: "周期信号的频谱是冲激串" },
            { t: "\\sum_{n=-\\infty}^{\\infty}\\delta(t-nT)\\leftrightarrow \\omega_1\\sum_{n=-\\infty}^{\\infty}\\delta(\\omega-n\\omega_1)", n: "冲激串的变换（抽样定理的核心）" }
          ],
          keys: ["周期信号", "冲激串", "傅里叶变换", "谱线"]
        },
        {
          id: "S4-4", name: "能量谱与帕塞瓦尔定理", stars: 2,
          formulas: [
            { t: "E=\\int_{-\\infty}^{\\infty}|f(t)|^2dt=\\frac{1}{2\\pi}\\int_{-\\infty}^{\\infty}|F(j\\omega)|^2d\\omega", n: "能量守恒" },
            { t: "|F(j\\omega)|^2", n: "能量谱密度" }
          ],
          keys: ["能量", "能量谱", "帕塞瓦尔", "能量守恒"]
        },
        {
          id: "S4-5", name: "调制、滤波与无失真传输", stars: 2,
          formulas: [
            { t: "f(t)\\cos(\\omega_0 t)\\leftrightarrow\\frac{1}{2}\\left[F(j(\\omega-\\omega_0))+F(j(\\omega+\\omega_0))\\right]", n: "调幅：频谱搬移并减半" },
            { t: "H(j\\omega)=Ke^{-j\\omega t_d}", n: "无失真传输：幅频为常数、相频为线性" },
            { t: "\\varphi(\\omega)=-\\omega t_d", n: "线性相位 ⇒ 群时延为常数 t_d" },
            { t: "h(t)=K\\delta(t-t_d)", n: "无失真系统的冲激响应" }
          ],
          keys: ["调制", "解调", "无失真传输", "理想滤波器", "群时延", "线性相位", "幅频", "相频"]
        }
      ]
    },
    {
      id: "S5",
      name: "第5章 抽样定理",
      points: [
        {
          id: "S5-1", name: "抽样定理与抽样信号的频谱", stars: 3,
          formulas: [
            { t: "F_s(j\\omega)=\\frac{1}{T_s}\\sum_{n=-\\infty}^{\\infty}F(j(\\omega-n\\omega_s))", n: "抽样后频谱 = 原频谱以 ωs 为周期搬移叠加" },
            { t: "\\omega_s\\ge 2\\omega_m\\quad\\text{或}\\quad f_s\\ge 2f_m", n: "奈奎斯特抽样定理（低通信号）" },
            { t: "\\omega_s=\\frac{2\\pi}{T_s}", n: "抽样角频率" }
          ],
          keys: ["抽样", "抽样定理", "奈奎斯特", "抽样频率", "频谱搬移", "周期延拓"]
        },
        {
          id: "S5-2", name: "混叠与信号重建", stars: 3,
          formulas: [
            { t: "H(j\\omega)=T_s,\\ |\\omega|<\\frac{\\omega_s}{2};\\quad 0,\\ \\text{otherwise}", n: "理想低通重建滤波器" },
            { t: "\\omega_s<2\\omega_m\\ \\Rightarrow\\ \\text{混叠}", n: "不满足抽样定理就发生频谱混叠，无法恢复" },
            { t: "H_0(j\\omega)=\\frac{1-e^{-j\\omega T_s}}{j\\omega}", n: "零阶保持器的频率响应" }
          ],
          keys: ["混叠", "信号重建", "恢复", "理想低通", "零阶保持", "折叠频率"]
        }
      ]
    },
    {
      id: "S6",
      name: "第6章 拉普拉斯变换（连续系统复频域分析）",
      points: [
        {
          id: "S6-1", name: "拉氏变换定义与收敛域", stars: 2,
          formulas: [
            { t: "F(s)=\\int_{0^{-}}^{\\infty}f(t)e^{-st}\\,dt", n: "单边拉氏变换，s=σ+jω" },
            { t: "f(t)e^{-\\sigma t}\\ \\text{绝对可积}", n: "收敛条件，决定收敛域" }
          ],
          keys: ["拉普拉斯变换", "收敛域", "复频域", "单边"]
        },
        {
          id: "S6-2", name: "常用拉氏变换对", stars: 3,
          formulas: [
            { t: "\\delta(t)\\leftrightarrow 1,\\quad u(t)\\leftrightarrow\\frac{1}{s}", n: "冲激与阶跃" },
            { t: "e^{-at}u(t)\\leftrightarrow\\frac{1}{s+a}", n: "指数" },
            { t: "t\\,u(t)\\leftrightarrow\\frac{1}{s^2},\\quad t^n u(t)\\leftrightarrow\\frac{n!}{s^{n+1}}", n: "斜坡与幂" },
            { t: "\\sin(\\omega_0 t)u(t)\\leftrightarrow\\frac{\\omega_0}{s^2+\\omega_0^2}", n: "正弦" },
            { t: "\\cos(\\omega_0 t)u(t)\\leftrightarrow\\frac{s}{s^2+\\omega_0^2}", n: "余弦" }
          ],
          keys: ["拉氏变换对", "常用", "指数", "正弦", "余弦", "斜坡"]
        },
        {
          id: "S6-3", name: "拉氏变换的性质", stars: 3,
          formulas: [
            { t: "f(t-t_0)u(t-t_0)\\leftrightarrow e^{-st_0}F(s)", n: "时移（注意必须配 u(t−t0)）" },
            { t: "e^{-at}f(t)\\leftrightarrow F(s+a)", n: "s 域平移" },
            { t: "\\frac{df(t)}{dt}\\leftrightarrow sF(s)-f(0_{-})", n: "时域微分——初始条件在此进入" },
            { t: "\\frac{d^2f}{dt^2}\\leftrightarrow s^2F(s)-sf(0_-)-f'(0_-)", n: "二阶微分" },
            { t: "\\int_0^t f(\\tau)d\\tau\\leftrightarrow\\frac{F(s)}{s}", n: "时域积分" },
            { t: "f(0_{+})=\\lim_{s\\to\\infty}sF(s)", n: "初值定理" },
            { t: "f(\\infty)=\\lim_{s\\to 0}sF(s)", n: "终值定理（要求极点都在左半平面）" }
          ],
          keys: ["时移", "s域平移", "微分定理", "积分定理", "初值定理", "终值定理"]
        },
        {
          id: "S6-4", name: "拉氏逆变换", stars: 3,
          formulas: [
            { t: "F(s)=\\frac{N(s)}{D(s)}=\\sum_i\\frac{K_i}{s-p_i}", n: "部分分式展开（单极点）" },
            { t: "K_i=\\left.(s-p_i)F(s)\\right|_{s=p_i}", n: "留数（遮盖法）" },
            { t: "\\frac{1}{s-p}\\leftrightarrow e^{pt}u(t)", n: "基本反变换" }
          ],
          keys: ["逆变换", "部分分式", "留数", "遮盖法", "极点"]
        },
        {
          id: "S6-5", name: "用拉氏变换解微分方程", stars: 3,
          formulas: [
            { t: "Y(s)=\\frac{M(s)}{A(s)}+\\frac{B(s)}{A(s)}", n: "第一项零输入，第二项零状态" },
            { t: "y_{zs}(t)=\\mathcal{L}^{-1}\\{H(s)F(s)\\}", n: "零状态响应 = 系统函数 × 激励" }
          ],
          keys: ["微分方程", "全响应", "初始条件", "零输入", "零状态"]
        },
        {
          id: "S6-6", name: "系统函数、零极点与稳定性", stars: 3,
          formulas: [
            { t: "H(s)=\\frac{Y(s)}{X(s)}=\\frac{b_ms^m+\\cdots+b_0}{s^n+a_{n-1}s^{n-1}+\\cdots+a_0}", n: "系统函数定义" },
            { t: "\\text{因果系统稳定}\\iff \\text{全部极点在左半平面}", n: "稳定判据（极点实部 < 0）" },
            { t: "h(t)=\\sum_i K_ie^{p_it}u(t)", n: "极点决定冲激响应的模式" }
          ],
          keys: ["系统函数", "零极点", "稳定性", "左半平面", "H(s)"]
        },
        {
          id: "S6-7", name: "频率响应与零极点图", stars: 2,
          formulas: [
            { t: "H(j\\omega)=H(s)\\big|_{s=j\\omega}", n: "令 s=jω 得频率响应" },
            { t: "|H(j\\omega)|=\\frac{\\prod|j\\omega-z_i|}{\\prod|j\\omega-p_i|}", n: "几何法：零点矢量长度之积 / 极点矢量长度之积" }
          ],
          keys: ["频率响应", "零极点图", "几何法", "幅频特性", "相频特性"]
        }
      ]
    },
    {
      id: "S7",
      name: "第7章 离散系统的 z 域分析",
      points: [
        {
          id: "S7-1", name: "离散信号与差分方程", stars: 2,
          formulas: [
            { t: "y(n)+a_1y(n-1)+\\cdots=y(n)=\\sum b_mx(n-m)", n: "常系数线性差分方程" }
          ],
          keys: ["离散", "差分方程", "序列", "递推"]
        },
        {
          id: "S7-2", name: "z 变换定义与收敛域", stars: 3,
          formulas: [
            { t: "X(z)=\\sum_{n=-\\infty}^{\\infty}x(n)z^{-n}", n: "双边 z 变换" },
            { t: "z=re^{j\\omega}", n: "z 平面，单位圆对应频率响应" }
          ],
          keys: ["z变换", "收敛域", "z平面", "单位圆"]
        },
        {
          id: "S7-3", name: "常用 z 变换对", stars: 3,
          formulas: [
            { t: "\\delta(n)\\leftrightarrow 1", n: "单位样值" },
            { t: "u(n)\\leftrightarrow\\frac{z}{z-1},\\ |z|>1", n: "单位阶跃" },
            { t: "a^n u(n)\\leftrightarrow\\frac{z}{z-a},\\ |z|>|a|", n: "指数序列——最常用" },
            { t: "n\\,u(n)\\leftrightarrow\\frac{z}{(z-1)^2}", n: "斜坡序列" }
          ],
          keys: ["z变换对", "指数序列", "阶跃序列", "常用"]
        },
        {
          id: "S7-4", name: "z 变换的性质", stars: 2,
          formulas: [
            { t: "x(n-m)\\leftrightarrow z^{-m}X(z)", n: "移位性质（差分方程求解的核心）" },
            { t: "x_1(n)*x_2(n)\\leftrightarrow X_1(z)X_2(z)", n: "卷积和 ↔ 乘积" },
            { t: "a^nx(n)\\leftrightarrow X\\left(\\frac{z}{a}\\right)", n: "尺度（z 域）" }
          ],
          keys: ["移位", "卷积和", "z域尺度", "性质"]
        },
        {
          id: "S7-5", name: "逆 z 变换", stars: 2,
          formulas: [
            { t: "\\frac{z}{z-a}\\leftrightarrow a^nu(n)", n: "基本反变换（注意分子有 z）" }
          ],
          keys: ["逆z变换", "部分分式", "幂级数", "留数"]
        },
        {
          id: "S7-6", name: "系统函数 H(z) 与稳定性", stars: 3,
          formulas: [
            { t: "H(z)=\\frac{Y(z)}{X(z)}", n: "离散系统函数" },
            { t: "\\text{稳定}\\iff \\text{全部极点在单位圆内}", n: "|p_i|<1" }
          ],
          keys: ["系统函数", "H(z)", "稳定性", "单位圆", "极点"]
        },
        {
          id: "S7-7", name: "离散系统频率响应", stars: 1,
          formulas: [
            { t: "H(e^{j\\omega})=H(z)\\big|_{z=e^{j\\omega}}", n: "单位圆上的取值" }
          ],
          keys: ["频率响应", "离散", "单位圆"]
        }
      ]
    },
    {
      id: "S8",
      name: "第8章 系统的状态变量分析",
      points: [
        {
          id: "S8-1", name: "状态方程与状态转移矩阵", stars: 1,
          formulas: [
            { t: "\\dot{\\mathbf{x}}=A\\mathbf{x}+Bf,\\quad y=C\\mathbf{x}+Df", n: "状态方程与输出方程" },
            { t: "e^{At}=\\mathcal{L}^{-1}\\{(sI-A)^{-1}\\}", n: "状态转移矩阵" }
          ],
          keys: ["状态方程", "状态变量", "状态转移矩阵", "A矩阵"]
        }
      ]
    }
  ]
};