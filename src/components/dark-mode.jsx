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
          <img src="./assets/moon.png" className="top-4 left-4 absolute rotate-20 hover:-rotate-20 hover:transition-transform duration-150 cursor-pointer transistion ease" alt="Moon icon"/> : 
          <img src="./assets/sun.png" className="top-4 left-4 absolute hover:rotate-45 hover:transition-transform duration-150 cursor-pointer transistion ease" alt="Sun icon"/>
        }
      </button>
    </>
  );
};