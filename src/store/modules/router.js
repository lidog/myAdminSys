/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

const router = {
  state:{
    router:[]
  },
  mutations:{
    SET_ROUTER:(state,router) => {
      state.router = router;
    },
  },
  actions:{
    setRouter({commit},router){
      commit('SET_ROUTER', router);
    },
  },
}


export default router
