<script setup>
import Login from "./components/Login/Login.vue";
import Home from "./components/Home/Home.vue"
import Play from "./components/Play/Play.vue"
import {shallowRef,defineAsyncComponent,watchEffect} from 'vue'
import {store} from './store'
import 'element-plus/dist/index.css'
import 'animate.css'
import './assets/css/index.css'
const userStore = store()
let viewPlay = shallowRef()

watchEffect(()=>{
  if(userStore.showPlay && !viewPlay.value){
    viewPlay.value = defineAsyncComponent(()=>import('./components/Play/Play.vue'))
  }
})

</script>

<template>
  <Home></Home>
  <component :is="viewPlay" ></component>
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
