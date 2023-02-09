const install = (chic) => {
  const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
  return ({ style = dateStyle } = { style: dateStyle }) => ({
    debug: makeLogger(chic, "debug", style),
    error: makeLogger(chic, "error", style),
    group: makeLogger(chic, "group", style),
    groupCollapsed: makeLogger(chic, "groupCollapsed", style),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger(chic, "info", style),
    log: makeLogger(chic, "log", style),
    warn: makeLogger(chic, "warn", style)
  });
};
const makeLogger = (chic, mode, style) => (strs, ...styles) => chic[mode]([ts(), ...strs], style, ...styles);
const ts = () => `[${new Date().toLocaleString()}]`;
var timestamp_default = { id: "timestamp", install };
export {
  timestamp_default as default
};
//# sourceMappingURL=timestamp.js.map
