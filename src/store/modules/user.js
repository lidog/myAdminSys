/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

import $http from '@/util/$http'
import {setToken,removeToken} from '@/util/cookie'
const user = {
  state:{
    token:'',
    userId:'',
    username:'',
  },
  mutations:{
    SET_TOKEN:(state,token) => {
      state.token = token;
    },
    SET_NAME:(state,username) => {
      state.username = username;
    },
    SET_ID:(state,userId) => {
      state.userId = userId;
    },
  },
  actions:{
    setUser({commit},userInfo){
      commit('SET_NAME', userInfo.username);
      commit('SET_ID', userInfo.userId);
    },
    Login({commit},userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((res) => {
          let data = res.data.data
          commit('SET_NAME', username);
          commit('SET_ID',data.userId);
          commit('SET_TOKEN',data.token);
          setToken(data.token)
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
      function login(username,password) {
         return $http({
            url: '/api/user/login',
            method: 'post',
            data: {
              username,
              password
            }
         })
      }
    },
    Logout:function ({commit}) {
      return new Promise((suc)=>{
        commit('SET_NAME', '');
        commit('SET_TOKEN', '');
        commit('SET_ID', '');
        removeToken();
        suc();
      })
    }
  },
}


export default user
