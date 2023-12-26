import path from 'path';

import type { AssetData } from 'metro';
import imagemin from 'imagemin';

import type { IConfig, ImageminMinimizer } from './config';
import { buildConfig } from './config';
import { generateGitignoreFile, imageminNormalizeConfig } from './utils';

let _config: IConfig

/**
 * imagemin assetPlugin
 * @param {Object} assetData
 * @returns {Object}
 */
const _imageminAssetPlugin = async (assetData: AssetData): Promise<AssetData> => {
  try {
    if (!_config) {
      _config = await buildConfig()
      await generateGitignoreFile(_config.cacheDir)
    }

    const {
      cacheDir,
      test,
      minimizer,
      include,
      exclude = 'node_modules'
    } = _config

    const excludeRegexp = new RegExp(exclude)

    if (!excludeRegexp.test(assetData.fileSystemLocation)) {
      const outputDirectory = path.join(process.cwd(), cacheDir);

      if (test.test(assetData.files[0])) {
        const { implementation = 'imagemin', options = [] } = minimizer ?? {}

        if (implementation === 'imagemin') {
          // TODO: refactor and remove it to utils.ts
          const plugins = await imageminNormalizeConfig(options as ImageminMinimizer['options'])
          const tmpFiles = await imagemin(assetData.files, {
            destination: outputDirectory,
            plugins,
          });
          const outFiles = tmpFiles.map(file => file.destinationPath);
          return {
            ...assetData,
            files: outFiles,
          };
        }
        // TODO: handle sharp implementation
      }
    }
  } catch (error) {
    return assetData;
  }
  return assetData;
}

module.exports = _imageminAssetPlugin;
