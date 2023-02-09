import { ChicLoggers, type Chic } from '../chic.js';
import { type ChicPlugin } from './index.js';

let running: number;

// TODO: documentation
// prettier-ignore
const install = (chic: Chic) => ({ check, labels = ['Event Occurred'], level = 'log', repeat = false, styles = [''] }: SnoopConfig) => {
    const log = () => (chic[level](labels, ...styles), repeat && start());
    const poll = () => {
      const ready = check();
      const result = (ready: boolean) => (ready ? log : start)();
      if (!(ready instanceof Promise)) return result(ready);
      ready.then(result);
    };
    const start = () => {
      if (running) stop();
      running = requestAnimationFrame(poll);
    };
    const stop = () => {
      cancelAnimationFrame(running);
    };
    start();
    return { start, stop };
  };
export default <ChicPlugin>{ id: 'snoop', install, uninstall: () => cancelAnimationFrame(running) };

export type SnoopConfig = {
  check: (...args: any[]) => boolean | Promise<boolean>;
  labels?: string[];
  level?: keyof ChicLoggers;
  rate?: number;
  repeat?: boolean;
  styles?: string[];
};
