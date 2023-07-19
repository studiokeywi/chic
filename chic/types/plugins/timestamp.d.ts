import type { ChicLoggers, ChicPlugin } from 'chic';
declare const timestamp: ChicPlugin;
export { timestamp };
/** Creates a set of `Chic` loggers that automatically prepend a styleable timestamp before the provided message */
export interface Timestamp {
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
