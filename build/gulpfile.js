var gulp = require('gulp');

var extension = require('./package.json');
var config    = require('./gulp-config.json');

var requireDir = require('require-dir');
var zip        = require('gulp-zip');
var fs         = require('fs');
var xml2js     = require('xml2js');
var parser     = new xml2js.Parser();

var jgulp = requireDir('./node_modules/joomla-gulp', {recurse: true});
var dir = requireDir('./joomla-gulp-extensions', {recurse: true});

var rootPath = '../extensions';

// Override of the release script
gulp.task('release', ['composer:libraries.webete'], function (cb) {
	fs.readFile( '../extensions/pkg_webete.xml', function(err, data) {
		parser.parseString(data, function (err, result) {
			console.log(err);
			var version = result.extension.version[0];

			var fileName = extension.name + '-v' + version + '.zip';

			return gulp.src([
					rootPath + '/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/test',
					'!' + rootPath + '/libraries/webete/vendor/**/test/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/Test',
					'!' + rootPath + '/libraries/webete/vendor/**/Test/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/tests',
					'!' + rootPath + '/libraries/webete/vendor/**/tests/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/Tests',
					'!' + rootPath + '/libraries/webete/vendor/**/Tests/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/docs/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/docs',
					'!' + rootPath + '/libraries/webete/vendor/**/doc/**/*',
					'!' + rootPath + '/libraries/webete/vendor/**/doc',
					'!' + rootPath + '/libraries/webete/vendor/**/composer.*',
					'!' + rootPath + '/libraries/webete/vendor/**/build.php',
					'!' + rootPath + '/libraries/webete/vendor/**/phpunit.*',
				],{ base: rootPath })
				.pipe(zip(fileName))
				.pipe(gulp.dest('releases'))
				.on('end', cb);
		});
	});
});
