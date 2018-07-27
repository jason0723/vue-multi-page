/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/11/1.
 */
;
class SiteSwitch {
  constructor() {

  }

  weChatJudge(weChatFn,browserFn) {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes("micromessenger")){
      weChatFn(ua);
    }else{
      browserFn(ua);
    }
  }
}

export default new SiteSwitch();
