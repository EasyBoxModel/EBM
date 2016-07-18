/*!
 * EBM Gruntfile
 * http://soygus.com
 * @author MadeByGus (GIT: netpoe)
 */

'use strict';

/**
 * Livereload and connect variables
 */
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
  port: LIVERELOAD_PORT
});
var mountFolder = function (connect, dir) {
  return connect.static(require('path').resolve(dir));
};

/**
  * JS Files array for uglify and Babel
  */
var jsFiles = 

/**
 * Grunt module
 */
module.exports = function (grunt) {

  // Dynamically load npm tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // EBM Grunt config
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    project: {
      src: 'src',
      app: 'app',
      assets: '<%= project.app %>/assets',
      css: [ '<%= project.src %>/scss/style.scss' ],
      ebm: [ '<%= project.src %>/scss/ebm.scss' ],
      js: [ '<%= project.src %>/js_src/*.js' ],
      coffee: [ '<%= project.src %>/coffee/*.coffee' ]
    },
    jsFiles: [
      '<%= project.src %>/js_src/trigger-alerts-control.js',
      '<%= project.src %>/js_src/trigger-detail-row-control.js',
      '<%= project.src %>/js_src/transition.js',
      '<%= project.src %>/js_src/collapse.js',
      '<%= project.src %>/js_src/modal.js',
      '<%= project.src %>/js_src/tab.js',
      '<%= project.src %>/js_src/tabs-control.js',
      '<%= project.src %>/js_src/moment.js',
      '<%= project.src %>/js_src/moment-es.js',
      '<%= project.src %>/js_src/bootstrap-datetimepicker.js',
      '<%= project.src %>/js_src/datetimepicker-control.js',
      '<%= project.src %>/js_src/coffee-compile.js',
    ],

    /**
     * Project banner
     * Dynamically appended to CSS/JS files
     * Inherits text from package.json
     */
    tag: {
      banner: '/*!\n' +
              ' * <%= pkg.name %>\n' +
              ' * <%= pkg.title %>\n' +
              ' * <%= pkg.url %>\n' +
              ' * @author <%= pkg.author %>\n' +
              ' * @version <%= pkg.version %>\n' +
              ' * Copyright <%= pkg.copyright %>. <%= pkg.license %> licensed.\n' +
              ' */\n'
    },

    /**
     * Connect port/livereload
     * https://github.com/gruntjs/grunt-contrib-connect
     * Starts a local webserver and injects
     * livereload snippet
     */
    connect: {
      options: {
        port: 9000,
        hostname: '*',
      },
      livereload: {
        options: {
          middleware: function (connect) {
            return [lrSnippet, mountFolder(connect, 'app')];
          }
        }
      }
    },

    /**
     * Clean files and folders
     * https://github.com/gruntjs/grunt-contrib-clean
     * Remove generated files for clean deploy
     */
    clean: {
      dist: [
        '<%= project.assets %>/css/style.pkgd.min.css'
      ]
    },

    /**
     * Compile COFFEESCRIPT files
     * https://github.com/gruntjs/grunt-contrib-coffee
     * Compiles all COFFEESCRIPT files
     */
    coffee: {
      dev: {
        files: {
          '<%= project.src %>/js_src/coffee-compile.js': '<%= project.coffee %>'
        }
      }
    },

    /**
     * Uglify (minify) JavaScript files
     * https://github.com/gruntjs/grunt-contrib-uglify
     * Compresses and minifies all JavaScript files into one
     */
    uglify: {
      options: {
        banner: '<%= tag.banner %>',
        beautify: true
      },
      dist: {
        files: {
          '<%= project.assets %>/js/scripts.min.js': ['<%= project.src %>/js_ES2015/babel.js',]
        }
      }
    },

    /**
     * Compile Sass/SCSS files
     * https://github.com/gruntjs/grunt-contrib-sass
     * Compiles all Sass/SCSS files and appends project banner
     */
    sass: {
      ebm: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.assets %>/css/ebm.css': '<%= project.ebm %>'
        }
      },
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          '<%= project.assets %>/css/style.css': '<%= project.css %>'
        }
      },
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          '<%= project.assets %>/css/style.min.css': '<%= project.src %>/scss/style.min.scss'
        }
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>/src'
      }
    },

    /**
      * Generate static HTML includes
      * https://github.com/alanshaw/grunt-include-replace
      */
    includereplace: {
      dev: {
        options: {
          includesDir: '<%= project.src %>/includes/'
        },
        files: [{src: '<%= project.src %>/*.html', dest: '<%= project.app %>/', expand: true, cwd: './'}],
      }
    },

    /**
      * Concat files so babel can parse them
      */
    concat: {
      options: {
        sourceMap: true
      },
      js: {
        src: '<%= jsFiles %>',
        dest: '<%= project.src %>/js_dest/js-to-babel.js'
      }
    },

    /**
      * Babel
      */
    babel: {
      options: {
        sourceMap: true,
        presets: ['es2015'],
        compact: false,
      },
      dist: {
        src: '<%= project.src %>/js_dest/js-to-babel.js',
        dest: '<%= project.src %>/js_ES2015/babel.js',
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Livereload the browser once complete
     */
    watch: {
      babel: {
        files: '<%= project.src %>/js_dest/*.js',
        tasks: 'babel'
      },
      uglify: {
        files: '<%= project.src %>/js_ES2015/*.js',
        tasks: 'uglify'
      },
      concat: {
        files: '<%= project.src %>/js_src/*.js',
        tasks: 'concat'
      },
      style: {
        files: [
          '<%= project.src %>/scss/style.scss',
          '<%= project.src %>/scss/b3/_variables.scss',
          '<%= project.src %>/scss/EBM/_ebm-global.scss'],
        tasks: 'sass:dev'
      },
      ebm: {
        files: [
          '<%= project.src %>/scss/ebm.scss',
          '<%= project.src %>/scss/{,*/}*/{,*/}*.{scss,sass}', 
          '!<%= project.src %>/scss/style.scss',
          '!<%= project.src %>/scss/EBM/_ebm-global.scss'],
        tasks: 'sass:ebm'
      },
      coffee: {
        files: '<%= project.src %>/coffee/*.coffee',
        tasks: 'coffee:dev'
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '<%= project.assets %>/css/*.css',
          '<%= project.assets %>/js/{,*/}*.js',
          '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= project.src %>/*.html',
          '<%= project.src %>/includes/*.html',
        ]
      },
      includereplace: {
        files: [
          '<%= project.src %>/*.html',
          '<%= project.src %>/includes/*.html',
        ],
        tasks: 'includereplace:dev'
      },
    }
  });

  // Default task
  grunt.registerTask('default', [
    'sass:ebm',
    'sass:dev',
    'connect:livereload',
    'babel',
    'uglify',
    'open',
    'watch'
  ]);

  // Watch only task
  grunt.registerTask('watch-only', [
    'connect:livereload',
    'open',
    'watch'
  ]);

  // Build task
  grunt.registerTask('build', [
    'sass:dist',
    'clean:dist',
    'uglify'
  ]);
};