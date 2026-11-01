---
title: 你好，Fuwari
published: 2026-11-01
description: 第一篇文章：这个博客是怎么搭起来的。
image: ''
tags: [Fuwari, Astro, 折腾]
category: 随笔
draft: false
lang: ''
---

这是用 [Fuwari](https://github.com/saicaca/fuwari) 搭起来的第一篇文章。

## 为什么选 Fuwari

- 基于 **Astro**，构建后就是纯静态文件，扔到 GitHub Pages 就能跑
- 动画和页面切换很顺滑，观感好
- 自带搜索（Pagefind）、目录、暗色模式、RSS
- 配置集中在一个 `src/config.ts` 里，改起来不迷路

## 下一步

1. 改 `src/config.ts` 里的站点名称、头像、主题色
2. 用 `pnpm new-post 文章名` 写新文章
3. push 到 GitHub，让 Actions 自动部署

> 慢慢写，比什么都重要。
