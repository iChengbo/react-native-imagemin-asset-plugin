import path from 'path';

import type { Plugin } from 'imagemin';
import type { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import type { Options as PngquantOptions } from 'imagemin-pngquant';
import type { Options as SvgoOptions } from 'imagemin-svgo';
import type { Options as GifsicleOptions } from 'imagemin-gifsicle'
import type { Options as JpegTranOptions } from 'imagemin-jpegtran';
import type { Options as OptiPngOptions } from 'imagemin-optipng';
import type { Options as WebpOptions} from 'imagemin-webp';

// lossy plugins
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
// lossless plugins
import imageminGifsicle from 'imagemin-gifsicle';
import imageminJpegTran from 'imagemin-jpegtran';
import imageminOptiPng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';

export interface ImageminOptions {
  mozjpeg: MozjpegOptions
  pngquant: PngquantOptions
  svgo?: SvgoOptions
  gifsicle?: GifsicleOptions
  jpegtran?: JpegTranOptions
  optipng?: OptiPngOptions
  webp?: WebpOptions
}

export interface IConfig extends ImageminOptions {
  test: RegExp
  imageminDir: string
}

export const defaultConfig: IConfig = {
  test: /\.(png|jpg|jpeg)$/, // TODO:RegExp, minimatch glob ...
  imageminDir: '.shrunken',
  mozjpeg: {},
  pngquant: {},
};

/**
 * 
 * @returns {Promise<IConfig>}
 */
export const buildAssetPluginConfig = async (): Promise<IConfig> => {
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

/**
 * 
 * @param {ImageminOptions} config 
 * @returns {Plugin[]}
 */
export const buildImageminPlugins = (config: ImageminOptions): Plugin[] => {
  let plugins: Plugin[] = []
  config.mozjpeg && plugins.push(imageminMozjpeg(config.mozjpeg))
  config.pngquant && plugins.push(imageminPngquant(config.pngquant))
  config.svgo && plugins.push(imageminSvgo(config.svgo))
  config.gifsicle && plugins.push(imageminGifsicle(config.gifsicle))
  config.jpegtran && plugins.push(imageminJpegTran(config.jpegtran))
  config.optipng && plugins.push(imageminOptiPng(config.optipng))
  config.webp && plugins.push(imageminWebp(config.webp))
  return plugins
}