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
        <button onClick={handleStart} className="bg-gradient-to-r from-red-500 via-rose-900 to-rose-500 px-6 py-2 rounded-full font-bold text-neutral-50 text-sm active:scale-95 transition-all hover:-translate-y-0.5 duration-200 cursor-pointer transform">START</button>
        <button onClick={handleReset} className="px-6 py-2 border border-gray-600 rounded-full font-bold text-sm active:scale-95 transition-all hover:-translate-y-0.5 duration-200 cursor-pointer transform">RESET</button>
      </div>

      <div className="flex justify-center">
        <button onClick={handleAutoStart} className="pt-3 text-base cursor-pointer">
          {autoStart === false ? <p className="text-red-500">AUTO-START</p> : <p className="text-green-500">AUTO-START</p>}
        </button>
      </div>
    </div>
  );
};
