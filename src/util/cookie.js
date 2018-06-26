/*
 * @Author lizhenhua
 * @version 2018/5/21
 * @description
 */

import Cookies from 'js-cookie'

const TokenKey = 'ln-Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token,time) {
  return Cookies.set(TokenKey, token,{expiry:time})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


