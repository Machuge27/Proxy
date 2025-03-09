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
  const CATEGORY_CHOICES = [
    'Gospel', 'Secular', 'Romantic', 'Hip-hop', 'Reggae', 'Rhumba',
    'Bongo', 'Educational', 'Entertainment', 'Technology',
    'Science', 'Cooking', 'Other'
  ];
  const statusEl = document.getElementById('status');
  const tabsList = document.getElementById('tabsList');
  const volumeControlEl = document.getElementById('volumeControl');
  let selectedCategory = '';
  let currentVolume = 20;
  let isPlaying = false;

  volumeControlEl.addEventListener('input', function() {
    setVolume(this.value);
  });

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
 * Shows a message in the status element and hides it after a specified duration.
 * @param {string} message - The message to display
 * @param {string} type - The message type ('error' or 'info')
 * @param {number} duration - Duration in milliseconds before hiding (default: 2000)
 */
function showMessage(message, type, duration = 3000) {
  // Prepare the message text with prefix for errors
  statusEl.textContent = type === 'error' ? `Error: ${message}` : message;
  
  // Set appropriate class
  statusEl.className = `${type}-message`;

  //add elevant icon

  if (type === 'error') {
    statusEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>

      <span>${message}</span>
    `;
  } else {
    statusEl.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>

      <span>${message}</span>
    `;

    // statusEl.insertAdjacentElement('afterbegin', statusEl.firstChild);
  }
  
  // Show the message
  statusEl.style.cssText = `
    display: flex;
    flex-direction: row;
    align-items: center; 
`;
  
  // Hide after specified duration
  setTimeout(() => {
    statusEl.style.display = 'none';
  }, duration);
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
        showMessage(error.message || 'Make sure you\'re on a YouTube page', 'error');
      }
    });
  });

  document.getElementById('copyURL').addEventListener('click', async () => {
    try {
      // Query the active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      // Ensure the tab is a YouTube video
      if (!tab || !tab.url.includes('youtube.com/watch')) {
        showMessage('Please open a YouTube video', 'error');
        return;
      }
      
      // Copy the URL to clipboard
      await navigator.clipboard.writeText(tab.url);
      showMessage('Video URL copied to clipboard!', 'info');
      
    } catch (error) {
      console.error('Failed to copy video URL:', error);
      showMessage('Failed to copy URL', 'error');
    }
  });

  const adblockButton = document.getElementById("toggle-adblock");

// Function to update button content
function updateButton(isEnabled) {
    adblockButton.innerHTML = isEnabled
        ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
          </svg> 
          <span>Blocker Enabled</span>`
        : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
          </svg>      
          <span>Blocker Disabled</span>`;
}

// Load stored state initially
chrome.storage.local.get(["adBlockEnabled"], function (data) {
    updateButton(data.adBlockEnabled ?? false);
});

// Listen for storage changes (prevents unnecessary toggles)
chrome.storage.onChanged.addListener((changes) => {
    if (changes.adBlockEnabled) {
        updateButton(changes.adBlockEnabled.newValue);
    }
});

// Toggle ad blocker state
adblockButton.addEventListener("click", function () {
    chrome.storage.local.get(["adBlockEnabled"], function (data) {
        const isEnabled = !data.adBlockEnabled; // Flip state

        // Send message to background (but DO NOT store it here)
        chrome.runtime.sendMessage({ action: "toggleAdBlock", enabled: isEnabled });
    });
});

/**
 * Sets the video volume and displays a message showing the current level
 * @param {string|number} volumeLevel - The volume level (0-100)
 */
function setVolume(volumeLevel) {
  // Convert to number and store current volume
  currentVolume = parseInt(volumeLevel);
  
  // Get the active tab and apply volume
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    try {
      const tab = tabs[0];
      
      // Check if we're on a YouTube page
      if (!tab || !tab.url.includes('youtube.com/watch')) {
        showMessage('Please open a YouTube video', 'error');
        return;
      }
      
      // Execute script to set volume on the YouTube player
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (volume) => {
          const video = document.querySelector('video');
          if (video) {
            // Convert from 0-100 scale to 0-1 scale for HTML5 video
            video.volume = volume / 100;
            return true;
          }
          return false;
        },
        args: [currentVolume]
      });
      
      // Display the volume level message
      showMessage(`Volume set to ${currentVolume}%`, 'info');
      
    } catch (error) {
      console.error('Failed to set volume:', error);
      showMessage('Failed to set volume', 'error');
    }
  });
}

// Get bass control element (you'll need to add this to your HTML)
document.getElementById('bassControl').addEventListener('input', function() {
  setBass(this.value);
});

/**
 * Sets the bass level for the YouTube video using Web Audio API
 * @param {string|number} bassLevel - The bass level (0-100)
 */
function setBass(bassLevel) {
  // Convert to number
  const bassValue = parseInt(bassLevel);
  
  // Get the active tab
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    try {
      const tab = tabs[0];
      
      // Check if we're on a YouTube page
      if (!tab || !tab.url.includes('youtube.com/watch')) {
        showMessage('Please open a YouTube video', 'error');
        return;
      }
      
      // Execute script to set bass level on the YouTube player
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: (bass) => {
          // This function runs in the context of the YouTube page
          try {
            // Check if our audio context already exists
            if (!window.ytBassAudioContext) {
              // Create audio context and nodes if they don't exist
              const video = document.querySelector('video');
              if (!video) return false;
              
              // Create audio context
              const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              
              // Create source from video element
              const source = audioCtx.createMediaElementSource(video);
              
              // Create bass boost filter (low shelf)
              const bassFilter = audioCtx.createBiquadFilter();
              bassFilter.type = 'lowshelf';
              bassFilter.frequency.value = 150; // Adjust frequency for bass
              
              // Connect the nodes: source -> bass filter -> destination
              source.connect(bassFilter);
              bassFilter.connect(audioCtx.destination);
              
              // Store references globally on the window object
              window.ytBassAudioContext = audioCtx;
              window.ytBassFilter = bassFilter;
              
              console.log('Bass control initialized');
            }
            
            // Set the bass boost gain
            // Convert 0-100 to a range appropriate for bass boost (e.g., -10 to 10 dB)
            const bassGain = (bass - 50) / 5; // Results in -10 to +10 dB
            window.ytBassFilter.gain.value = bassGain;
            
            return true;
          } catch (error) {
            console.error('Bass adjustment error:', error);
            return false;
          }
        },
        args: [bassValue]
      });
      
      // Display the bass level message
      showMessage(`Bass level set to ${bassValue}%`, 'info');
      
    } catch (error) {
      console.error('Failed to set bass level:', error);
      showMessage('Failed to set bass level', 'error');
    }
  });
}

document.getElementById('mark').addEventListener('click', async () => {
  try {
    // Query the active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    // Ensure the tab is a YouTube video
    if (!tab || !tab.url.includes('youtube.com/watch')) {
      showMessage('Please open a YouTube video', 'error');
      return;
    }
    
    // Open modal first to get category
    openModal();
    
    // The actual marking process will continue after category selection
  } catch (error) {
    console.error('Failed to initialize marking process:', error);
    showMessage('Failed to mark video', 'error');
  }
});

// Open modal window for category selection
function openModal() {
  const modal = document.getElementById("categoryModal");
  modal.style.display = "grid";
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  populateCategories();
}

// Close modal window
function closeModal() {
  document.getElementById("categoryModal").style.display = "none";
}

// Populate the categories in the modal
function populateCategories() {
  const categoryList = document.getElementById("categoryList");
  categoryList.innerHTML = "";
  
  CATEGORY_CHOICES.forEach(category => {
    const btn = document.createElement("button");
    btn.classList.add("category-btn");
    btn.textContent = category;
    btn.onclick = () => {
      selectedCategory = category;
      continueMarkingProcess();
      closeModal();
    };
    categoryList.appendChild(btn);
  });
  
  document.querySelector(".close-btn").onclick = closeModal;

}

// Continue the marking process after category selection
async function continueMarkingProcess() {
  try {
    // Query the active tab again to ensure it's still active
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url.includes('youtube.com/watch')) {
      showMessage('Please open a YouTube video', 'error');
      return;
    }
    
    // Execute script to extract video details from the YouTube page
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        try {
          // Get video URL
          const url = window.location.href;
          
          // Get video title
          const title = document.querySelector('h1.ytd-video-primary-info-renderer')?.textContent.trim() || 
                       document.title.replace(' - YouTube', '');
          
          // Get video duration
          let duration = '';
          const durationElement = document.querySelector('.ytp-time-duration');
          if (durationElement) {
            duration = durationElement.textContent;
          }
          
          // Get video ID from URL
          const urlParams = new URLSearchParams(window.location.search);
          const videoId = urlParams.get('v');
          
          // Get current timestamp
          const currentTime = document.querySelector('.ytp-time-current')?.textContent || '0:00';
          
          // Get channel name
          const channelName = document.querySelector('#owner #text')?.textContent.trim() || 
                             document.querySelector('#channel-name')?.textContent.trim() || '';
          
          return {
            success: true,
            data: {
              url,
              title,
              videoId,
              duration,
              currentTime,
              channelName,
              savedAt: new Date().toISOString()
            }
          };
        } catch (error) {
          return {
            success: false,
            error: error.toString()
          };
        }
      }
    });
    
    // Extract the data from the execution results
    const videoData = results[0].result;
    
    if (!videoData || !videoData.success) {
      throw new Error(videoData?.error || 'Failed to extract video data');
    }
    
    // Add the selected category to the video data
    videoData.data.category = selectedCategory;
    
    // Log the data that would be sent to backend
    console.log('Video data captured:', videoData.data);

    // Send the data to the backend
    const response = await saveVideo(videoData);
      
    // Show success message
    showMessage(response.message || 'Video marked successfully!', 'info');
    
    // Change button style to indicate the video is marked
    const markButton = document.getElementById('mark');
    markButton.classList.add('marked');
    markButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>

    `;
    setTimeout(() => {
      markButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
        </svg>
      `;
      markButton.classList.remove('marked');
    }, 2000);
    
  } catch (error) {
    console.error('Failed to mark video:', error);
    showMessage(`Failed to mark video: ${error.message}`, 'error');
  }
}

// Function to send video data to backend
async function saveVideo(videoData) {
  
  try {
    // For production, change this URL to your actual backend
    const API_URL = 'http://192.168.100.6:8000/mark/';
      
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData.data)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with ${response.status}: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error saving video:", error);
    throw new Error(`Error saving video: ${error.message}`);
  }
}

      /*!SECTION
      {
    "channelName": "Music Channel",
    "currentTime": "02:15",
    "duration": "03:45",
    "savedAt": "2025-03-09T01:57:00Z",
    "title": "Title",
    "url": "https://www.example.com/test-song",
    "videoId": "abc023xyz",
    "category": "Gospel"
}
      */

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
  info.textContent = `${year} is ${progress.toFixed(2)}% complete!`;
  dateText.textContent = now.toDateString();
  //progressBarInner.textContent = progress.toFixed(2) + '%';
}

updateProgressBar();

