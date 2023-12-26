// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// use plugin to compress assets
config.transformer.assetPlugins.push('react-native-imagemin-asset-plugin')
config.transformer.imageminAssetPlugin = {
  minimizer: {
    implementation: 'imagemin',
    options: {
      plugins: [
        ['pngquant'],
      ]
    }
  }
}
module.exports = config;
