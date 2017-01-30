// gulpfile.js
// Generated on Mon Jan 30 2017 20:33:04 GMT+06 (Bangladesh Standard Time)
'use strict';
//List of the required dependency required to run the project
var gulp = require('gulp');
require('require-dir')('./gulp');
//Default task for gulp i.e. use the 'gulp' command to run this task
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
