let time = 1500; // 25 minutes in seconds
let timer;
let running = false;

let level = 1;
let xp = 0;
let sessions = 0;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const xpEl = document.getElementById("xp");
const levelEl = document.getElementById("level");
const sessionsEl = document.getElementById("sessions");
const avatarEl = document.getElementById("avatar");

function updateDisplay() {
  const mins = Math.floor(time / 60);
  const secs = time % 60;
  timeDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function tick() {
  if (time > 0) {
    time--;
    updateDisplay();
  } else {
    clearInterval(timer);
    running = false;
    gainXP(10);
    sessions++;
    sessionsEl.textContent = sessions;
    time = 1500;
    updateDisplay();
    alert("Session Complete! XP +10");
  }
}

function startTimer() {
  if (!running) {
    timer = setInterval(tick, 1000);
    running = true;
  }
}

function pauseTimer() {
  clearInterval(timer);
  running = false;
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  time = 1500;
  updateDisplay();
}

function gainXP(amount) {
  xp += amount;
  if (xp >= 50) {
    xp -= 50;
    level++;
    levelEl.textContent = level;
    updateAvatar();
  }
  xpEl.textContent = xp;
}

function updateAvatar() {
  if (level >= 10) {
    avatarEl.textContent = "🧝‍♂️";
  } else if (level >= 5) {
    avatarEl.textContent = "🧙‍♂️";
  } else {
    avatarEl.textContent = "🧑‍🌾";
  }
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateDisplay(); // Initialize timer display
