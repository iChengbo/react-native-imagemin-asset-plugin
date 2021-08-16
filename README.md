# react-native-imagemin-asset-plugin

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
![LICENSE](https://img.shields.io/badge/license-MIT-blue)
![npm-version](https://img.shields.io/npm/v/react-native-imagemin-asset-plugin)
![npm](https://img.shields.io/npm/dm/react-native-imagemin-asset-plugin.svg)


## Installation

### npm

```
npm install --save-dev react-native-imagemin-asset-plugin
```

### metro

Add `react-native-imagemin-asset-plugin` to the list of `assetPlugins` in your `metro.config.js` file under the transformer section.

For example;

```js
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
    assetPlugins: ['react-native-imagemin-asset-plugin'],
  },
};
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

### imageminAssetPlugin.pngquant

> https://github.com/imagemin/imagemin-pngquant

### imageminAssetPlugin.mozjpeg
> https://github.com/imagemin/imagemin-mozjpeg


## Other 

...
