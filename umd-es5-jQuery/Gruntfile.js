module.exports = function ( grunt ) {
    'use strict';

    function readOptionalJSON ( filepath ) {
        var stripJSONComments = require( 'strip-json-comments' ),
            data = {};
        try {
            data = JSON.parse( stripJSONComments(
                fs.readFileSync( filepath, { encoding: 'utf8' } )
            ) );
        } catch ( e ) {}
        return data;
    }

    var fs = require( 'fs' );

    if ( !grunt.option( 'filename' ) ) {
        grunt.option( 'filename', 'zp.js' );
    }

    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        dst: readOptionalJSON( 'dist/.destination.json' ),
        babel: {
            options: {
                sourceMap: 'inline',
                retainLines: true,
                plugins: [ 'transform-es2015-for-of' ]
            },
            nodeSmokeTests: {
                files: {
                    'test/node_smoke_tests/lib/ensure_iterability.js':
                        'test/node_smoke_tests/lib/ensure_iterability_es6.js'
                }
            }
        },
        build: {
            all: {
                dest: 'dist/zp.js'

                // minimum: [
                // 	'core',
                // 	'selector'
                // ]

                // Exclude specified modules if the module matching the key is removed
                // removeWith: {

                // 	ajax: [ 'manipulation/_evalUrl', 'event/ajax' ],
                // 	callbacks: [ 'deferred' ],
                // 	css: [ 'effects', 'dimensions', 'offset' ],
                // 	'css/showHide': [ 'effects' ],
                // 	deferred: {
                // 		remove: [ 'ajax', 'effects', 'queue', 'core/ready' ],
                // 		include: [ 'core/ready-no-deferred' ]
                // 	},
                //     sizzle: [ 'css/hiddenVisibleSelectors', 'effects/animatedSelector' ]
                // }
            }
        },
        jsonlint: {
            pkg: {
                src: [ 'package.json' ]
            }
        },
        eslint: {
            options: {

                // See https://github.com/sindresorhus/grunt-eslint/issues/119
                quiet: true
            },

            // We have to explicitly declare 'src' property otherwise 'newer'
            // task wouldn't work properly :/
            dist: {
                src: 'dist/zp.js'
            },
            dev: {
                src: [ 'src/**/*.js', 'Gruntfile.js', 'test/**/*.js', 'build/**/*.js' ]
            }
        },
        watch: {
            files: [ '<%= eslint.dev.src %>' ],
            tasks: [ 'dev' ]
        },
        uglify: {
            all: {
                files: {
                    'dist/<%= grunt.option("filename").replace(".js", ".min.js") %>':
                        'dist/<%= grunt.option("filename") %>'
                },
                options: {
                    preserveComments: false,
                    sourceMap: true,
                    sourceMapName:
                        'dist/<%= grunt.option("filename").replace(".js", ".min.map") %>',
                    report: 'min',
                    output: {
                        'ascii_only': true,

                        // Support: Android 4.0 only
                        // UglifyJS 3 breaks Android 4.0 if this option is not enabled.
                        // This is in lieu of setting ie8 for all of mangle, compress, and output
                        'ie8': true
                    },

                    // banner: '/*! zp v<%= pkg.version %> | ',
                    compress: {
                        'hoist_funs': false,
                        loops: false,

                        // Support: IE <11
                        // typeofs transformation is unsafe for IE9-10
                        // See https://github.com/mishoo/UglifyJS2/issues/2198
                        typeofs: false
                    }
                }
            }
        }
    } );

    // Load grunt tasks from NPM packages
    require( 'load-grunt-tasks' )( grunt );

    // Integrate jQuery specific tasks
    grunt.loadTasks( 'build/tasks' );

    grunt.registerTask( 'lint', [
        'jsonlint',

        // Running the full eslint task without breaking it down to targets
        // would run the dist target first which would point to errors in the built
        // file, making it harder to fix them. We want to check the built file only
        // if we already know the source files pass the linter.
        'eslint:dev',
        'eslint:dist'
    ] );

    grunt.registerTask( 'dev', [
        'build:*:*',
        'remove_map_comment',
        'dist:*',
        'qunit_fixture',
        'compare_size'
    ] );

    grunt.registerTask( 'default', [
        'eslint:dev',
        'build:*:*',
        'uglify',
        'remove_map_comment',
        'dist:*',
        'eslint:dist'
    ] );
};
