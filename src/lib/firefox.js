/*jslint node: true */

var data  = require('sdk/self').data;
var tabs  = require("sdk/tabs");

tabs.on('ready', function(tab) {
  tab.attach({
    contentScriptFile: [
      data.url("tab.js")
    ]
  });
});