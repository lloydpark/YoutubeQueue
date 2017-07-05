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

chrome.runtime.onMessage.addListener(
  function(request, send, sendResponse){
    if (request.greeting == "updatebadge"){
      chrome.storage.sync.get('storagequeue', function(data){
        chrome.browserAction.setBadgeText({text: '' + data.storagequeue.length});
      });
    }
  }
);

function clearqueue(){
  queue = [];
}
