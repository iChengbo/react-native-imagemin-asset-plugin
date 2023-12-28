import path from 'path';
import fs from 'fs/promises';
import type { Plugin } from 'imagemin';
import { AssetData } from 'metro';

import { ImageminMinimizer } from './config';

/**
 * Generate a .gitignore file in the specified directory if it doesn't already exist.
 * @param dir - The directory where the .gitignore file should be created.
 */
export const generateGitignoreFile = async (dir: string) => {
  const gitignorePath = path.join(process.cwd(), dir, '.gitignore')
  try {
    await fs.access(gitignorePath);
  } catch (error) {
    const directoryPath = path.join(process.cwd(), dir);
    await fs.mkdir(directoryPath)
    await fs.writeFile(gitignorePath, '*')
  }
}

/**
 * Runs imagemin on the given asset data and generates optimized image files.
 * 
 * @param assetData - The asset data containing the files to be optimized.
 * @param outputDirPath - The output directory path where the optimized files will be saved.
 * @param minimizerOptions - The options for the imagemin minimizer.
 * @returns The modified asset data with the optimized files.
 */
export const imageminGenerate = async (assetData: AssetData, outputDirPath: string, minimizerOptions: ImageminMinimizer['options']) => {
  const plugins = await imageminNormalizeConfig(minimizerOptions || {});

  let outFiles = assetData.files;
  try {
    const imagemin = (await import("imagemin")).default;
    const tmpFiles = await imagemin(assetData.files, {
      destination: outputDirPath,
      plugins,
    });
    outFiles = tmpFiles.map(file => file.destinationPath);
  } catch (error) {
    // FIXME: Error [ERR_REQUIRE_ESM]: require() of ES Module ...
    logError(error)
  }

  return {
    ...assetData,
    files: outFiles
  }
}

/**
 * Normalize the imagemin configuration by importing the required plugins and their options.
 * @param imageminConfig - The imagemin configuration.
 * @returns An array of plugins.
 * @throws If an unknown plugin is encountered or if the plugin configuration is invalid.
 */
export const imageminNormalizeConfig = async (imageminConfig: ImageminMinimizer['options']): Promise<Plugin[]> => {
  if (
    !imageminConfig ||
    !imageminConfig.plugins ||
    (imageminConfig.plugins && imageminConfig.plugins.length === 0)
  ) {
    const message = 'No plugins found for `imagemin`, please read documentation';
    logError(message);
    return []
  }

  const plugins: Plugin[] = [];
  for (const plugin of imageminConfig.plugins) {
    const isPluginArray = Array.isArray(plugin);

    if (typeof plugin === 'string' || isPluginArray) {
      const pluginName = isPluginArray ? plugin[0] : plugin;
      const pluginOptions = isPluginArray ? plugin[1] : undefined;

      let requiredPlugin = null;
      let requiredPluginName = pluginName.startsWith('imagemin-') ? pluginName : `imagemin-${pluginName}`;

      try {
        requiredPlugin = (await import(requiredPluginName)).default(
          pluginOptions
        );
      } catch {
        const message = `Unknown plugin: ${requiredPluginName}\n\nDid you forget to install the plugin?\nYou can install it with:\n\n$ npm install ${requiredPluginName} --save-dev\n$ yarn add ${requiredPluginName} --dev`
        logError(message)
      }
      plugins.push(requiredPlugin);
    } else {
      const message = `Invalid plugin configuration '${JSON.stringify(plugin)}', plugin configuration should be 'string' or '[string, object]'"`
      logError(message)
    }
  }
  return plugins;
}

/**
 * Returns a debounced version of the input function.
 * The debounced function will wait for a specified delay before invoking the original function.
 *
 * @param func - The function to be debounced.
 * @param delay - The delay in milliseconds.
 * @returns The debounced function.
 */
const debounce = (func: (...args: any[]) => void, delay: number): ((...args: any[]) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const logError = debounce((message: string) => {
  console.log('\x1B[31m%s\x1B[0m', '\n> An exception occurs in "react-native-imagemin-asset-plugin", which may cause compression of assets to fail.');
  console.log('\x1B[31m%s\x1B[0m', message)
}, 2000);
