import { useState, useEffect } from "react";
import TimerControls from "./components/timer-controls.jsx";
import TimerDisplay from "./components/timer-display.jsx";
import Mode from "./components/mode.jsx";
import DarkMode from "./components/dark-mode.jsx";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Work");
  const [autoStart, setAutoStart] = useState(false);
  const [theme, setTheme] = useState("light");

  // Get updated state from background.js every 100ms to keep everything in sync
  useEffect(() => {
    const interval = setInterval (() => {
      chrome.storage.local.get(["timeLeft", "isRunning", "mode", "auto", "theme"], (res) => {
        // If result is not undefined update state
        setTimeLeft(res.timeLeft ?? 10);
        setIsRunning(res.isRunning ?? false);
        setMode(res.mode ?? "Work");        
        setAutoStart(res.auto ?? false);
        setTheme(res.theme ?? "light");
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const htmlTag = document.getElementById("darkmode");

    if (theme === "dark") {
      htmlTag.classList.add("dark");
    }
    else htmlTag.classList.remove("dark");

  }, [theme]);

  return (
    <div className="flex justify-center items-center bg-[#EEE] dark:bg-[#111] p-6 min-h-screen text-[#111] dark:text-[#EEE]">
      <div className="p-2 w-full">
        <DarkMode />

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