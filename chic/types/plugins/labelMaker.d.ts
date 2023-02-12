import type { ChicLoggers } from '../loggers.js';
import type { ChicPlugin } from '../plugins.js';
declare const _default: ChicPlugin;
export default _default;
export type LabelConfig = {
    label: string;
    style: string;
};
export interface LabelMaker {
    (config: LabelMakerConfig): ChicLoggers;
}
export type LabelMakerConfig = {
    debug?: LabelConfig;
    error?: LabelConfig;
    group?: LabelConfig;
    groupCollapsed?: LabelConfig;
    info?: LabelConfig;
    log?: LabelConfig;
    warn?: LabelConfig;
};
