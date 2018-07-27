/**
 * @Desc：ajax请求封装
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/14.
 */
import axios from "axios";

export default function ajax(param,type) {
  axios.interceptors.request.use(function (config) { //在请求发出之前进行一些操作
    if(type!="noUseLoad"){
      if (document.querySelector(".ev-loading")) {
        document.querySelector(".ev-loading").style.display = "block";
      }
    }
    param.beforeSend && param.beforeSend(config);
    return config;
  });

  axios({
    url: param.url,
    method: param.method,
    data: param.data,
    transformRequest: [function (data) {
      return "paramJson=" + JSON.stringify(data);
    }],
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    },
    timeout: 30000
  }).then((res) => {
    param.done(res.data);
    if(type!="noUseLoad"){
      if (!!document.querySelector(".ev-loading")) {
        document.querySelector(".ev-loading").style.display = "none";
      }
    }
  }).catch((err) => {
    if(type!="noUseLoad"){
      if (!!document.querySelector(".ev-loading")) {
        document.querySelector(".ev-loading").style.display = "none";
      }
    }
    param.fail && param.fail(err);
  });
}
