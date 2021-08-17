const Metro = require('metro');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminMozjpeg = require('imagemin-mozjpeg');
const path = require('path');

const defaultConfig = {
    imageminDir: './node_modules/react-native-imagemin-asset-plugin/.compressed-images',
    pngquant: {},
    mozjpeg: {},
};

/**
 * imagemin assetPlugin
 * @param {*} assetData
 * @returns
 */
async function _imageminAssetPlugin(assetData) {
    try {
        const metroConfig = await Metro.loadConfig();
        const transformerOptions = metroConfig.transformer || {};
        const _options = Object.assign({}, defaultConfig, transformerOptions.imageminAssetPlugin);
    
        if (!/node_modules/.test(assetData.fileSystemLocation)) {
            const outputDirectory = path.join(
                process.cwd(),
                _options.imageminDir,
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
