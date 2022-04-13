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
import {getBanner, getSongUrl, newSong, getMvUrl} from "/src/api/index";
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

const onPlayMusic = async (row) => {
  //显示播放器
  userStore.showPlay = true;
  //如果点击的歌曲id和当前播放的歌曲id一样，就修改播放的id了
  if (row.id === userStore.musicId) return;
  //点击了播放就把当前的歌曲列表设置为播放列表
  userStore.musicId = row.id;
  userStore.playMusic = row;
  //如果播放列表不一样就 就改变播放列表
  if (userStore.playList !== userStore.newMusicList)
    userStore.setPlayList(userStore.newMusicList);
}

const onPlayMv = async (row) => {
  getMvUrl(row.mvid).then((res) => {
    if (res.code === 200 && res.data.url) {
      userStore.mvInfo = res.data
      userStore.mvInfo.name = row.name
      userStore.mvInfo.singers = row.singers
      userStore.isShowMv = true;
    }
  })
}
</script>

<template>
  <el-container
      class="w-full mx-auto select-none overflow-hidden">
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
                  @click="onPlayMusic(row)"
              >
                <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                />
              </svg>
            </template>
          </el-table-column>
          <el-table-column min-width="10%">
            <template #default="{row}">
              <svg v-if="row.mvid!==0"
                   @click="onPlayMv(row)"
                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                   t="1649811868185"
                   class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" p-id="2593" width="22" height="22">
                <!--                <defs>-->
                <!--                  <style type="text/css"/>-->
                <!--                </defs>-->
                <path
                    d="M374.6 636.5c4.4 0 8.5-1.2 12.1-3.3l171.7-100c8-3.6 13.6-11.9 13.6-21.5 0-8.8-4.8-16.6-11.9-20.7l-167.8-97.8c-4.3-5-10.7-8.1-17.7-8.1-13.1 0-23.6 10.7-23.6 23.8v1.3l-0.3 0.2 0.4 199.8c-0.1 0.8-0.1 1.6-0.1 2.5 0 13.2 10.6 23.8 23.6 23.8z"
                    fill="#4D4D4D" p-id="2594"/>
                <path d="M64.7 586.3a32.2 32.1 0 1 0 64.4 0 32.2 32.1 0 1 0-64.4 0Z" fill="#4D4D4D" p-id="2595"/>
                <path
                    d="M960 398.3c0.1-1.6 0.2-3.2 0.2-4.8 0-35-28.5-63.3-63.6-63.3-11.7 0-22.7 3.2-32.2 8.7l-0.5-0.3-31.5 18.2v-64.7c-0.1-73.1-59.9-133-133.1-133H197.4c-73.1 0-133 59.8-133 133v165.8h0.2c0 17.7 14.4 32.1 32.2 32.1s32.2-14.4 32.2-32.1h0.2V287c0-35.2 28.8-64 64-64h510.2c35.2 0 64 28.8 64 64v448.9c0 35.2-28.8 64-64 64H193.3c-35.2 0-64-28.8-64-64v-21.4c0-17.7-14.4-32.1-32.2-32.1-17.8 0-32.2 14.4-32.2 32.1h-0.4v15.3c0 73.2 59.9 133 133 133h501.9c73.2 0 133-59.8 133-133v-64.1l33.1 19.1 0.1-0.1c9.2 5.1 19.8 8 31 8 35.1 0 63.6-28.4 63.6-63.3 0-1.6-0.1-3.2-0.2-4.8V398.3z m-63.6 205.1c-0.3 7.8-6.9 14.1-15 14.1-2.7 0-5.3-0.7-7.5-2l-41.5-23.7V430.1l40.9-23.2c2.3-1.5 5.1-2.3 8.1-2.3 8.3 0 15 6.6 15 14.6v184.2z"
                    fill="#4D4D4D" p-id="2596"/>
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
