const Metro = require('metro');
const path = require('path');

const imagemin = require('imagemin');
// lossy plugins
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifLossy = require('imagemin-giflossy');
const imageminSvgO = require('imagemin-svgo');
const imageminWebP = require('imagemin-webp');
// lossless plugins
const imageminJpegTran = require('imagemin-jpegtran');
const imageminOptiPng = require('imagemin-optipng');
const imageminGifSicle = require('imagemin-gifsicle');

const defaultConfig = {
    test: /\.(png|jpg|jpeg)$/, // TODO:RegExp, minimatch glob ...
    imageminDir: './node_modules/react-native-imagemin-asset-plugin/.compressed-images',
    mozjpeg: {},
    pngquant: {},
    giflossy: null,
    svgo: null,
    webp: null,
    jpegtran: null,
    optipng: null,
    gifsicle: null,
};

/**
 * 
 * @returns {Object}
 */
async function buildAssetPluginConfig() {
    const metroConfig = await Metro.loadConfig();
    const transformerOptions = metroConfig.transformer || {};
    return Object.assign({}, defaultConfig, transformerOptions.imageminAssetPlugin);
}

/**
 * 
 * @param {Object} config 
 * @returns {Function[]}
 */
function buildImageminPlugins(config) {
    let plugins = [];
    for (const [plugin, pluginOptions] of [
        [imageminMozjpeg, config.mozjpeg],
        [imageminPngquant, config.pngquant],
        [imageminGifLossy, config.giflossy],
        [imageminSvgO, config.svgo],
        [imageminWebP, config.webp],
        [imageminJpegTran, config.jpegtran],
        [imageminOptiPng, config.optipng],
        [imageminGifSicle, config.gifsicle],
    ]) {
        if (pluginOptions != null) {
            plugins.push(plugin(pluginOptions));
        }
    }
    return plugins;
}

/**
 * imagemin assetPlugin
 * @param {Object} assetData
 * @returns {Object}
 */
async function _imageminAssetPlugin(assetData) {
    try {
        const options = await buildAssetPluginConfig();

        // TODO:excludes ?
        if (!/node_modules/.test(assetData.fileSystemLocation)) {
            const outputDirectory = path.join(
                process.cwd(),
                options.imageminDir,
                assetData.httpServerLocation
            );
            if (options.test.test(assetData.files[0])) {
                const tmpFiles = await imagemin(assetData.files, {
                    destination: outputDirectory,
                    plugins: buildImageminPlugins(options),
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
