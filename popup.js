var JSONdata = [];
var Readysize;
var isReady = 0;

window.onload = function(){
  chrome.storage.sync.get('storagequeue', function(data)
  {

    if (!data){
      $("#video-data").empty();
    }
    else
    {
      Readysize = data.storagequeue.length;
      for (i = 0; i<Readysize; i++){
          callYoutubeAPI(data.storagequeue[i], i);
      }
      console.log(JSONdata);
    }
  })

  function sortJSONdata(){
      JSONdata.sort(function(a, b){
        return (a.count > b.count) ? 1 : ((b.count > a.count) ? -1 : 0);
      })
  }

  function renderUI(){
    if (isReady === Readysize){
      sortJSONdata();
      for (i = 0; i < JSONdata.length; i++)
      {
        $("#video-data").append($('<li>').append($("<img>", {
          src: JSONdata[i].imagesrc,
          width: JSONdata[i].imagewidth,
          height: JSONdata[i].imageheight
        })).append($("<p></p>").text(JSONdata[i].title)));
      }
    }
  }



  function callYoutubeAPI(url, counter){
    var videoid = url;
    var matches = videoid.match(/^https:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i) || videoid.match(/^http:\/\/youtu\.be\/([^?]+)/i);
    if (matches){
      videoid = matches[1];
    }



    $.getJSON("https://www.googleapis.com/youtube/v3/videos",{
      key: "AIzaSyDIj7wSF8rpTG00l-L74Fr6MKHu9XR2c0E",
      part: "snippet",
      id: videoid
    }, function (data){
      if (data.items.length === 0){
        $("<p>Video not found</p>").appendTo("#video-data");
        return;
      }
      JSONdata.push({title: data.items[0].snippet.title, imagesrc: data.items[0].snippet.thumbnails.medium.url,
        imagewidth: data.items[0].snippet.thumbnails.medium.width, imageheight: data.items[0].snippet.thumbnails.medium.height, count: counter});

      isReady++;
      renderUI();
    })

  }

  document.getElementById("clear").onclick = function(){
    var backgroundpage = chrome.extension.getBackgroundPage();
    backgroundpage.clearqueue();
    chrome.storage.sync.clear();
    chrome.browserAction.setBadgeText({text: ''});

  };

  document.getElementById("next").onclick = function(){
    chrome.storage.sync.get('storagequeue', function(data){
      var nextvideo = data.storagequeue.shift();
      chrome.storage.sync.set(data);
      chrome.runtime.sendMessage({greeting: "updatebadge"});
      chrome.tabs.update(null, {url: nextvideo});
    })
  }
};
