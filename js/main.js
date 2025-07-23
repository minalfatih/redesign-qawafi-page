

let que = document.querySelectorAll(".question li");

que.forEach((que) => {
  que.onclick = function () {
    this.classList.toggle("open");
  };
});

const players = document.querySelectorAll(".audio-box");
let currentPlaying = null;

players.forEach((player, index) => {
  const audio = player.querySelector("audio");
  const playBtn = player.querySelector(".play-btn");
  const playPauseImg = playBtn.querySelector("img");
  const progressBar = player.querySelector(".progress-bar");
  const timeText = player.querySelector("small");

  audio.addEventListener("timeupdate", () => {
    const percent = audio.currentTime / audio.duration;
    const offset = 157 - percent * 157;
    progressBar.style.strokeDashoffset = offset;

    let curr = formatTime(audio.currentTime);
    let dur = formatTime(audio.duration);
    timeText.textContent = `${curr} / ${dur}`;
  });

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      if (currentPlaying && currentPlaying !== audio) {
        currentPlaying.pause();
    
        const prevPlayerBox = currentPlaying.closest(".audio-box");
        if (prevPlayerBox) {
            const prevPlayPauseImg = prevPlayerBox.querySelector(".play-btn img");
            if (prevPlayPauseImg) {
                prevPlayPauseImg.src = "./images/play-button-svgrepo-com.svg";
            }
        }
      }
      audio.play();
      currentPlaying = audio;
      playPauseImg.src = "./images/pause-svgrepo-com.svg"; 
    } else {
      audio.pause();
      playPauseImg.src = "./images/play-button-svgrepo-com.svg";
    }
  });

  audio.addEventListener("ended", () => {
    playPauseImg.src = "./images/play-button-svgrepo-com.svg"; 
    progressBar.style.strokeDashoffset = 157;
    currentPlaying = null; 
  });
});

function formatTime(seconds) {
  if (isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

/*
const carousel = document.getElementById("carousel");
    let angle = 0;
    let step = 120;
    setInterval(() => {
      angle += step;
      carousel.style.transform = `rotateY(${angle}deg)`;
    }, 5000);
    */
    
    document.querySelector('#see-all a').addEventListener('click', function (e) {
      console.log("h")
  e.preventDefault();
  const target = document.querySelector('#operator');
  const offset = 100; // مسافة الإزاحة من الأعلى

  const elementPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
});
