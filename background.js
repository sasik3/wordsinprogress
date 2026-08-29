chrome.action.onClicked.addListener(async () => {
  const url = chrome.runtime.getURL("wip.html");

  try {
    // Check if it's already open in some tab
    const tabs = await chrome.tabs.query({ url });

    if (tabs.length > 0) {
      const tab = tabs[0];
      // Focus the existing tab and its window
      await chrome.tabs.update(tab.id, { active: true });
      await chrome.windows.update(tab.windowId, { focused: true });
    } else {
      await chrome.tabs.create({ url });
    }
  } catch (err) {
    console.error("Failed to open/focus wip.html:", err);
  }
});