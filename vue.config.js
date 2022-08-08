const { defineConfig } = require('@vue/cli-service')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = () => {
  return defineConfig({
    transpileDependencies: true,
    css: { extract: false },
    configureWebpack: {
      // plugins: [new BundleAnalyzerPlugin()],
    },
  })
}
