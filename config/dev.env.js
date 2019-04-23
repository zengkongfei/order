'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.30.230:4011/"',
  BASE_DOWN_API: '"http://192.168.30.230:4004/"'
})
