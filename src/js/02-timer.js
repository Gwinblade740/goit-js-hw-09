import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const start = document.querySelector('[data-start]');
const inputEl = document.querySelector('#datetime-picker');
const secondsEl = document.querySelector('[data-seconds]');
const minutesEl = document.querySelector('[data-minutes]');
const hoursEl = document.querySelector('[data-hours]');
const daysEl = document.querySelector('[data-days]');

let timerId = null;
let choiceDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choiceDate = selectedDates[0];
    if (new Date().getTime() < choiceDate.getTime()) {
      start.removeAttribute('disabled');
    } else {
      start.setAttribute('disabled', '');
      return Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr('input[type=text]', options);

start.addEventListener('click', onStartTimer);

function onStartTimer() {
  timerId = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(
      choiceDate.getTime() - new Date().getTime()
    );
    secondsEl.textContent = addLeadingZero(seconds);
    minutesEl.textContent = addLeadingZero(minutes);
    hoursEl.textContent = addLeadingZero(hours);
    daysEl.textContent = addLeadingZero(days);

    if (choiceDate.getTime() - new Date().getTime() <= 0) {
      clearInterval(timerId);
      secondsEl.textContent = '00';
      minutesEl.textContent = '00';
      hoursEl.textContent = '00';
      daysEl.textContent = '00';
    }
  }, 1000);
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
