import axios from "axios";

const request = axios.create({
    baseURL: 'https://cloud-music-api-lyart.vercel.app',
    timeout: 100000,
});

export default request;
