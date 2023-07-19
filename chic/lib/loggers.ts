import type { ChicLogger, ChicLoggers, ChicModes } from 'chic';

/** All valid Chic logger modes */
const chicModes = ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'] as const;

/** Prefixes a string with `%c` if needed to apply CSS styling
 * @internal
 * @param {string} str Text segment
 * @returns {string} The wrapped text (if required) */
const cssWrap = (str: string): string => (str !== '' ? `%c${str}` : str);
/** Wrapper for `console.groupEnd` */
const groupEnd = () => console.groupEnd();
/** Create an Object entry for a given Chic logger mode
 * @internal
 * @param {ChicModes} mode Logger mode
 * @returns {(ChicModes|ChicLogger)[]} An Object entry for the Chic logger */
const loggerMap = (mode: ChicModes): (ChicModes | ChicLogger)[] => {
  const logger: ChicLogger = (strs, ...styles: string[]) => {
    while (styles.length < strs.length) styles.push('');
    console[mode](useCss(strs, styles), ...styles);
  };
  return [mode, logger];
};
/** Applies necessary CSS wrapping around text segments for use in logging
 * @param strs Text to display
 * @param styles Styles array
 * @returns {string} A single CSS formatted string */
const useCss = (strs: TemplateStringsArray | string[], { length }: string[]): string =>
  (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');

/** Create Chic logger methods
 * @internal
 * @returns {ChicLoggers} */
const buildLoggers = (): ChicLoggers => Object.fromEntries([['groupEnd', groupEnd], ...chicModes.map(loggerMap)]);

export { buildLoggers };
