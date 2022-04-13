<template>
  <el-header class="px-0 flex items-center">
    <el-input placeholder="大家都在搜 一样的月光" v-model.trim="inputKeyword" @keyup.enter="search(inputKeyword)">
      <template #prepend class="bg-blue-200">
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer text-#2B3036"
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
      </template>
      <template #append>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 cursor-pointer text-#2B3036"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
          <path
              fill-rule="evenodd"
              d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
              clip-rule="evenodd"
          />
        </svg>
      </template>
      <template #prefix>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </template>
    </el-input>
  </el-header>
</template>

<script setup>
import {ElHeader, ElInput} from "element-plus";
import {ref} from "vue";
import {store} from "/src/store";
import {searchSongs} from '/src/api/index'

const inputKeyword = ref()
const userStore = store()
const search = async (keyWord) => {
  const res = await searchSongs(keyWord)
  if(res.code ===200){
    userStore.newMusicList = res.result.songs;
    userStore.newMusicList.forEach((e,i,a)=>{
      userStore.newMusicList[i].singers = singerStitch(e)
    })
    inputKeyword.value = ''
  }
}
const singerStitch = (singer) => {
  let singers = "";
  singer.artists.forEach((singer) => {
    singers ? (singers += "/" + singer.name) : (singers = singer.name);
  });
  return singers
}

</script>

<style scoped>

.el-header {
  height: 45px;
}

:deep(.el-input-group__prepend),
:deep(.el-input-group__append) {
  @apply bg-transparent shadow-none px-4;
}

:deep(.el-input__inner) {
  @apply shadow-none border-none rounded-2xl focus:shadow-none hover:shadow-none;
}

:deep(.el-input__prefix) {
  @apply items-center transition-none z-10;
}
</style>
