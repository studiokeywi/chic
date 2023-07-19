import type { Chic, ChicLogger, ChicLoggers, ChicPlugin } from 'chic';

// TODO: documentation
const install = (chic: Chic) => {
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
  return <LabelMaker>((config = {}) => ({
    debug: makeLogger('debug', config.debug ?? defaults.debug),
    error: makeLogger('error', config.error ?? defaults.error),
    group: makeLogger('group', config.group ?? defaults.group),
    groupCollapsed: makeLogger('groupCollapsed', config.groupCollapsed ?? defaults.groupCollapsed),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger('info', config.info ?? defaults.info),
    log: makeLogger('log', config.log ?? defaults.log),
    warn: makeLogger('warn', config.warn ?? defaults.warn),
  }));
};

// TODO: documentation
const labelMaker = <ChicPlugin>{ id: 'labelMaker', install };

export { labelMaker };

/** Configuration for a specific label for the `labelMaker` plugin */
export type LabelConfig = {
  label: string;
  style: string;
};
/** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message. */
export interface LabelMaker {
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
