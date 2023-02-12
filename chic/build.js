import esbuild from 'esbuild';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

/** `/[^.]*\.[^.]+$/` */
const isFile = /[^.]*\.[^.]+$/;
/** Uses `node:fs/promises.readdir` to recursively read all files in a directory
 * @param {string} root
 * @param {string[]} [files=[]] */
const readDirRecursive = async (root, files = []) => {
  for (const file of await readdir(root).catch(() => [])) {
    const location = join(root, file);
    isFile.test(file) ? files.push(location) : await readDirRecursive(location, files);
  }
  return files;
};

await esbuild.build({
  entryPoints: await readDirRecursive('lib'),
  format: 'esm',
  outdir: 'dist',
  sourcemap: true,
});
