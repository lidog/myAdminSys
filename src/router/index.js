import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login'
import layout from '@/page/layout'

Vue.use(Router)

//后端获取的权限控制数据；
var menu= [
  {
    icon:"el-icon-location",
    title:"导航一",
    index:"1",
    children:[
      {
        icon:"icon-daohang",
        name:"homePage",
        title:"首页",
        children:[]
      },
      {
        icon:"el-icon-menu",
        title:"page",
        children:[
          {
            icon:"el-icon-service",
            title:"page2",
            name:"page2",
          }
        ]
      },
    ]
  },
  {
    icon:"el-icon-location",
    title:"导航二",
    name:"page3",
  }
];

//动态获得路由
function getRouter(data) {
  if(data.length>0){
    let router = [];
    data.forEach(item=>{
      if(item.children&&item.children.length>0){
        item.children.forEach(child=>{
          if(child.children&&child.children.length>0){
            getItem(router,child.children[0]);
          }else {
            getItem(router,child)
          }
        })
      }else {
        getItem(router,item)
      }
    })
    return router
  }
  function getItem(router,item) {
    router.push({
      path:'/',
      component:layout,
      name:item.name,
      children: [
        {
          path: '/'+item.name,
          meta:{title:item.title,index:item.name,icon:item.icon},
          components:getComponents(item.name)
        }
      ]
    })
  }
  function getComponents(name) {
    return {
      main:require(`@/page/main/${name}/${name}`).default
    }
  }
}

var routes = [
  {path: '/', name: 'login', component: login}
]

export default new Router({
  routes:routes.concat(getRouter(menu))

  //--菜单模型
  /*routes: [
    {path: '/', name: 'login', component: login},
    {
      path:'/',
      component:layout,
      name:'homePage',
      children: [
        {
          path: '/homePage',
          meta:{title:"首页",index:"homePage",icon:''},
          components:getMainPage(homePage)
        }
      ]
    },
  ]*/
})

