import { type Chic } from '../index.js';
import type { ChicLoggers } from '../loggers.js';
import type { ChicPlugin } from '../plugins.js';

// TODO: documentation
const install =
  (chic: Chic): Snoop =>
  ({ check, labels = ['Event Occurred'], level = 'log', repeat = false, styles = [''] }) => {
    const log = () => (chic[level](labels, ...styles), repeat && start());
    const poll = () => (!((ready = check()) instanceof Promise) ? result(ready) : ready.then(result));
    const result = (ready: boolean) => (ready ? log : start)();
    const start = () => void (running && stop(), (running = requestAnimationFrame(poll)));
    const stop = () => void cancelAnimationFrame(running);
    let ready: boolean | Promise<boolean> = false;
    let running: number;
    start();
    return { start, stop, uninstall: stop };
  };

// TODO: documentation
export default <ChicPlugin>{ id: 'snoop', install };

// TODO: documentation
export interface Snoop {
  (config: SnoopConfig): { start: () => void; stop: () => void };
}
// TODO: documentation
export type SnoopConfig = {
  check: (...args: any[]) => boolean | Promise<boolean>;
  labels?: string[];
  level?: keyof ChicLoggers;
  repeat?: boolean;
  styles?: string[];
};
