<template>
  <el-container
      class="w-full sm:w-2/3 xl:w-1/3 mx-auto overflow-hidden h-screen relative -top-full left-0 z-50 text-[#fff]"
      :class="{'hidden':!userStore.showPlay}"
  >
    <!-- 背景 -->
    <img class="bg w-full h-full absolute -z-10 bg-center overflow-hidden blur-lg scale-110 transition-all duration-1000"
        :src="userStore.playMusic.album.blurPicUrl"
        ref="img"
    />
    <el-header class="flex items-center relative px-3">
      <ul class="flex justify-center items-center w-full text-center">
        <li class="w-1/12 inline-flex justify-start">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
              @click="onHiddenView"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
            />
          </svg>
        </li>
        <li class="w-10/12">{{ userStore.playMusic.name }}</li>
        <li class="w-1/12 inline-flex justify-end">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1"
          >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </li>
      </ul>
    </el-header>
    <el-main class="px-3 py-0 flex justify-center items-center text-[#fff]">
      <div class="CDdisk">
        <el-avatar :size="230" :src="userStore.playMusic.album.blurPicUrl" class="ring-50 ring-black animate-spin-slow"
            :class="{'paused':!userStore.checkPlay,'active':userStore.checkPlay}"
        />
      </div>
    </el-main>
    <el-footer class="h-1/6 flex flex-col justify-evenly text-[#fff]">
      <div class="progress">
        <el-progress :percentage="90" color="#ff0000" class="flex space-x-6"
        >
          <template #default class="contents">
            <span class="order-1 text-[#dadada] text-sm antialiased"
            >01:00</span
            >
            <span class="order-2 text-[#a5a5a5] text-sm">03:59</span>
          </template>
        </el-progress>
      </div>
      <div class="play">
        <ul class="flex items-center justify-evenly">
          <!-- 播放模式 -->
          <li>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
          </li>
          <!-- 上一首 -->
          <li>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z"
              />
            </svg>
          </li>
          <!-- 播放 -->
          <li>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-14 w-14 stroke-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                @click="onPlayMusic"
                v-show="!userStore.checkPlay"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <!--            正在播放-->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-14 h-14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                stroke-width="1"
                stroke-linecap="round"
                stroke-linejoin="round"
                v-show="userStore.checkPlay"
                @click="onStopMusic"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <line x1="10" y1="15" x2="10" y2="9"></line>
              <line x1="14" y1="15" x2="14" y2="9"></line>
            </svg>
          </li>
          <!-- 下一首 -->
          <li>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                @click="onNextPlay"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z"
              />
            </svg>
          </li>
          <!-- 播放列表  -->
          <li>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </li>
        </ul>
      </div>
    </el-footer>
    <audio controls autoplay ref="audio" hidden :src="userStore.playMusic.musicUrl">
      <source :src="userStore.playMusic.musicUrl" type="audio/ogg">
      <source :src="userStore.playMusic.musicUrl" type="audio/mpeg">
      您的浏览器不支持 audio 元素。
    </audio>
  </el-container>
</template>

<script setup>
import {
  ElContainer,
  ElHeader,
  ElFooter,
  ElMain,
  ElInput,
  ElCarousel,
  ElCarouselItem,
  ElImage,
  ElTable,
  ElTableColumn,
  ElAvatar,
  ElProgress,
} from "element-plus";

import {ref} from "vue";
import {getSongUrl} from "/src/api/index";
import {store} from '/src/store'

let img = ref();
const audio = ref()
const userStore = store()

//隐藏播放器
const onHiddenView = () => {
  userStore.showPlay = false;
}

//停止播放
const onStopMusic = () => {
  userStore.checkPlay = false;
  audio.value.pause();
}

//开始播放
const onPlayMusic = () => {
  userStore.checkPlay = true;
  audio.value.play();
}

//播放下一曲
const onNextPlay = () => {
  audio.value.pause();
  getSongUrl(userStore.playMusic.nextMusic).then(res => {
    if (res.data[0].url) {
      userStore.playMusic.musicUrl = res.data[0].url;
      userStore.showPlay = true;
      userStore.checkPlay = true;
      audio.value.online = audio.value.play;
    }
  })
}

</script>


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

.bg::after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #999999;
  opacity: .1;
  filter: blur(10px);
  z-index: -12;
}

.active {
  animation-play-state: running;
}

.paused {
  animation-play-state: paused;
}
</style>

