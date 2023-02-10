import type { ChicLoggers } from '../index.js';
import type { ChicPlugin } from './index.js';
declare const _default: ChicPlugin;
export default _default;
export interface Timestamp {
    (config: TimestampConfig): ChicLoggers;
}
export type TimestampConfig = {
    format?: (date: Date) => string;
    style?: string;
};
