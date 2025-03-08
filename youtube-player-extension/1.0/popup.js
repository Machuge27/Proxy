document.addEventListener('DOMContentLoaded', function() {
    const buttons = {
      'playPause': 'Toggle play/pause',
      'speedUp': 'Increase speed',
      'speedDown': 'Decrease speed',
      'skipForward': 'Skip forward',
      'skipBackward': 'Skip backward',
      'prevVideo': 'Previous video',
      'nextVideo': 'Next video'
    };
  
    const statusEl = document.getElementById('status');
  
    Object.entries(buttons).forEach(([id, action]) => {
      document.getElementById(id).addEventListener('click', async () => {
        try {
          const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
          if (!tab) {
            throw new Error('No active tab found');
          }
  
          const response = await chrome.tabs.sendMessage(tab.id, {action: id});
          if (response.success) {
            statusEl.textContent = `Success: ${action}`;
          } else {
            statusEl.textContent = `Error: ${response.error}`;
          }
        } catch (error) {
          statusEl.textContent = 'Error: Make sure you\'re on a YouTube page';
        }
      });
    });
  });