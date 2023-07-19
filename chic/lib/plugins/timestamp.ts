import type { Chic, ChicLogger, ChicLoggers, ChicPlugin } from 'chic';
import { ChicPluginFunction } from 'chic';

/** Installer the `timestamp` plugin. Not intended to be used directly
 * @internal
 * @param {Chic} chic
 * @returns {Timestamp} */
const install: ChicPlugin<Timestamp>['install'] = (chic: Chic): Timestamp => {
  const makeLogger =
    (format: (date: Date) => string, mode: keyof ChicLoggers, style: string): ChicLogger =>
    (strs, ...styles) =>
      chic[mode]([format(new Date()), ...strs], style, ...styles);
  const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
  /** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message
   * @param {TimestampConfig} config
   * @returns {ChicLoggers} */
  const timestamp = <Timestamp>(({
    format = (date: Date) => `[${date.toLocaleString()}]`,
    style = dateStyle,
  } = {}) => ({
    debug: makeLogger(format, 'debug', style),
    error: makeLogger(format, 'error', style),
    group: makeLogger(format, 'group', style),
    groupCollapsed: makeLogger(format, 'groupCollapsed', style),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger(format, 'info', style),
    log: makeLogger(format, 'log', style),
    warn: makeLogger(format, 'warn', style),
  }));

  return timestamp;
};

/** Installer object for the `timestamp` plugin */
const timestamp: ChicPlugin<Timestamp> = { id: 'timestamp', install };

export { timestamp };

/** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message */
export interface Timestamp extends ChicPluginFunction {
  /** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message
   * @param {TimestampConfig} config
   * @returns {ChicLoggers} */
  (config: TimestampConfig): ChicLoggers;
}
/** Configuration for the `timestamp` plugin */
export type TimestampConfig = {
  format?: (date: Date) => string;
  style?: string;
};

declare module 'chic' {
  interface ChicPlugins {
    /** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message
     * @internal */
    timestamp: Timestamp;
  }
}
