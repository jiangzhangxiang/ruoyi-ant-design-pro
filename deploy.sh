#!/bin/bash

echo " èæ¬å¼å§ð"

if branch=$(git symbolic-ref --short -q HEAD)

then
  echo 'å½ååæ¯['$branch']'
else
  echo 'ä¸å¨ä»»ä½åæ¯ä¸,èæ¬ç»æ...'
  exit 1
fi

git add .
echo "è¯·è¾å¥æäº¤æ³¨é? [Enter] 'feat(deploy): èæ¬èªå¨åçº§'"

read commit_name
  if [ -z "$commit_name" ]
  then
  commit_name="feat(deploy): èæ¬èªå¨åçº§"
  fi
echo "gitæäº¤æ³¨é:$commit_name"

git commit -m "$commit_name"
git pull
git push

read -r -p "æ¯å¦åçº§å°æµè¯æå¡å¨? [ç¯å¢åæ°][Enter(prod)][n(åæ¶)] " input

case $input in
    [nN][oO]|[nN])
		echo " åæ¶åçº§èæ¬â ï¸"
		exit 1
       		;;
    *)
	;;
esac

if [ -z "$input" ]
then
input="prod"
fi

echo 'branch['$branch']env['$input"]æ­£å¨åçº§..."

npm run build:$input
ssh root@jzx -C "rm -rf /home/web/ruoyi/dist"
scp -r dist root@jzx:/home/web/ruoyi/dist

echo " åçº§å®æâ "
