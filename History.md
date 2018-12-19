2.0.2 / 2018-12-20
==================

  * Updated deprecated dependencies
  * Removed test for express 2.x
  * Added Felix Franz as Contributor
  * Updated Readme: Added supported express versions

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
