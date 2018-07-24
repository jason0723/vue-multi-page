/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2018/7/24.
 */
import TestOne from "../components/testOne";
import TestTwo from "../components/testTwo";

export default [{
  path:"/",
  redirect:"/home"
},{
  path:"/testTwo",
  name:"testTwo",
  component:TestTwo,
  meta:{
    keepAlive:true
  }
},{
  path: "/home",
  name: "home",
  component: TestOne,
  meta: {
    keepAlive: true
  },
},
]
