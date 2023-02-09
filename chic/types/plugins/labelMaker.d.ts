import { type ChicPlugin } from './index.js';
declare const _default: ChicPlugin;
export default _default;
export type LabelConfig = {
    label: string;
    style: string;
};
export type LabelMakerConfig = {
    debug?: LabelConfig;
    error?: LabelConfig;
    group?: LabelConfig;
    groupCollapsed?: LabelConfig;
    info?: LabelConfig;
    log?: LabelConfig;
    warn?: LabelConfig;
};
