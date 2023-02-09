import { type Chic } from '../chic.js';
export { default as drawImage } from './drawImage.js';
export { default as labelMaker } from './labelMaker.js';
export { default as snoop } from './snoop.js';
export { default as timestamp } from './timestamp.js';
/** Extra functionality provided by a Chic plugin */
export interface ChicPluginFunction {
    <FN extends (...args: any[]) => any>(...args: Parameters<FN>): ReturnType<FN>;
    /** Optional cleanup function when uninstalled
     * @param chic The instance of Chic where this plugin was installed */
    uninstall?(chic: Chic): void;
}
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
