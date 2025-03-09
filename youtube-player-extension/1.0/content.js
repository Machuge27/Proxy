
/*
youtube-player-extension/
├── manifest.json
├── popup.html
├── popup.js
└── content.js
*/

function findYouTubeVideo() {
  const video = document.querySelector('video');
  if (!video) {
    throw new Error('No video element found');
  }
  return video;
}

function findButton(selector) {
  const button = document.querySelector(selector);
  if (!button) {
    throw new Error(`Button ${selector} not found`);
  }
  return button;
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  try {
    const video = findYouTubeVideo();

    switch (request.action) {
      case 'playPause':
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
        break;
        
      case 'speedUp':
        video.playbackRate = Math.min(video.playbackRate * 1.25, 2);
        break;
        
      case 'speedDown':
        video.playbackRate = Math.max(video.playbackRate * 0.75, 0.25);
        break;
        
      case 'skipForward':
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
        break;
        
      case 'skipBackward':
        video.currentTime = Math.max(video.currentTime - 10, 0);
        break;
        
      case 'prevVideo':
        const prevButton = findButton('.ytp-prev-button');
        prevButton.click();
        break;
        
      case 'nextVideo':
        const nextButton = findButton('.ytp-next-button');
        nextButton.click();
        break;
        
      default:
        throw new Error('Unknown action');
    }
    
    sendResponse({ success: true });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }
  
  return true; // Required to use sendResponse asynchronously
});