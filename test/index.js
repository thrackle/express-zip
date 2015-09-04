var expressFactory = require('./express-factory');
var request = require('superagent');
var zip = require('../');
var should = require('should');

testExpressVersion(2)
testExpressVersion(3)
testExpressVersion(4)

function testExpressVersion(version) {
  describe('when using express ' + version + '.x', function() {
    var server

    before(function startServer() {
      var app = expressFactory.create(version)

      app.get('/test/1', function(req, res) {
        res.zip([
          { path: __dirname + '/zip_contents/data1.txt', name: 'data1.txt' },
          { path: __dirname + '/zip_contents/data2.txt', name: '/zip_contents/data2.txt' }
        ]);
      });

      app.get('/test/2', function(req, res) {
        res.zip([
          { path: __dirname + '/zip_contents/data1.txt', name: 'data1.txt' },
          { path: __dirname + '/zip_contents/data2.txt', name: '/zip_contents/data2.txt' }
        ], 'test2.zip');
      });

      server = app.listen(8383)
    })

    describe('res.zip()', function() {
      it('should response valid content-type', function(done) {
        request
          .get('http://127.0.0.1:8383/test/1')
          .end(function(err,res) {
            should.exist(res);
            res.headers['content-type'].should.match(/^application\/zip/);
            done();
          });
      });

      it('should response valid content-disposition', function(done) {
        request
          .get('http://127.0.0.1:8383/test/1')
          .end(function(err,res) {
            should.exist(res);
            res.headers['content-disposition'].should.match(/^attachment; filename="attachment.zip"/);
            done();
          });
      });

      it('can pass filename', function(done) {
        request
          .get('http://127.0.0.1:8383/test/2')
          .end(function(err,res) {
            should.exist(res);
            res.headers['content-disposition'].should.match(/^attachment; filename="test2.zip"/);
            done();
          });
      });
    });

    after(function closeServer() {
      server.close()
    })
  })
}
