import Metro from 'metro';

import type { Plugin } from 'imagemin';
import type { Options as MozjpegOptions } from 'imagemin-mozjpeg';
import type { Options as PngquantOptions } from 'imagemin-pngquant';
import type { Options as JpegTranOptions } from 'imagemin-jpegtran';
import type { Options as OptiPngOptions } from 'imagemin-optipng';
import type { Options as WebpOptions} from 'imagemin-webp';

// lossy plugins
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
// lossless plugins
import imageminJpegTran from 'imagemin-jpegtran';
import imageminOptiPng from 'imagemin-optipng';
import imageminWebp from 'imagemin-webp';

export interface ImageminOptions {
  mozjpeg: MozjpegOptions
  pngquant: PngquantOptions
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
  const metroConfig = await Metro.loadConfig();
  const transformerOptions = metroConfig.transformer || {};
  /**
   * FIXME: will result in a warning
   * `Unknown option "server.runInspectorProxy" with value true was found.
   * This is probably a typing mistake. Fixing it will remove this message.`
   */
  // @ts-ignore
  return Object.assign({}, defaultConfig, transformerOptions.imageminAssetPlugin);
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
  config.jpegtran && plugins.push(imageminJpegTran(config.jpegtran))
  config.optipng && plugins.push(imageminOptiPng(config.optipng))
  config.webp && plugins.push(imageminWebp(config.webp))
  return plugins
}