# react-native-imagemin-asset-plugin


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
            quality: [0.3, 0.5],
            verbose: true,
        },
    },
  },
};
```