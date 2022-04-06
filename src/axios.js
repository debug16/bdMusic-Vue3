import axios from "axios";

const request = axios.create({
    baseURL: 'https://y.233c.cn', //http://cloud-music-api-lyart.vercel.app     https://y.233c.cn
    timeout: 100000,
});

export default request;
