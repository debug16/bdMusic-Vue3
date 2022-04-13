<script setup>
import {watch, ref, computed, onMounted} from "vue";

const ul = ref(null)
const lyricsBox = ref(null)
const props = defineProps({
  lyric: {
    type: Array,
    default: () => [{
      time: 0,
      text: '',
    }]
  },
  lyricIndex: {
    type: Number,
    default: 0,
  }
})
const ulPadding = ref(0)

watch(() => props.lyricIndex, (n) => {
  const offsetTop = ul.value?.querySelector(`li[data-lyricIndex="${n}"]`)?.offsetTop || 0
  // console.log(offsetTop)
  lyricsBox.value?.scrollTo({
    top: offsetTop,
    behavior: 'smooth'
  })
})

onMounted(() => {
  ulPadding.value = lyricsBox.value?.clientHeight / 22
  console.log(lyricsBox.value)
})


</script>
<template>
  <div class="aduioBox flex h-full w-full flex-col mr-auto">
    <div class="lyrics flex-grow overflow-auto text-center flex basis-full flex-col justify-center relative"
         ref="lyricsBox">
      <div class="relative h-10">
        <ul class="text-[#242424] text-sm relative px-2 space-y-6" ref="ul" :style="`padding-bottom: ${ulPadding}px`">
          <li v-for="(item, index) in lyric" :key="item.time" :data-lyricIndex="index" :data-lyricTime="item.time"
              :class="{play:index === lyricIndex}">
            {{ item.text }}
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<style scoped>
.play {
  color: #fff;
}

.lyrics ul li {
  @apply text-ellipsis leading-4;
}
</style>
