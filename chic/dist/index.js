import { drawImage, labelMaker } from './plugins/index.js';
/** All valid Chic logger modes */
const chicModes = ['debug', 'error', 'group', 'groupCollapsed', 'info', 'log', 'warn'];
/** Regular Expressions used to parse special property name syntaxes */
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
    quote: /"[^"]*?"/g,
};
/** Prefixes a string with `%c` if needed to apply CSS styling
 * @param {string} str Text segment
 * @returns The wrapped text (if required) */
const cssWrap = (str) => (str !== '' ? `%c${str}` : str);
/** Converts special property syntax into valid CSS strings
 * @param {string} str Special syntax string
 * @returns CSS style string */
const format = (str) => {
    const trimmedFront = str.replace(rgx.lead, '');
    const replacedDollarSigns = trimmedFront.replaceAll(rgx.hex, '#');
    const convertedNumberFormat = replacedDollarSigns.replaceAll(rgx.number, '$1.$2');
    const convertedSnakeCases = convertedNumberFormat.replaceAll(rgx.snake, ' ');
    const splitKebabs = convertedSnakeCases.split(rgx.kebab);
    const convertedKebabCases = splitKebabs.reduce((out, str) => `${out}${out ? '-' : ''}${str.toLowerCase()}`, '');
    const fixedQuotes = convertedKebabCases.replaceAll(rgx.quote, match => str.match(new RegExp(match.replaceAll(rgx.dashes, ''), 'i'))[0]);
    return fixedQuotes;
};
/** Wrapper for `console.groupEnd` */
const groupEnd = () => console.groupEnd();
/** Create an Object entry for a given Chic logger mode
 * @param {string} mode Logger mode
 * @returns An Object entry for the Chic logger */
const loggerMap = (mode) => {
    const logger = (strs, ...styles) => {
        while (styles.length < strs.length)
            styles.push('');
        console[mode](useCss(strs, styles), ...styles);
    };
    return [mode, logger];
};
/** Applies necessary CSS wrapping around text segments for use in logging
 * @param strs Text to display
 * @param styles Styles array
 * @returns A single CSS formatted string */
const useCss = (strs, { length }) => (length ? strs.map(cssWrap).filter(Boolean) : strs).join('');
/** Builds a new instance of a Chic logger
 * @param {import('@studiokeywi/chic').ChicConfig} config Chic config
 * @returns A new Chic logger with styles that will always apply */
export const buildChic = ({ fixed = [], plugins = [] } = {}) => {
    const chicHandler = {
        get(self, key, chic) {
            if ('symbol' === typeof key || key in self)
                return Reflect.get(self, key, chic);
            const last = styles.at(-1);
            const val = format(key);
            !styles.length || last.length > 1 ? styles.push([val]) : last.push(val);
            return chic;
        },
    };
    /** Chic logger methods */
    const loggers = Object.fromEntries([['groupEnd', groupEnd], ...chicModes.map(loggerMap)]);
    /** Current CSS styles */
    const styles = [];
    /** Builds the current style string */
    const buildStyle = () => {
        const styles = useStyles();
        return styles.map(style => style.join(':')).join(';');
    };
    /** Get and reset all currently available styles */
    const useStyles = () => [...fixed, ...styles.splice(0, styles.length)];
    const fix = () => {
        const fixed = buildChic({ fixed: useStyles() });
        fixed.plugins = chic.plugins;
        return fixed;
    };
    /** Chic object */
    const chic = new Proxy(Object.assign(buildStyle, { plugins: {}, fix, ...loggers }), chicHandler);
    plugins.forEach(plugin => plugin.install(chic));
    return chic;
};
/** Chic: CSS console formatting through tagged templates */
export default buildChic({ plugins: [drawImage, labelMaker] });
//# sourceMappingURL=index.js.map