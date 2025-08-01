

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


async function fetchData() {
  try {
    let data = await fetch('https://qawafi.mvas.digital/api/v1.0/podcasts/all?page=19');

    if (!data.ok) throw new Error("HTTP Error: " + data.status);

    let dataFile = await data.json();
    console.log(dataFile);
    
    // أخذ أول بودكاست
    let podcast = dataFile.data[0];

    // تركيب رابط الصوت الكامل
    let audioUrl = "https://qawafi.mvas.digital" + podcast.url;
    
    let podcast2 = dataFile.data[3];

    // تركيب رابط الصوت الكامل
    let audioUrl2 = "https://qawafi.mvas.digital" + podcast2.url;

    // تشغيل الصوت
    const audioElement = document.getElementById("player1");
    audioElement.src = audioUrl;
    audioElement.play();
    
    const audioElement2 = document.getElementById("player2");
    audioElement2.src = audioUrl2;
    audioElement2.play();
    
  } catch (err) {
    console.error("Error fetching data:", err);
  }
}

fetchData();
