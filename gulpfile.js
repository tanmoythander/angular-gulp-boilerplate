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
var browserSync = require('browser-sync').create();
var del = require('del');
var size = require('gulp-size');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var htmlmin = require('gulp-htmlmin');
var angularTemplateCache = require('gulp-angular-templatecache');
var htmlReplace = require('gulp-html-replace');
var usemin = require('gulp-usemin');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');


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

// lint JS
function lint() {
	return gulp.src(['app/**/*.js',
		'components/**/*.js', 'js/**/*.js',
		'!js/nonangular/*'])
		.pipe(eslint(jsConfig))
		.pipe(eslint.format());
}
function lintBuild() {
	return gulp.src(['app/**/*.js',
		'components/**/*.js', 'js/**/*.js',
		'!js/nonangular/*'])
		.pipe(eslint(jsConfig))
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
}

// clean
function cleanBuild(done) {
	del([
		'./_build/'
	]);
	done();
}

// fonts
function fonts() {
	var fonts = size();
	return gulp.src('./fonts/**/*.{ttf,woff,woff2,eof,eot,svg}')
		.pipe(changed('./_build/fonts'))
		.pipe(gulp.dest('./_build/fonts'))
		.pipe(fonts)
		.pipe(notify({
			onLast: true,
			message: function() {
				return "Total Font size " + fonts.prettySize;
			}
		}));
}

// images
function images() {
	var images = size();
	return gulp.src('./images/**/*')
		.pipe(changed('./_build/images'))
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imagemin.optipng({optimizationLevel: 5}),
			imagemin.svgo({
				plugins: [
					{removeViewBox: true},
					{cleanupIDs: false}
				]
			})
    ]))
		.pipe(gulp.dest('./_build/images'))
		.pipe(images)
		.pipe(notify({
			onLast: true,
			message: function() {
				return "Minified Image size " + images.prettySize;
			}
		}));
}

// template cache
function cacheTemplate() {
	var template = size();
	return gulp.src([
			'./**/*.html',
			'!bower_components/**/*.*',
			'!node_modules/**/*.*',
			'!_build/**/*.*'
		])
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(angularTemplateCache({
			module: 'boilerplate'
		}))
		.pipe(gulp.dest('_build/js'))
		.pipe(template)
		.pipe(notify({
			onLast: true,
			message: function() {
				return "Build Template size " + template.prettySize;
			}
		}));
}

// minify CSS and JS
function minCssJs() {
	return gulp.src('./index.html')
		// add templates path
		.pipe(htmlReplace({
			'templates': '<script src="js/templates.js"></script>'
		}))
		.pipe(usemin({
			css: [cleanCss({compatibility: 'ie8'}), 'concat'],
			libs: [uglify()],
			nonangularlibs: [uglify()],
			angularlibs: [uglify()],
			appcomponents: [uglify()],
			mainapp: [uglify()]
		}))
		.pipe(gulp.dest('./_build/'));
}

// File sizes
function sourceTemplateSize() {
	var sourceTemplate = size();
	return gulp.src(['*.html',
		'components/**/*.html', 'views/**/*.html'])
		.pipe(sourceTemplate)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Source Template size ' + sourceTemplate.prettySize;
			}
		}));
}
function sourceJsSize() {
	var sourceJs = size();
	return gulp.src(['app/**/*.js',
		'components/**/*.js', 'js/**/*.js'])
		.pipe(sourceJs)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Source JS size ' + sourceJs.prettySize;
			}
		}));
}
function sourceCssSize() {
	var sourceCss = size();
	return gulp.src('./styles/**/*.css')
		.pipe(sourceCss)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Source CSS size ' + sourceCss.prettySize;
			}
		}));
}
function buildCssSize() {
	var buildCss = size();
	return gulp.src('./_build/css/style.min.css')
		.pipe(buildCss)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Build CSS size ' + buildCss.prettySize;
			}
		}));
}
function buildJsSize() {
	var buildJs = size();
	return gulp.src('./_build/js/*.js')
		.pipe(buildJs)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Build JS size ' + buildJs.prettySize;
			}
		}));
}
function buildSize() {
	var build = size();
	return gulp.src('./_build/**/*.*')
		.pipe(build)
		.pipe(notify({
			onLast: true,
			message: function() {
				return 'Entire build size ' + build.prettySize;
			}
		}));
}

// sync to browser
// no return needed
function syncSource(done) {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	});
	done();
}
function syncBuild(done) {
	browserSync.init({
		server: {
			baseDir: "./_build/"
		},
		port: 3000
	});
	done();
}
function syncReload(done) {
	browserSync.reload();
	done();
}

// watch
// no return
// no callback
function watch() {
	gulp.watch(['*.html', 'components/**/*.html', 'views/**/*.html'],
		gulp.parallel(syncReload, sourceTemplateSize));
	gulp.watch(['app/**/*.js', 'components/**/*.js', 'js/**/*.js'],
		gulp.parallel(syncReload, sourceJsSize, lint));
	gulp.watch('./styles/**/*.css', 
		gulp.parallel(syncReload, sourceCssSize));
}

// define output tasks
exports.default = gulp.parallel(watch, syncSource);
exports.serveSource = syncSource;
exports.build = gulp.series(lintBuild, cleanBuild,
	images, fonts, cacheTemplate, minCssJs,
	gulp.parallel(buildCssSize, buildJsSize, buildSize));
exports.serveBuild = gulp.series(lintBuild, cleanBuild,
	images, fonts, cacheTemplate, minCssJs,
	gulp.parallel(buildCssSize, buildJsSize, buildSize, syncBuild));
