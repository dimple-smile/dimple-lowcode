const px2vw = require('postcss-px-to-viewport-opt')
module.exports = {
  plugins: [
    px2vw({
      unitToConvert: 'px',
      viewportWidth: 1920,
      unitPrecision: 3,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: /(\/|\\)(vant)(\/|\\)/,
    }),
  ],
}
