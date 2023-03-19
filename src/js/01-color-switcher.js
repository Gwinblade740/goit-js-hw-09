const start = document.querySelector('[data-start]');
const stop = document.querySelector('[data-stop]');
const bodyEl = document.querySelector('body');

start.addEventListener('click', changeBodyBackground);
let timerId = null;
function changeBodyBackground() {
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  start.disabled = true;
  stop.disabled = false;
}

stop.addEventListener('click', stopChanging);

function stopChanging() {
  clearInterval(timerId);
  start.disabled = false;
  stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
