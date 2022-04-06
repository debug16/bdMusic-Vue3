<script setup>
import {
  ElTable,
  ElTableColumn,
  ElCard,
  ElEmpty,
  ElContainer,
  ElMain,
} from "element-plus";
import {formateDate} from "/src/util/Date.js";
import UpAlbumBar from "../../components/UpTabBar/UpAlbumBar.vue";
import {store} from "../../store";
import {useRouter} from "vue-router";

const router = useRouter();

const userStore = store()

const getAlbumSinger = (row) => {
  let name = []
  row.ar.forEach(value => {
    name.push(value.name)
  })
  return name.join(' / ');
}

//播放音乐事件
const onPlayMusic = (row) => {
  const blurPicUrl = {
    blurPicUrl: userStore.getAlbumImg,
  }
  userStore.playMusic.album = blurPicUrl;
  userStore.playMusic.name = row.name;
  userStore.setMusicId(row.id);
  userStore.showPlay = true;
}

const theme = {
  color: `url('${userStore.getAlbumImg}')`,
}
</script>

<template>
  <div class="header relative bg-transparent overflow-hidden" :style="`--bg-img:url('${userStore.getAlbumImg}?param=150y150')`">
    <UpAlbumBar title="专辑" class="text-[#fff] relative"/>
    <el-card class="relative top-0 left-0">
      <el-empty :image-size="150" :image="`${userStore.getAlbumImg}?param=150y150`">
        <template #description>
          <div class="albumDetails truncate text-ellipsis">
            <div class="detailTop">
              <p class="albumName">{{ userStore.getAlbumName }}</p>
              <p><span>歌手：</span><span>{{ userStore.getAlbumSinger }}</span></p>
            </div>
            <div class="detailBottom">
              <p><span>发行时间：</span><span>{{ formateDate(userStore.getAlbumTime) }}</span></p>
              <p><span>{{ userStore.getAlbumDesc }}</span></p>
            </div>
          </div>
        </template>
      </el-empty>
    </el-card>
  </div>
  <el-container
      class="w-full mx-auto select-none h-4/6">
    <el-main class="px-3 py-0">

      <div class="songList">
        <el-table :data="userStore.getAlbumSong" style="width: 100%" :show-header="false">
          <el-table-column type="index" label="序号" min-width="10%"/>
          <el-table-column prop="name" min-width="60%" label="歌名" :show-overflow-tooltip="true"/>
          <el-table-column :formatter="getAlbumSinger" min-width="20%" label="歌手" :show-overflow-tooltip="true"/>
          <el-table-column min-width="10%">
            <template #default="{row}">
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
        </el-table>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
:root {
  --bg-img: '';
}

.header {
  background: #a2a1a1;
  overflow: hidden;
}
:deep(.el-header div svg){
  color: #fff;
}
.header::before {
  content: '';
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(3);
  filter: blur(30px);
  background-image: var(--bg-img);
  z-index: 0;
  background-position: bottom;
}

.el-card {
  @apply border-none shadow-none rounded-none bg-transparent;
}

.el-empty {
  text-align: left;
  flex-direction: row;
  align-items: stretch;
  padding: 10px 0;
}

:deep(.el-empty img) {
  @apply rounded-2xl;
  height: 150px;
}

:deep(.el-empty__description) {
  margin-top: 0;
  overflow: hidden;
  flex: 1;
}

.albumDetails {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 20px;
  flex: 1;
  height: 100%;
}

.albumDetails span {
  @apply text-xs;

}

.albumDetails .albumName {
  @apply text-base text-white;
  font-weight: bold;
}

.albumDetails p {
  @apply overflow-hidden text-ellipsis text-[#eee]
}

/*表格序号居中*/
:deep(.el-table__row .el-table__cell:first-child .cell div) {
  @apply text-center;
}
</style>
