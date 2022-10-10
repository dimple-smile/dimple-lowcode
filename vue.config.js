const { defineConfig } = require('@vue/cli-service')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = () => {
  return defineConfig({
    transpileDependencies: true,
    css: {
      extract: false,
      loaderOptions: {
        less: {
          lessOptions: {
            modifyVars: {
              // 直接覆盖变量
              '@blue': '#4066e2',
            },
          },
        },
      },
    },
  })
}
