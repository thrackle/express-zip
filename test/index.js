var expressFactory = require('./express-factory');
var request = require('superagent');
var zip = require('../');
var expect = require('chai').expect;

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

      app.get('/test/3', function(req, res) {
        res.zip([
          { content: 'text content', name: 'data1.txt' },
          { content: 'more text', name: 'data2.txt' }
        ], 'test3.zip');
      });

      server = app.listen(8383)
    })

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

    after(function closeServer() {
      server.close()
    })
  })
}
