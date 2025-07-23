import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app.jsx';

chrome.storage.local.get(["timeLeft", "isRunning", "mode", "auto", "theme"], (res) => {
  const initialData  = {
    timeLeft: res.timeLeft ?? 25 * 60,
    isRunning: res.isRunning ?? false,
    mode: res.mode ?? "Work",
    autoStart: res.auto ?? false,
    theme: res.theme ?? "light"
  }

  if (initialData.theme === "dark") {
    document.getElementById("darkmode").classList.add("dark");
  };

  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialData ={initialData } />
  </StrictMode>,
  );
});