/*jslint node: true */
'use strict';

module.exports  = function (grunt) {

  grunt.registerMultiTask(
    module.filename.match(/([^\/\\]+)\.[^.\/\\]+$/)[1],
    'Load template data',
    function () {
      grunt.task.run(this.data.tasks || []);
    }
  );

};