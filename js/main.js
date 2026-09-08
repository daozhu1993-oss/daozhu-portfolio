/**
 * 数字群岛 · 岛主个人门户 - 核心交互与多矩阵聚合 (main.js)
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

  // 2. 动态渲染 Bento Grid (群岛五大卫星矩阵，带真实视觉图片)
  function renderBentoGrid() {
    const grid = document.getElementById('ecosystem-bento-grid');
    if (!grid || !window.DAOZHU_DATA) return;

    const satellites = window.DAOZHU_DATA.satellites;
    grid.innerHTML = '';

    satellites.forEach(item => {
      const card = document.createElement('article');
      card.className = `bento-card col-${item.colSpan}`;

      let mediaContent = '';
      if (item.type === 'script') {
        mediaContent = `
          <div class="bento-media-wrap aspect-widescreen">
            <img src="${item.image}" alt="${item.name}" class="bento-media-img" onerror="this.style.display='none'">
            <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(10,14,23,0.3) 0%, rgba(10,14,23,0.85) 100%);"></div>
            <div style="position: absolute; inset: 0; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="pill-badge" style="background: rgba(180,90,60,0.4); color: #f4a261; border-color: rgba(244,162,97,0.5);">🎬 SCRIPT CRAFT</span>
                <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #ded2ba;">破亿播放 · 行业标杆</span>
              </div>
              <div>
                <div style="font-family: var(--font-mono); font-size: 0.8rem; color: #f28c70; margin-bottom: 4px;">[SCENE 01 · 黄金 3 秒留存定律]</div>
                <div style="font-family: var(--font-serif); font-size: 1.35rem; font-weight: 700; color: #FFFFFF; line-height: 1.35;">
                  “从好莱坞救猫咪公式，到短剧每集 90 秒爽点反转与 AI 漫剧分镜”
                </div>
              </div>
              <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                ${item.highlights.map(h => `<span class="pill-badge" style="background: rgba(255,255,255,0.15); color: #ded2ba; font-size: 0.7rem; border-color: rgba(255,255,255,0.2);">${h}</span>`).join('')}
              </div>
            </div>
            <div class="center-hover-action">
              <div class="center-hover-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;
      } else if (item.type === 'daily') {
        mediaContent = `
          <div class="bento-media-wrap aspect-square" style="background: linear-gradient(150deg, #0e2a27 0%, #051413 100%);">
            <div style="position: absolute; inset: 0; padding: 22px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="pill-badge" style="background: rgba(42,157,143,0.35); color: #48cae4; border-color: rgba(72,202,228,0.5);">🛰️ RADAR</span>
                <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #22c55e;">● 24H LIVE</span>
              </div>
              <div style="text-align: left;">
                <div style="font-family: var(--font-mono); font-size: 0.76rem; color: #a0c4bf;">全球前沿雷达 · 7大板块</div>
                <div style="font-family: var(--font-serif); font-size: 1.3rem; font-weight: 700; color: #FFFFFF; margin-top: 6px; line-height: 1.35;">
                  一人公司 × AI 漫剧 × 审美提升
                </div>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.74rem; color: #94d2bd; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 10px;">
                每期 10 篇高密度价值沉淀 · 100% 真实外链
              </div>
            </div>
            <div class="center-hover-action">
              <div class="center-hover-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;
      } else if (item.type === 'inspo') {
        mediaContent = `
          <div class="bento-media-wrap aspect-square" style="background: #18181b; border: 2.5px solid #ded2ba; box-shadow: inset 0 0 24px rgba(0,0,0,0.85);">
            <div style="position: absolute; inset: 0; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-family: var(--font-mono); font-size: 0.72rem; color: #ded2ba; font-weight: 700;">CRT-DECK // 478+</span>
                <span style="width: 8px; height: 8px; border-radius: 50%; background: #22ff22; box-shadow: 0 0 8px #22ff22;"></span>
              </div>
              <div style="text-align: center; padding: 8px 0;">
                <svg viewBox="0 0 32 32" style="width: 48px; height: 48px; margin: 0 auto;">
                  <rect width="32" height="32" rx="6" fill="#ded2ba"/>
                  <rect x="3" y="3" width="26" height="26" rx="4" fill="#18181b"/>
                  <circle cx="16" cy="27" r="1.5" fill="#22ff22"/>
                  <path d="M9 14l4-4 4 4 4-4" stroke="#ded2ba" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
                </svg>
                <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #ded2ba; margin-top: 8px; font-weight: 600;">WEB AUDIO 机械微动音效</div>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.72rem; color: #a1a1aa; text-align: center; border-top: 1px dashed rgba(255,255,255,0.15); padding-top: 8px;">
                复古工控硬件排版与动效
              </div>
            </div>
            <div class="center-hover-action">
              <div class="center-hover-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;
      } else if (item.type === 'arcade') {
        mediaContent = `
          <div class="bento-media-wrap aspect-square" style="background: linear-gradient(145deg, #3d1222 0%, #17070e 100%);">
            <div style="position: absolute; inset: 0; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="pill-badge" style="background: rgba(224,122,95,0.35); color: #f4a261; border-color: rgba(244,162,97,0.5);">🕹️ ARCADE</span>
                <span style="font-family: var(--font-mono); font-size: 0.74rem; color: #f4a261;">P1 READY</span>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2.4rem; line-height: 1;">🏎️ ⚔️</div>
                <div style="font-family: var(--font-serif); font-size: 1.25rem; font-weight: 700; color: #FFFFFF; margin-top: 8px;">
                  《卡丁车》与《促织》
                </div>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.74rem; color: #d4887b; text-align: center; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 8px;">
                3D WebGL · 古典博弈 · 即开即玩
              </div>
            </div>
            <div class="center-hover-action">
              <div class="center-hover-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;
      } else {
        mediaContent = `
          <div class="bento-media-wrap aspect-square" style="background: linear-gradient(145deg, #1b263b 0%, #0d1b2a 100%);">
            <div style="position: absolute; inset: 0; padding: 20px; display: flex; flex-direction: column; justify-content: space-between; z-index: 10;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="pill-badge" style="background: rgba(59,114,222,0.35); color: #60a5fa; border-color: rgba(96,165,250,0.5);">📖 HUMAN SOUL</span>
                <span style="font-family: var(--font-serif); font-size: 0.75rem; color: #93c5fd;">在岛上慢慢生长</span>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 2.4rem;">🏝️ ✨</div>
                <div style="font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700; color: #FFFFFF; margin-top: 8px;">
                  30 册成长绘本与慢咖啡
                </div>
              </div>
              <div style="font-family: var(--font-serif); font-size: 0.74rem; color: #bfdbfe; text-align: center; border-top: 1px dashed rgba(255,255,255,0.2); padding-top: 8px;">
                文和图独立创作 · 守住心底小岛
              </div>
            </div>
            <div class="center-hover-action">
              <div class="center-hover-circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
              </div>
            </div>
          </div>
        `;
      }

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

  // 3. 动态渲染四大履历里程碑 (Four Milestones from Master Portfolio)
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
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
            <span class="pill-badge font-mono" style="font-size: 0.72rem;">${m.period}</span>
            <span style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--text-muted);">${m.org}</span>
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
  }

  // 4. 动态渲染代表作战绩池 (Works Grid with Real Posters or Designed Placeholders)
  function renderWorksGrid() {
    const grid = document.getElementById('works-grid');
    if (!grid || !window.DAOZHU_DATA) return;

    const works = window.DAOZHU_DATA.works;
    grid.innerHTML = '';

    works.forEach(w => {
      const card = document.createElement('article');
      card.className = 'work-card';

      let mediaHtml = '';
      if (w.image) {
        mediaHtml = `<img src="${w.image}" alt="${w.title}">`;
      } else {
        const icon = w.id === 'mobi' ? '🧩' : w.id === 'lelequ' ? '📚' : '🎬';
        mediaHtml = `
          <div style="position: absolute; inset: 0; background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-card) 100%); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px; border: 1px dashed var(--border-line);">
            <div style="font-size: 2.2rem; margin-bottom: 8px;">${icon}</div>
            <div style="font-family: var(--font-serif); font-size: 1.2rem; font-weight: 700; color: var(--text-primary); text-align: center; line-height: 1.35;">${w.title}</div>
            <div style="font-family: var(--font-mono); font-size: 0.74rem; color: var(--brand-primary); margin-top: 8px; font-weight: 600;">[ 📷 待配图 · 建议尺寸 16:10 ]</div>
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
        <h3 class="work-title">${w.title}</h3>
        <div class="work-role">${w.role}</div>
        <div class="work-metrics-box">
          📈 ${w.metrics}
        </div>
        <p class="work-desc">${w.desc}</p>
      `;
      grid.appendChild(card);
    });
  }

  // 5. 动态渲染独立游戏群岛 (Arcade Games Grid)
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
            <div style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--brand-primary); margin-top: 6px;">[ 📷 待配图 · 建议尺寸 4:3 ]</div>
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

  // 6. 动态渲染“最近在做什么” (Now / Changelog from v2)
  function renderNowList() {
    const container = document.getElementById('now-list');
    if (!container || !window.DAOZHU_DATA) return;

    const items = window.DAOZHU_DATA.nowList;
    container.innerHTML = '';

    items.forEach(it => {
      const li = document.createElement('li');
      li.className = 'now-item';
      li.innerHTML = `
        <span class="now-date">${it.date}</span>
        <p class="now-text">
          ${it.text}
          <a href="${it.url}" class="now-link">${it.linkText}</a>
        </p>
      `;
      container.appendChild(li);
    });
  }

  // 7. 动态渲染思考手记与今日日刊 (Articles Grid)
  function renderArticlesGrid() {
    const grid = document.getElementById('articles-grid');
    if (!grid || !window.DAOZHU_DATA) return;

    const articles = window.DAOZHU_DATA.articles;
    grid.innerHTML = '';

    articles.forEach(a => {
      const card = document.createElement('article');
      card.className = 'article-card';
      card.innerHTML = `
        <div class="article-meta">
          <time>${a.date}</time>
          <span>·</span>
          <span class="pill-badge" style="font-size: 0.68rem;">${a.category}</span>
          <span>·</span>
          <span>${a.readTime || '5 min'}</span>
        </div>
        <h3 class="article-title">${a.title}</h3>
        <p class="article-excerpt">${a.excerpt}</p>
        <div class="article-link">
          <span>阅读全文</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </div>
        <a href="${a.url}" target="_blank" rel="noopener noreferrer" style="position: absolute; inset: 0; z-index: 20;">
          <span style="display: none;">${a.title}</span>
        </a>
      `;
      grid.appendChild(card);
    });
  }

  // 8. 旅程右侧导航滚动监听 (Journey Nav Scroll Spy from v2)
  function initJourneyNav() {
    const dots = document.querySelectorAll('.journey-dot');
    if (!dots.length) return;

    const sections = ['hero', 'ecosystem', 'milestones', 'works', 'arcade-section', 'about', 'now', 'writing', 'contact'];

    function onScroll() {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          dots.forEach(d => d.classList.remove('active'));
          const activeDot = document.querySelector(`.journey-dot[data-target="${sections[i]}"]`);
          if (activeDot) activeDot.classList.add('active');
          break;
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    dots.forEach(d => {
      d.addEventListener('click', () => {
        const targetId = d.getAttribute('data-target');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // 9. 海岛环境声效开关 (Ambient Music Integration)
  function initMusicToggle() {
    const musicBtn = document.getElementById('music-btn');
    if (!musicBtn || !window.IslandAudio) return;

    musicBtn.addEventListener('click', () => {
      const playing = window.IslandAudio.toggle();
      if (playing) {
        musicBtn.classList.add('playing');
      } else {
        musicBtn.classList.remove('playing');
      }
    });
  }

  // 10. 模态弹窗与联系通道 (Coffee & Contact Modal)
  function initModals() {
    const triggers = document.querySelectorAll('[data-open-modal="coffee"]');
    const overlay = document.getElementById('coffee-modal');
    const closeBtn = document.getElementById('modal-close-btn');

    if (!overlay) return;

    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeModal();
      }
    });

    // 复制微信号按钮反馈
    const copyWechatBtn = document.getElementById('copy-wechat-btn');
    if (copyWechatBtn) {
      copyWechatBtn.addEventListener('click', () => {
        const wechat = "bl-free";
        navigator.clipboard.writeText(wechat).then(() => {
          const originalText = copyWechatBtn.innerText;
          copyWechatBtn.innerText = "已复制 ✓";
          setTimeout(() => {
            copyWechatBtn.innerText = originalText;
          }, 2000);
        });
      });
    }

    // 复制邮箱按钮反馈
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', () => {
        const email = "daozhu1993@gmail.com";
        navigator.clipboard.writeText(email).then(() => {
          const originalText = copyEmailBtn.innerText;
          copyEmailBtn.innerText = "已复制到剪贴板 ✓";
          setTimeout(() => {
            copyEmailBtn.innerText = originalText;
          }, 2000);
        });
      });
    }
  }

  // 11. 滚动渐显观察器 (Scroll Reveal)
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // 12. 返回顶部按钮
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 初始化总调度
  document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    renderBentoGrid();
    renderMilestones();
    renderWorksGrid();
    renderGamesGrid();
    renderNowList();
    renderArticlesGrid();
    initJourneyNav();
    initMusicToggle();
    initModals();
    initScrollReveal();
    initBackToTop();
  });

})();
