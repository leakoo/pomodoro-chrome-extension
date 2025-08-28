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
      <button onClick={toggleDarkMode} className="top-4 left-4 absolute hover:transition-transform duration-150 cursor-pointer ease">
        {theme === "light" ?
          <img width="33" src="./assets/moon.png" className="hover:bg-gray-400/80 p-1 rounded-full rotate-20 hover:-rotate-20 transition" alt="Moon icon" /> :
          <img width="33" src="./assets/sun.png" className="hover:bg-gray-700/80 p-1 rounded-full hover:rotate-45 transition" alt="Sun icon" />
        }
      </button>
    </>
  );
};