export default function TimerControls() {

  function handleStart() {
    chrome.runtime.sendMessage({ action: "START_TIMER" }, (res) => {
      if (res?.status === "started") {
        console.log("Timer started");
      } 
      else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      console.log(res.status);
    });
  };

  return (
    <>
      <button onClick={handleStart}>START</button>
    </>
  );
};
