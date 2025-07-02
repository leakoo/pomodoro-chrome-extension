chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === "PLAY_SOUND") {
    try {
      const audio = new Audio(chrome.runtime.getURL("assets/mixkit-digital-quick-tone-2866.mp3"));
      await audio.play();
      sendResponse({ status: "sound played" });
    }
    catch(error) {
      console.error("Audio failed to play", error);
      sendResponse({ status: "error", error: error.message });
    }
    return true;
  }
});