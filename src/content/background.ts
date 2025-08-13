chrome.commands.onCommand.addListener((command) => {
  if (command === "activate-picker") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0 && tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          files: ["scripts/picker.js"] // 编译后的 JS 文件
        });
      }
    });
  }
});
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === "openPopupAndSendColor") {
    await chrome.storage.local.set({ lastPickedColor: message.color });

    // 打开 popup（需要 Chrome 114+）
    await chrome.action.openPopup();
    chrome.runtime.sendMessage({ type: "colorPicked", color: message.color });
  }
});