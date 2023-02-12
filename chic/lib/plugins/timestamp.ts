import type { Chic } from '../index.js';
import type { ChicLogger, ChicLoggers } from '../loggers.js';
import type { ChicPlugin } from '../plugins.js';

// TODO: documentation
const install = (chic: Chic): Timestamp => {
  // TODO: documentation
  const makeLogger =
    (format: (date: Date) => string, mode: keyof ChicLoggers, style: string): ChicLogger =>
    (strs, ...styles) =>
      chic[mode]([format(new Date()), ...strs], style, ...styles);
  const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
  // TODO: documentation
  return ({ format = date => `[${date.toLocaleString()}]`, style = dateStyle } = {}) => ({
    debug: makeLogger(format, 'debug', style),
    error: makeLogger(format, 'error', style),
    group: makeLogger(format, 'group', style),
    groupCollapsed: makeLogger(format, 'groupCollapsed', style),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger(format, 'info', style),
    log: makeLogger(format, 'log', style),
    warn: makeLogger(format, 'warn', style),
  });
};

// TODO: documentation
export default <ChicPlugin>{ id: 'timestamp', install };

// TODO: documentation
export interface Timestamp {
  (config: TimestampConfig): ChicLoggers;
}
// TODO: documentation
export type TimestampConfig = {
  format?: (date: Date) => string;
  style?: string;
};
