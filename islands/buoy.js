'use strict';
(function () {
  if (window.self !== window.top) return;
  if (location.hostname === 'www.daozhuai.cn' && location.pathname.startsWith('/islands')) return;
  if (document.getElementById('daozhu-archipelago-buoy')) return;

  const STORAGE_KEY = 'daozhu-buoy-collapsed-v1';
  const TARGET_URL = 'https://www.daozhuai.cn/islands/';

  const host = document.createElement('div');
  host.id = 'daozhu-archipelago-buoy';
  host.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:2147483000;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC",sans-serif;';

  const shadow = host.attachShadow({ mode: 'open' });
  shadow.innerHTML = `
    <style>
      :host { all: initial; }
      .wrap {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 11px 7px 12px;
        border-radius: 999px;
        background: rgba(255, 245, 224, 0.92);
        border: 1px solid rgba(173, 146, 98, 0.68);
        box-shadow: 0 6px 20px rgba(17, 45, 39, 0.22);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        color: #2c4a40;
        font-size: 12px;
        line-height: 1;
        user-select: none;
        transition: transform 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      }
      .wrap:hover {
        transform: translateY(-2px);
        box-shadow: 0 9px 24px rgba(17, 45, 39, 0.28);
      }
      .link {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: inherit;
        text-decoration: none;
        font-weight: 600;
        letter-spacing: 0.2px;
        white-space: nowrap;
      }
      .boat {
        display: inline-block;
        font-size: 14px;
        animation: buoy-bob 3.2s ease-in-out infinite;
      }
      .sub {
        font-weight: 500;
        color: #6b5d46;
        font-size: 11px;
      }
      .toggle {
        border: 0;
        background: transparent;
        color: #7d6d53;
        width: 20px;
        height: 20px;
        padding: 0;
        margin-left: 2px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 13px;
        line-height: 20px;
        text-align: center;
      }
      .toggle:hover {
        background: rgba(44, 74, 64, 0.1);
        color: #2c4a40;
      }
      .wrap.collapsed {
        padding: 0;
        width: 38px;
        height: 38px;
        justify-content: center;
        cursor: pointer;
        opacity: 0.82;
      }
      .wrap.collapsed:hover { opacity: 1; }
      .wrap.collapsed .label,
      .wrap.collapsed .sub,
      .wrap.collapsed .toggle { display: none; }
      @keyframes buoy-bob {
        0%, 100% { transform: translateY(0) rotate(-2deg); }
        50% { transform: translateY(-1.5px) rotate(3deg); }
      }
      @media (max-width: 640px) {
        .sub { display: none; }
        .wrap { padding: 6px 9px 6px 10px; font-size: 11px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .boat { animation: none; }
      }
    </style>
    <div class="wrap" id="buoy-wrap">
      <a class="link" id="buoy-link" href="${TARGET_URL}" title="乘船回到岛主的数字群岛">
        <span class="boat" aria-hidden="true">⛵</span>
        <span class="label">数字群岛</span>
        <span class="sub">· 坐船逛全站</span>
      </a>
      <button type="button" class="toggle" id="buoy-toggle" aria-label="收起数字群岛浮标" title="收起为小图标">×</button>
    </div>
  `;

  const wrap = shadow.getElementById('buoy-wrap');
  const link = shadow.getElementById('buoy-link');
  const toggle = shadow.getElementById('buoy-toggle');

  function setCollapsed(val) {
    wrap.classList.toggle('collapsed', val);
    try {
      sessionStorage.setItem(STORAGE_KEY, val ? '1' : '0');
    } catch {}
  }

  try {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') setCollapsed(true);
  } catch {}

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCollapsed(true);
  });

  link.addEventListener('click', (e) => {
    if (wrap.classList.contains('collapsed')) {
      e.preventDefault();
      setCollapsed(false);
    }
  });

  function mount() {
    if (!document.body) return;
    document.body.appendChild(host);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount, { once: true });
  } else {
    mount();
  }
})();
