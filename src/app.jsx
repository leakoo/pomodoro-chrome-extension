import { useState, useEffect } from "react";
import TimerControls from "./components/timer-controls.jsx";

export default function App() {
  const workDuration = 10;
  const breakDuration = 5;

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");

  // Get updated state from background.js every 100ms to keep everything in sync
  useEffect(() => {
    const interval = setInterval (() => {
      chrome.storage.local.get(["timeLeft", "isRunning", "mode"], (res) => {
        // If result is not undefined update state
        if (res.timeLeft !== undefined) setTimeLeft(res.timeLeft);
        if (res.isRunning !== undefined) setIsRunning(res.isRunning);
        if (res.mode !== undefined) setMode(res.mode);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>{timeLeft}</h1>
      <h1>{mode}</h1>
      
      <TimerControls />
    </>
  )
};