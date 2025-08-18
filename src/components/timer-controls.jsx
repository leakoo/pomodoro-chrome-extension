export default function TimerControls({ autoStart }) {

  // Send message to background.js to start timer and log any errors
  function handleStart() {
    chrome.runtime.sendMessage({ action: "START_TIMER" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
    });
  };

  // Send message to background.js to reset timer and log any errors
  function handleReset() {
    chrome.runtime.sendMessage({ action: "RESET_TIMER" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
    });
  };

  // Send message to background.js to auto start and log any errors
  function handleAutoStart() {
    chrome.runtime.sendMessage({ action: "AUTO_START" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
    });
  }

  return (
    <div className="flex flex-col text-lg">
      <div className="flex justify-center gap-3 pb-2">
        <button onClick={handleStart} className="bg-gradient-to-r from-red-500 via-rose-900 to-rose-500 p-2 px-6 rounded-full font-bold text-neutral-50 text-sm cursor-pointer">START</button>
        <button onClick={handleReset} className="p-2 px-6 border-2 rounded-full font-bold text-sm cursor-pointer">RESET</button>
      </div>

      <div className="flex justify-center">
        <button onClick={handleAutoStart} className="pt-3 text-base cursor-pointer">
          {autoStart === false ? <p className="text-red-500">AUTO-START</p> : <p className="text-green-500">AUTO-START</p>}
        </button>
      </div>
    </div>
  );
};
