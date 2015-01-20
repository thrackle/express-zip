var express = require("express")
  , request = require("superagent")
  , zip = require("../")
  , app = express()
  , expect = require("chai").expect;

app.get("/test/1", function(req, res) {
  res.zip([
    { path: __dirname + "/zip_contents/data1.txt", name: "data1.txt" },
    { path: __dirname + "/zip_contents/data2.txt", name: "/zip_contents/data2.txt" }
  ]);
});

app.get("/test/2", function(req, res) {
  res.zip([
    { path: __dirname + "/zip_contents/data1.txt", name: "data1.txt" },
    { path: __dirname + "/zip_contents/data2.txt", name: "/zip_contents/data2.txt" }
  ], "test2.zip");
});

app.listen(8383);

describe('express-zip', function() {
  it('should expose .options', function() {
    expect(zip.options).to.not.equal(undefined);
  });

  it('should extend res.zip', function() {
    expect(require('express').response.zip).to.be.a('function');
  });
});

describe('res.zip()', function() {
  it('should response valid content-type', function(done) {
    request
      .get('http://127.0.0.1:8383/test/1')
      .end(function(res) {
        expect(res.headers['content-type']).to.match(/^application\/zip/);
        done();
      });
  });

  it('should response valid content-disposition', function(done) {
    request
      .get('http://127.0.0.1:8383/test/1')
      .end(function(res) {
        expect(res.headers['content-disposition']).to.match(/^attachment; filename="attachment.zip"/);
        done();
      });
  });

  it('can pass filename', function(done) {
    request
      .get('http://127.0.0.1:8383/test/2')
      .end(function(res) {
        expect(res.headers['content-disposition']).to.match(/^attachment; filename="test2.zip"/);
        done();
      });
  });
});
