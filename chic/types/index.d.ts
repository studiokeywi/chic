import { type ChicCSSBuilder } from './cssBuilder.js';
import { type ChicLoggers } from './loggers.js';
import { type ChicPlugin, type ChicPluginFunction, type ChicPlugins } from './plugins.js';
/** Builds a new instance of a Chic logger
 * @param {import('@studiokeywi/chic').ChicConfig} config Chic config
 * @returns A new Chic logger */
export declare const buildChic: ({ fixed, plugins }?: ChicConfig) => Chic;
/** Chic: CSS console formatting through tagged templates */
declare const _default: Chic;
export default _default;
export type { ChicPlugin, ChicPluginFunction } from './plugins.js';
/** Browser console logging with CSS formatting */
export type Chic = {
    /** Builds the current style string */
    (): string;
    /** Create a new Chic instances with the currently pending styles fixed  */
    fix(): Chic;
    /** Extra features available from installed plugins */
    plugins: ChicPlugins & {
        [plugin: string]: ChicPluginFunction;
    };
} & ChicCSSBuilder & ChicLoggers;
/** Configuration for building Chic instances */
export type ChicConfig = {
    /** Fixed styles to always apply when building style strings */
    fixed?: string[][];
    /** Plugins to extend Chic functionality */
    plugins?: ChicPlugin[];
};
