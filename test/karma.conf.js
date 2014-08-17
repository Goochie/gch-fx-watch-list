
module.exports = function(config) {
  config.set({
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'lib/jquery/dist/jquery.min.js',
      '../demo/client/src/bower_components/angular/angular.js',
      'lib/angular-mocks/angular-mocks.js',
      'lib/angular-socket.io-mock/angular-socket.io-mock.js',
      '../src/scripts/*.js',
      'unit/**/*.js'
    ],

    exclude: [],
    port: 8090,
    logLevel: config.LOG_INFO,
    browsers: ['Chrome'],
    autoWatch: true,
    singleRun: false
  });
};
