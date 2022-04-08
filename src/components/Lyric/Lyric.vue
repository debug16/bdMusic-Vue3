<script setup>
defineProps({
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

</script>
<template>
  <div class="aduioBox flex h-full w-full flex-col mr-auto">
    <div class="lyrics flex-grow overflow-auto text-center flex basis-full flex-col justify-center relative ">
      <div class="relative h-10">
        <ul class="text-[#888687] text-sm -top-10 relative px-2  transition-top duration-500 transform ease-in-out " :style="{top:`${(-lyricIndex * 2.5)+2.5}rem`}">
          <li v-for="(item, index) in lyric" :key="index" :data-lyricIndex="index" :data-lyricTime="item.time"
              :class="{play:++index === lyricIndex}">
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

.lyrics ul li{
  @apply text-ellipsis h-10;
}
</style>
