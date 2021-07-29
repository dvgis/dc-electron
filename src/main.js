/*
 * @Author: Caven
 * @Date: 2020-03-19 22:35:48
 * @Last Modified by: Caven
 * @Last Modified time: 2020-05-18 17:19:02
 */

import { createApp } from 'vue'
;(async () => {
  Promise.all([
    import('./App.vue'),
    import('./router'),
    import('./store'),
    import('./loader')
  ]).then(
    ([
      { default: App },
      { default: router },
      { default: store },
      { default: appLoader }
    ]) => {
      const app = createApp(App)
      app.config.productionTip = false
      app.use(appLoader)
      app.use(router)
      app.use(store)
      app.use(appLoader)
      app.mount('#app')
    }
  )
})()
