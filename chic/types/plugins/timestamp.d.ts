import type { ChicLoggers, ChicPlugin } from 'chic';
import { ChicPluginFunction } from 'chic';
/** Installer object for the `timestamp` plugin */
declare const timestamp: ChicPlugin<Timestamp>;
export { timestamp };
/** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message */
export interface Timestamp extends ChicPluginFunction {
    /** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message
     * @param {TimestampConfig} config
     * @returns {ChicLoggers} */
    (config: TimestampConfig): ChicLoggers;
}
/** Configuration for the `timestamp` plugin */
export type TimestampConfig = {
    format?: (date: Date) => string;
    style?: string;
};
declare module 'chic' {
    interface ChicPlugins {
        /** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message
         * @internal */
        timestamp: Timestamp;
    }
}
