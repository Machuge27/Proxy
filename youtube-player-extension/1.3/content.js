
/*
youtube-player-extension/
├── manifest.json
├── popup.html
├── popup.js
└── content.js
*/


// content.js

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

async function setupPiP(video) {
  // Get video source
  const videoUrl = video.src || Array.from(video.getElementsByTagName('source')).map(source => source.src)[0];
  
  if (!videoUrl) {
    throw new Error('Could not find video source');
  }

  // Create PiP window
  const response = await chrome.runtime.sendMessage({ 
    action: 'createPiPWindow',
    videoUrl: videoUrl,
    currentTime: video.currentTime
  });

  if (response.success) {
    // Send video data to PiP window
    chrome.runtime.sendMessage({
      type: 'VIDEO_DATA',
      videoUrl: videoUrl,
      currentTime: video.currentTime
    });
  }
}

async function getVideoDownloadUrl(videoId) {
  // This is a placeholder. You'll need to implement a proper way to get the download URL
  // One approach is to use youtube-dl or similar libraries on a backend server
  return `https://youtube.com/watch?v=${videoId}`;
}

chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
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

      case 'mute':
        video.muted = !video.muted;
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

      case 'togglePiP':
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else {
          video.requestPictureInPicture();
        }
        break;

      // case 'togglePiP':
      //   await setupPiP(video);
      //   break;

      case 'downloadVideo':
        const videoId = new URLSearchParams(window.location.search).get('v');
        if (videoId) {
          const downloadUrl = await getVideoDownloadUrl(videoId);
          const title = document.title.replace(' - YouTube', '');
          chrome.runtime.sendMessage({
            action: 'downloadVideo',
            videoUrl: downloadUrl,
            title: title
          });
        }
        break;

      default:
        throw new Error('Unknown action');
    }

    sendResponse({ success: true });
  } catch (error) {
    sendResponse({ success: false, error: error.message });
  }

  return true;
});

function createModal() {
  // Check if modal already exists
  if (document.querySelector('#yt-modal')) {
    return;
  }

  // Create the modal container
  const modal = document.createElement('div');
  modal.id = 'yt-modal';
  modal.style.position = 'fixed';
  modal.style.top = '50%';
  modal.style.left = '50%';
  modal.style.transform = 'translate(-50%, -50%)';
  modal.style.backgroundColor = '#fff';
  modal.style.border = '1px solid #ccc';
  modal.style.borderRadius = '8px';
  modal.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  modal.style.padding = '20px';
  modal.style.zIndex = '10000';

  // Modal content
  modal.innerHTML = `
    <h2>YouTube Controls</h2>
    <p>Use the buttons in this modal or shortcuts for playback controls.</p>
    <button id="close-modal" style="margin-top: 10px; padding: 8px 16px; background-color: #f00; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
      Close
    </button>
  `;

  // Append modal to the document
  document.body.appendChild(modal);

  // Close modal on button click
  document.getElementById('close-modal').addEventListener('click', () => {
    modal.remove();
  });
}

// Listen for messages to show modal
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'show-modal') {
    createModal();
    sendResponse({ success: true });
  }
});

