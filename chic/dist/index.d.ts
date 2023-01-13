import { ChicPlugin, ChicPluginFunction } from './plugins/index.js';
/** Builds a new instance of a Chic logger
 * @param {import('@studiokeywi/chic').ChicConfig} config Chic config
 * @returns A new Chic logger with styles that will always apply */
export declare const buildChic: ({ fixed, plugins }?: ChicConfig) => Chic;
/** Chic: CSS console formatting through tagged templates */
declare const _default: Chic;
export default _default;
/** Extra functionality provided by Chic plugins */
interface ChicPlugins {
    install(plugin: ChicPlugin): void;
    uninstall(id: string): void;
}
/** Chic style builder proxy */
type ChicCSS = {
    /** Append a new segment to the current style */
    [css: string]: Chic;
};
/** Browser console logging with CSS formatting */
export type Chic = {
    /** Builds the current style string */
    (): string;
    /** Extra features available from installed plugins */
    plugins: ChicPlugins & {
        [plugin: string]: ChicPluginFunction;
    };
    /** Create a new Chic instances with the currently pending styles fixed  */
    fix(): Chic;
} & ChicCSS & ChicLoggers;
/** Configuration for building Chic instances */
export type ChicConfig = {
    /** Fixed styles to always apply when building style strings */
    fixed?: string[][];
    /** Plugins to extend Chic functionality */
    plugins?: ChicPlugin[];
};
export type ChicLogger = {
    (strs: TemplateStringsArray | string[], ...styles: string[]): void;
};
export type ChicLoggers = {
    /** Logs to the debug level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.debug(['Signed in as:', username], '', chic.fontWeight.bold()) */
    debug(strs: string[], ...styles: string[]): void;
    /** Logs to the debug level console using a tagged template
     * @example chic.debug`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    debug(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Logs to the error level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.error(['Signed in as:', username], '', chic.fontWeight.bold()) */
    error(strs: string[], ...styles: string[]): void;
    /** Logs to the error level console using a tagged template
     * @example chic.error`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    error(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Logs to the group level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.group(['Signed in as:', username], '', chic.fontWeight.bold()) */
    group(strs: string[], ...styles: string[]): void;
    /** Logs to the group level console using a tagged template
     * @example chic.group`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    group(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Logs to the groupCollapsed level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.groupCollapsed(['Signed in as:', username], '', chic.fontWeight.bold()) */
    groupCollapsed(strs: string[], ...styles: string[]): void;
    /** Logs to the groupCollapsed level console using a tagged template
     * @example chic.groupCollapsed`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    groupCollapsed(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Ends the current console group */
    groupEnd(): void;
    /** Logs to the default level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.info(['Signed in as:', username], '', chic.fontWeight.bold()) */
    info(strs: string[], ...styles: string[]): void;
    /** Logs to the default level console using a tagged template
     * @example chic.info`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    info(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Logs to the default level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.log(['Signed in as:', username], '', chic.fontWeight.bold()) */
    log(strs: string[], ...styles: string[]): void;
    /** Logs to the default level console using a tagged template
     * @example chic.log`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    log(strs: TemplateStringsArray, ...styles: string[]): void;
    /** Logs to the warn level console. Use this syntax when you want to apply styling to a variable
     * @param strs Text to display. Include variables that need styling here
     * @param styles Style strings in order, including empty strings for unstyled segments
     * @example const username = getUser().name;
     *    chic.warn(['Signed in as:', username], '', chic.fontWeight.bold()) */
    warn(strs: string[], ...styles: string[]): void;
    /** Logs to the warn level console using a tagged template
     * @example chic.warn`Total | ${''}Success${chic.color.green()} | ${''}Failed${chic.color.red()}`; */
    warn(strs: TemplateStringsArray, ...styles: string[]): void;
};
