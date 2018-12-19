# express-zip

express-zip allows you to do `res.zip(files)` in [express](http://expressjs.com/), without creating any intermediary files on disk, and in 100% pure node. [![build status](https://secure.travis-ci.org/thrackle/express-zip.png)](http://travis-ci.org/thrackle/express-zip)

```js
var app = require('express')();
var zip = require('express-zip');

app.get('/', function(req, res) {
  res.zip([
    { path: '/path/to/file1.name', name: '/path/in/zip/file1.name' }
    { path: '/path/to/file2.name', name: 'file2.name' }
  ]);
});

app.listen(3000);
```

Currently only express 3.x and 4.x is supported.

## Installation

    $ npm install express-zip

## Full API

```js
/**
 * Respond with a ZIP attachment containting `files`, with an optional
 * "save as" `filename` (default is attachment.zip), and then call `cb`
 * when finished.
 *
 * @param {Array} files { name: <name>, path: <path> }
 * @param {String|Function} filename that will be shown in "save as" dialog
 * @param {Function} cb(err, bytesZipped) optional
 */
res.zip = function(files, filename, cb) {
```

## Credits

Borrows heavily from nulltask's [express-csv](https://github.com/nulltask/express-csv), uses
ctalkington's [zip-stream](https://github.com/ctalkington/node-zip-stream) for the actual zipping.

## License

(The MIT License)

Copyright (c) 2012 Craig McDonald (thrackle) &lt;oss@thrackle.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
