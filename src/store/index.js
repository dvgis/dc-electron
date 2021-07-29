/*
 * @Author: Caven
 * @Date: 2020-03-19 22:22:12
 * @Last Modified by: Caven
 * @Last Modified time: 2020-03-19 22:23:41
 */

import { createStore } from 'vuex'
import getters from './getters'

const store = createStore({
  getters,
  modules: {}
})

export default store
