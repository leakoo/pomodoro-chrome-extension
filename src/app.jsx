import { useState, useEffect } from "react";
import TimerControls from "./components/timer-controls.jsx";
import TimerDisplay from "./components/timer-display.jsx";
import Mode from "./components/mode.jsx";
import DarkMode from "./components/dark-mode.jsx";

export default function App({ initialData }) {
  const [timeLeft, setTimeLeft] = useState(initialData.timeLeft);
  const [isRunning, setIsRunning] = useState(initialData.isRunning);
  const [mode, setMode] = useState(initialData.mode);
  const [autoStart, setAutoStart] = useState(initialData.autoStart);
  const [theme, setTheme] = useState(initialData.theme);

  // Listen for changes from background.js only updates what has been changed
  useEffect(() => {
    function handleStorageChange(changes, area) {
      if (area === "local") {
        if (changes.timeLeft) setTimeLeft(changes.timeLeft.newValue);
        if (changes.isRunning) setIsRunning(changes.isRunning.newValue);
        if (changes.mode) setMode(changes.mode.newValue);
        if (changes.auto) setAutoStart(changes.auto.newValue);
        if (changes.theme) setTheme(changes.theme.newValue);
      }
    }
    chrome.storage.onChanged.addListener(handleStorageChange);

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange);
    }
  }, []);

  useEffect(() => {
    const htmlTag = document.getElementById("darkmode");

    theme === "dark" ?
      htmlTag.classList.add("dark") : htmlTag.classList.remove("dark");

  }, [theme]);

  return (
    <div className="flex justify-center items-center bg-[#EEE] dark:bg-[#111] px-6 py-8 min-h-screen text-[#111] dark:text-[#EEE]">
      <div>
        <DarkMode
          theme={theme}
        />

        <TimerDisplay
          timeLeft={timeLeft}
        />

        <Mode
          mode={mode}
        />

        <TimerControls
          autoStart={autoStart}
        />
      </div>
    </div>
  )
};