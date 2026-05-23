const clock = document.getElementById("clock");

function updateClock(){

  const now = new Date();

  let h = String(now.getHours()).padStart(2,"0");
  let m = String(now.getMinutes()).padStart(2,"0");
  let s = String(now.getSeconds()).padStart(2,"0");

  clock.innerText = `${h}:${m}:${s}`;
}

setInterval(updateClock,1000);

updateClock();


// NOTES

const noteInput = document.getElementById("noteInput");

noteInput.value = localStorage.getItem("notes") || "";

noteInput.addEventListener("input",()=>{

  localStorage.setItem("notes",noteInput.value);

});


// BATTERIE

navigator.getBattery().then(function(battery){

  function updateBattery(){

    let level = Math.floor(battery.level * 100);

    let text = `🔋 ${level}%`;

    if(battery.charging){
      text += " ⚡";
    }

    document.getElementById("battery").innerText = text;
  }

  updateBattery();

  battery.addEventListener("levelchange",updateBattery);

  battery.addEventListener("chargingchange",updateBattery);

});


// SWIPE

let currentPage = 0;

const screen = document.querySelector(".screen");

let startX = 0;

document.addEventListener("touchstart",(e)=>{

  startX = e.touches[0].clientX;

});

document.addEventListener("touchend",(e)=>{

  let endX = e.changedTouches[0].clientX;

  if(endX < startX - 50){
    currentPage++;
  }

  if(endX > startX + 50){
    currentPage--;
  }

  if(currentPage < 0) currentPage = 0;
  if(currentPage > 2) currentPage = 2;

  screen.style.transform =
    `translateX(-${currentPage * 100}vw)`;

});


// CHRONO

let stopwatchInterval;

let seconds = 0;

function startStopwatch(){

  clearInterval(stopwatchInterval);

  stopwatchInterval = setInterval(()=>{

    seconds++;

    let h = String(Math.floor(seconds/3600)).padStart(2,"0");

    let m = String(Math.floor((seconds%3600)/60)).padStart(2,"0");

    let s = String(seconds%60).padStart(2,"0");

    document.getElementById("stopwatch").innerText =
      `${h}:${m}:${s}`;

  },1000);

}

function resetStopwatch(){

  clearInterval(stopwatchInterval);

  seconds = 0;

  document.getElementById("stopwatch").innerText =
    "00:00:00";

}


// CALCULATRICE

const secretBtn = document.getElementById("secretBtn");

secretBtn.addEventListener("click",()=>{

  document.getElementById("calculator")
    .classList.toggle("hidden");

});

function calc(value){

  document.getElementById("calcDisplay").value += value;

}

function calculate(){

  let display =
    document.getElementById("calcDisplay");

  display.value = eval(display.value);

}
