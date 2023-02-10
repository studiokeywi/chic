import { buildChic } from '@studiokeywi/chic';
import basics from './basics.js';
import css from './css.js';
import fix from './fix.js';

export const blueBorder = '0.125rem solid blue';
export const chic = buildChic();
// prettier-ignore
export const header = chic
.background  .lightslategray
.border      .solid_darkslategray_0_125rem
.borderRadius._2rem
.color       .darkslategray
.fontSize    ._1_25rem
.padding     ._0_5rem();
export const oneRem = '1rem';
export const quoteExample = '"Fira Code", monospace';

const f12 = Object.assign(document.createElement('kbd'), { textContent: 'F12' });
const ctrlShiftI = Object.assign(document.createElement('kbd'), { textContent: 'CTRL + SHIFT + I' });
const chicCode = Object.assign(document.createElement('code'), { textContent: 'chic' });
const panel = document.querySelector('#examples');
const add = val => panel.append(val);
['Hit ', f12, ' or press ', ctrlShiftI, ' to open devTools to see ', chicCode, ' examples'].forEach(add);

[basics, css, fix].forEach(example => example());
