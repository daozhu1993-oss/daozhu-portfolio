'use strict';
function voyageEase(t){const q=Math.max(0,Math.min(1,t));return q*q*(3-2*q);}
function voyageLean(a,b,previous){if(Math.hypot(b.x-a.x,b.y-a.y)<.00001)return{bearing:previous??0,roll:0};const raw=Math.atan2((b.y-a.y)*941/1672,b.x-a.x)*180/Math.PI;const start=previous??raw,delta=((raw-start+540)%360)-180;return{bearing:start+delta*.22,roll:Math.max(-8,Math.min(8,delta*.16))};}
if(typeof module!=='undefined')module.exports={voyageEase,voyageLean};
