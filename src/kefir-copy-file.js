'use strict';

const Kefir = require('kefir');
const fs = require('fs-extra');

module.exports = function kefirCopyFile(src, dest) {
  return Kefir.fromPromise(fs.copy(src, dest))
    .map(() => ({src, dest}));
};
