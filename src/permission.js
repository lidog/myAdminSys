import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getRouter} from '@/util/getRouter'
import $http from '@/util/$http'
import store from '@/store'
import {getToken} from '@/util/cookie'
import {$alert} from "element-ui"
import Vue from 'vue';
import { MessageBox } from 'element-ui';
Vue.component(MessageBox.name, MessageBox );


const whiteList = ['/login']// 白名单页面数组


router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = getToken();
  //如果没有登录
  if(!token){
    //如果是白名单页面，直接跳
    if(whiteList.indexOf(to.path) !== -1){
      next();
    }else {
      //没有登录，也不是白名单，强制跳转到登录页
      MessageBox('你已被登出，可以取消继续留在该页面，或者重新登录', '重新登录', {
        confirmButtonText: '确定',
      }).then(()=>{
        next('/');
      });
    }
  }else {
    if (to.path === '/') {
      next({path: '/login'})
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      let username = store.getters.username;
      let newRouter = store.getters.router;
      //如果没有找到用户名（刷新了），重新申请并重载路由；
      if (!username || newRouter.length == 0) {
        $http({
          url: "/api/user",
          type: 'get',
        }).then(data => {
          let userInfo = data.data.data;
          store.dispatch('setUser', userInfo);
          $http({
            type: "get",
            url: "/api/router"
          }).then(response => {
            let newRouter = response.data.data;
            store.dispatch("setRouter", newRouter);
            router.addRoutes(getRouter(newRouter))
            next({...to, replace: true})
          })
        })
      } else {
        next()
      }
    }
  }

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
