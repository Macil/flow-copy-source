'use strict';

var path = require('path');
var Kefir = require('kefir');
var kefirGlob = require('./kefir-glob');
var kefirCopyFile = require('./kefir-copy-file');

module.exports = function flowCopySource(sources, dest, options) {
  var verbose = options && options.verbose;
  var ignore = options && options.ignore;
  return Kefir.merge(
      sources.map(src =>
        kefirGlob('**/*.js?(x)', {cwd: src, strict: true, ignore: ignore})
          .map(match => ({src, match}))
      )
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
