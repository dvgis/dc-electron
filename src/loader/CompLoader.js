/**
 * @Author: Caven
 * @Date: 2020-12-24 21:53:49
 */

const componentsWatcher = (scanner, app) => {
  scanner.keys().map((key) => {
    let name = scanner(key).default.name
    if (name) {
      app.component(name, scanner(key).default)
    }
  })
}

const vueScanner = require.context(
  '@/components',
  true,
  /^\.\/((?!\/)[\s\S])+\/index\.vue$/
)

class CompLoader {
  install(app) {
    componentsWatcher(vueScanner, app)
  }
}

const compLoader = new CompLoader()

export default compLoader
