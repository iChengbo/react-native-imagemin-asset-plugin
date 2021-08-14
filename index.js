/*
 * @Author: iChengbo
 * @Date: 2021-08-13 14:04:48
 * @LastEditors: iChengbo
 * @LastEditTime: 2021-08-14 10:39:39
 * @FilePath: /react-native-imagemin-asset-plugin/index.js
 */
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const path = require('path');

const cacheDir = 'img_cache';

const defaultConfig = {
    pngquant: {},
};

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
    const _options = Object.assign({}, defaultConfig, transformerOptions.imageminAssetPlugin);

    if (!/node_modules/.test(assetData.fileSystemLocation)) {
        const outputDirectory = path.join(
            __dirname,
            cacheDir,
            assetData.httpServerLocation
        );
        if (/\.png$/.test(assetData.files[0])) {
            const tmpFiles = await imagemin(assetData.files, {
                destination: outputDirectory,
                plugins: [imageminPngquant(_options.pngquant)],
            });
            const outFiles = tmpFiles.map(file => file.destinationPath);
            return {
                ...assetData,
                files: outFiles,
            };
        }
    }
    return assetData;
}

module.exports = reactNativeAssetPlugin;
