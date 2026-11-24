'use strict';
(function () {
  // ISO/IEC 18004 verified QR V3-M (29x29) encoding "https://www.daozhuai.cn/islands/"
  const QR_ROWS = [
    '11111110010001110111101111111',
    '10000010000111111100101000001',
    '10111010100111010011001011101',
    '10111010111100110110001011101',
    '10111010100010011111101011101',
    '10000010110000000100001000001',
    '11111110101010101010101111111',
    '00000000110110101001100000000',
    '10111110000010001101001111100',
    '11100000100001110111011110001',
    '01100110011111111010100000000',
    '11111001010111010000010101010',
    '01001011101100110101000001100',
    '01101001110110011001111010001',
    '10101010001000000110110101100',
    '00110000110010101000000110010',
    '10101110001010000100000101100',
    '10110101001111110111111110101',
    '10000111111001111000101100100',
    '10110100100011001010101110010',
    '10010011100110100100111110111',
    '00000000001000000011100011111',
    '11111110011010011011101011100',
    '10000010111110100001100010010',
    '10111010101100011100111110110',
    '10111010100110101110000101111',
    '10111010101100110100101111110',
    '10000010010001011010111101010',
    '11111110111101010101011111100',
  ];

  const ISLANDS = [
    { id: 'lighthouse', name: '灯塔观察室', tag: '01 · 观察', color: '#a55233', tilt: -0.07 },
    { id: 'workshop', name: '产品工坊', tag: '02 · 工坊', color: '#2e5c50', tilt: 0.05 },
    { id: 'stories', name: '故事小屋', tag: '03 · 故事', color: '#8f5d32', tilt: -0.04 },
    { id: 'harbor', name: '岛主的港口', tag: '04 · 港口', color: '#335869', tilt: 0.06 },
    { id: 'play', name: '游戏码头', tag: '05 · 码头', color: '#9a4c3e', tilt: -0.05 },
    { id: 'atelier', name: '旅行与创作', tag: '06 · 事务', color: '#456447', tilt: 0.04 },
  ];

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function loadMapArtwork() {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = '../assets/archipelago-map.webp';
    });
  }

  function formatDate() {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}.${m}.${day}`;
  }

  function drawStamp(ctx, cx, cy, island, isVisited) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(isVisited ? island.tilt : 0);

    const r = 74;
    if (isVisited) {
      ctx.strokeStyle = island.color;
      ctx.fillStyle = island.color + '14';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.arc(0, 0, r - 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = island.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 17px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText(island.tag, 0, -24);

      ctx.font = '700 22px "Songti SC", "Noto Serif SC", serif';
      ctx.fillText(island.name, 0, 2);

      ctx.font = '600 16px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText('已登岛 ✓', 0, 29);
    } else {
      ctx.strokeStyle = '#c4b18e';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, r - 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#9c8c72';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 16px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText(island.tag, 0, -20);

      ctx.font = '600 20px "Songti SC", "Noto Serif SC", serif';
      ctx.fillText(island.name, 0, 4);

      ctx.font = '500 15px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText('待探索', 0, 28);
    }
    ctx.restore();
  }

  function drawQR(ctx, x, y, size) {
    const n = QR_ROWS.length;
    const quiet = 3;
    const cell = Math.floor(size / (n + quiet * 2));
    const box = cell * (n + quiet * 2);
    const ox = x + Math.floor((size - box) / 2);
    const oy = y + Math.floor((size - box) / 2);

    ctx.save();
    roundRect(ctx, x, y, size, size, 14);
    ctx.fillStyle = '#fffdf7';
    ctx.fill();
    ctx.strokeStyle = '#c5ae83';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#244239';
    for (let r = 0; r < n; r++) {
      const row = QR_ROWS[r];
      for (let c = 0; c < n; c++) {
        if (row[c] === '1') {
          ctx.fillRect(ox + (c + quiet) * cell, oy + (r + quiet) * cell, cell, cell);
        }
      }
    }
    ctx.restore();
  }

  async function renderTicketDataUrl(info) {
    const W = 1080;
    const H = 1440;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');

    // Outer background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#274d48');
    bgGrad.addColorStop(1, '#1c3936');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Main parchment ticket body with side tear notches
    const pad = 48;
    const tx = pad;
    const ty = pad;
    const tw = W - pad * 2;
    const th = H - pad * 2;
    const tearY = 1130;

    ctx.save();
    ctx.shadowColor = 'rgba(10, 24, 22, 0.42)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 14;
    roundRect(ctx, tx, ty, tw, th, 28);
    ctx.fillStyle = '#f8edd7';
    ctx.fill();
    ctx.restore();

    // Subtle paper grain dots
    ctx.save();
    roundRect(ctx, tx, ty, tw, th, 28);
    ctx.clip();
    ctx.fillStyle = 'rgba(139, 114, 76, 0.05)';
    for (let y = ty + 16; y < ty + th; y += 26) {
      for (let x = tx + 16; x < tx + tw; x += 26) {
        if (((x * 7 + y * 13) % 5) === 0) ctx.fillRect(x, y, 2, 2);
      }
    }

    // Inner vintage brass frame
    roundRect(ctx, tx + 22, ty + 22, tw - 44, th - 44, 18);
    ctx.strokeStyle = '#c5ad80';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Header band
    ctx.fillStyle = '#7c694d';
    ctx.font = '600 22px -apple-system, "PingFang SC", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('DAOZHU ARCHIPELAGO · BOARDING PASS', tx + 56, ty + 78);

    const passNo = info.guestNumber > 0
      ? 'NO. ' + String(info.guestNumber).padStart(5, '0')
      : 'NO. VOYAGE';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#a35235';
    ctx.font = '700 24px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText(passNo, tx + tw - 56, ty + 78);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#29453c';
    ctx.font = '700 54px "Songti SC", "Noto Serif SC", serif';
    ctx.fillText('数字群岛 · 登岛船票', tx + 54, ty + 148);

    // Artwork showcase window
    const artX = tx + 54;
    const artY = ty + 182;
    const artW = tw - 108;
    const artH = 396;
    const mapImg = await loadMapArtwork();

    ctx.save();
    roundRect(ctx, artX, artY, artW, artH, 16);
    ctx.clip();
    if (mapImg) {
      ctx.drawImage(mapImg, artX, artY, artW, artH);
    } else {
      const seaGrad = ctx.createLinearGradient(artX, artY, artX, artY + artH);
      seaGrad.addColorStop(0, '#367472');
      seaGrad.addColorStop(1, '#1f5053');
      ctx.fillStyle = seaGrad;
      ctx.fillRect(artX, artY, artW, artH);
    }
    const scrim = ctx.createLinearGradient(0, artY + artH - 120, 0, artY + artH);
    scrim.addColorStop(0, 'rgba(18, 43, 40, 0)');
    scrim.addColorStop(1, 'rgba(18, 43, 40, 0.78)');
    ctx.fillStyle = scrim;
    ctx.fillRect(artX, artY + artH - 120, artW, 120);

    ctx.fillStyle = '#fff3d8';
    ctx.font = '600 26px "Songti SC", "Noto Serif SC", serif';
    ctx.fillText('我的个人网站，要坐船逛', artX + 26, artY + artH - 30);
    ctx.textAlign = 'right';
    ctx.font = '500 20px -apple-system, "PingFang SC", sans-serif';
    ctx.fillStyle = '#f3ddb0';
    ctx.fillText(formatDate(), artX + artW - 26, artY + artH - 30);
    ctx.restore();

    roundRect(ctx, artX, artY, artW, artH, 16);
    ctx.strokeStyle = '#b99f72';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Passenger info strip
    const infoY = artY + artH + 46;
    ctx.textAlign = 'left';
    ctx.fillStyle = '#7c694d';
    ctx.font = '600 20px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText('乘船代号', artX, infoY);

    ctx.fillStyle = '#29453c';
    ctx.font = '700 38px "Songti SC", "Noto Serif SC", serif';
    const displayName = info.isHost ? `✦ ${info.name || '岛主'}（岛主亲航）` : (info.name || '海岛旅人');
    ctx.fillText(displayName, artX, infoY + 48);

    ctx.fillStyle = '#526758';
    ctx.font = '500 23px -apple-system, "PingFang SC", sans-serif';
    const guestLine = info.guestNumber > 0
      ? `第 ${info.guestNumber} 位来岛主这里坐客的旅人 · 已打卡 ${info.visited.size} / 6 座小岛`
      : `数字群岛航行旅人 · 已打卡 ${info.visited.size} / 6 座小岛`;
    ctx.fillText(guestLine, artX, infoY + 92);

    // Subtle divider
    ctx.strokeStyle = '#d8c59f';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(artX, infoY + 118);
    ctx.lineTo(artX + artW, infoY + 118);
    ctx.stroke();

    // 2x3 Island passport stamps
    const stampTop = infoY + 216;
    const colXs = [artX + 148, artX + artW / 2, artX + artW - 148];
    const rowYs = [stampTop, stampTop + 178];
    ISLANDS.forEach((island, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      drawStamp(ctx, colXs[col], rowYs[row], island, info.visited.has(island.id));
    });

    // All 6 islands collected golden seal
    if (info.visited.size >= 6) {
      ctx.save();
      ctx.translate(artX + artW - 102, infoY + 40);
      ctx.rotate(0.08);
      roundRect(ctx, -96, -24, 192, 48, 24);
      ctx.fillStyle = '#d9a441';
      ctx.fill();
      ctx.strokeStyle = '#8b5e1a';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#243c34';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '700 20px -apple-system, "PingFang SC", sans-serif';
      ctx.fillText('★ 全岛航迹达成', 0, 1);
      ctx.restore();
    }

    // Perforated tear-off line
    ctx.strokeStyle = '#bfa67a';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([12, 10]);
    ctx.beginPath();
    ctx.moveTo(tx + 30, tearY);
    ctx.lineTo(tx + tw - 30, tearY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Footer stub + verified QR code
    const stubY = tearY + 34;
    drawQR(ctx, tx + tw - 54 - 186, stubY, 186);

    ctx.textAlign = 'left';
    ctx.fillStyle = '#29453c';
    ctx.font = '700 32px "Songti SC", "Noto Serif SC", serif';
    ctx.fillText('换你掌舵，下一站去哪座岛？', artX, stubY + 54);

    ctx.fillStyle = '#5c6d5d';
    ctx.font = '500 22px -apple-system, "PingFang SC", sans-serif';
    ctx.fillText('扫码登船 · 逛产品工坊、故事小屋、游戏码头', artX, stubY + 100);

    ctx.fillStyle = '#a35235';
    ctx.font = '600 24px ui-monospace, SFMono-Regular, Menlo, monospace';
    ctx.fillText('daozhuai.cn/islands/', artX, stubY + 148);

    ctx.restore();

    // Punch circular ticket notches into outer edges
    ctx.fillStyle = '#21423e';
    ctx.beginPath();
    ctx.arc(tx, tearY, 22, 0, Math.PI * 2);
    ctx.arc(tx + tw, tearY, 22, 0, Math.PI * 2);
    ctx.fill();

    return canvas.toDataURL('image/png');
  }

  window.initVoyageTicket = function initVoyageTicket(getState) {
    const openBtn = document.getElementById('open-ticket');
    const dialog = document.getElementById('ticket-dialog');
    const previewImg = document.getElementById('ticket-preview');
    const downloadLink = document.getElementById('ticket-download');
    const copyBtn = document.getElementById('ticket-copy');
    const closeBtn = document.getElementById('ticket-close');
    const statusEl = document.getElementById('ticket-status');
    if (!openBtn || !dialog || !previewImg) return;

    let latestDataUrl = '';
    let latestState = null;

    openBtn.addEventListener('click', async () => {
      latestState = getState();
      if (statusEl) statusEl.textContent = '正在印制你的登岛船票…';
      if (!dialog.open) dialog.showModal();
      try {
        latestDataUrl = await renderTicketDataUrl(latestState);
        previewImg.src = latestDataUrl;
        if (downloadLink) {
          downloadLink.href = latestDataUrl;
          downloadLink.download = `数字群岛-登岛船票-${latestState.name || '旅人'}.png`;
        }
        if (statusEl) {
          statusEl.textContent = '船票印好了！点击下方保存，或在手机上直接长按船票存进相册。';
        }
      } catch {
        if (statusEl) statusEl.textContent = '船票生成遇到一点小插曲，请稍后再试。';
      }
    });

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const s = latestState || getState();
        const count = s.visited.size;
        const guestText = s.guestNumber > 0 ? `，是第 ${s.guestNumber} 位来岛主这里坐客的旅人` : '';
        const text = `我刚坐船逛了「岛主的数字群岛」，打卡了 ${count}/6 座小岛${guestText} ⛵ 换你掌舵，第一站想去哪座岛？https://www.daozhuai.cn/islands/`;
        try {
          await navigator.clipboard.writeText(text);
          if (statusEl) statusEl.textContent = '分享文案已复制，可直接贴到小红书、朋友圈或 X！';
        } catch {
          if (statusEl) statusEl.textContent = text;
        }
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => dialog.close());
    }
  };
})();
