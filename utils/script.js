window.onload = async function () {
  let response = await fetch("https://api.ipify.org/?format=json");
  let ipObject = await response.json();
  document.getElementById("ip-address").textContent = `Your IP: ${ipObject.ip}`;
};
document
  .getElementById("webapi-link")
  .addEventListener("click", function (event) {
    event.preventDefault();
    navigator.clipboard
      .writeText(event.target.href)
      .then(function () {
        alert("Copied successfully");
      })
      .catch(function (error) {
        alert("Failed to copy link");
      });
  });
let pageLoadTime = localStorage.getItem("pageLoadTime");

if (pageLoadTime === null) {
  pageLoadTime = new Date().getTime();
  localStorage.setItem("pageLoadTime", pageLoadTime);
}
setInterval(() => {
  const uptimeElement = document.getElementById("uptime");
  const uptime = Math.floor((new Date().getTime() - pageLoadTime) / 1000);
  const hours = Math.floor(uptime / 3600);
  const remainingSeconds = uptime % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  uptimeElement.innerHTML = `${hours}h ${minutes}m ${seconds}s`;
}, 1000);
function createDot() {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  dot.style.animationDelay = `${Math.random() * 5}s`;
  dot.style.animationDuration = `${3 + Math.random() * 5}s`;
  dot.style.left = `${Math.random() * 100}vw`;
  dot.style.top = `${-10 + Math.random() * 5}vh`;
  document.body.appendChild(dot);
}

for (let i = 0; i < 200; i++) {
  createDot();
}

const musicLinks = ["https://files.catbox.moe/f7rmjf.mp3"];
function selectRandomMusic() {
  const index = Math.floor(Math.random() * musicLinks.length);
  return musicLinks[index];
}
const btnToggleMusic = document.getElementById("btnToggleMusic");
const myMusic = document.getElementById("myMusic");

btnToggleMusic.addEventListener("click", function () {
  if (myMusic.paused) {
    myMusic.src = selectRandomMusic();
    myMusic.play();
    btnToggleMusic.textContent = "Turn off Music";
  } else {
    myMusic.pause();
    btnToggleMusic.textContent = "Turn on Music";
  }
});