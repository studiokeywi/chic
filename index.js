const buildLoggers = () => {
  const cssWrap = str => (str ? `%c${str}` : str);
  const useCss = (strs, { length }) => (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');
  return Object.fromEntries(
    ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'].map(mode => {
      const logger = (strs, ...styles) => {
        while (styles.length < strs.length) styles.push('');
        console[mode](useCss(strs, styles), ...styles);
      };
      return [mode, logger];
    })
  );
};
const buildChic = () => {
  const rgx = { hex: /\$/g, kebab: /(?=[A-Z])/, lead: /(^_)/, number: /(\d+)_(\d+)/g, snake: /_/g };
  const format = str =>
    str
      .replace(rgx.lead, '')
      .replaceAll(rgx.hex, '#')
      .replaceAll(rgx.number, '$1.$2')
      .replaceAll(rgx.snake, ' ')
      .split(rgx.kebab)
      .map(str => str.toLowerCase())
      .join('-');
  const styles = [];
  const apply = Object.assign(
    () => {
      const css = styles.splice(0, styles.length);
      return css.map(style => style.join(':')).join(';');
    },
    { groupEnd: () => console.groupEnd(), ...buildLoggers() }
  );
  return new Proxy(apply, {
    get(loggers, key, chic) {
      if ('symbol' === typeof key || key in loggers) return loggers[key];
      const last = styles.at(-1);
      const val = format(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic;
    },
  });
};
export default buildChic();
