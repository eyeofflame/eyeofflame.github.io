# 用 Fuwari 搭一个博客，并部署到 GitHub Pages

> 本教程基于 2026-11 的 Fuwari 主线版本（Astro 5.13 / pnpm 9），在 Windows + Git Bash 下实测通过。
> 配套项目就在本目录：`E:\Drifter\Downloads\temp\fuwari-blog`，已装好依赖、改好配置、写好部署工作流。

---

## 0. 先看效果

项目已经跑起来了：

- 本地预览：<http://localhost:4321>（`pnpm dev` 启动，目前仍在运行）
- 生产构建：`pnpm build` → 输出到 `dist/`，实测 9 个页面、约 4.7 MB

想自己重启开发服务器：

```bash
cd /e/Drifter/Downloads/temp/fuwari-blog
pnpm dev          # 打开 http://localhost:4321
```

---

## 1. 环境准备

| 依赖 | 要求 | 你这台机器 |
|---|---|---|
| Node.js | 官方建议 ≤ 22（v20 / v22 LTS 最稳） | 已装 **v26.13.0**，实测可正常构建 |
| pnpm | 官方建议 ≤ 9（`package.json` 里锁的是 `9.14.4`） | 已装 **12.14.0**，会自动切到 9.14.4 |
| Git | 任意较新版本 | 已装 2.56.0 |

如果换一台机器，从零安装：

```bash
# 安装 Node（Windows 推荐 nvm-windows，或官网下 LTS 22）
# 安装 pnpm
npm install -g pnpm@9
# 验证
node -v && pnpm -v

# 国内加速 npm 下载（本项目已默认走 npmmirror）
pnpm config set registry https://registry.npmmirror.com
```

> **为什么必须用 pnpm**：`package.json` 里的 `preinstall` 脚本会执行 `npx only-allow pnpm`，用 npm / yarn 安装会直接报错退出。

---

## 2. 拿到 Fuwari 模板

三种方式，按需选一种。

### 方式 A：`create-fuwari`（最推荐，干净、无原作者历史）

```bash
pnpm create fuwari@latest my-blog
cd my-blog
```

### 方式 B：在 GitHub 上点 “Use this template”

打开 <https://github.com/saicaca/fuwari>，点右上角 **Use this template → Create a new repository**，
这样得到的仓库历史干净，之后直接在网页里改也行。

### 方式 C：clone / 下载压缩包

```bash
# 直连
git clone https://github.com/saicaca/fuwari.git my-blog

# 国内 GitHub 连不上时，加一层镜像（本机实测可用）
git clone https://gh-proxy.com/https://github.com/saicaca/fuwari.git my-blog
```

⚠️ 直接 clone 会带着原作者的提交历史。之后要 `git remote set-url origin <你的仓库>`，
不介意也无所谓。

> 本机实测：`github.com` 的 TLS 握手会失败（`unexpected eof while reading`），
> 用上面 `gh-proxy.com` 的镜像下载 tarball 是可行的；`npm` 仓库本身访问正常。

---

## 3. 安装依赖

```bash
cd my-blog
pnpm install
```

首次安装大约 2 分钟（本机实测 1 分 48 秒）。可能遇到的两类问题：

- **sharp 装不上**：`pnpm add sharp` 重试；仍失败就换 Node 22。
- **Node 版本太新**：官方只写到 ≤22，如果构建报奇怪的错，用 nvm 切到 22 再装。

---

## 4. 本地跑起来

```bash
pnpm dev       # 开发服务器 http://localhost:4321，改文件自动刷新
pnpm build     # 构建到 dist/（会顺带生成 Pagefind 搜索索引）
pnpm preview   # 预览构建结果
```

---

## 5. 改成你自己的博客（核心文件只有两个）

### 5.1 `src/config.ts`：站点信息

这是最常改的文件，本机已经按你的信息改好：

```ts
export const siteConfig: SiteConfig = {
  title: "Eyeofflame643",          // 浏览器标签 / SEO 标题
  subtitle: "记录折腾与生活",        // 首页大标题下面的小字
  lang: "zh_CN",                   // 界面语言：zh_CN / zh_TW / en / ja ...
  themeColor: {
    hue: 160,                      // 主题色相，0-360，你现在是薄荷绿
    fixed: false,                  // true = 固定颜色，隐藏访客的换色按钮
  },
  banner: {
    enable: true,                  // 首页顶部横幅
    src: "assets/images/demo-banner.png", // 相对 /src；以 / 开头则相对 /public
    position: "center",            // top | center | bottom
    credit: { enable: false, text: "", url: "" },
  },
  toc: { enable: true, depth: 2 }, // 文章右侧目录
};
```

**主题色 hue 对照表**（改 `hue` 一个数字即可换整站配色）：

| hue | 颜色 | hue | 颜色 |
|---|---|---|---|
| 0 | 红 | 160 | 薄荷绿（当前） |
| 30 | 暖橙 | 200 | 青 |
| 60 | 黄 | 250 | 天青蓝 |
| 120 | 绿 | 300 | 紫 |
| 345 | 奶油粉 | 360 | 红 |

`navBarConfig`（导航栏）和 `profileConfig`（左栏头像 / 昵称 / 社交链接）也在同一个文件：

```ts
export const navBarConfig: NavBarConfig = {
  links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About,
    { name: "GitHub", url: "https://github.com/Eyeofflame643", external: true }],
};

export const profileConfig: ProfileConfig = {
  avatar: "assets/images/demo-avatar.png", // 换成自己的头像
  name: "Eyeofflame643",
  bio: "在折腾中慢慢变强。",
  links: [{ name: "GitHub", icon: "fa6-brands:github", url: "https://github.com/Eyeofflame643" }],
};
```

- 图标代码去 <https://icones.js.org/> 查，格式 `图标集:图标名`
- 用了没装的图标集要先 `pnpm add @iconify-json/<icon-set-name>`
- 内部链接**不要**手写 base 路径，框架会自动拼

### 5.2 换头像 / 横幅图 / 图标

| 想换 | 放哪里 | 怎么引用 |
|---|---|---|
| 头像 | `src/assets/images/` 或 `public/` | `avatar: "assets/images/xxx.png"`（相对 src）或 `avatar: "/xxx.png"`（相对 public） |
| 横幅 | 同上 | 同上，改 `banner.src` |
| 站点图标 | `public/favicon/` | 填到 `siteConfig.favicon` 数组里 |
| 文章封面 | 和 `.md` 放在同一目录 | frontmatter 里 `image: ./cover.jpg` |

记不住就记一句：**`src/assets` 里的图构建时会被优化（推荐），`public` 里的图原样复制**。

### 5.3 `astro.config.mjs`：部署地址（部署前必改）

```js
site: "https://Eyeofflame643.github.io/",
base: "/",
```

这两行决定了生成的链接和资源路径，规则见第 7 节。

---

## 6. 写文章

```bash
pnpm new-post 我的第一篇文章
```

会在 `src/content/posts/` 生成 `我的第一篇文章.md`，然后编辑它。

### Frontmatter 字段

```yaml
---
title: 文章标题
published: 2026-11-01        # 必填，日期或完整时间
updated: 2026-11-02          # 可选
description: 一句话摘要，会显示在卡片和搜索结果里
image: ./cover.jpg           # 可选，封面图（和 md 同目录）
tags: [Astro, 折腾]
category: 随笔                # 可选，侧栏分类靠它
draft: false                 # true 表示草稿，不会发布
lang: ''                     # 文章语言和站点语言不同时才填，如 'en'
---
```

### 支持的 Markdown 扩展

````markdown
:::note
提示框，还有 :::tip :::important :::caution :::warning
:::

::github{repo="saicaca/fuwari"}
（渲染成 GitHub 仓库卡片）

```js title="demo.js" showLineNumbers
console.log("带标题、行号和复制按钮的代码块")
```

$$ E = mc^2 $$        （数学公式，KaTeX）

![图片](./cover.jpg)   （点击可放大，PhotoSwipe）
````

> 提示：`draft: true` 的文章不会出现在构建结果里，写完改成 false 再 push。
> **搜索功能只在 `pnpm build` 之后才会索引**，`pnpm dev` 下搜索是空的，属于正常现象。

---

## 7. 部署到 GitHub Pages

### 7.1 先决定仓库名（决定访问地址）

| 仓库名 | 访问地址 | `site` | `base` |
|---|---|---|---|
| `Eyeofflame643.github.io` | `https://Eyeofflame643.github.io/` | `https://Eyeofflame643.github.io/` | `/` |
| `blog`（任意名字） | `https://Eyeofflame643.github.io/blog/` | `https://Eyeofflame643.github.io` | `/blog/` |

你现在用的是第一种（最省事，地址最短）。如果改主意用第二种，**必须**同步改 `astro.config.mjs` 里的 `base`，否则 CSS/JS 全部 404——这是新手最常见的坑。

### 7.2 创建仓库并 push

在 GitHub 上新建空仓库（**不要**勾选初始化 README），然后：

```bash
cd /e/Drifter/Downloads/temp/fuwari-blog
git remote add origin https://github.com/Eyeofflame643/Eyeofflame643.github.io.git
git push -u origin main
```

> 本机已经 `git init -b main` 并提交过一次（`初始化 Fuwari 博客`），直接 push 即可。
> 本机 git 直连 github.com 会 TLS 失败，push 时可能需要开代理：
> `git config --global http.proxy http://127.0.0.1:7890`（端口换成你代理的）。

### 7.3 工作流文件已经写好了

`.github/workflows/deploy.yml` 会在每次 push 到 `main` 时：

1. 拉代码 → 装 pnpm（读 `package.json` 里的 `packageManager: pnpm@9.14.4`）
2. 装 Node 22 + 依赖（`pnpm install --frozen-lockfile`）
3. `pnpm build`（Astro 构建 + Pagefind 搜索索引）
4. 把 `dist/` 作为 Pages 制品上传，再发布

第一次跑大概 2-4 分钟。

### 7.4 打开 Pages

仓库 **Settings → Pages → Build and deployment → Source** 选 **GitHub Actions**（不是 Deploy from a branch）。

然后回 **Actions** 标签页看 “Deploy to GitHub Pages” 是否变绿。绿了点进 job 的 `deploy` 步骤，能看到最终 URL。

### 7.5 自定义域名（可选）

1. 在 `public/CNAME` 里写一行你的域名，例如 `blog.example.com`（没有这个文件就新建）
2. 域名商处加一条 `CNAME` 记录指向 `Eyeofflame643.github.io`
3. 仓库 Settings → Pages → Custom domain 填域名 → 勾 **Enforce HTTPS**
4. 同时把 `astro.config.mjs` 的 `site` 改成 `https://blog.example.com/`

### 7.6 以后怎么发文章

```bash
pnpm new-post 新文章名     # 写内容
git add -A
git commit -m "新文章：xxx"
git push                   # push 完等 Actions 自动部署，1-3 分钟上线
```

本地想先看效果就 `pnpm dev`。

---

## 8. 常见坑清单

1. **部署后页面没样式 / 全是 404**：`base` 没配对。项目仓库必须是 `/仓库名/`。
2. **Actions 报 “Get Pages site failed”**：Settings → Pages 的 Source 没选 GitHub Actions，或 Actions 权限不足（Settings → Actions → General → Workflow permissions 选 Read and write）。
3. **Actions 报 pnpm 版本不对**：别在 workflow 里手写 `version: 9` 和 `packageManager` 冲突；本项目让 `pnpm/action-setup` 自动读 `packageManager`。
4. **`only-allow pnpm` 报错**：用了 npm/yarn 装依赖，删掉 `node_modules` 和 lockfile 后用 pnpm 重来。
5. **sharp 安装失败**：Node 版本太新或网络问题，换 Node 22、换 registry 重试。
6. **搜索搜不到东西**：`pnpm dev` 下本来就没有索引，`pnpm build` 后才有。
7. **GitHub Pages 限制**：仓库 ≤1 GB、每月 100 GB 流量、每小时约 10 次构建；私有仓库用 Pages 需要 GitHub Pro（免费账号请用公开仓库）。
8. **国内访问慢**：套 Cloudflare CDN；或者同一份代码部署到 Cloudflare Pages（构建命令 `pnpm build`、输出目录 `dist`、Node 22），连接 GitHub 仓库后同样自动部署，通常比 Pages 快。
9. **改了配置但线上没变**：确认 push 的分支是 `main`，且 Actions 真的跑完了；Pages 有 1-2 分钟缓存。

---

## 9. 还能往上加什么

- **评论**：Fuwari **没有内置评论**。常见做法是接 [Giscus](https://giscus.app/)（基于 GitHub Discussions，零后端）或 [Waline](https://waline.js.org/)（需要部署服务端）。要在 `src/components/PostPage.astro` 里加组件，官方 issue 里有别人的实现可以参考。
- **访问统计**：Cloudflare Web Analytics（免费、无 cookie）、Umami（自建或云）、Google Analytics（改 `Layout.astro`）。
- **图片**：放 `src/assets/images/` 会被自动压缩优化；图多的话考虑图床 + `public/`。
- **多语言**：`lang` 字段 + `src/i18n/languages/` 里已有 zh_CN / zh_TW / en / ja / ko 等。
- **升级主题**：用 template 建仓库的，可以 `git remote add upstream https://github.com/saicaca/fuwari` 后 `git fetch upstream && git merge upstream/main`；改动多的话建议直接对 diff 手动合。

---

## 10. 这份项目里已经做了什么 / 你还要做什么

**已经完成：**

- ✅ 下载 Fuwari 主线模板，`pnpm install` 装好依赖
- ✅ `pnpm build` 构建通过（9 页，含搜索索引）
- ✅ `pnpm dev` 跑通，<http://localhost:4321>
- ✅ `src/config.ts`：站点名、副标题、`zh_CN`、薄荷绿 160、开启 banner、导航、个人资料
- ✅ `astro.config.mjs`：`site` 指向 `https://Eyeofflame643.github.io/`，`base: "/"`
- ✅ 示例文章 `src/content/posts/hello-fuwari.md`
- ✅ 部署工作流 `.github/workflows/deploy.yml`
- ✅ `git init` + 首次提交（125 个文件）

**你需要做的：**

1. 在 GitHub 建仓库 `Eyeofflame643.github.io`
2. `git remote add origin ...` 然后 `git push -u origin main`（git 直连不通就开代理）
3. Settings → Pages → Source 选 **GitHub Actions**
4. 等 Actions 变绿，访问 `https://Eyeofflame643.github.io/`
5. 把 `src/assets/images/demo-avatar.png`、`demo-banner.png` 换成自己的图
6. 删掉 `src/content/posts/` 里自带的演示文章（`markdown.md`、`video.md`、`guide/` 等），或者留着当语法参考

> 如果想让 `src/content/posts/` 里的演示文章不出现，也可以直接删掉整个目录下除自己文章外的文件——构建不会因此报错。
