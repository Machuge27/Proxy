
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
  
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["adBlockEnabled"], (data) => {
        if (data.adBlockEnabled === undefined) {
            chrome.storage.local.set({ adBlockEnabled: true }); // Enable by default
        }
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes("youtube.com")) {
        chrome.storage.local.get(["adBlockEnabled"], (data) => {
            if (data.adBlockEnabled) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (enabled) => {
                        document.dispatchEvent(new CustomEvent("toggleAdBlock", { detail: enabled }));
                    },
                    args: [true],
                });
            }
        });
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

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "toggleAdBlock") {
        console.log("Background: Toggling Ad Blocker ->", message.enabled);

        // Update storage (prevents unnecessary looping)
        chrome.storage.local.set({ adBlockEnabled: message.enabled });

        // Find active YouTube tabs and send message to content script
        chrome.tabs.query({ url: "*://www.youtube.com/*" }, (tabs) => {
            tabs.forEach((tab) => {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (enabled) => {
                        // Modify the content script's behavior (DO NOT send a message back)
                        document.dispatchEvent(new CustomEvent("toggleAdBlock", { detail: enabled }));
                    },
                    args: [message.enabled],
                });
            });
        });

        sendResponse({ status: "success" });
    }
});

