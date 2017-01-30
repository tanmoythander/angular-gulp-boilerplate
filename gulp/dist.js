'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('dist', function (done) {
  runSequence(
    'clean',
    'build'
  );
});
