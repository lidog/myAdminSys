/*
 * @Author lizhenhua
 * @version 2018/5/22
 * @description
 */
import layout from '@/page/layout'

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
    return {
      main: require(`@/page/main/${name}/${name}`).default
    }
  }
}


