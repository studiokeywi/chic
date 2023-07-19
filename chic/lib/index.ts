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

/** Generate Chic's install/uninstall plugin functions
 * @internal
 * @returns {ChicPlugins & { [plugin: string]: ChicPluginFunction }} */
const buildPlugins = (chic: Chic): ChicPlugins & { [plugin: string]: ChicPluginFunction } =>
  <ChicPlugins & { [plugin: string]: ChicPluginFunction }>{
    install: (plugin: ChicPlugin<ChicPluginFunction>) => {
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

/** Create a new Chic `ProxyHandler`
 * @internal
 * @returns {ProxyHandler<Chic>} */
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
 * @returns {Chic} A new Chic logger */
const buildChic = ({ fixed = [], plugins = [] }: ChicConfig = {}): Chic => {
  /** Current CSS styles */
  const styles: string[][] = [];
  /** Builds the current style string */
  const buildStyle = () => [...fixed, ...styles.splice(0, styles.length)].map(style => style.join(':')).join(';');
  /** Lock in the current styles */
  const fix = () => buildChic({ fixed: [...fixed, ...styles.splice(0, styles.length)] });
  /** Inject styles from another `Chic` instance */
  const inject = (...styleStrs: string[]) =>
    buildChic({
      fixed: [
        ...fixed,
        ...styles.splice(0, styles.length),
        ...styleStrs.flatMap(styles => styles.split(';').map(style => style.split(':'))),
      ],
    });
  /** Install/uninstall plugins */
  const pluginsBase = {
    install: (plugin: ChicPlugin<ChicPluginFunction>) => {
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
  /** Loggers, fix, inject, plugins */
  const chicBase = Object.assign(buildStyle, { ...buildLoggers(), fix, inject, plugins: pluginsBase });
  /** Chic object */
  const chic = <Chic>new Proxy(chicBase, buildChicHandler(styles));
  plugins.forEach(chic.plugins.install);
  return chic;
};

/** Chic: CSS console formatting through tagged templates
 * @type {Chic} */
const chic: Chic = /* @__PURE__ */ buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });

export { buildChic, chic };

export type { Chic, ChicCSSBuilder, ChicConfig, ChicLogger, ChicLoggers, ChicPlugin, ChicPluginFunction, ChicPlugins };
