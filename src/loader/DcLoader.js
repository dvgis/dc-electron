/**
 * @Author: Caven
 * @Date: 2021-01-20 17:19:04
 */

import DC from 'dvgis/dc-sdk/dist/dc.base.min'
import DcCore from 'dvgis/dc-sdk/dist/dc.core.min'
import 'dvgis/dc-sdk/dist/dc.core.min.css'

class DcLoader {
  install(app) {
    global.DC = DC
    DC.use(DcCore)
  }
}

const dcLoader = new DcLoader()

export default dcLoader
