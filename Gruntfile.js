/*jslint node: true */
'use strict';

module.exports = function (grunt) {

  var
    dependency,
    config  = require('./grunt/config')(grunt);

  config.pkg = config.pkg || grunt.file.readJSON('package.json');

  // Initialise grunt "before" other config
  grunt.initConfig(config);

  // Read config files from the `grunt/config/` folder
  grunt.file.expand('grunt/config/*.js').forEach(function (path) {
    var
      property = /grunt\/config\/(.+)\.js/.exec(path)[1],
      module = require('./' + path);

    config[property] = 'function' === typeof module ? module(grunt) : module;
  });

  // Load development dependencies specified in package.json
  for (dependency in config.pkg.devDependencies) {
    if (config.pkg.devDependencies.hasOwnProperty(dependency)) {
      if (/^grunt-/.test(dependency)) {
        grunt.loadNpmTasks(dependency);
      }
    }
  }

  // Load tasks from the `grunt-tasks/` folder
  grunt.loadTasks('grunt/tasks');

};