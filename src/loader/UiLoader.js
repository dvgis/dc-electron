/**
 * @Author: Caven
 * @Date: 2020-12-24 20:50:42
 */

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

class UiLoader {
  install(app) {
    app.use(Antd)
  }
}

const uiLoader = new UiLoader()

export default uiLoader
