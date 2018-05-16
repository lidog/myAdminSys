import router from './router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式



router.beforeEach((to, from, next) => {
  NProgress.start()
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
        next()
    }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
