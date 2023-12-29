# react-native-imagemin-asset-plugin

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![npm-version](https://img.shields.io/npm/v/react-native-imagemin-asset-plugin)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)
[![npm](https://img.shields.io/npm/dm/react-native-imagemin-asset-plugin.svg)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)

[简体中文](https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/next/README-CN.md)

**Metro Asset plugin for compressing images in React Native.**

> Minify PNG, JPG, JPEG images or convert them to WEBP image with [imagemin](https://github.com/imagemin/imagemin)

<img width="414px" src="https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/master/example.png?raw=true" alt="example" />

## Install

```sh
yarn add -D react-native-imagemin-asset-plugin imagemin
```

or

```sh
npm install --save-dev react-native-imagemin-asset-plugin imagemin
```

> **Warning**
>
> imagemin uses plugin to optimize/generate images, so you need to install them too

## Configuration

You can configure the plugin behaviour through the optional `assetPlugins` field in your `metro.config.js` file under the `transformer` section.

Explore the options to get the best result for you.

**Recommended imagemin plugins for lossless optimization**

```sh
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
```

**Recommended imagemin plugins for lossy optimization**

```sh
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo --save-dev
```

For `imagemin-svgo` v9.0.0+ need use svgo [configuration](https://github.com/svg/svgo#configuration)


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

## Other 

...
