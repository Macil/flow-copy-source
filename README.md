# flow-copy-source

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/flow-copy-source/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/flow-copy-source.svg?style=flat)](https://www.npmjs.com/package/flow-copy-source) [![CircleCI Status](https://circleci.com/gh/Macil/flow-copy-source.svg?style=shield)](https://circleci.com/gh/Macil/flow-copy-source) [![Greenkeeper badge](https://badges.greenkeeper.io/Macil/flow-copy-source.svg)](https://greenkeeper.io/)

This is a simple script which finds all .js, .jsx, and .mjs files in one or
more source directories, and copies them into a destination directory with the
.flow suffix appended to the filename.

This is intended to be used as a build step for Flow-typed Javascript projects
so that the original typed source files can be placed in the same directory as
the transpiled code, so that Flow can use the type definitions in the original
source code.

```
Usage: bin/flow-copy-source.js [-v|--verbose] [-w|--watch] [-i PATTERN]... SRC... DEST

Options:
  -v, --verbose  Show changes                                          [boolean]
  -w, --watch    Re-copy files on change                               [boolean]
  -i, --ignore   ignore pattern (glob expression)
```

Multiple `--ignore` patterns may be given by using the `--ignore` option
multiple times.

This module also exports the `flowCopySource(sources, dest, options)` function.
`sources` must be an array of strings, `dest` must be a string, and `options`
may optionally be an object with optional `verbose` and `watch` boolean
properties. The function returns a promise for an array of `{src, dest}`
objects listing the operations done.
