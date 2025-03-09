let video = document.getElementById('pipVideo');
let originalTab = null;

// Set up controls
const controls = document.querySelector('.pip-controls');
const buttons = [
  { id: 'play', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>' },
  { id: 'mute', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>' },
  { id: 'speed', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>' },
  { id: 'close', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' }
];

buttons.forEach(({ id, svg }) => {
  const button = document.createElement('button');
  button.className = 'pip-button';
  button.innerHTML = svg;
  button.onclick = handleControlClick.bind(null, id);
  controls.appendChild(button);
});

function handleControlClick(action) {
  chrome.tabs.sendMessage(originalTab, { action });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === 'VIDEO_DATA') {
    originalTab = sender.tab.id;
    video.src = message.videoUrl;
    video.currentTime = message.currentTime;
    video.play();
  }
});