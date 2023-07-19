import type { Chic, ChicLogger, ChicLoggers, ChicPlugin } from 'chic';
import { ChicPluginFunction } from 'chic';

/** Installer the `labelMaker` plugin. Not intended to be used directly
 * @internal
 * @param {Chic} chic
 * @returns {LabelMaker} */
const install: ChicPlugin<LabelMaker>['install'] = (chic: Chic): LabelMaker => {
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
  const makeLogger =
    (mode: keyof ChicLoggers, { label, style }: LabelConfig): ChicLogger =>
    (strs, ...styles) =>
      chic[mode]([label, ...strs], ...[style, ...styles]);

  /** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.
   * @param {LabelMakerConfig} config
   * @returns {ChicLoggers} */
  const labelMaker = <LabelMaker>((config: LabelMakerConfig = {}) => ({
    debug: makeLogger('debug', config.debug ?? defaults.debug),
    error: makeLogger('error', config.error ?? defaults.error),
    group: makeLogger('group', config.group ?? defaults.group),
    groupCollapsed: makeLogger('groupCollapsed', config.groupCollapsed ?? defaults.groupCollapsed),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger('info', config.info ?? defaults.info),
    log: makeLogger('log', config.log ?? defaults.log),
    warn: makeLogger('warn', config.warn ?? defaults.warn),
  }));

  return labelMaker;
};

/** Installer object for the `labelMaker` plugin */
const labelMaker: ChicPlugin<LabelMaker> = { id: 'labelMaker', install };

export { labelMaker };

/** Configuration for a specific label for the `labelMaker` plugin */
export type LabelConfig = {
  label: string;
  style: string;
};
/** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message. */
export interface LabelMaker extends ChicPluginFunction {
  /** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.
   * @param {LabelMakerConfig} config
   * @returns {ChicLoggers} */
  (config: LabelMakerConfig): ChicLoggers;
}
/** Configuration for the `labelMaker` plugin */
export type LabelMakerConfig = {
  debug?: LabelConfig;
  error?: LabelConfig;
  group?: LabelConfig;
  groupCollapsed?: LabelConfig;
  info?: LabelConfig;
  log?: LabelConfig;
  warn?: LabelConfig;
};

declare module 'chic' {
  interface ChicPlugins {
    /** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.
     * @internal */
    labelMaker: LabelMaker;
  }
}
