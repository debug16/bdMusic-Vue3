<script setup>
import {shallowRef, defineAsyncComponent, watchEffect} from 'vue'
import {store} from './store'
import 'element-plus/dist/index.css'
import 'animate.css'
import './assets/css/index.css'
import Home from "./components/Home/Home.vue";


const userStore = store()
let viewPlay = shallowRef()

watchEffect(() => {
  if (userStore.showPlay && !viewPlay.value) {
    viewPlay.value = defineAsyncComponent(() => import('./components/Play/Play.vue'))
  }
})

</script>

<template>
  <div class="w-full sm:w-2/3 xl:w-1/3 mx-auto overflow-hidden h-screen">
    <router-view name="upTabBar"></router-view>
    <router-view></router-view>
    <router-view name="downTabBar"></router-view>
    <component :is="viewPlay"></component>
    <ul>
      <li>
        <router-link to="/">主页</router-link>
      </li>
      <li>
        <router-link to="/">专辑</router-link>
      </li>
      <li>
        <router-link to="/">收藏</router-link>
      </li>
      <li>
        <router-link to="/">我的</router-link>
      </li>
    </ul>
  </div>
  <router-view name="login"></router-view>
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
</style>
