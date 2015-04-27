/*jslint node: true */
'use strict';

module.exports  = {

  main: {
    options: {
      transform: ['reactify', 'debowerify', 'decomponentify', 'deamdify', 'deglobalify'],
      exclude: ['sdk','sdk/page-mod','sdk/self','sdk/tabs']
    },
    files: [
      {
        expand: true,
        cwd: '<%= src %>/data',
        src: ['*.js'],
        dest: '<%= build %>/data'
      }
    ]
  }
};