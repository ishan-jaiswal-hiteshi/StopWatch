let timerDisplay = document.getElementById("timer");
let lapsContainer = document.getElementById("laps");
let startStopBtn = document.getElementById("startStopBtn");
let lapResetBtn = document.getElementById("lapResetBtn");

let timerInterval;
let elapsedTime = 0;
let running = false;

function formatTime(time) {
  let date = new Date(time);
  let minutes = String(date.getMinutes()).padStart(2, "0");
  let seconds = String(date.getSeconds()).padStart(2, "0");
  let milliseconds = String(Math.floor(date.getMilliseconds() / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${milliseconds}`;
}

function updateTimer() {
  elapsedTime += 10;
  timerDisplay.textContent = formatTime(elapsedTime);
}

startStopBtn.addEventListener("click", () => {
  if (running) {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Reset";
  } else {
    timerInterval = setInterval(updateTimer, 10);
    startStopBtn.textContent = "Stop";
    lapResetBtn.textContent = "Lap";
  }
  running = !running;
  lapResetBtn.disabled = false;
});

lapResetBtn.addEventListener("click", () => {
  if (running) {
    let lapTime = document.createElement("div");
    lapTime.textContent = formatTime(elapsedTime);
    lapsContainer.appendChild(lapTime);
  } else {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timerDisplay.textContent = "00:00:00";
    lapsContainer.innerHTML = "";
    lapResetBtn.disabled = true;
  }
});
