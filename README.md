Export Directory
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependencies][dependencies-image]][dependencies-url]

> Require all files in a directory and export an object.


## Installation

``` bash
$ npm install export-dir-files
```


## Usage

``` javascript
var exportDir = require( 'export-dir-files' );
```

#### exportDir( dir )

Require all files in a directory and export an `object`.

``` javascript
var out = exportDir( 'path/to/directory' );
// returns {...}
```

The module will filter a directory's contents for [file modules](https://nodejs.org/api/modules.html#modules_file_modules) (i.e., files ending in `.js`, `.json`, or `.node`). For example, given the following directory structure

```
/
└── foo
    └── bar
        └── beep.js
        └── boop.json
        └── bap.node
        └── bop.txt
        └── bip
            └── hello.txt
            └── index.js
```

and 

``` bash
$ cd foo
```

the module will behave as follows:

``` javascript
var out = require( './bar' );
/*
	{
		'beep': <export>,
		'boop': <json>,
		'bap': <addon>
	}
*/
```


## Notes

*	Relative paths are resolved relative to the [current working directory](https://github.com/kgryte/utils-cwd).
*	If a directory does __not__ contain any recognized file exports, the module returns an empty `object`. For example, given

	```
	/
	└── foo
	    └── bar
	        └── bop.txt
	```

	the module will behave as follows:

	``` javascript
	var out = exportDir( '/foo/bar' );
	// returns {}
	```


## Examples

``` javascript
var exportDir = require( 'export-dir-files' );

var out = exportDir( '../test/fixtures' );
console.log( out );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/export-dir-files.svg
[npm-url]: https://npmjs.org/package/export-dir-files

[travis-image]: http://img.shields.io/travis/kgryte/export-dir-files/master.svg
[travis-url]: https://travis-ci.org/kgryte/export-dir-files

[codecov-image]: https://img.shields.io/codecov/c/github/kgryte/export-dir-files/master.svg
[codecov-url]: https://codecov.io/github/kgryte/export-dir-files?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/export-dir-files.svg
[dependencies-url]: https://david-dm.org/kgryte/export-dir-files

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/export-dir-files.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/export-dir-files

[github-issues-image]: http://img.shields.io/github/issues/kgryte/export-dir-files.svg
[github-issues-url]: https://github.com/kgryte/export-dir-files/issues
