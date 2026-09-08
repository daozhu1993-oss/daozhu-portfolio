/**
 * 数字群岛 · 岛主个人门户 - 动效与戏剧张力波形发生器 (animated-hero.js)
 */

(function () {
  'use strict';

  // 1. 文字逐词模糊淡入 (Rico UI Signature AnimatedText)
  function initAnimatedText() {
    const animatedElements = document.querySelectorAll('.animated-text');

    animatedElements.forEach((el) => {
      const rawText = el.getAttribute('data-text') || el.innerText.trim();
      const delay = parseFloat(el.getAttribute('data-delay') || '0.1');
      const stagger = parseFloat(el.getAttribute('data-stagger') || '0.06');

      // 拆分词语 (支持中英文字词混合处理)
      const words = rawText.split(/(\s+|[，。！？、—]+)/).filter(Boolean);
      el.innerHTML = '';

      let currentDelay = delay;
      words.forEach((w) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.innerText = w;
        span.style.transitionDelay = `${currentDelay}s`;
        el.appendChild(span);
        currentDelay += stagger;
      });

      // 触发动画
      requestAnimationFrame(() => {
        setTimeout(() => {
          el.classList.add('in');
        }, 50);
      });
    });
  }

  // 2. 戏剧张力与故事节拍动态波形图 (Interactive Story Conflict Wave)
  function initStoryWave() {
    const svg = document.getElementById('story-wave-svg');
    const path = document.getElementById('story-wave-path');
    const area = document.getElementById('story-wave-area');
    if (!svg || !path) return;

    let time = 0;
    const width = 500;
    const height = 130;

    // 经典好莱坞三幕式 / 短剧爽点节奏节拍关键点
    const beats = [
      { x: 0, baseY: 100 },     // 起: 日常平衡打破
      { x: 70, baseY: 85 },     // 钩子: 第一悬念入局
      { x: 140, baseY: 65 },    // 承: 阻碍升级与欲望
      { x: 230, baseY: 40 },    // 冲突: 第一个大反转
      { x: 310, baseY: 75 },    // 假死/危机: 跌入绝望谷底
      { x: 390, baseY: 22 },    // 转/高潮: 极致爽感爆发与打脸
      { x: 460, baseY: 15 },    // 终极绝杀卡点
      { x: 500, baseY: 30 }     // 合: 钩子重抛与下集悬念
    ];

    function renderWave() {
      time += 0.035;

      // 根据正弦波动为每个节拍点增加微动生物感
      const points = beats.map((b, i) => {
        const oscillation = Math.sin(time + i * 0.9) * 4.5;
        return {
          x: b.x,
          y: b.baseY + oscillation
        };
      });

      // 贝塞尔曲线平滑插值
      let d = `M ${points[0].x},${points[0].y}`;
      for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cx = (p0.x + p1.x) / 2;
        d += ` Q ${p0.x},${p0.y} ${cx},${(p0.y + p1.y) / 2}`;
      }
      const last = points[points.length - 1];
      d += ` T ${last.x},${last.y}`;

      path.setAttribute('d', d);

      if (area) {
        const areaD = `${d} L ${width},${height} L 0,${height} Z`;
        area.setAttribute('d', areaD);
      }

      requestAnimationFrame(renderWave);
    }

    renderWave();
  }

  // 3. 动态遥测状态更新 (Live Island Telemetry)
  function initTelemetry() {
    const bpmElement = document.getElementById('telemetry-bpm');
    if (!bpmElement) return;

    setInterval(() => {
      // 模拟故事节拍心率在 118 ~ 132 BPM 之间规律微动
      const randomBpm = 120 + Math.floor(Math.sin(Date.now() / 1500) * 8 + Math.random() * 4);
      bpmElement.innerText = `${randomBpm} BPM`;
    }, 1800);
  }

  // 初始化总入口
  document.addEventListener('DOMContentLoaded', () => {
    initAnimatedText();
    initStoryWave();
    initTelemetry();
  });
})();
