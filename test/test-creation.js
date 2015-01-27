/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var assert  = require('assert');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;


describe('bs-less-coffee-webfont generator', function () {

  it('the generator can be required without throwing', function () {
    // not testing the actual run of generators yet
    this.app = require('../app');
  });

  describe('run test', function () {

    var expectedContent = [
      ['bower.json', /"name": "tmp"/],
      ['package.json', /"name": "tmp"/],
      ['app/styles/main.less', /bootstrap.less/],
    ];
    var expected = [
      '.editorconfig',
      '.gitignore',
      '.gitattributes',
      'package.json',
      'bower.json',
      'Gruntfile.js',
      'app/404.html',
      'app/favicon.ico',
      'app/robots.txt',
      'app/index.html',
      'app/styles/main.less',
      'app/scripts/main.js'
    ];
    var jsBootstrapExpectedContent = [
      ['app/index.html', /bootstrap.js/]
    ];

    var options = {
      'skip-install-message': true,
      'skip-install': true,
      'skip-welcome-message': true,
      'skip-message': true
    }

    var runGen;

    beforeEach(function () {
      runGen = helpers
        .run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, '.tmp'))
        .withGenerators([[helpers.createDummyGenerator(), 'mocha:app']]);
    });

    it('creates expected files', function (done) {

      runGen.withOptions(options).on('end', function () {

        assert.file([].concat(
          expected,
          'app/scripts/hello.coffee'
        ));

        assert.fileContent(expectedContent);

        done();
      });
    });


    it('creates expected Bootstrap javascript components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['jsBootstrap']})
      .on('end', function () {
        assert.fileContent(jsBootstrapExpectedContent);

        done();
      });
    });

    it('creates expected Bootstrap javascript components', function (done) {
      runGen.withOptions(options).withPrompt({features: ['respondjs']})
      .on('end', function () {
        assert.fileContent([
          ['Gruntfile.js', /respond.min.js/],
          ['bower.json', /respond/],
          ['app/index.html', /respond.min.js/]
        ]);

        done();
      });
    });

  });
});
