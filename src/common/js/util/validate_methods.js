/**
 * @Desc：Vee-validate验证扩展项
 * @Usage:
 * @Notify：
 * @Depend：Vee-validate
 *
 * Created by Qiangkailiang on 17/8/11.
 */
import VeeValidator, {Validator}  from 'vee-validate';
class ValidateVerifiPolicy {
  constructor() {
    this.verifiPolicy();
  }

  verifiPolicy(){
    Validator.extend('password', {
      getMessage:field=>"密码长度应在6-20位之间",
      // messages: {
      //   en: (field, args) => {
      //     return "密码长度应在6-20位之间"
      //   },
      //   cn: (field, args) => {
      //     return "密码长度应在6-20位之间"
      //   },
      //   zh_CN: (field, args) => {
      //     return "密码长度应在6-20位之间"
      //   }
      // },
      validate: value => {
        return /^(\w){6,20}$/.test(value)
      }
    });
    Validator.extend('mobile', {
      getMessage:field=>"请填写真实手机号码",
      // messages: {
      //   en: (field, args) => {
      //     return "请填写真实手机号码"
      //   },
      //   cn: (field, args) => {
      //     return "请填写真实手机号码"
      //   }
      // },
      validate: value => {
        return value.length == 11 && (/^1\d{10}$/).test(value)
      }
    });

    Validator.extend('special', {
      getMessage(){

      },
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/[`~!！？@#$%^&*()_+<>?:"{},，。\/;'[\] ]/).test(value) && !(/[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig).test(value)
      }
    });

    Validator.extend('max_length', {
      getMessage(){

      },
      messages: {
        en: field => '请填写真实姓名',
      },
      validate: (value,args) => {
        let len = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].match(/[^\x00-\xff]/ig) !== null){
            len += 2;
          }
          else{
            len += 1;
          }
        }
        return len <= parseInt(args[0]);
      }
    });

    Validator.extend('min_length', {
      getMessage(){

      },
      messages: {
        en: field => '请填写真实姓名',
      },
      validate: (value,args) => {
        let len = 0;
        for (let i = 0; i < value.length; i++) {
          if (value[i].match(/[^\x00-\xff]/ig) !== null){
            len += 2;
          }
          else{
            len += 1;
          }
        }
        return len >= parseInt(args[0]);
      }
    });

    Validator.extend('isEmoji', {
      getMessage(){

      },
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(value)
      }
    });
    Validator.extend('noNumber', {
      getMessage(){

      },
      messages: {
        en: field => '请填写真实姓名，不能输入数字及特殊符号',
      },
      validate: value => {
        return !(/^(?=.*\d.*\b)/).test(value)
      }
    });
    Validator.extend('identityCard', {
      getMessage(){

      },
      messages: {
        en: field => '请输入有效证件号码',
      },
      validate: value => {
        let city = {
          11: "北京",
          12: "天津",
          13: "河北",
          14: "山西",
          15: "内蒙古",
          21: "辽宁",
          22: "吉林",
          23: "黑龙江 ",
          31: "上海",
          32: "江苏",
          33: "浙江",
          34: "安徽",
          35: "福建",
          36: "江西",
          37: "山东",
          41: "河南",
          42: "湖北 ",
          43: "湖南",
          44: "广东",
          45: "广西",
          46: "海南",
          50: "重庆",
          51: "四川",
          52: "贵州",
          53: "云南",
          54: "西藏 ",
          61: "陕西",
          62: "甘肃",
          63: "青海",
          64: "宁夏",
          65: "新疆",
          71: "台湾",
          81: "香港",
          82: "澳门",
          91: "国外 "
        };
        let tip = "",
          pass = true;
          value = value.toUpperCase();
        if (value.length == 15) {
          //15位身份证直接过
          pass = false;
        } else if (!value || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
          //tip = "身份证号格式错误";
          pass = false;
        } else if (!city[value.substr(0, 2)]) {
          //tip = "地址编码错误";
          pass = false;
        } else if (value.length == 18) {
          //18位身份证需要验证最后一位校验位
          value = value.split('');
          //∑(ai×Wi)(mod 11)
          //加权因子
          let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
            parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2],//校验位
            sum = 0,
            ai = 0,
            wi = 0;
          for (let i = 0; i < 17; i++) {
            ai = value[i];
            wi = factor[i];
            sum += ai * wi;
          }
          if (parity[sum % 11] != value[17]) {
            //tip = "校验位错误";
            pass = false;
          }
        }
        return pass;
      }
    });
  }
}
let v=new ValidateVerifiPolicy();

export default v;
