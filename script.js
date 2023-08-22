let focusBtn = document.getElementById("focusBtn");
let shortBreak = document.getElementById("shortBreak");
let longBreak = document.getElementById("longBreak");
let pauseBtn = document.getElementById("pauseBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let time = document.getElementById("time");
let count = 59;
let minCount = 24;
let active = "focus";
let paused = true;
let buttons = document.querySelectorAll(".btn");
let activeBtn;
let set;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

resetBtn.addEventListener(
  "click",
  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);

const removeFocus = () => {
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
};

focusBtn.addEventListener("click", () => {
  active = "focus";
  removeFocus();
  focusBtn.classList.add("active");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

shortBreak.addEventListener("click", () => {
  active = "short";
  removeFocus();
  shortBreak.classList.add("active");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

longBreak.addEventListener("click", () => {
  active = "long";
  removeFocus();
  longBreak.classList.add("active");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pauseBtn.addEventListener(
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pauseBtn.classList.remove("show");
    resetBtn.classList.remove("show");
    pauseBtn.classList.add("hide");
  })
);

startBtn.addEventListener("click", () => {
  resetBtn.classList.add("show");
  pauseBtn.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      if (!(minCount > 0 || count > 0)) {
        pauseBtn.classList.remove("show");
        pauseBtn.classList.add("hide");
        clearInterval(set);
        return;
      }
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount > 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});
