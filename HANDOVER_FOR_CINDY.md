# 岛主全站生态运维交接手册（致 Cindy）

> 本手册用于指导个人官方网站（`daozhuai.cn`）及旗下「数字群岛」生态各子项目的日常维护、内容更新、新项目上线与边缘部署。

---

## 目录
1. [全站技术架构全景图](#一全站技术架构全景图)
2. [关键账号与权限凭据](#二关键账号与权限凭据)
3. [本地工程与代码仓库分布](#三本地工程与代码仓库分布)
4. [日常高频操作 SOP](#四日常高频操作-sop)
   - [SOP 1：主站内容更新（改经历、加作品、改文字）](#sop-1主站内容更新改经历加作品改文字)
   - [SOP 2：子项目代码更新（如旅行手账、神话杂志）](#sop-2子项目代码更新如旅行手账神话杂志)
   - [SOP 3：新做一个子网站并上线专属二级域名](#sop-3新做一个子网站并上线专属二级域名)
5. [必须遵守的 5 条「避坑铁律」](#五必须遵守的-5-条避坑铁律)

---

## 一、全站技术架构全景图

- **主站门户**：[https://www.daozhuai.cn/](https://www.daozhuai.cn/)（备用镜像：[https://daozhu-portfolio.pages.dev/](https://daozhu-portfolio.pages.dev/)）
- **数字群岛（部分二级域名）**：
  - 神话杂志：`https://myth.daozhuai.cn/`
  - 旅行手账：`https://travel.daozhuai.cn/`
  - 3D 绘本馆：`https://storybook.daozhuai.cn/`
  - 八十天环游地球：`https://fogg.daozhuai.cn/`
  - 编剧手艺工坊：`https://script.daozhuai.cn/`
  - 阿Q交互小剧场：`https://aq.daozhuai.cn/`

### 架构核心特点：
1. **统一门面，数据解耦**：
   - 个人门户主站全部内容（作品卡片、外链、经历、数据指标）都抽象在 `js/matrix-data.js` 中，**改数据不需要翻动 HTML 复杂布局**。
2. **轻量边缘反代（Worker Proxy 架构）**：
   - 子项目（如神话杂志、旅行手账）源码存放在各自独立的 GitHub 仓库并启用 GitHub Pages。
   - 通过在 Cloudflare 上部署轻量 Worker（如 `daozhu-myth-proxy`、`daozhu-travel-proxy`），绑定 `custom_domain: true`。
   - **好处**：无需在外部单独买服务器，全球节点 CDN 加速，自动申请与续签泛域名 SSL 证书，且自带穿透时间戳，GitHub 推送后秒级生效。

---

## 二、关键账号与权限凭据

Cindy 需要拥有以下平台的操作权限：

| 平台 | 账号 / 组织 | 核心作用 |
| :--- | :--- | :--- |
| **Cloudflare** | `daozhu1993@gmail.com`<br>Account ID: `63df525f13a28471e1dff3105566151b`<br>Zone ID: `4a9c11deeb79394bd062987ae70d1507` | 管理域名解析、Workers、Pages、SSL 证书与边缘缓存。本地终端只需执行 `npx wrangler login` 授权即可。 |
| **GitHub** | `daozhu1993-oss` | 存放各工程代码仓库（主站及各个子应用），CI/CD 联动 GitHub Pages。 |
| **商务合作联系** | 商务邮箱: `daozhu1993@gmail.com` | 主站弹窗与页脚关联的联系方式。 |

---

## 三、本地工程与代码仓库分布

本地根目录位于：`/Users/gx/.gemini/antigravity/scratch/`

```text
scratch/
├── daozhu-portfolio/          # 【核心】主站个人门户源码 (www.daozhuai.cn)
├── daozhu-travel-proxy/       # 旅行手账反代 Worker (travel.daozhuai.cn)
├── daozhu-myth-proxy/         # 神话杂志反代 Worker (myth.daozhuai.cn)
├── daozhu-storybook-proxy/    # 3D 绘本馆反代 Worker (storybook.daozhuai.cn)
├── daozhu-fogg-proxy/         # 八十天环游地球反代 Worker (fogg.daozhuai.cn)
├── daozhu-script/             # 编剧手艺工坊工程
└── ...                        # 其他独立游戏与工具项目
```

---

## 四、日常高频操作 SOP

### SOP 1：主站内容更新（改经历、加作品、改文字）

1. **进入工程目录**：
   ```bash
   cd /Users/gx/.gemini/antigravity/scratch/daozhu-portfolio
   ```
2. **修改数据**：
   - 如果是改经历、改作品卡片、加链接：直接编辑 `js/matrix-data.js`。
   - 如果是改基础 HTML 框架或文案：直接编辑 `index.html`。
3. **关键：更新版本戳（防缓存）**：
   - 打开 `index.html` 底部，将 `js/matrix-data.js?v=...` 中的版本号加 1（例如由 `20261114_travel_v2` 改为 `20261115_v1`）。
4. **提交并部署（双引擎同步上线）**：
   ```bash
   # 1. 提交至 GitHub
   git commit -am "feat: 更新内容说明"
   git push origin main

   # 2. 部署至主域名 Worker
   npx wrangler deploy --name daozhu-portfolio --assets=. --compatibility-date=2026-10-12

   # 3. 部署至 Pages 镜像站
   npx wrangler pages deploy . --project-name=daozhu-portfolio --branch=main
   ```

---

### SOP 2：子项目代码更新（如旅行手账、神话杂志）

由于子项目的 Worker 反代内置了 `ts=${Date.now()}` 动态时间戳穿透机制：
1. 只需要在对应的子项目 GitHub 仓库（或本地子项目工程）正常修改代码并 `git push` 到 GitHub。
2. GitHub Pages 构建完毕后（通常约 30 秒），打开 `https://travel.daozhuai.cn/` 或 `https://myth.daozhuai.cn/` 就会直接生效，**无需重复部署 Worker**。

---

### SOP 3：新做一个子网站并上线专属二级域名

如果岛主新做了一个项目（例如 `game.daozhuai.cn`，上游托管在 GitHub Pages）：

1. **新建反代目录**：
   ```bash
   mkdir -p /Users/gx/.gemini/antigravity/scratch/daozhu-game-proxy
   cd /Users/gx/.gemini/antigravity/scratch/daozhu-game-proxy
   ```
2. **创建 `wrangler.jsonc`**：
   ```jsonc
   {
     "name": "daozhu-game",
     "main": "worker.js",
     "compatibility_date": "2026-09-08",
     "observability": { "enabled": true },
     "routes": [
       {
         "pattern": "game.daozhuai.cn",
         "custom_domain": true
       }
     ]
   }
   ```
3. **创建 `worker.js`**：
   参考 `daozhu-travel-proxy/worker.js`，将 `upstreamBase` 改为对应的 GitHub Pages 地址（如 `https://daozhu1993-oss.github.io/game`），将 `X-Daozhu-Edge` 设置为 `game.daozhuai.cn`。
4. **一键上线**：
   ```bash
   npx wrangler deploy
   ```
   *Cloudflare 会自动完成 DNS 记录注入和全球 SSL 证书签发，通常 1 分钟内全球通达。*
5. **在主站矩阵中挂出该卡片**：
   编辑 `daozhu-portfolio/js/matrix-data.js` 加入新卡片，按 SOP 1 流程部署。

---

## 五、必须遵守的 5 条「避坑铁律」

1. ⚠️ **切勿在 Cloudflare DNS 页面手动乱删 CNAME 记录**：
   - 子域名绑定是由 Workers Custom Domains（`custom_domain: true`）统一纳管的，手动去改 DNS 可能会导致 SSL 证书回退或路由失效。
2. ⚠️ **每次改 JS / CSS 务必在 `index.html` 改版本号（`?v=...`）**：
   - 主站为了首屏极致加载，静态资源在边缘节点设置了长期缓存。如果不改版本号，访客手机端会一直看到旧版缓存。
3. ⚠️ **保持图片瘦身（AVIF + WebP 优先）**：
   - 主站有很高的视觉要求，但切忌直接上传 2MB~5MB 的单反大图。请先通过工具压缩至 AVIF/WebP，单张图片体积控制在 150KB 以内，并在 `<picture>` 标签中提供兜底。
4. ⚠️ **双引擎同步部署（Worker + Pages）**：
   - 官方主域名绑在 Worker 上，而 Pages.dev 是核心灾备镜像，每次修改主站务必同时运行 Worker deploy 和 Pages deploy 两条指令。
5. ⚠️ **密钥安全（BYOK 模式原则）**：
   - 旅行手账等 AI 工具采用用户自备 API Key（BYOK）设计，前端代码中绝不能硬编码岛主个人的 Gemini / OpenAI / DeepSeek 生产 API 私钥。
