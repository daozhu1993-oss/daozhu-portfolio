/**
 * 数字群岛 · 岛主个人门户 - 核心交互与全矩阵聚合 (main.js)
 * Master Interaction & Dynamic Renderer
 */

(function () {
  'use strict';

  // 1. 暗黑模式管理 (Dark / Light Theme Toggle)
  const ThemeManager = {
    STORAGE_KEY: 'daozhu_portfolio_theme',

    init() {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      this.setTheme(isDark ? 'dark' : 'light');

      const toggles = document.querySelectorAll('.theme-toggle-btn');
      toggles.forEach(btn => {
        btn.addEventListener('click', () => {
          const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
          const next = current === 'dark' ? 'light' : 'dark';
          this.setTheme(next);
        });
      });
    },

    setTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem(this.STORAGE_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(this.STORAGE_KEY, 'light');
      }
      this.updateToggleUI(theme === 'dark');
    },

    updateToggleUI(isDark) {
      const sunIcons = document.querySelectorAll('.theme-sun-icon');
      const moonIcons = document.querySelectorAll('.theme-moon-icon');
      const labelTexts = document.querySelectorAll('.theme-label-text');

      sunIcons.forEach(el => el.style.display = isDark ? 'none' : 'block');
      moonIcons.forEach(el => el.style.display = isDark ? 'block' : 'none');
      labelTexts.forEach(el => el.innerText = isDark ? 'Night' : 'Day');
    }
  };

  // 2. 动态渲染 Bento Grid (群岛卫星矩阵 - 依据各岛灵魂调性定制封面与微交互)
  function renderBentoGrid() {
    const grid = document.getElementById('ecosystem-bento-grid');
    if (!grid || !window.DAOZHU_DATA) return;

    const satellites = window.DAOZHU_DATA.satellites;
    grid.innerHTML = '';

    satellites.forEach(item => {
      const card = document.createElement('article');
      card.className = `bento-card col-${item.colSpan}`;

      const imgHtml = item.image ? `<img src="${item.image}" alt="${item.name}" class="bento-media-img" loading="lazy">` : '';

      const mediaContent = `
        <div class="bento-media-wrap ${item.aspect}">
          ${imgHtml}
          <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,14,23,0.35) 0%, rgba(10,14,23,0.1) 40%, rgba(10,14,23,0.85) 100%); z-index: 5;"></div>
          <div style="position: absolute; inset: 0; padding: 20px 22px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span class="pill-badge" style="background: rgba(0,0,0,0.65); backdrop-filter: blur(8px); color: #ded2ba; border-color: rgba(255,255,255,0.2);">${item.topPill}</span>
              <span class="font-mono" style="font-size: 0.74rem; color: #ded2ba; font-weight: 600; text-shadow: 0 1px 4px rgba(0,0,0,0.8);">${item.topStatus}</span>
            </div>
            <div>
              <div style="font-family: var(--font-serif); font-size: ${item.colSpan === 8 ? '1.5rem' : '1.25rem'}; font-weight: 700; color: #FFFFFF; line-height: 1.35; text-shadow: 0 2px 10px rgba(0,0,0,0.85);">
                ${item.overlayTitle}
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.76rem; color: #e4dccb; margin-top: 6px; text-shadow: 0 1px 6px rgba(0,0,0,0.9);">
                ${item.overlaySubtitle}
              </div>
              ${item.highlights && item.colSpan === 8 ? `
                <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
                  ${item.highlights.map(h => `<span class="pill-badge" style="background: rgba(0,0,0,0.55); backdrop-filter: blur(6px); color: #ded2ba; font-size: 0.68rem; border-color: rgba(255,255,255,0.25);">${h}</span>`).join('')}
                </div>
              ` : ''}
            </div>
          </div>
          <div class="center-hover-action">
            <div class="center-hover-circle">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
          </div>
        </div>
      `;

      card.innerHTML = `
        ${mediaContent}
        <div class="hover-arrow-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
        <div class="bento-content">
          <div class="bento-tags">
            ${item.tags.map(t => `<span class="pill-badge">${t}</span>`).join('')}
          </div>
          <h3 class="bento-title">${item.name}</h3>
          <p class="bento-desc">${item.desc}</p>
          <div class="bento-link-action">
            <span>${item.ctaText}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
        <a href="${item.link}" ${item.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''} style="position: absolute; inset: 0; z-index: 30;">
          <span style="display: none;">${item.name}</span>
        </a>
      `;

      grid.appendChild(card);
    });
  }

  // 3. 动态渲染履历主线与迷你里程碑
  function renderMilestones() {
    const container = document.getElementById('milestones-grid');
    if (!container || !window.DAOZHU_DATA) return;

    const milestones = window.DAOZHU_DATA.milestones;
    container.innerHTML = '';

    milestones.forEach(m => {
      const card = document.createElement('div');
      card.className = 'milestone-card';
      card.innerHTML = `
        <div class="milestone-num">${m.step}</div>
        <div class="milestone-body">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
            <span class="pill-badge font-mono" style="font-size: 0.72rem;">${m.period}</span>
            <span style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--text-muted);">${m.org}</span>
          </div>
          <h3>${m.title}</h3>
          <div class="milestone-sub">${m.sub}</div>
          <p>${m.desc}</p>
          <div class="milestone-tags" style="display: flex; flex-wrap: wrap; gap: 6px; margin-top: 14px;">
            ${m.tags.map(t => `<span class="pill-badge" style="font-size: 0.7rem;">${t}</span>`).join('')}
          </div>
        </div>
      `;
      container.appendChild(card);
    });

    const miniContainer = document.getElementById('mini-milestones-grid');
    const mini = window.DAOZHU_DATA.miniMilestones || [];
    if (miniContainer && mini.length) {
      miniContainer.innerHTML = '';
      mini.forEach(item => {
        const el = document.createElement('div');
        el.className = 'mini-milestone-item';
        el.innerHTML = `
          <div style="font-family: var(--font-mono); font-size: 0.8rem; font-weight: 700; color: var(--brand-primary); margin-bottom: 4px;">
            ${item.period} · ${item.org}
          </div>
          <div style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.6;">
            ${item.desc}
          </div>
        `;
        miniContainer.appendChild(el);
      });
    }
  }

  // 4. 动态渲染代表作品 (Selected Works)
  function renderWorksGrid() {
    const grid = document.getElementById('works-grid');
    if (!grid || !window.DAOZHU_DATA) return;

    const works = window.DAOZHU_DATA.works;
    grid.innerHTML = '';

    works.forEach(w => {
      const card = document.createElement('article');
      card.className = 'work-card clickable';
      if (w.directUrl) {
        card.setAttribute('data-direct-url', w.directUrl);
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        card.addEventListener('click', () => {
          window.open(w.directUrl, '_blank', 'noopener,noreferrer');
        });
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(w.directUrl, '_blank', 'noopener,noreferrer');
          }
        });
      } else {
        card.setAttribute('data-open-modal', w.modalId);
      }

      let mediaHtml = '';
      if (w.image) {
        mediaHtml = `<img src="${w.image}" alt="${w.title}">`;
      } else {
        mediaHtml = `
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-card) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; border: 1px dashed var(--border-line);">
            <div style="font-size: 2.4rem; margin-bottom: 8px;">🎬</div>
            <div style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: var(--text-primary); text-align: center; line-height: 1.35;">${w.title}</div>
            <div style="font-family: var(--font-mono); font-size: 0.76rem; color: var(--brand-primary); margin-top: 8px; font-weight: 600;">全流程 4K AIGC · 纸工艺拼贴美学</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="work-company-badge">${w.tag}</div>
        <div class="work-media">
          ${mediaHtml}
        </div>
        <div class="work-tags">
          ${w.badges ? w.badges.map(b => `<span class="pill-badge">${b}</span>`).join('') : ''}
        </div>
        <h3 class="work-title"><span style="color: var(--brand-primary); margin-right: 6px;">${w.num}</span>${w.title}</h3>
        <div class="work-role">${w.role}</div>
        <p class="work-desc">${w.desc}</p>
      `;
      grid.appendChild(card);
    });
  }

  // 5. 动态渲染 AI 小项目
  function renderProjectsGrid() {
    const grid = document.getElementById('projects-grid');
    if (!grid || !window.DAOZHU_DATA || !window.DAOZHU_DATA.projects) return;

    const projects = window.DAOZHU_DATA.projects;
    grid.innerHTML = '';

    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = `project-card ${p.status === 'soon' ? 'soon' : ''}`;
      const actionHtml = p.url
        ? `<a class="project-go" href="${p.url}" target="_blank" rel="noopener noreferrer">${p.status === 'work' ? '看专题页 →' : p.status === 'oss' ? 'GitHub 仓库 →' : '打开体验 →'}</a>`
        : `<span class="project-go" style="color: var(--text-muted); cursor: default;">即将上线</span>`;

      card.innerHTML = `
        <div class="project-tag">${p.tag}</div>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.desc}</p>
        ${actionHtml}
      `;
      grid.appendChild(card);
    });
  }

  // 6. 动态渲染思维模型图鉴网关与精选模型预览
  function renderModelsGateway() {
    const container = document.getElementById('models-gateway-wrap');
    if (!container || !window.DAOZHU_DATA || !window.DAOZHU_DATA.models) return;

    const m = window.DAOZHU_DATA.models;
    const featured = m.featured || [];

    container.innerHTML = `
      <div class="gateway-box reveal">
        <div>
          <div class="gateway-big">${m.count}</div>
          <div class="gateway-text">${m.desc}</div>
        </div>
        <a class="btn btn-primary" href="${m.url}" target="_blank" rel="noopener noreferrer">
          <span>翻翻思维模型图鉴 →</span>
        </a>
      </div>

      ${featured.length ? `
        <div class="preview-block-header reveal delay-1" style="margin-top: 32px; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <h3 class="font-serif" style="font-size: 1.28rem; font-weight: 700; color: var(--text-primary); margin: 0;">
            精选单页笔记预览 · 一眼看懂模型本质
          </h3>
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">
            商业 · 决策 · 沟通 · 认知
          </span>
        </div>
        <div class="models-preview-grid reveal delay-1">
          ${featured.map(item => `
            <a class="model-preview-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
              <div class="model-preview-header">
                <span class="model-preview-idx">${item.num}</span>
                <span class="model-preview-cat">${item.cat}</span>
              </div>
              <h3 class="model-preview-title">${item.title}</h3>
              <div class="model-preview-en">${item.en}</div>
              <p class="model-preview-desc">${item.desc}</p>
              <span class="model-preview-go">翻开单页笔记 ↗</span>
            </a>
          `).join('')}
        </div>
      ` : ''}
    `;
  }

  // 7. 动态渲染思考手记、精选长文与追问矩阵
  function renderFieldNotes() {
    const container = document.getElementById('notes-content-wrap');
    if (!container || !window.DAOZHU_DATA || !window.DAOZHU_DATA.notes) return;

    const n = window.DAOZHU_DATA.notes;
    const featured = n.featured || [];

    container.innerHTML = `
      <div class="gateway-box reveal" style="margin-bottom: 24px;">
        <div class="gateway-text" style="max-width: 720px; font-size: 1.05rem; margin-top: 0;">
          ${n.desc}
        </div>
        <a class="btn btn-primary" href="${n.url}" target="_blank" rel="noopener noreferrer">
          <span>读岛主的 AI 思考 →</span>
        </a>
      </div>

      ${featured.length ? `
        <div class="preview-block-header reveal delay-1" style="margin-top: 32px; display: flex; align-items: baseline; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
          <h3 class="font-serif" style="font-size: 1.28rem; font-weight: 700; color: var(--text-primary); margin: 0;">
            代表长文手记预览 · 一手复盘与判断
          </h3>
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--text-muted);">
            7 阶段演进 · 68 篇持续更新
          </span>
        </div>
        <div class="notes-preview-grid reveal delay-1">
          ${featured.map(item => `
            <a class="note-preview-card" href="${item.url}" target="_blank" rel="noopener noreferrer">
              <div class="note-preview-header">
                <span class="note-preview-num">${item.num}</span>
                <span class="note-preview-stage">${item.stage}</span>
              </div>
              <h3 class="note-preview-title">${item.title}</h3>
              <p class="note-preview-desc">${item.desc}</p>
              <span class="note-preview-go">阅读长文手记 ↗</span>
            </a>
          `).join('')}
        </div>
      ` : ''}

      <h3 class="font-serif reveal" style="font-size: 1.25rem; margin-top: 36px; margin-bottom: 14px; color: var(--text-primary);">
        我一直在追问这些问题：
      </h3>
      <div class="qgrid reveal delay-2">
        ${n.questions.map(q => `<div class="qitem">${q}</div>`).join('')}
      </div>
    `;
  }

  // 8. 动态渲染独立街机
  function renderGamesGrid() {
    const grid = document.getElementById('games-grid');
    if (!grid || !window.DAOZHU_DATA || !window.DAOZHU_DATA.games) return;

    const games = window.DAOZHU_DATA.games;
    grid.innerHTML = '';

    games.forEach(g => {
      const card = document.createElement('article');
      card.className = 'game-card';

      let gameMediaHtml = '';
      if (g.image) {
        gameMediaHtml = `<img src="${g.image}" alt="${g.title}">`;
      } else {
        gameMediaHtml = `
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-card) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 18px; border: 1px dashed var(--border-line);">
            <div style="font-size: 2rem; margin-bottom: 6px;">🎭</div>
            <div style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700; color: var(--text-primary); text-align: center;">${g.title}</div>
          </div>
        `;
      }

      card.innerHTML = `
        <div class="game-media">
          ${gameMediaHtml}
          <div style="position: absolute; top: 10px; left: 10px;">
            <span class="pill-badge" style="background: rgba(0,0,0,0.65); color: #fff; border-color: rgba(255,255,255,0.2); font-size: 0.68rem;">${g.tag}</span>
          </div>
        </div>
        <h3 class="game-title">${g.title}</h3>
        <div class="game-subtitle">${g.subtitle}</div>
        <p class="game-desc">${g.desc}</p>
        <div class="game-link">
          <span>进入游戏体验</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <a href="${g.url}" target="_blank" rel="noopener noreferrer" style="position: absolute; inset: 0; z-index: 20;">
          <span style="display: none;">${g.title}</span>
        </a>
      `;
      grid.appendChild(card);
    });
  }

  // 9. 动态渲染换了身份不换主线
  function renderClosing() {
    const container = document.getElementById('closing-steps-wrap');
    if (!container || !window.DAOZHU_DATA || !window.DAOZHU_DATA.closing) return;

    const steps = window.DAOZHU_DATA.closing;
    container.innerHTML = steps.map(s => `
      <div class="closing-step reveal">
        <div class="step-num">${s.step}</div>
        <div>
          <h4>${s.title}</h4>
          <p>${s.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 10. 模态弹窗管理 (All Modals)
  function initModals() {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-modal]');
      if (!trigger) return;
      e.preventDefault();

      const modalId = trigger.getAttribute('data-open-modal');
      const targetModal = document.getElementById(modalId) || (modalId === 'coffee' ? document.getElementById('coffee-modal') : null);
      if (targetModal) {
        targetModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    document.addEventListener('click', (e) => {
      const closeBtn = e.target.closest('.modal-close-btn, .mclose');
      if (!closeBtn) return;
      e.preventDefault();
      const modal = closeBtn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.open').forEach(m => {
          m.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
    });

    const copyWechatBtn = document.getElementById('copy-wechat-btn');
    if (copyWechatBtn) {
      copyWechatBtn.addEventListener('click', () => {
        const wechat = "bl-free";
        navigator.clipboard.writeText(wechat).then(() => {
          const orig = copyWechatBtn.innerText;
          copyWechatBtn.innerText = "已复制 ✓";
          setTimeout(() => { copyWechatBtn.innerText = orig; }, 2000);
        });
      });
    }

    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = "daozhu1993@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
          const orig = copyEmailBtn.innerText;
          copyEmailBtn.innerText = "已复制到剪贴板 ✓";
          setTimeout(() => { copyEmailBtn.innerText = orig; }, 2000);
        });
      });
    }
  }

  // 11. 戏剧节拍实时波形发生器 (Story Tension Wave Generator)
  function initStoryWave() {
    const path = document.getElementById('story-wave-path');
    const area = document.getElementById('story-wave-area');
    if (!path || !area) return;

    let step = 0;
    const pointsCount = 30;
    const width = 500;
    const height = 130;

    function generateWave() {
      step += 0.04;
      const points = [];
      for (let i = 0; i <= pointsCount; i++) {
        const x = (width / pointsCount) * i;
        const progress = i / pointsCount;
        const baseArch = Math.sin(progress * Math.PI) * 45;
        const wave1 = Math.sin(progress * 10 + step) * 14;
        const wave2 = Math.cos(progress * 6 - step * 1.5) * 8;
        const y = height - (35 + baseArch + wave1 + wave2);
        points.push({ x, y });
      }

      let d = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const midX = (prev.x + curr.x) / 2;
        const midY = (prev.y + curr.y) / 2;
        d += ` Q ${prev.x} ${prev.y}, ${midX} ${midY}`;
      }
      const last = points[points.length - 1];
      d += ` L ${last.x} ${last.y}`;

      path.setAttribute('d', d);
      const areaD = d + ` L ${width} ${height} L 0 ${height} Z`;
      area.setAttribute('d', areaD);

      requestAnimationFrame(generateWave);
    }

    generateWave();
  }

  // 12. 右侧旅程航标指示器 (Journey Navigation Active Tracker)
  function initJourneyNav() {
    const dots = document.querySelectorAll('.journey-dot');
    const sections = [];

    dots.forEach(dot => {
      const targetId = dot.getAttribute('data-target');
      const section = document.getElementById(targetId);
      if (section) {
        sections.push({ dot, section });
      }

      dot.addEventListener('click', () => {
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      let currentActive = null;
      sections.forEach(({ dot, section }) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentActive = dot;
        }
      });

      dots.forEach(dot => dot.classList.remove('active'));
      if (currentActive) {
        currentActive.classList.add('active');
      } else if (dots.length > 0 && window.scrollY < 200) {
        dots[0].classList.add('active');
      }
    }, { passive: true });
  }

  // 13. 滚动进入视口渐入动画
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.08
    });

    reveals.forEach(el => observer.observe(el));
  }

  // 14. 页面初始化
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    renderBentoGrid();
    renderMilestones();
    renderWorksGrid();
    renderProjectsGrid();
    renderModelsGateway();
    renderFieldNotes();
    renderGamesGrid();
    renderClosing();
    initModals();
    initStoryWave();
    initJourneyNav();
    initScrollReveal();
  });
})();
