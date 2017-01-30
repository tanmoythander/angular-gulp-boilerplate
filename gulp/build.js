'use strict';

var gulp = require('gulp');
var path = require('path');
var config = require('./config');
var eslint = require('gulp-eslint');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', 'merge-stream']
});

function handleError(err) {
  console.error(err.toString());
  this.emit('end');
}

gulp.task('styles', ['wiredep'],  function () {
  return gulp.src(config.styles)
    .on('error', handleError)
    .pipe(gulp.dest(config.dist))
    .pipe($.size());
});

gulp.task('bowerComp', ['bower-font'], function () {
  return gulp.src(config.bowerCss)
    .pipe($.plumber({handleError: handleError}))
    .pipe(gulp.dest('dist/bower_components'))
    .pipe($.size());
});

gulp.task('bower-font', function () {
  return gulp.src(config.bowerComp)
    .pipe($.plumber({handleError: handleError}))
    .pipe($.filter('**/*.{' + config.fontTypes.join(',') + '}'))
    // .pipe($.flatten())
    .pipe(gulp.dest('dist/bower_components'))
    .pipe($.size());
});

gulp.task('scripts', function () {
  return gulp.src(config.scripts)
    .pipe($.plumber({handleError: handleError}))
    .pipe(eslint())
    .pipe(eslint.format())
    // .pipe($.jshint('.jshintrc'))
    // .pipe($.jshint.reporter('jshint-stylish'))
    // .pipe($.jscs({configPath: '.jscsrc'}))
    // .pipe(gulp.dest(config.dist))
    .pipe($.size());
});

gulp.task('partials', function () {
  return gulp.src(config.partials)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe($.angularTemplatecache({ module: 'unify' }))
    .pipe(gulp.dest(path.join(config.dist, 'scripts')))
    .pipe($.size());
});

gulp.task('html', ['styles', 'partials', 'scripts'], function () {
  var htmlFilter = $.filter('**/*.html');
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');
  var assets;

  return gulp.src(config.html)
    .pipe($.plumber({handleError: handleError}))
    .pipe(assets = $.useref.assets())
    .pipe($.rev())
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify({preserveComments: $.uglifySaveLicense}))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.revReplace())
    .pipe($.inlineSource())
    .pipe(htmlFilter)
    .pipe($.minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(gulp.dest(config.dist))
    .pipe($.size());
});

gulp.task('images', function () {
  return gulp.src(config.images)
    .pipe($.plumber({handleError: handleError}))
    .pipe(gulp.dest(path.join(config.dist, 'assets', 'images')))
    .pipe($.size());
});

gulp.task('module-i18n', function () {
  return gulp.src(config.moduleI18n)
    .pipe($.plumber({handleError: handleError}))
    .pipe(gulp.dest(path.join(config.dist, 'app')))
    .pipe($.size());
});

gulp.task('fonts', function () {
  return gulp.src(config.fonts)
    .pipe($.plumber({handleError: handleError}))
    .pipe(gulp.dest(path.join(config.dist, 'fonts')))
    .pipe($.size());
});

gulp.task('plugin-font', function () {
  return gulp.src(config.pluginFont)
    .pipe($.plumber({handleError: handleError}))
    .pipe($.filter('**/*.{' + config.fontTypes.join(',') + '}'))
    // .pipe($.flatten())
    .pipe(gulp.dest(path.join(config.dist, 'lib')))
    .pipe($.size());
});

gulp.task('i18n', function() {
  return gulp.src(config.i18n)
    .pipe(gulp.dest(path.join(config.dist, 'i18n')))
    .pipe($.size());
});

gulp.task('misc', function () {
  return gulp.src(config.copyToDist)
    .pipe(gulp.dest(config.dist))
    .pipe($.size());
});

gulp.task('clean', function (done) {
  $.del([config.tmp, config.dist, 'war'], done);
});

gulp.task('build', ['html', 'images', 'fonts', 'plugin-font', 'i18n', 'module-i18n', 'misc', 'bowerComp']);

// gulp.task('build', ['bowerComp']);
