'use strict';
function travelNote(data){const place=String(data.get('destination')||'').trim(),days=Number(data.get('days')),raw=data.get('budget'),budget=raw===''?null:Number(raw);if(!place||!Number.isInteger(days)||days<1||days>365||(budget!==null&&(!Number.isFinite(budget)||budget<0||budget>10000000)))throw Error('请填写目的地、1—365 天的天数和有效预算。');return `旅行便笺\n目的地：${place}\n天数：${days} 天\n总预算：${budget===null?'待定':budget+' 元'}\n同行与需要：${String(data.get('needs')||'').trim()||'待补充'}\n\n规划时再确认：交通、住宿、每天的移动距离与休息时间。`;}
function storyNote(data){const values=['character','goal','obstacle','choice'].map(key=>String(data.get(key)||'').trim());if(values.some(value=>!value))throw Error('请补全主角、目标、阻碍和选择。');return `故事种子\n主角：${values[0]}\n想要：${values[1]}\n阻碍：${values[2]}\n选择：${values[3]}\n\n下一步：把这次选择写成一个具体场景。`;}
if(typeof module!=='undefined')module.exports={travelNote,storyNote};
if(typeof document!=='undefined'){
for(const [kind,build] of [['travel',travelNote],['script',storyNote]])document.getElementById(kind+'-form').addEventListener('submit',event=>{event.preventDefault();const note=document.getElementById(kind+'-note');try{note.textContent=build(new FormData(event.currentTarget));document.querySelector(`[data-copy="${kind}-note"]`).hidden=false;}catch(error){note.textContent=error.message;}note.hidden=false;});
document.querySelectorAll('[data-tool]').forEach(button=>button.addEventListener('click',()=>{const section=document.getElementById(button.dataset.tool);window.islandReveal(section,button);section.querySelector('h3').focus({preventScroll:true});}));
document.querySelectorAll('[data-copy]').forEach(button=>button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);button.textContent='已复制';}catch{button.textContent='未能复制，请长按或选中文字复制';}}));
}

if(typeof document!=='undefined')window.addEventListener('load',()=>{const target=document.getElementById(location.hash.slice(1));if(target?.classList.contains('tool-sheet'))target.scrollIntoView({block:'start'});});

if(typeof document!=='undefined'){
 for(const kind of ['travel','script']){
  const form=document.getElementById(kind+'-form'),key='daozhu-draft-v1-'+kind,fields=[...form.elements].filter(el=>el.name),note=document.getElementById(kind+'-note');
  const controls=document.createElement('div');controls.className='draft-controls';
  const status=document.createElement('p');status.className='local-note';status.setAttribute('role','status');status.textContent='草稿仅保存在这台设备的当前浏览器。';
  const clear=document.createElement('button');clear.type='button';clear.className='copy-note';clear.textContent='清空本机草稿';controls.append(status,clear);form.after(controls);
  let timer;
  function save(){clearTimeout(timer);timer=0;try{localStorage.setItem(key,JSON.stringify({version:1,fields:Object.fromEntries(fields.map(el=>[el.name,el.value]))}));status.textContent='草稿已保存在本机，可稍后回来继续。';}catch{status.textContent='浏览器未能保存草稿，请复制便笺后再离开。';}}
  try{const raw=localStorage.getItem(key);if(raw){const data=JSON.parse(raw);if(data.version!==1||!data.fields||typeof data.fields!=='object')throw Error('invalid draft');for(const el of fields){const value=data.fields[el.name];if(typeof value==='string'&&value.length<=2000)el.value=value;}status.textContent='已恢复本机草稿。';}}catch{status.textContent='本机草稿暂时无法恢复，仍可填写并复制便笺。';}
  form.addEventListener('input',()=>{note.hidden=true;document.querySelector(`[data-copy="${kind}-note"]`).hidden=true;clearTimeout(timer);timer=setTimeout(save,350);});
  clear.addEventListener('click',()=>{clearTimeout(timer);timer=0;try{localStorage.removeItem(key);}catch{status.textContent='未能清除浏览器存储，请在浏览器中管理站点数据。';return;}form.reset();note.textContent='';note.hidden=true;document.querySelector(`[data-copy="${kind}-note"]`).hidden=true;status.textContent='本机草稿已清空。';});
  window.addEventListener('pagehide',()=>{if(timer){clearTimeout(timer);save();timer=0;}});
 }
}
