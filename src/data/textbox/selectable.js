/*jslint browser: true, node: true */
'use strict';

var dom = require('./dom');

var Selectable = function (el) {
  this.el = el;
};

Selectable.prototype.addSelection = function (start, end) {
  var range = document.createRange();
  var selection = this.docSelection();
  var point;

  point = this.getPoint(start);
  range.setStart(point.node, point.offset);

  if (end) {
    point = this.getPoint(end);
    range.setEnd(point.node, point.offset);
  }

  selection.addRange(range);
};
Selectable.prototype.select = function (start, end) {
  this.unselect();
  this.addSelection(start, end);
};
Selectable.prototype.unselect = function (index) {
  var ranges = this.getRanges();
  var selection = this.docSelection();

  if (index !== undefined) {
    if (ranges[index]) {
      ranges[index].splice(index, 1);
    }
  } else {
    ranges = [];
  }

  selection.removeAllRanges();
  ranges.forEach(function (range) {
    selection.addRange(range);
  });
};

Selectable.prototype.getSelection = function (index) {
  var selections = this.getSelections();

  if (index !== undefined) {
    return selections[index];
  } else {
    //console.log(selections.length - 1);
    return selections[selections.length - 1];
  }
};
Selectable.prototype.getSelections  = function () {
  return this.getRanges(function (range) {
    return this.rangeToSelection(range);
  }.bind(this));
};
Selectable.prototype.getRanges  = function (cb) {
  var selection = this.docSelection();
  var ranges  = [];
  var range;
  var i;

  //console.log('c', selection.rangeCount);
  for (i = 0; i < selection.rangeCount; i++) {
    range = selection.getRangeAt(i);

    // selection start is inside element
    //console.log('r', range);
    if(this.el === range.commonAncestorContainer || this.isNestedNode(range.commonAncestorContainer)) {
      ranges.push(cb ? cb(range) : range);
    }
  }

  return ranges;
};

Selectable.prototype.rangeToSelection = function (range) {
  //console.log(range);
  return {
    start:  this.getDistance(range.startContainer,  range.startOffset),
    end:    this.getDistance(range.endContainer,    range.endOffset),

    startNode:  range.startContainer,
    endNode:    range.startContainer,

    startPos: range.startOffset,
    endPos:   range.endOffset
  };
};


// private

Selectable.prototype.getDistance = function (node, dist) {
  node = dom.getPreviousNode(node, this.el);

  // reach the element starting point
  if (node === this.el) {
    return dist;
  }

  // add textnode length to the distance
  if (3 === node.nodeType || 1 === node.nodeType) {
    dist += (node.textContent || node.value || '').length;
  }

  return this.getDistance(node, dist);
};

Selectable.prototype.getPoint = function (dist, node) {
  node = node || this.el.childNodes[0] || this.el;

  if (node === this.el) {
    return this.el.childNodes.length ? this.getDefaultPoint() : { node: node, offset: 0 };
  }

  // remove textnode length to the distance
  if (3 === node.nodeType) {
    dist -= node.wholeText.length;

    // reach the final node
    if (dist <= 0) {
      return { node: node, offset: node.wholeText.length + dist };
    }
  }

  node = dom.getNextNode(node, this.el);

  if (node) {
    return this.getPoint(dist, dom.getNextNode(node, this.el));
  } else {
    return this.getDefaultPoint();
  }
};

Selectable.prototype.getDefaultPoint  = function () {
  return { node: this.el, offset: 0 };
};

Selectable.prototype.isNestedNode = function (node) {
  if (node.parentNode === this.el) {
    return true;
  } else if (node.parentNode) {
    return this.isNestedNode(node.parentNode);
  }

  return false;
};

Selectable.prototype.docSelection = function () {
  return window.getSelection() || document.getSelection() || document.selection.createRange();
};

module.exports = Selectable;