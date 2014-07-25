module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-html2js');
    require('time-grunt')(grunt);

    var path = require('path');


    grunt.initConfig({


        //--------------------------------
        //     DEPLOY BUILD
        //--------------------------------

        jshint: {
            files: [
                'Gruntfile.js',
                'src/scripts/**/*.js'
            ],
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish-ex')
            }
        },
        clean: {
            dist: ['dist']
        },
        cssmin: {
            build: {
                files: {
                    'dist/gch-fx-watch-list.min.css': 'src/styles/gch-fx-watch-list.css'
                }
            }
        },
        uglify: {
            build: {
                files: {
                    'dist/gch-fx-watch-list.min.js': 'src/**/*.js'
                }
            }
        },


        //--------------------------------
        //     DEPLOY DEMO
        //--------------------------------

        copy: {
            dev: {
                files: [
                    // Copy - Directive
                    { expand: true, flatten: true, src: ['src/scripts/**'], dest: 'demo/client/src/app/directive/',filter: 'isFile'},
                    // Copy - Directive
                    { expand: true, flatten: true, src: ['src/styles/**'], dest: 'demo/client/src/styles/',filter: 'isFile'}
                ]
            }

        },


        //--------------------------------
        //     RUN DEV / DEMO
        //--------------------------------

        express: {
            custom: {
                options: {
                    port: 8080,
                    server: path.resolve('./demo/server/gserver.js')
                }
            },
            test: {
                options: {
                    port: 8080,
                    base: [
                        '.tmp',
                        'test'

                    ]
                }
            }
        },


        //--------------------------------
        //     TESTING CONFIGURATION
        //--------------------------------

        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },

        protractor: {
            options: {
                configFile: 'node_modules/protractor/referenceConf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            customTarget: {
                options: {
                    configFile: 'test/protractorConf.js', // Target-specific config file
                    args: {}
                }
            }
        }

    });

    //------------------------------------------------------
    //        TASKS
    //------------------------------------------------------

    /* Build process...
    */
    grunt.registerTask('build', [
        'jshint',
        'clean',
        'cssmin:build',
        'uglify:build'
    ]);

    /* Deploy to demo...
     */
    grunt.registerTask('deployDemo', ['copy']);

    /* Run demo / dev ...
     */
    grunt.registerTask('devServer', ['express','express-keepalive']);

    /* Testing
     */
    grunt.registerTask('test:unit', [

        'karma:unit'
    ]);

    grunt.registerTask('test:e2e', [
        'protractor'
    ]);

};