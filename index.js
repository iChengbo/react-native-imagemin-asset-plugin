/*
 * @Author: iChengbo
 * @Date: 2021-08-13 14:04:48
 * @LastEditors: iChengbo
 * @LastEditTime: 2021-08-13 17:54:40
 * @FilePath: /react-native-imagemin-asset-plugin/index.js
 */
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');

const cacheDir = 'img_cache';

const defaultConfig = {
    pngquant: {},
};

async function compress(files, destination, options) {
    const _options = Object.assign({}, defaultConfig, options);
    return await imagemin(files, {
        destination: destination,
        plugins: [imageminPngquant(_options.pngquant)],
    });
}

/**
 * @param {*} assetData
 * @returns
 */
async function reactNativeAssetPlugin(assetData) {
    const metroConfigPath = path.join(process.cwd(), 'metro.config.js');
    let metroConfig;
    try {
        metroConfig = require(metroConfigPath);
    } catch {
        metroConfig = {};
    }
    const transformerOptions = metroConfig.transformer || {};

    const reg = /\.(png|jpg|jpeg|bmp)/;
    if (
        reg.test(assetData.files[0]) &&
        !/node_modules/.test(assetData.fileSystemLocation)
    ) {
        const outputDirectory = path.join(
            __dirname,
            cacheDir,
            assetData.httpServerLocation
        );
        const tmpFiles = await compress(assetData.files, outputDirectory, transformerOptions.imageminAssetPlugin);
        const outFiles = tmpFiles.map(file => {
            return file.destinationPath;
        });
        return {
            ...assetData,
            files: outFiles,
        };
    }
    return assetData;
}

module.exports = reactNativeAssetPlugin;
