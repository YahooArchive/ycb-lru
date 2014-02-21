/*jslint node: true, nomen: true, newcap: true, vars: true */
var test = require('tap').test;
var Ycb = require('../');

var dimensions = require('./dimensions');
var appConfig = require('./application');
var settings = dimensions.concat(appConfig);

test('read config', function (t) {
    var ycb = Ycb(settings);
    var config = ycb.read({});
    t.equal(8666, config.appPort);

    config = ycb.read({environment: 'prod'});
    t.equal(80, config.appPort);

    config = ycb.read({device: 'desktop'});
    t.equal(8080, config.appPort);

    config = ycb.read({environment: 'prod', device: 'smartphone'});
    t.equal(8888, config.appPort);

    // dupe test to trigger cache
    config = ycb.read({});
    t.equal(8666, config.appPort);

    ycb = null;
    t.end();
});

test('cache key', function (t) {
    var ycb = Ycb(settings);
    var key = ycb.generateCacheKey({});
    t.equal('', key);

    key = ycb.generateCacheKey({environment: 'prod', device: 'smartphone'});
    t.equal(key, 'environment:prod:device:smartphone:');
    t.end();
});
