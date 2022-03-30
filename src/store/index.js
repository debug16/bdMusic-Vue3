import {defineStore} from 'pinia'
export const store = defineStore('main', {
    state() {
        return {
            //播放音乐的数据
            playMusic: {
            },
            //音乐id
            musicId: '',
            //最新歌曲的数据
            newMusicList: [],
            //是否在播放音乐
            checkPlay: false,
            //是否显示播放音乐的控制面板
            showPlay: false,
            //新碟上架的数据
            albums: {},
            //专辑内容的数据
            albumContent: {}
        }
    },
    actions: {
        setAlbums(data) {
            this.albums = data;
        },
        setAlbumContent(data) {
            this.albumContent = data;
        },
        //设置播放音乐id
        setMusicId(id) {
            this.musicId = id;
        },
    },
    getters: {
        //获取最新歌曲的数据
        getNewMusicList(state) {
            return state.newMusicList;
        },
        getPlayImgUrl(store) {
        },
        //获取音乐id
        getMusicId(store) {
            return store.musicId;
        },
        //获取新碟上架数据
        getAlbums(store) {
            return store.albums;
        },
        //获取本周新碟数据
        getWeekAlbums(store) {
            return store.albums.weekData;
        },
        //获取专辑歌曲数据
        getAlbumSong(store) {
            return store.albumContent.songs;
        },
        //获取专辑图片
        getAlbumImg(store) {
            return store.albumContent.album.picUrl;
        },
        //获取专辑名称
        getAlbumName(store) {
            return store.albumContent.album.name;
        },
        //获取专辑描述
        getAlbumDesc(store) {
            return store.albumContent.album.description;
        },
        //获取专辑发行时间
        getAlbumTime(store) {
            return store.albumContent.album.publishTime;
        },
        //获取专辑歌手并拼接 / 分隔
        getAlbumSinger(store) {
            let name = []
            //遍历歌手
            store.albumContent?.album.artists.forEach(value=>{
                name.push(value.name)
            })
            //拼接歌手
            return name.join(' / ');
        },
    }
})
