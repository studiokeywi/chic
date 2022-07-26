import chic from './index.js';

console.log(chic.background['#c0c0c0']['border-radius']['0.5rem']());
console.log(chic.background.$c0c0c0.borderRadius._0_5rem.border._0_125rem_solid_blue());
chic.log`Hello World${chic.background.black.color.white()}`;
chic.log`Hello${chic.color.red()} World${chic.color.blue()}`;
chic.log`Hello World`;
chic.log`Hello${chic.fontSize._1rem()} World`;
