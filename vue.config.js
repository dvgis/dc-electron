/*
 * @Author: Caven
 * @Date: 2018-12-15 00:33:19
 * @Last Modified by: Caven
 * @Last Modified time: 2020-06-17 17:27:52
 */
'use strict'
const path = require('path')
const fs = require('fs-extra')

const CopywebpackPlugin = require('copy-webpack-plugin')
const dvgis = './node_modules/@dvgis'

let resolve = dir => {
  return path.resolve(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  productionSourceMap: false,
  configureWebpack: {
    module: {
      unknownContextCritical: false
    },
    performance: {
      hints: false
    }
  },
  chainWebpack: config => {
    config.resolve.extensions
      .add('.js')
      .add('.vue')
      .end()
      .alias.set('dvgis', resolve(dvgis))
      .end()

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: 'images/[name].[ext]',
        limit: 10000
      })
      .end()

    config.module
      .rule('fonts')
      .test(/\.(eot|ttf|woff|woff2)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        name: 'fonts/[name].[ext]',
        limit: 10000
      })
      .end()

    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svg/icons'))
      .end()

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svg/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

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
