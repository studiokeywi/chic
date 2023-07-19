import esbuild from 'esbuild';
import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

/** `/[^.]*\.[^.]+$/` */
const isFile = /[^.]*\.[^.]+$/;
/** Uses `node:fs/promises.readdir` to recursively read all files in a directory
 * @param {string} root
 * @param {string[]} [files=[]] */
const readDirRecursive = async (root, files = []) => {
  for (let location of await readdir(root).catch(() => []))
    isFile.test((location = join(root, location))) ? files.push(location) : await readDirRecursive(location, files);
  return files;
};

await esbuild.build({
  entryPoints: await readDirRecursive('lib'),
  format: 'esm',
  outdir: 'dist',
  sourcemap: true,
  treeShaking: true,
});
