import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import layout from '@/page/layout'

Vue.use(Router)

export default new Router({
  routes:[
    {path: '/', redirect: '/login'},
    {path: '/login', name: 'login', component: login},
    {
      path:'/homePage',
      component:layout,
      name:'homePage',
      children: [
        {
          path: '/homePage',
          meta:{title:"首页",index:"homePage",icon:''},
          components:{
            main:require('@/page/main/homePage/homePage').default
          }
        }
      ]
    }
  ]
})

