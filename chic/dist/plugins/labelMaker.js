const install = (chic) => {
  const base = chic.border.solid_0_125rem.borderRadius._0_5rem.fontSize._1rem.margin._0_25rem.padding._0_5rem.fix();
  const defaults = {
    debug: { label: "DEBUG", style: base.borderColor.cyan.color.cyan() },
    error: { label: "ERROR", style: base.borderColor.red.color.red() },
    group: { label: "GROUP", style: base.borderColor.initial() },
    groupCollapsed: { label: "GROUP", style: base.borderColor.initial() },
    info: { label: "INFO", style: base.borderColor.green.color.green() },
    log: { label: "LOG", style: base.borderColor.green.color.green() },
    warn: { label: "WARN", style: base.borderColor.yellow.color.yellow() }
  };
  const make = (mode, { label, style }) => (strs, ...styles) => chic[mode]([label, ...strs], ...[style, ...styles]);
  return (config = {}) => {
    const debug = make("debug", config.debug ?? defaults.debug);
    const error = make("error", config.error ?? defaults.error);
    const group = make("group", config.group ?? defaults.group);
    const groupCollapsed = make("groupCollapsed", config.groupCollapsed ?? defaults.groupCollapsed);
    const info = make("info", config.info ?? defaults.info);
    const log = make("log", config.log ?? defaults.log);
    const warn = make("warn", config.warn ?? defaults.warn);
    return { debug, error, group, groupCollapsed, groupEnd: chic.groupEnd.bind(chic), info, log, warn };
  };
};
var labelMaker_default = { id: "labelMaker", install };
export {
  labelMaker_default as default
};
//# sourceMappingURL=labelMaker.js.map
