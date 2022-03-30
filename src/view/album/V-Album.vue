<script setup>
import {ElMain, ElContainer, ElRow, ElCol, ElImage, ElCard, ElEmpty, ElIcon} from "element-plus";
import {store} from "../../store";
import {useRouter} from "vue-router";
import UpAlbumBar from "../../components/UpTabBar/UpAlbumBar.vue";


const userStore = store()
const router = useRouter()
const albums = userStore.getWeekAlbums;
//拼接歌手名字
const connectionName = (arr = []) => {
  let name = [];
  arr.forEach(value => {
    name.push(value.name);
  })
  return name.join(' / ')
}

//找到点击的专辑id
const findData = (el, attName) => {
  if (!el || el === document) return
  const value = el.attributes[attName]?.value;
  if (value || !el) {
    return value
  } else {
    return findData(el.parentNode, attName)
  }
}

//专辑点击事件
const onAlbumDetails = (event) => {
  const id = findData(event.target, 'data_album')
  if (id) {
    router.push({name: 'albumDetails', params: {id}})
  }
}
</script>

<template>
  <UpAlbumBar title="新碟专辑"/>
  <el-container>
    <el-main>
      <p>本周新碟</p>
      <div class="contentTheAlbum flex flex-wrap justify-between scroll-container" @click="onAlbumDetails($event)">
        <el-row v-for="item in albums" :key="item.id" class="w-1/2 lg:w-1/3 my-2">
          <el-col :span="24">
            <el-card class="h-full mx-4 text-center rounded-xl cursor-pointer hover:scale-105" :data_album="item.id">
              <el-empty class="p-0">
                <template #image>
                  <el-image :src="`${item.picUrl}?param=260y260`" class="select-none w-full" :alt="item.name" lazy>
                    <template #error>
                      <div class="image-slot">
                        <el-icon>
                          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8="">
                            <path fill="currentColor"
                                  d="M160 160v704h704V160H160zm-32-64h768a32 32 0 0 1 32 32v768a32 32 0 0 1-32 32H128a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32z"></path>
                            <path fill="currentColor"
                                  d="M384 288q64 0 64 64t-64 64q-64 0-64-64t64-64zM185.408 876.992l-50.816-38.912L350.72 556.032a96 96 0 0 1 134.592-17.856l1.856 1.472 122.88 99.136a32 32 0 0 0 44.992-4.864l216-269.888 49.92 39.936-215.808 269.824-.256.32a96 96 0 0 1-135.04 14.464l-122.88-99.072-.64-.512a32 32 0 0 0-44.8 5.952L185.408 876.992z"></path>
                          </svg>
                        </el-icon>
                      </div>
                    </template>
                  </el-image>
                </template>
                <template #description>
                  <p class="truncate" :title="item.name">{{ item.name }}</p>
                  <div class="text-sm truncate text-ellipsis overflow-hidden w-full"
                       :title="connectionName(item.artists)">
                    <span class="text-xs"> {{ connectionName(item.artists) }}</span>
                  </div>
                </template>
              </el-empty>

            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.el-container {
  overflow: hidden;
}

.el-row:last-child {
  align-self: start;
}

:deep(.el-image img) {
  width: 100%;
  height: 100%;
}

:deep(.el-card__body) {
  @apply h-full relative;
  padding: 15px;
}

.el-empty {
  @apply h-full items-stretch relative;
  padding-bottom: calc(100% + 50px);

}

:deep(.el-empty .el-empty__image) {
  @apply w-auto flex-grow absolute top-0 left-0 absolute;
}

:deep(.el-empty__description) {
  @apply m-0 overflow-hidden w-full text-gray-500 absolute bottom-0;
}

:deep(.el-empty__description p) {
  @apply my-0 text-sm sm:text-sm text-gray-500 px-2;
}

.el-image, .el-image img {
  min-height: 100%;
  min-width: 100%;
}
</style>
