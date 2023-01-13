import { drawImage, labelMaker, snoop, timestamp } from "./plugins/index.js";
const chicModes = ["debug", "error", "group", "groupCollapsed", "info", "log", "warn"];
const rgx = {
  /** Used to unconvert kebab-case replacements inside quotes (e `font-family: "-fira-code"`) */
  dashes: /-/g,
  /** Convert dollar signs to pound signs for hex values */
  hex: /\$/g,
  /** Convert `backgroundColor` style text to `background-color` */
  kebab: /(?=[A-Z])/,
  /** Remove leading underscores from a style string */
  lead: /(^_)/,
  /** Convert `5_2` style numbers to `5.2` */
  number: /(\d+)_(\d+)/g,
  /** Convert `solid_black` style text to `solid black` */
  snake: /_/g,
  /** Check for situations requiring quotes (eg `font-family: "Fira Code";`) */
  quote: /"[^"]*?"/g
};
const cssWrap = (str) => str !== "" ? `%c${str}` : str;
const format = (str) => {
  const trimmedFront = str.replace(rgx.lead, "");
  const replacedDollarSigns = trimmedFront.replaceAll(rgx.hex, "#");
  const convertedNumberFormat = replacedDollarSigns.replaceAll(rgx.number, "$1.$2");
  const convertedSnakeCases = convertedNumberFormat.replaceAll(rgx.snake, " ");
  const splitKebabs = convertedSnakeCases.split(rgx.kebab);
  const convertedKebabCases = splitKebabs.reduce((out, str2) => `${out}${out ? "-" : ""}${str2.toLowerCase()}`, "");
  const fixedQuotes = convertedKebabCases.replaceAll(
    rgx.quote,
    (match) => str.match(new RegExp(match.replaceAll(rgx.dashes, ""), "i"))[0]
  );
  return fixedQuotes;
};
const groupEnd = () => console.groupEnd();
const loggerMap = (mode) => {
  const logger = (strs, ...styles) => {
    while (styles.length < strs.length)
      styles.push("");
    console[mode](useCss(strs, styles), ...styles);
  };
  return [mode, logger];
};
const useCss = (strs, { length }) => (length ? strs.map(cssWrap).filter(Boolean) : strs).join("");
const buildChic = ({ fixed = [], plugins = [] } = {}) => {
  const chicHandler = {
    get(self, key, chic2) {
      if ("symbol" === typeof key || key in self)
        return Reflect.get(self, key, chic2);
      const last = styles.at(-1);
      const val = format(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic2;
    }
  };
  const loggers = Object.fromEntries([["groupEnd", groupEnd], ...chicModes.map(loggerMap)]);
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
      const pluginFn = plugin.install(chic);
      if (plugin.uninstall)
        pluginFn.uninstall = plugin.uninstall;
      chic.plugins[plugin.id] = pluginFn;
    },
    uninstall: (id) => {
      if (!(id in chic.plugins))
        return;
      chic.plugins[id]?.uninstall?.(chic);
      delete chic.plugins[id];
    }
  };
  const chicBase = { ...loggers, fix: () => buildChic({ fixed: useStyles() }), plugins: pluginObj };
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
