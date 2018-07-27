/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Hallmader on 2018/4/18.
 */

export function addProperty(key, value) {
  return function (target) {
    target.prototype[key] = value;
  }
};

export function mixin(...args) {
  return function (target) {
    Object.assign(target.prototype, ...args);
  }
}


