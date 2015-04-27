/*jslint node: true */
'use strict';

module.exports  = {

  ffxAddOn: {
    //command: 'node "<%= root %>/node_modules/jpm/bin/jpm" xpi',
    command: 'cfx xpi',
    options: {
      execOptions: {
        cwd: '<%= build %>'
      }
    }
  }

};