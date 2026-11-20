'use strict';
const games = window.ISLANDS.filter(item => item.group === 'play');
let selected = 0;
let screenMotion;
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const display = document.querySelector('.display');
const cartridges = document.getElementById('cartridges');
const gameCovers = {
  fogg:['collection-covers.webp','300% 300%','50% 0%','八十天的冒险'],
  starry:['collection-covers.webp','300% 300%','100% 0%','星月下的小镇'],
  kart:['collection-covers-02.webp','400% 200%','0% 100%','把海风甩在身后'],
  cuzhi:['collection-covers.webp','300% 300%','0% 50%','一只蟋蟀的命运'],
  aq:['collection-covers.webp','300% 300%','50% 50%','文学里的选择'],
  pocket:['collection-covers-02.webp','400% 200%','33.333333% 100%','口袋里的游乐场'],
  pelican:['collection-covers.webp','300% 300%','100% 50%','沿着海岸慢慢骑'],
  shanhai:['collection-covers.webp','300% 300%','0% 100%','山海之间遇异兽'],
  tetris:['collection-covers.webp','300% 300%','50% 100%','熟悉的方块时光']
};
const gameTitleLines={fogg:['福格的赌约'],cuzhi:['《促织》','蟋蟀决斗'],aq:['《阿Q正传》','互动剧场'],pelican:['海风信使','单车漫游'],shanhai:['山海灵感图鉴','异兽对决'],tetris:['GB','俄罗斯方块']};
for (const game of games) {
  const cover=gameCovers[game.id];
  const button=document.createElement('button');
  button.className='artifact cartridge';button.dataset.game=game.id;
  button.setAttribute('aria-label','选取'+game.name);
  const object=document.createElement('span');object.className='artifact-object';
  const face=document.createElement('span');face.className='artifact-face';
  const art=document.createElement('span');art.className='artifact-art';art.setAttribute('aria-hidden','true');
  art.style.setProperty('--art',`url('../assets/${cover[0]}')`);art.style.setProperty('--zoom',cover[1]);art.style.setProperty('--crop',cover[2]);
  const type=document.createElement('span');type.className='artifact-type';
  const title=document.createElement('b');
  for(const line of (gameTitleLines[game.id]||[game.name])){const part=document.createElement('span');part.textContent=line;title.append(part);}
  const imprint=document.createElement('small');imprint.textContent='岛主 · 游戏收藏';type.append(title,imprint);
  face.append(art,type);object.append(face);
  const caption=document.createElement('span');caption.className='artifact-caption';caption.textContent=cover[3];
  button.append(object,caption);button.addEventListener('click',()=>choose(games.indexOf(game),true));cartridges.append(button);
}
function choose(index, move = false, animate = true) {
  selected = (index + games.length) % games.length;
  const game = games[selected];
  document.getElementById('game-number').textContent = `${String(selected + 1).padStart(2,'0')} / ${String(games.length).padStart(2,'0')}`;
  document.getElementById('game-title').textContent = game.name;
  document.getElementById('game-description').textContent = game.description;
  document.getElementById('game-link').href = game.url;
  cartridges.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.game === game.id)));
  history.replaceState(null, '', '#' + game.id);
  screenMotion?.cancel();
  if (animate && !reduced.matches && display.animate) {
    screenMotion = display.animate([{opacity:.6,transform:'translateY(2px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
    screenMotion.finished.catch(()=>{});
  }
  if (move) { window.islandReveal ? window.islandReveal(display) : display.scrollIntoView({behavior:'instant',block:'center'}); document.getElementById('game-title').focus({preventScroll:true}); }
}
document.querySelectorAll('[data-pick]').forEach(button => button.addEventListener('click', () => choose(games.findIndex(game => game.id === button.dataset.pick), true)));
document.getElementById('previous').addEventListener('click', () => choose(selected - 1));
document.getElementById('next').addEventListener('click', () => choose(selected + 1));
const requestedGame=games.some(game=>game.id===location.hash.slice(1));
function readHash() { const i=games.findIndex(game=>game.id===location.hash.slice(1)); choose(i<0?0:i,false,false); }
window.addEventListener('hashchange',readHash);readHash();
document.getElementById('dock-art').addEventListener('error',()=>{document.getElementById('art-status').textContent='码头原画暂时没能加载，下方掌机与航标小游戏仍然可以使用。';});

const lamps = [...document.querySelectorAll('[data-beacon]')];
const start = document.getElementById('start-beacons');
const statusLine = document.getElementById('beacon-status');
const names = ['北灯','东灯','南灯','西灯'];
let sequence = [], position = 0, round = 0, phase = 'idle', timer, lightTimer;
function clearLamps() { lamps.forEach(button=>button.classList.remove('lit')); }
function lock(locked) { lamps.forEach(button=>button.disabled=locked); }
function stopPlayback() { clearTimeout(timer);clearTimeout(lightTimer);clearLamps();lock(true); }
function showSequence() {
  stopPlayback();phase='showing';start.disabled=true;position=0;
  statusLine.textContent='先看灯，记住顺序。';
  let step=0;
  function flash() {
    if(step===sequence.length){phase='input';lock(false);start.disabled=false;start.textContent='重新看一遍';statusLine.textContent=`轮到你了，依次点 ${sequence.length} 下。`;return;}
    const value=sequence[step++];lamps[value].classList.add('lit');statusLine.textContent=`第 ${step} 下：${names[value]}亮起。`;
    timer=setTimeout(()=>{clearLamps();timer=setTimeout(flash,260);},650);
  }
  timer=setTimeout(flash,400);
}
function beginRound() {
  if(phase==='input'||phase==='miss'){showSequence();return;}
  if(phase==='won'||phase==='idle')round=0;
  round++;sequence=Array.from({length:round+2},()=>Math.floor(Math.random()*4));
  document.getElementById('round-label').textContent=`第 ${round} / 3 轮 · ${sequence.length} 下`;
  showSequence();
}
start.addEventListener('click',beginRound);
lamps.forEach((button,value)=>button.addEventListener('click',()=>{
  if(phase!=='input')return;
  clearTimeout(lightTimer);clearLamps();button.classList.add('lit');lightTimer=setTimeout(clearLamps,180);
  const result=beaconStep(sequence,position,value);
  if(result==='miss'){phase='miss';lock(true);statusLine.textContent='顺序差了一点。再看一遍，这轮重来。';start.textContent='再看一遍';return;}
  position++;
  if(result==='complete'){
    lock(true);phase=round===3?'won':'between';start.textContent=phase==='won'?'再玩一次':'看下一轮';statusLine.textContent=phase==='won'?'三轮都点亮了。今晚的码头，交给你了。':'这一轮点亮了。准备好再进入下一轮。';
  }else statusLine.textContent=`已点对 ${position} / ${sequence.length} 下，继续。`;
}));
function suspend() {
  if(phase!=='showing'&&phase!=='input')return;
  stopPlayback();phase='miss';start.disabled=false;start.textContent='重新看一遍';statusLine.textContent='回来啦，重新看一遍这一轮的灯。';
}
document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();});
window.addEventListener('pagehide',suspend);

if(requestedGame||new URLSearchParams(location.search).get('view')==='collection')window.addEventListener('load',()=>{const target=new URLSearchParams(location.search).get('view')==='collection'?document.getElementById('play-bench'):display;target.scrollIntoView({block:'start'});});
