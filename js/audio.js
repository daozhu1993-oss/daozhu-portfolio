/**
 * 数字群岛 · 海岛环境音效合成器 (audio.js)
 * 采用原生 Web Audio API 实时程序化合成海浪微风与吉他泛音，零外部资源依赖
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
    if (audioCtx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
  }

  // 合成柔和海浪与风声 (Ocean Wave Generator)
  function startOcean() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    // 1. 生成白噪点缓冲区
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // 2. 带通/低通滤波模拟浪潮声
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(320, audioCtx.currentTime);

    // 3. LFO 低频振荡器模拟潮起潮落 (周期 6 秒，与 v2 站点的 waveMove 保持一致)
    lfoNode = audioCtx.createOscillator();
    lfoNode.frequency.setValueAtTime(0.16, audioCtx.currentTime); // ~6.2 秒一次涨落

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(220, audioCtx.currentTime);

    lfoNode.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);

    // 4. 总增益输出
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 2);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    lfoNode.start();
    isPlaying = true;
  }

  function stopOcean() {
    if (!isPlaying || !gainNode) return;
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    setTimeout(() => {
      try {
        if (noiseNode) noiseNode.stop();
        if (lfoNode) lfoNode.stop();
      } catch (e) {}
      isPlaying = false;
    }, 1200);
  }

  function toggle() {
    if (isPlaying) {
      stopOcean();
    } else {
      startOcean();
    }
    return !isPlaying; // 返回当前状态
  }

  return {
    toggle: toggle,
    isPlaying: function () { return isPlaying; }
  };
})();
