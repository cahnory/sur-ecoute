/*jslint browser: true, node: true */
/*global jQuery */
'use strict';

var Tagger    = require('./textbox/tagger');
var Editable  = require('./textbox/editable');
var Textarea  = require('./textbox/textarea');

var $         = require('jquery');
var keywords  = require('./textbox/keywords');

var hostname  = document.location.hostname;

var selectors = '[role="textbox"]:not([role="textbox"] [role="textbox"])';

var opts  = {
  dictionary:   keywords,
  maxKeywords:  8
};

if (hostname.match(/^([0-9a-z]+\.)?twitter.com/i)) {
  opts.maxLength  = 140;
}


$('html').on('focus.sur-ecoute keyup.sur-ecoute keydown.sur-ecoute mousedown.sur-ecoute mousedown.sur-ecoute', selectors, function () {
  var el = $(this);

  if (!el.data('sur-ecoute')) {
    if ('mail.google.com' === hostname) {
      // fix gmail bug O_ô
      $(el).attr('data-sur-ecoute', 'yep');
    }

    if (el.is('textarea,input')) {
      el.data('sur-ecoute', new Textarea(this, new Tagger(opts)));
    } else {
      el.data('sur-ecoute', new Editable(this, new Tagger(opts)));
    }
  }
});