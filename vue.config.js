module.exports = {
  lintOnSave: true,
  publicPath: '/',
  productionSourceMap: false,
  devServer: {
    port: 8001,
    before (app) {
    }
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '小蜜蜂课堂'
      return args
    })
  }
}
// 8001
