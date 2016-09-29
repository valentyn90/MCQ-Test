/*
 *  The Gruntfile
 *  
 */

module.exports = function (grunt) {
  'use strict';

  // Metadata
  var pkgjson = grunt.file.readJSON('./package.json');

  var config = {
    pkg: pkgjson,

    src: {
      sass: 'assets/src/scss',
      js: 'assets/src/js'
    },
    dist: {
      css: 'assets/dist/css',
      js: 'assets/dist/js'
    }
  };

  // Project configuration
  grunt.initConfig({

    config: config,
    pkg: config.pkg,

    banner: '/*!\n' +
            'Theme Name: <%= pkg.name %>\n' +
            'Theme URI: <%= pkg.homepage %>\n' +
            'Author: <%= pkg.author %> \n' +
            'Author URI: <%= pkg.authoruri %> \n' +
            'Version: <%= pkg.version %> \n' +
            'Description: <%= pkg.description %> \n' +
            'Licensed <%= pkg.license %> \n' +
            'Copyright 2015-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            '*/\n',

    // Bump
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: false,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    },

    // Clean
    clean: {
      dist: 'dist'
    },

    /*
     * Sassy!
     */ 
    sass: {
      dev: {
        options: {
          style: 'expanded'
        },
        files: {
          // 'destination': 'source'
          '<%= config.dist.css %>/style.css': '<%= config.src.sass %>/style.scss',
          '<%= config.dist.css %>/editor-style.css': '<%= config.src.sass %>/editor-style.scss',
        }
      },
      dist: {
        options: {
          style: 'compressed',
          sourcemap: '<%= config.dist.css %>/*.css.map'
        },
        files: {
          '<%= config.dist.css %>/*.css': '<%= config.src.sass %>/*.scss'       // 'destination': 'source'
        }
      }
    },

    // CSS Lint
    scsslint: {
      options: {
        bundleExec: false,
        colorizeOutput: true,
        config: '<%= config.src.sass %>/.scss-lint.yml',
        reporterOutput: null
      },
      src: ['<%= config.src.sass %>/*.scss']
    },


    // CSS Comb
    csscomb: {
      options: {
        config: '<%= config.src.sass %>/.csscomb.json'
      },
      dist: {
        expand: true,
        cwd: '<%= config.dist.css %>/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= config.dist.css %>/'
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 35',
          'Firefox >= 31',
          'Edge >= 12',
          'Explorer >= 9',
          'iOS >= 7',
          'Opera >= 12',
          'Safari >= 7.1'
        ]
      },
      core: {
        options: {
          map: false
        },
        src: '<%= config.dist.css %>/*.css'
      }
    },

    // CSS Min
    cssmin: {
      options: {
        compatibility: 'ie9',
        keepSpecialComments: '*',
        sourceMap: false,
        noAdvanced: true
      },
      core: {
        files: [
          {
            expand: true,
            cwd: '<%= config.dist.css %>/',
            src: ['*.css', '!*.min.css'],
            dest: '<%= config.dist.css %>/',
            ext: '.min.css'
          }
        ]
      }
    },

    usebanner: {
      options: {
        position: 'replace',
        banner: '<%= banner %>'
      },
      files: {
        src: '<%= config.dist.css %>/style.css'
      }
    },


    /*
     * JavaScript
     */

    // JS Hint
    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= config.src.js %>/app.js'
      ]
    },

  /*
    // Concatenate
    concat: {
      options: {
        stripBanners: false
      },
      app: {
        src: [
          '<%= config.src.js %>/*.js'
        ],
        dest: '<%= config.dist.js %>/<%= pkg.name %>.js'
      }
    },

    // Line remover
    lineremover: {
      es6Import: {
        files: {
          '<%= concat.app.dest %>': '<%= concat.app.dest %>'
        },
        options: {
          exclusionPattern: /^(import|export)/g
        }
      }
    },
    */

    // Uglify
    uglify: {
      options: {
        compress: {
          warnings: false
        },
        mangle: true,
        preserveComments: 'some'
      },
      dist: {
        files: {
          '<%= config.dist.js %>/app.min.js'     : '<%= config.src.js %>/app.js'
        }
      }
    },


    // The nightswatch
    watch: {

      Sass: {
        options: {
          spawn: false
        },
        files: '<%= config.src.sass %>/**/*.scss',
        tasks: ['dev-css']
      },

      JavaScript: {
        options: {
          spawn: false,
        },
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['dev-js']
      }

    } // end watch

  }); // end grunt.initConfig

  /*
   * Registering Grunt tasks
   */
  grunt.registerTask('dev-css',
    [
      'sass:dev', 
      // 'newer:scsslint', 
      'newer:autoprefixer', 
      'newer:csscomb', 
      'newer:cssmin'
      // 'usebanner'
    ]
  );

  grunt.registerTask('dist-css',
    [
      'sass:dist', 
      // 'scsslint', 
      'autoprefixer', 
      'csscomb', 
      'cssmin'
      // 'usebanner'
    ]
  );

  grunt.registerTask('dev-js',
    [
      // 'newer:jshint', 
      // 'concat', 
      // 'lineremover',
      'uglify:dist'
    ]
  );

  grunt.registerTask('dist-js',
    [
      // 'jshint', 
      // 'concat', 
      // 'lineremover', 
      'uglify:dist'
    ]
  );

  // Grunt - Build
  grunt.registerTask('default', [
    'dist-css',
    'dist-js'
  ]);

  /*
   * Load the Grunt components
   */
  require('load-grunt-tasks')(grunt, { 
    scope: 'devDependencies',
    pattern: ['grunt-*']
  });

  require('time-grunt')(grunt);

};