/*jslint browser: true, node: true */
/* global jQuery */
'use strict';

var $ = require('jquery');
var Selectable = require('./selectable');

var TextBox = function (el, tagger) {
  this.el     = el;
  this.tagger = tagger;
  this.selection  = new Selectable(this.el);
  this.focusOn = null;

  $(el).on('focus.sur-ecoute', function () {
    this.focusOn = this.getInput().length;
  }.bind(this));

  $(el).on('keydown.sur-ecoute keyup.sur-ecoute', function () {
    this.update();
  }.bind(this));
};

TextBox.prototype.update = function () {
  var selection = this.selection.getSelection();
  var input = this.getInput();

  if (this.willChange(input, selection)) {

    this.tagger.set(input);
    this.setInput(this.tagger.get());

    if (selection) {
      this.selection.select(this.focusOn ? this.focusOn : selection.start);
      this.focusOn = null;
    }
  }
};

TextBox.prototype.willChange  = function (input, selection) {
  return this.tagger.willChange(input) &&
    (!selection || !$(selection.startNode).parents('.gmail_extra, .gmail_signature').length);
};

TextBox.prototype.getInput = function () {
  // dirty gmail fix
  var extra = this.getGmailExtra().detach();

  var input = this.el.textContent.replace(/\s/g, ' ');

  $(this.el).append(extra);

  return input;
};
TextBox.prototype.setInput = function (input) {
  var extra = this.getGmailExtra().detach();

  this.el.textContent = input;

  $(this.el).append(extra);
};
// dirty gmail fix
TextBox.prototype.getGmailExtra = function () {
  var ignore  = true;
  var extra   = $(this.el).contents().filter(function () {
    if ($(this).is('br[clear],.gmail_extra,.gmail_signature')) {
      ignore = false;
    }
    return !ignore;
  });

  return extra;
};

module.exports = TextBox;