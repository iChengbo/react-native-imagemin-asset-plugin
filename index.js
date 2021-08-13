/*
 * @Author: iChengbo
 * @Date: 2021-08-13 14:04:48
 * @LastEditors: iChengbo
 * @LastEditTime: 2021-08-13 14:05:52
 * @FilePath: /react-native-imagemin-asset-plugin/index.js
 */
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');

const cacheDir = '.img_cache';

async function compress(files, destination) {
    return await imagemin(files, {
        destination: destination,
        plugins: [imageminPngquant()],
    });
}

/**
 * @param {*} assetData
 * @returns
 */
async function reactNativeAssetPlugin(assetData) {
    const reg = /\.(png|jpg|jpeg|bmp)/;
    if (
        reg.test(assetData.files[0]) &&
        !/node_modules/.test(assetData.fileSystemLocation)
    ) {
        const outputDirectory = path.join(assetData.fileSystemLocation, cacheDir);
        const tmpFiles = await compress(assetData.files, outputDirectory);
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
