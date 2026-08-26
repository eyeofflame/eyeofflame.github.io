---
date: '2026-08-26T11:13:15+08:00'
draft: false
title: 'git初始配置教程'
---

需要魔法环境

按下Win+X，随后按A打开PowerShell

执行下列命令
``` py
git config --global http.sslVerify false
git config --global https.sslVerify false
git config --global http.postBuffer 100000000000000
git config --global user.name "github user name"
git config --global user.email "github email"
ssh-keygen -t rsa -C "github email"

cat ~\.ssh\id_rsa.pub
## 输入完这行后复制输出内容
```

随后打开github

![can't load this resource!](/git_init/git_init_1.png)

![can't load this resource!](/git_init/git_init_2.png)

![can't load this resource!](/git_init/git_init_3.png)

![can't load this resource!](/git_init/git_init_4.png)

![can't load this resource!](/git_init/git_init_5.png)

这样设置完后点击Add SSH key即可

然后我们需要在```C:\User\<UserName>\.ssh```处新建一个名称```config```的无后缀文件

向其中键入下列文本
```
Host github.com
    HostName ssh.github.com
    User git
    Port 443
```

执行命令```ssh -T git@github.com```，理论输出应类似于```Hi <user name>! You've successfully authenticated, but GitHub does not provide shell access.```的文本

若输出该文本则登录成功

End