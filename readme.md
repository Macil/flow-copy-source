# flow-copy-source

This is a simple script which finds all .js and .jsx files in one or more
source directories, and copies them into a destination directory with the
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

This module also exports the `flowCopySource(sources, dest, options)` function.
`sources` must be an array of strings, `dest` must be a string, and `options`
may optionally be an object with optional `verbose` and `watch` boolean
properties. The function returns a promise for an array of `{src, dest}`
objects listing the operations done.
