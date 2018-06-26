import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import {getRouter} from '@/util/getRouter'
import $http from '@/util/$http'
import ajaxApi from '@/util/ajaxApi'
import store from '@/store'
import {getToken, removeToken} from '@/util/cookie'
import Vue from 'vue';
import {MessageBox} from 'element-ui';
Vue.component(MessageBox.name, MessageBox);


const whiteList = ['/login']// 白名单页面数组


router.beforeEach((to, from, next) => {
  NProgress.start()
  let token = getToken();
  //如果没有登录
  if (!token) {
    //如果是白名单页面，直接跳
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      //没有登录，也不是白名单，强制跳转到登录页
      MessageBox('你已被登出或者登陆过期，请重新登录(no-token)', '重新登录', {
        confirmButtonText: '确定',
      }).then(() => {
        next({path: '/login'})
      });
    }
  } else {
    if (to.path === '/login') {
      next()
      NProgress.done() // 进度
    } else {
      let username = store.getters.username;
      let rqRouter = store.getters.rqRouter;//是否申请过路由
      if (!username || !rqRouter) {
        Promise.all([
          //申请username
          $http({
            url: ajaxApi.user.userInfo,
          }),
          //申请menu
          $http({
            url: ajaxApi.user.menu,
            data:{
              applicationId: "910609ca-18f0-4e5f-bbf6-100a9f86fb4f"
            }
          })
        ]).then(([user,routerData]) => {
          let userInfo = {
            username: user.realName,
            userId: user.userAccountId
          }
          //then中的函数如果语法有错 也会被catch 捕获，陷入循环跳出bug，注意
          store.dispatch('setRes', user);
          store.dispatch('setToken', user.token);
          store.dispatch('setUser', userInfo);
          store.dispatch("setRouter", routerData);
          store.dispatch('hadRq');
          if(routerData.length>0){//如果routerData 返回 [] ;会报错
            router.addRoutes(getRouter(routerData));
          }
          next({...to, replace: true})
        }).catch(err => {
          console.log(err)
          MessageBox('你已被登出或者登陆过期，请重新登录', '重新登录', {
            confirmButtonText: '确定',
          }).then(() => {
            removeToken();
            next('/login')
          });
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
