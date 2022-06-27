#!/bin/bash

echo " 脚本开始😎"

if branch=$(git symbolic-ref --short -q HEAD)

then
  echo '当前分支['$branch']'
else
  echo '不在任何分支上,脚本结束...'
  exit 1
fi

git add .
echo "请输入提交注释? [Enter] 'feat(deploy): 脚本自动升级'"

read commit_name
  if [ -z "$commit_name" ]
  then
  commit_name="feat(deploy): 脚本自动升级"
  fi
echo "git提交注释:$commit_name"

git commit -m $commit_name
git pull
git push

read -r -p "是否升级到测试服务器? [环境参数][Enter(prod)][n(取消)] " input

case $input in
    [nN][oO]|[nN])
		echo " 取消升级脚本❌ ️"
		exit 1
       		;;
    *)
	;;
esac
#
#if [ -z "$input" ]
#then
#input="prod"
#fi
#
#echo 'branch['$branch']env['$input"]正在升级..."
#
#npm run build:$input
#ssh root@yx -C "rm -rf /home/web/ruoyi/dist"
#scp -r dist root@yx:/home/web/ruoyi/dist
#
#echo " 升级完成✅ "


#ssh yx -tt << EOF
#cd /home/git/architecture-api
#git pull
#npm run build:$input
#exit
#EOF
