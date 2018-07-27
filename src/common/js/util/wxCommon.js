/**
 * @Desc：微信公共方法
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/9/22.
 */
import net from "./net";
class WxCommon {
  constructor() {

  }

  // 检测是否获取过微信OpenId
  checkOpenId() {
    if (this.isWXBrowse() === "other") {
      return true;
    } else if(window.location.href.indexOf("m1.allinmed.cn")>0 || window.location.href.indexOf("m.allinmed.cn")>0){
      let _openId = localStorage.getItem("openId"),
      _userId = localStorage.getItem("userId"),
      _openIdCheck = localStorage.getItem("openIdCheckCustomer"),
      _checkKey = '';
      if (_openId != null && _userId ==_openIdCheck) {
        _checkKey = true;
      } else {
        _checkKey = false;
        // if (sessionStorage.getItem("count") && sessionStorage.getItem("count").length > 0) {
        //   sessionStorage.removeItem("count");
        // }
      }
      return _checkKey;
    }else{
      return true;
    }
  }

  isWXBrowse() {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("iphone") > 0) {
      return "iphoneWX";
    } else if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("android") > 0) {
      return "androidWX";
    }
    return "other";
  }

  //获取微信ID
  wxGetOpenId() {
    /* env环境变量参数
     * 1代表唯医骨科-正式线上环境
     * 2代表唯仁唯医社区-线下调试环境
     *
     *
     */

    let appId = "";
    let XHRUrl = "";
    let _currentPageUrl = (window.location.origin + window.location.pathname + window.location.search),
      _encodeUrl = encodeURIComponent(_currentPageUrl);

    let envCode = "";
    if (window.location.origin.includes("localhost")) {
      return false;
    }
    if (!window.location.hostname.includes("m1")) {
      envCode = 1;
    } else {
      envCode = 2;
    }

    if (envCode == 1) {
      appId = "wxe8384f7b06c169ef";
      XHRUrl = "http://m.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    } else if (envCode == 2) {
      appId = "wxaa5288ad7f627608";
      XHRUrl = "http://m1.allinmed.cn/mcall/wx/tocure/interact/v1/view/";
    }

    let _url = "https://open.weixin.qq.com/connect/oauth2/authorize?" +
      "appid=" + appId +
      "&redirect_uri=" + _encodeUrl +
      "&response_type=code" +
      "&scope=snsapi_userinfo" +
      "&state=STATE" +
      "#wechat_redirect";
    if (net.getPara().code) {
      if (window.location.href.indexOf("openId") === -1) {
        localStorage.removeItem("count");
        window.location.href = XHRUrl +
          "?ref=" + (window.location.origin + window.location.pathname)+
          //localStorage.getItem("currentUrl") +
          "&response_type=code" +
          "&scope=snsapi_base" +
          "&state=pay" +
          "&code=" + net.getPara().code +
          "#wechat_redirect";
      }
    } else {
      if (window.location.href.indexOf("openId") !== -1) {
        let count = localStorage.getItem("count");
        if (!count) {
          localStorage.setItem("count", 1);
          if (localStorage.getItem("currentUrl") && localStorage.getItem("currentUrl").indexOf("?") != -1) {
            window.location.href = localStorage.getItem("currentUrl") + "&openId=" + net.getPara().openId;
            localStorage.removeItem("isReLoading");
          } else {
            window.location.href = localStorage.getItem("currentUrl") + "?openId=" + net.getPara().openId;
            localStorage.removeItem("isReLoading");
          }
          localStorage.setItem("openId", net.getPara().openId);
          localStorage.setItem("openIdCheckCustomer", localStorage.getItem("userId"));
        }

      } else {
        localStorage.setItem("currentUrl", _currentPageUrl);
        localStorage.setItem("isReLoading","1");
        window.location.href = _url;
      }
    }
  };
}
export default new WxCommon();
