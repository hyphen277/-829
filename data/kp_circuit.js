/* 电路 知识点 + 公式库
 * 结构同 kp_signal.js：KP_CIRCUIT.chapters[].points[]
 * point id 用 C1…C14，与真题标注词表一一对应。
 */
window.KP_CIRCUIT = {
  subject: "电路",
  chapters: [
    {
      id: "C-A",
      name: "第一篇 电阻电路分析",
      points: [
        {
          id: "C1", name: "电路元件与基本定律（KCL/KVL/受控源）", stars: 3,
          formulas: [
            { t: "\\sum i=0", n: "KCL：任一节点/割集，流出电流代数和为零" },
            { t: "\\sum u=0", n: "KVL：任一回路，电压降代数和为零" },
            { t: "u=Ri,\\quad u=L\\frac{di}{dt},\\quad i=C\\frac{du}{dt}", n: "三个基本伏安关系（注意电感的 u 用 di/dt、电容的 i 用 du/dt）" },
            { t: "\\text{VCVS}:\\ u_2=\\mu u_1;\\quad \\text{VCCS}:\\ i_2=g u_1;\\quad \\text{CCVS}:\\ u_2=r i_1;\\quad \\text{CCCS}:\\ i_2=\\beta i_1", n: "四种受控源" },
            { t: "P=ui", n: "功率；关联参考方向下 P>0 为吸收" }
          ],
          keys: ["KCL", "KVL", "受控源", "VCVS", "VCCS", "CCVS", "CCCS", "伏安关系", "关联参考方向"]
        },
        {
          id: "C2", name: "等效变换、串并联与 Y-Δ", stars: 2,
          formulas: [
            { t: "u_1=\\frac{R_1}{R_1+R_2}u", n: "串联分压" },
            { t: "i_1=\\frac{R_2}{R_1+R_2}i", n: "并联分流（分子是「另一个」电阻）" },
            { t: "R_{12}=\\frac{R_1R_2+R_2R_3+R_3R_1}{R_3}", n: "Y→Δ：Δ 边 = Y 两两乘积之和 ÷ 对角 Y 电阻" },
            { t: "R_1=\\frac{R_{12}R_{31}}{R_{12}+R_{23}+R_{31}}", n: "Δ→Y：Y 电阻 = 相邻两边之积 ÷ 三边之和" },
            { t: "u_s=i_sR_s", n: "实际电压源与实际电流源的等效互换" }
          ],
          keys: ["串并联", "分压", "分流", "Y-Δ", "星三角", "电源等效", "等效变换"]
        },
        {
          id: "C3", name: "网孔电流法与节点电压法", stars: 3,
          formulas: [
            { t: "\\mathbf{G}\\mathbf{u}_n=\\mathbf{i}_s", n: "节点法（以节点电压为未知量，方程数 = 独立节点数）" },
            { t: "\\mathbf{R}\\mathbf{i}_m=\\mathbf{u}_s", n: "网孔法（以网孔电流为未知量，方程数 = 独立网孔数）" },
            { t: "G_{ii}=\\sum\\text{接在该节点的电导},\\quad G_{ij}=-\\sum\\text{两节点间公共电导}", n: "自电导恒正、互电导恒负" }
          ],
          keys: ["节点法", "节点电压", "网孔法", "网孔电流", "自电导", "互电导", "超节点", "方程数"]
        },
        {
          id: "C4", name: "电路定理（叠加/戴维南/诺顿/最大功率）", stars: 3,
          formulas: [
            { t: "u_{oc}=i_{sc}R_{eq}", n: "戴维南与诺顿的桥梁——最好用的自查式" },
            { t: "R_L=R_{eq},\\quad P_{max}=\\frac{u_{oc}^2}{4R_{eq}}", n: "最大功率匹配：分母只有实部，没有 1/2" },
            { t: "R_L=|Z_{eq}|,\\quad P_{max}=\\frac{U_{oc}^2}{2(|Z_{eq}|+R_{eq})}", n: "纯电阻负载接交流源时的最大功率（与共轭匹配不同！）" },
            { t: "u_L=\\frac{u_{oc}}{2}", n: "匹配时负载电压恰为开路电压一半" },
            { t: "\\eta=50\\%", n: "匹配时效率只有一半" }
          ],
          keys: ["叠加定理", "替代定理", "戴维南", "诺顿", "最大功率", "匹配", "开路电压", "短路电流", "互易"]
        },
        {
          id: "C5", name: "含受控源电路的分析", stars: 3,
          formulas: [
            { t: "R_{eq}=\\frac{u}{i}", n: "外加电源法：独立源置零、受控源保留，外施 u 求 i" },
            { t: "R_{eq}<0\\ \\text{是可能的}", n: "含受控源时等效电阻可为负，说明电路含源" }
          ],
          keys: ["受控源", "外加电源法", "置零", "等效电阻", "负电阻"]
        }
      ]
    },
    {
      id: "C-B",
      name: "第二篇 动态电路",
      points: [
        {
          id: "C6", name: "动态电路与三要素法", stars: 3,
          formulas: [
            { t: "f(t)=f(\\infty)+\\left[f(0_+)-f(\\infty)\\right]e^{-t/\\tau}", n: "一阶电路三要素公式（f 可以是 u_C、i_L 或任意响应）" },
            { t: "\\tau=RC\\ \\text{或}\\ \\tau=\\frac{L}{R}", n: "时间常数；R 是从动态元件两端看进去的等效电阻" },
            { t: "u_C(0_+)=u_C(0_-),\\quad i_L(0_+)=i_L(0_-)", n: "换路定则：电容电压、电感电流不跃变" },
            { t: "s^2+2\\alpha s+\\omega_0^2=0", n: "二阶电路特征方程，判别式决定过阻尼/临界/欠阻尼" }
          ],
          keys: ["三要素", "一阶电路", "时间常数", "换路定则", "零输入", "零状态", "全响应", "二阶电路", "阻尼"]
        }
      ]
    },
    {
      id: "C-C",
      name: "第三篇 正弦稳态分析",
      points: [
        {
          id: "C7", name: "正弦稳态与相量法", stars: 3,
          formulas: [
            { t: "Z=R+jX,\\quad Y=G+jB", n: "阻抗与导纳" },
            { t: "Z_L=j\\omega L,\\quad Z_C=\\frac{1}{j\\omega C}=-j\\frac{1}{\\omega C}", n: "感抗与容抗" },
            { t: "Z_{in}=n^2Z_L", n: "理想变压器折算（见 C10）" },
            { t: "\\dot{U}=\\dot{I}Z", n: "相量形式的欧姆定律（含阻抗串并联全部照搬直流公式）" }
          ],
          keys: ["相量法", "相量", "阻抗", "导纳", "感抗", "容抗", "相量图", "有效值"]
        },
        {
          id: "C8", name: "正弦稳态功率与功率因数", stars: 3,
          formulas: [
            { t: "P=UI\\cos\\varphi,\\quad Q=UI\\sin\\varphi,\\quad S=UI", n: "有功/无功/视在功率" },
            { t: "\\tilde{S}=\\dot{U}\\dot{I}^{*}", n: "复功率——**必须取电流的共轭**，不共轭必错" },
            { t: "Q_C=P(\\tan\\varphi_1-\\tan\\varphi_2)", n: "把功率因数由 cosφ1 提到 cosφ2 需补的无功" },
            { t: "C=\\frac{Q_C}{\\omega U^2}", n: "补偿电容（U 为负载端电压有效值）" }
          ],
          keys: ["有功功率", "无功功率", "视在功率", "复功率", "共轭", "功率因数", "补偿", "电容补偿"]
        },
        {
          id: "C9", name: "谐振与频率特性", stars: 3,
          formulas: [
            { t: "\\omega_0=\\frac{1}{\\sqrt{LC}}", n: "谐振角频率" },
            { t: "\\rho=\\sqrt{\\frac{L}{C}}", n: "特性阻抗" },
            { t: "Q=\\frac{\\rho}{R}\\ (\\text{串联}),\\quad Q=\\frac{R}{\\rho}\\ (\\text{并联})", n: "品质因数——串并相反，最易错" },
            { t: "BW=\\frac{\\omega_0}{Q}", n: "通频带宽度" },
            { t: "U_L=U_C=QU\\ (\\text{串联谐振})", n: "串联谐振时电感电容电压是电源电压的 Q 倍（可能远大于电源）" },
            { t: "I_L=I_C=QI\\ (\\text{并联谐振})", n: "并联谐振时支路电流是总电流的 Q 倍" },
            { t: "\\omega_0=\\sqrt{\\frac{1}{LC}-\\frac{R^2}{L^2}}", n: "实际并联线圈（含串联损耗电阻 R）的谐振频率" }
          ],
          keys: ["谐振", "串联谐振", "并联谐振", "品质因数", "Q值", "通频带", "特性阻抗", "频率特性"]
        },
        {
          id: "C10", name: "互感与理想变压器", stars: 3,
          formulas: [
            { t: "u_1=L_1\\frac{di_1}{dt}+M\\frac{di_2}{dt},\\quad u_2=M\\frac{di_1}{dt}+L_2\\frac{di_2}{dt}", n: "互感伏安关系（正号对应同名端同进同出）" },
            { t: "M=\\frac{L_{\text{顺}}-L_{\text{反}}}{4}", n: "由顺接/反接等效电感反求互感" },
            { t: "L_a=L_1-M,\\ L_b=L_2-M,\\ L_c=M", n: "T 形去耦 A 式（同侧相连）；自查 L_a+L_c=L_1" },
            { t: "L_a=L_1+M,\\ L_b=L_2+M,\\ L_c=-M", n: "T 形去耦 B 式（异侧相连）" },
            { t: "\\frac{u_1}{u_2}=n,\\quad \\frac{i_1}{i_2}=-\\frac{1}{n}", n: "理想变压器（n=N1/N2）" },
            { t: "Z_{in}=n^2Z_L", n: "理想变压器阻抗折算——信号题里常见的「变压器耦合」" },
            { t: "Z_{ref}=\\frac{(\\omega M)^2}{Z_{22}}", n: "反射阻抗（互感耦合的二次侧折算到一次侧）" }
          ],
          keys: ["互感", "同名端", "去耦", "T形等效", "理想变压器", "反射阻抗", "阻抗折算", "耦合电感"]
        },
        {
          id: "C14", name: "非正弦周期电流电路", stars: 2,
          formulas: [
            { t: "U=\\sqrt{U_0^2+U_1^2+U_2^2+\\cdots}", n: "非正弦周期量的有效值（各次谐波平方和开方）" },
            { t: "P=U_0I_0+\\sum_{k=1}^{\\infty}U_kI_k\\cos\\varphi_k", n: "平均功率：**只有同频率的电压电流才产生有功**" },
            { t: "X_L(k\\omega)=k\\omega L,\\quad X_C(k\\omega)=\\frac{1}{k\\omega C}", n: "各次谐波阻抗不同，必须逐次计算再叠加" },
            { t: "\\text{直流}:\\ L\\ \\text{短路},\\ C\\ \\text{开路}", n: "直流分量单独作用时的处理" }
          ],
          keys: ["非正弦周期", "谐波分析", "有效值", "平均功率", "直流分量", "逐次谐波"]
        },
        {
          id: "C15", name: "三相电路", stars: 3,
          formulas: [
            { t: "\\dot U_A=U\\angle 0^\\circ,\\ \\dot U_B=U\\angle{-120^\\circ},\\ \\dot U_C=U\\angle{120^\\circ}", n: "对称三相电压（正序）；三个相电压之和为零" },
            { t: "\\dot U_{AB}=\\dot U_A-\\dot U_B=\\sqrt3\\dot U_A\\angle 30^\\circ", n: "线电压与相电压的关系：**大小 $\\sqrt3$ 倍、相位超前 $30^\\circ$**" },
            { t: "Y:\\ I_l=I_p,\\ U_l=\\sqrt3U_p;\\qquad \\Delta:\\ U_l=U_p,\\ I_l=\\sqrt3I_p", n: "Y 与 Δ 的线/相关系，接法不同结论相反，是最高频失分点" },
            { t: "P=\\sqrt3U_lI_l\\cos\\varphi", n: "对称三相有功；$\\varphi$ 是**相电压与相电流**的夹角，不是线电压的" },
            { t: "Q=\\sqrt3U_lI_l\\sin\\varphi,\\quad S=\\sqrt3U_lI_l", n: "无功与视在功率" },
            { t: "P=P_1+P_2,\\quad Q=\\sqrt3(P_1-P_2)", n: "二瓦计法测三相功率（仅适用于三相三线制）" },
            { t: "\\dot U_{NN'}=\\frac{\\dot U_A Y_A+\\dot U_B Y_B+\\dot U_C Y_C}{Y_A+Y_B+Y_C}", n: "中点位移电压（节点电压法），三相四线制中线阻抗为零时 $\\dot U_{NN'}=0$" }
          ],
          keys: ["三相", "对称三相", "线电压", "相电压", "线电流", "相电流", "星形", "三角形", "中线", "中点位移", "二瓦计", "正序", "负序"]
        }
      ]
    },
    {
      id: "C-D",
      name: "第四篇 其他",
      points: [
        {
          id: "C11", name: "二端口网络", stars: 2,
          formulas: [
            { t: "\\begin{cases}U_1=Z_{11}I_1+Z_{12}I_2\\\\U_2=Z_{21}I_1+Z_{22}I_2\\end{cases}", n: "Z 参数方程" },
            { t: "Z_{12}=Z_{21}", n: "互易网络的条件（含受控源则不成立）" },
            { t: "\\begin{bmatrix}U_1\\\\I_1\\end{bmatrix}=\\begin{bmatrix}A&B\\\\C&D\\end{bmatrix}\\begin{bmatrix}U_2\\\\-I_2\\end{bmatrix}", n: "T（传输）参数，级联时矩阵相乘" },
            { t: "AD-BC=1", n: "互易二端口的 T 参数满足" }
          ],
          keys: ["二端口", "Z参数", "Y参数", "T参数", "H参数", "互易", "对称", "级联"]
        },
        {
          id: "C12", name: "运算放大器", stars: 2,
          formulas: [
            { t: "u_+=u_-,\\quad i_+=i_-=0", n: "虚短 + 虚断（理想运放工作在线性区）" },
            { t: "\\frac{u_o}{u_i}=-\\frac{R_f}{R_1}", n: "反相比例放大" },
            { t: "\\frac{u_o}{u_i}=1+\\frac{R_f}{R_1}", n: "同相比例放大" },
            { t: "u_o=-RC\\frac{du_i}{dt}", n: "微分器；积分器则把 R、C 换位" }
          ],
          keys: ["运放", "虚短", "虚断", "反相放大", "同相放大", "加法器", "积分器", "理想运放"]
        },
        {
          id: "C13", name: "非线性电路", stars: 1,
          formulas: [
            { t: "u=f(i)", n: "非线性电阻的伏安特性" },
            { t: "\\Delta u=\\left.\\frac{df}{di}\\right|_{Q}\\Delta i", n: "小信号分析法：在工作点 Q 处线性化" }
          ],
          keys: ["非线性", "小信号", "工作点", "图解法", "分段线性"]
        }
      ]
    }
  ]
};