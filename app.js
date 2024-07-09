const bells = new Audio('./sounds/bell.wav'); 
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset'); 
const session = document.querySelector('.minutes');
const sessionInput = document.querySelector('#session-length');
const breakInput = document.querySelector('#break-length');

let myInterval; 
let state = true;
let isPaused = false
let totalSeconds;
let initialSeconds;

const updateTimerDisplay = () => {
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  let minutesLeft = Math.floor(totalSeconds / 60);
  let secondsLeft = totalSeconds % 60;

  secondDiv.textContent = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
  minuteDiv.textContent = `${minutesLeft}`;

  // Update the circle animation
  const circle = document.querySelector('.circle-shape > circle');
  
  const duration = initialSeconds; // Total duration in seconds
  const elapsed = initialSeconds - totalSeconds;
  const percentage = (elapsed / duration) * 100;
  const length = circle.getTotalLength()
  console.log(length)

  circle.style.strokeDasharray = `${length * (1 - percentage/100)} ${length * (percentage/100)}`;
  

};

const appTimer = () => {
  const sessionAmount = Number.parseInt(sessionInput.value)
  if (isNaN(sessionAmount) || sessionAmount <= 0) {
    alert('Please enter a valid session duration.');
    return;
  }
  session.textContent = sessionAmount;  // Update the session display

  if(state) {
    state = false;
    totalSeconds = sessionAmount * 60;
    initialSeconds = totalSeconds;

    myInterval = setInterval(() => {
      if (!isPaused) {
        totalSeconds--;
        updateTimerDisplay();

        if (totalSeconds <= 0) {
          bells.play();
          clearInterval(myInterval);
          startBreakTimer();
        }
      }
    }, 1000);
  } else {
    alert('Session has already started.');
  }
};

const pauseTimer = () => {
  if (!state) {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'resume' : 'pause';
  }
}

const startBreakTimer = () => {
  const breakAmount = Number.parseInt(breakInput.value);
  if (isNaN(breakAmount) || breakAmount <= 0) {
    alert('Please enter a valid break duration.');
    return;
  }
  totalSeconds = breakAmount * 60;
  initialSeconds = totalSeconds;

    myInterval = setInterval(() => {
    if (!isPaused) {
      totalSeconds--;
      updateTimerDisplay();

      if (totalSeconds <= 0) {
        bells.play();
        clearInterval(myInterval);
        state = true;
      }
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  isPaused = false;
  pauseBtn.textContent = 'pause';
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');
  minuteDiv.textContent = sessionInput.value;;
  secondDiv.textContent = '00';

  // Reset circle animation
  const circle = document.querySelector('.circle-shape > circle');
  const length = circle.getTotalLength();
  circle.style.strokeDasharray = `${length} 0`;

}

startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);