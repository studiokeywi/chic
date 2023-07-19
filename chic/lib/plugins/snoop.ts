import type { Chic, ChicLoggers, ChicPlugin } from 'chic';

// TODO: documentation
const install = (chic: Chic): Snoop => <Snoop>(({
    check,
    labels = ['Event Occurred'],
    level = 'log',
    repeat = false,
    styles = [''],
  }) => {
    const log = () => (chic[level](labels, ...styles), repeat && start());
    const poll = () => (!((ready = check()) instanceof Promise) ? result(ready) : ready.then(result));
    const result = (ready: boolean) => (ready ? log : start)();
    const start = () => void (running && stop(), (running = requestAnimationFrame(poll)));
    const stop = () => void cancelAnimationFrame(running);
    let ready: boolean | Promise<boolean> = false;
    let running: number;
    start();
    return { start, stop, uninstall: stop };
  });

// TODO: documentation
const snoop = <ChicPlugin>{ id: 'snoop', install };

export { snoop };

/** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
 *
 * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use. */
export interface Snoop {
  (config: SnoopConfig): { start: () => void; stop: () => void };
}
/** Configuration for the `snoop` plugin */
export type SnoopConfig = {
  check: (...args: any[]) => boolean | Promise<boolean>;
  labels?: string[];
  level?: keyof ChicLoggers;
  repeat?: boolean;
  styles?: string[];
};

declare module 'chic' {
  interface ChicPlugins {
    /** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
     *
     * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use.
     * @internal */
    snoop: Snoop;
  }
}
