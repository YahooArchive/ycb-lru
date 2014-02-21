var test = require('tap').test;
var Ycb = require('../');

test('read config', function (t) {
    var dimensions = require('./dimensions');
    var appConfig = require('./application');
    var settings = dimensions.concat(appConfig);
    var ycb = Ycb(settings);

    var config = ycb.read({});
    t.equal(8666, config.appPort);

    config = ycb.read({environment: 'prod'});
    t.equal(80, config.appPort);

    config = ycb.read({device: 'desktop'});
    t.equal(8080, config.appPort);

    config = ycb.read({environment: 'prod', device: 'smartphone'});
    t.equal(8888, config.appPort);

    // this should run through the cache and can be confirmed through code coverage
    config = ycb.read({});
    t.equal(8666, config.appPort);

    t.end();
});
