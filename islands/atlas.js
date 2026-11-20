'use strict';
const groups = {products:'产品经历',stories:'故事与生活',tools:'创作与工具',observe:'观察与思考',play:'游戏与体验'};
const container = document.getElementById('catalog');
const search = document.getElementById('search');
let activeGroup = 'all';
const entries = window.ISLANDS.map(item => {
  const article = document.createElement('article');
  article.className = 'catalog-entry';
  article.dataset.island = item.id;
  const tag = document.createElement('small');
  tag.textContent = groups[item.group] + (item.parent ? ' · 掌机里的小航线' : '');
  const title = document.createElement('h2');
  title.textContent = item.name;
  const text = document.createElement('p');
  text.textContent = item.description;
  const route = document.createElement('div');
  route.className = 'entry-links';
  if (item.local) {
    const local = document.createElement('a');
    local.href = item.local;
    local.textContent = item.localAction || (item.group === 'products' ? '翻看产品记录 →' : '去小屋翻翻 →');
    route.append(local);
  }
  const link = document.createElement('a');
  link.href = item.url;
  link.textContent = item.group === 'products' ? '原站案例 ↗' : '直接前往 ↗';
  route.append(link);
  article.append(tag, title, text, route);
  container.append(article);
  return {item, article};
});
function filterCatalog() {
  const query = search.value.trim().toLocaleLowerCase('zh-CN');
  let count = 0;
  for (const {item, article} of entries) {
    const matchesGroup = activeGroup === 'all' || item.group === activeGroup;
    const searchable = `${item.name} ${item.description} ${groups[item.group]}`.toLocaleLowerCase('zh-CN');
    article.hidden = !(matchesGroup && searchable.includes(query));
    if (!article.hidden) count++;
  }
  document.getElementById('results-count').textContent = `这一页有 ${count} 个入口`;
  document.getElementById('no-results').hidden = count !== 0;
}
document.querySelectorAll('[data-group]').forEach(button => button.addEventListener('click', () => {
  activeGroup = button.dataset.group;
  document.querySelectorAll('[data-group]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  filterCatalog();
}));
search.addEventListener('input', filterCatalog);
document.querySelector('form').addEventListener('submit', event => event.preventDefault());
document.querySelector('form').addEventListener('reset', () => {
  search.value = '';
  activeGroup = 'all';
  document.querySelectorAll('[data-group]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.group === 'all')));
  filterCatalog();
  search.focus();
});
filterCatalog();

const overviewZoom=document.getElementById("overview-zoom");overviewZoom.addEventListener("click",()=>{const zoomed=document.querySelector(".overview-scroll").classList.toggle("zoomed");overviewZoom.textContent=zoomed?"看整片海":"放大海图";overviewZoom.setAttribute("aria-pressed",String(zoomed));});
