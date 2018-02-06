/**
 * The build process consists of following steps:
 * 1. clean /_build folder
 * 2. minify css files
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 * 
 */
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');

var jsConfig = {
	extends: 'eslint:recommended',
	rules: {
		'quotes': [1, 'single'],
		'curly': [1, 'multi-line'],
		'no-extra-parens': 1,
		'key-spacing': [1, {
			'beforeColon': false,
			'afterColon': true,
			'mode': 'strict'
		}],
		'no-multi-spaces': 1,
		'dot-location': [1, 'property'],
		'max-len': [1, { 'code': 80, 'tabWidth': 2 }],
		'no-trailing-spaces': 1,
		'indent': [1, 'tab'],
		'no-empty-function': 2,
		'eol-last': [2, 'always'],
		'semi': [2, 'always'],
		'no-multiple-empty-lines': 2
	}
};


// optimize images
gulp.task('images', function() {
	var s = $.size();

	return gulp.src('./images/**/*')
		.pipe($.changed('./_build/images'))
		.pipe($.imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('./_build/images'))
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return "Minified Image size " + s.prettySize;
		  }
		}));
});

// browser-sync task, only cares about compiled CSS
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

// minify JS
gulp.task('minify-js', function() {
	gulp.src('js/*.js')
		.pipe($.uglify())
		.pipe(gulp.dest('./_build/'));
});

// minify CSS
gulp.task('minify-css', function() {
	var s = $.size();

	gulp.src(['./styles/**/*.css', '!./styles/**/*.min.css'])
		//.pipe($.rename({suffix: '.min'})) // Not Necessary
		//.pipe($.minifyCss({keepBreaks:true})) // Not Necessary
		//.pipe(gulp.dest('./styles/')) // Not Necessary
		//.pipe(gulp.dest('./_build/css/')) // Not Necessary
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Source CSS size ' + s.prettySize;
		  }
		}));
});

// minify HTML
gulp.task('minify-html', function() {
	gulp.src('./*.html')
		.pipe($.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./_build/'));
});

// copy fonts from a module outside of our project (like Bower)
gulp.task('fonts', function() {
	gulp.src('./fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
		.pipe($.changed('./_build/fonts'))
		.pipe(gulp.dest('./_build/fonts'));
});

// start webserver from _build folder to check how it will look in production
gulp.task('server:build', function(done) {
	return browserSync({
		server: {
			baseDir: './_build/'
		}
	}, done);
});

// delete build folder
gulp.task('clean:build', function (cb) {
	del([
		'./_build/'
		// if we don't want to clean any file we can use negate pattern
		//'!dist/mobile/deploy.json'
	], cb);
});

// concat files
gulp.task('concat', function() {
	gulp.src('./js/*.js')
		.pipe($.concat('scripts.js'))
		.pipe(gulp.dest('./_build/'));
});


// ##############################################
// BUGFIX: warning: possible EventEmitter memory leak detected.
//									11 listeners added.
require('events').EventEmitter.prototype._maxListeners = 100;
// ##############################################

// index.html build
// script/css concatenation
gulp.task('usemin', function() {

	return gulp.src('./index.html')
		// add templates path
		.pipe($.htmlReplace({
			'templates': '<script type="text/javascript" src="js/templates.js"></script>'
		}))
		.pipe($.usemin({
			css: [$.cleanCss({compatibility: 'ie8'}), 'concat'],
			libs: [$.uglify()],
			nonangularlibs: [$.uglify()],
			angularlibs: [$.uglify()],
			appcomponents: [$.uglify()],
			mainapp: [$.uglify()]
		}))
		.pipe(gulp.dest('./_build/'));
});

// make templateCache from all HTML files
gulp.task('templates', function() {
	var s = $.size();

	return gulp.src([
			'./**/*.html',
			'!bower_components/**/*.*',
			'!node_modules/**/*.*',
			'!_build/**/*.*'
		])
		.pipe($.htmlmin({collapseWhitespace: true}))
		.pipe($.angularTemplatecache({
			module: 'boilerplate'
		}))
		.pipe(gulp.dest('_build/js'))
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return "Build Template size " + s.prettySize;
		  }
		}));
});

// reload all Browsers
gulp.task('bs-reload', function() {
	browserSync.reload();
});

// calculate html file's size
gulp.task('html:size', function() {
	var s = $.size();

	return gulp.src(['*.html', 'components/**/*.html', 'views/**/*.html'])
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Source HTML size ' + s.prettySize;
			}
		}));
});

// calculate js file's size
gulp.task('src:js:size', function() {
	var s = $.size();

	return gulp.src(['app/**/*.js', 'components/**/*.js', 'js/**/*.js'])
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Source JavaScript size ' + s.prettySize;
			}
		}));
});

// calculate build folder size
gulp.task('build:size', function() {
	var s = $.size();

	return gulp.src('./_build/**/*.*')
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Entire build size ' + s.prettySize;
			}
		}));
});

// calculate js file's size
gulp.task('js:size', function() {
	var s = $.size();

	return gulp.src('./_build/js/*.js')
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Build JavaScript size ' + s.prettySize;
			}
		}));
});

// calculate css file's size
gulp.task('css:size', function() {
	var s = $.size();

	return gulp.src('./_build/css/style.min.css')
		.pipe(s)
		.pipe($.notify({
			onLast: true,
			message: function() {
				return 'Build CSS size ' + s.prettySize;
			}
		}));
});

// lint javascript
gulp.task('js:lint', function() {
	// eslint-disable-next-line
	return gulp.src(['app/**/*.js', 'components/**/*.js', 'js/**/*.js', '!js/nonangular/*'])
		.pipe(eslint(jsConfig))
		.pipe(eslint.format());
});
// build lint javascript
gulp.task('js:lint-build', function() {
	// eslint-disable-next-line
	return gulp.src(['app/**/*.js', 'components/**/*.js', 'js/**/*.js', '!js/nonangular/*'])
		.pipe(eslint(jsConfig))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});


/////////////////////////////////////////////
/////////				GULP COMMANDS				/////////
/////////////////////////////////////////////

// start webserver from source
// without watch function
gulp.task('server', function(done) {
	return browserSync({
		server: {
			baseDir: './'
		}
	}, done);
});

// default task to be run with `gulp` command
// this default task will run BrowserSync & then use Gulp to watch files.
// when a file is changed, an event is emitted to BrowserSync with the filepath.
gulp.task('default', ['browser-sync', 'html:size', 'src:js:size', 'minify-css', 'js:lint'], function() {
	gulp.watch('styles/*.css', function(file) {
		if (file.type === "changed") {
			reload(file.path);
		}
	});
	gulp.watch(['*.html', 'components/**/*.html', 'views/**/*.html'], ['bs-reload', 'html:size']);
	gulp.watch(['app/**/*.js', 'components/**/*.js', 'js/**/*.js'], ['bs-reload', 'src:js:size', 'js:lint']);
	gulp.watch(['./styles/**/*.css'], ['bs-reload', 'minify-css']);
});

/**
 * build task:
 * 1. clean /_build folder
 * 2. minify css files
 * 3. copy and minimize images
 * 4. minify and copy all HTML files into $templateCache
 * 5. build index.html
 * 6. minify and copy all JS files
 * 7. copy fonts
 * 8. show build folder size
 * 
 */
gulp.task('build', function(callback) {
	runSequence(
		'js:lint-build',
		'clean:build',
		'images',
		'templates',
		'usemin',
		'js:size',
		'css:size',
		'fonts',
		'build:size',
		callback);
});

// Complete build task
// start webserver from _build folder to check how it will look in production
gulp.task('server-build', function(callback) {
	runSequence(
		'js:lint-build',
		'clean:build',
		'images',
		'templates',
		'usemin',
		'js:size',
		'css:size',
		'fonts',
		'build:size',
		'server:build',
		callback);
});
