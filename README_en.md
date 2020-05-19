# DC-Electron

[**🇨🇳 中文**](./README.md) | [**🇬🇧English**](./README_en.md)

> This scaffold is built based on VueCli4, vue-cli-plugin-electronic-builder and @dvgis/dc-sdk, which is used to quickly build 3D desktop applications.

## Start

```node
yarn run serve
yarn run electron:serve
```

## Package

```node
yarn run build
yarn run electron:build
```

## Configuration

```js
const dvgis = './node_modules/@dvgis'
module.exports = {
  // Other configuration
  chainWebpack: config => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgis))
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(dvgis, 'dc-sdk/dist/resources'),
          to: path.join(__dirname, 'dist', 'libs/dc-sdk/resources')
        }
      ]
    ])
  },
  pluginOptions: {
    electronBuilder: {
      chainWebpackMainProcess: config => {
        let outputDir = 'dist_electron/bundled'
        fs.removeSync(path.join(__dirname, outputDir, 'Assets'))
        fs.removeSync(path.join(__dirname, outputDir, 'Widgets'))
        fs.removeSync(path.join(__dirname, outputDir, 'Workers'))
        fs.removeSync(path.join(__dirname, outputDir, 'ThirdParty'))
        config.plugin('copy').use(CopywebpackPlugin, [
          [
            {
              from: path.join(dvgis, 'dc-sdk/dist/resources'),
              to: path.join(__dirname, outputDir, 'libs/dc-sdk/resources')
            }
          ]
        ])
      },
      chainWebpackRendererProcess: config => {
        config.plugin('define').tap(args => {
          const env = args[0]['process.env']
          for (let key in env) {
            args[0][`process.env.${key}`] = env[key]
          }
          delete args[0]['process.env']
          return args
        })
      }
    }
  }
}
```

## Global variable Config

> gets the value assigned by the corresponding configuration file
> desktop: **_.dc-conf/config.json_** in the current user directory
> Web side: the project directory **_public/config/config json_**

## demo

![pic]('./pic.png')
