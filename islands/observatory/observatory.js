'use strict';
const channels = [
  {id:'daily',label:'AI 日报',question:'今天有什么值得留意，哪些线索值得继续追？',action:'去读 AI 日报'},
  {id:'inspo',label:'设计灵感',question:'留意一个版式、一段动效，再说清它好在哪里。',action:'进入灵感工控终端'},
  {id:'journal',label:'AI 思考',question:'工具在变，创作者怎样形成自己的判断？',action:'阅读 AI 思考杂志'},
  {id:'models',label:'思维模型',question:'遇到问题，试着换一个思考角度。',action:'打开思维模型图鉴'}
];
const channelCovers = {
  daily:['collection-covers-02.webp','400% 200%','0% 0%','AI 日报','从世界收到的新消息'],
  inspo:['collection-covers-02.webp','400% 200%','33.333333% 0%','设计灵感','留给下一次创作'],
  journal:['collection-covers-02.webp','400% 200%','66.666667% 0%','岛主的 AI 思考','关于工具，也关于人'],
  models:['collection-covers-02.webp','400% 200%','100% 0%','思维模型图鉴','换个角度看问题']
};
for(const button of document.querySelectorAll('.channel-switches [data-channel]')) {
  const cover=channelCovers[button.dataset.channel];button.textContent='';button.className='artifact folder';
  const object=document.createElement('span');object.className='artifact-object';
  const face=document.createElement('span');face.className='artifact-face';
  const art=document.createElement('span');art.className='artifact-art';art.setAttribute('aria-hidden','true');
  art.style.setProperty('--art',`url('../assets/${cover[0]}')`);art.style.setProperty('--zoom',cover[1]);art.style.setProperty('--crop',cover[2]);
  const type=document.createElement('span');type.className='artifact-type';
  const title=document.createElement('b');for(const line of (button.dataset.channel==='journal'?['岛主的','AI 思考']:button.dataset.channel==='models'?['思维模型','图鉴']:[cover[3]])){const part=document.createElement('span');part.textContent=line;title.append(part);}const author=document.createElement('small');author.textContent='岛主 · 观察与思考';type.append(title,author);
  face.append(art,type);object.append(face);
  const caption=document.createElement('span');caption.className='artifact-caption';caption.textContent=cover[4];button.append(object,caption);
}
const tuner = document.getElementById('tuner');
const screen = document.getElementById('screen');
const clippings = document.getElementById('clipping-content');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let screenAnimation;
let clippingAnimation;

function appendClipping(title, text, url, action) {
  const item = document.createElement('article');
  item.className = 'clipping';
  const heading = document.createElement('h3');
  heading.textContent = title;
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  item.append(heading, paragraph);
  if (url) {
    const link = document.createElement('a');
    link.href = url;
    link.textContent = action + ' ↗';
    item.append(link);
  }
  clippings.append(item);
}

function renderClippings(channel) {
  clippings.replaceChildren();
  const book = window.BOOKS.find(item => item.id === channel.id);
  if (book) {
    document.getElementById('clipping-label').textContent = channel.id === 'models' ? '从常用方法开始' : '从现有文章开始';
    for (const page of book.pages) appendClipping(page.title, page.text, page.url, page.linkText);
    return;
  }
  document.getElementById('clipping-label').textContent = '去原站继续探索';
  if (channel.id === 'daily') {
    appendClipping('先找一条和自己有关的线索', '日报围绕 AI、独立创作、产品设计和内容工作寻找前沿进展。进入原站查看最新一期，再挑值得深入的一条。', 'https://dailyone.daozhuai.cn/', '打开日报');
    appendClipping('把资讯变成一个问题', '读完之后，试着留下一个具体问题：它会改变我的创作、产品，还是协作方式？', '../stories/index.html#journal', '去小屋翻翻思考手记');
  } else {
    appendClipping('看见喜欢的，再拆开看', '到灵感终端找设计、动效、三维与排版参考。收藏时，也留下一句“它为什么适合我的项目”。', 'https://inspo.daozhuai.cn/', '进入灵感终端');
    appendClipping('把参考变成一次小实践', '选一个可以在项目里验证的细节，从阅读、操作或信息表达入手，再回来看效果。', '../workshop/index.html', '去产品工坊');
  }
}

function setChannel(index, moveToDesk = false, animate = true) {
  current = Math.max(0, Math.min(channels.length - 1, index));
  const channel = channels[current];
  const island = window.ISLANDS.find(item => item.id === channel.id);
  screenAnimation?.cancel();
  clippingAnimation?.cancel();
  document.getElementById('channel-title').textContent = island.name;
  document.getElementById('channel-description').textContent = island.description;
  document.getElementById('channel-question').textContent = channel.question;
  const link = document.getElementById('channel-link');
  link.href = island.url;
  link.textContent = channel.action + ' ↗';
  document.getElementById('knob').setAttribute('aria-label', '翻下一份收藏：' + channels[(current + 1) % channels.length].label);
  tuner.value = String(current);
  tuner.setAttribute('aria-valuetext', channel.label);
  document.getElementById('dial-label').textContent = channel.label;
  document.querySelectorAll('[data-channel]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.channel === channel.id)));
  history.replaceState(null, '', '#' + channel.id);
  renderClippings(channel);
  if (animate && !reduced.matches && screen.animate) {
    screenAnimation = screen.animate([{opacity:.55,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}], {duration:190,easing:'cubic-bezier(.22,1,.36,1)'});
    clippingAnimation = clippings.animate([{opacity:.45},{opacity:1}], {duration:170,easing:'ease-out'});
    screenAnimation.finished.catch(() => {});
    clippingAnimation.finished.catch(() => {});
  }
  if (moveToDesk) {
    window.islandReveal ? window.islandReveal(document.getElementById('screen')) : document.getElementById('control-desk').scrollIntoView({behavior:'instant'});
    document.getElementById('channel-title').focus({preventScroll:true});
  }
}

document.querySelectorAll('[data-channel]').forEach(button => button.addEventListener('click', () => {
  setChannel(channels.findIndex(channel => channel.id === button.dataset.channel), button.classList.contains('room-object'));
}));
tuner.addEventListener('input', () => setChannel(Number(tuner.value)));
document.getElementById('knob').addEventListener('click', () => setChannel((current + 1) % channels.length));
document.getElementById('observation-art').addEventListener('error', () => {
  document.getElementById('art-status').textContent = '观察室原画暂时没能加载，下面的四个频道仍然可以使用。';
});
window.addEventListener('hashchange', () => {
  const index = channels.findIndex(channel => channel.id === location.hash.slice(1));
  if (index >= 0) setChannel(index, true, false);
});
const initial = channels.findIndex(channel => channel.id === location.hash.slice(1));
setChannel(initial >= 0 ? initial : 0, false, false);

if(initial>=0||new URLSearchParams(location.search).get('view')==='collection')window.addEventListener('load',()=>{const target=new URLSearchParams(location.search).get('view')==='collection'?document.getElementById('control-desk'):screen;target.scrollIntoView({block:'start'});});
