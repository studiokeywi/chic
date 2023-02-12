// TODO: improve typing
// TODO: fix type locations for plugin extensibility (if possible)
import { cssFormatter, type ChicCSSBuilder } from './cssBuilder.js';
import { buildLoggers, type ChicLoggers } from './loggers.js';
import {
  drawImage,
  labelMaker,
  snoop,
  timestamp,
  type ChicPlugin,
  type ChicPluginFunction,
  type ChicPlugins,
} from './plugins.js';

/** Builds a new instance of a Chic logger
 * @param {import('@studiokeywi/chic').ChicConfig} config Chic config
 * @returns A new Chic logger */
export const buildChic = ({ fixed = [], plugins = [] }: ChicConfig = {}) => {
  const chicHandler: ProxyHandler<Chic> = {
    get(self, key, chic) {
      if ('symbol' === typeof key || key in self) return Reflect.get(self, key, chic);
      const last = styles.at(-1);
      const val = cssFormatter(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic;
    },
  };
  /** Current CSS styles */
  const styles: string[][] = [];
  /** Builds the current style string */
  const buildStyle = () => useStyles(true).join(';');
  /** Gets all fixed and pending styles, then resets all currently pending styles
   * @param map Whether to map the inner arrays to single strings joined with `:` */
  const useStyles = (map = false) => {
    const use = [...fixed, ...styles.splice(0, styles.length)];
    return map ? use.map(style => style.join(':')) : use;
  };
  /** Install/Uninstall plugins functions */
  const pluginObj: ChicPlugins = {
    install: (plugin: ChicPlugin) => {
      if (plugin.id in chic.plugins) return chic.warn`Cannot overwrite an existing plugin`;
      const pluginFn = /* @__PURE__ */ plugin.install(chic);
      if (plugin.uninstall) pluginFn.uninstall = plugin.uninstall;
      chic.plugins[plugin.id] = pluginFn;
    },
    uninstall: (id: string) => {
      if (!(id in chic.plugins)) return;
      /* @__PURE__ */ chic.plugins[id]?.uninstall?.(chic);
      delete chic.plugins[id];
    },
  };
  /** Loggers, fix, and plugins */
  const chicBase = {
    .../* @__PURE__ */ buildLoggers(),
    fix: () => /* @__PURE__ */ buildChic({ fixed: useStyles() as string[][] }),
    plugins: pluginObj,
  };
  /** Chic object */
  const chic = <Chic>new Proxy(Object.assign(buildStyle, chicBase), chicHandler);
  plugins.forEach(/* @__PURE__ */ chic.plugins.install);
  return chic;
};
/** Chic: CSS console formatting through tagged templates */
export default /* @__PURE__ */ buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });

export type { ChicPlugin, ChicPluginFunction } from './plugins.js';
/** Browser console logging with CSS formatting */
export type Chic = {
  /** Builds the current style string */
  (): string;
  // SECTION: chic API
  /** Create a new Chic instances with the currently pending styles fixed  */
  fix(): Chic;
  /** Extra features available from installed plugins */
  plugins: ChicPlugins & { [plugin: string]: ChicPluginFunction };
} & ChicCSSBuilder &
  ChicLoggers;
/** Configuration for building Chic instances */
export type ChicConfig = {
  /** Fixed styles to always apply when building style strings */
  fixed?: string[][];
  /** Plugins to extend Chic functionality */
  plugins?: ChicPlugin[];
};
