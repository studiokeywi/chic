var timestamp_default = {
  id: "timestamp",
  // TODO: documentation
  install: (chic) => {
    const dateStyle = chic.fontStyle.italic.marginRight._0_5rem();
    const ts = () => `[${new Date().toLocaleString()}]`;
    return ({ style = dateStyle } = {}) => ({
      debug: (strs, ...styles) => chic.debug([ts(), ...strs], style, ...styles),
      error: (strs, ...styles) => chic.error([ts(), ...strs], style, ...styles),
      group: (strs, ...styles) => chic.group([ts(), ...strs], style, ...styles),
      groupCollapsed: (strs, ...styles) => chic.groupCollapsed([ts(), ...strs], style, ...styles),
      groupEnd: () => chic.groupEnd(),
      info: (strs, ...styles) => chic.info([ts(), ...strs], style, ...styles),
      log: (strs, ...styles) => chic.log([ts(), ...strs], style, ...styles),
      warn: (strs, ...styles) => chic.warn([ts(), ...strs], style, ...styles)
    });
  }
};
export {
  timestamp_default as default
};
//# sourceMappingURL=timestamp.js.map
