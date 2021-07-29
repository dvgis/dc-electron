/**
 * @Author: Caven
 * @Date: 2020-12-24 12:59:51
 */

import httpLoader from './HttpLoader'
import compLoader from './CompLoader'
import uiLoader from './UiLoader'
import svgIconLoader from './SvgIconLoader'
import dcLoader from './DcLoader'

class AppLoader {
  install(app) {
    app.use(httpLoader)
    app.use(compLoader)
    app.use(uiLoader)
    app.use(svgIconLoader)
    app.use(dcLoader)
  }
}

const appLoader = new AppLoader()

export default appLoader
