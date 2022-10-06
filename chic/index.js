const cssWrap = str => (str !== '' ? `%c${str}` : str);
const useCss = (strs, { length }) => (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');
const chicModes = ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'];
const loggerMap = mode => {
  const logger = (strs, ...styles) => {
    while (styles.length < strs.length) styles.push('');
    console[mode](useCss(strs, styles), ...styles);
  };
  return [mode, logger];
};
const buildLoggers = () => Object.fromEntries(chicModes.map(loggerMap));
const rgx = {
  dashes: /-/g,
  hex: /\$/g,
  kebab: /(?=[A-Z])/,
  lead: /(^_)/,
  number: /(\d+)_(\d+)/g,
  snake: /_/g,
  quote: /"[^"]*?"/g,
};
const format = str =>
  str
    .replace(rgx.lead, '')
    .replaceAll(rgx.hex, '#')
    .replaceAll(rgx.number, '$1.$2')
    .replaceAll(rgx.snake, ' ')
    .split(rgx.kebab)
    .reduce((out, str) => `${out}${out ? '-' : ''}${str.toLowerCase()}`, '')
    .replaceAll(rgx.quote, match => {
      const stripped = match.replaceAll(rgx.dashes, '');
      const [quote] = str.match(new RegExp(stripped, 'i'));
      return quote;
    });
const groupEnd = () => console.groupEnd();
const buildChic = (fixed = []) => {
  const apply = () => [...fixed, ...styles.splice(0, styles.length)].map(style => style.join(':')).join(';');
  const styles = [];
  const chic = Object.assign(apply, { groupEnd, ...buildLoggers() });
  const fix = () => buildChic([...fixed, ...styles.splice(0, styles.length)]);
  return new Proxy(chic, {
    get(loggers, key, chic) {
      if ('symbol' === typeof key || key in loggers) return loggers[key];
      if ('fix' === key) return fix;
      const last = styles.at(-1);
      const val = format(key);
      !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
      return chic;
    },
  });
};
export default buildChic();
