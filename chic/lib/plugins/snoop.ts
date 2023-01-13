import { ChicLoggers } from '../index.js';
import { ChicPlugin } from './index.js';

let running: NodeJS.Timer | number;

export default {
  id: 'snoop',
  // TODO: documentation
  install:
    chic =>
    ({ check, labels = ['Event Occurred'], level = 'log', rate = 100, repeat = false, styles = [''] }: SnoopConfig) => {
      const log = () => (chic[level](labels, ...styles), !repeat && stop());
      const poll = () => {
        const ready = check();
        if (!(ready instanceof Promise)) return ready ? log() : void 0;
        ready.then(ready => (ready ? log() : void 0));
      };
      const start = () => (running && stop(), (running = setInterval(poll, rate)));
      const stop = () => clearInterval(running);
      start();
      return { start, stop };
    },
  uninstall: () => clearInterval(running),
} as ChicPlugin;

export type SnoopConfig = {
  check: Function;
  labels?: string[];
  level?: keyof ChicLoggers;
  rate?: number;
  repeat?: boolean;
  styles?: string[];
};
