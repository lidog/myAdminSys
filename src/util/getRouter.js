/*
 * @Author lizhenhua
 * @version 2018/5/22
 * @description
 */
import layout from '@/page/layout'

import homePage from '@/page/main/homePage/homePage.vue'

//动态获得路由
export function getRouter(data) {
  if (data.length > 0) {
    let router = [];
    data.forEach(item => {
      if (item.children && item.children.length > 0) {
        item.children.forEach(child => {
          if (child.children && child.children.length > 0) {
            getItem(router, child.children[0]);
          } else {
            getItem(router, child)
          }
        })
      } else {
        getItem(router, item)
      }
    })
    return router
  }

  function getItem(router, item) {
    router.push({
      path: '/'+ item.name,
      component: layout,
      name: item.name,
      children: [
        {
          path: '/' + item.name,
          meta: {title: item.title, index: item.name, icon: item.icon},
          components: getComponents(item.name)
        }
      ]
    })
  }

  function getComponents(name) {
    let main;
    //防止后端传过来的的router没有对应页面，要捕捉错误
    try{
      main =  require(`@/page/main/${name}/${name}`).default
    }catch(err){
      console.log("no such page: " + name)
      main = homePage
    }
    return {
      main: main
    }
  }
}


