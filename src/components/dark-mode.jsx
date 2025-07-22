export default function DarkMode() {
  
  function toggleDarkMode() {
    chrome.runtime.sendMessage({ action: "TOGGLE_DARK_MODE" }, (res) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
    });
  };

  return (
    <>
      <button onClick={toggleDarkMode} className="">TOGGLE</button>
    </>
  );
};