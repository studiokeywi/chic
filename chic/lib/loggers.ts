/** All valid Chic logger modes */
const chicModes = ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'];

/** Prefixes a string with `%c` if needed to apply CSS styling
 * @param {string} str Text segment
 * @returns The wrapped text (if required) */
const cssWrap = (str: string) => (str !== '' ? `%c${str}` : str);
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
/** Applies necessary CSS wrapping around text segments for use in logging
 * @param strs Text to display
 * @param styles Styles array
 * @returns A single CSS formatted string */
const useCss = (strs: TemplateStringsArray | string[], { length }: string[]) =>
  (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');

/** Chic logger methods */
export const buildLoggers = (): ChicLoggers =>
  Object.fromEntries([['groupEnd', groupEnd], ...chicModes.map(/* @__PURE__ */ loggerMap)]);

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
