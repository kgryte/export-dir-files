'use strict';

// MODULES //

var fs = require( 'fs' ),
	path = require( 'path' ),
	isString = require( 'validate.io-string-primitive' ),
	cwd = require( 'utils-cwd' ),
	extname = require( 'utils-extname' );


// EXPORT DIRECTORY FILES //

/**
* FUNCTION: exportDir( dir )
*	Require all files in a directory and export an object.
*
* @returns {Object} object containing all file exports
*/
function exportDir( dir ) {
	var dpath,
		fpath,
		stat,
		key,
		out,
		len,
		ext,
		f,
		i, j;

	if ( !isString( dir ) ) {
		throw new TypeError( 'invalid input argument. Directory containing files to export must be a primitive string. Value: `' + dir + '`.' );
	}
	dpath = path.resolve( cwd(), dir );
	f = fs.readdirSync( dpath );

	len = f.length;
	out = {};
	for ( i = 0; i < len; i++ ) {
		fpath = path.join( dpath, f[ i ] );
		stat = fs.statSync( fpath );
		if ( stat.isDirectory() ) {
			continue;
		}
		ext = extname( f[ i ] );
		if ( ext === '.js' ) {
			j = f[ i ].length - 3;
		}
		else if (
			ext === '.json' ||
			ext === '.node'
		) {
			j = f[ i ].length - 5;
		}
		else {
			continue;
		}
		key = f[ i ].substring( 0, j );
		out[ key ] = require( fpath );
	}
	return out;
} // end FUNCTION exportDir()


// EXPORTS //

module.exports = exportDir;
