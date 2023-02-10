import type { Chic, ChicLogger, ChicLoggers } from '../index.js';
import type { ChicPlugin } from './index.js';

// TODO: documentation
const install = (chic: Chic): LabelMaker => {
  // prettier-ignore
  const base = chic
    .border      .solid_0_125rem
    .borderRadius._0_5rem
    .fontSize    ._1rem
    .margin      ._0_25rem
    .padding     ._0_5rem
    .fix();
  const defaults = {
    debug: { label: 'DEBUG', style: base.borderColor.cyan.color.cyan() },
    error: { label: 'ERROR', style: base.borderColor.red.color.red() },
    group: { label: 'GROUP', style: base.borderColor.initial() },
    groupCollapsed: { label: 'GROUP', style: base.borderColor.initial() },
    info: { label: 'INFO', style: base.borderColor.green.color.green() },
    log: { label: 'LOG', style: base.borderColor.green.color.green() },
    warn: { label: 'WARN', style: base.borderColor.yellow.color.yellow() },
  };
  // TODO: documentation
  const makeLogger =
    (mode: keyof ChicLoggers, { label, style }: LabelConfig): ChicLogger =>
    (strs, ...styles) =>
      chic[mode]([label, ...strs], ...[style, ...styles]);

  // TODO: documentation
  return (config = {}) => ({
    debug: makeLogger('debug', config.debug ?? defaults.debug),
    error: makeLogger('error', config.error ?? defaults.error),
    group: makeLogger('group', config.group ?? defaults.group),
    groupCollapsed: makeLogger('groupCollapsed', config.groupCollapsed ?? defaults.groupCollapsed),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger('info', config.info ?? defaults.info),
    log: makeLogger('log', config.log ?? defaults.log),
    warn: makeLogger('warn', config.warn ?? defaults.warn),
  });
};

// TODO: documentation
export default <ChicPlugin>{ id: 'labelMaker', install };

// TODO: documentation
export type LabelConfig = {
  label: string;
  style: string;
};
// TODO: documentation
export interface LabelMaker {
  (config: LabelMakerConfig): ChicLoggers;
}
// TODO: documentation
export type LabelMakerConfig = {
  debug?: LabelConfig;
  error?: LabelConfig;
  group?: LabelConfig;
  groupCollapsed?: LabelConfig;
  info?: LabelConfig;
  log?: LabelConfig;
  warn?: LabelConfig;
};
