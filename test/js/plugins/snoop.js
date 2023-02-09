import { buildChic } from '@studiokeywi/chic/build';
import { snoop } from '@studiokeywi/chic/plugins';

const _1s = 1e3;
const _5s = 5e3;
const chic = buildChic({ plugins: [snoop] });
const config = {
  check: () => (window?.foo ?? null) !== null,
  labels: ['window.foo exists'],
  styles: [chic.margin._0_25rem.padding._0_5rem()],
};
const foo = { foo: 'foo bar baz' };
const styles = [chic.fontSize._1rem.fontWeight.bolder(), chic.padding._0_25rem()];

const noStartStop = async () => {
  chic.group`Begin snoop (not using start/stop)`;
  chic.plugins.snoop(config);
  await wait(_5s);
  chic.log`Assign data to window.foo`;
  Object.assign(window, foo);
  await wait(_1s);
  chic.log`Delete window.foo`;
  delete window.foo;
  await wait(_1s);
  chic.groupEnd();
};
const repeatMode = async () => {
  chic.group`Begin snoop (using repeat)`;
  const snoop = chic.plugins.snoop({ ...config, repeat: true });
  chic.log`Assign data to window.foo`;
  Object.assign(window, foo);
  await wait(_5s);
  chic.log`Stop snoop`;
  snoop.stop();
  chic.log`Delete window.foo`;
  delete window.foo;
  chic.groupEnd();
};
const wait = time => (chic.debug(['waiting ', time / _1s, 's...']), new Promise(resolve => setTimeout(resolve, time)));
const withStartStop = async () => {
  chic.group`Begin snoop (using start/stop)`;
  const snoop = chic.plugins.snoop(config);
  chic.log`Stop snoop`;
  snoop.stop();
  await wait(_5s);
  chic.log`Assign data to window.foo`;
  Object.assign(window, foo);
  await wait(_5s);
  chic.log`Start snoop`;
  snoop.start();
  await wait(_1s);
  chic.log`Delete window.foo`;
  delete window.foo;
  chic.groupEnd();
};

export default async () => {
  chic.group(['Start snoop test:\n', config.check.toString()], ...styles);
  await noStartStop();
  await withStartStop();
  await repeatMode();
  chic.log`End snoop test`;
  chic.groupEnd();
};
