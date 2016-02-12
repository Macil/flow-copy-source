#!/usr/bin/env node
'use strict';

var flowCopy = require('..');

var argv = require('yargs')
  .usage('Usage: $0 [-v|--verbose] SRC... DEST')
  .boolean('verbose')
  .alias('v', 'verbose')
  .describe('v', 'Show changes')
  .demand(2)
  .strict()
  .argv;

var srcs = argv._.slice(0, -1);
var dest = argv._[argv._.length-1];

flowCopy(srcs, dest, {verbose: argv.verbose})
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
