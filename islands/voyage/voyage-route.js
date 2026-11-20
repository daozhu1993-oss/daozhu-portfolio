'use strict';
// Sea lanes sit between painted islands; ports join the nearest clear corridor.
const seaNodes={a:{x:33,y:49},b:{x:46,y:49},c:{x:66,y:49},d:{x:33,y:94},e:{x:66,y:94},lighthouse:{x:31,y:43},workshop:{x:46,y:46},stories:{x:70,y:43},harbor:{x:29,y:88},play:{x:57,y:91},atelier:{x:74,y:89}};
const seaEdges=[['a','b'],['b','c'],['a','d'],['c','e'],['d','e'],['a','lighthouse'],['b','workshop'],['c','stories'],['d','harbor'],['e','play'],['e','atelier']];
function seaDistance(a,b){return Math.hypot(a.x-b.x,a.y-b.y);}
function projectOnLane(point,a,b){const dx=b.x-a.x,dy=b.y-a.y,t=Math.max(0,Math.min(1,((point.x-a.x)*dx+(point.y-a.y)*dy)/(dx*dx+dy*dy)));return{x:a.x+t*dx,y:a.y+t*dy};}
function planSeaRoute(point,port){
 if(!Object.hasOwn(seaNodes,port)||!Number.isFinite(point.x)||!Number.isFinite(point.y))throw Error('Invalid sea route');
 let nearest;for(const [a,b] of seaEdges){const projected=projectOnLane(point,seaNodes[a],seaNodes[b]),distance=seaDistance(point,projected);if(!nearest||distance<nearest.distance)nearest={a,b,projected,distance};}
 const nodes={...seaNodes,start:{...point},join:nearest.projected},edges=[...seaEdges,['start','join'],['join',nearest.a],['join',nearest.b]];
 const costs={start:0},previous={},pending=new Set(Object.keys(nodes));
 while(pending.size){const current=[...pending].reduce((a,b)=>(costs[a]??Infinity)<(costs[b]??Infinity)?a:b);if(!Number.isFinite(costs[current]))break;pending.delete(current);if(current===port)break;for(const [a,b] of edges){const next=a===current?b:b===current?a:null;if(!next||!pending.has(next))continue;const cost=costs[current]+seaDistance(nodes[current],nodes[next]);if(cost<(costs[next]??Infinity)){costs[next]=cost;previous[next]=current;}}}
 const path=[];for(let key=port;key;key=previous[key])path.unshift({...nodes[key]});return path.filter((p,i)=>i===0||seaDistance(p,path[i-1])>.0001);
}
function pointOnSeaRoute(path,t){if(path.length<2)return {...path[0]};const lengths=path.slice(1).map((p,i)=>seaDistance(path[i],p)),total=lengths.reduce((a,b)=>a+b,0);let remaining=Math.max(0,Math.min(1,t))*total;for(let i=0;i<lengths.length;i++){if(remaining<=lengths[i]||i===lengths.length-1){const q=lengths[i]?remaining/lengths[i]:0;return{x:path[i].x+(path[i+1].x-path[i].x)*q,y:path[i].y+(path[i+1].y-path[i].y)*q};}remaining-=lengths[i];}return {...path[path.length-1]};}
if(typeof module!=='undefined')module.exports={seaNodes,seaEdges,planSeaRoute,pointOnSeaRoute,seaDistance};
