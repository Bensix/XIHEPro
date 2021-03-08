'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://172.18.19.173:7777"'
  // API_URL: '"http://xsj.jomoo.cn"'
})
