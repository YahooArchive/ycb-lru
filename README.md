ycb-lru
=======

[![Build Status](https://travis-ci.org/yahoo/ycb-lru.png?branch=master)](https://travis-ci.org/yahoo/ycb-lru)

This allows you to use `ycb` and automatically caches the results of reads that you have already done in an LRU cache.

## Install

`npm i ycb-lru`

## Example
```javascript
var Ycb = require('ycb-lru');
var appConfig = require('./config');
var dimensions = require('./dimensions');
var bundle = dimensions.concat(appConfig);

var ycb = Ycb(bundle);

var config = ycb.read({}); // config is master settings

config = ycb.read({environment: 'prod'}); // config is now set to prod
```

## Methods

* `read(context)`
