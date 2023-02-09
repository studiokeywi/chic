import { type Chic, type ChicLogger, type ChicLoggers } from '../chic.js';
import { type ChicPlugin } from './index.js';

// TODO: documentation
const install = (chic: Chic) => {
  const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
  return ({ style = dateStyle } = <TimestampConfig>{ style: dateStyle }) =>
    <ChicLoggers>{
      debug: makeLogger(chic, 'debug', style),
      error: makeLogger(chic, 'error', style),
      group: makeLogger(chic, 'group', style),
      groupCollapsed: makeLogger(chic, 'groupCollapsed', style),
      groupEnd: chic.groupEnd.bind(chic),
      info: makeLogger(chic, 'info', style),
      log: makeLogger(chic, 'log', style),
      warn: makeLogger(chic, 'warn', style),
    };
};

// prettier-ignore
const makeLogger = (chic: Chic, mode: keyof ChicLoggers, style: string): ChicLogger => (strs, ...styles) =>
  chic[mode]([ts(), ...strs], style, ...styles);

const ts = () => `[${new Date().toLocaleString()}]`;

export default <ChicPlugin>{ id: 'timestamp', install };

export type TimestampConfig = {
  style?: string;
};
