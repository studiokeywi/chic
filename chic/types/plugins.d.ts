import type { Chic } from './index.js';
export { default as drawImage } from './plugins/drawImage.js';
export { default as labelMaker } from './plugins/labelMaker.js';
export { default as snoop } from './plugins/snoop.js';
export { default as timestamp } from './plugins/timestamp.js';
/** A plugin to modify or add new Chic behaviors */
export type ChicPlugin = {
    /** Identifier for plugin's exported function */
    id: string;
    /** The installer function for this plugin
     * @param chic The instance of Chic where this plugin is installed */
    install(chic: Chic): ChicPluginFunction;
    /** Optional cleanup function when uninstalled
     * @param chic The instance of Chic where this plugin was installed */
    uninstall?(chic: Chic): void;
};
/** Extra functionality provided by a Chic plugin */
export interface ChicPluginFunction {
    <FN extends (...args: any[]) => any>(...args: Parameters<FN>): ReturnType<FN>;
    /** Optional cleanup function when uninstalled
     * @param chic The instance of Chic where this plugin was installed */
    uninstall?(chic: Chic): void;
}
/** Extra functionality provided by Chic plugins */
export interface ChicPlugins {
    /** Install a new plugin into Chic */
    install(plugin: ChicPlugin): void;
    /** Uninstall a plugin from Chic */
    uninstall(id: string): void;
}
