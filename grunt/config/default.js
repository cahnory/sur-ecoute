/*jslint node: true */
'use strict';

module.exports  = {

  clean: {
    tasks: [
      'clean:main'
    ]
  },

  copy: {
    tasks: [
      'copy:main'
    ]
  },

  browserify: {
    tasks: [
      'browserify:main',
      'jsbeautifier:main'
    ]
  },

  ffx: {
    tasks: [
      'shell:ffxAddOn'
    ]
  }

};