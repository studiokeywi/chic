import { blueBorder, chic, header, oneRem, twoRem } from './index.js';

export default () => {
  chic.group`CSS Injecting${header}`;
  const borderBox = chic.border[blueBorder]();
  const largeFont = chic.fontSize[twoRem]();
  const smallFont = chic.fontSize[oneRem]();
  const titleBox = chic.inject(borderBox).inject(largeFont)();
  const textBox = chic.inject(borderBox, smallFont)();
  chic.log`My Title${titleBox}
My Text${textBox}`;
  const boxLog = chic.inject(borderBox, largeFont);
  boxLog.log`Another Title${boxLog()}`;
};
