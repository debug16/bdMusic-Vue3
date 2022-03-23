import {defineStore} from 'pinia'

export const store = defineStore('main', {
    state() {
        return {
            //播放音乐的数据
            playMusic: {

            },
            //最新歌曲的数据
            newMusicList: [],
            //是否在播放音乐
            checkPlay: false,
            showPlay: false
        }
    },
    actions: {},
    getters: {}
})
