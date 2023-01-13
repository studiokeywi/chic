import { buildChic } from '@studiokeywi/chic';
import { timestamp } from '@studiokeywi/chic/plugins';

const chic = buildChic({ plugins: [timestamp] });
const tsLoggers = chic.plugins.timestamp();

export default () => tsLoggers.info`Button Clicked!${chic.font._1rem_serif()}`;
