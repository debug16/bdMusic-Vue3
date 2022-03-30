<script setup>
import {ElHeader} from "element-plus";
import {useRouter} from "vue-router";

const props = defineProps({
  title: {
    default: '',
    type: String
  }
})

const router = useRouter();

const fallback = () => {
  router.go(-1)
}

</script>
<template>
  <el-header>
    <div class="flex h-full items-center">
      <div @click="fallback">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-gray-500 cursor-pointer" fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
             stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </div>
      <div><span class="text-md ml-2">{{ props.title }}</span></div>
    </div>
  </el-header>
</template>

<style scoped>
.el-header {
  height: 45px;
  padding: 0 8px;
}
</style>
