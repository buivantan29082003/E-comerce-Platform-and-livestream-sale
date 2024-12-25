function startCountdown(duration, display) {
  let timer = duration,
    hours,
    minutes,
    seconds;
  setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display[0].textContent = hours;
    display[1].textContent = minutes;
    display[2].textContent = seconds;

    if (--timer < 0) {
      timer = duration;
    }
  }, 1000);
}

window.onload = function () {
  let countdownHours = 27 * 3600 + 16 * 60 + 58; // Set initial countdown time (in seconds)
  let display = document.querySelectorAll(".countdown-time");
  startCountdown(countdownHours, display);
};
