'use strict';

require('mocha');
var assert = require('assert');
var merge = require('./');

describe('merge value', function() {
  it('should merge a value:', function() {
    var obj = {};
    merge(obj, {a: 'b'});
    assert.deepEqual(obj, {a: 'b'});
  });

  it('should merge a nested value:', function() {
    var obj = {};
    merge(obj, 'foo', {a: 'b'});
    assert.deepEqual(obj.foo, {a: 'b'});
  });

  it('should work for key/value pairs:', function() {
    var obj = {};
    merge(obj, 'foo', 'b');
    assert.equal(obj.foo, 'b');
  });

  it('should merge an existing value:', function() {
    var obj = {foo: {a: 'b'}};
    merge(obj, 'foo', {c: 'd'});
    assert.deepEqual(obj.foo, {a: 'b', c: 'd'});
  });

  it('should deeply merge an existing value:', function() {
    var obj = {foo: {bar: {baz: {a: 'b'}}}};
    merge(obj, 'foo', {bar: {baz: {c: 'd'}}});
    assert.deepEqual(obj.foo.bar.baz, {a: 'b', c: 'd'});
  });

  it('should merge a deeply nested value:', function() {
    var obj = {};
    merge(obj, 'a.b.c', {one: 'two'});
    merge(obj, 'a.b.c', {three: 'four'});
    assert.deepEqual(obj.a.b.c, {one: 'two', three: 'four'});
  });

  it('should throw an error when invalid args are passed:', function() {
    assert.throws(function() {
      merge();
    });
  });
});
