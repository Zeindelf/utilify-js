[![Build Status](https://travis-ci.org/Zeindelf/utilify-js.svg?branch=master)](https://travis-ci.org/Zeindelf/utilify-js)
[![npm version](https://badge.fury.io/js/utilify-js.svg)](https://badge.fury.io/js/utilify-js)
[![David](https://david-dm.org/zeindelf/utilify-js.svg)](https://github.com/Zeindelf/utilify-js)

# Utilify.js

Global and most common helpers for javascript

## Table of contents

- [Main](#main)
- [Getting started](#getting-started)
- [Methods](#methods)
- [Tests](#tests)
- [License](#license)
- [Dependencies](#dependencies)

## Main

```text
dist/
├── utilify.js        (UMD)
├── utilify.min.js    (UMD, compressed)
├── utilify.common.js (CommonJS, default)
└── utilify.esm.js    (ES Module)
```

## Getting started

### Direct download

Download the script [here](https://github.com/Zeindelf/utilify-js/blob/master/dist/utilify.min.js) and include it.

```html
<script type="text/javascript" src="utilify.min.js"></script>
```

### Package Managers

Utilify.js supports [npm](https://www.npmjs.com/package/utilify-js) under the name `utilify-js`.

```shell
npm install utilify-js --save
```

### Module Loaders

Utilify.js can also be loaded as an CommonJS or ES6 module (recomended).

```js
// CommomJS
var Utilify = require('utilify-js');

// ES6 module
import Utilify from 'utilify-js';
```

### Usage

With UMD (Universal Module Definition), the package is available on global var `UtilityJS`.

```js
// Initialize constructor
var utilify = new UtilifyJS();

// GlobalHelpers
var globalHelpers = utilify.globalHelpers;

// LocationHelpers
var locationHelpers = utilify.locationHelpers;
```

## Methods

* [Array Helpers](docs/array-helpers.md)
* [Global Helpers](docs/global-helpers.md)
* [Location Helpers](docs/location-helpers.md)
* [Number Helpers](docs/number-helpers.md)
* [Object Helpers](docs/object-helpers.md)
* [String Helpers](docs/string-helpers.md)
* [Validate Helpers](docs/validate-helpers.md)


## Tests

Tests are using mocha. To run the tests use:

```shell
$ npm test
```

## License

Utilify.js is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Dependencies

jQuery 1.8.3+ and GMaps API for `locationHelpers.getUserLocation()` method