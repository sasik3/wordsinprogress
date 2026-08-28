chrome.action.onClicked.addListener(async () => {
  const url = chrome.runtime.getURL("home.html");

  // Check if it's already open in some tab
  const tabs = await chrome.tabs.query({ url });
  if (tabs.length > 0) {
    // Focus the existing tab instead of opening a new one
    chrome.tabs.update(tabs[0].id, { active: true });
    chrome.windows.update(tabs[0].windowId, { focused: true });
  } else {
    chrome.tabs.create({ url });
  }
});