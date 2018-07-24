/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2018/7/24.
 */
/**
 * @Desc：首页 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by gubowen on 17/12/04.
 */
import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
// import "static/scss/base.scss";
import route from "./route/route.config";
// import store from "./store/store";



class Home{
  constructor(){
    this.init();
  }

  init(){
    Vue.use(VueRouter);
    this.registerRouter();
    this.goToRouter();

    //Vue实例启动
    new Vue({
      el: '#app',
      // store,
      router: this.router,
      render: h => h(App)
    });
  }

  //路由实例化生成
  registerRouter(){
    this.router = new VueRouter({
      routes: route,
    });
  }

  //抓取缓存跳转当前路由页
  //Vue-router自身带有保存机制，参数通过query传递即可
  goToRouter() {
    // const path=localStorage.getItem("currentPath")?localStorage.getItem("currentPath"):"addPatient";
    // this.router.push("addPatient");
  }
}

let home = new Home();
if (module.hot) {
  module.hot.accept();
}
