'use strict';

var gulp = require('gulp');

gulp.task('watch', ['styles', 'fonts'] ,function () {
  gulp.watch('src/{app,components,styles}/**/*.scss', ['styles']);
  gulp.watch('src/{app,components}/**/*.js', ['scripts']);
  gulp.watch('src/assets/images/**/*', ['images']);
  gulp.watch('bower.json', ['wiredep']);
});
