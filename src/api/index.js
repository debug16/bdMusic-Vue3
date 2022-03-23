import axios from '../axios'

const request = async (url = '', config = {}) => {
    let res = {'data': '', msg: ''};
    await axios.get(url, {
        params: {
            ...config
        }
    }).then(data => {
        res.data = data.data;
        res.msg = data.code;
    }).catch(e => {
        console.error('发生了错误：', e);
    })
    return res.data
}

/**
 * 获取最新歌曲
 * @param {Number} type 全部:0 华语:7 欧美:96 日本:8 韩国:16
 * @returns
 */
const newSong = async (type = 0) => {
    return await request('top/song', {type})
}

/**
 * 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * @param {Number} type 0: pc 1: android 2: iphone 3: ipad
 * @returns
 */
const getBanner = async (type = 0) => {
    return await request('banner', {type})
}

/**
 * 调用此接口, 传入的音乐 id
 * 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * @param {Number} id 歌曲id
 * @param {Number} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @returns
 */
const getSongUrl = async (id = '', br = 999000) => {
    let arg = id;
    try {
        if (id instanceof Object && 'join' in id) {
            console.log(id);
            arg = id.join(',');
        }
        return await request('song/url', {id: arg, br})
    } catch (e) {
        console.error(e);
        return new Error(e)
    }
}
/**
 * 调用此接口,传入歌曲 id, 可获取音乐是否可用,返回 { success: true, message: 'ok' } 或者 { success: false, message: '亲爱的,暂无版权' }
 * @param id 歌曲 id
 * @return {Promise<Error|any>}
 */
const checkMusic = async (id = '') => {
    return await request('song/url', {id})
}

export {newSong, getBanner, getSongUrl, checkMusic};
