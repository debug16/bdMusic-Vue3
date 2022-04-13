<script setup>
import {ElContainer, ElFooter, ElHeader, ElMain} from "element-plus";
import {useStorage} from '@vueuse/core'
import {getMvComment} from "/src/api/index";
import {store} from "/src/store";
import {computed, ref} from "vue";

const comments = ref([])
const userStore = store()

const dianzan = useStorage('dianzan', []);
const pinglun = useStorage('pinglun', []);
const shoucang = useStorage('shoucang', []);

const dianCount = computed(() => {
  const obj = dianzan.value.find(item => {
    return item.id === userStore.mvInfo.id
  });
  if (!obj) {
    return 0
  }
  return obj.count;
})

const onDianZan = (id) => {
  const dianzanList = dianzan.value;
  const index = dianzanList.findIndex(item => item.id === userStore.mvInfo.id);
  if (index === -1) {
    dianzanList.push({id, count: 1});
  } else {
    dianzanList[index].count += 1;
  }
  dianzan.value = dianzanList;
}

const onPingLun = (id) => {
  getMvComment(id).then(res => {
    if (res.code === 200) {
      comments.value = res.comments;
      console.log(comments.value)
    }
  })
}
const onShouCang = (mvInfo) => {
  const shoucangList = shoucang.value;
  const index = shoucangList.findIndex(item => item.id === mvInfo.id);
  if (index === -1) {
    shoucangList.push({...mvInfo, isShouCang: true});
  } else if (shoucangList[index].isShouCang) {
    shoucangList[index].isShouCang = false;
  } else {
    shoucangList[index].isShouCang = true;
  }
  shoucang.value = shoucangList;
}

const findShouCang = (id) => {
  const arr = shoucang.value.find(item => item.id === id);

  return arr?.isShouCang;
}

</script>

<template>
  <el-container
      v-show="userStore.isShowMv"
      class="w-full mx-auto overflow-hidden h-screen absolute left-0 z-50 text-[#fff] bg-black flex-col">
    <el-header class="flex justify-center items-center flex-col"
               @click="userStore.isShowMv = false">
      <div>《{{ userStore.mvInfo.name }}》</div>
      <div>{{ userStore.mvInfo.singers }}</div>
    </el-header>
    <el-main class="flex items-center justify-center">
      <video controls :src="userStore.mvInfo.url">
        <source :src="userStore.mvInfo.url" type="video/mp4">
        <source :src="userStore.mvInfo.url" type="video/ogg">
        您的浏览器不支持Video标签。
      </video>
    </el-main>
    <el-footer class="flex h-1/6 flex-col justify-end pb-16">
      <div class="space-y-6 footer_box flex flex-col justify-end items-end">
        <div class="dianzan">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="32px" height="32.00px" viewBox="0 0 1024 1024"
               version="1.1"
               @click="onDianZan(userStore.mvInfo.id)">
            <path fill="rgba(255,255,255,.5)"
                  d="M64 483.04V872c0 37.216 30.144 67.36 67.36 67.36H192V416.32l-60.64-0.64A67.36 67.36 0 0 0 64 483.04zM857.28 344.992l-267.808 1.696c12.576-44.256 18.944-83.584 18.944-118.208 0-78.56-68.832-155.488-137.568-145.504-60.608 8.8-67.264 61.184-67.264 126.816v59.264c0 76.064-63.84 140.864-137.856 148L256 416.96v522.4h527.552a102.72 102.72 0 0 0 100.928-83.584l73.728-388.96a102.72 102.72 0 0 0-100.928-121.824z"/>
          </svg>
          <span>{{ dianCount }}</span>
        </div>
        <div class="pinglun">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="32px" height="32.00px" viewBox="0 0 1024 1024"
               version="1.1"
               @click="onPingLun(userStore.mvInfo.id)">
            <path fill="rgba(255,255,255,.5)"
                  d="M512 0C226.742857 0 0 197.485714 0 446.171429c0 138.971429 73.142857 270.628571 190.171429 351.085714L190.171429 1024l226.742857-138.971429c29.257143 7.314286 65.828571 7.314286 95.085714 7.314286 285.257143 0 512-197.485714 512-446.171429C1024 197.485714 797.257143 0 512 0zM256 512C219.428571 512 190.171429 482.742857 190.171429 446.171429S219.428571 380.342857 256 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S292.571429 512 256 512zM512 512C475.428571 512 446.171429 482.742857 446.171429 446.171429S475.428571 380.342857 512 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S548.571429 512 512 512zM768 512C731.428571 512 702.171429 482.742857 702.171429 446.171429s29.257143-65.828571 65.828571-65.828571c36.571429 0 65.828571 29.257143 65.828571 65.828571S804.571429 512 768 512z"/>
          </svg>
        </div>
        <div class="shoucang">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" width="32px" height="32.00px" viewBox="0 0 1024 1024"
               version="1.1"
               @click="onShouCang(userStore.mvInfo)"
          >
            <path :fill="findShouCang(userStore.mvInfo.id) ? 'rgba(255,255,255,1)':'rgba(255,255,255,.5)'"
                  d="M512 760.224L298.944 918.08c-22.08 16.32-53.536 12.16-70.272-9.376a47.904 47.904 0 0 1-8-43.968l82.144-259.936-219.136-163.328a48.096 48.096 0 0 1-9.376-68.544c9.472-12.096 24.192-19.2 39.776-19.2l268.64-0.448 81.408-254.88c8.224-25.792 36.32-40.16 62.784-32.16 15.744 4.8 28.064 16.8 32.96 32.16l81.408 254.88 268.64 0.448c27.712 0.032 50.112 21.952 50.08 48.96 0 15.2-7.296 29.536-19.68 38.784l-219.136 163.328 82.144 259.936c8.16 25.792-6.688 53.184-33.152 61.12a51.2 51.2 0 0 1-45.12-7.776L512 760.224z"/>
          </svg>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>

<style scoped>
.footer_box div {
  @apply cursor-pointer
}
</style>
