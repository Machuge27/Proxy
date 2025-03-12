let proxyEnabled = false;
let proxyUrl = "";
let currentRules = [];

// Initialize settings
chrome.storage.local.get(['enabled', 'proxyUrl'], function(result) {
  proxyEnabled = result.enabled || false;
  proxyUrl = result.proxyUrl || "";
  console.log("Proxy enabled:", proxyEnabled);
  console.log("Proxy URL:", proxyUrl);
  
  if (proxyEnabled && proxyUrl) {
    updateRules();
  }
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
  
  updateRules();
});

// Update the declarativeNetRequest rules
async function updateRules() {
  // Remove existing rules
  if (currentRules.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: currentRules
    });
    currentRules = [];
  }
  
  // If proxy is disabled or URL not set, don't add new rules
  if (!proxyEnabled || !proxyUrl) {
    return;
  }
  
  try {
    // We'll add separate rules for different URL patterns to handle the proxy properly
    const rules = [];
    let ruleId = 1;
    
    // Rule for http URLs
    rules.push({
      id: ruleId++,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          url: `${proxyUrl}?url=http://${encodeURIComponent('*')}`
        }
      },
      condition: {
        urlFilter: "http://*",
        excludedInitiatorDomains: [new URL(proxyUrl).hostname],
        resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", 
                       "font", "object", "xmlhttprequest", "ping", "media", "websocket", "other"]
      }
    });
    
    // Rule for https URLs
    rules.push({
      id: ruleId++,
      priority: 1,
      action: {
        type: "redirect",
        redirect: {
          url: `${proxyUrl}?url=https://${encodeURIComponent('*')}`
        }
      },
      condition: {
        urlFilter: "https://*",
        excludedInitiatorDomains: [new URL(proxyUrl).hostname],
        resourceTypes: ["main_frame", "sub_frame", "stylesheet", "script", "image", 
                       "font", "object", "xmlhttprequest", "ping", "media", "websocket", "other"]
      }
    });
    
    // Add the new rules
    await chrome.declarativeNetRequest.updateDynamicRules({
      addRules: rules
    });
    
    currentRules = rules.map(rule => rule.id);
    console.log("Updated redirect rules", rules);
  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

// Handle requests that can't be redirected by declarativeNetRequest
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
  if (!proxyEnabled || !proxyUrl) return;
  
  // Avoid proxying the proxy itself
  if (details.url.startsWith(proxyUrl)) return;
  
  // Skip browser internal URLs
  if (details.url.startsWith("chrome://") || 
      details.url.startsWith("chrome-extension://") ||
      details.url.startsWith("about:") ||
      details.url.startsWith("data:")) {
    return;
  }
  
  // For URL patterns that can't be handled by the rules
  const encodedUrl = encodeURIComponent(details.url);
  const redirectUrl = `${proxyUrl}?url=${encodedUrl}`;
  
  console.log(`Navigation detected: ${details.url} -> ${redirectUrl}`);
  // Note: We can't redirect here in Manifest V3, but this can help with debugging
});