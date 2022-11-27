/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import axios from 'axios';
const endpoints = {
  'login': '/user',
  'chat-channel': '/channel'
};
const axiosRoot = axios.create({
  baseURL: 'http://10.0.2.2:1001/api', //Android simular
  // baseURL: 'http://192.168.1.1:1001/api', // Android device
  // baseURL: 'http://127.0.0.1:1001/api', // Web});
});
export {endpoints};
export default axiosRoot;
