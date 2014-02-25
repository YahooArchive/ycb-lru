/*
 * Copyright 2014 Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint node: true, nomen: true, newcap: true, vars: true */
var test = require('tap').test;
var Ycb = require('../');

var dimensions = require('./dimensions');
var appConfig = require('./application');
var settings = dimensions.concat(appConfig);

test('read config', function (t) {
    var ycb = Ycb(settings);
    var config = ycb.read({});
    t.equal(config.appPort, 8666);

    config = ycb.read({environment: 'prod'});
    t.equal(config.appPort, 80);

    config = ycb.read({device: 'desktop'});
    t.equal(config.appPort, 8080);

    config = ycb.read({environment: 'prod', device: 'smartphone'});
    t.equal(config.appPort, 8888);

    // dupe test to trigger cache
    config = ycb.read({});
    t.equal(config.appPort, 8666);

    ycb = null;
    t.end();
});

test('cache key', function (t) {
    var ycb = Ycb(settings);
    var key = ycb.generateCacheKey({});
    t.equal('', key);

    key = ycb.generateCacheKey({environment: 'prod', device: 'smartphone'});
    t.equal(key, 'device:smartphone:environment:prod');
    t.end();
});
