/*jslint node: true, nomen: true, vars: true */
var LRU = require('lru-cache');
var Ycb = require('ycb').Ycb;
var LRU = require('lru-cache');
var options = {
    max: 200
};

function YcbLru(config) {
    if (!(this instanceof YcbLru)) {
        return new YcbLru(config);
    }

    this.cache = LRU(options);
    this.ycb = new Ycb(config, {});
}

// TODO: forEaching through objects  probably isn't guarenteed order
// possibly push to array and sort key/value pairs before joining them
YcbLru.prototype.generateCacheKey = function (context) {
    var key = '';
    var setKey = function (k) {
        key += k + ':' + context[k] + ':';
    };

    Object.keys(context).forEach(setKey);
    return key;
};

YcbLru.prototype.read = function (context) {
    var cache = this.cache;
    var key = this.generateCacheKey(context);
    var config;

    if (cache.has(key)) {
        config = cache.get(key);
    } else {
        config = this.ycb.read(context);
        cache.set(key, config);
    }
    return config;
};

module.exports = YcbLru;
