var contextMenuItem = {
  "id": "addQueue",
  "title": "YoutubeQueue",
  "contexts": ["link"]
};

var queue = [];

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "addQueue"){
    queue.push(clickData.pageUrl);
    chrome.storage.local.set({'storagequeue': queue});
    alert("added to queue");
  }
});
