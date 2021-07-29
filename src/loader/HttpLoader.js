/**
 * @Author: Caven
 * @Date: 2020-12-24 20:44:54
 */

import axios from 'axios'

const instance = axios.create({
  timeout: 15000,
})

function initInterceptors(instance) {
  instance.interceptors.request.use(
    (config) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      return Promise.reject(error)
    }
  )
}

class HttpLoader {
  install(app) {
    app.config.globalProperties.$http = instance
    global.Http = instance
    Object.freeze(global.Http)
    initInterceptors(instance)
  }
}

const httpLoader = new HttpLoader()

export default httpLoader
