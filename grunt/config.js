/*jslint node: true */
'use strict';

module.exports = function () {
  return {
    root:   process.cwd(),
    src:    'src',
    build:  'build',
    // Previous version of your project
    legacy: 'legacy',
    // Documentation of your project
    doc:    'doc',

    sass_dir: 'sass',
    css_dir:  'assets/css',
    font_dir: 'assets/fonts',
    js_dir:   'assets/js'
  };
};