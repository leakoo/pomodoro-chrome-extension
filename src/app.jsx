import { useState, useEffect } from "react";

export default function App() {
  const workDuration = 10;
  const breakDuration = 5;

  const [timeLeft, setTimeLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");

  useEffect(() => {
    const interval = setInterval (() => {
      chrome.storage.local.get(["timeLeft", "isRunning", "mode"], (res) => {
        if (res.timeLeft !== undefined) setTimeLeft(res.timeLeft);
        if (res.isRunning !== undefined) setIsRunning(res.isRunning);
        if (res.mode !== undefined) setMode(res.mode);
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  function handleStart() {
    chrome.runtime.sendMessage({ action: "START_TIMER"}, (res) => {
      if (res?.status === "started") {
        console.log("Timer started");
      } 
      else if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        return;
      }
      console.log(res.status)
    });
  };

  return (
    <>
      <h1>{timeLeft}</h1>
      <h1>{mode}</h1>
      <button onClick={handleStart}>START</button>
    </>
  )
};