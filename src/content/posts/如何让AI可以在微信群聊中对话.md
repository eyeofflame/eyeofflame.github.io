---
title: 如何让AI可以在微信群聊中对话
published: 2026-11-07
description: '让你的大肥鱼成为微信群聊里的“人”'
image: ''
tags: [dsh,教程]
category: 'dsh'
draft: false 
lang: 'cn'
---

# 使用WeChatAgent将DSH接入微信
本文具有一定时效性，会过期
## 前置要求：  
- dsh(桌面版与npm版均可，npm版需要安装pnpm )
- 科学上网（建议）
- 一个微信小号
- 一双nb的手和一个干净的windows10/11系统    

在GitHub上搜索WeChatAgent，在Release页面下载最新版     
找不到可以点击该链接<https://github.com/sourcepro5/WeChatAgent>     

# 初始配置
下载安装完该软件后，打开，将会看到首次配置的界面![](/wechatagent/wechatagent_1.png)     
先点击“验证内置环境”，无报错后继续  
点击“打开微信”，注意，不是打开自己下载的微信  

这里如果点了之后没反应可以在```安装路径\data\workspace\state\hook\wechat-4.1.15.13```里面手动点击打开```Wechat.exe```

随后打开你的dsh：
```
npm版：dsh web
桌面版：在dsh程序位置里面选择你安装的桌面版的路径中的Deepseek Harness.exe
```

再然后，点击WeChatAgent中的```复制插件路径```按钮，将其复制到dsh安装插件的地方  
![](/wechatagent/wechatagent_2.png)

登录微信小号

在WeChatAgent内往下滑，找到```连接自己的微信```，点击```自动查找账号```。若无效则自己选择```微信账号目录```，再点```识别此目录```

选择```当前账号```，点击```一键连接并验证```


成功后则可在下面点击```启动服务```

# 后续配置
这应该是人都会吧，可以自行在WeChatAgent内摸索