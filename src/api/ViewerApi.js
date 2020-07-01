/*
 * @Author: Caven
 * @Date: 2020-05-07 19:28:33
 * @Last Modified by: Caven
 * @Last Modified time: 2020-07-01 10:59:08
 */

const { Cesium } = DC.Namespace

class ViewerApi {
  constructor() {
    this._viewer = undefined
  }

  set viewer(viewer) {
    this._viewer = viewer
  }
}

export default ViewerApi
