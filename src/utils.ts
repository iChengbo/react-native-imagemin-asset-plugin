import path from 'path';
import fs from 'fs/promises';
import type { Plugin } from 'imagemin';

import { ImageminMinimizer } from './config';

class InvalidConfigError extends Error {
  /**
   * @param {string | undefined} message
   */
  constructor(message?: string) {
    super(message);

    this.name = "InvalidConfigError";
  }
}

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
    throw new Error(
      "No plugins found for `imagemin`, please read documentation"
    );
  }

  const plugins: Plugin[] = [];
  for (const plugin of imageminConfig.plugins) {
    const isPluginArray = Array.isArray(plugin);

    if (typeof plugin === 'string' || isPluginArray) {
      const pluginName = isPluginArray ? plugin[0] : plugin;
      const pluginOptions = isPluginArray ? plugin[1] : undefined;

      let requiredPlugin = null;
      let requiredPluginName = `imagemin-${pluginName}`;

      try {
        requiredPlugin = (await import(requiredPluginName)).default(
          pluginOptions
        );
      } catch {
        requiredPluginName = pluginName;

        try {
          requiredPlugin = (await import(requiredPluginName)).default(
            pluginOptions
          );
        } catch {
          const pluginNameForError = pluginName.startsWith("imagemin")
            ? pluginName
            : `imagemin-${pluginName}`;

          throw new Error(
            `Unknown plugin: ${pluginNameForError}\n\nDid you forget to install the plugin?\nYou can install it with:\n\n$ npm install ${pluginNameForError} --save-dev\n$ yarn add ${pluginNameForError} --dev`
          );
        }
      }
      plugins.push(requiredPlugin);
    } else {
      throw new InvalidConfigError(
        `Invalid plugin configuration '${JSON.stringify(
          plugin
        )}', plugin configuration should be 'string' or '[string, object]'"`
      );
    }
  }
  return plugins;
}
