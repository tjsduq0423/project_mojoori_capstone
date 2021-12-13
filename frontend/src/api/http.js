import axios from "axios";
import nprogress from "nprogress";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  nprogress.start();
  return config;
});

instance.interceptors.response.use((response) => {
  nprogress.done();
  return response;
});

export default instance;
