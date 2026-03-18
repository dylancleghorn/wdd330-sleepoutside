let t = document.getElementById('countdown');
let countdown = 10;
let button = document.getElementById('startButton');
button.addEventListener('click', () => {
  let timer = setInterval(() => {
    countdown--;
    t.innerHTML = `${countdown} seconds`;
  }, 1000);
  setTimeout(() => {
    clearInterval(timer);
    t.innerHTML = 'Time is up!';
  }, countdown * 1000);
});
