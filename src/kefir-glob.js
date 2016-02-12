'use strict';

var Kefir = require('kefir');
var Glob = require('glob').Glob;

module.exports = function kefirGlob(pattern, options) {
  return Kefir.stream(emitter => {
    var mg = new Glob(pattern, options);
    mg.on('match', emitter.emit);
    mg.on('error', emitter.error);
    mg.on('end', emitter.end);
  });
};
