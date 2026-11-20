'use strict';
function cameraFrame(width,height,focus,zoom){const baseWidth=Math.min(width,height*1672/941),baseHeight=baseWidth*941/1672,scaledW=baseWidth*zoom,scaledH=baseHeight*zoom;const x=scaledW<=width?(width-scaledW)/2:Math.max(width-scaledW,Math.min(0,width/2-focus.x/100*scaledW)),y=scaledH<=height?(height-scaledH)/2:Math.max(height-scaledH,Math.min(0,height*.52-focus.y/100*scaledH));return{x,y,zoom,baseWidth,baseHeight};}
if(typeof module!=='undefined')module.exports={cameraFrame};
if(typeof window!=='undefined')window.createVoyageCamera=function(viewport,world,reduced){
 let mode='overview',focus={x:50,y:50},zoom=1,current={x:0,y:0,zoom:1},frame=0,last=0,width=viewport.clientWidth,height=viewport.clientHeight;
 const water=viewport.querySelector('.near-water'),cloud=viewport.querySelector('.far-clouds');
 function draw(){const size=cameraFrame(width,height,focus,zoom);world.style.width=size.baseWidth+'px';world.style.height=size.baseHeight+'px';world.style.transform=`translate3d(${current.x}px,${current.y}px,0) scale(${current.zoom})`;if(water){water.style.backgroundPosition=`${current.x*1.15}px ${current.y*.3}px`;water.style.transform=`translate3d(${current.x*.06}px,0,0)`;}if(cloud)cloud.style.transform=`translate3d(${-focus.x*.1}px,0,0)`;viewport.dataset.camera=mode;document.getElementById('fit').textContent=mode==='overview'?'跟船近看':'返回全景';}
 function tick(time){const target=cameraFrame(width,height,focus,zoom),dt=last?Math.min(time-last,50):16;last=time;const factor=reduced.matches?1:1-Math.exp(-dt/230);for(const key of ['x','y','zoom'])current[key]+=(target[key]-current[key])*factor;draw();if(Math.abs(current.x-target.x)+Math.abs(current.y-target.y)+Math.abs(current.zoom-target.zoom)*100>.08)frame=requestAnimationFrame(tick);else{current=target;draw();frame=0;last=0;}}
 function update(){if(!frame)frame=requestAnimationFrame(tick);}
 function set(nextMode,nextFocus){mode=nextMode;viewport.dataset.camera=mode;focus={...nextFocus};zoom=mode==='overview'?1:matchMedia('(max-width:700px)').matches?3.35:2.6;update();}
 new ResizeObserver(()=>{width=viewport.clientWidth;height=viewport.clientHeight;if(mode!=='overview')zoom=matchMedia('(max-width:700px)').matches?3.35:2.6;update();}).observe(viewport);
 reduced.addEventListener('change',update);
 return{overview(){set('overview',{x:50,y:50});},follow(point){set('follow',point);},track(point){if(mode==='follow'){focus={...point};update();}},dock(point){set('dock',point);},get mode(){return mode;}};
};
