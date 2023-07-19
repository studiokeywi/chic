import type { ChicLoggers, ChicPlugin } from 'chic';
import { ChicPluginFunction } from 'chic';
/** Installer object for the `labelMaker` plugin */
declare const labelMaker: ChicPlugin<LabelMaker>;
export { labelMaker };
/** Configuration for a specific label for the `labelMaker` plugin */
export type LabelConfig = {
    label: string;
    style: string;
};
/** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message. */
export interface LabelMaker extends ChicPluginFunction {
    /** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.
     * @param {LabelMakerConfig} config
     * @returns {ChicLoggers} */
    (config: LabelMakerConfig): ChicLoggers;
}
/** Configuration for the `labelMaker` plugin */
export type LabelMakerConfig = {
    debug?: LabelConfig;
    error?: LabelConfig;
    group?: LabelConfig;
    groupCollapsed?: LabelConfig;
    info?: LabelConfig;
    log?: LabelConfig;
    warn?: LabelConfig;
};
declare module 'chic' {
    interface ChicPlugins {
        /** Creates a set of `Chic` loggers that automatically prepend a styled label before the provided message.
         * @internal */
        labelMaker: LabelMaker;
    }
}
