'use strict';
(function () {
  const MODES = [
    { id: 'dawn', icon: '🌅', label: '清晨薄雾', note: '岛上刚起雾，早安。' },
    { id: 'day', icon: '☀️', label: '午后暖阳', note: '风平浪静，适合出海。' },
    { id: 'dusk', icon: '🌇', label: '黄昏余晖', note: '晚霞落海，灯快亮了。' },
    { id: 'night', icon: '🌙', label: '深夜星灯', note: '岛上天黑亮灯了，慢慢逛。' },
  ];

  function detectSkyByHour(hour) {
    if (hour >= 5 && hour < 9) return 'dawn';
    if (hour >= 9 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'dusk';
    return 'night';
  }

  function modeById(id) {
    return MODES.find((m) => m.id === id) || MODES[1];
  }

  function applySky(id, isPreview) {
    const mode = modeById(id);
    document.documentElement.dataset.sky = mode.id;

    const btn = document.getElementById('sky-toggle');
    if (btn) {
      btn.textContent = `${mode.icon} ${mode.label}`;
      btn.title = isPreview
        ? `${mode.note}（当前为预览天色，再点切换下一个时段）`
        : `${mode.note}（按当地时间自动变化，点一下可预览其他天色）`;
      btn.dataset.skyMode = mode.id;
    }

    const hintEl = document.getElementById('sky-mood-note');
    if (hintEl) {
      hintEl.textContent = `${mode.icon} ${mode.label} · ${mode.note}`;
      hintEl.hidden = false;
    }
  }

  const realSky = detectSkyByHour(new Date().getHours());
  let currentId = realSky;

  // Support optional ?sky=dawn|day|dusk|night for quick testing
  try {
    const param = new URLSearchParams(location.search).get('sky');
    if (param && MODES.some((m) => m.id === param)) currentId = param;
  } catch {}

  applySky(currentId, currentId !== realSky);

  document.addEventListener('DOMContentLoaded', () => {
    applySky(currentId, currentId !== realSky);
    const btn = document.getElementById('sky-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        const idx = MODES.findIndex((m) => m.id === currentId);
        currentId = MODES[(idx + 1) % MODES.length].id;
        applySky(currentId, currentId !== realSky);
      });
    }
  });

  window.detectArchipelagoSky = detectSkyByHour;
})();
