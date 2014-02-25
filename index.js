/*
 * Copyright 2014 Yahoo! Inc. All rights reserved.
 * Copyrights licensed under the BSD License.
 * See the accompanying LICENSE file for terms.
 */

/*jslint node: true, nomen: true, vars: true */
var LRU = require('lru-cache');
var Ycb = require('ycb').Ycb;
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

YcbLru.prototype.generateCacheKey = function (context) {
    var keys = [];
    var makeKeyList = function (k) {
        var key = '';
        key += k + ':' + context[k];
        keys.push(key);
    };

    Object.keys(context).forEach(makeKeyList);

    return keys.sort().join(':');
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
