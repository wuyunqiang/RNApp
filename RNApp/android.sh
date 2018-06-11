#!/usr/bin/env bash

ANDROID_PATH_EXIST=`cat ~/.bash_profile | grep ANDROID_NDK=`

if [ "$ANDROID_PATH_EXIST" == "" ]; then
  echo '
    export ANDROID_NDK=$HOME/Library/Android/ndk 
  ' >> ~/.bash_profile
  
  source $HOME/.bash_profile
fi

avds=`ls ~/.android/avd | grep .avd | sed "s#.avd##"`
avd_count=`ls ~/.android/avd | grep .avd | wc -l`

echo ""
echo "安卓模拟器列表："
echo ""
ls ~/.android/avd | grep .avd | sed "s#.avd##"
echo ""

if [ ${avd_count} == 0 ]; then
  echo "没有找到安卓模拟器，请到android studio中添加"
  exit 1
elif [ ${avd_count} == 1 ]; then
  avd=${avds[0]}
else
  # 需要从刚才的列表里任选一个
  read -p "你要启动哪个模拟器：" avd
  echo ""
fi


process=`ps aux | grep "\-avd ${avd}" | grep -v grep`
process_count=`echo ${process} | wc -l`

if [ "${process}" != "" ] && [ ${process_count} == 1 ]; then
  process_id=`echo ${process} | awk '{print $2}'`
  echo "正在强制关闭模拟器..."
  kill -9 ${process_id}
  # 防止再次启动失败
  sleep 1
fi

echo "模拟器${avd}正在启动..."
cd ~/Library/Android/sdk/tools/
emulator -avd ${avd} &
echo "模拟器启动完成"

