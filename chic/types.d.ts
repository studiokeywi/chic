declare module 'chic' {
  /** Browser console logging with CSS formatting */
  export type Chic = {
    /** Builds the current style string */
    (): string;
    // SECTION: chic API
    /**Inject styles from another `Chic` instance */
    inject(...styleStrs: string[]): Chic;
    /** Create a new Chic instances with the currently pending styles fixed
     * @param inject */
    fix(): Chic;
    /** Extra features available from installed plugins */
    plugins: ChicPlugins & { [plugin: string]: ChicPluginFunction };
  } & ChicCSSBuilder &
    ChicLoggers;

  /** Chic style builder proxy */
  export type ChicCSSBuilder = {
    /** Append a new segment to the current style */
    [css: string]: Chic;
  };

  /** Configuration for building Chic instances */
  export type ChicConfig = {
    /** Fixed styles to always apply when building style strings */
    fixed?: string[][];
    /** Plugins to extend Chic functionality */
    plugins?: ChicPlugin<ChicPluginFunction>[];
  };

  /** Shape of a Chic logger function */
  export type ChicLogger = {
    // TODO: documentation
    (strs: TemplateStringsArray | string[], ...styles: string[]): void;
  };

  /** All available Chic logging functions */
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

  /** Names of available Chic logging functions */
  export type ChicModes = keyof ChicLoggers;

  /** A plugin to modify or add new Chic behaviors */
  export type ChicPlugin<Plugin extends ChicPluginFunction> = {
    /** Identifier for plugin's exported function */
    id: string;
    /** The installer function for this plugin
     * @param chic The instance of Chic where this plugin is installed */
    install(chic: Chic): Plugin;
    /** Optional cleanup function when uninstalled
     * @param chic The instance of Chic where this plugin was installed */
    uninstall?(chic: Chic): void;
  };

  /** Extra functionality provided by a Chic plugin */
  export interface ChicPlugins {
    /** Install a new plugin into Chic */
    install<Plugin extends ChicPluginFunction>(plugin: ChicPlugin<Plugin>): void;
    /** Uninstall a plugin from Chic */
    uninstall(id: string): void;
  }

  /** Extra functionality provided by a Chic plugin */
  export interface ChicPluginFunction {
    <PluginFN extends (...args: any[]) => any>(...args: Parameters<PluginFN>): ReturnType<PluginFN>;
    /** Optional cleanup function when uninstalled
     * @param chic The instance of Chic where this plugin was installed */
    uninstall?(chic: Chic): void;
  }
}
