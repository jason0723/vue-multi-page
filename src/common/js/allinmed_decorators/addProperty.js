/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Hallmader on 2018/4/18.
 */
export default function addProperty(key, value) {
  return function (target) {
    target.prototype[key] = value;
  }
};
