# DC-Electron

[**🇨🇳 中文**](./README.md) | [**🇬🇧English**](./README_en.md)

> 该脚手架基于 VueCli4 、 vue-cli-plugin-electron-builder 、 @dvgis/dc-sdk 搭建，用于快速构建 3D 桌面端应用。

## 启动

```node
yarn run serve
yarn run electron:serve
```

## 打包

```node
yarn run build
yarn run electron:build
```

## 配置说明

```js
const dvgis = './node_modules/@dvgis'
module.exports = {
  // 其他配置
  chainWebpack: config => {
    config.resolve.alias.set('dvgis', path.resolve(__dirname, dvgis))
    config.plugin('copy').use(CopywebpackPlugin, [
      [
        {
          from: path.join(__dirname, 'public'),
          to: path.join(__dirname, 'dist'),
          ignore: ['index.html']
        },
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
              from: path.join(__dirname, 'public'),
              to: path.join(__dirname, outputDir),
              ignore: ['index.html']
            },
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

## 全局变量 Config

> 获取对应配置文件赋予的值

> 桌面端： 当前用户目录下的 **_.dc-conf/config.json_**

> Web 端： 项目目录下的 **_public/config/config.json_**

## 示例

![pic](https://github.com/Digital-Visual/dc-electron/blob/master/pic.png)
