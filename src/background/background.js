// State variables
let timeLeft = 25 * 60;
let isRunning = false;
let mode = "work";
let auto = false;

const workDuration = 25 * 60;
const breakDuration = 5 * 60;

// Stores ID of the running interval to clear it later
let timerID = null;

function updateStorage() {
  // Save current state to local storage
  chrome.storage.local.set({ timeLeft, isRunning, mode, auto });
};

function startTimer() {
  // Exit early if timer is running or interval exists
  if (isRunning || timerID) return;
  isRunning = true;
  updateStorage();
  
  // Start interval to count down every second
  timerID = setInterval(() => {
    timeLeft--;
    updateStorage();

    // When countdown reaches 0
    if (timeLeft <= 0) {      
      clearInterval(timerID);  // Stop interval
      timerID = null;          // Clear interval ID
      isRunning = false;
     
      // Wait 1 second before swithcing modes and resetting timer
      setTimeout(async() => {
        if (mode === "work") {
          mode = "break";
          timeLeft = breakDuration;
        }
        else {
          mode = "work";
          timeLeft = workDuration;
        }

        // Load offscreen.html before sending message to play sound
        await ensureOffscreenPage();
        chrome.runtime.sendMessage({ action: "PLAY_SOUND" });

        // Start timer instantlyt if auto is toggled on
        if (auto) {
          startTimer();
        }

        updateStorage();
      }, 1000)
    }
  }, 1000)
};

function resetTimer() {
  // Clear/Stop interval and reset isRunning
  clearInterval(timerID);
  timerID = null;
  isRunning = false;

  // Reset time based on current mode
  if (mode === "work") {
    timeLeft = workDuration;
  }
  else timeLeft = breakDuration;

  updateStorage();
};

function autoStart() {
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
    autoStart();
    sendResponse({ status: "auto" });
    return true;
  }
});