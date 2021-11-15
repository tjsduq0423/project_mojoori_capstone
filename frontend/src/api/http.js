import axios from "axios";

const instance = axios.create({
  baseURL: "ec2-13-125-115-211.ap-northeast-2.compute.amazonaws.com",
  withCredentials: true,
});

export default instance;
