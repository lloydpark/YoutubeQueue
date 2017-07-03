var contextMenuItem = {
  "id": "addQueue",
  "title": "YoutubeQueue",
  "contexts": ["link"]
};

var queue = [];

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function(clickData){
  if (clickData.menuItemId == "addQueue"){
    queue.push(clickData.linkUrl);
    chrome.storage.sync.set({'storagequeue': queue}, function(){
      chrome.browserAction.setBadgeText({text: '' + queue.length});
      console.log(clickData.linkUrl + "added to queue");
    });
  }
});

function clearqueue(){
  queue = [];
}
