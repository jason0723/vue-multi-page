/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Hallmader on 2018/4/18.
 */

class StringFormat {
  constructor() {}

  getByteLen(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i].match(/[^\x00-\xff]/ig) !== null) {
        len += 2;
      } else {
        len += 1;
      }
    }
    return len;
  }

  getStrByteLen(str, len) {
    let newStr = '',
      newLength = 0;
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 128) {
        newLength += 2;
      } else {
        newLength++;
      }
      if (newLength <= len) {
        newStr = newStr.concat(str[i]);
      } else {
        break;
      }
    }
    if (newLength > len) {
      newStr = newStr + ""
    }
    return newStr;
  }






  getByteLength(val) {
    let len = 0;
    for (let i = 0; i < val.length; i++) {
      len += 1;
    }
    return len;
  }

  getStrByteLength(str, len) {
    let newStr = '',
      newLength = 0;
    for (let i = 0; i < str.length; i++) {
      newLength++;
      if (newLength <= len) {
        newStr = newStr.concat(str[i]);
      } else {
        break;
      }
    }
    if (newLength > len) {
      newStr = newStr + ""
    }
    return newStr;
  }
  
  getStrCount(str, len) {
    let newStr = '',
      newLength = 0;
    for (let i = 0; i < str.length; i++) {
      newLength++;
      if (newLength <= len) {
        newStr = newStr.concat(str[i]);
      } else {
        break;
      }
    }
    if (newLength > len) {
      newStr = newStr + ""
    }
    let obj = {
      newStr: newStr,
      newLength: newLength
    }
    return obj;
  }
  //输入截取 计数
  getStrInputCut(str, len, count) {
    let _str = this.getStrCount(str, len);
    let outStatus = '';
    let lastCount = '';
    if (len - _str.newLength <= count) {
      outStatus = true;
      lastCount = len - _str.newLength>0?len - _str.newLength:0;
    } else {
      outStatus = false
    }
    return {str:_str.newStr,outStatus:outStatus,lastCount:lastCount}
  }
}


export default new StringFormat();
