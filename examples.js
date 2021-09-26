import chic from './index.js';

chic('Unstyled text');
chic.color.red('Red text');
chic.color.blue('Blue', 'text');
chic.background.black.color.hotpink('Hotpink on Black');
chic.borderRadius._0_5rem.background.$c0c0c0.color.blue.padding._0_5rem('Rounded & padded #C0C0C0 on blue');
chic('Object format', { ['font-size']: '1rem', padding: '0.5rem' });
chic('Multi', 'object', 'format', { ['font-size']: '1rem' }, { color: 'green' });
const fixed = chic.make().background.yellow.borderRadius._0_5rem.color.black.padding._0_5rem.fix();
fixed('Single string, multi props inline');
fixed('Multi', 'string');
fixed.fix({ ['font-size']: '1rem' });
fixed('Single string, added new fixed style');
fixed('Multi', 'string');
const multi = chic.make({ multi: true });
multi('Multi', 'formatting', { color: 'red' }, { color: 'blue' });
multi.color.yellow('Multi', 'with chaining', { color: 'violet' });
const warn = chic
  .make({ multi: true })
  .fix(
    { background: 'yellow', ['border-radius']: '0.5rem', color: 'black', padding: '0.5rem' },
    { ['font-size']: '1rem', margin: '0.5rem' }
  );
warn('Title', 'Warning message');
