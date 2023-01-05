import chic from '@studiokeywi/chic';

const blueBorder = '0.125rem solid blue';
const oneRem = '1rem';
const quoteExample = '"Fira Code", monospace';
// prettier-ignore
const groupHeader = chic
  .background  .lightslategray
  .border      .solid_darkslategray_0_125rem
  .borderRadius._2rem
  .color       .darkslategray
  .fontSize    ._1_25rem
  .padding     ._0_5rem
  ();

chic.group`Tagged Template Logging${groupHeader}`;
// tagged template logging #1
chic.log`Hello World`;
// tagged template logging #2
chic.log`Hello World${chic.background.darkslategray.color.lightgray()}`;
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
// tagged template logging #3
chic.log`Hello${chic['font-size'][oneRem]()} World`;
// tagged template logging #4
const someUsername = 'Gary Garrison';
chic.log(['User: ', someUsername], chic.fontWeight.bolder.padding[oneRem](), chic.color.yellow());
chic.groupEnd();

chic.group`CSS Builder${groupHeader}`;
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

chic.group`CSS Fixing${groupHeader}`;
// css fixing #1
const infoStyle1 = chic.background.$c0c0c0.color.white();
const infoBox1 = `${infoStyle1};${chic.padding[oneRem].border[blueBorder]()}`;
chic.log`Something to know 1${infoBox1}`;
// css fixing #2
const infoStyle2 = chic.background.$c0c0c0.color.white.fix();
const infoBox2 = infoStyle2.padding[oneRem].border[blueBorder]();
chic.log`Something to know 2${infoBox2}`;
// css fixing #3
const infoBox3 = infoStyle2.padding[oneRem].border[blueBorder].fix();
infoBox3.log`Something to know 3${infoBox3()}`;
chic.groupEnd();

const f12 = document.createElement('kbd');
f12.textContent = 'F12';
const ctrlShiftI = document.createElement('kbd');
ctrlShiftI.textContent = 'CTRL + SHIFT + I';
const chicCode = document.createElement('code');
chicCode.textContent = 'chic';
const panel = document.querySelector('#examples');
panel.append('Hit ');
panel.append(f12);
panel.append(' or press ');
panel.append(ctrlShiftI);
panel.append(' to open devTools to see ');
panel.append(chicCode);
panel.append(' examples');
