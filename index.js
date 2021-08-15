const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

const cacheDir = 'img_cache';

const defaultConfig = {
    pngquant: {},
    mozjpeg: {},
};

/**
 * @param {*} assetData
 * @returns
 */
async function _imageminAssetPlugin(assetData) {
    try {
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
            if (/\.(png|jpg|jpeg)$/.test(assetData.files[0])) {
                const tmpFiles = await imagemin(assetData.files, {
                    destination: outputDirectory,
                    plugins: [imageminPngquant(_options.pngquant), imageminMozjpeg(_options.mozjpeg)],
                });
                const outFiles = tmpFiles.map(file => file.destinationPath);
                return {
                    ...assetData,
                    files: outFiles,
                };
            }
        }
    } catch (error) {
        return assetData;
    }
    return assetData;
}

module.exports = _imageminAssetPlugin;
