'use strict';

// Current navigation manifest. Canonical domains follow the site's handover record.
window.ISLANDS = [
  {id:'travel',local:'atelier/index.html#travel',localAction:'打开旅行工作单 →',name:'慢游中国',group:'tools',description:'把预算、天数和真实约束放进旅行路线。',url:'https://travel.daozhuai.cn/',site:true},
  {id:'myth',name:'《神话》文学杂志',group:'stories',description:'从当代人性重新走进中国神话。',url:'https://myth.daozhuai.cn/',local:'stories/index.html#myth',site:true},
  {id:'storybook',name:'一一与芽芽兽 · 绘本馆',group:'stories',description:'给孩子的成长故事与原创绘本世界。',url:'https://storybook.daozhuai.cn/',local:'stories/index.html#storybook',site:true},
  {id:'fogg',name:'《福格的赌约》',group:'play',local:'play/index.html#fogg',localAction:'去码头选这盘 →',description:'走进八十天环游地球的策略冒险。',url:'https://fogg.daozhuai.cn/',site:true},
  {id:'daily',name:'岛主 AI 日报',group:'observe',description:'寻找 AI、产品与独立创作的新线索。',url:'https://dailyone.daozhuai.cn/',local:'observatory/index.html#daily',localAction:'接通日报频道 →',site:true},
  {id:'journal',name:'岛主的 AI 思考',group:'stories',description:'关于 AI、产品、判断与独立创作的长文。',url:'https://ai.daozhuai.cn/',local:'observatory/index.html#journal',localAction:'接通思考频道 →',site:true},
  {id:'script',local:'atelier/index.html#script',localAction:'打开故事工作单 →',name:'编剧手艺工坊',group:'tools',description:'故事结构、短剧、漫剧与分镜工作流。',url:'https://script.daozhuai.cn/',site:true},
  {id:'inspo',name:'岛主灵感 · Design & Motion',group:'tools',description:'设计、动效、排版与视觉参考。',url:'https://inspo.daozhuai.cn/',local:'observatory/index.html#inspo',localAction:'接通灵感频道 →',site:true},
  {id:'starry',name:'梵高的星空',group:'play',local:'play/index.html#starry',localAction:'去码头选这盘 →',description:'在星月夜的三维小镇里慢慢探索。',url:'https://starry.daozhuai.cn/',site:true},
  {id:'kart',name:'岛主卡丁车',group:'play',local:'play/index.html#kart',localAction:'去码头选这盘 →',description:'浏览器里的三维竞速体验。',url:'https://kart.daozhuai.cn/',site:true},
  {id:'cuzhi',name:'《促织》蟋蟀决斗',group:'play',local:'play/index.html#cuzhi',localAction:'去码头选这盘 →',description:'聊斋故事里的养成、博弈与命运。',url:'https://cuzhi.daozhuai.cn/',site:true},
  {id:'aq',name:'《阿Q正传》互动剧场',group:'play',local:'play/index.html#aq',localAction:'去码头选这盘 →',description:'在文学人物的选择中体验心理叙事。',url:'https://aq.daozhuai.cn/',site:true},
  {id:'pocket',name:'掌机游戏匣子',group:'play',local:'play/index.html#pocket',localAction:'去码头选这盘 →',description:'打开海风单车、山海异兽和方块游戏。',url:'https://pocket.daozhuai.cn/',site:true},
  {id:'me',name:'小岛手记',group:'stories',description:'诗歌、绘本、原创 IP 与慢生活。',url:'https://me.daozhuai.cn/v2/',local:'stories/index.html#me',site:true},
  {id:'models',name:'思维模型图鉴',group:'observe',description:'把常用的思考方法留成随时能翻的笔记。',url:'https://daozhu1993-oss.github.io/models/index.html',local:'observatory/index.html#models',localAction:'接通模型频道 →'},
  {id:'fengwu',name:'《风物中国》',group:'stories',description:'以纸工艺拼贴美学讲述传统手艺的 AIGC 纪录片。',url:'https://daozhu1993-oss.github.io/fengwu/index.html',local:'stories/index.html#fengwu'},
  {id:'pelican',name:'海风信使 · 单车漫游',group:'play',local:'play/index.html#pelican',localAction:'去码头选这盘 →',description:'骑车沿海岸线慢慢走。',url:'https://pocket.daozhuai.cn/games/pelican/',parent:'pocket'},
  {id:'shanhai',name:'山海灵感图鉴 · 异兽对决',group:'play',local:'play/index.html#shanhai',localAction:'去码头选这盘 →',description:'探索山海地图，遇见异兽。',url:'https://pocket.daozhuai.cn/games/shanhai/',parent:'pocket'},
  {id:'tetris',name:'GB 俄罗斯方块',group:'play',local:'play/index.html#tetris',localAction:'去码头选这盘 →',description:'掌机里的经典方块玩法入口。',url:'https://pocket.daozhuai.cn/games/tetris/',parent:'pocket'},
  {id:'mobi',name:'摩比魔法七巧板',group:'products',description:'产品定义、智能硬件与儿童互动体验。',url:'https://www.daozhuai.cn/#works',local:'workshop/index.html#mobi'},
  {id:'xiaosi',name:'学而思 AI 小思',group:'products',description:'世界观、智能体人设与应用规范。',url:'https://www.daozhuai.cn/#works',local:'workshop/index.html#xiaosi'},
  {id:'lele',name:'乐乐趣 AI 乐乐',group:'products',description:'亲子阅读场景里的研究、定义与落地。',url:'https://www.daozhuai.cn/#works',local:'workshop/index.html#lele'}
];
