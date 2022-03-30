<script setup>
import {shallowRef, defineAsyncComponent, watchEffect} from 'vue'
import {store} from './store'
import 'element-plus/dist/index.css'
import 'animate.css'
import './assets/css/index.css'

const userStore = store()
let viewPlay = shallowRef()

watchEffect(() => {
  if (userStore.showPlay && !viewPlay.value) {
    viewPlay.value = defineAsyncComponent(() => import('./components/Play/Play.vue'))
  }
})

</script>

<template>
  <div
      class="w-full sm:w-2/3 xl:w-1/3 xl:w-3/6 2xl:w-2/6 overflow-hidden flex flex-col relative h-screen mx-auto bg-gradient-to-b from-slate-100 to-white">
    <!-- 顶部搜索 -->
    <router-view name="upTabBar"></router-view>
    <!-- 主内容 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <router-view name="downTabBar"></router-view>
    <!-- 播放器 -->
    <component :is="viewPlay"></component>
    <!-- 登录 -->
    <router-view name="login"></router-view>
  </div>
</template>

<style>
html, body {
  width: 100vw;
  height: 100vh;
  padding: 0;
  margin: 0;
}

#app {
  height: 100%;
  width: 100%;
}

*:not(html,body)::-webkit-scrollbar {
  display: none;
}
</style>
