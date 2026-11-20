'use strict';
function voyagePoint(start,end,t){const q=Math.max(0,Math.min(1,t)),u=q*q*(3-2*q),cx=(start.x+end.x)/2,cy=(start.y+end.y)/2-8;return{x:(1-u)**2*start.x+2*(1-u)*u*cx+u*u*end.x,y:(1-u)**2*start.y+2*(1-u)*u*cy+u*u*end.y};}
if(typeof module!=='undefined')module.exports={voyagePoint};
