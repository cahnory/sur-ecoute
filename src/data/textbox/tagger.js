/*jslint node: true, browser: true */
/*global lodash */
'use strict';

var _ = require('lodash');

var Tagger = function (opts) {
  this.opts = _.merge({
    maxLength:    Infinity,
    maxKeywords:  Infinity,
    dictionary:   [],
    prefix:       ' #',
  }, opts);


  this.raw      = '';
  this.input    = '';
  this.tags     = '';
  this.keywords = [];
};

Tagger.prototype.set = function (text) {
  var input = this.stripTags(text);

  this.raw      = text;
  this.input    = input;
  this.keywords = this.getKeywords(this.input, this.keywords);
  this.tags     = this.keywordsToTags(this.keywords);
};
Tagger.prototype.get = function () {
  return this.input + this.tags;
};

Tagger.prototype.stripTags  = function (text) {
  text = text.substr(0, text.length - this.getTags(text).length);

  return text;
};
Tagger.prototype.addTags    = function (text, keywords) {
  return text + this.keywordsToTags(keywords);
};
Tagger.prototype.getTags  = function (text) {
  var tags = this.tags;
  while (tags.length) {
    if (text.substr(-tags.length) === tags) {
      break;
    }
    tags = tags.substr(1);
  }

  return tags;
};

Tagger.prototype.willChange = function (input) {
  return input !== this.raw || this.tags !== this.getTags(input) || this.tags !== this.keywordsToTags(this.getKeywords(this.stripTags(input), this.keywords));
};

Tagger.prototype.getKeywords = function (text, keywords) {
  if (text.match(/^\s*$/)) {
    return [];
  }

  keywords = (keywords || []).slice();

  // copy dictionary without current keywords
  var dictionary  = _.difference(this.opts.dictionary, keywords);

  // on retire les tags qui ne rentrent plus
  while (keywords.length && (keywords.length > this.opts.maxKeywords || this.addTags(text, keywords).length > this.opts.maxLength)) {
    dictionary.push(keywords.pop());
  }

  // on essai d'ajouter chaque tag dans un ordre
  // aléatoire jusqu'à atteindre la limite
  while (dictionary.length && keywords.length !== this.opts.maxKeywords) {
    var length;
    // splice and add random keyword
    keywords.push(dictionary.splice(Math.round(Math.random() * (dictionary.length - 1)), 1)[0]);
    length  = this.addTags(text, keywords).length;

    // le tag ne rentre pas, on le retire
    if (length > this.opts.maxLength) {
      keywords.pop();
    } else if (this.opts.maxLength - length <= 1) {
      break;
    }
  }

  return keywords;
};

Tagger.prototype.keywordsToTags = function (keywords) {
  return (keywords.length ? this.opts.prefix + keywords.join(this.opts.prefix) : '');
};

module.exports = Tagger;