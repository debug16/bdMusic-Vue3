<script setup>
import {ElAvatar, ElContainer, ElFooter, ElHeader, ElMain, ElProgress,} from "element-plus";
import {formateTime} from "../../util/Date";
import {reactive, ref, watch} from "vue";
import Lyric from "../Lyric/Lyric.vue";
import {getSongUrl, getLyric} from "/src/api/index";
import {store} from '/src/store'

//audio
const audio = ref()
//播放信息
const playInfo = reactive({
  //当前音乐播放到的时间
  currentTime: 0,
  //当前音乐的总时长
  duration: 0.01,
  musicOverTime: '00:00',
  musicCurrentTime: '00:00'
})
//歌词是否显示
const lyricShow = ref(false)
//歌词播放时index
const lyricIndex = ref(0)
//歌词
const lyric = ref([])
//播放进度条
const percentage = ref(0)

const userStore = store()

//处理歌词
const finishLyric = lyr => {
  return lyr.split('\n').map((item, index, arr) => {
    const time = item.match(/\[(\d{2}):(\d{2})\.(\d{2,})\]/);
    if (time) {
      const min = parseInt(time[1], 10);
      const sec = parseInt(time[2], 10);
      const ms = parseInt(time[3], 10);
      const text = item.replace(/\[(\d{2}):(\d{2})\.(\d{2,})\]/g, '');
      return {
        time: min * 60 + sec + ms / 1000,
        text
      }
    }
    return {
      time: 0,
      text: ''
    };
  })
}

//进度条点击事件
const onChangeProgressBar = (e) => {
  switch (e.target.className) {
    case 'el-progress-bar__outer':
    case 'el-progress-bar__inner': {
      audio.value.pause()
      const width = e.target.parentNode.offsetWidth;
      const offsetX = e.offsetX;
      const perCentLocation = offsetX / width
      const currentTime = playInfo.currentTime = perCentLocation * playInfo.duration;
      audio.value.currentTime = currentTime;
      audio.value.play()
    }
  }
}


//隐藏播放器
const onHiddenView = () => {
  userStore.showPlay = false;
}

//播放结束
const onEndPlayusic = ()=>{
  onNextPlay();
}

//停止播放
const onStopMusic = () => {
  console.log('暂停播放')
  // onNextPlay();
  userStore.checkPlay = false;
  audio.value.pause();
}

//开始播放
const onPlayMusic = () => {
  console.log('开始播放')
  audio.value.play();
  userStore.checkPlay = true;
  playInfo.duration = audio.value.duration || 0.01
  playInfo.musicOverTime = formateTime(playInfo.duration)
}

//audio时间改变事件
const onAudioTimeupdate = (e) => {
  playInfo.currentTime = e.target.currentTime
  percentage.value = (playInfo.currentTime / playInfo.duration) * 100
  playInfo.musicCurrentTime = formateTime(playInfo.currentTime)

  //找到符合条件的歌词
  const index = lyric.value.findIndex((item, i, obj) => {
    if (item.time >= playInfo.currentTime) {
      return true;
    }
    if (obj.length - 1 === i) {
      return true
    }
    return false
  }) || 0
  lyricIndex.value = index;
}

//播放下一曲
const onNextPlay = () => {
  // onStopMusic()
  const songId = userStore.playMusic.id;
  const nextSong = userStore.getNextSong(songId);
  userStore.playMusic = nextSong;
  console.log(nextSong.id,nextSong.name)
  userStore.musicId = nextSong.id;
}

//播放上一曲
const onPrevPlay = () => {
  // onStopMusic()
  const songId = userStore.playMusic.id;
  const prevSong = userStore.getPrevSong(songId);
  userStore.playMusic = prevSong;
  console.log(prevSong.id,prevSong.name)
  userStore.musicId = prevSong.id;
}

//监听音乐id 如果变化就获取新的音乐信息
watch(() => userStore.musicId, (newId, oldId) => {
  //如果旧的id有值说明播放器被加载过了 id发生了变化需要把上一个音乐停掉 把上个音乐的播放时间初始化
  if (oldId) {
    onStopMusic()
  }

  //如果新的id有值说明需要播放新的音乐
  if (newId) {
    //获取新的音乐信息
    getSongUrl(newId).then(res => {
      userStore.playMusic.musicUrl = res.data[0].url;
    })

    //获取歌词
    getLyric(newId).then(res => {
      if (res.lrc) {
        lyric.value = finishLyric(res.lrc.lyric.replaceAll(/\[(\d{2}):(\d{2})\.(\d{2,})\]\n/g,''))
      }
    })
  }

}, {immediate: true})
</script>

<template>
  <el-container
      v-show="userStore.showPlay"
      class="w-full mx-auto overflow-hidden h-screen absolute left-0 z-50 text-[#fff]"
  >
    <!-- 背景 -->
    <div
        :style="`background-image:url('${userStore.playMusic.album?.blurPicUrl}?param=200y200')`"
        class="bg bg-cover w-full h-full absolute -z-10 bg-center overflow-hidden blur-lg scale-125 transition-all duration-1000"
    />
    <el-header class="flex items-center relative px-3">
      <ul class="flex justify-center items-center w-full text-center">
        <li class="w-1/12 inline-flex justify-start">
          <svg
              class="h-7 w-7"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              @click="onHiddenView"
          >
            <path
                d="M19 9l-7 7-7-7"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </li>
        <li class="w-10/12 text-ellipsis truncate">{{ userStore.playMusic.name }}</li>
        <li class="w-1/12 inline-flex justify-end">
          <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
          </svg>
        </li>
      </ul>
    </el-header>
    <el-main class="px-3 py-0 flex justify-center items-center text-[#fff]">
      <div class="CDdisk" v-show="!lyricShow">
        <el-avatar :class="{'paused':!userStore.checkPlay,'play':userStore.checkPlay}" :size="230"
                   :src="`${userStore.playMusic.album?.blurPicUrl}?param=200y200`"
                   class="ring-50 ring-black animate-spin-slow"
        />
      </div>
      <Lyric v-show="lyricShow" :lyric="lyric" :lyric-index="lyricIndex"/>
    </el-main>
    <el-footer class="h-1/6 flex flex-col justify-evenly text-[#fff]">
      <div class="progress">
        <el-progress :percentage="percentage" class="flex space-x-6" color="#ff0000"
                     @click="onChangeProgressBar($event)"
        >
          <template #default class="contents">
            <span class="order-1 text-[#dadada] text-sm antialiased"
            >{{ playInfo.musicCurrentTime }}</span
            >
            <span class="order-2 text-[#a5a5a5] text-sm">{{ playInfo.musicOverTime }}</span>
          </template>
        </el-progress>
      </div>
      <div class="play">
        <ul class="flex items-center justify-evenly">
          <!-- 播放模式 -->
          <li>
            <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="lyricShow = !lyricShow"
            >
              <path
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </li>
          <!-- 上一首 -->
          <li>
            <svg
                class="h-7 w-7"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onPrevPlay"
            >
              <path
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </li>
          <!-- 播放 -->
          <li>
            <svg
                v-show="!userStore.checkPlay"
                class="h-14 w-14 stroke-1"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onPlayMusic"
            >
              <path
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
              <path
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
            <!--            正在播放-->
            <svg
                v-show="userStore.checkPlay"
                class="w-14 h-14"
                fill="none"
                stroke="#ffffff"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onStopMusic"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <line x1="10" x2="10" y1="15" y2="9"></line>
              <line x1="14" x2="14" y1="15" y2="9"></line>
            </svg>
          </li>
          <!-- 下一首 -->
          <li>
            <svg
                class="h-7 w-7"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                @click="onNextPlay"
            >
              <path
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </li>
          <!-- 播放列表  -->
          <li>
            <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke-linecap="round"
                  stroke-linejoin="round"
              />
            </svg>
          </li>
        </ul>
      </div>
    </el-footer>
    <audio ref="audio" @ended="onEndPlayusic" @play="onPlayMusic"  @timeupdate="onAudioTimeupdate($event)"
           :src="userStore.playMusic.musicUrl" autoplay="autoplay" hidden
           controls>
      <source :src="userStore.playMusic.musicUrl" type="audio/ogg">
      <source :src="userStore.playMusic.musicUrl" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>
  </el-container>
</template>

<style scoped>
:deep(.el-progress-bar__outer) {
  height: 2px !important;
}

svg {
  @apply stroke-1 cursor-pointer;
}

:deep(.el-progress__text) {
  @apply contents;
}

:deep(.el-progress-bar) {
  @apply order-2 mx-3;
}

:deep(.el-progress-bar__outer) {
  @apply w-5/6;
}

:deep(.el-progress-bar__outer) {
  @apply w-full flex-grow box-border bg-[#fff];
}

:deep(.el-progress-bar__inner) {
  @apply ease-[cubic-bezier(0.22,0.61,0.36,1)]
}

.bg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #525252;
  opacity: .5;
  z-index: -12;
}

.play {
  animation-play-state: running;
}

.paused {
  animation-play-state: paused;
}
</style>

