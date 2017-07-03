

var vid = $('video').get(0);
vid.addEventListener('ended', playnext);

function playnext(){

  chrome.storage.sync.get('storagequeue', function(data){
    var nextvideo = data.storagequeue.shift();
    chrome.storage.sync.set(data);
    window.location.href = nextvideo;
  })

};
