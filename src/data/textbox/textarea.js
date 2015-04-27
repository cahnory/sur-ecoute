/*jslint browser: true, node: true */
/* global jQuery */
'use strict';

var $ = require('jquery');

var TextBox = function (el, tagger) {
  this.el     = el;
  this.tagger = tagger;
  //this.focusOn;

  $(el).on('keydown.sur-ecoute keyup.sur-ecoute', function () {
    this.update();
  }.bind(this));
};

TextBox.prototype.update = function () {
  var start, end;
  var input = this.getInput();

  if (this.tagger.willChange(input)) {
    start = this.el.selectionStart;
    end   = this.el.selectionEnd;

    this.tagger.set(input);
    this.el.value = this.tagger.get();

    this.el.selectionStart  = start;
    this.el.selectionEnd    = end;
  }
};

TextBox.prototype.getInput = function () {
  return this.el.value.replace(/\s/g, ' ');
};

module.exports = TextBox;