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
      js: [ '<%= project.src %>/js/*.js' ],
      coffee: [ '<%= project.src %>/coffee/*.coffee' ]
    },

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
        hostname: '*'
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
          '<%= project.src %>/js/coffeeCompile.js': '<%= project.coffee %>'
        }
      }
    },

    /**
     * JSHint
     * https://github.com/gruntjs/grunt-contrib-jshint
     * Manage the options inside .jshintrc file
     */
    jshint: {
      files: [
        'src/js/{,*/}*/{,*/}*.js',
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc'
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
          '<%= project.assets %>/js/scripts.min.js': [
            // '<%= project.src %>/js/TweenMax.min.js',
            // '<%= project.src %>/js/ScrollToPlugin.js',
            // '<%= project.src %>/js/ScrollMagic.js',
            // '<%= project.src %>/js/jquery.scrollmagic.debug.js',
            // '<%= project.src %>/js/imagesloaded.pkgd.min.js',
            // '<%= project.src %>/js/isotope.pkgd.min.js',
            // '<%= project.src %>/js/lickity.pkgd.min.js',
            // '<%= project.src %>/js/transformicons.js',
            '<%= project.src %>/js/coffeeCompile.js'
          ]
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
     * Build bower components
     * https://github.com/yatskevich/grunt-bower-task
     */
    bower: {
      dev: {
        install: {
          options: {
            targetDir: '<%= project.assets %>/components/',
            cleanTargetDir: true,
            cleanBowerDir: true
          }
        }
      },
      dist: {
        install: {
          options: {
            targetDir: '<%= project.assets %>/components/',
            cleanTargetDir: true,
            cleanBowerDir: true
          }
        }
      }
    },

    /**
     * Responsive images
     * http://www.andismith.com/grunt-responsive-images/
     * https://github.com/andismith/grunt-responsive-images/
     */
    responsive_images: {
      dev: {
        options: {
          sizes: [
            {
              width: 480
            },{
              width: 720
            },
            {
              width: 960
            },
            {
              upscale: true,
              width: 1140
            }
          ]
        },
        files: [{
          expand: true,
          src: ['img/**/**.{jpg,gif,png}'],
          cwd: '<%= project.src %>/',
          dest: '<%= project.app %>/assets/'
        }]
      }
    },

    /**
     * Responsive images extender
     * https://github.com/smaxtastic/grunt-responsive-images-extender
     */
    responsive_images_extender: {
      dev: {
        options: {
          srcset: [
            {
              suffix: '-480',
              value: '480w'
            },
            {
              suffix: '-720',
              value: '720w'
            },
            {
              suffix: '-940',
              value: '940w'
            },
            {
              suffix: '-1140',
              value: '1140w'
            }
          ],
          ignore: ['.ignore-srcset']
        },
        files: [{
          expand: true,
          src: ['*.{html,htm,php}'],
          cwd: '<%= project.src %>/',
          dest: '<%= project.app %>/'
        }]        
      }
    },

    /**
     * Opens the web server in the browser
     * https://github.com/jsoverson/grunt-open
     */
    open: {
      server: {
        path: 'http://localhost:<%= connect.options.port %>'
      }
    },

    /**
     * Runs tasks against changed watched files
     * https://github.com/gruntjs/grunt-contrib-watch
     * Livereload the browser once complete
     */
    watch: {
      uglify: {
        files: '<%= project.src %>/js/lib/*.js',
        tasks: 'uglify'
      },
      style: {
        files: [
          '<%= project.src %>/scss/style.scss',
          '<%= project.src %>/scss/b3/_variables.scss',
          '<%= project.src %>/scss/EBM/_ebm-global.scss',
          '<%= project.src %>/scss/EBM/_ebm-dist.scss'],
        tasks: 'sass:dev'
      },
      ebm: {
        files: [
          '<%= project.src %>/scss/{,*/}*/{,*/}*.{scss,sass}', 
          '!<%= project.src %>/scss/style.scss',
          '!<%= project.src %>/scss/EBM/_ebm-global.scss',
          '!<%= project.src %>/scss/EBM/_ebm-dist.scss'],
        tasks: 'sass:ebm'
      },
      coffee: {
        files: '<%= project.src %>/coffee/*.coffee',
        tasks: 'coffee:dev'
      },
      responsive_images: {
        files: '<%= project.src %>/img/**.{jpg,gif,png}',
        tasks: 'responsive_images:dev'
      },
      responsive_images_extender: {
        files: '<%= project.src %>/*.{html,htm,php}',
        tasks: 'responsive_images_extender:dev'
      },
      livereload: {
        options: {
          livereload: LIVERELOAD_PORT
        },
        files: [
          '<%= project.app %>/{,*/}*.html',
          '<%= project.assets %>/css/*.css',
          '<%= project.assets %>/js/{,*/}*.js',
          '<%= project.assets %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    }
  });

  // Default task
  grunt.registerTask('default', [
    'sass:ebm',
    'sass:dev',
    // 'bower:dev',
    // 'connect:livereload',
    // 'uglify',
    // 'open',
    'watch'
  ]);

  // Watch for images in the src/img folder 
  grunt.registerTask('responsive', [
    'coffee:dev',
    'sass:ebm',
    'sass:dev',
    'bower:dev',
    'responsive_images:dev',
    'responsive_images_extender:dev',
    'connect:livereload',
    'uglify',
    'open',
    'watch'
  ]);

  // JavaScript Ninja task
  grunt.registerTask('js-ninja', [
    'coffee:dev',
    'sass:ebm',
    'sass:dev',
    'bower:dev',
    'jshint',
    'connect:livereload',
    'uglify',
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
