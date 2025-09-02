// State variables
let timeLeft = 25 * 60;
let isRunning = false;
let mode = "Work";
let auto = false;
let modeCount = 0;
let theme = "light";

restoreState();

const workDuration = 25 * 60;
const breakDuration = 5 * 60;
const longBreakDuration = 15 * 60;

let timerID = null;

function updateStorage() {
  // Save current state to local storage
  chrome.storage.local.set({ timeLeft, isRunning, mode, modeCount, auto, theme });
};

// Fetch and update to old states after browser close or service worker idle
function restoreState() {
  chrome.storage.local.get(["timeLeft", "mode", "modeCount", "auto", "theme"], (res) => {
    timeLeft = res.timeLeft ?? workDuration;
    mode = res.mode ?? "Work";
    modeCount = res.modeCount ?? 0;
    auto = res.auto ?? false;
    theme = res.theme ?? "light";
  });
}

function startTimer() {
  // Exit early if timer is running or interval exists
  if (isRunning || timerID) return;
  isRunning = true;
  updateStorage();

  timerID = setInterval(() => {
    timeLeft--;
    updateStorage();

    // Seperate time format to timer-display to show time even when popup is closed
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft - minutes * 60;
    const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    // Display time left even when popup is closed
    chrome.action.setBadgeText({ text: formattedTime });
    chrome.action.setBadgeBackgroundColor({ color: "#DD2E44" });
    chrome.action.setBadgeTextColor({ color: "#FFF" });

    if (timeLeft <= 0) {
      clearInterval(timerID);  // Stop interval
      timerID = null;          // Clear interval ID
      isRunning = false;

      // Wait 1 second before swithcing modes and resetting timer
      setTimeout(async () => {
        if (modeCount === 7) {
          mode = "Long Break";
          timeLeft = longBreakDuration;
          modeCount = 0;
        }
        else if (mode === "Work") {
          mode = "Break";
          timeLeft = breakDuration;
          modeCount++;
        }
        else {
          mode = "Work";
          timeLeft = workDuration;
          modeCount++;
        }

        // Load offscreen.html before sending message to play sound
        await ensureOffscreenPage();
        chrome.runtime.sendMessage({ action: "PLAY_SOUND" });

        if (auto) {
          startTimer();
        }

        updateStorage();
      }, 1000)
    }
  }, 1000)
};

function resetTimer() {
  clearInterval(timerID);
  timerID = null;
  isRunning = false;

  // Reset time based on current mode
  if (mode === "Work") {
    timeLeft = workDuration;
  }
  else if (mode === "Break") {
    timeLeft = breakDuration
  }
  else timeLeft = longBreakDuration;

  updateStorage();
};

function toggleAutoStart() {
  // Toggle auto start state on/off 
  if (auto) {
    auto = false;
  }
  else auto = true;

  updateStorage();
};

async function ensureOffscreenPage() {
  // Check if offscreen is already loaded and exit if it does
  const exists = await chrome.offscreen.hasDocument();
  if (exists) return;

  // Create offscreen if one isnt loaded already
  await chrome.offscreen.createDocument({
    url: "offscreen/offscreen.html",
    reasons: ["AUDIO_PLAYBACK"],
    justification: "Play audio when pomodoro timer ends",
  });
};

function updateThemeState() {
  if (theme === "light") {
    theme = "dark";
  }
  else if (theme === "dark") {
    theme = "light";
  }
  updateStorage();
}

// Listen for messages from other files
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("background received message:", message.action);
  if (message.action === "START_TIMER") {
    startTimer();
    sendResponse({ status: "started" });
    return true;
  }
  else if (message.action === "RESET_TIMER") {
    resetTimer();
    sendResponse({ status: "reset" });
    return true;
  }
  else if (message.action === "AUTO_START") {
    toggleAutoStart();
    sendResponse({ status: "auto" });
    return true;
  }
  else if (message.action === "UPDATE_BADGE") {
    chrome.action.setBadgeText({ text: message.time });
    sendResponse({ status: "updated" });
    return true;
  }
  else if (message.action === "TOGGLE_DARK_MODE") {
    updateThemeState();
    sendResponse({ status: "darkmode toggled" });
    return true;
  }
});