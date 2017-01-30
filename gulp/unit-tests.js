'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');

gulp.task('test', function() {
  var bowerDeps = wiredep({
    directory: 'bower_components',
    exclude: [],
    dependencies: true,
    devDependencies: true
  });

  var testFiles = bowerDeps.js.concat([
    // Reorder boot.js and .spec.js files
    '!src/app/boot.js',
    // '!src/{app,components}/**/*.spec.js',
    'src/{app,components}/**/*!(.spec).js',
    'src/app/boot.js',
    // 'test/unit/**/*.js',
    'src/{app,components}/**/*.spec.js'
  ]);

  return gulp.src(testFiles)
    .pipe($.karma({
      configFile: 'test/karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});
