/**
 * @Desc：总入口方法集合
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/14.
 */
import ajax from "./ajax";
import ajaxNoLoading from "./ajaxNoLoading";
import prototype from "./prototype";
import wxCommon from "./wxCommon";
import accountValidate from "./accountValidate";
import forbidShare from "./wxForbidShare";
import siteSwitch from "../siteSwitch/siteSwitch";
import net from "./net";
import timeFormat from "./timeFormat";
import stringFormat from "./stringFormat";
// import reloadFile from "./reloadFiles";

import "babel-polyfill";
import {mixin, addProperty} from "@/common/js/allinmed_decorators/decorators";

@mixin({
  ajax,
  ajaxNoLoading,
  browser: net.browser,
  wxGetOpenId: wxCommon.wxGetOpenId,
  mobileCheck: accountValidate,
  checkOpenId: wxCommon.checkOpenId,
  isWXBrowse: wxCommon.isWXBrowse,
  getPara: net.getPara,
  getCookie: net.getCookie,
  getNetWork: net.getNetWork,
  getConnectType: net.getConnectType,
  getDeviceType: net.getDeviceType,
  timeFormate: timeFormat.timeFormate,
  MillisecondToDate: timeFormat.MillisecondToDate,
  MillisecondToDateNew: timeFormat.MillisecondToDateNew,
  getByteLen: stringFormat.getByteLen,
  getStrByteLen: stringFormat.getStrByteLen,
  getByteLength: stringFormat.getByteLength,
  getStrByteLength: stringFormat.getStrByteLength,
  getStrInputCut:stringFormat.getStrInputCut,
  getStrCount:stringFormat.getStrCount,
  // reloadFile:reloadFile
})

class Api {
  constructor() {
    prototype();
    this.vconsoleOpen();
  }

  //禁止分享
  forbidShare(opt) {
    siteSwitch.weChatJudge(() => {
      // if(!(window.location.href.includes("10.1") || window.location.href.includes("localhost"))){
        forbidShare.wxforbidShare(opt);
      // }
    }, () => {
      console.log("不需要禁止");
    })
  }
  //线上打开vconsole开关
  vconsoleOpen(){
    if(localStorage.getItem('vconsole')){
      let scriptOne = document.createElement("script");
      scriptOne.type = "text/javascript";
      scriptOne.src = "https://cdn.bootcss.com/vConsole/3.2.0/vconsole.min.js";
      document.getElementsByTagName("body")[0].appendChild(scriptOne);

      setTimeout(()=>{
        let scriptTwo = document.createElement("script");
        scriptTwo.innerHTML = "new VConsole();";
        document.getElementsByTagName("body")[0].appendChild(scriptTwo);
      },300)
    }
  }
  // 原生多事件注册
  addListenerMulti(el, s, fn) {
    s.split(' ').forEach(e => el.addEventListener(e, fn, false));
  }

  banZoom() {
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    })
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
      let now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false)
  }

  getStrByteLimit(str,limit) {
    let l = str.length;
    let z = 0;
    for (let i = 0; i < l; i++) {
      if (str.toString().charCodeAt(i) > 255) {
        z = z + 2;
      } else {
        z = z + 1;
      }
      if (z >= limit) {
        str = str.slice(0, (i + 1));
        break
      }
    }
    return str;
  }

  removeDub(arr) {
    return [...new Set(arr)];
  }

  removeByValue = function (arr, value) {
    for (let i = 0; i < this.length; i++) {
      if (arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
    return arr;
  }


  getSiteId() {
    let siteId = 0;
    if (this.getPara().hybrid && this.getPara().hybrid == 1) {
      siteId = this.getPara().siteId;
    } else {
      wxCommon.isWXBrowse() == 'other' ? siteId = 21 : siteId = 17;
    }
    return siteId;
  }


}

export default new Api;
