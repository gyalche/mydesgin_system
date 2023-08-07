module.exports = {
  name: 'rds-icons',
  inputDir: './assets/svg/icon',
  outputDir: './src/shared/css',
  fontTypes: ['ttf', 'woff', 'woff2'],
  assetTypes: ['css'],
  prefix: 'rds',
  getIconId: ({basename, relativeDirPath }) => `${relativeDirPath.replace(/\//g,"-")}-${basename}`
};
