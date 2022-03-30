/**
 * 格式话时间
 * @param {Number} time 需要格式话的时间
 * @returns {String} 格式话后的时间 00:00:00
 */
const formateTime = time => {
        const h = parseInt(Math.floor(time / 3600))
        const minute = parseInt(Math.floor(time / 60 % 60))
        const second = Math.ceil(Math.floor(time % 60))
        const hours = h < 10 ? '0' + h : h
        const formatSecond = second > 59 ? 59 : second
        return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
}

/**
 * 格式话时间
 * @param {time:Number} 时间戳
 * @return {String} 格式话后的时间
 */
const formateDate = time => {
        const date = new Date(time)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${year}-${month}-${day}`
}
export { formateTime,formateDate }
