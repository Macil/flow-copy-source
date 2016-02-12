'use strict';

var Kefir = require('kefir');
var fs = require('fs-extra');

module.exports = function kefirCopyFile(src, dest) {
  return Kefir.stream(emitter => {
    fs.copy(src, dest, (err) => {
      if (err) {
        emitter.error(err);
      } else {
        emitter.emit({src, dest});
      }
      emitter.end();
    });
  });
};
