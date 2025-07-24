import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './app.jsx';

// Fetch stored state before React mounts for instant render
chrome.storage.local.get(["timeLeft", "isRunning", "mode", "auto", "theme"], (res) => {
  const initialData  = {
    timeLeft: res.timeLeft ?? 25 * 60,
    isRunning: res.isRunning ?? false,
    mode: res.mode ?? "Work",
    autoStart: res.auto ?? false,
    theme: res.theme ?? "light"
  }

  createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App initialData ={initialData } />
  </StrictMode>,
  );
});