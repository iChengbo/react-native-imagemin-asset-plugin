# react-native-imagemin-asset-plugin

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![npm-version](https://img.shields.io/npm/v/react-native-imagemin-asset-plugin)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)
[![npm](https://img.shields.io/npm/dm/react-native-imagemin-asset-plugin.svg)](https://www.npmjs.com/package/react-native-imagemin-asset-plugin)

**用于压缩 React-Native 图片资源的 metro 插件**

> 使用 [imagemin](https://github.com/imagemin/imagemin) 完美压缩 PNG, JPG, JPEG, GIF, SVG 和 WEBP 等格式图片。

<img width="414px" src="https://github.com/iChengbo/react-native-imagemin-asset-plugin/blob/next/example.png?raw=true" alt="example" />

## 使用

### 步骤 1: 安装

```sh
yarn add -D react-native-imagemin-asset-plugin
```

or

```sh
npm install --save-dev react-native-imagemin-asset-plugin
```

### 步骤 2: 配置 `metro.config.js`

如下，修改 `metro.config.js` 文件，在 `transformer` 中添加 `assetPlugins` 属性，并设置为 `['react-native-imagemin-asset-plugin']`

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

## 配置

如下，可以在 `metro.config.js` 文件的 `transformer` 属性中添加 `imageminAssetPlugin` 以自定义插件的功能。


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

| 属性      | 描述                                   | 参考                                                    |
| ----------- | --------------------------------------------- | ------------------------------------------------------------ |
| imageminDir | 存储压缩后图片的临时文件夹 | Default: `./node_modules/react-native-imagemin-asset-plugin/.compressed-images` |
| giflossy    | Compress GIF images                           | https://github.com/imagemin/imagemin-giflossy                |
| gifsicle    | Compress GIF images                           | https://github.com/imagemin/imagemin-gifsicle                |
| jpegtran    | Compress JPEG images                          | https://github.com/imagemin/imagemin-jpegtran                |
| mozjpeg     | Compress JPEG images                          | https://github.com/imagemin/imagemin-mozjpeg                 |
| optipng     | Compress PNG images                           | https://github.com/imagemin/imagemin-optipng                 |
| pngquant    | Compress PNG images                           | https://github.com/imagemin/imagemin-pngquant                |
| svgo        | Compress SVG images                           | https://github.com/imagemin/imagemin-svgo                    |
| webp        | Compress JPG & PNG images into WEBP*          | https://github.com/imagemin/imagemin-webp                    |


## 其他 

...
