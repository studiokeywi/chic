const convert = obj => Object.entries(obj).map(values);
const getExtra = (text, use, e) => (e = (e = text.length - use.length) < 0 ? 0 : e);
const isType = type => arg => type === typeof arg;
const format = str =>
  str
    .replace(regexps.lead, '')
    .replaceAll(regexps.hex, '#')
    .replaceAll(regexps.number, '$1.$2')
    .replaceAll(regexps.snake, ' ')
    .split(regexps.kebab)
    .map(str => str.toLowerCase())
    .join('-');
const values = ([prop, val]) => `${prop}:${val};`;
const regexps = { hex: /\$/g, kebab: /(?=[A-Z])/, lead: /(^_)/, number: /(\d+)_(\d+)/g, snake: /_/g };
const handler = {
  make: ({ multi = false } = {}) =>
    new Proxy(console.log, { ...{ batch: [], single: [], fixed: [] }, multi, ...handler }),
  clear() {
    this.batch.splice(0, this.batch.length);
    this.single.splice(0, this.single.length);
  },
  fix(...styles) {
    const source = this[this.mode];
    if (styles) styles.forEach(style => source.push(...(this.multi ? [convert(style).join('')] : convert(style))));
    this.multi ? this.fixed.push(...source) : this.fixed.push(source.join(''));
    this.clear();
    return this;
  },
  get mode() {
    return this.multi ? 'batch' : 'single';
  },
  // proxy traps
  apply(print, _, [first, ...args]) {
    const text = [first];
    const styles = [];
    if (args.length) {
      text.push(...args.filter(isType('string')));
      args
        .filter(isType('object'))
        .forEach(arg => (this.multi ? styles.push(convert(arg)) : styles.push(...convert(arg))));
    }
    const toPrint = [];
    const use = [];
    const source = this[this.mode];
    if (styles.length) source.push(...styles);
    if (this.multi) {
      use.push(...this.fixed, ...source.map(style => style?.join?.('') ?? style));
      toPrint.push(text.map(txt => `%c${txt}`).join(''), ...use, ...Array(getExtra(text, use)).map(_ => ''));
    } else {
      use.push(...this.fixed, ...source);
      toPrint.push(`%c${text.join(' ')}`, [...use, ...Array(getExtra(text, use)).map(_ => '')].join(''));
    }
    print(...toPrint);
    this.clear();
  },
  get(_, prop, chic) {
    const source = this[this.mode];
    if (prop in this) return this[prop];
    const last = source[source.length - 1]?.endsWith?.(':') ? ';' : ':';
    const next = `${format(prop)}${last}`;
    source.push(next);
    if (this.multi && next.endsWith(';') && !next.includes(':')) {
      const [prop, value] = source.splice(source.length - 2, source.length);
      source.push(`${prop}${value}`);
    }
    return chic;
  },
};
export default handler.make();
