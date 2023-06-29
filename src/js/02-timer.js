import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

btnStart.setAttribute('disabled', true);
let chosenDate = null;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
        Notiflix.Notify.warning("Please choose a date in the future");
        btnStart.setAttribute('disabled', true);
    } else {
        chosenDate = selectedDates[0];
        btnStart.removeAttribute('disabled');
        btnStart.addEventListener('click', onBtnStart);
    }
  },
};


flatpickr("#datetime-picker", options);

function onBtnStart(){
  timerId = setInterval(() => {
  btnStart.setAttribute('disabled', true);
  dateInput.setAttribute('disabled', true);

  const currentTime = Date.now();
  const deltaTime = chosenDate - currentTime;

  if (deltaTime < 1000) {
    clearInterval(timerId);
    btnStart.removeAttribute('disabled');
    dateInput.removeAttribute('disabled');
  }
 
  const { days, hours, minutes, seconds } = convertMs(deltaTime);
    timerInterface({ days, hours, minutes, seconds });
  }, 1000)
}

function timerInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}