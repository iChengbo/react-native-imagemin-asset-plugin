import path from 'path';

import type { Plugin } from 'imagemin';

export interface ImageminMinimizer {
  implementation: 'imagemin',
  options: {
    plugins: Plugin[]
  }
}

export interface SharpMinimizer {
  implementation: 'sharp',
  options: {}
}

export interface IConfig {
  test: RegExp
  include?: RegExp | string
  exclude?: RegExp | string
  cacheDir: string
  minimizer?: ImageminMinimizer | SharpMinimizer
}

export const defaultConfig: IConfig = {
  test: /\.(png|jpg|jpeg)$/, // TODO:RegExp, minimatch glob ...
  cacheDir: '.assets-cache',
};

/**
 * Builds the configuration object.
 * @returns {Promise<IConfig>}
 */
export const buildConfig = async (): Promise<IConfig> => {
  const metroConfigPath = path.join(process.cwd(), 'metro.config.js')
  let metroConfig;
  try {
    metroConfig = require(metroConfigPath);
  } catch {
    metroConfig = {};
  }
  const transformerOptions = metroConfig.transformer || {};
  const imageminAssetPluginOptions = transformerOptions.imageminAssetPlugin || {};

  const config = {
    ...defaultConfig,
    ...imageminAssetPluginOptions,
  }

  return config;
}
