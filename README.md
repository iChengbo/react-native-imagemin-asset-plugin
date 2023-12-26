# react-native-imagemin-asset-plugin

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![npm-version](https://img.shields.io/npm/v/react-native-imagemin-asset-plugin)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)
[![npm](https://img.shields.io/npm/dm/react-native-imagemin-asset-plugin.svg)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)

[简体中文](https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/next/README-CN.md)

**Metro Asset plugin for compressing images in React Native.**

> Minify PNG, JPG, JPEG images or convert them to WEBP image with [imagemin](https://github.com/imagemin/imagemin)

<img width="414px" src="https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/next/example.png?raw=true" alt="example" />

## Usage

### Step 1: Install

```sh
yarn add -D react-native-imagemin-asset-plugin
```

or

```sh
npm install --save-dev react-native-imagemin-asset-plugin
```

### Step 2: Configure `metro.config.js`

Add `react-native-imagemin-asset-plugin` to the list of `assetPlugins` in your `metro.config.js` file under the transformer section.

For example;

> React Native Cli

```js
module.exports = {
  transformer: {
    // ...
    assetPlugins: ['react-native-imagemin-asset-plugin'],
  },
};
```

> Expo Go

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// use plugin to compress assets
config.transformer.assetPlugins.push('react-native-imagemin-asset-plugin')

module.exports = config;
```

## Configuration

You can configure the plugin behaviour through the optional `imageminAssetPlugin` field in your `metro.config.js` file under the `transformer` section.

For example;

```js
module.exports = {
  transformer: {
    // ...
    assetPlugins: ['react-native-imagemin-asset-plugin'],
    imageminAssetPlugin: {
      imageminDir: '.compressed-images',
      pngquant: {
        quality: [0.6, 0.8],
      },
      mozjpeg: {
        quality: 60,
      },
    },
  },
};
```

| Option                     | Description                                   | Reference                                     |
| -------------------------- | --------------------------------------------- | --------------------------------------------- |
| imageminDir                | Name of directory to store compressed images. | Default: `.shrunken`                          |
| giflossy<br />(deprecated) | (Lossy) Compress GIF images                   | https://github.com/imagemin/imagemin-giflossy |
| gifsicle                   | (Lossless) Compress GIF images                | https://github.com/imagemin/imagemin-gifsicle |
| mozjpeg                    | (Lossy) Compress JPEG images                  | https://github.com/imagemin/imagemin-mozjpeg  |
| jpegtran                   | (Lossless) Compress JPEG images               | https://github.com/imagemin/imagemin-jpegtran |
| pngquant                   | (Lossy) Compress PNG images                   | https://github.com/imagemin/imagemin-pngquant |
| optipng                    | (Lossless) Compress PNG images                | https://github.com/imagemin/imagemin-optipng  |
| svgo                       | (Lossy) Compress SVG images                   | https://github.com/imagemin/imagemin-svgo     |
| webp                       | Compress JPG & PNG images into WEBP           | https://github.com/imagemin/imagemin-webp     |


## LICENSE

[MIT](./LICENSE)

## Other 

...
