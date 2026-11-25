'use strict';
const shelf = document.getElementById('shelf');
const reader = document.getElementById('reader');
const bookmark = document.getElementById('bookmark');
const visited = new Set();
const bookmarks = new Set();
let currentBook = null;
let page = 0;
let lastTrigger = null;
let toastTimer;

const coverDesigns = {
  myth: { lines: ['神话'], image: 'collection-covers-02.webp', crop: '', tile:'66.666667% 100%', tileSize:'400% 200%' },
  storybook: { lines: ['一一与芽芽兽'], image: 'collection-covers-02.webp', crop: '', tile:'100% 100%', tileSize:'400% 200%' },
  journal: { lines: ['岛主的', 'AI 思考'], image: 'collection-covers-02.webp', crop: '', tile:'66.666667% 0%', tileSize:'400% 200%' },
  me: { lines: ['小岛手记'], image: 'collection-covers.webp', crop: '', tile:'100% 100%' },
  models: { lines: ['思维模型', '图鉴'], image: 'collection-covers-02.webp', crop: '', tile:'100% 0%', tileSize:'400% 200%' },
  fengwu: { lines: ['风物中国'], image: 'collection-covers.webp', crop: '', tile:'0% 0%' }
};
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let readerAnimation;
let pageAnimation;
let motionVersion = 0;
let closing = false;
let readerScrollY = 0;
const warmedBooks = new Set();

function warmBook(id) {
  const book = window.BOOKS.find(item => item.id === id);
  if (!book?.image || warmedBooks.has(id)) return;
  warmedBooks.add(id);
  const image = new Image();
  image.src = "../assets/" + book.image;
  image.decode?.().catch(() => {});
}

for (const book of window.BOOKS) {
  const design = coverDesigns[book.id];
  const button = document.createElement('button');
  button.className = 'spine ' + book.color;
  button.dataset.book = book.id;
  button.setAttribute('aria-label', '抽出' + book.title);
  const object = document.createElement('span');
  object.className = 'book-object';
  const pages = document.createElement('span');
  pages.className = 'book-pages';
  pages.setAttribute('aria-hidden', 'true');
  const face = document.createElement('span');
  face.className = 'book-face';
  const visual = document.createElement('span');
  visual.className = 'cover-visual ' + design.crop;
  if(design.tile){
    visual.style.backgroundImage='url(../assets/'+design.image+')';
    visual.style.backgroundSize=design.tileSize||'300% 300%';
    visual.style.backgroundPosition=design.tile;
    visual.setAttribute('aria-hidden','true');
  } else {
    const image=document.createElement('img');
    image.src='../assets/'+design.image;image.alt='';image.loading='lazy';image.decoding='async';image.className='cover-art';
    visual.append(image);
  }
  const type = document.createElement('span');
  type.className = 'cover-type';
  const title = document.createElement('b');
  for (const line of design.lines) {
    const text = document.createElement('span');
    text.textContent = line;
    title.append(text);
  }
  const author = document.createElement('small');
  author.textContent = '岛主 · 王仙客';
  type.append(title, author);
  face.append(visual, type);
  const ribbon = document.createElement('span');
  ribbon.className = 'ribbon';
  ribbon.setAttribute('aria-hidden', 'true');
  object.append(pages, face, ribbon);
  const caption = document.createElement('span');
  caption.className = 'book-caption';
  caption.textContent = book.subtitle;
  button.append(object, caption);
  shelf.append(button);
}

function animateReader(opening) {
  readerAnimation?.cancel();
  if (reducedMotion.matches || !reader.animate) return null;
  const rect = reader.getBoundingClientRect();
  const source = lastTrigger?.getBoundingClientRect();
  const sourceVisible = source && source.bottom > 0 && source.top < innerHeight;
  const x = sourceVisible ? Math.max(-180, Math.min(180, source.left + source.width / 2 - rect.left - rect.width / 2)) : 0;
  const y = sourceVisible ? Math.max(-100, Math.min(100, source.top + source.height / 2 - rect.top - rect.height / 2)) : 20;
  const origin = { transform: `translate(${x}px, ${y}px) scale(.88) rotate(-1deg)`, opacity: 0 };
  const destination = { transform: 'translate(0, 0) scale(1) rotate(0)', opacity: 1 };
  readerAnimation = reader.animate(opening ? [origin, destination] : [destination, origin], {
    duration: opening ? 320 : 190,
    easing: 'cubic-bezier(.22, 1, .36, 1)'
  });
  readerAnimation.finished.catch(() => {});
  return readerAnimation;
}

async function closeReader() {
  if (!reader.open || closing) return;
  closing = true;
  const version = ++motionVersion;
  const animation = animateReader(false);
  if (animation) {
    try { await animation.finished; } catch { return; }
  }
  if (version !== motionVersion) return;
  reader.close();
  closing = false;
}

function renderPage(direction = 0) {
  pageAnimation?.cancel();
  const item = currentBook.pages[page];
  const area = document.getElementById('book-page');
  area.replaceChildren();
  const title = document.createElement('h3');
  title.textContent = item.title;
  const text = document.createElement('p');
  text.textContent = item.text;
  area.append(title);
  if (item.spread) {
    const spread = document.createElement('img');
    spread.className = 'sample-spread';
    spread.src = item.spread;
    spread.alt = item.text;
    area.append(spread);
  } else {
    area.append(text);
  }
  if (item.url) {
    const link = document.createElement('a');
    link.href = item.url;
    link.textContent = item.linkText + ' ↗';
    area.append(link);
  }
  document.getElementById('page-count').textContent = `${page + 1} / ${currentBook.pages.length}`;
  document.getElementById('prev').disabled = page === 0;
  document.getElementById('next').disabled = page === currentBook.pages.length - 1;
  if (direction && !reducedMotion.matches && area.animate) {
    pageAnimation = area.animate([
      { opacity: .25, transform: `translateX(${direction * 14}px) rotateY(${direction * -8}deg)` },
      { opacity: 1, transform: 'translateX(0) rotateY(0)' }
    ], { duration: 230, easing: 'cubic-bezier(.22,1,.36,1)' });
  }
}

function renderBookmark() {
  const marked = bookmarks.has(currentBook.id);
  bookmark.setAttribute('aria-pressed', String(marked));
  bookmark.textContent = marked ? '取下书签' : '夹上书签';
  document.getElementById('bookmark-status').textContent = marked ? '这次逛小屋时，这本书会留着书签。' : '';
  shelf.querySelector(`[data-book="${currentBook.id}"]`).classList.toggle('bookmarked', marked);
}

function openBook(id, trigger) {
  const book = window.BOOKS.find(item => item.id === id);
  if (!book) return;
  if (!reader.open) readerScrollY = window.scrollY;
  motionVersion++;
  closing = false;
  readerAnimation?.cancel();
  lastTrigger = trigger || null;
  currentBook = book;
  reader.classList.toggle("picturebook-reader", id === "storybook");
  page = 0;
  visited.add(id);
  history.replaceState(null, '', '#' + id);
  document.getElementById('read-count').textContent = `这次已翻看 ${visited.size} / ${window.BOOKS.length} 本`;
  document.getElementById('book-title').textContent = book.title;
  document.getElementById('book-subtitle').textContent = book.subtitle;
  document.getElementById('book-description').textContent = book.description;
  const image=document.getElementById('book-image');image.hidden=true;
  let illustration=document.getElementById('reader-illustration');
  if(!illustration){illustration=document.createElement('div');illustration.id='reader-illustration';illustration.className='reader-illustration';illustration.setAttribute('role','img');image.after(illustration);}
  const design=coverDesigns[id];illustration.style.backgroundImage='url(../assets/'+design.image+')';illustration.style.backgroundSize=design.tileSize||'300% 300%';illustration.style.backgroundPosition=design.tile;illustration.setAttribute('aria-label',book.title+'主题插画');
  const link = document.getElementById('book-link');
  link.href = book.url;
  link.textContent = book.action + ' ↗';
  renderPage();
  renderBookmark();
  if (!reader.open) reader.showModal();
  document.body.classList.add('reader-open');
  animateReader(true);
}

document.querySelectorAll('[data-book]').forEach(button => {
  button.addEventListener('click', () => openBook(button.dataset.book, button));
  button.addEventListener('pointerenter', () => warmBook(button.dataset.book), { passive: true });
  button.addEventListener('focus', () => warmBook(button.dataset.book));
});
document.getElementById('prev').addEventListener('click', () => { page = Math.max(0, page - 1); renderPage(-1); });
document.getElementById('next').addEventListener('click', () => { page = Math.min(currentBook.pages.length - 1, page + 1); renderPage(1); });
bookmark.addEventListener('click', () => {
  if (bookmarks.has(currentBook.id)) bookmarks.delete(currentBook.id);
  else bookmarks.add(currentBook.id);
  renderBookmark();
});
document.getElementById('close-reader').addEventListener('click', closeReader);
reader.addEventListener('cancel', event => { event.preventDefault(); closeReader(); });
reader.addEventListener('close', () => {
  motionVersion++;
  closing = false;
  readerAnimation?.cancel();
  pageAnimation?.cancel();
  document.body.classList.remove('reader-open');
  history.replaceState(null, '', location.pathname + location.search);
  lastTrigger?.focus({preventScroll:true});
  window.scrollTo({ top: readerScrollY, behavior: 'instant' });
});
reader.addEventListener('click', event => {
  if (event.target !== reader) return;
  const box = reader.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) closeReader();
});
document.getElementById('room-cat').addEventListener('click', () => {
  const toast = document.getElementById('toast');
  toast.textContent = '猫把尾巴收了收，给你腾出一点读书的位置。';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
});
document.getElementById('room-art').addEventListener('error', () => {
  document.getElementById('room-hint').textContent = '小屋原画暂时没加载出来，下面的书架仍然可以打开。';
});
window.addEventListener('hashchange', () => {
  const id = location.hash.slice(1);
  if (id) openBook(id);
  else if (reader.open) closeReader();
});
const initialBook = location.hash.slice(1);
if (initialBook) openBook(initialBook);

if(new URLSearchParams(location.search).get('view')==='collection')window.addEventListener('load',()=>document.querySelector('.shelf-section').scrollIntoView({block:'start'}));
