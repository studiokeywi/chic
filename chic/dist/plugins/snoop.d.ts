import { ChicLoggers } from '../index.js';
import { ChicPlugin } from './index.js';
declare const _default: ChicPlugin;
export default _default;
export type SnoopConfig = {
    check: Function;
    labels?: string[];
    level?: keyof ChicLoggers;
    rate?: number;
    repeat?: boolean;
    styles?: string[];
};
