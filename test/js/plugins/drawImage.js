import chic from '@studiokeywi/chic';
import testImg from '../../img/test.png';
import { clear } from './index.js';

const imageEle = document.createElement('img');
const panel = document.querySelector('#plugins');
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset';
const testBtn = document.createElement('button');
testBtn.textContent = 'Click to draw image in console';

const prep = image => () => {
  imageEle.src = image.src;
  [...panel.children].forEach(child => child.remove());
  panel.append(imageEle);
  panel.append(document.createElement('br'));
  panel.append(testBtn);
  panel.append(document.createElement('br'));
  panel.append(resetBtn);
};
const testDraw = image => () => chic.plugins.drawImage(image);

export const test = () => {
  const image = new Image();
  image.addEventListener('load', prep(image));
  image.src = testImg;
  resetBtn.addEventListener('click', clear);
  testBtn.addEventListener('click', testDraw(image));
};
