import { chic, header, oneRem } from './index.js';

export default () => {
  chic.group`Tagged Template Logging${header}`;
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
};
