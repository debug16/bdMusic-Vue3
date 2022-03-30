<script setup>
import {
  ElCarousel,
  ElCarouselItem,
  ElContainer,
  ElImage,
  ElMain,
  ElTable,
  ElTableColumn,
} from "element-plus";
import {ref} from "vue";
import {store} from "../../store";
import {getBanner, getSongUrl, newSong} from "/src/api/index";
import {useRouter} from "vue-router";
//存轮播图数据
const bannerData = ref();
const router = useRouter()
const userStore = store()
//获取轮播图
getBanner(0).then((res) => {
  bannerData.value = res.banners;
});


//获取最新歌曲
if (userStore.getNewMusicList.length === 0) { //如果没有数据就请求资源
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
}

const onPlayMusic = async (id) => {
  userStore.newMusicList.forEach((music, index, arr) => {
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
        music.nextMusic = arr[0].id
        break
      }
      default: {
        music.prevMusic = arr[index - 1].id
        music.nextMusic = arr[index + 1].id
      }
    }
    //获取歌曲url
    getSongUrl(id).then(res => {
      if (res.data[0].url) {
        music.musicUrl = res.data[0].url;
        userStore.playMusic = music;
        userStore.showPlay = true;
      }
    })
    userStore.checkPlay = false
  })
}
</script>

<template>
  <el-container
      class="w-full mx-auto select-none h-4/6">
    <el-main class="px-3 py-0">
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
            <template #default="{row }">
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
  </el-container>
</template>


<style scoped>
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

/*表格序号居中*/
:deep(.el-table__row .el-table__cell:first-child .cell div) {
  @apply text-center;
}
</style>
