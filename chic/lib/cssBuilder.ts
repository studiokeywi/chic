import type { Chic } from './index.js';

/** Fixes issues with text in quotation marks being kebab-cased */
const quoteFixer = (str: string) => (match: string) => str.match(new RegExp(match.replaceAll(rgxDashes, ''), 'i'))[0];

/** Used to unconvert kebab-case replacements inside quotes (e `font-family: "-fira-code"`) */
const rgxDashes = /-/g;
/** Convert dollar signs to pound signs for hex values */
const rgxHex = /\$/g;
/** Convert `backgroundColor` style text to `background-color` */
const rgxKebab = /(?=[A-Z])/;
/** Remove leading underscores from a style string */
const rgxLead = /(^_)/;
/** Convert `5_2` style numbers to `5.2` */
const rgxNumber = /(\d+)_(\d+)/g;
/** Convert `solid_black` style text to `solid black` */
const rgxSnake = /_/g;
/** Check for situations requiring quotes (eg `font-family: "Fira Code";`) */
const rgxQuote = /"[^"]*?"/g;

/** Converts special property syntax into valid CSS strings
 * @param {string} str Special syntax string
 * @returns CSS style string */
export const cssFormatter = (str: string) => {
  const trimmedFront = str.replace(rgxLead, '');
  const replacedDollarSigns = trimmedFront.replaceAll(rgxHex, '#');
  const convertedNumberFormat = replacedDollarSigns.replaceAll(rgxNumber, '$1.$2');
  const convertedSnakeCases = convertedNumberFormat.replaceAll(rgxSnake, ' ');
  const splitKebabs = convertedSnakeCases.split(rgxKebab);
  const convertedKebabCases = splitKebabs.reduce((out, str) => `${out}${out ? '-' : ''}${str.toLowerCase()}`, '');
  const fixedQuotes = convertedKebabCases.replaceAll(rgxQuote, quoteFixer(str));
  return fixedQuotes;
};

/** Chic style builder proxy */
export type ChicCSSBuilder = {
  /** Append a new segment to the current style */
  [css: string]: Chic;
};