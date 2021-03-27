//!TODO двоеточие будет мигать на паузе

const minutes = document.querySelector(".m"),
  seconds = document.querySelector(".s"),
  miliSeconds = document.querySelector(".ms"),
  startBtn = document.querySelector(".start"),
  pauseBtn = document.querySelector(".pause"),
  clearBtn = document.querySelector(".clear"),
  btns = document.querySelector(".btns"),
  timeElems = [...document.querySelectorAll(".time")];

let timerInfo = {}; // хранит в себе информацию про таймер: timerId и текущее время таймера

btns.onclick = (event) => {
  const { target } = event;
  if (target === startBtn) {
    if (!timerInfo.timerInfo)
      timerInfo = start(0, 0, 0, startBtn, pauseBtn, timeElems);
    // если нет информации, запускать таймер сначала
    else {
      const { mCounter, sCounter, msCounter } = timerInfo.timerInfo;
      timerInfo = start(
        mCounter,
        sCounter,
        msCounter,
        startBtn,
        pauseBtn,
        timeElems
      );
    }
  } else if (target === pauseBtn) {
    pause(timerInfo.timerId, startBtn, pauseBtn, timeElems);
  } else if (target === clearBtn) {
    pause(timerInfo.timerId, startBtn, pauseBtn, timeElems);
    timerInfo = {};
    updateTimer(0, 0, 0, minutes, seconds, miliSeconds);
    timeElems.forEach((el) => {
      el.classList.remove("time-pause");
    });
  }
};

// FUNCTIONS

function addZero(el) {
  return el < 10 ? "0" + el : el;
}

function start(
  mCounter = 0,
  sCounter = 0,
  msCounter = 0,
  startBtn,
  pauseBtn,
  timeElems
) {
  startBtn.classList.remove("active");
  pauseBtn.classList.add("active");
  timeElems.forEach((el) => {
    el.classList.remove("time-pause");
  });
  let timerInfo = {};
  let timerId = setInterval(() => {
    msCounter++;
    if (msCounter === 100) {
      msCounter = 0;
      sCounter++;
    }
    if (sCounter === 60) {
      sCounter = 0;
      mCounter++;
    }
    if (mCounter === 60) {
      // если мы достигли на таймере отметки в один час, то мы останавливаем его без возможности продолжить счет
      pause("", startBtn, pauseBtn, timeElems);
      return {
        timerId,
      };
    }

    updateTimer(mCounter, sCounter, msCounter, minutes, seconds, miliSeconds);
    timerInfo.mCounter = mCounter;
    timerInfo.sCounter = sCounter;
    timerInfo.msCounter = msCounter;
  }, 10);
  return {
    timerId,
    timerInfo,
  };
}

function pause(timerId, startBtn, pauseBtn, timeElems) {
  startBtn.classList.add("active");
  pauseBtn.classList.remove("active");
  timeElems.forEach((el) => {
    el.classList.add("time-pause");
  });

  clearInterval(timerId);
}
function updateTimer(
  mCounter,
  sCounter,
  msCounter,
  minutes,
  seconds,
  miliSeconds
) {
  minutes.textContent = addZero(mCounter);
  seconds.textContent = addZero(sCounter);
  miliSeconds.textContent = addZero(msCounter);
}
