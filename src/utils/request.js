import axios from 'axios'
import store from '../store'
import {
  Loading
} from 'element-ui';

let loading = "";
let flag = 0;
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 15000,
  cancelToken: source.token
})
//不展示loading的请求url
const noLoadingReq = ["/dict/selectByType"];

service.interceptors.request.use(function (config) {
  flag++;
  if (noLoadingReq.indexOf(config.url) == -1) {
    loading = Loading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});


service.interceptors.response.use(function (response) {
  flag--;
  if (!flag && loading) {
    loading.close();
  }
  if (!response.data.success && response.data.data == "ErrorToLogin") {
    store.dispatch("LogOut");
  }
  return response;
}, function (error) {
  flag--;
  if (loading) {
    loading.close();
  }
  return Promise.reject(error);
});
export default service