const quoteFixer = (str) => (match) => str.match(new RegExp(match.replaceAll(rgxDashes, ""), "i"))[0];
const rgxDashes = /-/g;
const rgxHex = /\$/g;
const rgxKebab = /(?=[A-Z])/;
const rgxLead = /(^_)/;
const rgxNumber = /(\d+)_(\d+)/g;
const rgxSnake = /_/g;
const rgxQuote = /"[^"]*?"/g;
const cssFormatter = (str) => {
  const trimmedFront = str.replace(rgxLead, "");
  const replacedDollarSigns = trimmedFront.replaceAll(rgxHex, "#");
  const convertedNumberFormat = replacedDollarSigns.replaceAll(rgxNumber, "$1.$2");
  const convertedSnakeCases = convertedNumberFormat.replaceAll(rgxSnake, " ");
  const splitKebabs = convertedSnakeCases.split(rgxKebab);
  const convertedKebabCases = splitKebabs.reduce((out, str2) => `${out}${out ? "-" : ""}${str2.toLowerCase()}`, "");
  const fixedQuotes = convertedKebabCases.replaceAll(rgxQuote, quoteFixer(str));
  return fixedQuotes;
};
export {
  cssFormatter
};
//# sourceMappingURL=cssBuilder.js.map
