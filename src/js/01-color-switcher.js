const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
let intervalId = null;

btnStart.addEventListener('click', onClickStart);
function onClickStart() {
  btnStart.disabled = true;
  btnStop.disabled = false;

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

btnStop.addEventListener('click', onClickStop);
function onClickStop() {
  btnStart.disabled = false;
  btnStop.disabled = true;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
