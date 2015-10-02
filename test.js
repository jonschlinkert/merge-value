'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var merge = require('./');

describe('merge value', function () {
  it('should merge a value:', function () {
    var obj = {};
    merge(obj, {a: 'b'})
    obj.should.eql({a: 'b'});
  });

  it('should merge a nested value:', function () {
    var obj = {};
    merge(obj, 'foo', {a: 'b'})
    obj.foo.should.eql({a: 'b'});
  });

  it('should work for key/value pairs:', function () {
    var obj = {};
    merge(obj, 'foo', 'b');
    obj.foo.should.equal('b');
  });

  it('should merge an existing value:', function () {
    var obj = {foo: {a: 'b'}};
    merge(obj, 'foo', {c: 'd'})
    obj.foo.should.eql({a: 'b', c: 'd'});
  });

  it('should deeply merge an existing value:', function () {
    var obj = {foo: {bar: {baz: {a: 'b'}}}};
    merge(obj, 'foo', {bar: {baz: {c: 'd'}}});
    obj.foo.bar.baz.should.eql({a: 'b', c: 'd'});
  });

  it('should merge a deeply nested value:', function () {
    var obj = {};
    merge(obj, 'a.b.c', {one: 'two'});
    merge(obj, 'a.b.c', {three: 'four'});
    obj.a.b.c.should.eql({one: 'two', three: 'four'});
  });

  it('should throw an error when invalid args are passed:', function () {
    (function () {
      merge();
    }).should.throw('expected the first argument to be an object.');
  });
});
