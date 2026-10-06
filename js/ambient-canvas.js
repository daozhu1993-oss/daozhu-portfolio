/**
 * 数字群岛 · Awwwards-Caliber Ambient Interactive Canvas Engine
 * High-Performance Celestial Stardust & Kinetic Filament System
 * Reacts to cursor gravity with spring physics & ambient orbital motion
 */

(function () {
  'use strict';

  // Respect user preference for reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-canvas';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0';
  canvas.style.opacity = '0.9';
  canvas.style.transition = 'opacity 0.6s ease';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  const mouse = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    radius: 180,
    active: false
  };

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 38 : 72;
  const maxDistance = 140;

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.active = true;
  }, { passive: true });

  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  }, { passive: true });

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : (Math.random() < 0.5 ? -10 : width + 10);
      this.y = Math.random() * height;
      this.baseX = this.x;
      this.baseY = this.y;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.size = Math.random() * 2.2 + 0.8;
      this.baseAlpha = Math.random() * 0.55 + 0.25;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulseOffset = Math.random() * Math.PI * 2;
    }

    update(time) {
      // Natural floating drift
      this.x += this.vx;
      this.y += this.vy;

      // Wrap around bounds
      if (this.x < -20) this.x = width + 20;
      if (this.x > width + 20) this.x = -20;
      if (this.y < -20) this.y = height + 20;
      if (this.y > height + 20) this.y = -20;

      // Mouse gravitational attraction & gentle repulsion wave
      if (mouse.active) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius);
          // Swirl vector
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.8;
          this.y -= Math.sin(angle) * force * 1.8;
        }
      }

      // Breathing luminescence
      this.alpha = this.baseAlpha + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2;
    }

    draw(isDark) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      if (isDark) {
        ctx.fillStyle = `rgba(244, 162, 97, ${Math.max(0.05, this.alpha * 0.85)})`;
        ctx.shadowColor = 'rgba(224, 122, 95, 0.4)';
        ctx.shadowBlur = this.size * 3;
      } else {
        ctx.fillStyle = `rgba(180, 90, 60, ${Math.max(0.04, this.alpha * 0.45)})`;
        ctx.shadowColor = 'rgba(180, 90, 60, 0.2)';
        ctx.shadowBlur = this.size * 2;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let animFrameId = null;
  let isPaused = false;
  let lastTime = 0;

  function render(timestamp) {
    if (isPaused) return;

    const time = timestamp * 0.001;

    // Smooth cursor interpolation
    if (mouse.active) {
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;
    }

    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.classList.contains('dark');

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time);
      particles[i].draw(isDark);

      // Connect filaments between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const ratio = (1 - dist / maxDistance);
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          if (isDark) {
            ctx.strokeStyle = `rgba(224, 122, 95, ${ratio * 0.18})`;
          } else {
            ctx.strokeStyle = `rgba(180, 90, 60, ${ratio * 0.08})`;
          }
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }
    }

    // Interactive cursor radiant aura
    if (mouse.active) {
      const gradient = ctx.createRadialGradient(
        mouse.x, mouse.y, 0,
        mouse.x, mouse.y, mouse.radius * 1.2
      );
      if (isDark) {
        gradient.addColorStop(0, 'rgba(224, 122, 95, 0.09)');
        gradient.addColorStop(0.5, 'rgba(180, 90, 60, 0.03)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(180, 90, 60, 0.05)');
        gradient.addColorStop(0.5, 'rgba(212, 136, 58, 0.02)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, mouse.radius * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(render);
  }

  // Handle visibility change to save battery & CPU
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isPaused = true;
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      isPaused = false;
      animFrameId = requestAnimationFrame(render);
    }
  });

  animFrameId = requestAnimationFrame(render);
})();
