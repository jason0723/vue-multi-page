import siteSwitch from "../siteSwitch/siteSwitch";

/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/9/27.
 */
class Net {
  constructor() {

  }

  getPara(symbol) {
    let url = window.location.origin + window.location.pathname + window.location.search;
    let param = {};
    let str, item;
    if (url.lastIndexOf(symbol ? symbol : "?") > 0) {
      str = url.substring(url.lastIndexOf(symbol ? symbol : "?") + 1, url.length);
      let arr = str.split("&");

      if (str.includes("urlQuery")) {
        str = decodeURIComponent(str);
        let _str;
        if (str.includes("[")&&str.includes("]")) {
          _str = str.substring(str.indexOf("[") + 1, str.indexOf("]"));
        } else if (str.includes("|")){
          _str = str.substring(str.indexOf("|") + 1, str.lastIndexOf("|"));
        }

        arr = arr.concat(_str.split(","));
      }

      for (let i = 0; i < arr.length; i++) {
        item = arr[i].split("=");
        param[item[0]] = decodeURIComponent(item[1]);
      }
    }


    // console.log(param)
    return param;
  }

  browser() {
    const u = navigator.userAgent, app = navigator.appVersion;
    return {
      trident: u.indexOf('Trident') > -1, //IE内核
      presto: u.indexOf('Presto') > -1, //opera内核
      webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
      iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, //是否iPad
      webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
      weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
      qq: u.match(/\sQQ/i) == " qq" //是否QQ
    }
  }

  getCookie(name) {
    let arr;
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
      return decodeURIComponent(arr[2]);
    }
    else {
      return null;
    }
  }

  getNetWork() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {tyep: 'unknown'};
    let type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'offline'];
    if (typeof(connection.type) == "number") {
      connection.type_text = type_text[connection.type || connection.effectiveType];
    } else {
      connection.type_text = connection.effectiveType;
    }
    if (typeof(connection.bandwidth) == "number") {
      if (connection.bandwidth > 10) {
        connection.type = 'wifi';
      } else if (connection.bandwidth > 2) {
        connection.type = '3g';
      } else if (connection.bandwidth > 0) {
        connection.type = '2g';
      } else if (connection.bandwidth == 0) {
        connection.type = 'offline';
      } else {
        connection.type = 'unknown';
      }
    }
    return connection.type_text;
  }

  getDeviceType() {
    let connection = "";
    let _browseType = this.isWXBrowse();
    if (_browseType === "androidWX") {
      connection = 'Android';
    } else if (_browseType === "iphoneWX") {
      connection = 'IOS';
    }
    return connection
  }

  getConnectType() {
    let connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {type: 'unknown'};
    let type_text = ['unknown', '', 'wifi', '2g', '3g', '4g', 'none'];
    let _browseType = this.isWXBrowse(),
      userAgentInfo = navigator.userAgent;
    let checkKey = '';
    if (typeof(connection.type) == "number") {
      connection.type_text = type_text[connection.type];
    } else {
      if (_browseType === "androidWX") {
        //Android通过返回type判断
        if (connection.type !== "WIFI" || connection.type !== "wifi") {
          if (userAgentInfo.indexOf("WIFI") > 0) {
            connection.type_text = 'wifi';
          } else {
            connection.type_text = 'other';
          }
        } else {
          connection.type_text = connection.type;
        }
      } else if (_browseType === "iphoneWX") {
        //ios没有返回type 通过设备类型里的NetType判断联网类型（尝试中 需测试）
        if (userAgentInfo.indexOf("WIFI") > 0) {
          connection.type_text = 'wifi';
        } else {
          connection.type_text = 'other';
        }
      } else {
        //除Android、ios微信浏览器之外的其他浏览器
        if (connection.type !== "undefined") {
          connection.type_text = connection.type;
        } else {
          //不识别网络或不兼容
          connection.type_text = 'other';
        }
      }
    }
    //通过Bandwidth判断网络类型（多数浏览器没有返回改字段）
    if (typeof(connection.bandwidth) == "number") {
      if (connection.bandwidth > 10) {
        connection.type = 'wifi';
      } else if (connection.bandwidth > 2) {
        connection.type = '3g';
      } else if (connection.bandwidth > 0) {
        connection.type = '2g';
      } else if (connection.bandwidth == 0) {
        connection.type = 'none';
      } else {
        connection.type = 'unknown';
      }
    }
    //返回类型 (1-wifi、0-other)
    if (connection.type_text == 'wifi') {
      checkKey = 1;
    } else {
      siteSwitch.weChatJudge(() => {
        checkKey = 0;  //微信浏览器
      }, () => {
        checkKey = 1;  //非微信浏览器
      })
    }
    return checkKey;
  }
}

export default new Net();
