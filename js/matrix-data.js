/**
 * 数字群岛 · 岛主个人门户 (Daozhu Master Portfolio 2026)
 * 全矩阵数据源 (matrix-data.js) - 串联 v2 站点、主作品集与本地全部卫星项目
 */

window.DAOZHU_DATA = {
  profile: {
    name: "岛主",
    enName: "Daozhu",
    title: "十年编剧 × AI 产品经理 · 独立全栈创造者",
    slogan: "用故事思维，驱动用户价值。",
    motto: "“别人做产品，我讲故事——只是我的故事，恰好能落地、能生长。”",
    lead: "十年电影、儿童动画与商业短剧编剧实战，转战头部教育硬件（好未来 / 摩比魔法七巧板）与儿童互动立体书（乐乐趣）创新产品从 0 到 1。在 AI 时代，以独立超级个体身份构建集「前沿雷达、工控灵感、编剧手艺、独立游戏与人文绘本」于一体的数字群岛生态。",
    avatar: "assets/avatar.jpg",
    status: "🟢 群岛枢纽在线 · 5个卫星站正常同步",
    quote: "“有用的东西，做得有人味；好玩的东西，做得有价值。这是我想一直做下去的事。”",
    interests: [
      { icon: "🖋️", label: "写好故事" },
      { icon: "🎬", label: "做 AIGC 片子" },
      { icon: "👧", label: "陪女儿一一" },
      { icon: "🏃", label: "长跑 10KM" },
      { icon: "🥾", label: "山野徒步" },
      { icon: "🚗", label: "自驾远行" }
    ],
    socials: [
      { name: "GitHub", handle: "@daozhu1993-oss", url: "https://github.com/daozhu1993-oss" },
      { name: "X (Twitter)", handle: "@daozhu_1", url: "https://x.com/daozhu_1" },
      { name: "即刻", handle: "岛主", url: "https://web.okjike.com" },
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
      tags: ["核心手艺", "短剧/漫剧", "叙事变现", "破亿播放"],
      badge: "CORE CRAFT",
      colSpan: 8,
      aspect: "aspect-widescreen",
      image: "assets/yizhihuanxiang.jpg",
      posterOverlay: "55集商业爆款短剧《一纸还乡》实战提炼 · 前3秒留存断章定律",
      desc: "这不是泛资讯，而是十年一线编剧亲历提炼的可复现工业化手艺。收录好莱坞救猫咪重构公式、短剧爽点反转卡、每集90秒悬念卡点与 AI 漫剧一致性分镜全链路实战工作流。",
      highlights: ["55集短剧《一纸还乡》破亿战绩", "33集短剧《冲喜后》", "分集断章节奏卡"],
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
      image: null,
      desc: "自动化精准检索过去 24 小时全球前沿进展，覆盖 7 大领域（AI资讯、一人公司、产品设计、审美提升、产品营销、AI漫剧、AI协作）。每期精选 10 篇高密度图文，100% 真实有效外链与价值沉淀。",
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
      image: null,
      desc: "复古暖灰米黄机身、金属螺丝、呼吸绿灯与立体内阴影。内置原生 Web Audio 物理机械微动按键音效，收录全球 478+ 篇前沿动效交互、3D 纵深、排版审美与 11 大类设计工具库。",
      highlights: ["Web Audio 物理微动音效", "视口自动播放循环视频", "工控终端质感"],
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
      image: "assets/kart-girl.png",
      desc: "纯前端与 AI 深度协作打造的独立游戏集：包含 3D 极速赛道《岛主卡丁车 (Daozhu Kart)》、聊斋古典斗蟋蟀策略博弈《促织》与凡尔纳小说衍生《福格的赌约》。",
      highlights: ["《岛主卡丁车》3D赛道", "《促织》瓷盆古风博弈", "《福格的赌约》80天探索"],
      link: "#arcade-section",
      ctaText: "体验街机合集 ↗",
      themeColor: "#E07A5F",
      type: "arcade"
    },
    {
      id: "picturebook",
      name: "在岛上，慢慢长出来的东西",
      subtitle: "给女儿的 30 本成长绘本 · 写下来的小诗 · 慢生活",
      tags: ["海岛人文", "童话绘本", "慢调生活"],
      badge: "HUMAN SOUL",
      colSpan: 4,
      aspect: "aspect-square",
      image: null,
      desc: "“做再多商业与前沿 AI，心中始终留着一座小岛——留给童话、给女儿的画，和慢悠悠的时光。”坚持为女儿一一手绘成长绘本 30 册，沉淀原创 IP「芽芽兽」与 230 个思维模型。",
      highlights: ["原创成长绘本 30 册", "诗歌与海岛哲学", "一杯随时能聊的咖啡"],
      link: "https://me.daozhuai.cn",
      ctaText: "漫步小岛手记 ↗",
      themeColor: "#3B72DE",
      type: "picturebook"
    }
  ],

  // 2. 履历四大里程碑主线 (Four Milestones from Master Portfolio)
  milestones: [
    {
      step: "01",
      period: "2014 – 2021",
      title: "起点：先把手弄脏",
      sub: "GET MY HANDS DIRTY · 职业编剧",
      org: "影视 / 院线动画 / 商业短剧",
      desc: "比起追最新的工具，我更在意什么值得亲手做出来、做完整。十年剧本创作、分镜拆解与台词打磨，从最底层的一字一句和一行行叙事逻辑筑牢根基。主创 55 集商业爆款短剧《一纸还乡》破亿播放、33 集《冲喜后》等标杆作品。",
      tags: ["院线动画脚本", "55集破亿短剧", "好莱坞救猫咪重构"]
    },
    {
      step: "02",
      period: "2021.12 – 2024.05",
      title: "主线：用故事，驱动价值",
      sub: "STORY DRIVES USER VALUE · 创新产品策划",
      org: "好未来 / 学而思 智能硬件事业部",
      desc: "主导学习机世界观体系与「AI 小思」IP 从 0 到 1，落地大量智能体人设与应用规范；主导 3-6 岁智能启蒙硬件「摩比魔法七巧板」全案：市场测算、竞品拆解、产品定义、799 元定价与约 80% 毛利模型，主导图像识别算法从 90% 跃升至 98%。",
      tags: ["摩比魔法七巧板 799元", "AI 小思 IP 规范", "千万级学员触达"]
    },
    {
      step: "03",
      period: "2024.09 – 2025.05",
      title: "方式：一个人，加上 AI",
      sub: "ONE PERSON, PLUS AI · 创新产品总监",
      org: "乐乐趣 AI 数字研究院",
      desc: "主导亲子阅读场景「AI 乐乐」IP 从 0 到 1，输出智能体驱动的伴读课程方案。将实体立体书纸艺机械工程与数字多模态互动融合，以 AI 放大个人能力为完整工坊，实现低成本高密度的工业化交付。",
      tags: ["AI 乐乐 智能伴读", "纸艺机械互动融合", "国民级儿童 IP"]
    },
    {
      step: "04",
      period: "2025.05 – 至今",
      title: "生长：慢慢长出能陪人很久的东西",
      sub: "GROW THINGS THAT STAY · 独立超级个体",
      org: "数字群岛个人工作室",
      desc: "独立全流程制作 4K AIGC 系列纪录片《风物中国》（纸工艺拼贴美学 + 编剧级脚本，规划 110 段已出 3 部）；持续为女儿创作 30 册原创绘本；搭建数字群岛生态（AI 日报、CRT 灵感工控终端、编剧手艺库、独立街机游戏），以 vibe coding 践行一人公司。",
      tags: ["4K AIGC《风物中国》", "30本手绘成长绘本", "一人公司数字群岛"]
    }
  ],

  // 3. 商业战绩与代表作品 (Selected Commercial Works)
  works: [
    {
      id: "scripts",
      title: "《一纸还乡》55集商业爆款短剧 & 影视编剧战绩",
      role: "主编剧 · 55集短剧《一纸还乡》 / 33集短剧《冲喜后》",
      period: "爆款破亿战绩",
      tag: "破亿级播放 · 投流标杆",
      image: "assets/yizhihuanxiang.jpg",
      desc: "把控每集 90 秒快节奏高密度情绪反转与悬念卡点，将好莱坞经典救猫咪结构与下沉市场情绪爽点融合，创下全网破亿播放、投流 ROI 行业标杆的商业战绩。",
      metrics: "全网爆款破亿播放 · 剧本投流 ROI 行业标杆 · 叙事手艺成体系复现",
      badges: ["55集短剧", "破亿播放", "情绪反转波形"]
    },
    {
      id: "mobi",
      title: "好未来 / 学而思 · 摩比魔法七巧板",
      role: "产品策划负责人 · 智能硬件启蒙全案 (0→1 主导)",
      period: "头部教育硬件",
      tag: "799元定价 · 80%毛利模型",
      image: null,
      desc: "重构传统数学几何启蒙认知，建立故事化关卡世界观与具象互动教具，定义 799 元定价及约 80% 毛利商业模型，主导硬件图像识别算法从 90% 调优至 98%。",
      metrics: "触达超 1000万+ 学员 · 图像识别率 98% · 软硬件与故事世界观深度咬合",
      badges: ["学而思旗舰硬件", "毛利模型 80%", "儿童互动世界观"]
    },
    {
      id: "lelequ",
      title: "乐乐趣 · AI 乐乐 亲子伴读数字智能体",
      role: "创新产品总监 · IP 与多模态交互设计师",
      period: "国民级童书矩阵",
      tag: "童书立体纸艺 × AI伴读",
      image: null,
      desc: "将世界级立体书纸艺机械工程与儿童亲子阅读场景结合，研发「AI 乐乐」伴读智能体人设，打造具备温润人声、即时互动与分级阅读引导的全新数字阅读方案。",
      metrics: "累计发行超 50万+ 册 · 荣获国家级儿童阅读奖项 · 纸电一体化创新",
      badges: ["AI 乐乐", "亲子分级阅读", "纸艺工程"]
    },
    {
      id: "fengwu",
      title: "4K AIGC 系列纪录片《风物中国》与分镜 Agent",
      role: "独立制作人 · 全流程 AIGC 导演与编剧",
      period: "前沿 AI 影像",
      tag: "纸工艺拼贴美学 · 4K 成片",
      image: null,
      desc: "探索影视级 AIGC 全流程工作流：采用独特的纸工艺拼贴视觉美学 + 编剧级高密度人文台本，独立规划 110 段风物风貌，已完成 3 部 4K 成片与 AI 漫剧角色一致性分镜工作流。",
      metrics: "制作周期由传统 3周 缩减至 48小时 · 生产力提升 80% · 视觉独创性",
      badges: ["4K AIGC", "纸工艺拼贴", "AI 漫剧分镜 Agent"]
    }
  ],

  // 4. 独立游戏与互动故事合集 (Interactive Games from Workspace)
  games: [
    {
      id: "kart",
      title: "《岛主卡丁车 (Daozhu Kart)》",
      subtitle: "3D 极速网页竞速街机",
      tag: "3D Arcade · WebGL",
      image: "assets/kart-girl.png",
      desc: "纯前端 WebGL + Three.js 打造的轻量级 3D 赛车小游戏。支持即开即跑、动态镜头与道具加速漂移，体验丝滑街机感。",
      url: "https://github.com/daozhu1993-oss"
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
      url: "https://github.com/daozhu1993-oss"
    },
    {
      id: "aq",
      title: "《阿Q正传》心理互动剧场",
      subtitle: "鲁迅文学角色心理模拟器",
      tag: "文学互动 · 精神胜利法",
      image: "assets/aq.jpg",
      desc: "以深度互动的选择分支拆解阿Q的「精神胜利法」与未庄众生相，将严肃文学转化为可交互、有张力的心理叙事剧场。",
      url: "https://aq.daozhuai.cn"
    }
  ],

  // 5. 最近在做什么 (Now / Changelog from v2)
  nowList: [
    {
      date: "2026.09",
      text: "重构并聚合「数字群岛」母港全新主站，全面对标现代高审美排版与微交互，串联五大矩阵与商业战绩。",
      linkText: "当前站点",
      url: "#"
    },
    {
      date: "2026.08",
      text: "发布「岛主灵感 · Daozhu's Inspo」复古工控硬件设计终端，收录全球 478+ 篇前沿交互分镜与 Web Audio 机械按键音效。",
      linkText: "访问灵感终端 ↗",
      url: "https://inspo.daozhuai.cn"
    },
    {
      date: "2026.07",
      text: "搭建短剧与 AI 漫剧工业化手艺库「编剧工坊 · StoryCraft」，系统梳理爆款前 3 秒黄金反转与断章节拍卡。",
      linkText: "进入工坊 ↗",
      url: "https://script.daozhuai.cn"
    },
    {
      date: "2026.06",
      text: "独立完成 4K AIGC 纪录片《风物中国》前 3 部成片与《促织》《福格的赌约》两款互动游戏实验上线。",
      linkText: "体验街机合集 ↗",
      url: "#arcade-section"
    }
  ],

  // 6. 思考手记与思维模型 (Mental Models & Writing)
  articles: [
    {
      title: "为什么做 AI 产品，先要学会编剧的“起承转合”？",
      date: "2026.09.05",
      category: "故事思维",
      readTime: "6 min",
      excerpt: "市面上的很多 AI 工具像一把精密的螺丝刀，但用户需要的是一栋装满故事与温度的木屋。如何把戏剧张力与情绪唤醒注入产品的每一步交互？",
      url: "https://me.daozhuai.cn/#notes"
    },
    {
      title: "一人公司的审美护城河：为什么我坚持做复古工控终端？",
      date: "2026.08.31",
      category: "审美提升",
      readTime: "8 min",
      excerpt: "在模版泛滥与扁平同质化的今天，具有物理触感、机械声学微动与视觉深度的产品，才能在用户脑海里扎下一根刺。",
      url: "https://inspo.daozhuai.cn"
    },
    {
      title: "短剧与 AI 漫剧黄金前 3 秒留存公式拆解",
      date: "2026.08.24",
      category: "编剧手艺",
      readTime: "5 min",
      excerpt: "从破亿短剧《一纸还乡》到爆款 AI 漫剧，我们拆解了 100 部头部短剧的节拍波形图。记住：用户不是为你买单，是为他被唤醒的情绪买单。",
      url: "https://script.daozhuai.cn"
    }
  ]
};
