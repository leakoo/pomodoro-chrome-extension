export default function TimerControls() {

  // Send message to background.js to start timer and log any errors
  function handleStart() {
    chrome.runtime.sendMessage({ action: "START_TIMER" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      console.log(res.status);
    });
  };

  // Send message to background.js to reset timer and log any errors
  function handleReset() {
    chrome.runtime.sendMessage({ action: "RESET_TIMER" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      console.log(res.status);
    });
  };

  function handleAutoStart() {
    chrome.runtime.sendMessage({ action: "AUTO_START" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      console.log(res.status);
    });
  }

  return (
    <>
      <button onClick={handleStart}>START</button>
      <button onClick={handleReset}>RESET</button>
      <button onClick={handleAutoStart}>AUTO-START</button>
    </>
  );
};
