'use strict';

const tmp = require('tmp');
const fs = require('fs-extra');
const path = require('path');

const flowCopySource = require('.');

let _tmpDirCleanupFns = [];

async function createTmpDir() {
  return new Promise((resolve, reject) => {
    tmp.dir({keep: false, unsafeCleanup: true}, (err, path, cleanupCallback) => {
      if (err) return reject(err);
      _tmpDirCleanupFns.push(cleanupCallback);
      resolve(path);
    });
  });
}

afterEach(() => {
  _tmpDirCleanupFns.forEach(fn => fn());
  _tmpDirCleanupFns.length = 0;
});

it('basic case', async () => {
  const dir = await createTmpDir();
  const srcDir = path.join(dir, 'src');
  const jsDir = path.join(dir, 'js');

  await fs.mkdir(srcDir);
  await fs.writeFile(path.join(srcDir, 'index.js'), 'let x = 1;\n');
  await fs.writeFile(path.join(srcDir, 'component.jsx'), 'let component = 1;\n');
  await fs.writeFile(path.join(srcDir, 'foo.mjs'), 'let foo = 1;\n');
  await fs.writeFile(path.join(srcDir, 'ignoreme.py'), 'x = 1\n');

  await flowCopySource([srcDir], jsDir);

  expect(new Set(await fs.readdir(jsDir)))
    .toEqual(new Set(['index.js.flow', 'component.jsx.flow', 'foo.mjs.flow']));
  expect(await fs.readFile(path.join(jsDir, 'index.js.flow'), {encoding: 'utf8'}))
    .toBe('let x = 1;\n');
  expect(await fs.readFile(path.join(jsDir, 'component.jsx.flow'), {encoding: 'utf8'}))
    .toBe('let component = 1;\n');
  expect(await fs.readFile(path.join(jsDir, 'foo.mjs.flow'), {encoding: 'utf8'}))
    .toBe('let foo = 1;\n');
});
