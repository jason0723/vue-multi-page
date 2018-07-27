/**
 * @Desc:基础原型扩展
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/9/22.
 */

export default function prototype() {

  //删除数组中某项
  Array.prototype.removeByValue = function(val) {
    for (let i = 0; i < this.length; i++) {
      if (this[i] == val) {
        this.splice(i, 1);
        break;
      }
    }
  };

  window.version = "1.1.12";
};
