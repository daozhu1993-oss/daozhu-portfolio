/**
 * 数字群岛 · Awwwards / FWA Master Web Audio Synthesis Engine (audio.js)
 * 1. Procedural Ocean Atmosphere & Gentle Tidal Waves (0KB External Files, Pure Math)
 * 2. Tactile UI Micro-Click & Acoustic Feedback on Interactive Elements
 * 3. Reactive Header Equalizer Indicator & Persistent State
 */

window.IslandAudio = (function () {
  'use strict';

  let audioCtx = null;
  let isPlaying = false;
  let noiseNode = null;
  let filterNode = null;
  let gainNode = null;
  let lfoNode = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // 1. Procedural Ambient Ocean Synthesizer
  function startOcean() {
    initAudio();

    // Generate white noise buffer
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Lowpass filter for deep muffled ocean waves
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(280, audioCtx.currentTime);

    // LFO (Low-Frequency Oscillator) for tidal ebb and flow (~6.2s wave cycle)
    lfoNode = audioCtx.createOscillator();
    lfoNode.frequency.setValueAtTime(0.16, audioCtx.currentTime);

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(190, audioCtx.currentTime);

    lfoNode.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);

    // Master ambient gain with smooth crossfade
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.075, audioCtx.currentTime + 2.5);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    lfoNode.start();
    isPlaying = true;
    updateUI(true);
  }

  function stopOcean() {
    if (!isPlaying || !gainNode) return;
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      try {
        if (noiseNode) noiseNode.stop();
        if (lfoNode) lfoNode.stop();
      } catch (e) {}
      isPlaying = false;
      updateUI(false);
    }, 1200);
  }

  // 2. Synthesized UI Tactile Acoustic Feedback (Micro-Clicks & Pops)
  function playClickPop() {
    if (!isPlaying) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const clickGain = audioCtx.createGain();

      osc.type = 'sine';
      // Crisp 900Hz drop to 200Hz in 25ms (gentle wooden pop)
      osc.frequency.setValueAtTime(920, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(220, audioCtx.currentTime + 0.025);

      clickGain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      clickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.025);

      osc.connect(clickGain);
      clickGain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    } catch (_) {}
  }

  function playHoverTick() {
    if (!isPlaying) return;
    try {
      initAudio();
      const osc = audioCtx.createOscillator();
      const tickGain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.012);

      tickGain.gain.setValueAtTime(0.015, audioCtx.currentTime);
      tickGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.012);

      osc.connect(tickGain);
      tickGain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.015);
    } catch (_) {}
  }

  // 3. UI Sync
  function updateUI(active) {
    const btn = document.getElementById('soundToggleBtn');
    if (!btn) return;
    if (active) {
      btn.classList.add('playing');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('playing');
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  function toggle() {
    if (isPlaying) {
      stopOcean();
      localStorage.setItem('daozhu_audio_enabled', 'false');
      return false;
    } else {
      startOcean();
      localStorage.setItem('daozhu_audio_enabled', 'true');
      return true;
    }
  }

  // Bind to UI elements once loaded
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.addEventListener('click', () => {
        toggle();
      });
    }

    // Attach micro-tactile sounds to buttons and cards
    document.addEventListener('click', (e) => {
      if (e.target.closest('button, a, .bento-card, .service-action-btn, .modal-service-tab')) {
        playClickPop();
      }
    });

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('.nav-link, .journey-dot, .btn, .service-action-btn')) {
        playHoverTick();
      }
    });
  });

  return {
    toggle,
    playClickPop,
    playHoverTick,
    isPlaying: () => isPlaying
  };
})();
