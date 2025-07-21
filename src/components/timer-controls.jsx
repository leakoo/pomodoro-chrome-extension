export default function TimerControls({ autoStart }) {

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

  // Send message to background.js to auto start and log any errors
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
    <div className="flex flex-col text-lg">
      <div className="flex justify-center gap-3 pb-2">
        <button onClick={handleStart} className="p-1 pr-4 pl-4 border-2 rounded-xl active:text-[1.05rem] cursor-pointer">START</button>
        <button onClick={handleReset} className="p-1 pr-4 pl-4 border-2 rounded-xl active:text-[1.05rem] cursor-pointer">RESET</button>
      </div>

      <div className="flex justify-center">
        <button onClick={handleAutoStart} className="cursor-pointer">
          {autoStart === false ? <p className="text-red-500">AUTO-START</p> : <p className="text-green-500">AUTO-START</p>}
        </button>
      </div>
    </div>
  );
};
