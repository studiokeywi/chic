import type { ChicLoggers } from '../loggers.js';
import type { ChicPlugin } from '../plugins.js';
declare const _default: ChicPlugin;
export default _default;
export interface Snoop {
    (config: SnoopConfig): {
        start: () => void;
        stop: () => void;
    };
}
export type SnoopConfig = {
    check: (...args: any[]) => boolean | Promise<boolean>;
    labels?: string[];
    level?: keyof ChicLoggers;
    repeat?: boolean;
    styles?: string[];
};
