import { test as drawImage } from './drawImage.js';
import { test as labelMaker } from './labelMaker.js';

const clear = () => {
  [...panel.children].forEach(child => child.remove());
  displayEles.forEach(ele => panel.append(ele));
};
const makeTestButton = (key, val) => {
  const button = Object.assign(document.createElement('button'), { textContent: `Run ${key} test` });
  return button.addEventListener('click', val), button;
};

const displayEles = [
  makeTestButton('drawImage', drawImage),
  document.createElement('br'),
  makeTestButton('labelMaker', labelMaker),
];
const panel = document.querySelector('#plugins');

clear();

export { clear };
