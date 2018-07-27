/**
 * @describe: 图片重传方法
 * @use:
 * @depend:
 * Created by Jukun on 2018/7/12.
 */

import api from "../util/util";
import siteSwitch from "../siteSwitch/siteSwitch";
// import imageCompress from "common/js/imgCompress/toCompress";
export default function reloadFiles(param) {
  let _weChat = "";
  const XHRList = {
    upload: "/mcall/customer/patient/case/attachment/v1/create/",
  };
  siteSwitch.weChatJudge(() => {
    _weChat = true;
  }, () => {
    _weChat = false;
  });
  console.log(_weChat);
  class reloadFile {
    constructor() {
      this.init();
    }
    init() {
      //判断微信环境
      console.log(param)
      this.upLoadPic(param);
    }
    //多图上传
    upLoadPic(param) {
      let that = this;
      this.hasImageUploading = true;
      param.uploadBefor()
      // if (!this.isWeChat) {

      // } else {
      // // 微信上传
      // if (typeof index !== "undefined") {
      //     that.imageList[index] = {
      //     blob: files,
      //     imgId: "",
      //     uploading: true,
      //     fail: false
      //     };
      // } else {
      //     that.imageList.unshift({
      //     blob: files,
      //     imgId: "",
      //     uploading: true,
      //     fail: false
      //     });
      // }
      // //上传前回调返回值
      // berforData = {
      //     blob: files,
      //     imgId: "",
      //     uploading: true,
      //     fail: false
      // }
      // that.$emit("beforeUpload", berforData);
      // param = {
      //     uploadType: "wxUpload",
      //     mediaId: base64,
      //     fileName: "",
      //     extName: "",
      //     caseId: "",
      //     imageType: 0,
      //     caseCategoryId: ""
      // };
      // }
      api.ajax({
        url: XHRList.upload,
        method: "POST",
        data: param.param,
        done(res) {
          console.log("----------重传结束-----------")
          console.log(res)
          if (res.responseObject.responseStatus) {
            //上传成功后回调返回值
            // param.uploadBefor()
            param.uploadDoneFn({
              blob: res.responseObject.responseData.logoUrl,
              imgId: res.responseObject.responsePk,
              uploading: false,
              fail: false,
              finish: true
            })
          } else {
            //上传失败后回调返回值
            param.uploadDoneFn({
              blob: '',
              imgId: '',
              uploading: false,
              fail: true,
              finish: true
            })
          }
          that.hasImageUploading = false;
        },
        fail(res) {
          console.log(res)
          //上传失败后回调返回值
          param.uploadDoneFn({
            blob: '',
            imgId: '',
            uploading: false,
            fail: true,
            finish: true
          })
        }
      });
    }
    //获取文件名
    getFileName(element) {
      let _fileName = "",
        _rex = /\./g,
        _rex2 = /\&/g;
      let _fileLocalName = "";
      if (element.name.match(_rex).length == 1) {
        _fileName = element.name.split(".")[1];
        _fileLocalName = element.name;
      } else {
        _fileName = element.name.split(".")[2];
        _fileLocalName =
          element.name.split(".")[0] +
          element.name.split(".")[1] +
          "." +
          element.name.split(".")[2];
      }
      if (_fileLocalName.indexOf("&") > 0) {
        _fileLocalName = _fileLocalName.replace(_rex2, "");
      }
      return {
        _fileName,
        _fileLocalName
      }
    }
  }
  new reloadFile(param);
}
