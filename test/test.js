/* global require, describe, it */
'use strict';

// MODULES //

var chai = require( 'chai' ),
	path = require( 'path' ),
	exportDir = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'export-dir-files', function tests() {

	it( 'should export a function', function test() {
		expect( exportDir ).to.be.a( 'function' );
	});

	it( 'should throw an error is not provided a primitive string', function test() {
		var values,
			i;

		values = [
			5,
			null,
			NaN,
			true,
			undefined,
			[],
			{},
			function(){}
		];

		for ( i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function badValue() {
				exportDir( value );
			};
		}
	});

	it( 'should throw an error if provided a non-existent directory', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			exportDir( '_non-existent---directory-beep/boop' );
		}
	});

	it( 'should return an object containing file exports', function test() {
		var props,
			keys,
			out,
			mod,
			i;

		props = [
			'bar',
			'foo',
			'beep'
		];

		out = exportDir( path.join( __dirname, 'fixtures' ) );

		assert.isObject( out );

		keys = Object.keys( out );
		assert.strictEqual( keys.length, props.length );

		for ( i = 0; i < props.length; i++ ) {
			mod = require( './fixtures/'+props[i] );
			assert.property( out, props[ i ] );
			assert.strictEqual( out[ props[i] ], mod );
		}
	});

	it( 'should accept relative directory paths', function test() {
		var out;
		out = exportDir( './test/fixtures' );
		assert.isObject( out );
		assert.ok( Object.keys( out ) );
	});

	it( 'should return an empty object if a directory does not contain any recognized file exports', function test() {
		var out;
		out = exportDir( './test/fixtures/no_exports' );
		assert.isObject( out );
		assert.strictEqual( Object.keys( out ).length, 0 );
	});

});
