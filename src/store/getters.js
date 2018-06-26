/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

export default {
  token: state => state.user.token,
  username: state => state.user.username,
  userId: state => state.user.userId,
  loginInfo: state=> state.user.res,
  router: state => state.router.router,
  rqRouter: state => state.router.rqRouter,
  address: state => state.appData,
  deptList: state => state.appData.deptList,
}

