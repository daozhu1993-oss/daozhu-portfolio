'use strict';
(() => {
 const frame=document.getElementById('island-frame'),veil=document.getElementById('passage'),base=new URL('.',location.href),audio=window.islandAudio;
 try{const u=new URL(location.href);const cap=u.searchParams.get('captain');if(cap!==null){if(cap)localStorage.setItem('daozhu-captain-key-v1',cap);else localStorage.removeItem('daozhu-captain-key-v1');u.searchParams.delete('captain');history.replaceState(null,'',u.pathname+u.search+u.hash);}}catch{}
 const pages={'voyage/index.html':['六岛航行','voyage'],'island.html':['岛主的港口','harbor'],'workshop/index.html':['产品工坊','workshop'],'stories/index.html':['故事小屋','stories'],'observatory/index.html':['灯塔观察室','lighthouse'],'play/index.html':['游戏码头','play'],'atelier/index.html':['旅行与创作','atelier'],'atlas.html':['群岛海图','atlas'],'contact.html':['港口来信','contact']};
 if(location.protocol==='file:'){document.getElementById('stage').hidden=true;document.querySelector('.player-bar').hidden=true;document.getElementById('file-notice').hidden=false;return;}
 let current='',ownedDepth=0,pendingTarget=null,counter=0,watchdog,transitionTimer;
 function allowed(value,depth=0){try{if(depth>1)return null;const url=new URL(value,base);if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))return null;let path=url.pathname.slice(base.pathname.length);if(path.endsWith('/'))path+='index.html';else if(!path.endsWith('.html')&&(Object.hasOwn(pages,path+'.html')||path==='experience'))path+='.html';if(path==='experience.html')return allowed(url.searchParams.get('page')||'voyage/index.html',depth+1);if(!Object.hasOwn(pages,path))return null;
  if(location.hostname==='www.daozhuai.cn'||location.hostname.endsWith('.daozhu-portfolio.pages.dev')||location.hostname==='daozhu-portfolio.pages.dev'){
   url.pathname=base.pathname+(path.endsWith('/index.html')?path.slice(0,-'index.html'.length):path.slice(0,-'.html'.length));
  }
  return{url,path,relative:path+url.search+url.hash};}catch{return null;}}
 function showVeil(label){clearTimeout(transitionTimer);veil.hidden=false;document.getElementById('passage-label').textContent=label||'沿着海风，去下一站。';requestAnimationFrame(()=>veil.classList.add('visible'));}
 function hideVeil(){veil.classList.remove('visible');transitionTimer=setTimeout(()=>{if(!veil.classList.contains('visible'))veil.hidden=true;},200);}
 function updateAddress(target,replace){const url=new URL(location.href);url.searchParams.set('page',target.relative);history[replace?'replaceState':'pushState']({page:target.relative,depth:ownedDepth},'',url);}
 function navigate(value,{replace=false,fromHistory=false}={}){const target=allowed(value);if(!target)return false;const firstLoad=!current&&!pendingTarget;const serial=++counter;showVeil('下一站 · '+pages[target.path][0]);audio.setScene(pages[target.path][1]);pendingTarget=target.relative;if(!fromHistory){if(!replace)ownedDepth++;updateAddress(target,replace);}clearTimeout(watchdog);setTimeout(()=>{if(serial!==counter)return;try{if(frame.contentWindow.location.href!=='about:blank')frame.contentWindow.location.replace(target.url.href);else frame.src=target.url.href;}catch{frame.src=target.url.href;}},firstLoad||matchMedia('(prefers-reduced-motion: reduce)').matches?0:160);watchdog=setTimeout(()=>{if(serial===counter)hideVeil();},10000);return true;}
 window.__ISLAND_PLAYER__={audio,navigate};
 frame.addEventListener('load',()=>{
  try{const url=frame.contentWindow.location.href;if(url==='about:blank')return;const target=allowed(url);if(!target){hideVeil();return;}const doc=frame.contentDocument;if(current&&target.relative!==current&&pendingTarget!==target.relative){ownedDepth++;updateAddress(target,false);}else updateAddress(target,true);current=target.relative;pendingTarget=null;document.getElementById('shell-location').textContent=pages[target.path][0];document.title=pages[target.path][0]+' · 岛主数字群岛';frame.title=pages[target.path][0];
   const style=doc.createElement('style');style.textContent='.global-sound-bar{display:none!important}.has-island-sound{padding-bottom:0!important}';doc.head.append(style);
   doc.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download'))return;const next=allowed(link.href);if(next){const now=new URL(frame.contentWindow.location.href);if(next.url.pathname===now.pathname&&next.url.search===now.search&&next.url.hash)return;event.preventDefault();navigate(next.relative);}else if(/^https?:/.test(link.href)){link.target='_blank';link.rel='noopener noreferrer';}},true);
   frame.contentWindow.addEventListener('pagehide',()=>showVeil('沿着海风，去下一站。'),{once:true});
   frame.contentWindow.addEventListener('hashchange',()=>{const next=allowed(frame.contentWindow.location.href);if(next)updateAddress(next,true);});
   clearTimeout(watchdog);hideVeil();
  }catch{hideVeil();}
 });
 document.getElementById('shell-map').addEventListener('click',()=>navigate('voyage/index.html?return='+({workshop:'workshop',stories:'stories',lighthouse:'lighthouse',harbor:'harbor',play:'play',atelier:'atelier'}[audio.scene]||'lighthouse')));
 document.getElementById('shell-back').addEventListener('click',()=>{if(ownedDepth>0)history.back();else navigate('voyage/index.html');});
 window.addEventListener('popstate',()=>{ownedDepth=history.state?.depth||0;navigate(new URLSearchParams(location.search).get('page')||'voyage/index.html',{fromHistory:true});});
 const settings=document.getElementById('player-settings');document.getElementById('open-player-settings').addEventListener('click',()=>settings.showModal());document.getElementById('close-player-settings').addEventListener('click',()=>settings.close());
 navigate(new URLSearchParams(location.search).get('page')||'voyage/index.html',{replace:true});
})();
