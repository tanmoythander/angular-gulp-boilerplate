'use strict';

var pkg = require('../package.json');

var config = {
  copyToDist: ['src/**/*.ico', 'src/*.txt'],
  moduleI18n: ['src/app/**/*.json'],
  dist: 'dist',
  fonts: ['src/assets/fonts/**/*'],
  fontTypes: ['eot', 'svg', 'ttf', 'woff', 'woff2'],
  pluginFont: ['src/lib/**/*'],
  html: ['src/*.html'],
  images: ['src/assets/images/**/*'],
  i18n: ['src/i18n/**/*'],
  partials: ['src/{app,components}/**/*.html', '!src/*.html'],
  scripts: ['src/{app,components, lib, scripts}/**/*.js'],
  bowerComp: ['bower_components/**/*'],
  bowerCss: ['bower_components/**/*.css'],
  styles: ['src/{app,components,lib,styles}/**/*.css'],
  tmp: '.tmp',
  version: pkg.version
};

module.exports = config;
