import { cssFormatter } from "./cssBuilder.js";
import { buildLoggers } from "./loggers.js";
import {
  drawImage,
  labelMaker,
  snoop,
  timestamp
} from "./plugins.js";
const buildChic = ({ fixed = [], plugins = [] } = {}) => {
  const chicHandler = {
    get(self, key, chic2) {
      if ("symbol" === typeof key || key in self)
        return Reflect.get(self, key, chic2);
      const last = styles.at(-1);
      const val = cssFormatter(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic2;
    }
  };
  const styles = [];
  const buildStyle = () => useStyles(true).join(";");
  const useStyles = (map = false) => {
    const use = [...fixed, ...styles.splice(0, styles.length)];
    return map ? use.map((style) => style.join(":")) : use;
  };
  const pluginObj = {
    install: (plugin) => {
      if (plugin.id in chic.plugins)
        return chic.warn`Cannot overwrite an existing plugin`;
      const pluginFn = /* @__PURE__ */ plugin.install(chic);
      if (plugin.uninstall)
        pluginFn.uninstall = plugin.uninstall;
      chic.plugins[plugin.id] = pluginFn;
    },
    uninstall: (id) => {
      if (!(id in chic.plugins))
        return;
      /* @__PURE__ */ chic.plugins[id]?.uninstall?.(chic);
      delete chic.plugins[id];
    }
  };
  const chicBase = {
    .../* @__PURE__ */ buildLoggers(),
    fix: () => buildChic({ fixed: useStyles() }),
    plugins: pluginObj
  };
  const chic = new Proxy(Object.assign(buildStyle, chicBase), chicHandler);
  plugins.forEach(chic.plugins.install);
  return chic;
};
var lib_default = /* @__PURE__ */ buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });
export {
  buildChic,
  lib_default as default
};
//# sourceMappingURL=index.js.map
