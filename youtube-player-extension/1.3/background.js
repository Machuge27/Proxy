
// background.js
let pipWindowId = null;
let proxyEnabled = false;
let proxyUrl = "";

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


/*!SECTION
  Procy service implementation...


*/

// Listen for changes to the proxy settings
chrome.storage.local.get(['enabled', 'proxyUrl'], function(result) {
  proxyEnabled = result.enabled || false;
  proxyUrl = result.proxyUrl || "";
  console.log("Proxy enabled:", proxyEnabled);
  console.log("Proxy URL:", proxyUrl);
});

// Listen for changes to the proxy settings
chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (changes.enabled) {
    proxyEnabled = changes.enabled.newValue;
    console.log("Proxy enabled changed to:", proxyEnabled);
  }
  if (changes.proxyUrl) {
    proxyUrl = changes.proxyUrl.newValue;
    console.log("Proxy URL changed to:", proxyUrl);
  }
});

// Helper function to determine if a URL should be proxied
function shouldProxy(url) {
  // Don't proxy the proxy itself or common browser URLs
  if (url.startsWith(proxyUrl) || 
      url.startsWith("chrome://") || 
      url.startsWith("chrome-extension://") ||
      url.startsWith("about:") ||
      url.startsWith("data:")) {
    return false;
  }
  return true;
}

// Handle requests
chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (!proxyEnabled || !proxyUrl || !shouldProxy(details.url)) {
      return { cancel: false };
    }

    // Create the proxied URL
    const newUrl = `${proxyUrl}?url=${encodeURIComponent(details.url)}`;
    console.log(`Redirecting ${details.url} to ${newUrl}`);
    
    return { redirectUrl: newUrl };
  },
  {
    urls: ["<all_urls>"],
    types: ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "other"]
  },
  ["blocking"]
);


