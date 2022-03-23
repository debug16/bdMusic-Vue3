import axios from "axios";

const request = axios.create({
    baseURL: 'http://y.233c.cn/',
    timeout: 5000,
});

export default request;
