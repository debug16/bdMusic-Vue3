<script setup>
import {
  ElContainer,
  ElMain,
  ElTable,
  ElTableColumn,} from "element-plus";
import {useStorage} from '@vueuse/core'
import {store} from "/src/store";
import { getMvUrl} from "/src/api/index";
const userStore = store()
const shoucang = useStorage('shoucang', []);

const shoucangList = shoucang.value.filter(item => item.isShouCang);
console.log(shoucang)

const onPlayMv = async (row) => {
  getMvUrl(row.id).then((res) => {
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
      <div class="songList mt-4" v-show="shoucangList.length">
        <el-table :data="shoucangList" style="width: 100%" :show-header="false">
          <el-table-column type="index" label="序号" min-width="10%" class="text-lg"/>
          <el-table-column prop="name" min-width="60%" label="歌名" :show-overflow-tooltip="true"/>
          <el-table-column prop="singers" min-width="20%" label="歌手" :show-overflow-tooltip="true"/>
          <el-table-column min-width="10%">
            <template #default="{row}">
              <svg
                   @click="onPlayMv(row)"
                   xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                   t="1649811868185"
                   class="icon cursor-pointer" viewBox="0 0 1024 1024" version="1.1" p-id="2593" width="22" height="22">
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

</style>
