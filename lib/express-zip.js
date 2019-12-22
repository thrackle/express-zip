/*!
 * express-zip
 * Copyright 2012 Craig McDonald (thrackle) <oss@thrackle.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var async = require('async')
  , http = require('http')
  , express = require('express')
  , fs = require('fs')
  , res = express.response || http.ServerResponse.prototype
  , zipstream = require('zip-stream');

/**
 * Options for the zip
 */

exports.options = { level: 1 };

/**
 * Respond with a ZIP attachment containing `files`, with an optional
 * "save as" `filename` (default is attachment.zip), and then call `cb`
 * when finished.
 *
 * @param {Array} files { name: <name>, path: <path> }
 * @param {String|Function} filename that will be shown in "save as" dialog
 * @param {Function} cb(err, bytesZipped) optional
 * @return {undefined}
 * @api public
 */

res.zip = function(files, filename, cb) {
  if (typeof filename === 'function') {
    cb = filename;
    filename = undefined;
  }

  if (typeof filename === 'undefined') {
    filename = "attachment.zip";
  }

  cb = cb || function() {};

  var asciiFilename = filterAsciiChars(filename);
  var disposition = 'attachment; filename="' + asciiFilename + '";';

  if (containsNonAsciiChars(filename)) {
    var encodedFilename = encodeURIComponent(filename);
    disposition += " filename*=UTF-8''" + encodedFilename
  }

  this.header('Content-Type', 'application/zip');
  this.header('Content-Disposition', disposition);

  var zip = zipstream(exports.options);
  zip.pipe(this); // res is a writable stream

  var addFile = function(file, cb) {
    zip.entry(fs.createReadStream(file.path), { name: file.name }, cb);
  };

  async.forEachSeries(files, addFile, function(err) {
    if (err) return cb(err);
    zip.finalize();
    cb(null, zip.getBytesWritten());
  });
};

function filterAsciiChars(input) {
  var result = '';
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
          result += input.charAt(i);
      }
  }
  return result;
}

function containsNonAsciiChars(input) {
  for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) > 127) {
          return true;
      }
  }
  return false;
}
