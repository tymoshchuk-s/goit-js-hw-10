import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector('#datetime-picker')
const startBtnEl = document.querySelector('.button')
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

startBtnEl.addEventListener('click', start)

startBtnEl.disabled = true;
let currentDate = null;
let userSelectedDate = null;
let intervalId = null;
  
const flatpickrEL = new flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates.length)
      return;

    currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      startBtnEl.disabled = true;
      iziToast.error({
      title: 'Oops!,',
      message: 'Please choose a date in the future'
    });
    } else {
      startBtnEl.disabled = false;
    }
  },
});

function start(event) { 
  startBtnEl.disabled = true;
  inputEl.disabled = true;

  intervalId = setInterval(() => {
    currentDate = new Date();
    const deltaTime = userSelectedDate - currentDate;

    
    
    if (deltaTime <= 0) {
      clearInterval(intervalId);
      onTick({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success({
        title: 'Success!,',
        message: 'The countdown is complete!'
      });
      inputEl.disabled = false;
      return;
    }

    const time = convertMs(deltaTime);
    // console.log(time);
    onTick(time);
  }, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

function onTick({days, hours, minutes, seconds }) {
  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
};
  

  






