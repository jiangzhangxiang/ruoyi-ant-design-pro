#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 提交代码测试
git add -A
git commit -m "fix(deploy): 脚本自动升级"
git pull
git push origin master

## 发布到阿里云
#npm build:prod
#ssh root@jzx -C "rm -rf /home/web/ruoyi/dist"
#scp -r dist root@jzx:/home/web/ruoyi/dist
#
#exit
