/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

export default {
  token: state => state.user.token,
  username: state => state.user.username,
  userId: state => state.user.userId,
  router: state => state.router.router,
}

