import { blueBorder, chic, header, quoteExample } from './index.js';

export default () => {
  chic.group`CSS Builder${header}`;
  console.log(
    'CSS Builder (Bracket syntax): %o\n%o',
    `chic.background['#c0c0c0']['border-radius']['0.5rem'].border[blueBorder]()`,
    chic.background['#c0c0c0']['border-radius']['0.5rem'].border[blueBorder]()
  );
  console.log(
    'CSS Builder (Special character syntax): %o\n%o',
    `chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue()`,
    chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue()
  );
  // css special syntax - hex
  console.log('CSS Builder notes (Uppercase hex letters): %o\n%o', `chic.color.$C0C0C0()`, chic.color.$C0C0C0());
  console.log('CSS Builder notes (Lowercase hex letters): %o\n%o', `chic.color.$c0c0c0()`, chic.color.$c0c0c0());
  console.log(
    'CSS Builder notes (Quoted text in property): %o\n%o',
    `chic.fontFamily[quoteExample]()`,
    chic.fontFamily[quoteExample]()
  );
  console.log(
    'CSS Builder notes (Multiple numbers in special syntax): %o\n%o',
    `chic.margin._0_0_25rem_0_0()`,
    chic.margin._0_0_25rem_0_0()
  );
  console.log(
    'CSS Builder notes (Multiple numbers in longhand): %o\n%o',
    `chic.margin['0 0.25rem 0 0']()`,
    chic.margin['0 0.25rem 0 0']()
  );
  console.log(
    'CSS Builder notes (Multiple numbers with units in shorthand): %o\n%o',
    `chic.margin._0rem_0_25rem_0rem_0rem()`,
    chic.margin._0rem_0_25rem_0rem_0rem()
  );
  chic.groupEnd();
};
