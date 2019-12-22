3.0.0 / 2019-12-21
==================

  * Support the officially supported versions of node (10, 12, and 13); drop support for old versions
  * Bump dependencies to eliminate vulnerable packages

2.0.2 / 2019-12-21
==================

  * Bump dependencies to max avail for supported node versions (next release will drop node versions that are end of life)

2.0.1 / 2016-06-18
==================

  * Fix calling of `cb`, which broke after switching to `zip-stream`

2.0.0 / 2015-01-27
==================

  * Add support for node 0.10, drop support for node 0.6
    - switched from zipper to zip-stream for the actual zipping
  * Add full integration tests for express 2, 3, and 4

1.0.1 / 2012-10-10
==================

  * Fix the res#zip callback to follow node callback conventions (err, result)

1.0.0 / 2012-10-10
==================

  * Initial release.
