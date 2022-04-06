import {createWebHashHistory, createRouter} from 'vue-router'
import {getTopAlbum, getAlbumContent, getLoginStatus, loginPhone} from "./api";
import Home from '/src/components/Home/Home.vue'
import downTabBar from '/src/components/DownTabBar/DownTabBar.vue'
import upTabBar from '/src/components/UpTabBar/UpTabBar.vue'

import {store} from "./store";

export default createRouter({
    history: createWebHashHistory(),
    routes: [{
        path: '/',
        components: {
            default: Home,
            upTabBar,
            downTabBar,
        },
        keepAlive: true,    // 保持缓存
    }, {
        path: '/login',
        components: {
            login: () => import('/src/components/Login/Login.vue')
        },
        name: 'login'
    }, {
        path: '/me',
        components: {
            default: () => import('/src/view/me/V-Me.vue'),
            downTabBar
        },
        async beforeEnter(to, from, next) {
            // 判断是否登录 防止重复请求api
            if (JSON.stringify(store().userInfo) !== '{}') {
                next()
                return;
            }
            // 获取登录状态
            const {data: res} = await getLoginStatus()
            console.log(res)
            //没有登录
            if (res.code !== 200) {
                next({path: '/login',})
            } else {
                store().userInfo = res.profile;
                next();
            }
        }
    },
        {
            path: '/play',
            components: {
                default: () => import('/src/components/Lyric/Lyric.vue'),
                downTabBar,
            },
            name: 'play',
            keepAlive: true
        },
        {
            path: '/album',
            name: 'album',
            components: {
                default: () => import('/src/view/album/V-Album.vue'),
                downTabBar
            },
            // keepAlive: true,
            // async beforeEnter(to, from, next) {
            //     if (store().getWeekAlbums?.length) {
            //         next()
            //         return
            //     }
            //     const albumData = await getTopAlbum(50);
            //     if (albumData.code === 200) {
            //         store().setAlbums(albumData)
            //         next()
            //     } else {
            //         next('/')
            //     }
            // }
        }, {
            //404
            path: '/:notfound(.*)*',
            components: {
                default: () => import('/src/view/404/V-NotFound.vue'),
            },
        }, {
            path: '/albumDetails/:id(\\d*)',
            name: 'albumDetails',
            components: {
                default: () => import('/src/view/album/V-AlbumDetails.vue'),
            },
            async beforeEnter(to, from, next) {
                const albumContent = await getAlbumContent(to.params.id);
                if (albumContent.code === 200) {
                    store().setAlbumContent(albumContent)
                    next()
                } else {
                    next(from)
                }

            }
        },
    ]
})
