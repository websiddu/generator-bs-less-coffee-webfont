// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  // show elapsed time at the end
  require('time-grunt')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,
    <% if (config.get('deployToGithubPages')) { %>
    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        message: 'Built from %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:<%= config.get('githubUsername') %>/<%= config.get('githubRepository')%>.git',
          branch: 'gh-pages'
        }
      }
    },
    <% } %>
    webfont: {
      icons: {
        src: '<%%= yeoman.app %>/fonts/icons/*.svg',
        dest: '<%%= yeoman.app %>/fonts/',
        destCss: '<%%= yeoman.app %>/styles/utils/',
        syntax: 'bootstrap',
        options: {
          stylesheet: 'less',
          relativeFontPath: '../fonts/',
          destHtml: '<%%= yeoman.app %>/fonts/',
          font: 'icons',
          hashes: false,
          templateOptions: {
            classPrefix: 'icon-'
          }
        },
      }
    },
    watch: {
      coffee: {
        files: ['<%%= yeoman.app %>/scripts/{,*/}*.coffee'],
        tasks: ['coffee']
      },
      less: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less']
      },
      webfont: {
        files: ['<%%= yeoman.app %>/fonts/icons/{,*/}*.svg'],
        tasks: ['webfont:icons']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%%= connect.options.livereload %>'
        },
        files: [
          '<%%= yeoman.app %>/*.html',
          '{.tmp,<%%= yeoman.app %>}/styles/{,*/}*.css',
          '{.tmp,<%%= yeoman.app %>}/scripts/{,*/}*.js',
          '<%%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%%= yeoman.app %>/fonts/icons/{,*/}*.{svg}'
        ]
      }
    },
    connect: {
      options: {
        port: 9080,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%%= yeoman.app %>'
          ]
        }
      },
      test: {
        options: {
          port: 9081,
          base: [
            '.tmp',
            'test',
            '<%%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          base: '<%%= yeoman.dist %>'
        }
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%%= yeoman.dist %>/*',
            '!<%%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/scripts/{,*/}*.js',
        '!<%%= yeoman.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    bootlint: {
      options: {
        stoponerror: true
      },
      files: [
        '<%%= yeoman.app %>/{,*/}*.html',
        '!<%%= yeoman.app %>/404.html'
      ]
    },<% if (testFramework === 'mocha') { %>
    mocha: {
      all: {
        options: {
          run: true,
          urls: ['http://localhost:<%%= connect.test.options.port %>/index.html']
        }
      }
    },<% } else if (testFramework === 'jasmine') { %>
    jasmine: {
      all: {
        /*src: '',*/
        options: {
          specs: 'test/spec/{,*/}*.js'
        }
      }
    },<% } %>
    coffee: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/scripts',
          src: '{,*/}*.coffee',
          dest: '<%%= yeoman.app %>/scripts',
          ext: '.js'
        }]
      }
    },
    less: {
      dist: {
        files: {
          '<%%= yeoman.app %>/styles/main.css': ['<%%= yeoman.app %>/styles/main.less']
        },
        options: {
          sourceMap: true,
          sourceMapFilename: '<%%= yeoman.app %>/styles/main.css.map',
          sourceMapBasepath: '<%%= yeoman.app %>/',
          sourceMapRootpath: '/'
        }
      }
    },
    // not used since Uglify task does concat,
    // but still available if needed
    /*concat: {
      dist: {}
    },*/
    // not enabled since usemin task does concat and uglify
    // check index.html to edit your build targets
    // enable this task if you prefer defining your build targets here
    /*uglify: {
      dist: {}
    },*/
    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
            '<%%= yeoman.dist %>/fonts/{,*/}*.*'
          ]
        }
      }
    },
    useminPrepare: {
      html: '<%%= yeoman.app %>/index.html',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/styles/main.css': [
            '.tmp/styles/{,*/}*.css',
            '<%%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },
    htmlmin: {
      dist: {
        options: {
          /*removeCommentsFromCDATA: true,
          // https://github.com/yeoman/grunt-usemin/issues/44
          //collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true*/
        },
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>',
          src: '*.html',
          dest: '<%%= yeoman.dist %>'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            'fonts/{,*/}*.*',
            '.htaccess',
            'images/{,*/}*.{webp,gif}'
          ]
        }]
      },
      server: {
        files: [{<% if (fontawesome) { %>
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/bower_components/font-awesome/fonts/',
          dest: '<%%= yeoman.app %>/fonts/font-awesome',
          src: ['*']<% } %>
        }, {<% if (respondjs) { %>
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/bower_components/respond/dest/respond.min.js',
          dest: '<%%= yeoman.app %>/scripts/vendor/vendor',
          src: ['*']<% } %>
        }, {
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>/bower_components/bootstrap/dist/fonts/',
          dest: '<%%= yeoman.app %>/fonts/glyphicons',
          src: ['*']
        }]
      }
    },
    concurrent: {
      dist: [
        'coffee',
        'less',
        'imagemin',
        'svgmin',
        'htmlmin'
      ]
    }
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'coffee',
      'less',
      'copy:server',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function () {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve']);
  });

  grunt.registerTask('lint', [
    'jshint',
    'bootlint'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'coffee',
    'less',
    'copy:server',
    'connect:test',<% if (testFramework === 'mocha') { %>
    'mocha'<% } else if (testFramework === 'jasmine') { %>
    'jasmine'<% } %>
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'copy:server',
    'useminPrepare',
    'concurrent',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    // Uncomment if you really need this.
    //'rev',
    'usemin'
  ]);

  grunt.registerTask('default', [
    'lint',
    'test',
    'build'
  ]);

  <% if (config.get('deployToGithubPages')) { %>
    grunt.registerTask('deploy', 'Deploy to Github Pages', ['build', 'buildcontrol']);
  <% } %>

};
