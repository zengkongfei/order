'use strict'

const tagert = process.env.npm_lifecycle_event
process.stdout.write('the env config file is '+ tagert +'\n')
let base = {}
if (tagert === 'test') {
  base = {
    NODE_ENV: '"production"',
    BASE_API: '"http://192.168.30.230:4011/"'
  }
}else if (tagert === 'build') {
  base = {
    NODE_ENV: '"production"',
    BASE_API: '"http://47.111.99.118:4011/"'
  }
}else if (tagert === 'joint') {
  base = {
    NODE_ENV: '"production"',
    BASE_API: '"http://192.168.30.190:4011/"'
  }
}

module.exports = base
