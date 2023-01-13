import { blueBorder, chic, header, oneRem } from './index.js';

export default () => {
  chic.group`CSS Fixing${header}`;
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
};
