module.exports = {
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/style-editor/'
    : '/',
  outputDir: 'lib'
}
