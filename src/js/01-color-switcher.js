import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.body;


btnStart.addEventListener('click', onBtnStartClick);
btnStop.addEventListener('click', onBtnStopClick);

btnStop.setAttribute('disabled', true);
let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function makeBodyColorChange() {
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

function onBtnStartClick() {
  makeBodyColorChange();
  Notiflix.Notify.success(`you started switch the backgroundcolor`);
  
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', true);
};

function onBtnStopClick() {
  clearInterval(timerId);
  Notiflix.Notify.failure(`you stopted switch the backgroundcolor`);

  btnStop.setAttribute('disabled', true);
  btnStart.removeAttribute('disabled');
};