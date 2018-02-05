'use strict';

const path = require('path');
const Kefir = require('kefir');
const kefirGlob = require('./kefir-glob');
const kefirCopyFile = require('./kefir-copy-file');

const jsAndJsxPattern = '**/*.{js,mjs,jsx}';

module.exports = function flowCopySource(sources, dest, options) {
  const verbose = options && options.verbose;
  const ignore = options && options.ignore;
  const watch = options && options.watch;

  return Kefir.merge(
      sources.map(src => {
        let filesToCopy;
        if (watch) {
          const chokidar = require('chokidar');
          const watcher = chokidar.watch(jsAndJsxPattern, {cwd: src, ignored: ignore});
          filesToCopy = Kefir.merge([
            Kefir.fromEvents(watcher, 'add'),
            Kefir.fromEvents(watcher, 'change')
          ]);
        } else {
          filesToCopy = kefirGlob(jsAndJsxPattern, {cwd: src, strict: true, ignore});
        }

        return filesToCopy.map(match => ({src, match}));
      })
    )
    .flatMap(pair =>
      kefirCopyFile(
        path.join(pair.src, pair.match),
        path.join(dest, pair.match+'.flow')
      )
    )
    .takeErrors(1)
    .onValue(result => {
      if (verbose) {
        console.log(result.src, '->', result.dest);
      }
    })
    .scan((list, result) => {
      list.push(result);
      return list;
    }, [])
    .toPromise();
};
