/*jslint browser: true */
/*global chrome */

chrome.tabs.onUpdated.addListener(function(id, info){
  if ('complete' === info.status) {
    chrome.tabs.executeScript(id, {"file": "data/tab.js", allFrames: true, runAt: 'document_end'});
  }
});