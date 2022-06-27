#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
# 提交代码测试
git add -A
git commit -m "feat(deploy): 脚本自动升级"
git pull
git push origin master

## 发布到阿里云
yarn build:prod
ssh root@121.43.63.77 -C "rm -rf /home/web/ruoyi/dist"
scp -r dist root@121.43.63.77:/home/web/ruoyi/dist
echo "发布成功"
exit
