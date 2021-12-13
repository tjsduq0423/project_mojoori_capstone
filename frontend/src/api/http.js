import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API,
  withCredentials: true,
});

export default instance;
