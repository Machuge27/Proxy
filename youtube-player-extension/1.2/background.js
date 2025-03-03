
// background.js
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