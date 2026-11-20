'use strict';

const projects = {
  mobi: {
    title: '摩比魔法七巧板',
    company: '好未来 / 学而思 · 智能启蒙硬件',
    image: 'mobi-hero.webp',
    question: '孩子手里的积木，怎样和屏幕里的冒险连起来？',
    responsibility: '产品策划负责人。参与市场测算、竞品拆解、产品定义、商业与定价策略，以及版本节奏与儿童互动体验协同。',
    record: '围绕摩比魔法七巧板的启蒙场景，与 UI、产品和研发团队协作，从用户体验视角推进儿童互动游戏落地。',
    pages: [
      ['先看孩子怎样玩', '产品要同时面对手里的教具和屏幕里的任务。需要把孩子的动作、注意力和游戏节奏放在一起考虑。'],
      ['把几件东西连起来', '实体七巧板提供动手探索，学习机承接引导与反馈，互动游戏给下一次尝试一个理由。产品定义需要把这些部分组织成完整体验。'],
      ['从定义走到落地', '我的工作覆盖研究、定义、商业策略与体验协同。具体到儿童互动游戏，还需要和不同职能对齐，让玩法、内容与交互接上。']
    ]
  },
  xiaosi: {
    title: '学而思「AI 小思」',
    company: '学而思 · AI 伙伴与学习机世界观',
    image: 'xiaosi-hero.webp',
    question: 'AI 换了一个学习场景，还是孩子认识的那个伙伴吗？',
    responsibility: '创新产品策划 / IP 负责人。主导学习机世界观体系与 AI 小思 IP 从 0 到 1，建立智能体人设及应用规范。',
    record: '从角色身份、世界观到多场景应用，需要让内容和产品团队对“这个角色会怎样行动”形成可以执行的共识。',
    pages: [
      ['先回答“它是谁”', 'AI 伙伴的身份、表达习惯和与孩子的关系，需要先有稳定定义，才能在不同场景中持续展开。'],
      ['把人设变成应用规范', '世界观与人设需要落到实际使用场景。角色说什么、怎样回应，以及哪些表达适合孩子，都需要形成团队可使用的规范。'],
      ['内容，也是产品的一部分', '一个角色能否被认识和记住，来自长期一致的体验。我的工作把人物创作与智能体的产品应用连接起来。']
    ]
  },
  lele: {
    title: '乐乐趣「AI 乐乐」',
    company: '乐乐趣 AI 数字研究院 · 亲子阅读',
    image: 'lele-hero.webp',
    question: '丰富的内容资源，怎样进入一家人真实的阅读时间？',
    responsibility: '创新产品总监。主导 AI 乐乐 IP 从 0 到 1，带队进行用户研究、产品定义、策略与跨部门落地。',
    record: '围绕亲子阅读场景，连接智能体角色、内容资源与阅读课程，形成 AI 驱动的阅读课程解决方案。',
    pages: [
      ['先回到亲子共读', '孩子在意故事，家长也关心怎样陪着读。需要围绕真实的阅读场景做用户研究，再明确产品应提供什么帮助。'],
      ['把角色放进内容里', 'AI 乐乐的角色定义与阅读课程方案需要一起考虑，让内容资源能够通过具体的陪伴场景被使用。'],
      ['把方案带进协作', '从研究与定义走到落地，需要组织产品、内容和其他职能之间的协作，让不同部分服务于同一个阅读体验。']
    ]
  }
};

const shapes = [
  ['大三角·赭红', '#bd6550', 'polygon(0 0,100% 0,50% 50%)'],
  ['大三角·苔绿', '#789471', 'polygon(0 0,50% 50%,0 100%)'],
  ['中三角·金黄', '#daa953', 'polygon(50% 100%,100% 50%,100% 100%)'],
  ['小三角·海蓝', '#578b99', 'polygon(75% 25%,100% 0,100% 50%)'],
  ['正方形·陶土', '#cd895a', 'polygon(50% 50%,75% 25%,100% 50%,75% 75%)'],
  ['小三角·米黄', '#e1c17c', 'polygon(0 100%,25% 75%,50% 100%)'],
  ['平行四边形·深绿', '#4b7367', 'polygon(25% 75%,50% 50%,75% 75%,50% 100%)']
];

const state = {
  project: 'mobi',
  page: 0,
  visited: new Set(['mobi']),
  placed: new Set(),
  selected: null,
  scene: 0
};
const bench = document.getElementById('bench');
const experiment = document.getElementById('experiment');
const sound = document.getElementById('sound');
let audioContext;
let toastTimer;
let drag = null;
let ghost = null;

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}

function playNote() {
  if (sound.getAttribute('aria-pressed') !== 'true') return;
  try {
    audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.frequency.setValueAtTime(520, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(780, audioContext.currentTime + .12);
    gain.gain.setValueAtTime(.035, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .35);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .35);
  } catch {
    sound.setAttribute('aria-pressed', 'false');
    sound.textContent = '声音 · 不可用';
    showToast('当前浏览器暂时无法播放声音。');
  }
}

function writeNote() {
  const [title, text] = projects[state.project].pages[state.page];
  const note = document.getElementById('case-note');
  note.replaceChildren();
  const heading = document.createElement('h3');
  const paragraph = document.createElement('p');
  heading.textContent = title;
  paragraph.textContent = text;
  note.append(heading, paragraph);
  document.getElementById('page-number').textContent = `产品记录 · ${state.page + 1} / 3`;
  document.getElementById('previous').disabled = state.page === 0;
  document.getElementById('next').disabled = state.page === 2;
}

function pieceStyle(index) {
  return `--piece-color:${shapes[index][1]};--shape:${shapes[index][2]}`;
}

function puzzleMessage() {
  const count = state.placed.size;
  const message = document.getElementById('puzzle-message');
  message.textContent = count === 7
    ? '拼好了！七块积木连成一体，产品也需要把不同部分连起来。'
    : `已放好 ${count} / 7 块。选一块，再点木框，或直接拖进去。`;
  document.getElementById('board').setAttribute('aria-label', `拼搭木框，已放好 ${count} 块，点击放入选中的积木`);
}

function renderPuzzle() {
  experiment.innerHTML = `
    <div class="experiment-title"><b>试试这块小拼板</b><button class="text-button" id="reset-puzzle">重新拼</button></div>
    <div class="puzzle">
      <button class="board" id="board" aria-label="拼搭木框，点击放入选中的积木">
        ${shapes.map((shape, index) => `<span aria-hidden="true" class="fitted ${state.placed.has(index) ? 'placed' : ''}" data-fitted="${index}" style="${pieceStyle(index)}"></span>`).join('')}
      </button>
      <div class="pieces" aria-label="选择一块积木">
        ${shapes.map((shape, index) => `<button class="piece" data-piece="${index}" style="${pieceStyle(index)}" aria-label="${shape[0]}" aria-pressed="${state.selected === index}" ${state.placed.has(index) ? 'disabled' : ''}><span aria-hidden="true"></span></button>`).join('')}
      </div>
      <p id="puzzle-message" role="status"></p>
      <p class="experiment-hint">点击或拖动都可以。积木会自动对齐。</p>
    </div>
    <p class="experiment-disclosure">这段拼搭用于体验展示，原产品请看左侧项目资料。</p>`;
  puzzleMessage();
}

const choices = {
  xiaosi: {
    labels: ['遇到难题', '想继续试', '需要休息'],
    replies: ['我们先找一小步。哪一处是你已经知道的？', '好，我们换个办法再试一次。', '那就歇一会儿。准备好了，我们再一起往下走。']
  },
  lele: {
    labels: ['读到一半', '孩子提问', '一起收尾'],
    replies: ['先停在这幅图上。你觉得接下来会发生什么？', '这是个好问题。我们回到画里找找线索，也听听你的想法。', '今天的故事里，你最想把谁带回家？为什么？']
  }
};

function renderPartner() {
  const item = choices[state.project];
  experiment.innerHTML = `
    <div class="experiment-title"><b>换个场景，听听回应</b></div>
    <div class="partner">
      <div class="scene-choices" aria-label="选择示意场景">
        ${item.labels.map((label, index) => `<button data-scene="${index}" aria-pressed="${state.scene === index}">${label}</button>`).join('')}
      </div>
      <p class="speech" id="reply" aria-live="polite"></p>
    </div>
    <p class="experiment-disclosure">这里是为本页编写的交互示意文案，用来解释场景与角色的一致性。</p>`;
  document.getElementById('reply').textContent = item.replies[state.scene];
}

function renderProject() {
  const item = projects[state.project];
  document.getElementById('company').textContent = item.company;
  document.getElementById('case-title').textContent = item.title;
  document.getElementById('question').textContent = item.question;
  document.getElementById('responsibility').textContent = item.responsibility;
  document.getElementById('record').textContent = item.record;
  const image = document.getElementById('project-image');
  image.src = '../assets/' + item.image;
  image.alt = item.title + '产品展示';
  document.querySelector('details').open = false;
  document.querySelectorAll('[data-project]').forEach(button => {
    const active = button.dataset.project === state.project;
    button.setAttribute('aria-pressed', String(active));
    button.classList.toggle('active', active);
  });
  document.getElementById('session-progress').textContent = `已翻看 ${state.visited.size} / 3 份产品记录`;
  writeNote();
  if (state.project === 'mobi') renderPuzzle();
  else renderPartner();
}

function selectProject(key, scroll) {
  state.project = key;
  state.page = 0;
  state.scene = 0;
  state.visited.add(key);
  history.replaceState(null, '', '#' + key);
  renderProject();
  playNote();
  if (scroll) {
    window.islandReveal ? window.islandReveal(bench) : bench.scrollIntoView({behavior:'instant'});
    document.getElementById('case-title').focus({ preventScroll: true });
  }
}

function placePiece(index) {
  if (index === null || state.placed.has(index)) return;
  state.placed.add(index);
  state.selected = null;
  document.querySelector(`[data-fitted="${index}"]`).classList.add('placed');
  const piece = document.querySelector(`[data-piece="${index}"]`);
  piece.disabled = true;
  piece.setAttribute('aria-pressed', 'false');
  puzzleMessage();
  playNote();
  if (state.placed.size === 7) showToast('七块拼好了。翻到下一页，看看产品怎样连起来。');
}

function endDrag(event, canceled = false) {
  if (!drag) return;
  const { index } = drag;
  const board = document.getElementById('board').getBoundingClientRect();
  ghost?.remove();
  ghost = null;
  drag = null;
  if (!canceled && event.clientX >= board.left && event.clientX <= board.right && event.clientY >= board.top && event.clientY <= board.bottom) placePiece(index);
}

experiment.addEventListener('pointerdown', event => {
  const piece = event.target.closest('[data-piece]');
  if (!piece || piece.disabled || event.button !== 0) return;
  const index = Number(piece.dataset.piece);
  state.selected = index;
  experiment.querySelectorAll('[data-piece]').forEach(button => button.setAttribute('aria-pressed', String(button === piece)));
  drag = { index, pointerId: event.pointerId };
  piece.setPointerCapture(event.pointerId);
  ghost = document.createElement('span');
  ghost.className = 'drag-ghost';
  ghost.setAttribute('style', pieceStyle(index));
  ghost.style.left = event.clientX - 32 + 'px';
  ghost.style.top = event.clientY - 32 + 'px';
  document.body.append(ghost);
});
experiment.addEventListener('pointermove', event => {
  if (!ghost) return;
  ghost.style.left = event.clientX - 32 + 'px';
  ghost.style.top = event.clientY - 32 + 'px';
});
experiment.addEventListener('pointerup', event => endDrag(event));
experiment.addEventListener('pointercancel', event => endDrag(event, true));
experiment.addEventListener('click', event => {
  const piece = event.target.closest('[data-piece]');
  if (piece && !piece.disabled) {
    state.selected = Number(piece.dataset.piece);
    experiment.querySelectorAll('[data-piece]').forEach(button => button.setAttribute('aria-pressed', String(button === piece)));
  }
  if (event.target.closest('#board')) {
    if (state.selected === null) showToast(state.placed.size === 7 ? '已经拼好了，随时可以重新来。' : '先选一块积木，再点木框。');
    else placePiece(state.selected);
  }
  if (event.target.closest('#reset-puzzle')) {
    state.placed.clear();
    state.selected = null;
    renderPuzzle();
    document.getElementById('reset-puzzle').focus();
  }
  const scene = event.target.closest('[data-scene]');
  if (scene) {
    state.scene = Number(scene.dataset.scene);
    experiment.querySelectorAll('[data-scene]').forEach(button => button.setAttribute('aria-pressed', String(button === scene)));
    document.getElementById('reply').textContent = choices[state.project].replies[state.scene];
    playNote();
  }
});

document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => selectProject(button.dataset.project, true)));
document.getElementById('previous').addEventListener('click', () => {
  state.page = Math.max(0, state.page - 1);
  writeNote();
  playNote();
});
document.getElementById('next').addEventListener('click', () => {
  state.page = Math.min(2, state.page + 1);
  writeNote();
  playNote();
});
sound.addEventListener('click', () => {
  const on = sound.getAttribute('aria-pressed') !== 'true';
  sound.setAttribute('aria-pressed', String(on));
  sound.textContent = on ? '声音 · 开' : '声音 · 关';
  if (on) playNote();
});
document.querySelector('.room-art').addEventListener('error', () => {
  document.querySelector('.room-caption').textContent = '工坊原画暂时无法加载，可以用下面的工作台入口继续浏览。';
});
window.addEventListener('hashchange', () => {
  const key = location.hash.slice(1);
  if (Object.hasOwn(projects, key)) selectProject(key, false);
});
const initialProject = location.hash.slice(1);
if (Object.hasOwn(projects, initialProject)) state.project = initialProject;
state.visited = new Set([state.project]);
renderProject();

document.getElementById('workshop-cat').addEventListener('click', () => showToast('它把图纸压住了，免得你的好点子被风吹走。'));
