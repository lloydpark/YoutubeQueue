window.onload = function(){
  chrome.storage.sync.get('storagequeue', function(data)
  {

    if (!data){
      document.getElementById("queue").innerHTML = "Queue is Empty";
    }
    else
    {
      for (i = 0; i < data.storagequeue.length; i++)
      {
        var index = i + 1;
        var url = index + ":" + ' ' + data.storagequeue[i] + "\n\n";
        document.getElementById("queue").innerHTML += url;
      }
    }
  })

  document.getElementById("clear").onclick = function(){
    var backgroundpage = chrome.extension.getBackgroundPage();
    backgroundpage.clearqueue();
    chrome.storage.sync.clear();
    chrome.browserAction.setBadgeText({text: ''});
    chrome.browserAction.setPopup("popup.html");
  }
};
