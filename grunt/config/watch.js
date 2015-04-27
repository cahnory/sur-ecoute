/*jslint node: true */
'use strict';

module.exports  = function (grunt) {
  return {
    statics: {
      files: ['<%= src  %>/**/*'],
      tasks: ['default']
    }
  };
};