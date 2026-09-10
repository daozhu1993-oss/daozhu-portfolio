/**
 * 数字群岛 · 岛主个人门户 (Daozhu Portfolio 2026)
 * 全矩阵官方真实数据源 (matrix-data.js)
 * 100% 对应作者真实作品集，彻底消除虚构信息
 */

window.DAOZHU_DATA = {
  profile: {
    name: "岛主",
    enName: "Daozhu",
    title: "十年编剧 × AI 产品 × 内容创作 · 独立全栈创造者",
    slogan: "用故事思维，驱动用户价值。",
    motto: "“别人做产品，我讲故事——只是我的故事，恰好能落地、能生长。”",
    lead: "十年电影、儿童动画与小说编剧实战，转战好未来（学而思）创新启蒙硬件「摩比魔法七巧板」与乐乐趣「AI 乐乐」从 0 到 1。在 AI 时代，以独立超级个体身份构建集「前沿雷达、工控灵感、编剧手艺、独立游戏与人文绘本」于一体的数字群岛生态。",
    avatar: "assets/avatar.jpg",
    badge: "在岛上，慢慢长出东西",
    status: "🟢 群岛枢纽在线 · 全矩阵正常同步",
    quote: "“有用的东西，做得有人味；好玩的东西，做得有价值。这是我想一直做下去的事。”",
    interests: [
      { icon: "🏃", label: "跑步" },
      { icon: "🥾", label: "徒步" },
      { icon: "🚗", label: "自驾游" },
      { icon: "🖋️", label: "写故事" },
      { icon: "🎬", label: "做片子" },
      { icon: "👧", label: "陪一一" }
    ],
    socials: [
      { name: "作品站 · 岛上", handle: "v2 站点", url: "https://daozhu1993-oss.github.io/v2/" },
      { name: "知乎", handle: "岛主王仙客", url: "https://www.zhihu.com/people/wang-xianke-52" },
      { name: "GitHub", handle: "@daozhu1993-oss", url: "https://github.com/daozhu1993-oss" },
      { name: "小红书", handle: "岛主", url: "https://xhslink.cn/o/7NfUNVTdCrr" },
      { name: "即刻", handle: "岛主", url: "https://web.okjike.com" },
      { name: "X (Twitter)", handle: "@daozhu_1", url: "https://x.com/daozhu_1" },
      { name: "微信专栏", handle: "岛主的故事工坊", url: "https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzIxOTE5OTczNA==&action=getalbum&album_id=4578372974411530241&scene=21#wechat_redirect" },
      { name: "个人微信", handle: "bl-free", url: "#contact" }
    ]
  },

  // 1. 五大群岛矩阵卫星站 (Ecosystem Satellites Bento Grid)
  satellites: [
    {
      id: "script",
      name: "编剧手艺工坊 · StoryCraft",
      subtitle: "短剧 / AI 漫剧工业化叙事变现手艺库",
      tags: ["核心手艺", "短剧/漫剧", "叙事变现", "工业化分镜"],
      badge: "CORE CRAFT",
      colSpan: 8,
      aspect: "aspect-widescreen",
      image: "assets/bento-storycraft.jpg",
      topPill: "🖋️ STORY CRAFT",
      topStatus: "● INDUSTRIAL",
      overlayTitle: "编剧手艺工坊",
      overlaySubtitle: "救猫咪重构 · 短剧断章卡 · AI 漫剧一致性分镜",
      desc: "十年一线电影、儿童动画与商业短剧编剧亲历提炼的可复现工业化手艺。收录救猫咪结构重构公式、快节奏情绪反转卡点与 AI 漫剧角色一致性分镜全链路工作流。",
      highlights: ["工业化剧本工作流", "AI 漫剧一致性分镜", "分集悬念与反转卡"],
      link: "https://script.daozhuai.cn",
      ctaText: "进入编剧手艺库 ↗",
      themeColor: "#B45A3C",
      type: "script"
    },
    {
      id: "daily",
      name: "岛主 AI 日报 · Daily Curator",
      subtitle: "过去 24 小时全球前沿资讯与一人公司雷达",
      tags: ["时代雷达", "一人公司", "高密度策展"],
      badge: "LIVE 24H",
      colSpan: 4,
      aspect: "aspect-square",
      image: "assets/bento-daily.jpg",
      topPill: "🛰️ RADAR",
      topStatus: "● 24H LIVE",
      overlayTitle: "全球前沿科技雷达",
      overlaySubtitle: "一人公司 × AI 漫剧 × 审美提升",
      desc: "自动化精准检索过去 24 小时全球前沿进展，覆盖 7 大领域（AI资讯、一人公司、产品设计、审美提升、产品营销、AI漫剧、AI协作）。每期精选 10 篇高密度图文，100% 真实有效权威外链。",
      highlights: ["每期 10 篇高密度精萃", "岛主策展主线叙事", "分镜剧场沉淀"],
      link: "https://dailyone.daozhuai.cn",
      ctaText: "阅读今日日报 ↗",
      themeColor: "#2A9D8F",
      type: "daily"
    },
    {
      id: "inspo",
      name: "岛主灵感 · Design & Motion",
      subtitle: "复古 CRT 工控美学的全球前沿设计分镜工坊",
      tags: ["Skeuomorphic CRT", "动效微交互", "478+精选"],
      badge: "478+ PIECES",
      colSpan: 4,
      aspect: "aspect-square",
      image: "assets/bento-inspo.jpg",
      topPill: "📺 CRT-DECK",
      topStatus: "● 478+ PIECES",
      overlayTitle: "复古工控硬件美学",
      overlaySubtitle: "Web Audio 物理微动音效 · 478+ 篇前沿交互",
      desc: "复古暖灰米黄机身、金属螺丝、呼吸绿灯与立体内阴影。内置原生 Web Audio 物理机械微动按键音效，收录全球 478+ 篇前沿动效交互、3D 纵深、排版审美与设计工具库。",
      highlights: ["Web Audio 物理微动音效", "视口自动循环预览", "工控终端质感"],
      link: "https://inspo.daozhuai.cn",
      ctaText: "打开工控终端 ↗",
      themeColor: "#D4883A",
      type: "inspo"
    },
    {
      id: "arcade",
      name: "岛上街机 · Daozhu Arcade",
      subtitle: "AI 协同全栈驱动的独立游戏与互动故事合集",
      tags: ["Mini Games", "3D赛车", "互动小说博弈"],
      badge: "ARCADE PLAY",
      colSpan: 4,
      aspect: "aspect-square",
      image: "assets/bento-arcade.jpg",
      topPill: "🕹️ ARCADE",
      topStatus: "P1 READY",
      overlayTitle: "独立街机游戏群岛",
      overlaySubtitle: "3D 卡丁车 · 聊斋蟋蟀博弈 · 文学互动",
      desc: "纯前端与 AI 深度协作打造的独立游戏集：包含 3D 极速赛道《岛主卡丁车 (Daozhu Kart)》、聊斋古典斗蟋蟀策略博弈《促织》、凡尔纳小说衍生《福格的赌约》与《阿Q正传》心理剧场。",
      highlights: ["《岛主卡丁车》3D赛道", "《促织》古风策略博弈", "《阿Q正传》心理剧场"],
      link: "#arcade-section",
      ctaText: "体验街机合集 ↗",
      themeColor: "#E07A5F",
      type: "arcade"
    },
    {
      id: "picturebook",
      name: "在岛上，慢慢长出来的东西",
      subtitle: "给女儿的成长绘本 · 原创 IP「芽芽兽」· 慢生活 (持续生长更新中)",
      tags: ["海岛人文", "成长绘本连载", "芽芽兽宇宙", "慢调生活"],
      badge: "HUMAN SOUL",
      colSpan: 4,
      aspect: "aspect-square",
      image: "assets/bento-island.jpg",
      topPill: "🌿 HUMAN SOUL",
      topStatus: "● 持续生长中",
      overlayTitle: "成长绘本与芽芽兽宇宙",
      overlaySubtitle: "给女儿的绘本连载 · 原创 IP 芽芽兽 · 慢生活",
      desc: "“做再多商业与前沿 AI，心中始终留着一座小岛——留给童话、给女儿的画，和慢悠悠的时光。”女儿的成长绘本在持续更新，原创 IP「芽芽兽」系列绘本也在持续生长，伴随手写诗歌与海岛哲学。",
      highlights: ["女儿成长绘本 (持续更新)", "芽芽兽 IP 绘本连载", "诗歌与慢调海岛生活"],
      link: "https://daozhu1993-oss.github.io/v2/",
      ctaText: "漫步小岛手记 ↗",
      themeColor: "#3B72DE",
      type: "picturebook"
    }
  ],

  // 2. 履历主线与一路走来 (The Path from Real Portfolio)
  milestones: [
    {
      step: "01",
      period: "2025.5 – 至今",
      title: "独立 AI 内容创作者 · 个人 IP「岛主」",
      sub: "INDEPENDENT AI CREATOR · 个人内容站",
      org: "个人内容站",
      desc: "独立制作全流程 AIGC 系列纪录片《风物中国》——纸工艺拼贴 + 编剧级脚本，规划 110 段，已产出 3 部成片（含 4K）；持续运营内容 IP「岛主」：30 本原创绘本、诗、神话新编、230 个思维模型知识库，原创 IP「芽芽兽」；以 vibe coding 独立上线个人网站与多款内容工具。",
      tags: ["全流程 4K AIGC", "30本手绘绘本", "芽芽兽 IP", "Vibe Coding"]
    },
    {
      step: "02",
      period: "2020.1 – 2024.5",
      title: "创新产品策划 / 游戏编剧 · 学而思",
      sub: "INNOVATIVE PRODUCT & WORLDVIEW · 主导 AI 小思、摩比七巧板与小猴 IP",
      org: "好未来 / 学而思",
      desc: "在学而思（好未来）四年多历任不同核心团队：前期担任「学而思小猴」儿童动画编剧（团队 owner），统筹人设、世界观构建与全流程剧本规范；随后转入智能硬件团队，主导学习机世界观体系与「AI 小思」IP 从 0 到 1，落地大量 AI 智能体人设，建立可延展的 IP 应用规范；主导「摩比魔法七巧板」3–6 岁智能启蒙硬件全案：市场测算、竞品拆解、产品定义、799 元定价与约 80% 毛利模型、版本节奏（图像识别 90%→98%）；从用户体验视角落地 3 款儿童互动游戏；跨 UI/UX/产品/研发协同推动上线。",
      tags: ["摩比魔法七巧板", "AI 小思 IP 规范", "学而思小猴动画", "799元定价 / 80%毛利", "图像识别98%"]
    },
    {
      step: "03",
      period: "2024.9 – 2025.5",
      title: "创新产品总监 · 乐乐趣 AI 数字研究院",
      sub: "PARENT-CHILD READING × AI AGENTS · 亲子阅读 × AI 智能体",
      org: "乐乐趣 AI 数字研究院",
      desc: "主导亲子阅读场景「AI 乐乐」IP 从 0 到 1，输出 AI 智能体驱动的阅读课程解决方案；带队完成用户研究 → 产品定义 → 策略 → 跨部门落地，推动第二曲线创新产品上线。",
      tags: ["AI 乐乐 伴读智能体", "0→1 课程产品方案", "亲子分级阅读"]
    }
  ],

  // 迷你履历履历卡片 (Mini Milestones)
  miniMilestones: [
    {
      period: "2025.11 – 2026.4",
      org: "西安航科智能 · 产品营销经理",
      desc: "品牌顶层设计、漫剧与 AI 智能体衍生内容"
    },
    {
      period: "2019",
      org: "历史自媒体「诸葛呈像」联合创始人",
      desc: "0→40 万粉、单条最高 68 万播放"
    },
    {
      period: "2016.7 – 2018.11",
      org: "西安启明星影视 · 策划部主管",
      desc: "售出电影剧本 5 部、百万字小说"
    }
  ],

  // 3. 代表作品 (Selected Works from Real Portfolio - Clicking Opens Rich Modals)
  works: [
    {
      id: "mobi",
      num: "01",
      tag: "产品 · 0→1",
      title: "摩比魔法七巧板",
      role: "我的角色：产品负责人 · 市场测算 · 竞品拆解 · 定价毛利 · 版本节奏 · 六阶段增长",
      image: "assets/mobi-hero.jpg",
      desc: "3–8 岁智能启蒙硬件（配合学而思学习机使用）：实体七巧板教具 + AI 老师 + 游戏化 App。用一整套原创冒险世界，把学习藏进孩子真正想玩的东西里。",
      meta: "产品策划负责人 · 智能硬件启蒙全案 (0→1 主导)",
      badges: ["智能启蒙硬件", "799元定价 / 80%毛利", "图像识别98%", "儿童互动世界观"],
      modalId: "m1"
    },
    {
      id: "xiaosi",
      num: "02",
      tag: "AI 智能体 · IP",
      title: "学而思「AI 小思」",
      role: "我的角色：创新产品策划 / IP 负责人",
      image: "assets/xiaosi-hero.jpg",
      desc: "学而思学习机上的 AI 伙伴——不是语音助手，而是懂孩子、懂内容、能陪孩子一起学习成长、有自己人格的智能体 IP。",
      meta: "学习机世界观体系 · 智能体人设与应用规范 0→1",
      badges: ["AI 伴学智能体", "人格与世界观 0→1", "多模态交互规范"],
      modalId: "m2"
    },
    {
      id: "fengwu",
      num: "03",
      tag: "AIGC · 纪录片",
      title: "《风物中国》AIGC 纪录片",
      role: "我的角色：独立制作（全流程）",
      image: "assets/fengwu-hero.jpg",
      directUrl: "https://daozhu1993-oss.github.io/fengwu/index.html",
      desc: "独立制作的全流程 AIGC 系列纪录片，纸工艺拼贴美学 + 编剧级脚本，系统讲述中国传统手艺。规划 110 段，已产出 3 部成片（含 4K）。",
      meta: "独立制作人 · 全流程 AIGC 导演与编剧",
      badges: ["全流程 AIGC", "4K 成片", "纸工艺拼贴美学", "110段规划"],
      modalId: "m3"
    },
    {
      id: "lelequ",
      num: "04",
      tag: "AI 智能体 · 亲子",
      title: "乐乐趣「AI 乐乐」",
      role: "我的角色：创新产品总监",
      image: "assets/lele-hero.jpg",
      desc: "乐乐趣的 AI 育儿伙伴——一个懂内容、懂孩子、能陪孩子一起阅读成长的智能体，落在点读笔、故事机、小程序等多种硬件与场景上。它的定位不是「点读工具」，而是有情感连接的育儿专家。",
      meta: "AI + 硬件点读笔 + 乐乐趣学习资源 0→1 产品框架",
      badges: ["点读笔硬件 × AI", "亲子伴读解决方案", "多场景多模态"],
      modalId: "m4"
    },
    {
      id: "daozhu-ip",
      num: "05",
      tag: "内容 IP · 独立",
      title: "个人内容 IP「岛主」",
      role: "我的角色：独立创作 + vibe coding",
      image: "assets/daozhu-ip-hero.jpg",
      desc: "30 本原创绘本、诗、神话新编、230 个思维模型知识库，原创 IP「芽芽兽」与品牌 VI，网站与内容工具自研全栈落地。",
      meta: "独立创作者 · 个人内容站",
      badges: ["30本手绘成长绘本", "82首诗 / 11篇神话", "230+思维模型", "芽芽兽 IP"],
      modalId: "m5"
    }
  ],

  // 4. AI 小项目 (AI Projects from Real Portfolio)
  projects: [
    {
      tag: "工具 · 可体验",
      title: "绘本多平台导出器",
      desc: "上传绘本 HTML，自动裁剪封面、内页、金句卡，按小红书 / 抖音 / 公众号 / X 的尺寸打包导出，省掉手动截图拼图。",
      url: "https://1553ab759b344ed6bda9539be8547802.bj8.agentos-app.net/",
      status: "live"
    },
    {
      tag: "工具 · 可体验",
      title: "诗笺 · 诗歌排版工具",
      desc: "输入标题、署名、正文，一键生成竖排古籍、极简诗卡、杂志编辑风等 19 种版式，支持加水印、导出 PNG。",
      url: "https://daozhu1993-oss.github.io/poem-typeset-tool/",
      status: "live"
    },
    {
      tag: "AIGC · 作品",
      title: "《风物中国》AIGC 纪录片",
      desc: "用 AI 生成 + 编剧脚本做的中国传统文化系列纪录片，全流程 AIGC、4K 成片。五系列 110 段，已出 3 部。",
      url: "https://daozhu1993-oss.github.io/fengwu/index.html",
      status: "work"
    },
    {
      tag: "产品实验 · 开源",
      title: "现实判断战略参谋",
      desc: "把商业战略方法论做成一个可安装的 AI 专家包，帮普通人做现实判断与决策，已开源免费分享。",
      url: "https://github.com/daozhu1993-oss/reality-strategy-advisor",
      status: "oss"
    },
    {
      tag: "工具 · 可体验",
      title: "慢游中国 · AI 旅行路线定制",
      desc: "输入出发地、天数、节奏、预算、偏好和真实约束（带娃 / 带老人 / 不爬山），路线引擎自动串成一条不绕路、带地图时间线和吃喝故事的国内旅行行程。",
      url: "https://daozhu1993-oss.github.io/travel/",
      status: "live"
    },
    {
      tag: "创作中",
      title: "绘本生成网站",
      desc: "一个还在做的项目——让更多人能用 AI 做出属于自己的绘本。做好后加进来。",
      url: null,
      status: "soon"
    }
  ],

  // 5. 思维模型图鉴 (Mental Models Gateway)
  models: {
    count: "230+",
    title: "思维模型 · 每日一模型",
    subtitle: "与其追每一个新工具，不如把常用的思维模型沉淀成能随时调用的上下文。我把它们做成单页笔记，慢慢汇成一座知识库。",
    desc: "230+ 个思维模型，做成随时能翻、能用的单文件笔记：MECE、第一性原理、黄金圈、BLM、PARA、SCQA……商业、表达、决策一路收着。",
    url: "https://daozhu1993-oss.github.io/models/index.html"
  },

  // 6. 思考手记 (Field Notes & Questions)
  notes: {
    title: "思考手记",
    subtitle: "关于 AI、产品，与普通人怎么用好工具的思考。把还没完全想透的问题，也放在阳光下慢慢长。",
    desc: "我把关于 AI 与内容的长文、判断和还在发酵的想法，陆续写在这里，持续更新。",
    url: "https://daozhu1993-oss.github.io/ai-thinking/index.html",
    questions: [
      "AI 能写、能画、能拍之后，一个内容人真正不可替代的是什么？",
      "怎么让 AI 做出来的东西，还带着人味、还打得动人？",
      "一个好故事，凭什么能变成一个能赚钱、能长大的产品？",
      "给孩子做东西，怎么既让他真的爱，又对他真的好？",
      "一个人加上 AI，能不能顶得上一支小团队？边界在哪？",
      "机器越强，哪些事反而越该由人亲手去做？"
    ]
  },

  // 7. 独立游戏与互动故事合集 (Arcade Games)
  games: [
    {
      id: "kart",
      title: "《岛主卡丁车 (Daozhu Kart)》",
      subtitle: "3D 极速网页竞速街机",
      tag: "3D Arcade · WebGL",
      image: "assets/kart-girl.png",
      desc: "纯前端 WebGL + Three.js 打造的轻量级 3D 赛车小游戏。支持即开即跑、动态镜头与道具加速漂移，体验丝滑街机感。",
      url: "https://daozhu1993-oss.github.io/kart/"
    },
    {
      id: "cuzhi",
      title: "《促织 · 聊斋蟋蟀决斗》",
      subtitle: "古典工笔古瓷盆斗蟋蟀博弈",
      tag: "博弈策略 · 国风沉浸",
      image: "assets/arena_ceramic_bowl.jpg",
      desc: "取材自蒲松龄《聊斋志异·促织》。包含明代宣德青花瓷盆赛场、钢丝与蟹壳青蟋蟀养成、搏斗节拍与戏剧化命运抉择。",
      url: "https://cuzhi.daozhuai.cn"
    },
    {
      id: "foggs-bet",
      title: "《福格的赌约》80天环游地球",
      subtitle: "凡尔纳小说衍生策略冒险",
      tag: "文字策略 · 蒸汽朋克",
      image: "assets/reform_club.jpg",
      desc: "改编自儒勒·凡尔纳经典小说。玩家化身斐利亚·福格或万事通，在伦敦改良俱乐部立下两万英镑赌注，穿越苏伊士运河与大西洋风暴。",
      url: "https://daozhu1993-oss.github.io/foggs-bet/"
    },
    {
      id: "aq",
      title: "《阿Q正传》心理互动剧场",
      subtitle: "鲁迅文学角色心理模拟器",
      tag: "文学互动 · 精神胜利法",
      image: "assets/aq.jpg",
      desc: "以深度互动的选择分支拆解阿Q的「精神胜利法」与未庄众生相，将严肃文学转化为可交互、有张力的心理叙事剧场。",
      url: "https://daozhu1993-oss.github.io/aq-game/"
    }
  ],

  // 8. 换了很多身份，但没换那条主线 (Closing Steps)
  closing: [
    {
      step: "01 起点",
      title: "先把手弄脏",
      desc: "比起追最新的工具，我更在意什么值得亲手做出来、做完整。"
    },
    {
      step: "02 主线",
      title: "用故事，驱动价值",
      desc: "从编剧到产品到独立创作，变的是身份，不变的是——用故事的方式，去打动人、去创造价值。"
    },
    {
      step: "03 方式",
      title: "一个人，加上 AI",
      desc: "我用 AI 把自己放大：一个人写脚本、做成片、做产品、做工具，把想法快速变成能用的东西。"
    },
    {
      step: "04 生长",
      title: "慢慢长出能陪人很久的东西",
      desc: "绘本、纪录片、产品、新的问题，会继续在岛上长出来。下一章，也在路上。"
    }
  ]
};
