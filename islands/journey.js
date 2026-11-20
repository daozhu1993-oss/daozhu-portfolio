'use strict';
(() => {
 const script=document.currentScript,base=new URL('.',script.src);
 const routes=[['experience.html','连续乘船体验'],['island.html','港口'],['workshop/index.html','产品工坊'],['stories/index.html','故事小屋'],['observatory/index.html','灯塔观察室'],['play/index.html','游戏码头'],['atelier/index.html','旅行与创作'],['atlas.html','全部群岛'],['contact.html','联系岛主']];
 const details=document.createElement('details');details.className='journey-nav';
 const summary=document.createElement('summary');const current=routes.find(([path])=>new URL(path,base).pathname===location.pathname);summary.textContent='海图 · '+(current?.[1]||'岛主的群岛');details.append(summary);
 const nav=document.createElement('nav');nav.setAttribute('aria-label','群岛海图');
 for(const [path,name] of routes){const a=document.createElement('a');a.href=new URL(path,base);a.textContent=name;if(name===current?.[1])a.setAttribute('aria-current','page');nav.append(a);}details.append(nav);document.querySelector('header')?.after(details);
 const voyagePort=new URLSearchParams(location.search).get('voyage');
 if(['workshop','stories','lighthouse','harbor','play','atelier'].includes(voyagePort)){const back=document.createElement('a');back.href=new URL('voyage/index.html?return='+encodeURIComponent(voyagePort),base);back.textContent='← 乘小船返回海面';back.className='voyage-back';details.before(back);}
 window.islandReveal=(target,trigger=document.activeElement)=>{
  const previousY=window.scrollY;
  let back=target.querySelector('.journey-return');if(!back){back=document.createElement('button');back.className='journey-return';back.textContent='← 回到刚才的位置';target.append(back);}
  back.onclick=()=>{window.scrollTo({top:previousY,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});trigger?.focus?.({preventScroll:true});};
  target._revealMotion?.cancel();
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&target.animate){target._revealMotion=target.animate([{opacity:.4,transform:'perspective(1100px) rotateX(4deg) translateY(16px)'},{opacity:1,transform:'perspective(1100px) rotateX(0deg) translateY(0)'}],{duration:340,easing:'cubic-bezier(.22,1,.36,1)'});target._revealMotion.finished.catch(()=>{});}
  target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
 };
})();

// Failed decoration never replaces a title, link or working control.
function prepareMedia(){
 const probes=new Map();
 function fail(node){node.classList.remove('media-pending');node.classList.add('media-failed');node.textContent='插画暂未加载';}
 for(const node of document.querySelectorAll('.artifact-art,.cover-visual,.tool-picture,.letter-art')){
  const source=getComputedStyle(node).backgroundImage.match(/url\(["']?([^"')]+)["']?\)/)?.[1];if(!source)continue;
  node.classList.add('media-pending');
  if(!probes.has(source)){probes.set(source,new Promise(resolve=>{const probe=new Image();probe.onload=()=>resolve(true);probe.onerror=()=>resolve(false);probe.src=source;}));}
  probes.get(source).then(ok=>{node.classList.remove('media-pending');if(!ok)fail(node);});
 }
 for(const image of document.querySelectorAll('img')){
  const failImage=()=>{image.classList.add('image-failed');image.setAttribute('aria-label',(image.alt||'页面插画')+'暂未加载，页面入口仍然可用');};
  image.addEventListener('error',failImage);if(image.complete&&image.naturalWidth===0)failImage();
 }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',prepareMedia);else prepareMedia();

// Each content page loads the same sound engine after its own controls exist.
(()=>{if(document.getElementById('sound-toggle'))return;const base=new URL('.',document.querySelector('script[src$="journey.js"]').src),script=document.createElement('script');script.src=new URL('island-sound-ui.js',base);document.body.append(script);})();
