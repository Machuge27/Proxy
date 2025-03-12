document.addEventListener('DOMContentLoaded', function() {
  const enabledCheckbox = document.getElementById('enabled');
  const proxyUrlInput = document.getElementById('proxyUrl');
  const saveButton = document.getElementById('save');
  const statusDiv = document.getElementById('status');
  
  // Load saved settings
  chrome.storage.local.get(['enabled', 'proxyUrl'], function(result) {
    enabledCheckbox.checked = result.enabled || false;
    proxyUrlInput.value = result.proxyUrl || '';
    updateStatus(result.enabled);
  });
  
  // Save settings
  saveButton.addEventListener('click', function() {
    const enabled = enabledCheckbox.checked;
    const proxyUrl = proxyUrlInput.value.trim();
    
    if (enabled && !proxyUrl) {
      alert('Please enter a proxy URL');
      return;
    }
    
    chrome.storage.local.set({
      enabled: enabled,
      proxyUrl: proxyUrl
    }, function() {
      console.log('Settings saved');
      updateStatus(enabled);
    });
  });
  
  function updateStatus(enabled) {
    if (enabled) {
      statusDiv.textContent = 'Proxy is currently enabled';
      statusDiv.className = 'status active';
    } else {
      statusDiv.textContent = 'Proxy is currently disabled';
      statusDiv.className = 'status inactive';
    }
  }
});