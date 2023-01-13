import drawImage from './drawImage.js';
import labelMaker from './labelMaker.js';
import snoop from './snoop.js';
import timestamp from './timestamp.js';

export const clear = () => {
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
  document.createElement('br'),
  makeTestButton('snoop', snoop),
  document.createElement('br'),
  makeTestButton('timestamp', timestamp),
];
const panel = document.querySelector('#plugins');

clear();
