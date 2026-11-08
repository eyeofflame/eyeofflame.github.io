---
title: dsh安装教程（npm）
published: 2026-11-01
description: '安装npm版dsh'
image: ''
tags: [dsh,教程]
category: 'dsh'
draft: false 
lang: 'cn'
---

环境要求```nodejs 24+```，最好lts版本。操作建议使用```PowerShell```    

# 安装```nodejs```
```
powershell -c "irm https://community.chocolatey.org/install.ps1|iex"
choco install nodejs --version="26.13.0"
``` 
安装完运行```node -v```和```npm -v```,正常输出版本号即可

# 换源
运行```npm config set registry https://registry.npmmirror.com```将软件包源换为阿里云源以加速后续dsh下载

# 安装
先```npm -v```查看npm版本   
对于npm版本≤11的，可直接运行```npm i -g @deepseek-ai/dsh@latest```下载并安装    
而npm版本≥12的，则需先运行```npm config set dangerously-allow-all-scripts true```再运行上面的下载命令   
安装完后再运行```npm i -g pnpm```以使dsh支持插件安装

# 运行
安装完后运行```dsh web```,成功后会自动打开浏览器    
注意：不要运行完该命令后就关闭终端，dsh进程与终端共存（若无添加后台运行的指令）