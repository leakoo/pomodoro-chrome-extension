export default function DarkMode({ theme }) {
  
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
      <button onClick={toggleDarkMode} className="">
        {theme === "light" ? 
          <img src="./assets/moon.png" className="top-4 left-4 absolute cursor-pointer" alt="Moon icon"/> : 
          <img src="./assets/sun.png" className="top-4 left-4 absolute cursor-pointer" alt="Sun icon"/>
        }
      </button>
    </>
  );
};