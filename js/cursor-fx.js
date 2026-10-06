/**
 * 数字群岛 · Awwwards / FWA Master Micro-Interaction Engine (cursor-fx.js)
 * 1. Magnetic Custom Cursor with Contextual Morphing & Micro-Labels
 * 2. 3D Perspective Card Tilt with Specular Glare Reflections
 * 3. Matrix Text Decrypt / Scramble Typography Animations
 * 4. High-Precision Modern Scroll Progress Tracker
 */

(function () {
  'use strict';

  // Only enable custom cursor on fine-pointer devices (desktops/laptops)
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;

  /* ─────────────────────────────────────────────────────────────
     1. Custom Magnetic Cursor System
     ───────────────────────────────────────────────────────────── */
  if (isFinePointer) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = `
      <div class="cursor-dot"></div>
      <div class="cursor-ring">
        <span class="cursor-label font-mono"></span>
      </div>
    `;
    document.body.appendChild(cursor);

    const dot = cursor.querySelector('.cursor-dot');
    const ring = cursor.querySelector('.cursor-ring');
    const label = cursor.querySelector('.cursor-label');

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        cursor.classList.add('visible');
        isVisible = true;
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      cursor.classList.remove('visible');
      isVisible = false;
    });

    // Spring animation loop
    function updateCursor() {
      // Direct dot
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Elastic trailing ring (lerp factor 0.16)
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;

      requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);

    // Interactive element hover detection
    function setupCursorHovers() {
      // Standard clickable targets
      const clickables = document.querySelectorAll('a, button, [role="button"], input, .theme-toggle-btn');
      clickables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-hover');
        });
      });

      // Special contextual cards
      document.querySelectorAll('.bento-card, .work-card, .model-preview-card, .note-preview-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-card-hover');
          label.textContent = 'VIEW ↗';
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-card-hover');
          label.textContent = '';
        });
      });

      document.querySelectorAll('.game-card, .pocket-console-banner').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-game-hover');
          label.textContent = 'PLAY ▶';
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-game-hover');
          label.textContent = '';
        });
      });

      document.querySelectorAll('.service-card, .service-action-btn').forEach(el => {
        el.addEventListener('mouseenter', () => {
          cursor.classList.add('cursor-card-hover');
          label.textContent = 'TALK 💬';
        });
        el.addEventListener('mouseleave', () => {
          cursor.classList.remove('cursor-card-hover');
          label.textContent = '';
        });
      });
    }

    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupCursorHovers);
    } else {
      setupCursorHovers();
    }
  }

  /* ─────────────────────────────────────────────────────────────
     2. 3D Perspective Card Tilt & Specular Light Glare
     ───────────────────────────────────────────────────────────── */
  function init3DTilt() {
    if (!isFinePointer || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const tiltCards = document.querySelectorAll(
      '.bento-card, .hero-showcase-card, .service-card, .milestone-card, .work-card, .pocket-console-banner'
    );

    tiltCards.forEach(card => {
      // Create glare overlay if not exists
      let glare = card.querySelector('.card-glare');
      if (!glare) {
        glare = document.createElement('div');
        glare.className = 'card-glare';
        card.appendChild(glare);
      }

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalize from -0.5 to 0.5
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Mild, ultra-premium tilt angles
        const rotateX = -normY * 9.5;
        const rotateY = normX * 9.5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
        
        // Update glare position
        glare.style.opacity = '1';
        glare.style.background = `radial-gradient(circle 240px at ${x}px ${y}px, rgba(255, 255, 255, 0.16), transparent 75%)`;
      }, { passive: true });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        glare.style.opacity = '0';
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     3. Kinetic Text Decrypt / Scramble Typography
     ───────────────────────────────────────────────────────────── */
  const CHARACTERS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_~#%&*';

  function scrambleText(element, finalString, duration = 600) {
    let startTime = null;
    const length = finalString.length;

    function animate(time) {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const revealedLength = Math.floor(progress * length);

      let output = '';
      for (let i = 0; i < length; i++) {
        if (i < revealedLength || finalString[i] === ' ' || finalString[i] === '·' || finalString[i] === '—') {
          output += finalString[i];
        } else {
          output += CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
        }
      }

      element.textContent = output;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.textContent = finalString;
      }
    }

    requestAnimationFrame(animate);
  }

  function initTextScramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const targets = document.querySelectorAll('.eyebrow span, .gateway-big, .milestone-num');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.scrambled) {
          entry.target.dataset.scrambled = 'true';
          const orig = entry.target.textContent.trim();
          scrambleText(entry.target, orig, 700);
        }
      });
    }, { threshold: 0.2 });

    targets.forEach(t => observer.observe(t));
  }

  /* ─────────────────────────────────────────────────────────────
     4. Top Scroll Progress Indicator Fallback (Modern Web Guidance)
     ───────────────────────────────────────────────────────────── */
  function initScrollProgress() {
    const progressBar = document.getElementById('siteScrollProgress');
    if (!progressBar) return;

    // If CSS animation-timeline is natively supported, CSS handles it directly on compositor thread
    if (CSS.supports && CSS.supports('animation-timeline', 'scroll()')) {
      return;
    }

    // Fallback for browsers without CSS scroll-timeline
    window.addEventListener('scroll', () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) {
        const progress = Math.min(Math.max(window.scrollY / scrollable, 0), 1);
        progressBar.style.transform = `scaleX(${progress})`;
      }
    }, { passive: true });
  }

  // Master Init
  document.addEventListener('DOMContentLoaded', () => {
    init3DTilt();
    initTextScramble();
    initScrollProgress();
  });

  // Re-run tilt if dynamic items are injected
  window.refresh3DTilt = init3DTilt;
})();
