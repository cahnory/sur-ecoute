/*jslint node: true */
'use strict';

module.exports  = function (grunt) {

  return {

    main: {
      files: [{
        expand: true,
        cwd: '<%= src %>',
        src: ['**/*','!data/**/*'],
        dest: '<%= build %>'
      }]
    },

  };
};