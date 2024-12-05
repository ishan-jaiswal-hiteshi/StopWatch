// Getting all the element from HTML
const timerEl = document.getElementById("timer");
const lapsEl = document.getElementById("laps");
const startStopBtn = document.getElementById("startStop");
const lapResetBtn = document.getElementById("lapReset");

// Timer is a counter
// elapsedTime is time completed or current time to show
// running is bool var
let timer, elapsedTime = 0, running = false, lapArr = [];

// This is used to format time from counter to sec, min, hr
const formatTime = ms => {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, "0");
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, "0");
  return `${minutes}:${seconds}:${centiseconds}`;
};

// To increment timer
const updateTimer = () => {
  elapsedTime += 10;
  timerEl.textContent = formatTime(elapsedTime);
};

// Check for start/stop btn
startStopBtn.addEventListener("click", () => {
  if (running && elapsedTime > 0) {
    clearInterval(timer);
    startStopBtn.textContent = "Resume";
    lapResetBtn.textContent = "Reset";
  } else if (running) {
    clearInterval(timer);
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Reset";
  } else {
    // setInterval to update timer every 10ms
    timer = setInterval(updateTimer, 10);
    startStopBtn.textContent = "Pause";
    lapResetBtn.textContent = "Lap";
  }
  running = !running;
  lapResetBtn.disabled = false;
});

// Check for lap/reset button
lapResetBtn.addEventListener("click", () => {
  if (running) {
    const lap = document.createElement("div");
    lap.textContent = formatTime(elapsedTime);
    
    //To print in reverse order
    lapArr.unshift(lap); 
    lapsEl.innerHTML = "";
    lapArr.forEach(lap => {
      lapsEl.appendChild(lap);
    });

  } else {
    clearInterval(timer);
    elapsedTime = 0;
    timerEl.textContent = "00:00:00";
    lapsEl.innerHTML = "";
    lapArr = [];
    lapResetBtn.disabled = true;
    startStopBtn.textContent = "Start";
    lapResetBtn.textContent = "Lap";
  }
});
