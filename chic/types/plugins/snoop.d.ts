import { ChicLoggers } from '../chic.js';
import { type ChicPlugin } from './index.js';
declare const _default: ChicPlugin;
export default _default;
export type SnoopConfig = {
    check: (...args: any[]) => boolean | Promise<boolean>;
    labels?: string[];
    level?: keyof ChicLoggers;
    rate?: number;
    repeat?: boolean;
    styles?: string[];
};
