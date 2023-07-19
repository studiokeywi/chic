import { cssFormatter } from "./css.js";
import { buildLoggers } from "./loggers.js";
import { drawImage, labelMaker, snoop, timestamp } from "./plugins/index.js";
const buildPlugins = (chic2) => ({
  install: (plugin) => {
    if (plugin.id in chic2.plugins)
      return chic2.warn`Cannot overwrite an existing plugin`;
    const pluginFn = plugin.install(chic2);
    if (plugin.uninstall)
      pluginFn.uninstall = plugin.uninstall;
    chic2.plugins[plugin.id] = pluginFn;
  },
  uninstall: (id) => {
    if (!(id in chic2.plugins))
      return;
    chic2.plugins[id]?.uninstall?.(chic2);
    delete chic2.plugins[id];
  }
});
const buildChicHandler = (styles) => ({
  get(self, key, chic2) {
    if ("symbol" === typeof key || key in self)
      return Reflect.get(self, key, chic2);
    const last = styles.at(-1);
    const val = cssFormatter(key);
    !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
    return chic2;
  }
});
const buildChic = ({ fixed = [], plugins = [] } = {}) => {
  const styles = [];
  const buildStyle = () => [...fixed, ...styles.splice(0, styles.length)].map((style) => style.join(":")).join(";");
  const fix = () => buildChic({ fixed: [...fixed, ...styles.splice(0, styles.length)] });
  const inject = (...styleStrs) => (fixed.push(...styleStrs.flatMap((styles2) => styles2.split(";").map((style) => style.split(":")))), chic2);
  const chicBase = { ...buildLoggers(), inject, fix };
  const chic2 = new Proxy(Object.assign(buildStyle, chicBase), buildChicHandler(styles));
  chic2.plugins = buildPlugins(chic2);
  plugins.forEach(chic2.plugins.install);
  return chic2;
};
const chic = buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });
export {
  buildChic,
  chic
};
//# sourceMappingURL=index.js.map
