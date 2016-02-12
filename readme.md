# flow-copy-source

This is a simple script which finds all .js and .jsx files in one or more
source directories, and copies them into a destination directory with the
.flow suffix appended to the filename.

This is intended to be used as a build step for Flow-typed Javascript projects
so that the original typed source files can be placed in the same directory as
the transpiled code, so that Flow can use the type definitions in the original
source code.

```
Usage: flow-copy-source [-v|--verbose] SRC... DEST

Options:
  -v, --verbose  Show changes                                          [boolean]
```

This module also exports the `flowCopySource(sources, dest, options)` function.
`sources` must be an array of strings, `dest` must be a string, and `options`
may optionally be an object with a `verbose` boolean property. The function
returns a promise.
