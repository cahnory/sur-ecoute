/*jslint node: true */
'use strict';

module.exports = function (grunt) {
  return {
    main: {
      src : ["<%= build %>/data/*.js"]
    }
  };
};