/// <reference path="../types.d.ts" />
import type {
  Chic,
  ChicCSSBuilder,
  ChicConfig,
  ChicLogger,
  ChicLoggers,
  ChicPlugin,
  ChicPluginFunction,
  ChicPlugins,
} from 'chic';
import { cssFormatter } from './css.js';
import { buildLoggers } from './loggers.js';
import { drawImage, labelMaker, snoop, timestamp } from './plugins/index.js';

/** Install/Uninstall plugins functions */
const buildPlugins = (chic: Chic) =>
  <ChicPlugins & { [plugin: string]: ChicPluginFunction }>{
    install: (plugin: ChicPlugin) => {
      if (plugin.id in chic.plugins) return chic.warn`Cannot overwrite an existing plugin`;
      const pluginFn = plugin.install(chic);
      if (plugin.uninstall) pluginFn.uninstall = plugin.uninstall;
      chic.plugins[plugin.id] = pluginFn;
    },
    uninstall: (id: string) => {
      if (!(id in chic.plugins)) return;
      chic.plugins[id]?.uninstall?.(chic);
      delete chic.plugins[id];
    },
  };

/** Create a new `Chic` `ProxyHandler` */
const buildChicHandler = (styles: string[][]): ProxyHandler<Chic> => ({
  get(self, key, chic) {
    if ('symbol' === typeof key || key in self) return Reflect.get(self, key, chic);
    const last = styles.at(-1)!;
    const val = cssFormatter(key);
    !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
    return chic;
  },
});

/** Builds a new instance of a Chic logger
 * @param {ChicConfig} config Chic config
 * @returns A new Chic logger */
const buildChic = ({ fixed = [], plugins = [] }: ChicConfig = {}) => {
  /** Current CSS styles */
  const styles: string[][] = [];
  /** Builds the current style string */
  const buildStyle = () => [...fixed, ...styles.splice(0, styles.length)].map(style => style.join(':')).join(';');
  /** Lock in the current styles */
  const fix = () => buildChic({ fixed: [...fixed, ...styles.splice(0, styles.length)] });
  /** Inject styles from another `Chic` instance */
  // DEBUG: experimental `inject`
  const inject = (...styleStrs: string[]) => (
    fixed.push(...styleStrs.flatMap(styles => styles.split(';').map(style => style.split(':')))), chic
  );
  /** Loggers, fix, and plugins */
  const chicBase = { ...buildLoggers(), inject, fix };
  /** Chic object */
  const chic = <Chic>new Proxy(Object.assign(buildStyle, chicBase), buildChicHandler(styles));
  chic.plugins = buildPlugins(chic);
  plugins.forEach(chic.plugins.install);
  return chic;
};

/** Chic: CSS console formatting through tagged templates */
const chic = buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });

export { buildChic, chic };

export type { Chic, ChicCSSBuilder, ChicConfig, ChicLogger, ChicLoggers, ChicPlugin, ChicPluginFunction, ChicPlugins };
