
document.getElementById("light-btn").addEventListener("click", () => {
  document.getElementById("overlay").classList.add("hidden");
});

const cakeWrapper = document.querySelector('.cake-wrapper');
const cakeOverlay = document.querySelector('.cake-overlay');
const wishUI = document.querySelector('.wish-ui');
const wishBtn = document.getElementById('wish-btn');
const countdownText = document.getElementById('countdown');
const candles = document.querySelectorAll('.candle');

cakeWrapper.addEventListener('click', () => {
  cakeWrapper.classList.add('active');
  cakeOverlay.classList.add('active');
  wishUI.classList.add('active');
});

cakeOverlay.addEventListener('click', () => {
  cakeWrapper.classList.remove('active');
  cakeOverlay.classList.remove('active');
  wishUI.classList.remove('active');
  countdownText.textContent = "";
  candles.forEach(c => c.classList.remove('extinguished'));
});

wishBtn.addEventListener('click', () => {
  let timeLeft = 10;
  countdownText.textContent = timeLeft;
  
  const countdown = setInterval(() => {
    timeLeft--;
    countdownText.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdownText.textContent = "🎉 Happy Birthday Taro!";
      candles.forEach(c => c.classList.add('extinguished'));

      const confettiSound = document.getElementById("confetti-sound");
      confettiSound.currentTime = 0; // rewind if already played
      confettiSound.play();
    }
  }, 1000);
});

document.getElementById("light-btn").addEventListener("click", () => {
  document.getElementById("overlay").classList.add("hidden");
  
  const bgMusic = document.getElementById("bg-music");
  bgMusic.volume = 0.5; 
  bgMusic.play().catch(err => {
    console.log("Autoplay prevented. User interaction needed:", err);
  });
});

function startConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = [];
  const colors = ["#f94144", "#f3722c", "#f8961e", "#43aa8b", "#577590", "#f9c74f", "#90be6d"];

  for (let i = 0; i < 150; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      tilt: Math.random() * 10 - 10
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.r, p.r);
      ctx.fill();
    });
    update();
    requestAnimationFrame(draw);
  }

  function update() {
    confetti.forEach(p => {
      p.y += p.d * 4;
      p.x += Math.sin(p.y * 0.01);
      if (p.y > canvas.height) {
        p.y = -10;
        p.x = Math.random() * canvas.width;
      }
    });
  }

  draw();
}

cakeWrapper.addEventListener('click', () => {
  cakeWrapper.classList.add('active');
  cakeOverlay.classList.add('active');
  wishUI.classList.add('active');
  startConfetti();
});

const cardWrapper = document.querySelector('.card-wrapper');
const card = document.querySelector('.card');
const cardOverlay = document.querySelector('.card-overlay');

let zoomed = false;

cardWrapper.addEventListener('click', () => {
  if (!zoomed) {
    // First click → zoom in
    cardWrapper.classList.add('active');
    cardOverlay.classList.add('active');
    zoomed = true;
  } else {
    // Second click → flip
    card.classList.toggle('open');
  }
});

// Clicking overlay closes card
cardOverlay.addEventListener('click', () => {
  cardWrapper.classList.remove('active');
  cardOverlay.classList.remove('active');
  card.classList.remove('open');
  zoomed = false;
});
