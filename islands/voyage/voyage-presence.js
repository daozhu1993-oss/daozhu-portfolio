'use strict';
(function () {
  const IDENTITY_KEY = 'daozhu-voyage-identity-v1';
  const CAPTAIN_KEY = 'daozhu-captain-key-v1';
  const MAX_RENDERED_BOATS = 15;
  const HORN_COOLDOWN_MS = 4000;

  const PORT_TITLES = {
    lighthouse: '灯塔观察室',
    workshop: '产品工坊',
    stories: '故事小屋',
    harbor: '岛主的港口',
    play: '游戏码头',
    atelier: '旅行与创作',
  };

  const GREETINGS = [
    '📯 嗨，岛上见！',
    '⛵ 顺风！',
    '👋 擦肩而过～',
    '🌊 海风不错',
    '🏮 灯亮着呢',
    '🐚 来坐坐呀',
  ];

  const SAIL_PALETTES = [
    { main: '#e8f1df', jib: '#c6dcb7', hull: '#6f8567', flag: '#3b6a57' },
    { main: '#f8e6bd', jib: '#e4c486', hull: '#9b7346', flag: '#b15c3b' },
    { main: '#ddebf4', jib: '#b2cde0', hull: '#58748a', flag: '#3b5d7a' },
    { main: '#f6ddd2', jib: '#dfb5a2', hull: '#9e624d', flag: '#a64d36' },
    { main: '#ece6d4', jib: '#cfc5ab', hull: '#7e735c', flag: '#5c6651' },
    { main: '#d5eee8', jib: '#a7d4ca', hull: '#4b7e76', flag: '#2c5c55' },
  ];

  const DEFAULT_PREFIXES = [
    '白鸥', '海风', '灯塔', '星潮', '青屿', '晚帆',
    '拾贝', '归航', '云帆', '浅湾', '微澜', '远岸',
  ];

  function hashStr(str) {
    let h = 2166136261;
    const s = String(str || '');
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return Math.abs(h);
  }

  function makeFallbackName(seed) {
    const h = hashStr(seed);
    return DEFAULT_PREFIXES[h % DEFAULT_PREFIXES.length] + String(((h >>> 8) % 89) + 11);
  }

  function makeVisitorId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
      return 'v_' + window.crypto.randomUUID().replace(/-/g, '').slice(0, 16);
    }
    return 'v_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-6);
  }

  function loadIdentity() {
    try {
      const saved = JSON.parse(localStorage.getItem(IDENTITY_KEY) || 'null');
      if (saved && typeof saved.visitorId === 'string' && saved.visitorId.length >= 6) {
        return {
          visitorId: saved.visitorId,
          name: typeof saved.name === 'string' ? saved.name : '',
        };
      }
    } catch {
      // ignore storage errors
    }
    const visitorId = makeVisitorId();
    const identity = { visitorId, name: makeFallbackName(visitorId) };
    saveIdentity(identity);
    return identity;
  }

  function saveIdentity(identity) {
    try {
      localStorage.setItem(IDENTITY_KEY, JSON.stringify(identity));
    } catch {
      // ignore storage errors
    }
  }

  function captureCaptainToken() {
    try {
      const u = new URL(location.href);
      const fromUrl = u.searchParams.get('captain');
      if (fromUrl !== null) {
        if (fromUrl) localStorage.setItem(CAPTAIN_KEY, fromUrl);
        else localStorage.removeItem(CAPTAIN_KEY);
        u.searchParams.delete('captain');
        history.replaceState(null, '', u.pathname + u.search + u.hash);
      }
      return localStorage.getItem(CAPTAIN_KEY) || '';
    } catch {
      return '';
    }
  }

  function resolveServiceOrigin() {
    if (typeof window.__SEA_PRESENCE_ORIGIN__ === 'string' && window.__SEA_PRESENCE_ORIGIN__) {
      return window.__SEA_PRESENCE_ORIGIN__.replace(/\/$/, '');
    }
    const host = location.hostname;
    if (host === 'localhost' || host === '127.0.0.1' || /^192\.168\.\d+\.\d+$/.test(host)) {
      return location.origin;
    }
    return 'https://sea.daozhuai.cn';
  }

  function pierOffset(boatId) {
    const h = hashStr(boatId);
    const angle = ((h % 360) * Math.PI) / 180;
    const radiusX = 1.8 + ((h >>> 5) % 16) * 0.1;
    const radiusY = 1.2 + ((h >>> 9) % 12) * 0.08;
    return {
      dx: Math.cos(angle) * radiusX,
      dy: Math.sin(angle) * radiusY,
    };
  }

  function formatRelativeTime(ts, now) {
    const diffSec = Math.max(0, Math.floor((now - ts) / 1000));
    if (diffSec < 45) return '刚刚';
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)} 分钟前`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)} 小时前`;
    const days = Math.floor(diffSec / 86400);
    if (days < 30) return `${days} 天前`;
    const d = new Date(ts);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function createRemoteBoatSvg(paletteIdx, isHost) {
    if (isHost) {
      return (
        '<svg viewBox="0 0 120 100" aria-hidden="true">' +
        '<path class="wake" d="M13 78 Q35 86 59 79 M10 88 Q38 96 68 87"/>' +
        '<path d="M25 61 L105 61 L90 83 Q62 96 36 81Z" fill="#7d4a26" stroke="#f5ce6b" stroke-width="3"/>' +
        '<path d="M21 61 Q60 49 106 60 L98 67 Q59 65 29 69Z" fill="#f7d57e" stroke="#6c431e" stroke-width="2"/>' +
        '<path d="M63 10 L63 62" stroke="#6b451c" stroke-width="4"/>' +
        '<path d="M58 16 Q33 30 32 53 L58 53Z" fill="#fff3c4" stroke="#b88428" stroke-width="2"/>' +
        '<path d="M69 14 L95 49 L69 49Z" fill="#f2c45a" stroke="#b88428" stroke-width="2"/>' +
        '<path d="M64 8 L84 14 L64 21Z" fill="#d9532f" stroke="#ffd86b" stroke-width="1.4"/>' +
        '<circle cx="84" cy="67" r="5.5" fill="#ffe680" stroke="#80531a"/>' +
        '</svg>'
      );
    }
    const p = SAIL_PALETTES[Math.abs(paletteIdx || 0) % SAIL_PALETTES.length];
    return (
      '<svg viewBox="0 0 120 100" aria-hidden="true">' +
      '<path class="wake" d="M16 79 Q36 86 58 80"/>' +
      `<path d="M25 61 L105 61 L90 83 Q62 96 36 81Z" fill="${p.hull}" stroke="#43382c" stroke-width="3"/>` +
      '<path d="M21 61 Q60 49 106 60 L98 67 Q59 65 29 69Z" fill="#e6cfa0" stroke="#43382c" stroke-width="2"/>' +
      '<path d="M63 14 L63 62" stroke="#5b4c39" stroke-width="4"/>' +
      `<path d="M58 18 Q35 31 34 53 L58 53Z" fill="${p.main}" stroke="#7d6e54" stroke-width="2"/>` +
      `<path d="M69 16 L93 49 L69 49Z" fill="${p.jib}" stroke="#7d6e54" stroke-width="2"/>` +
      `<path d="M64 12 L77 16 L64 21Z" fill="${p.flag}"/>` +
      '</svg>'
    );
  }

  function showBubbleOnBoat(boatEl, text, isHost) {
    if (!boatEl || !text) return;
    const prevBubble = boatEl.querySelector('.boat-bubble');
    if (prevBubble) prevBubble.remove();
    const prevRipple = boatEl.querySelector('.horn-ripple');
    if (prevRipple) prevRipple.remove();

    const ripple = document.createElement('span');
    ripple.className = isHost ? 'horn-ripple is-host' : 'horn-ripple';
    ripple.setAttribute('aria-hidden', 'true');
    boatEl.appendChild(ripple);

    const bubble = document.createElement('span');
    bubble.className = isHost ? 'boat-bubble is-host' : 'boat-bubble';
    bubble.textContent = text;
    boatEl.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
      ripple.remove();
    }, 3200);
  }

  window.createSeaPresence = function createSeaPresence(options) {
    const opts = options || {};
    const serviceOrigin = resolveServiceOrigin();
    const wsOrigin = serviceOrigin.replace(/^http/, 'ws');
    const identity = loadIdentity();
    let captainToken = captureCaptainToken();

    const worldLayer = document.getElementById('other-boats');
    const chartLayer = document.getElementById('chart-other-boats');
    const selfBoatEl = document.getElementById('boat');
    const arrivalGuestEl = document.getElementById('arrival-guest-count');
    const presenceBarEl = document.getElementById('sea-presence-bar');
    const hostEncounterEl = document.getElementById('host-encounter-banner');
    const onlineSummaryEl = document.getElementById('sea-online-summary');
    const myBoatNameEl = document.getElementById('my-boat-name');
    const selfBoatTagEl = document.getElementById('self-boat-tag');
    const hornBtn = document.getElementById('horn-btn');
    const renameBtn = document.getElementById('rename-boat');
    const renameDialog = document.getElementById('boat-name-dialog');
    const renameForm = document.getElementById('boat-name-form');
    const renameInput = document.getElementById('boat-name-input');
    const renameCancel = document.getElementById('boat-name-cancel');
    const hostExitBtn = document.getElementById('host-exit-btn');

    const guestbookEl = document.getElementById('guestbook');
    const guestbookForm = document.getElementById('guestbook-form');
    const guestbookInput = document.getElementById('guestbook-input');
    const guestbookStatus = document.getElementById('guestbook-status');
    const guestbookList = document.getElementById('guestbook-list');

    const remoteBoats = new Map();
    let selfId = null;
    let isSelfHost = false;
    let ws = null;
    let connected = false;
    let closedByPage = false;
    let reconnectAttempt = 0;
    let reconnectTimer = 0;
    let pingTimer = 0;
    let animFrame = 0;
    let clockOffset = 0;
    let inSea = false;
    let currentPort = opts.initialPort || 'lighthouse';
    let lastHornAt = 0;
    let hornResetTimer = 0;
    let noteFilter = 'all';
    let notes = [];

    const stats = {
      isFirstTime: false,
      guestNumber: 0,
      totalGuests: 0,
      onlineCount: 0,
      islandVisits: {},
      dockedCounts: {},
    };

    function serverNow() {
      return Date.now() + clockOffset;
    }

    function updateNotePlaceholder() {
      if (!guestbookInput) return;
      const title = PORT_TITLES[currentPort] || '灯塔观察室';
      guestbookInput.placeholder = `在「${title}」留下一句登岛足迹（最多 36 字）…`;
    }

    function updateSelfNameUI(name) {
      identity.name = name || identity.name || makeFallbackName(identity.visitorId);
      saveIdentity(identity);
      const label = isSelfHost ? `✦ ${identity.name}` : identity.name;
      if (myBoatNameEl) myBoatNameEl.textContent = label;
      if (selfBoatTagEl) {
        selfBoatTagEl.textContent = label;
        selfBoatTagEl.classList.toggle('is-host', isSelfHost);
        selfBoatTagEl.hidden = false;
      }
      if (selfBoatEl) {
        selfBoatEl.classList.toggle('is-host', isSelfHost);
      }
      if (hostExitBtn) {
        hostExitBtn.hidden = !isSelfHost;
      }
    }

    function updateHostEncounterBanner() {
      if (!hostEncounterEl) return;
      if (isSelfHost) {
        hostEncounterEl.textContent = '✦ 岛主金帆旗已升起 · 在线旅人会在海面上看见你的专属旗舰';
        hostEncounterEl.hidden = false;
        return;
      }
      let hostBoat = null;
      for (const entry of remoteBoats.values()) {
        if (entry.data.isHost) {
          hostBoat = entry.data;
          break;
        }
      }
      if (hostBoat) {
        const loc = PORT_TITLES[hostBoat.to || hostBoat.port] || '海面上';
        hostEncounterEl.textContent = `✨ 巧了，岛主本人此刻正在「${loc}」附近！点「鸣笛打招呼」打个照面吧`;
        hostEncounterEl.hidden = false;
      } else {
        hostEncounterEl.hidden = true;
      }
    }

    function setGuestbookStatus(msg, isError) {
      if (!guestbookStatus) return;
      if (!msg) {
        guestbookStatus.hidden = true;
        return;
      }
      guestbookStatus.textContent = msg;
      guestbookStatus.classList.toggle('is-error', Boolean(isError));
      guestbookStatus.hidden = false;
    }

    function renderNotesUI() {
      if (!guestbookEl || !guestbookList) return;
      if (!connected && notes.length === 0) return;
      guestbookEl.hidden = false;

      const now = serverNow();
      const filtered =
        noteFilter === 'current'
          ? notes.filter((n) => n.port === currentPort)
          : notes;

      guestbookList.innerHTML = '';
      if (filtered.length === 0) {
        const empty = document.createElement('li');
        empty.className = 'guestbook-empty';
        empty.textContent =
          noteFilter === 'current'
            ? `「${PORT_TITLES[currentPort] || '这座岛'}」还没有足迹，来做第一个留印的人吧。`
            : '海面刚迎风启航，来做第一个留下登岛足迹的旅人吧。';
        guestbookList.appendChild(empty);
        return;
      }

      for (const item of filtered.slice(0, 12)) {
        const li = document.createElement('li');
        li.className = item.isHost ? 'guestbook-item is-host' : 'guestbook-item';

        const meta = document.createElement('div');
        meta.className = 'guestbook-meta';

        const author = document.createElement('strong');
        author.textContent = item.name || '海岛旅人';

        meta.append(author);
        if (item.isHost) {
          const badge = document.createElement('span');
          badge.className = 'guestbook-host-badge';
          badge.textContent = '✦ 岛主';
          meta.append(badge);
        }

        const portTag = document.createElement('span');
        portTag.className = 'guestbook-port';
        portTag.textContent = PORT_TITLES[item.port] || '群岛';

        const time = document.createElement('time');
        time.textContent = formatRelativeTime(item.createdAt, now);

        meta.append(portTag, time);

        const body = document.createElement('p');
        body.textContent = item.text;

        li.append(meta, body);
        guestbookList.appendChild(li);
      }
    }

    function renderStatsUI() {
      if (stats.totalGuests <= 0) return;

      if (arrivalGuestEl) {
        const onlineTail =
          stats.onlineCount > 1 ? ` · 此刻海上有 ${stats.onlineCount} 艘船` : '';
        if (stats.isFirstTime && stats.guestNumber > 0) {
          arrivalGuestEl.textContent = `✦ 初次登岛 · 你是第 ${stats.guestNumber} 位来岛主这里坐客的旅人${onlineTail}`;
        } else {
          arrivalGuestEl.textContent = `✦ 已有 ${stats.totalGuests} 位旅人来岛主这里坐过客${onlineTail}`;
        }
        arrivalGuestEl.hidden = false;
      }

      if (presenceBarEl && onlineSummaryEl) {
        const ships = Math.max(1, stats.onlineCount || 1);
        onlineSummaryEl.textContent = `海域在线 ${ships} 艘船 · 已有 ${stats.totalGuests} 位客人来坐过客`;
        presenceBarEl.hidden = false;
      }

      document.querySelectorAll('.destination-card[data-island]').forEach((card) => {
        const id = card.dataset.island;
        const crowdEl = card.querySelector('.island-crowd');
        if (!crowdEl) return;
        const visits = Number(stats.islandVisits?.[id] || 0);
        const docked = Number(stats.dockedCounts?.[id] || 0);
        const parts = [];
        if (visits > 0) parts.push(`${visits} 人来过`);
        if (docked > 0) parts.push(`${docked} 艘船停靠`);
        if (parts.length) {
          crowdEl.textContent = parts.join(' · ');
          crowdEl.hidden = false;
        } else {
          crowdEl.hidden = true;
        }
      });
    }

    function removeBoatElement(entry) {
      if (entry.el && entry.el.parentNode) entry.el.parentNode.removeChild(entry.el);
      if (entry.dot && entry.dot.parentNode) entry.dot.parentNode.removeChild(entry.dot);
    }

    function ensureBoatElement(entry) {
      if (!worldLayer) return;
      const isHost = Boolean(entry.data.isHost);
      if (!entry.el) {
        const el = document.createElement('div');
        el.className = isHost ? 'other-boat is-host' : 'other-boat';
        el.setAttribute('aria-hidden', 'true');
        el.innerHTML =
          '<span class="boat-tag"></span>' +
          '<div class="other-boat-turn"><div class="other-boat-bob">' +
          createRemoteBoatSvg(entry.data.color, isHost) +
          '</div></div>';
        worldLayer.appendChild(el);
        entry.el = el;
        entry.tagEl = el.querySelector('.boat-tag');
      }
      entry.el.classList.toggle('is-host', isHost);
      if (entry.tagEl) {
        entry.tagEl.textContent = isHost ? `✦ ${entry.data.name || '岛主'}` : (entry.data.name || '海岛旅人');
      }

      if (chartLayer && !entry.dot) {
        const dot = document.createElement('span');
        dot.className = isHost ? 'chart-other-dot is-host' : 'chart-other-dot';
        dot.setAttribute('aria-hidden', 'true');
        dot.title = isHost ? `岛主 · ${entry.data.name || '岛主'}` : (entry.data.name || '');
        chartLayer.appendChild(dot);
        entry.dot = dot;
      } else if (entry.dot) {
        entry.dot.classList.toggle('is-host', isHost);
        entry.dot.title = isHost ? `岛主 · ${entry.data.name || '岛主'}` : (entry.data.name || '');
      }
    }

    function trimVisibleBoats() {
      if (remoteBoats.size <= MAX_RENDERED_BOATS) return;
      const sorted = [...remoteBoats.entries()].sort((a, b) => {
        if (Boolean(b[1].data.isHost) !== Boolean(a[1].data.isHost)) {
          return b[1].data.isHost ? 1 : -1;
        }
        return (b[1].data.updatedAt || 0) - (a[1].data.updatedAt || 0);
      });
      for (let i = MAX_RENDERED_BOATS; i < sorted.length; i++) {
        const [id, entry] = sorted[i];
        removeBoatElement(entry);
        remoteBoats.delete(id);
      }
    }

    function upsertBoat(boatData) {
      if (!boatData || !boatData.id) return;
      let entry = remoteBoats.get(boatData.id);
      const offset = pierOffset(boatData.id);
      let path = null;
      if (
        boatData.status === 'sailing' &&
        boatData.from &&
        boatData.to &&
        typeof window.planSeaRoute === 'function'
      ) {
        try {
          path = window.planSeaRoute(boatData.from, boatData.to);
        } catch {
          path = null;
        }
      }
      if (!entry) {
        entry = {
          data: boatData,
          path,
          offset,
          lastPos: null,
          el: null,
          tagEl: null,
          dot: null,
        };
        remoteBoats.set(boatData.id, entry);
      } else {
        entry.data = boatData;
        entry.path = path;
      }
      ensureBoatElement(entry);
      trimVisibleBoats();
      positionBoat(entry, serverNow());
      scheduleAnimation();
      updateHostEncounterBanner();
    }

    function removeBoat(id) {
      if (!id) return;
      const entry = remoteBoats.get(id);
      if (!entry) return;
      removeBoatElement(entry);
      remoteBoats.delete(id);
      updateHostEncounterBanner();
    }

    function positionBoat(entry, now) {
      const b = entry.data;
      let pos = null;
      let isSailing = false;

      if (b.status === 'sailing' && entry.path && b.duration > 0) {
        const rawT = (now - b.startedAt) / b.duration;
        if (rawT < 1) {
          isSailing = true;
          const eased = typeof window.voyageEase === 'function' ? window.voyageEase(rawT) : Math.max(0, Math.min(1, rawT));
          pos = window.pointOnSeaRoute(entry.path, eased);
        } else {
          const destNode = window.seaNodes?.[b.to];
          if (destNode) {
            pos = {
              x: Math.max(4, Math.min(96, destNode.x + entry.offset.dx)),
              y: Math.max(6, Math.min(96, destNode.y + entry.offset.dy)),
            };
          }
        }
      }

      if (!pos) {
        const portNode = window.seaNodes?.[b.port] || window.seaNodes?.lighthouse || { x: 31, y: 43 };
        pos = {
          x: Math.max(4, Math.min(96, portNode.x + entry.offset.dx)),
          y: Math.max(6, Math.min(96, portNode.y + entry.offset.dy)),
        };
      }

      if (entry.el) {
        entry.el.style.left = pos.x + '%';
        entry.el.style.top = pos.y + '%';
        entry.el.classList.toggle('is-sailing', isSailing);
        if (entry.lastPos && isSailing) {
          const dx = pos.x - entry.lastPos.x;
          if (Math.abs(dx) > 0.005) {
            entry.el.classList.toggle('westbound', dx < 0);
          }
        }
      }
      if (entry.dot) {
        entry.dot.style.left = pos.x + '%';
        entry.dot.style.top = pos.y + '%';
      }
      entry.lastPos = pos;
      return isSailing;
    }

    function tickAnimation() {
      animFrame = 0;
      const now = serverNow();
      let anySailing = false;
      for (const entry of remoteBoats.values()) {
        if (positionBoat(entry, now)) anySailing = true;
      }
      if (anySailing && !document.hidden) {
        animFrame = requestAnimationFrame(tickAnimation);
      }
    }

    function scheduleAnimation() {
      if (animFrame || document.hidden) return;
      for (const entry of remoteBoats.values()) {
        if (entry.data.status === 'sailing') {
          animFrame = requestAnimationFrame(tickAnimation);
          return;
        }
      }
    }

    function send(payload) {
      if (!ws || ws.readyState !== WebSocket.OPEN) return;
      try {
        ws.send(JSON.stringify(payload));
      } catch {
        // silent fallback
      }
    }

    function handleMessage(raw) {
      let msg;
      try {
        msg = JSON.parse(raw);
      } catch {
        return;
      }

      if (typeof msg.serverTime === 'number') {
        clockOffset = msg.serverTime - Date.now();
      }

      if (msg.type === 'welcome') {
        selfId = msg.selfId || null;
        isSelfHost = Boolean(msg.isHost);
        if (msg.visitorId && msg.visitorId !== identity.visitorId) {
          identity.visitorId = msg.visitorId;
        }
        updateSelfNameUI(msg.name || identity.name);
        stats.isFirstTime = stats.isFirstTime || Boolean(msg.isFirstTime);
        stats.guestNumber = Number(msg.guestNumber || stats.guestNumber || 0);
        stats.totalGuests = Math.max(stats.totalGuests, Number(msg.totalGuests || 0));
        stats.onlineCount = Number(msg.onlineCount || 1);
        stats.islandVisits = msg.islandVisits || {};
        stats.dockedCounts = msg.dockedCounts || {};
        notes = Array.isArray(msg.notes) ? msg.notes : notes;
        renderStatsUI();
        renderNotesUI();

        for (const entry of remoteBoats.values()) removeBoatElement(entry);
        remoteBoats.clear();
        if (Array.isArray(msg.boats)) {
          for (const b of msg.boats) upsertBoat(b);
        }
        updateHostEncounterBanner();

        if (inSea) {
          send({ type: 'enter_sea', port: currentPort });
        }
        return;
      }

      if (msg.type === 'renamed' && msg.name) {
        updateSelfNameUI(msg.name);
        return;
      }

      if (msg.type === 'greet' && msg.id && msg.greeting) {
        if (msg.id === selfId) return;
        const entry = remoteBoats.get(msg.id);
        if (entry && entry.el) {
          showBubbleOnBoat(entry.el, msg.greeting, Boolean(msg.isHost));
          if (window.islandAudio) window.islandAudio.effect('horn-far');
        }
        return;
      }

      if (msg.type === 'note_added' && msg.note) {
        notes = [msg.note, ...notes.filter((n) => n.id !== msg.note.id)].slice(0, 30);
        renderNotesUI();
        if (msg.note.name === identity.name && guestbookInput) {
          guestbookInput.value = '';
          setGuestbookStatus('足迹已留在码头，后续登岛的旅人都会看到。', false);
        }
        return;
      }

      if (msg.type === 'note_rejected') {
        setGuestbookStatus(msg.reason || '暂时未能保存这条足迹。', true);
        return;
      }

      if (msg.type === 'join') {
        if (typeof msg.onlineCount === 'number') stats.onlineCount = msg.onlineCount;
        if (typeof msg.totalGuests === 'number') stats.totalGuests = msg.totalGuests;
        if (msg.dockedCounts) stats.dockedCounts = msg.dockedCounts;
        if (msg.boat) upsertBoat(msg.boat);
        renderStatsUI();
        return;
      }

      if (msg.type === 'boat_update') {
        if (typeof msg.onlineCount === 'number') stats.onlineCount = msg.onlineCount;
        if (msg.dockedCounts) stats.dockedCounts = msg.dockedCounts;
        if (msg.islandVisits) stats.islandVisits = msg.islandVisits;
        if (msg.boat) upsertBoat(msg.boat);
        renderStatsUI();
        return;
      }

      if (msg.type === 'stats') {
        if (typeof msg.onlineCount === 'number') stats.onlineCount = msg.onlineCount;
        if (typeof msg.totalGuests === 'number') stats.totalGuests = msg.totalGuests;
        if (msg.islandVisits) stats.islandVisits = msg.islandVisits;
        if (msg.dockedCounts) stats.dockedCounts = msg.dockedCounts;
        renderStatsUI();
        return;
      }

      if (msg.type === 'leave') {
        if (msg.id) removeBoat(msg.id);
        if (typeof msg.onlineCount === 'number') stats.onlineCount = msg.onlineCount;
        if (msg.dockedCounts) stats.dockedCounts = msg.dockedCounts;
        renderStatsUI();
      }
    }

    function connect() {
      if (closedByPage || typeof WebSocket === 'undefined') return;
      const params = new URLSearchParams({
        visitorId: identity.visitorId,
        name: identity.name || '',
        port: currentPort,
        status: inSea ? 'docked' : 'arrival',
      });
      if (captainToken) params.set('captain', captainToken);

      try {
        ws = new WebSocket(`${wsOrigin}/ws?${params.toString()}`);
      } catch {
        return;
      }

      ws.addEventListener('open', () => {
        connected = true;
        reconnectAttempt = 0;
        clearInterval(pingTimer);
        pingTimer = setInterval(() => send({ type: 'ping' }), 25000);
      });

      ws.addEventListener('message', (event) => handleMessage(event.data));

      ws.addEventListener('close', () => {
        connected = false;
        clearInterval(pingTimer);
        if (closedByPage) return;
        if (reconnectAttempt < 3) {
          const delay = 2000 * Math.pow(2, reconnectAttempt++);
          reconnectTimer = setTimeout(connect, delay);
        }
      });

      ws.addEventListener('error', () => {});
    }

    if (hornBtn) {
      hornBtn.addEventListener('click', () => {
        const now = Date.now();
        if (now - lastHornAt < HORN_COOLDOWN_MS) return;
        lastHornAt = now;
        const idx = Math.floor(Math.random() * GREETINGS.length);
        showBubbleOnBoat(selfBoatEl, GREETINGS[idx], isSelfHost);
        if (window.islandAudio) window.islandAudio.effect('horn');
        send({ type: 'greet', index: idx });
        hornBtn.disabled = true;
        hornBtn.textContent = '📯 已鸣笛';
        clearTimeout(hornResetTimer);
        hornResetTimer = setTimeout(() => {
          hornBtn.disabled = false;
          hornBtn.textContent = '📯 鸣笛打招呼';
        }, HORN_COOLDOWN_MS);
      });
    }

    if (renameBtn && renameDialog && renameForm && renameInput) {
      renameBtn.addEventListener('click', () => {
        renameInput.value = identity.name || '';
        if (!renameDialog.open) renameDialog.showModal();
        renameInput.focus();
        renameInput.select();
      });
      if (renameCancel) {
        renameCancel.addEventListener('click', () => renameDialog.close());
      }
      renameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nextName = (renameInput.value || '').trim().slice(0, 8);
        if (nextName) {
          updateSelfNameUI(nextName);
          send({ type: 'rename', name: nextName });
        }
        renameDialog.close();
      });
    }

    if (hostExitBtn) {
      hostExitBtn.addEventListener('click', () => {
        captainToken = '';
        isSelfHost = false;
        try {
          localStorage.removeItem(CAPTAIN_KEY);
        } catch {}
        updateSelfNameUI(makeFallbackName(identity.visitorId));
        updateHostEncounterBanner();
        if (renameDialog && renameDialog.open) renameDialog.close();
        if (ws && ws.readyState === WebSocket.OPEN) {
          try {
            ws.close();
          } catch {}
        }
      });
    }

    document.querySelectorAll('[data-note-filter]').forEach((btn) => {
      btn.addEventListener('click', () => {
        noteFilter = btn.dataset.noteFilter === 'current' ? 'current' : 'all';
        document.querySelectorAll('[data-note-filter]').forEach((b) => {
          b.setAttribute('aria-pressed', String(b.dataset.noteFilter === noteFilter));
        });
        renderNotesUI();
      });
    });

    document.querySelectorAll('[data-stamp]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!guestbookInput) return;
        guestbookInput.value = btn.dataset.stamp || '';
        guestbookInput.focus();
      });
    });

    if (guestbookForm && guestbookInput) {
      guestbookForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = (guestbookInput.value || '').trim();
        if (!text) {
          setGuestbookStatus('先写一句话，或点上面一个印章短句吧。', true);
          return;
        }
        if (!connected) {
          setGuestbookStatus('海面暂未连上码头记录服务，稍后再试试。', true);
          return;
        }
        setGuestbookStatus('正在刻下足迹…', false);
        send({ type: 'leave_note', port: currentPort, text });
      });
    }

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) scheduleAnimation();
    });

    window.addEventListener('pagehide', () => {
      closedByPage = true;
      clearTimeout(reconnectTimer);
      clearTimeout(hornResetTimer);
      clearInterval(pingTimer);
      cancelAnimationFrame(animFrame);
      if (ws && ws.readyState === WebSocket.OPEN) {
        try {
          ws.close();
        } catch {}
      }
    });

    function fetchInitialStats() {
      if (typeof fetch !== 'function') return;
      fetch(`${serviceOrigin}/stats?visitorId=${encodeURIComponent(identity.visitorId)}`, {
        mode: 'cors',
        cache: 'no-store',
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (!data || typeof data.totalGuests !== 'number') return;
          stats.isFirstTime = stats.isFirstTime || Boolean(data.isFirstTime);
          stats.guestNumber = Number(data.guestNumber || stats.guestNumber || 0);
          stats.totalGuests = Math.max(stats.totalGuests, Number(data.totalGuests || 0));
          if (!connected) stats.onlineCount = Math.max(1, Number(data.onlineCount || 0));
          if (data.islandVisits) stats.islandVisits = data.islandVisits;
          if (data.dockedCounts) stats.dockedCounts = data.dockedCounts;
          if (Array.isArray(data.notes) && notes.length === 0) notes = data.notes;
          renderStatsUI();
          if (notes.length > 0) renderNotesUI();
        })
        .catch(() => {});
    }

    updateSelfNameUI(identity.name);
    updateNotePlaceholder();
    fetchInitialStats();
    connect();

    return {
      enterSea(port) {
        inSea = true;
        if (port) currentPort = port;
        updateNotePlaceholder();
        renderNotesUI();
        send({ type: 'enter_sea', port: currentPort });
      },
      sail(from, to, duration) {
        inSea = true;
        send({ type: 'sail', from, to, duration });
      },
      dock(port) {
        inSea = true;
        if (port) currentPort = port;
        updateNotePlaceholder();
        if (noteFilter === 'current') renderNotesUI();
        send({ type: 'dock', port: currentPort });
      },
      getSnapshot() {
        return {
          name: identity.name,
          isHost: isSelfHost,
          guestNumber: stats.guestNumber,
          totalGuests: stats.totalGuests,
          onlineCount: stats.onlineCount,
        };
      },
      get connected() {
        return connected;
      },
    };
  };
})();
