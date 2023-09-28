import path from 'path'
import fs from 'fs/promises'

import type { AssetData } from 'metro'
import imagemin from 'imagemin'

import { buildAssetPluginConfig, buildImageminPlugins } from './config'
import type { IConfig } from './config'

(async () => {
  const options = await buildAssetPluginConfig()
  const _gitignore = path.join(process.cwd(), options.imageminDir, '.gitignore')
  try {
    await fs.access(_gitignore);
  } catch (error) {
    await fs.mkdir(path.join(process.cwd(), options.imageminDir))
    await fs.writeFile(_gitignore, '*')
  }
})();

/**
 * imagemin assetPlugin
 * @param {Object} assetData
 * @returns {Object}
 */
const _imageminAssetPlugin = async (assetData: AssetData): Promise<AssetData> => {
  try {
    const options: IConfig = await buildAssetPluginConfig();

    // TODO:excludes ? 
    if (!/node_modules/.test(assetData.fileSystemLocation)) {
      const outputDirectory = path.join(
        process.cwd(),
        options.imageminDir,
        // assetData.httpServerLocation
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

module.exports =  _imageminAssetPlugin;
