const install = (chic) => {
  const makeLogger = (format, mode, style) => (strs, ...styles) => chic[mode]([format(/* @__PURE__ */ new Date()), ...strs], style, ...styles);
  const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
  const timestamp2 = ({
    format = (date) => `[${date.toLocaleString()}]`,
    style = dateStyle
  } = {}) => ({
    debug: makeLogger(format, "debug", style),
    error: makeLogger(format, "error", style),
    group: makeLogger(format, "group", style),
    groupCollapsed: makeLogger(format, "groupCollapsed", style),
    groupEnd: chic.groupEnd.bind(chic),
    info: makeLogger(format, "info", style),
    log: makeLogger(format, "log", style),
    warn: makeLogger(format, "warn", style)
  });
  return timestamp2;
};
const timestamp = { id: "timestamp", install };
export {
  timestamp
};
//# sourceMappingURL=timestamp.js.map
