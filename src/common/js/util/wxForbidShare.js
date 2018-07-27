/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：禁用微信内置分享---(如果想开放分享，则在url中拼接ishare=1)
 *
 * Created by Wangjingrong on 17/7/14.
 */


import ajax from "./ajax";
import net from "./net";

class forbidShare {
  constructor() {

  }
  wxforbidShare(opt){
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://res.wx.qq.com/open/js/jweixin-1.2.0.js";
    document.getElementsByTagName("body")[0].appendChild(script);
    console.log(encodeURIComponent(location.protocol+'//'+location.host+location.pathname+(location.search!=''?location.search:(location.href.indexOf('?')>-1?'?':''))));
    ajax({
      url: "/mcall/wx/api/v1/getJSConfig/",
      method: 'POST',
      data: {
        url: encodeURIComponent(location.protocol+'//'+location.host+location.pathname+(location.search!=''?location.search:(location.href.indexOf('?')>-1?'?':'')))	//TODO 在ios中url中带#参数请求返回的signature无效
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      done: function (data) {
        if (data.responseObject.responseData && data.responseObject.responseStatus) {
          let item = data.responseObject.responseData;
          console.log(item);
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: item.appId, // 必填，公众号的唯一标识
            timestamp: item.timestamp, // 必填，生成签名的时间戳
            nonceStr: item.noncestr, // 必填，生成签名的随机串
            signature: item.signature,// 必填，签名，见附录1
            jsApiList: [
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareQZone",
              "hideOptionMenu",
              "showOptionMenu",
              "getNetworkType",
              "getLocation",
              "openLocation",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "getLocalImgData",
              "scanQRCode",
              "hideMenuItems",
              "startRecord",
              "stopRecord",
              "playVoice"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          setTimeout(function() {
          if (opt&&opt.type =="terminal") {
            console.log("自执行ready")
            opt.callBack();
          } else {
            wx.ready(function(){
              console.log("微信JS接口列表配置成功");
              wx.hideOptionMenu();
            });
          }
          wx.error(function(err){
            console.log("微信JS接口列表配置失败",JSON.stringify(err));
          });
          }, 500);
        }
      },
      fail:function (err) {
        console.log(err);
        document.querySelector(".ev-loading").style.display="none";
      }
    })
  }
}
export default new forbidShare();



