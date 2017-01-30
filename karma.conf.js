// Karma configuration
// Generated on Mon Jan 30 2017 20:27:02 GMT+06 (Bangladesh Standard Time)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha', 'chai'],

        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/jquery-migrate/index.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-translate/angular-translate.min.js',
            'bower_components/ng-lodash/build/ng-lodash.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'bower_components/moment/min/moment-with-locales.min.js',
            'bower_components/angularUtils-pagination/dirPagination.js',
            'bower_components/fullcalendar/dist/fullcalendar.min.js',
            'bower_components/ngMask/dist/ngMask.min.js',
            'bower_components/angular-chart.js/dist/angular-chart.min.js',
            'bower_components/chart.js/dist/Chart.min.js',
            'src/app/**/*.js',
            'spec/**/*.spec.js'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/app/**/*.js': ['coverage']
        },

        // optionally, configure the reporter
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha', 'coverage'],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN ||
        // config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS2'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // // reporter options
        mochaReporter: {
            colors: {
                success: 'green',
                info: 'yellow',
                warning: 'cyan',
                error: 'red'
            }
        },

        plugins: [
            'karma-phantomjs2-launcher',
            'karma-chai',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-coverage'
        ],

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    });
};