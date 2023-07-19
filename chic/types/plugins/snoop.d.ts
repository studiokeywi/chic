import type { ChicLoggers, ChicPlugin } from 'chic';
declare const snoop: ChicPlugin;
export { snoop };
/** Allows simple messages to be automatically logged when a given condition occurs. The returned `start` and `stop` functions can be used to further control when you are snooping or not.
 *
 * **NOTE:** The `snoop` plugin uses `requestAnimationFrame` internally to prevent execution while the window is not in focus. Do not rely on this for time-sensitive purposes unless you intend to monitor the window during the entire time of its use. */
export interface Snoop {
    (config: SnoopConfig): {
        start: () => void;
        stop: () => void;
    };
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
