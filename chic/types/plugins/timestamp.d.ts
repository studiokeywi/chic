import type { ChicLoggers } from '../loggers.js';
import type { ChicPlugin } from '../plugins.js';
declare const _default: ChicPlugin;
export default _default;
export interface Timestamp {
    (config: TimestampConfig): ChicLoggers;
}
export type TimestampConfig = {
    format?: (date: Date) => string;
    style?: string;
};
