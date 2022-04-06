<script setup>
import {reactive, ref, watch} from 'vue';

const src = ref('https://music.163.com/song/media/outer/url?id=1933915376.mp3');
const lyr = `[00:06.09]作词：唐恬/李志清
[00:06.72]作曲：林天爱
[00:07.02]编曲：付天
[00:07.32]制作人： Xun
[00:07.59]出品：网易飓风 x网易青云 LAB
[00:18.48]总有一些话来不及说了
[00:24.96]总有一个人是心口的朱砂
[00:31.38]想起那些花那些傻眼泪落下
[00:38.34]只留一句你现在好吗
[00:47.70]如果爱忘了泪不想落下
[00:54.12]那些幸福啊让她替我到达
[01:00.69]如果爱懂了承诺的代价
[01:07.17]不能给我的请完整给她
[01:36.30]总有些牵挂旧的像伤疤
[01:42.84]越是不碰它越隐隐的痛在那
[01:48.99]想你的脸颊你的发我不害怕
[01:56.16]就让时间给我们回答
[02:02.31]如果爱忘了泪不想落下
[02:08.73]那些幸福啊让她替我到达
[02:15.27]如果爱懂了承诺的代价
[02:21.78]不能给我的请完整给她
[02:29.28]我说我忘了不痛了
[02:33.09]那是因为太爱太懂了
[02:36.24]笑了原谅了为你也值得
[02:42.21]用你的快乐告诉我
[02:45.96]现在放开双手是对的
[02:48.93]别管我多舍不得
[02:54.21]如果爱忘了就放他走吧
[03:00.63]那些幸福啊让她替我到达
[03:07.23]如果爱懂了承诺的代价
[03:13.68]不能给我的请完整给她
[03:17.88]如果爱忘了你还记得吗
[03:18.48]吉他： Tommy Wu
[03:19.08]贝斯：林维俊
[03:19.41]和声编写：小手鹅/ Xun
[03:19.98]和声：小手鹅/ Xun
[03:20.40]录音师：熊宝
[03:20.73]混音工程师：张海庚
[03:21.39]监制：罗子欢
[03:23.16]视觉设计：谢妍
[03:23.52]艺人统筹：李喆渊/颜恬初
[03:24.18]企划统筹：毛不歪/黄雨薇/欧阳慧琳
[03:25.17]出品人：谢奇笛
[03:25.53]音乐营销：网易飓风
[03:27.12] OP： Touch Music Publishing M Sdn Bhd
[03:28.02] SP：北京大石音乐版权有限公司
[03:28.86]【此版本为正式授权翻唱作品。未经著作权人许可，不得翻唱、翻录或使用】
`;

//audio标签
const audio = ref(null);
//将要播放的歌词index
let lyricIndex = ref()
//处理歌词
const lyric = reactive(lyr.split('\n').map(item => {
  const time = item.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
  if (time) {
    const min = parseInt(time[1], 10);
    const sec = parseInt(time[2], 10);
    const ms = parseInt(time[3], 10);
    return {
      time: min * 60 + sec + ms / 1000,
      text: item.replace(/\[(\d{2}):(\d{2})\.(\d{2})\]/g, '')
    };
  }
  return {
    time: 0,
    text: item
  };
}))

//播放时间变化事件
const onTimeupdate = () => {
  //当前歌曲播放的时间
  const time = audio.value.currentTime;
  //找到符合条件的歌词
  const index = lyric.findIndex((item, i, obj) => {
    if (item.time >= time) {
      console.log(item.text)
      return true;
    }
    if (obj.length - 1 === i) {
      return true
    }
    return false
  }) || 0
  lyricIndex.value = index;
}

</script>


<template>
  <div class="aduioBox flex h-full w-full flex-col mr-auto border border-pink-300 border-solid">
    <div class="audioBar flex-shrink-0">
      <audio  controls :src="src" class="w-full" @timeupdate="onTimeupdate" ref="audio">
        <source type="audio/ogg" :src="src"/>
        <source type="audio/mpeg" :src="src"/>
        您的浏览器不支持 audio 元素。
      </audio>
    </div>
    <div class="lyrics flex-grow overflow-auto text-center flex basis-full flex-col justify-center relative ">
      <div class="relative h-10">
        <ul class="leading-10 text-black text-sm -top-10 relative px-20  transition-top duration-500 transform ease-in-out" :style="{top:`${(-lyricIndex * 2.5)+2.5}rem`}">
          <li v-for="(item, index) in lyric" :key="index" :data-lyricIndex="index" :data-lyricTime="item.time"
              :class="{play:++index === lyricIndex}">
            {{ item.text }}
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.play {
  color: #53a8ff;
}

.lyrics ul li{
  @apply text-ellipsis   h-10;
}
</style>
