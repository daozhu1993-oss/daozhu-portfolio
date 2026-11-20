'use strict';
(() => {
 if(window.islandAudio||document.getElementById('sound-toggle'))return;
 const root=new URL('.',document.currentScript.src),path=location.pathname;
 const scenes=[['workshop/','workshop','工坊 · 木声与轻拨弦'],['stories/','stories','小屋 · 纸页与轻旋律'],['observatory/','lighthouse','灯塔 · 海风与远铃'],['play/','play','码头 · 轻快拨弦'],['atelier/','atelier','事务所 · 稿纸与海风'],['contact.html','contact','来信 · 安静的旋律'],['atlas.html','atlas','海图 · 海风与轻旋律']];
 const scene=scenes.find(([part])=>path.includes(part))||['island.html','harbor','港口 · 海浪与轻铃'];window.ISLAND_SOUND_SCENE=scene[1];
 const old=document.getElementById('sound');if(old){old.hidden=true;old.setAttribute('aria-pressed','false');}
 const bar=document.createElement('aside');bar.className='global-sound-bar';bar.setAttribute('aria-label','群岛声音');bar.innerHTML='<button id="sound-toggle" aria-pressed="false">声音 · 关</button><span class="sound-scene"></span><button id="open-sound-settings">音量与试听</button>';bar.querySelector('.sound-scene').textContent=scene[2];
 const dialog=document.createElement('dialog');dialog.id='global-sound-settings';dialog.setAttribute('aria-labelledby','sound-settings-title');dialog.innerHTML='<div class="sound-dialog-title"><h2 id="sound-settings-title">岛上的声音</h2><button id="close-sound-settings" aria-label="关闭声音设置">×</button></div><p class="sound-scene-description"></p><label for="volume-music">背景音乐 <output id="value-music">30%</output></label><input id="volume-music" type="range" min="0" max="100" value="30"><label for="volume-ambience">环境与动作 <output id="value-ambience">38%</output></label><input id="volume-ambience" type="range" min="0" max="100" value="38"><button id="settings-sound" aria-pressed="false">声音 · 关</button><div class="room-sound-previews"><button data-audio-preview="room">试听这个房间</button><button data-audio-preview="page">试听纸页</button></div><p id="sound-status" role="status">默认静音。主动开启后，可在当前浏览器中延续声音偏好。</p><p class="sound-policy">切到后台自动暂停。跨页后轻触页面继续；音量偏好只存在本机，不调用麦克风。</p>';
 dialog.querySelector('.sound-scene-description').textContent=scene[2];try{if(window.parent!==window&&window.parent.__ISLAND_PLAYER__)dialog.querySelector('.sound-policy').textContent='连续体验中，跨岛保持播放；切到后台自动暂停，音量只保存在本机。';}catch{}document.body.append(bar,dialog);document.body.classList.add('has-island-sound');
 bar.querySelector('#open-sound-settings').addEventListener('click',()=>dialog.showModal());dialog.querySelector('#close-sound-settings').addEventListener('click',()=>dialog.close());
 const readerTop=document.querySelector('.reader-top');if(readerTop){const mute=document.createElement('button');mute.id='reader-sound';mute.setAttribute('aria-pressed','false');mute.textContent='声音 · 关';readerTop.insertBefore(mute,readerTop.lastElementChild);}
 const script=document.createElement('script');script.src=new URL('voyage/voyage-audio.js',root);script.onload=()=>{
  document.addEventListener('click',event=>{const target=event.target.closest('button,a');if(!target||!window.islandAudio?.enabled||target.closest('#global-sound-settings,.global-sound-bar'))return;
   if(target.matches('[data-book],#prev,#next,#bookmark,#close-reader'))window.islandAudio.effect('page');
   else if(target.matches('[data-project],[data-piece],.piece'))window.islandAudio.effect('wood');
   else if(target.matches('[data-channel],#knob'))window.islandAudio.effect('dial');
   else if(target.matches('[data-game],[data-beacon],#start-beacons'))window.islandAudio.effect('button');
   else if(target.matches('[data-tool]'))window.islandAudio.effect('page');
   else if(target.id==='lamp')window.islandAudio.effect('lever');
  });
  document.addEventListener('submit',()=>window.islandAudio?.effect('page'));
  const reader=document.getElementById('reader');if(reader)new MutationObserver(()=>window.islandAudio?.phase(reader.open?'reading':'quiet')).observe(reader,{attributes:true,attributeFilter:['open']});
 };
 script.onerror=()=>{dialog.querySelector('#sound-status').textContent='声音模块暂未加载，页面内容仍可正常使用。';bar.querySelector('#sound-toggle').disabled=true;};document.body.append(script);
})();
