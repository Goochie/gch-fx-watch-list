
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      '../demo/client/src/bower_components/angular/angular.js',
      '../demo/client/src/bower_components/angular-socket-io/socket.js',
      'lib/angular-mocks/angular-mocks.js',

      '../src/scripts/*.js',
      'unit/**/*.js'


    ],

    exclude: [],
    port: 8080,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: false
  });
};
