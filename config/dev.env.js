'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //如果是开发环境，加上“跨域”前缀 'ln'
  BASE_API:`''`
})
