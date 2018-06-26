/*
 * @Author lizhenhua
 * @version 2018/6/14
 * @description
 */
import $http from '@/util/$http'
import ajaxApi from '@/util/ajaxApi'

const appData = {
  state: {
    province: [],
    city: [],
    district: [],
    deptName:[],  //部门数据
  },
  mutations: {
    set_province: (state, province) => {
      state.province = province;
    },
    set_city: (state, city) => {
      state.city = city;
    },
    set_district: (state, district) => {
      state.district = district;
    },
    set_deptList: (state, deptName) => {
      state.deptName = deptName;
    },
  },
  actions: {
    getProvince({commit}){
      return new Promise((resolve, reject) => {
        if (appData.state.province.length == 0) {
          $http({
            url: ajaxApi.address,
            data: {
              pid: ''
            }
          }).then(res => {
            commit('set_province', res);
            resolve(res)
          }).catch(error => {
            console.log(error)
          })
        } else {
          resolve(appData.state.province)
        }
      })
    },
    getCity({commit}, id){
      return new Promise((resolve, reject) => {
        $http({
          url: ajaxApi.address,
          data: {
            pid: id
          }
        }).then(res => {
          commit('set_city', res);
          resolve(res)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getDistrict({commit}, id){
      return new Promise((resolve, reject) => {
        $http({
          url: ajaxApi.address,
          data: {
            pid: id
          }
        }).then(res => {
          commit('set_district', res);
          resolve(res)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getDeptList({commit},id){
      return new Promise((resolve, reject) => {
        if (appData.state.deptName.length == 0) {
          $http({
            url: ajaxApi.getDeptList,
            // data:{
            //   companyId:this.formData.companyId,
            //   headId:this.formData.companyId,
            // }
          }).then(res => {
            commit('set_deptList', res);
            resolve(res)
          }).catch(error => {
            console.log(error)
          })
        } else {
          resolve(appData.state.deptName)
        }
      })
    }
  },
}


export default appData

