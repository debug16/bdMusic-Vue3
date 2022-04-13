import {defineStore} from 'pinia'

export const store = defineStore('main', {
    state() {
        return {
            // 用户数据
            userInfo: {},
            //播放音乐的数据
            playMusic: {},
            //mv数据
            mvInfo: {},
            //是否显示mv
            isShowMv: false,
            //音乐id
            musicId: '',
            //最新歌曲的数据
            newMusicList: [],
            //播放列表的数据
            playList: [],
            //是否在播放音乐
            checkPlay: false,
            //是否显示播放音乐的控制面板
            showPlay: false,
            //新碟上架的数据
            albums: {},
            //专辑内容的数据
            albumContent: {},
            //歌曲搜索列表
            searchSongsList: []
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
        //设置播放列表
        setPlayList(songList) {
            this.playList = songList;
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
            store.albumContent?.album.artists.forEach(value => {
                name.push(value.name)
            })
            //拼接歌手
            return name.join(' / ');
        },
        //获取下一首歌
        getNextSong() {
            return (songId) => {
                //找到当前播放的歌曲索引
                const findIndex = this.playList.findIndex(value => {
                    return value.id === songId;
                })
                //获取下一首歌曲
                return findIndex === this.playList.length - 1 ? this.playList[0] : this.playList[findIndex + 1];
            }

        },
        //获取上一首歌
        getPrevSong() {
            return (songId) => {
                //找到当前播放的歌曲索引
                const findIndex = this.playList.findIndex(value => {
                    return value.id === songId;
                })
                //获取上一首歌曲
                return findIndex === 0 ? this.playList[this.playList.length - 1] : this.playList[findIndex - 1];
            }
        },
    }
})
