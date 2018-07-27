/**
 * @Desc：帐号体系检测
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/9/22.
 */
import ajax from "./ajax";
import net from "./net";
export default function accountValidate() {
  //手机号验证
  let _phoneCheckParams = {
    isValid: 1, //  string  是   1
    firstResult: 0, //  string  是 分页参数
    maxResult: 99999, //  string  是 分页参数
    customerId: 0, //  string  是 用户id
  };
  //customsId获取（customerId和patientCustomerId同时存在的话取patientCustomerId）

  if (net.getPara().patientCustomerId !== undefined) {
    _phoneCheckParams.customerId = net.getPara().patientCustomerId.length === 0 ? 0 : net.getPara().patientCustomerId;
  } else if (net.getPara().customerId !== undefined) {
    _phoneCheckParams.customerId = net.getPara().customerId.length === 0 ? 0 : net.getPara().customerId;
  } else {
    _phoneCheckParams.customerId = 0;
    return;
  }

  ajax({
    url: "/mcall/patient/customer/unite/v1/getMapById/",
    method: 'POST',
    data: _phoneCheckParams,
    beforeSend: function () {
    },
    timeout: 2000,
    done(data) {
      localStorage.setItem("customerBaseInfo_one", JSON.stringify(data));
      if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
        let _mobile = data.responseObject.responseData.dataList[0].mobile;
        if (_mobile && _mobile.length > 0) {
          //已绑定手机号
          sessionStorage.removeItem("isReLoading");
          return true;
        } else {
          //未绑定手机号
          if(sessionStorage.getItem("isReLoading")&&sessionStorage.getItem("isReLoading")=="1"){
            return;
          }else{
            // accountValidate();
            sessionStorage.setItem("loginBack", window.location.href);
            window.location.href = '/dist/login.html?customerId=' + _phoneCheckParams.customerId;
          }
        }
      }else{
        //未绑定手机号
        if(sessionStorage.getItem("isReLoading")&&sessionStorage.getItem("isReLoading")=="1"){
          return;
        }else{
          // accountValidate();
          sessionStorage.setItem("loginBack", window.location.href);
          window.location.href = '/dist/login.html?customerId=' + _phoneCheckParams.customerId;
        }
      }
    }
  });
}
