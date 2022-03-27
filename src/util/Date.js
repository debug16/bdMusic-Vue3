const formateTime = time => {
    const h = parseInt(Math.floor(time / 3600))
    const minute = parseInt(Math.floor(time / 60 % 60))
    const second = Math.ceil(Math.floor(time % 60))
    const hours = h < 10 ? '0' + h : h
    const formatSecond = second > 59 ? 59 : second
    return `${hours > 0 ? `${hours}:` : ''}${minute < 10 ? '0' + minute : minute}:${formatSecond < 10 ? '0' + formatSecond : formatSecond}`
}

export {formateTime}
