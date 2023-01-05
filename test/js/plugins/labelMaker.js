import chic from '@studiokeywi/chic';

// prettier-ignore
const baseLabel = chic
  .border      .solid_black_0_125rem
  .borderRadius._0_5rem
  .fontWeight  .bolder
  .margin      ._0rem_0_5rem_0rem_0rem
  .padding     ._0rem_0_5rem
  .fix();
const dbgColor = 'cyan';
const errColor = 'red';
const groupColor = 'white';
const infoColor = 'green';
const messageText = chic.color.white.fontStyle.italic();
const logColor = 'green';
const warnColor = 'yellow';

const makeStyle = color => baseLabel.borderColor[color].color[color]();

export const test = () => {
  const labels = chic.plugins.labelMaker({
    debug: { label: 'DBG', style: makeStyle(dbgColor) },
    error: { label: 'ERR', style: makeStyle(errColor) },
    group: { label: 'GRP', style: makeStyle(groupColor) },
    groupCollapsed: { label: 'GRPC', style: makeStyle(groupColor) },
    info: { label: 'INFO', style: makeStyle(infoColor) },
    log: { label: 'LOG', style: makeStyle(logColor) },
    warn: { label: 'WARN', style: makeStyle(warnColor) },
  });
  labels.debug`Testing debug${messageText}`;
  labels.error`Testing error${messageText}`;
  labels.group`Testing group${messageText}`;
  labels.info`Testing info${messageText}`;
  labels.groupEnd();
  labels.groupCollapsed`Testing collapsed${messageText}`;
  labels.log`Testing log${messageText}`;
  labels.groupEnd();
  labels.warn`Testing warn${messageText}`;
};
