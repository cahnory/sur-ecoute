/*jslint node: true, browser: true */
'use strict';

module.exports.getPreviousNode  = function (node, root) {
  if (node === root) {
    return node;
  }

  if (node.previousSibling) {
    return node.previousSibling;
  }

  if (node.parentNode) {
    while (!node.previousSibling && node.parentNode) {
      node = node.parentNode;

      if (node === root) {
        return node;
      }
    }

    if (node.previousSibling) {
      node = node.previousSibling;

      while (node.childNodes.length) {
        node = node.childNodes[node.childNodes.length - 1];
      }
      return node;
    }
  }

  return root;
};

module.exports.getNextNode  = function (node, root) {
  if (node === root) {
    return null;
  }

  if (node.nextSibling) {
    return node.nextSibling;
  }

  if (node.parentNode) {
    while (!node.nextSibling && node.parentNode) {
      node = node.parentNode;

      if (node === root) {
        return null;
      }
    }

    if (node.nextSibling) {
      node = node.nextSibling;

      while (node.childNodes.length) {
        node = node.childNodes[0];
      }
      return node;
    }
  }

  return null;
};