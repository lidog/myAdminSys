/*
 * @Author lizhenhua
 * @version 2018/5/16
 * @description
 */

import $http from '@/util/$http'
import {setToken, removeToken} from '@/util/cookie'
import ajaxApi from '@/util/ajaxApi'


const user = {
  state: {
    token: '',
    userId: '',
    username: '',
    res:{}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, username) => {
      state.username = username;
    },
    SET_ID: (state, userId) => {
      state.userId = userId;
    },
    SET_RES: (state, res) => {
      state.res = res;
    },
  },
  actions: {
    setUser({commit}, userInfo){
      commit('SET_NAME', userInfo.username);
      commit('SET_ID', userInfo.userId);
    },
    setToken({commit},token){
      commit('SET_TOKEN', token);
    },
    setRes({commit},res){
      commit('SET_RES', res);
    },
    Login({commit}, userInfo){
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then((res) => {
          commit('SET_NAME', res.realName);
          commit('SET_ID', res.userAccountId);
          commit('SET_TOKEN', res.token);
          commit('SET_RES', res);
          let date =  new Date(parseInt(res.expiry)).getDay();
          setToken(res.token,date);
          resolve(res)
        }).catch(error => {
          console.log(error)
          // reject(error) 直接输出错误，不需要再reject
        })
      })
      function login(username, password) {
        return $http({
          url: ajaxApi.user.login,
          data:{
            loginName: username,
            loginPassword: password,
            // appId: 'lext79987422-5180-40',
            appId: 'lext855b295d-9217-40',
            platType: 1
          },
        })
      }
    },
    Logout: function ({commit}) {
      return new Promise((suc) => {
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
