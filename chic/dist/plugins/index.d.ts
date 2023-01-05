import { Chic } from '../index.js';
export { default as drawImage } from './drawImage.js';
export { default as labelMaker } from './labelMaker.js';
/** Extra functionality provided by a Chic plugin */
export interface ChicPluginFunction<T> {
    (...args: any[]): T;
}
/** A plugin to modify or add new Chic behaviors */
export type ChicPlugin = {
    /** The installer function for this plugin
     * @param chic The instance of Chic where this plugin is installed */
    install(chic: Chic): void;
};
