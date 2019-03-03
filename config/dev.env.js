'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.30.190:4011/"',
  //BASE_API: '"http://192.168.1.123:8080/"',
  BASE_DOWN_API: '"http://192.168.30.190:4004/"'
})
