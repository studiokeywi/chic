const chicModes = ["debug", "error", "group", "groupCollapsed", "info", "log", "warn"];
const cssWrap = (str) => str !== "" ? `%c${str}` : str;
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
const buildLoggers = () => Object.fromEntries([["groupEnd", groupEnd], ...chicModes.map(loggerMap)]);
export {
  buildLoggers
};
//# sourceMappingURL=loggers.js.map
