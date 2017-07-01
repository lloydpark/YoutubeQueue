var vid = document.getElementById("movie_player");
vid.onended = function() {
  setTimeout(playnext, 5000);
};

function playnext(){
  chrome.storage.local.get('storagequeue', function(data){
    if (storagequeue.length){
      var nextvideo = storagequeue.shift();
      alert(nextvideo);
      data.storagequeue = storagequeue;
      chrome.storage.local.set(data);
      chrome.tabs.update({
        url: nextvideo;
      });
    }
  });


};
