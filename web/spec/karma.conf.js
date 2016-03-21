module.exports = function(config){
    config.set({
        //  root path location that will be used to resolve all relative paths in files and exclude sections, should be the root of your project
        basePath : '../',

        // files to include, ordered by dependencies
        files : [
            // include relevant Angular files and libs
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',

            // include js files
            'app/*.js',
            'app/**/*.js',

            // include unit test specs
            'spec/*.js'
        ],
        //// files to exclude
        //exclude : [
        //    'app/lib/angular/angular-loader.js'
        //    , 'app/lib/angular/*.min.js'
        //    , 'app/lib/angular/angular-scenario.js'
        //],

        // karma has its own autoWatch feature but Grunt watch can also do this
        autoWatch : false,

        // testing framework, be sure to install the karma plugin
        frameworks: ['jasmine'],

        // browsers to test against, be sure to install the correct karma browser launcher plugin
        browsers : ['Chrome', 'Firefox'],

        // progress is the default reporter
        reporters: ['progress'],

        // map of preprocessors that is used mostly for plugins
        preprocessors: {

        },

        // list of karma plugins
        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
        ]
    })};