import Vue from 'vue'
import store from './store'
import App from './App'
import router from './router'
import { requestApi,submitApi,uploadApi } from './common/api/api'
import { _contrastStepName } from './common/utils/utils'
import { _loop1,_loop2,_loop3,_loop4,_loop5 } from './common/utils/loop'
import '@/css/reset.scss'
import '@/css/default.scss'
import axios from 'axios'
import moment from "moment"
import jsonConfig from './common/dataconfig/messList'
import "babel-polyfill"

const json = type => {
  return new Promise( resolve => {
    setTimeout( ()=> {
      resolve(jsonConfig[type])
    })
  })
}

Vue.prototype.$jsonApi = {json}
Vue.prototype.$axios = axios
axios.defaults.withCredentials=true
Vue.prototype.requestApi = requestApi
Vue.prototype.submitApi = submitApi
Vue.prototype.uploadApi = uploadApi
Vue.prototype.$moment = moment

Vue.prototype._contrastStepName = _contrastStepName
Vue.prototype._loop1 = _loop1
Vue.prototype._loop2 = _loop2
Vue.prototype._loop3 = _loop3
Vue.prototype._loop4 = _loop4
Vue.prototype._loop5 = _loop5


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import myStep from '@/components/my-step'
Vue.component('my-step', myStep)
import myBasicInfo from '@/components/my-basicInfo'
Vue.component('my-basicInfo', myBasicInfo)
import myTable from '@/components/my-table'
Vue.component('my-table', myTable)
import myCard from '@/components/my-card'
Vue.component('my-card', myCard)
import myMeasure from '@/components/my-measure'
Vue.component('my-measure', myMeasure)
import uplaod from '@/components/my-upload'
Vue.component('my-upload', uplaod)




new Vue({
  el: '#app',
  store,
  router,
  components: {App},
  template: '<App/>'
})
