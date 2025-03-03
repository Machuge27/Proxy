document.addEventListener('DOMContentLoaded', function () {
  const buttons = {
    'playPause': 'Toggle play/pause',
    'mute': 'Toggle mute',
    'speedUp': 'Increase speed',
    'speedDown': 'Decrease speed',
    'skipForward': 'Skip forward',
    'skipBackward': 'Skip backward',
    'prevVideo': 'Previous video',
    'nextVideo': 'Next video',
    'togglePiP': 'Toggle Picture-in-Picture'
  };

  const statusEl = document.getElementById('status');
  const tabsList = document.getElementById('tabsList');
  let isPlaying = false;

  /**
   * Updates the play/pause icon state.
   */
  async function updatePlayPauseIcon() {
    const playIcon = document.querySelector('.play-icon');
    const pauseIcon = document.querySelector('.pause-icon');

    if (isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = 'block';
    } else {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
  }

  /**
   * Shows the error message in the status element and hides it after 2 seconds.
   * @param {string} message - The error message to display.
   */
  function showError(message) {
    statusEl.textContent = `Error: ${message}`;
    statusEl.style.display = 'block'; // Ensure it is visible
    setTimeout(() => {
      statusEl.style.display = 'none'; // Hide after 2 seconds
    }, 2000);
  }

  /**
   * Pauses video in the given tab.
   * @param {number} tabId - The ID of the tab where the video should be paused.
   */
  async function pauseVideo(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, { action: 'pauseVideo' });
    } catch (error) {
      console.error(`Failed to pause video in tab ${tabId}:`, error);
    }
  }

  /**
   * Plays video in the given tab.
   * @param {number} tabId - The ID of the tab where the video should be played.
   */
  async function playVideo(tabId) {
    try {
      await chrome.tabs.sendMessage(tabId, { action: 'playVideo' });
    } catch (error) {
      console.error(`Failed to play video in tab ${tabId}:`, error);
    }
  }

  /**
   * Loads and displays the YouTube tabs, with added functionality to switch tabs.
   */
  async function loadYoutubeTabs() {
    const tabs = await chrome.tabs.query({ url: '*://*.youtube.com/*' });
    tabsList.innerHTML = '';
    if (tabs.length > 0) {
      tabs.forEach(tab => {
        const tabItem = document.createElement('div');
        tabItem.className = 'tab-item';

        const title = document.createElement('div');
        title.className = 'tab-title';
        title.textContent = tab.title;

        const controls = document.createElement('div');
        controls.className = 'tab-controls';

        const switchBtn = document.createElement('button');
        switchBtn.title = 'Switch';
        switchBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>

        `;
        switchBtn.onclick = async () => {
          const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
          if (activeTab) {
            // Pause video in the currently active tab
            await pauseVideo(activeTab.id);
          }
          // Switch to the new tab and play video
          await chrome.tabs.update(tab.id, { active: true });
          await playVideo(tab.id);
        };

        const closeBtn = document.createElement('button');
        closeBtn.title = 'Close';
        closeBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>

        `;
        closeBtn.onclick = () => chrome.tabs.remove(tab.id);

        const tabButtons = document.createElement('div');
        tabButtons.className = 'tab-btns';

        tabButtons.appendChild(switchBtn);
        tabButtons.appendChild(closeBtn);
        controls.appendChild(tabButtons);
        tabItem.appendChild(title);
        tabItem.appendChild(controls);
        tabsList.appendChild(tabItem);
      });
    } else {
      tabsList.style.border = 'none';
      const noTabs = document.createElement('div');
      noTabs.textContent = 'No YouTube tabs found';
      tabsList.appendChild(noTabs);
    }
  }

  loadYoutubeTabs();
  setInterval(loadYoutubeTabs, 5000);

  Object.entries(buttons).forEach(([id, action]) => {
    document.getElementById(id).addEventListener('click', async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) {
          throw new Error('No active tab found');
        }

        if (id === 'playPause') {
          isPlaying = !isPlaying;
          updatePlayPauseIcon();
        }

        const response = await chrome.tabs.sendMessage(tab.id, { action: id });
        if (!response.success) {
          throw new Error(response.error);
        }
      } catch (error) {
        showError(error.message || 'Make sure you\'re on a YouTube page');
      }
    });
  });

  document.getElementById('copyURL').addEventListener('click', async () => {
    try {
      // Query the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      // Ensure the tab is a YouTube video
      if (!tab || !tab.url.includes('youtube.com/watch')) {
        alert('Please open a YouTube video.');
        return;
      }
  
      // Copy the URL to clipboard
      await navigator.clipboard.writeText(tab.url);
      alert('Video URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy video URL:', error);
    }
  });

});

function updateProgressBar() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const end = new Date(now.getFullYear() + 1, 0, 1);
  const progress = ((now - start) / (end - start)) * 100;
  const year = now.getFullYear();

  const progressBarInner = document.getElementById('progress-bar-inner');
  const info = document.querySelector('.y-info');
  const dateText = document.querySelector('.date');
  progressBarInner.style.width = progress + '%';
  info.textContent = `${year} is ${progress.toFixed(2)}% complete`;
  dateText.textContent = now.toDateString();
  //progressBarInner.textContent = progress.toFixed(2) + '%';
}

updateProgressBar();
