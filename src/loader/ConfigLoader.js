/*
 * @Author: Caven
 * @Date: 2019-10-12 12:48:10
 * @Last Modified by: Caven
 * @Last Modified time: 2020-07-08 12:57:55
 */

const JSON_TEMP = {
  url: {
    server: '',
    resource: ''
  },
  maps: []
}

class ConfigLoader {
  load() {
    if (process.env.IS_ELECTRON) {
      const HOME_PATH = process.env.HOME || process.env.USERPROFILE
      const fs = require('fs-extra')
      fs.exists(`${HOME_PATH}/.dc-conf`, exists => {
        !exists && fs.mkdirSync(`${HOME_PATH}/.dc-conf`)
        !exists &&
          fs.writeJsonSync(`${HOME_PATH}/.dc-conf/config.json`, JSON_TEMP)
        exists &&
          (global.Config = fs.readJsonSync(`${HOME_PATH}/.dc-conf/config.json`))
      })
    } else {
      global.Http.get('config/config.json')
        .then(res => {
          global.Config = res.data
          Promise.resolve()
        })
        .catch(e => {
          Promise.reject(e)
        })
    }
  }
}

const configLoader = new ConfigLoader()
export default configLoader
