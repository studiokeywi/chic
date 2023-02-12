import type { Chic } from './index.js';
/** Converts special property syntax into valid CSS strings
 * @param {string} str Special syntax string
 * @returns CSS style string */
export declare const cssFormatter: (str: string) => string;
/** Chic style builder proxy */
export type ChicCSSBuilder = {
    /** Append a new segment to the current style */
    [css: string]: Chic;
};
