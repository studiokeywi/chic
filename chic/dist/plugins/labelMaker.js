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
  const makeLogger = (mode, { label, style }) => (strs, ...styles) => chic[mode]([label, ...strs], ...[style, ...styles]);
  const labelMaker2 = (config = {}) => ({
    debug: makeLogger("debug", config.debug ?? defaults.debug),
    error: makeLogger("error", config.error ?? defaults.error),
    group: makeLogger("group", config.group ?? defaults.group),
    groupCollapsed: makeLogger("groupCollapsed", config.groupCollapsed ?? defaults.groupCollapsed),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger("info", config.info ?? defaults.info),
    log: makeLogger("log", config.log ?? defaults.log),
    warn: makeLogger("warn", config.warn ?? defaults.warn)
  });
  return labelMaker2;
};
const labelMaker = { id: "labelMaker", install };
export {
  labelMaker
};
//# sourceMappingURL=labelMaker.js.map
