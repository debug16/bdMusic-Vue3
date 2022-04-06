<script setup>
import {ElContainer, ElMain, ElCard, ElAvatar} from 'element-plus'
import {store} from "../../store";
const userStore = store()

</script>

<template>
  <el-container class="w-full mx-auto select-none overflow-hidden">
    <el-main class="px-3 py-2">
      <div class="flex flex-col items-center relative mt-6 py-5">
        <el-avatar :size="80" fit="cover" :src="`${userStore.userInfo.avatarUrl}?param=100y100`" class="-mt-1/2 overflow-auto"/>
        <div class="mt-4">
          {{userStore.userInfo.nickname}}
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>
