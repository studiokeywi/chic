/// <reference path="../types.d.ts" />
import type { Chic, ChicCSSBuilder, ChicConfig, ChicLogger, ChicLoggers, ChicPlugin, ChicPluginFunction, ChicPlugins } from 'chic';
/** Builds a new instance of a Chic logger
 * @param {ChicConfig} config Chic config
 * @returns {Chic} A new Chic logger */
declare const buildChic: ({ fixed, plugins }?: ChicConfig) => Chic;
/** Chic: CSS console formatting through tagged templates
 * @type {Chic} */
declare const chic: Chic;
export { buildChic, chic };
export type { Chic, ChicCSSBuilder, ChicConfig, ChicLogger, ChicLoggers, ChicPlugin, ChicPluginFunction, ChicPlugins };
