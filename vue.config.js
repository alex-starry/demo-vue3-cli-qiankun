const packageName = require('./package.json').name // eslint-disable-line
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers') // eslint-disable-line

module.exports = {
  publicPath: process.env.PUBLIC_PATH,
  // run vue-cli-service build folder, default dist
  outputDir: process.env.OUTPUT_DIR,
  indexPath: process.env.INDEX_PATH,
  // webpack 配置
  configureWebpack: {
    // externals: {
    //   // 此部分组件已经在html中统一添加
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    //   'element-ui': 'ELEMENT'
    // }
    plugins: [
      require('unplugin-vue-components/webpack')({ resolvers: [ElementPlusResolver()] }) // eslint-disable-line
    ],
    output: {
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`
    }
  },
  // webpack-dev-server 的选项
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    },
    disableHostCheck: true,
    port: 9999,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    // API 请求代理
    proxy: {
      '/mockGateway': {
        target: 'https://gateway.qysofti.com',
        pathRewrite: {
          '^/mockGateway': ''
        }
      }
    }
  }
}
