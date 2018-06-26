/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

const router = {
  state:{
    router:[],
    rqRouter:false//是否申请过
  },
  mutations:{
    SET_ROUTER:(state,router) => {
      state.router = router;
    },
    setRQ:(state)=>{
      state.rqRouter = true;
    }
  },
  actions:{
    setRouter({commit},router){
      commit('SET_ROUTER', router);
    },
    hadRq({commit}){
      commit('setRQ');
    }
  },
}


export default router
