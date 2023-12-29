# react-native-imagemin-asset-plugin

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![npm-version](https://img.shields.io/npm/v/react-native-imagemin-asset-plugin)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)
[![npm](https://img.shields.io/npm/dm/react-native-imagemin-asset-plugin.svg)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)

**用于压缩 React-Native 图片资源的 metro 插件**

> 使用 [imagemin](https://github.com/imagemin/imagemin) 完美压缩 PNG, JPG, JPEG 格式图片或者将其转为 WEBP 格式图片。

<img width="414px" src="https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/master/example.png?raw=true" alt="example" />

## 安装

```sh
yarn add -D react-native-imagemin-asset-plugin imagemin
```

or

```sh
npm install --save-dev react-native-imagemin-asset-plugin imagemin
```

## 配置

你可以通过修改 `metro.config.js` 文件，在 `transformer` 中添加 `assetPlugins` 属性，并设置为 `['react-native-imagemin-asset-plugin']`

根据需求选择不同的压缩方式，有以下两种搭配供参考：

**推荐用于无损优化的 imagemin 插件**

```sh
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

**推荐用于有损优化的 imagemin 插件**

```sh
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

对于 `imagemin-svgo` v9.0.0+ 需要使用 svgo [配置](https://github.com/svg/svgo#configuration)


**metro.config.js (React Native Cli)**

```js
module.exports = {
  transformer: {
    // ...
    assetPlugins: ['react-native-imagemin-asset-plugin'],
    imageminAssetPlugin: {
      cacheDir: '.compressed-images',
      minimizer: {
        implementation: 'imagemin',
        options: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ["gifsicle", { interlaced: true }],
            ["jpegtran", { progressive: true }],
            ['pngquant'],
          ]
        }
      }
    },
  },
};
```
**metro.config.js (Expo Go)**

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// use plugin to compress assets
config.transformer.assetPlugins.push('react-native-imagemin-asset-plugin');
config.transformer.imageminAssetPlugin = {
  cacheDir: '.compressed-images',
  minimizer: {
    implementation: 'imagemin',
    options: {
      // Lossless optimization with custom option
      // Feel free to experiment with options for better result for you
      plugins: [
        ["gifsicle", { interlaced: true }],
        ["jpegtran", { progressive: true }],
        ['pngquant'],
      ]
    }
  }
}

module.exports = config;
```

## LICENSE

[MIT](./LICENSE)

## 其他 

...
