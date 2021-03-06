import axios from '../axios'

/**
 *
 * @param url url地址
 * @param params 请求得配置
 * @param config axios配置
 * @return {Promise<Object>}
 */
const request = async (url = '', params = {}, config = {}) => {
    let res = {'data': '', msg: ''};
    await axios.get(url, {
        params: {
            ...params
        },
        ...config
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
 * @returns {Promise<Object>}
 */
const newSong = async (type = 0) => {
    return await request('top/song', {type})
}

/**
 * 调用此接口 , 可获取 banner( 轮播图 ) 数据
 * @param {Number} type 0: pc 1: android 2: iphone 3: ipad
 * @returns {Promise<Object>}
 */
const getBanner = async (type = 0) => {
    return await request('banner', {type})
}

/**
 * 调用此接口, 传入的音乐 id
 * 可以获取对应的音乐的 url,未登录状态或者非会员返回试听片段(返回字段包含被截取的正常歌曲的开始时间和结束时间)
 * @param {Number} id 歌曲id
 * @param {Number} br 码率,默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
 * @returns {Promise<Object>}
 */
const getSongUrl = async (id = '', br = 999000) => {

    let arg = id;
    try {
        if (id instanceof Object && 'join' in id) {
            console.log(id);
            arg = id.join(',');
        }

        //检查音乐是否可用
        const {success, message} = await checkMusic(arg);
        if (!success) {
            return {
                data: success,
                msg: message
            }
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
 * @return {Promise<Object>}
 */
const checkMusic = async (id = '') => {
    return await request('/check/music', {id})
}

/**
 * 最新专辑
 * 获取云音乐首页新碟上架数据
 * @return {Promise<Object>}
 */
const getAlbumNewest = async () => {
    return await request('/album/newest')
}

/**
 * 新碟上架
 * 说明 : 调用此接口 , 可获取新碟上架列表 , 如需具体音乐信息需要调用获取专辑列表接 口 /album , 然后传入 id, 如 /album?id=32311&limit=30
 * @param limit 取出数量 , 默认为 50
 * @param offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @param area  ALL:全部,ZH:华语,EA:欧美,KR:韩国,JP:日本
 * @param type new:全部 hot:热门,默认为 new
 * @param year 年,默认本年
 * @param month ,默认本月
 * @return {Promise<Object>}
 */
const getTopAlbum = async (limit = 50, offset = 0, area = 'All', type = 'new', year, month) => {
    return await request('/top/album', {limit, offset, area, type, year, month})
}

/**
 * 获取专辑内容
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 * @param id 专辑id
 * @return {Promise<Object>}
 */
const getAlbumContent = async (id = 0) => {
    return await request('/album', {id})
}

/**
 * 手机号码密码登录
 * @param phone 手机号码
 * @param password 密码
 * @return {Promise<Object>}
 */
const loginPhone = async (phone = 0, password = '') => {
    return await request('http://cloud-music-api-lyart.vercel.app/login/cellphone', {
        phone,
        password
    }, {withCredentials: true,})
}

/**
 * 检查登录状态 是否登录了
 * @return {Promise<Object>}
 */
const getLoginStatus = async () => {
    return await request('https://cloud-music-api-lyart.vercel.app/login/status', {}, {withCredentials: true})
}

/**
 * 获取歌词
 * @param id 歌曲的id
 * @return {Promise<Object>}
 */
const getLyric = async (id) => {
    return await request('/lyric', {id},)
}

/**
 * 获取歌曲详情
 * @param ids 歌曲id 多个歌曲id用 , 分隔
 * @return {Promise<Object>}
 */
const getSongDetail = async ids => {
    return await request('/song/detail', {ids},)
}

/**
 * 歌曲搜索
 * @param keywords 搜索的歌曲
 * @return {Promise<Object>}
 */
const searchSongs = async keywords => {
    return await request('/search', {keywords},)
}
/**
 * 获取mvUrl
 * @param id mvId
 * @return {Promise<Object>}
 */
const getMvUrl = async id =>{
    return await request('/mv/url', {id},)
}
/**
 * 获取mv评论
 * @param id mvid
 * @return {Promise<Object>}
 */
const getMvComment = async id =>{
    return await request('/comment/mv', {id},)
}
export {
    newSong,
    getBanner,
    getSongUrl,
    checkMusic,
    getAlbumNewest,
    getTopAlbum,
    getAlbumContent,
    loginPhone,
    getLoginStatus,
    getLyric,
    getSongDetail,
    searchSongs,
    getMvUrl,
    getMvComment,
};
