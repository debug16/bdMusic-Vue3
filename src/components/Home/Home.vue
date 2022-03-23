<template>
  <el-container
      class="w-full md:w-2/3 xl:w-1/3 mx-auto h-screen bg-[#E0EAF3] select-none">
    <el-header class="px-0 flex items-center">
      <el-input placeholder="大家都在搜 一样的月光">
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
    <el-main class="px-3 pt-0">
      <div class="carousel select-none">
        <el-carousel trigger="click" height="160px" arrow="never" :loop="true" :initialIndex="2">
          <el-carousel-item v-for="(item, index) in bannerData" :key="index">
            <el-image :src="item.imageUrl" fit="fill" :alt="item.typeTitle" class="rounded-2xl w-full h-full"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="songList mt-4" v-show="userStore.newMusicList.length">
        <el-table :data="userStore.newMusicList" style="width: 100%" :show-header="false">
          <el-table-column type="index" label="序号" min-width="10%" class="text-lg"/>
          <el-table-column prop="name" min-width="60%" label="歌名" :show-overflow-tooltip="true"/>
          <el-table-column prop="singers" min-width="20%" label="歌手" :show-overflow-tooltip="true"/>
          <el-table-column min-width="10%">
            <template #default="{row, column, $index }">
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mx-auto hover:text-red-500 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  @click="onPlayMusic(row.id)"
              >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                />
              </svg>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer class="bg-slate-500">Footer</el-footer>
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
} from "element-plus";
import { ref} from "vue";
import {store} from "../../store";
import {newSong, getBanner, getSongUrl} from "/src/api/index";
//存轮播图数据
const bannerData = ref();

const userStore = store()
//获取轮播图
getBanner(0).then((res) => {
  bannerData.value = res.banners;
});

//获取最新歌曲
newSong(0).then((res) => {
  let singers;
  res.data.forEach((music, index) => {
    singers = "";
    //拼接歌手
    music.artists.forEach((singer) => {
      singers ? (singers += "/" + singer.name) : (singers = singer.name);
    });
    //把歌手存入
    res.data[index].singers = singers;
  });
  userStore.newMusicList = res.data
});


const onPlayMusic = async (id) => {
  userStore.newMusicList.forEach((music, index,arr) => {
    if (id !== music.id) {
      return
    }
    let len = arr.length;
    switch (index) {
      case 0: {
        music.prevMusic = arr[len - 1].id
        music.nextMusic = arr[index + 1].id
        break
      }
      case (len - 1): {
        music.prevMusic = arr[index - 1].id
        music.nextMusic =arr[0].id
        break
      }
      default: {
        music.prevMusic = arr[index - 1].id
        music.nextMusic = arr[index + 1].id
      }
    }
    getSongUrl(id).then(res => {
      if (res.data[0].url) {
        music.musicUrl = res.data[0].url;
        userStore.playMusic = music;
        userStore.showPlay = true;
        userStore.checkPlay = true;
      }
    })
  })
}
</script>


<style scoped>
main::-webkit-scrollbar {
  display: none;
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

:deep(.el-carousel__indicator--horizontal .el-carousel__button) {
  @apply w-2;
}
</style>
