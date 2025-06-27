import { useState, useEffect } from "react";
import TimerControls from "./components/timer-controls.jsx";
import TimerDisplay from "./components/timer-display.jsx";
import Mode from "./components/mode.jsx";

export default function App() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [autoStart, setAutoStart] = useState(false);

  // Get updated state from background.js every 100ms to keep everything in sync
  useEffect(() => {
    const interval = setInterval (() => {
      chrome.storage.local.get(["timeLeft", "isRunning", "mode", "auto"], (res) => {
        // If result is not undefined update state
        if (res.timeLeft !== undefined) setTimeLeft(res.timeLeft);
        if (res.isRunning !== undefined) setIsRunning(res.isRunning);
        if (res.mode !== undefined) setMode(res.mode);
        if (res.auto !== undefined) setAutoStart(res.auto);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TimerDisplay
        timeLeft={timeLeft}
      />

      <Mode
        mode={mode}
      />
      
      <TimerControls
        autoStart={autoStart} 
      />
    </>
  )
};