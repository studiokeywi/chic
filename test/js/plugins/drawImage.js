import { buildChic } from '@studiokeywi/chic/build';
import { drawImage } from '@studiokeywi/chic/plugins';
import testImg from '../../img/test.png';
import { clear } from './index.js';

const chic = buildChic({ plugins: [drawImage] });

const prep = image => () => {
  const panel = document.querySelector('#plugins');
  [...panel.children].forEach(child => child.remove());

  const imageEle = document.createElement('img');
  imageEle.src = image.src;
  panel.append(imageEle);
  panel.append(document.createElement('br'));

  const testBtn = document.createElement('button');
  testBtn.textContent = 'Click to draw image in console';
  testBtn.addEventListener('click', testDraw(image));
  panel.append(testBtn);
  panel.append(document.createElement('br'));

  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', clear);
  panel.append(resetBtn);
};
const testDraw = image => () => chic.plugins.drawImage(image);

export default () => {
  const image = new Image();
  image.addEventListener('load', prep(image));
  image.src = testImg;
};
