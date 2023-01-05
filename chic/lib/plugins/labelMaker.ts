import { ChicLogger, ChicLoggers } from '../index.js';
import { ChicPlugin, ChicPluginFunction } from './index.js';

// TODO: documentation
const labelMaker: ChicPlugin = {
  install: chic => {
    // TODO: documentation
    const makeLabeled = (mode: string, config: LabelConfig) => {
      const { label, style } = config[mode];
      return (strs: TemplateStringsArray | string[], ...styles: string[]) => {
        (chic[mode] as ChicLogger)([label, ...strs], ...[style, ...styles]);
      };
    };
    // TODO: documentation
    // TODO: figure out how to apply intellisense from here to actual object, if possible
    const labelMaker: ChicPluginFunction<ChicLoggers> = (config: LabelConfig) => ({
      debug: makeLabeled('debug', config),
      error: makeLabeled('error', config),
      group: makeLabeled('group', config),
      groupCollapsed: makeLabeled('groupCollapsed', config),
      groupEnd: () => chic.groupEnd(),
      info: makeLabeled('info', config),
      log: makeLabeled('log', config),
      warn: makeLabeled('warn', config),
    });
    chic.plugins.labelMaker = labelMaker;
  },
};

export default labelMaker;

// TODO: documentation
type LabelConfig = {
  debug: {
    label: string;
    style: string;
  };
  error: {
    label: string;
    style: string;
  };
  group: {
    label: string;
    style: string;
  };
  groupCollapsed: {
    label: string;
    style: string;
  };
  info: {
    label: string;
    style: string;
  };
  log: {
    label: string;
    style: string;
  };
  warn: {
    label: string;
    style: string;
  };
};
