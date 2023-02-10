// TODO: improve typing
// TODO: fix type locations for plugin extensibility (if possible)
import {
  drawImage,
  labelMaker,
  snoop,
  timestamp,
  type ChicPlugin,
  type ChicPluginFunction,
  type ChicPlugins,
} from './plugins/index.js';

/** All valid Chic logger modes */
const chicModes = ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'];
/** Regular Expressions used to parse special property name syntaxes */
const rgx = {
  /** Used to unconvert kebab-case replacements inside quotes (e `font-family: "-fira-code"`) */
  dashes: /-/g,
  /** Convert dollar signs to pound signs for hex values */
  hex: /\$/g,
  /** Convert `backgroundColor` style text to `background-color` */
  kebab: /(?=[A-Z])/,
  /** Remove leading underscores from a style string */
  lead: /(^_)/,
  /** Convert `5_2` style numbers to `5.2` */
  number: /(\d+)_(\d+)/g,
  /** Convert `solid_black` style text to `solid black` */
  snake: /_/g,
  /** Check for situations requiring quotes (eg `font-family: "Fira Code";`) */
  quote: /"[^"]*?"/g,
};

/** Prefixes a string with `%c` if needed to apply CSS styling
 * @param {string} str Text segment
 * @returns The wrapped text (if required) */
const cssWrap = (str: string) => (str !== '' ? `%c${str}` : str);
/** Converts special property syntax into valid CSS strings
 * @param {string} str Special syntax string
 * @returns CSS style string */
const format = (str: string) => {
  const trimmedFront = str.replace(rgx.lead, '');
  const replacedDollarSigns = trimmedFront.replaceAll(rgx.hex, '#');
  const convertedNumberFormat = replacedDollarSigns.replaceAll(rgx.number, '$1.$2');
  const convertedSnakeCases = convertedNumberFormat.replaceAll(rgx.snake, ' ');
  const splitKebabs = convertedSnakeCases.split(rgx.kebab);
  const convertedKebabCases = splitKebabs.reduce((out, str) => `${out}${out ? '-' : ''}${str.toLowerCase()}`, '');
  const fixedQuotes = convertedKebabCases.replaceAll(rgx.quote, quoteFixer(str));
  return fixedQuotes;
};
/** Wrapper for `console.groupEnd` */
const groupEnd = () => console.groupEnd();
/** Create an Object entry for a given Chic logger mode
 * @param {string} mode Logger mode
 * @returns An Object entry for the Chic logger */
const loggerMap = (mode: string) => {
  const logger: ChicLogger = (strs, ...styles: string[]) => {
    while (styles.length < strs.length) styles.push('');
    console[mode](useCss(strs, styles), ...styles);
  };
  return [mode, logger];
};
/** Fixes issues with text in quotation marks being kebab-cased */
const quoteFixer = (str: string) => (match: string) => str.match(new RegExp(match.replaceAll(rgx.dashes, ''), 'i'))[0];
/** Applies necessary CSS wrapping around text segments for use in logging
 * @param strs Text to display
 * @param styles Styles array
 * @returns A single CSS formatted string */
const useCss = (strs: TemplateStringsArray | string[], { length }: string[]) =>
  (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');

/** Builds a new instance of a Chic logger
 * @param {import('@studiokeywi/chic').ChicConfig} config Chic config
 * @returns A new Chic logger */
export const buildChic = ({ fixed = [], plugins = [] }: ChicConfig = {}) => {
  const chicHandler: ProxyHandler<Chic> = {
    get(self, key, chic) {
      if ('symbol' === typeof key || key in self) return Reflect.get(self, key, chic);
      const last = styles.at(-1);
      const val = format(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic;
    },
  };
  /** Chic logger methods */
  const loggers = Object.fromEntries([['groupEnd', groupEnd], ...chicModes.map(loggerMap)]);
  /** Current CSS styles */
  const styles: string[][] = [];
  /** Builds the current style string */
  const buildStyle = () => useStyles(true).join(';');
  /** Gets all fixed and pending styles, then resets all currently pending styles
   * @param map Whether to map the inner arrays to single strings joined with `:` */
  const useStyles = (map = false) => {
    const use = [...fixed, ...styles.splice(0, styles.length)];
    return map ? use.map(style => style.join(':')) : use;
  };
  /** Install/Uninstall plugins functions */
  const pluginObj: ChicPlugins = {
    install: (plugin: ChicPlugin) => {
      if (plugin.id in chic.plugins) return chic.warn`Cannot overwrite an existing plugin`;
      const pluginFn = plugin.install(chic);
      if (plugin.uninstall) pluginFn.uninstall = plugin.uninstall;
      chic.plugins[plugin.id] = pluginFn;
    },
    uninstall: (id: string) => {
      if (!(id in chic.plugins)) return;
      chic.plugins[id]?.uninstall?.(chic);
      delete chic.plugins[id];
    },
  };
  /** Loggers, fix, and plugins */
  const chicBase = { ...loggers, fix: () => buildChic({ fixed: useStyles() as string[][] }), plugins: pluginObj };
  /** Chic object */
  const chic: Chic = new Proxy(Object.assign(buildStyle, chicBase), chicHandler);
  plugins.forEach(chic.plugins.install);
  return chic;
};
/** Chic: CSS console formatting through tagged templates */
export default /* @__PURE__ */ buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });

/** Chic style builder proxy */
type ChicCSS = {
  /** Append a new segment to the current style */
  [css: string]: Chic;
};

export type { ChicPlugin, ChicPluginFunction } from './plugins/index.js';
/** Browser console logging with CSS formatting */
export type Chic = {
  /** Builds the current style string */
  (): string;
  // SECTION: chic API
  /** Create a new Chic instances with the currently pending styles fixed  */
  fix(): Chic;
  /** Extra features available from installed plugins */
  plugins: ChicPlugins & { [plugin: string]: ChicPluginFunction };
} & ChicCSS &
  ChicLoggers;
/** Configuration for building Chic instances */
export type ChicConfig = {
  /** Fixed styles to always apply when building style strings */
  fixed?: string[][];
  /** Plugins to extend Chic functionality */
  plugins?: ChicPlugin[];
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
