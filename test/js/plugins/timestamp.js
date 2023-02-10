import { buildChic } from '@studiokeywi/chic';
import { timestamp } from '@studiokeywi/chic/plugins';

const chic = buildChic({ plugins: [timestamp] });

const defaultSettings = () => {
  const tsLoggers = chic.plugins.timestamp();
  tsLoggers.info`Button Clicked!${chic.font._1rem_serif()}`;
};

const customSettings = () => {
  const tsLoggers = chic.plugins.timestamp({
    format: date => `{{ ${date.toJSON()} }}\r\n`,
    style: chic.font['1rem "Fira Code"'].fontWeight.bolder(),
  });
  tsLoggers.info`Button Clicked!${chic.font._1rem_serif()}`;
};

export default () => {
  chic.group`Default Settings`;
  defaultSettings();
  chic.groupEnd();
  chic.group`Custom Settings`;
  customSettings();
  chic.groupEnd();
};
