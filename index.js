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

YcbLru.prototype.read = function (context) {
    var cache = this.cache;
    var key = '';
    var config;

    var generateCacheKey = function (k) {
        key += k + ':' + context[k];
    };

    Object.keys(context).forEach(generateCacheKey);

    if (cache.has(key)) {
        config = cache.get(key);
    } else {
        config = this.ycb.read(context);
        cache.set(key, config);
    }
    return config;
};

module.exports = YcbLru;
