import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';

const refs = {
  day: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStartTimer: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = Date.now();
    if (selectedDates[0].getTime() < currentTime) {
      refs.btnStartTimer.disabled = true;
      window.alert('Please choose a date in the future');
    } else {
      refs.btnStartTimer.disabled = false;
    }
  },
};
const timePickr = document.querySelector('#datetime-picker');
flatpickr(timePickr, options);

refs.btnStartTimer.addEventListener('click', onClickStart);
function onClickStart() {
  timer();
}

function timer() {
  setInterval(() => {
    refs.btnStartTimer.disabled = true;
    const deltaTime = new Date(timePickr.value).getTime() - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    refs.day.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
function pad(value) {
  return String(value).padStart(2, '0');
}
