import type { Chic, ChicLoggers, ChicPlugin } from 'chic';
import { ChicPluginFunction } from 'chic';

/** Installer for the `snoop` plugin. Not intended to be used directly
 * @internal
 * @param {Chic} chic
 * @returns {Snoop} */
const install: ChicPlugin<Snoop>['install'] = (chic: Chic): Snoop => {
  /** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
   *
   * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use.
   * @param {SnoopConfig} config
   * @returns { start: () => void; stop: () => void } */
  const snoop = <Snoop>(({
    check,
    labels = ['Event Occurred'],
    level = 'log',
    repeat = false,
    styles = [''],
  }: SnoopConfig) => {
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
  return snoop;
};

/** Installer object for the `snoop` plugin */
const snoop: ChicPlugin<Snoop> = { id: 'snoop', install };

export { snoop };

/** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
 *
 * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use. */
export interface Snoop extends ChicPluginFunction {
  /** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
   *
   * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use.
   * @param {SnoopConfig} config
   * @returns { start: () => void; stop: () => void } */
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
