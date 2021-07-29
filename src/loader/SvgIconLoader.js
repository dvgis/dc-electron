/**
 * @Author: Caven
 * @Date: 2020-12-24 22:05:48
 */

const svgWatcher = (scanner) => scanner.keys().map(scanner)
const svgScanner = require.context('@/assets/svg/icons', false, /\.svg$/)

class SvgIconLoader {
  install(app) {
    svgWatcher(svgScanner)
  }
}

const svgIconLoader = new SvgIconLoader()

export default svgIconLoader
