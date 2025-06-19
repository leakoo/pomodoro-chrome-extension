// State variables
let timeLeft = 10;
let isRunning = false;
let mode = "work";

const workDuration = 10;
const breakDuration = 5;

// Stores ID of the running interval to clear it later
let timerID = null;

function updateStorage() {
  // Save current state to local storage
  chrome.storage.local.set({ timeLeft, isRunning, mode });
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
      setTimeout(() => {
        if (mode === "work") {
          mode = "break";
          timeLeft = breakDuration;
        }
        else {
          mode = "work";
          timeLeft = workDuration;
        }
        updateStorage();
      }, 1000)
    }
  }, 1000)
};

// Listen for messages from other files
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "START_TIMER") {
    startTimer();
    sendResponse({ status: "started" });
    return true;
  }
});