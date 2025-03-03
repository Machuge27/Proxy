
// background.js
let pipWindowId = null;

chrome.commands.onCommand.addListener(async (command) => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    if (!tab || !tab.url.includes('youtube.com')) return;
  
    switch (command) {
      case 'toggle-play-pause':
        chrome.tabs.sendMessage(tab.id, { action: 'playPause' });
        break;
      case 'toggle-pip':
        chrome.tabs.sendMessage(tab.id, { action: 'togglePiP' });
        break;
      case 'show-modal':
        chrome.tabs.sendMessage(tab.id, { action: 'show-modal' });
        break;
      default:
        console.warn(`Unknown command: ${command}`);
    }
  });


  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === 'createPiPWindow') {
      // Close existing PiP window if any
      if (pipWindowId) {
        await chrome.windows.remove(pipWindowId);
        pipWindowId = null;
      }
  
      // Create new PiP window
      const pipWindow = await chrome.windows.create({
        url: chrome.runtime.getURL('pip.html'),
        type: 'popup',
        width: 400,
        height: 225,
        focused: true,
        // alwaysOnTop: true
      });
      
      pipWindowId = pipWindow.id;
      sendResponse({ success: true, windowId: pipWindowId });
    } else if (request.action === 'downloadVideo') {
      // Handle video download
      chrome.downloads.download({
        url: request.videoUrl,
        filename: `${request.title}.mp4`
      });
    }
    return true;
  });
