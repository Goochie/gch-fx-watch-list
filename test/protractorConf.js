// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    capabilities: {
        'browserName': 'chrome'
    },

    specs: [
        'e2e/**/*.js',
        'e2e/*.js'
    ],

    jasmineNodeOpts: {
        showColors: true
    }
};