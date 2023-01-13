import { Chic, ChicLogger, ChicLoggers } from '../index.js';
import { ChicPlugin } from './index.js';

const install = (chic: Chic) => {
  const base = chic.border.solid_0_125rem.borderRadius._0_5rem.fontSize._1rem.margin._0_25rem.padding._0_5rem.fix();
  const defaults = {
    debug: { label: 'DEBUG', style: base.borderColor.cyan.color.cyan() },
    error: { label: 'ERROR', style: base.borderColor.red.color.red() },
    group: { label: 'GROUP', style: base.borderColor.initial() },
    groupCollapsed: { label: 'GROUP', style: base.borderColor.initial() },
    info: { label: 'INFO', style: base.borderColor.green.color.green() },
    log: { label: 'LOG', style: base.borderColor.green.color.green() },
    warn: { label: 'WARN', style: base.borderColor.yellow.color.yellow() },
  };
  const make =
    (mode: keyof ChicLoggers, { label, style }: LabelConfig): ChicLogger =>
    (strs, ...styles) =>
      chic[mode]([label, ...strs], ...[style, ...styles]);

  // TODO: documentation
  // TODO: figure out how to apply intellisense from here to actual object, if possible
  return (config: LabelMakerConfig = {}): ChicLoggers => {
    const debug = make('debug', config.debug ?? defaults.debug);
    const error = make('error', config.error ?? defaults.error);
    const group = make('group', config.group ?? defaults.group);
    const groupCollapsed = make('groupCollapsed', config.groupCollapsed ?? defaults.groupCollapsed);
    const info = make('info', config.info ?? defaults.info);
    const log = make('log', config.log ?? defaults.log);
    const warn = make('warn', config.warn ?? defaults.warn);
    return { debug, error, group, groupCollapsed, groupEnd: chic.groupEnd.bind(chic), info, log, warn };
  };
};
// TODO: documentation
export default { id: 'labelMaker', install } as ChicPlugin;

// TODO: documentation
export type LabelConfig = {
  label: string;
  style: string;
};
export type LabelMakerConfig = {
  debug?: LabelConfig;
  error?: LabelConfig;
  group?: LabelConfig;
  groupCollapsed?: LabelConfig;
  info?: LabelConfig;
  log?: LabelConfig;
  warn?: LabelConfig;
};
