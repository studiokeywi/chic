import { buildChic } from './chic.js';
import { drawImage, labelMaker, snoop, timestamp } from './plugins/index.js';

/** Chic: CSS console formatting through tagged templates */
export default buildChic({ plugins: [drawImage, labelMaker, snoop, timestamp] });

export { type Chic, type ChicConfig, type ChicLogger, type ChicLoggers } from './chic.js';
export { type ChicPlugin, type ChicPluginFunction } from './plugins/index.js';