import clock from "clock";
import { display } from "display";
import * as document from "document";
import { me } from "appbit";

const counterText = document.getElementById("counterText");
const startText = document.getElementById("startText");
const startStopButton = document.getElementById("startStopButton");
const actionText = document.getElementById("actionText");
const inhaleShade = document.getElementById("shadeUpInstance");
const exhaleShade = document.getElementById("shadeDownInstance");
const breathPhaseText = document.getElementById("breathPhaseTextInstance");
const exhaleLines = document.getElementById("exhaleLines");
const circle1 = document.getElementById("circle1");
const circle2 = document.getElementById("circle2");
const circle3 = document.getElementById("circle3");
const circle4 = document.getElementById("circle4");
const circle5 = document.getElementById("circle5");
const circle6 = document.getElementById("circle6");
const circle7 = document.getElementById("circle7");

let secondsCount = 0;
let breathLoopRunning = false;
clock.granularity = "seconds";
// does this help with scren timing out? I don't think so
me.appTimeoutEnabled = false;

const oneSecCounter = (timerText, millis = 1000) => {  
  counterText.text = timerText;
  
  return new Promise((resolve) => {
    setTimeout(() => resolve('done'), millis);
  });
}

const inhalePhase = async(msTime) => {
  actionText.text = "INHALE"
  breathPhaseText.animate("enable");
  inhaleShade.animate("enable");  
  await oneSecCounter(1);  
  await oneSecCounter(2);
  await oneSecCounter(3);
  await oneSecCounter(4);
  await oneSecCounter("", 500);    
  
  return new Promise((resolve) => {
    resolve('done');
  });
}

const holdPhase = async(msTime) => {
  actionText.text = "HOLD";
  breathPhaseText.animate("enable");
  circle1.animate("enable");
  await oneSecCounter(1);
  
  circle2.animate("enable");
  await oneSecCounter(2);
    
  circle3.animate("enable");
  await oneSecCounter(3);  
  
  circle4.animate("enable");
  await oneSecCounter(4);    
  
  circle5.animate("enable");
  await oneSecCounter(5);   
  
  circle6.animate("enable");
  await oneSecCounter(6);    
  
  circle7.animate("enable");
  await oneSecCounter(7);    
  await oneSecCounter("", 500);    
  
  return new Promise((resolve) => {
    resolve('done');
  });
}

const exhalePhase = async(msTime) => {
  actionText.text = "EXHALE";
  circle1.animate("disable");
  circle2.animate("disable");
  circle3.animate("disable");
  circle4.animate("disable");
  circle5.animate("disable");
  circle6.animate("disable");
  circle7.animate("disable");
  inhaleShade.animate("disable");
  breathPhaseText.animate("enable");
  exhaleLines.animate("enable");
  await oneSecCounter(1);
  await oneSecCounter(2);
  await oneSecCounter(3);
  await oneSecCounter(4);
  await oneSecCounter(5);
  await oneSecCounter(6);
  await oneSecCounter(7);
  await oneSecCounter(8);
  await oneSecCounter("", 500);
  
  return new Promise((resolve) => {
    resolve('done');
  });
}

const startBreathIntervals = async() => {
  await inhalePhase();
  await holdPhase();
  await exhalePhase();
  
  // finished, now repeat
  initialize(); 
}

const initialize = () => {
  breathLoopRunning = true;
  startBreathIntervals();  
}

// keep screen on for two minutes or so
const keepScreenOn = () => {
    if (secondsCount < 120) {
      display.poke();
    }  
}

startStopButton.addEventListener("click", (evt) => {
  if (!breathLoopRunning) {
    initialize();
    startText.text = "";
    clock.ontick = keepScreenOn;
  }
});

