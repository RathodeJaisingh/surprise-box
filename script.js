let currentStep = 0;

const steps = [
  { sceneId: "scene-lights", buttonText: "Turn On Lights", status: "Step 1 of 5" },
  { sceneId: "scene-music", buttonText: "Play Music", status: "Step 2 of 5" },
  { sceneId: "scene-decorate", buttonText: "Decorate the Room", status: "Step 3 of 5" },
  { sceneId: "scene-cake", buttonText: "Blow Out Candle", status: "Step 4 of 5" },
  { sceneId: "scene-reveal", buttonText: "Celebrate Again! 🎊", status: "Surprise!" }
];

const actionBtn = document.getElementById("actionBtn");
const statusPill = document.getElementById("statusPill");
const bgMusic = document.getElementById("bgMusic");
const bannerWrapper = document.getElementById("bannerWrapper");
const flame = document.getElementById("flame");

// Multi-color balloon generator
function spawnBalloons() {
  const container = document.getElementById("balloon-container");
  const colors = ["#ec4899", "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"];
  for (let i = 0; i < 20; i++) {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 95 + "vw";
    balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDelay = Math.random() * 5 + "s";
    balloon.style.animationDuration = 6 + Math.random() * 4 + "s";
    container.appendChild(balloon);
  }
}

// Confetti blast animation
function triggerCelebration() {
  const end = Date.now() + 3 * 1000;
  const colors = ["#ec4899", "#a855f7", "#38bdf8", "#fbbf24"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Typewriter message
const personalWish = "Happy Birthday chota sher! ️\n\nYou know, I've always felt that some of our conversations were really special. It's funny how sometimes just a few words or a simple chat can make someone's day a little better. Our conversations made me realise how much happiness even the smallest things can bring.\n\nWishing you a year filled with countless little moments that bring a genuine smile to your face.\n\nThank you for being so amazing. I hope life brings you all the happiness you deserve. Here's to making this year the best one yet! 🥂";
function startTypewriter() {
  const target = document.getElementById("typewriterText");
  target.textContent = "";
  let i = 0;
  function type() {
    if (i < personalWish.length) {
      target.textContent += personalWish.charAt(i);
      i++;
      setTimeout(type, 30);
    }
  }
  type();
}

// Flow Controller
actionBtn.addEventListener("click", () => {
  if (currentStep === 0) {
    // 1. Turn on lights
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    switchScene(1);
  } else if (currentStep === 1) {
    // 2. Play music (allowed because it's inside user click handler)
    bgMusic.play().catch(e => console.log("Audio play blocked:", e));
    switchScene(2);
  } else if (currentStep === 2) {
    // 3. Decorate: banner + balloons
    bannerWrapper.classList.add("show");
    spawnBalloons();
    switchScene(3);
  } else if (currentStep === 3) {
    // 4. Blow out candle
    flame.classList.add("extinguished");
    setTimeout(() => {
      switchScene(4);
      triggerCelebration();
      startTypewriter();
    }, 700);
  } else if (currentStep === 4) {
    // 5. Celebration loop
    triggerCelebration();
  }
});

function switchScene(nextIndex) {
  document.getElementById(steps[currentStep].sceneId).classList.remove("active");
  currentStep = nextIndex;
  document.getElementById(steps[currentStep].sceneId).classList.add("active");
  actionBtn.textContent = steps[currentStep].buttonText;
  statusPill.textContent = steps[currentStep].status;
}



// --- Multi-Photo Gallery Configuration ---
const photoList = [
  { src: "assets/dikshaBD.png", caption: "Feeling 22 ✨" },
  { src: "assets/DSakshi.png", caption: "Unforgettable memories 📸" }
];

let photoIndex = 0;
const galleryImg = document.getElementById("galleryImg");
const galleryCaption = document.getElementById("galleryCaption");
const prevPhotoBtn = document.getElementById("prevPhotoBtn");
const nextPhotoBtn = document.getElementById("nextPhotoBtn");
const galleryDotsContainer = document.getElementById("galleryDots");

function setupDots() {
  if (!galleryDotsContainer) return;
  galleryDotsContainer.innerHTML = "";
  photoList.forEach((_, idx) => {
    const dot = document.createElement("div");
    dot.className = `dot ${idx === photoIndex ? "active" : ""}`;
    dot.addEventListener("click", () => renderPhoto(idx));
    galleryDotsContainer.appendChild(dot);
  });
}

function renderPhoto(index) {
  photoIndex = index;
  galleryImg.classList.remove("fade-in");
  void galleryImg.offsetWidth; // Trigger reflow for re-animation

  galleryImg.src = photoList[photoIndex].src;
  galleryCaption.textContent = photoList[photoIndex].caption;
  galleryImg.classList.add("fade-in");

  // Update active dot
  const dots = document.querySelectorAll(".gallery-dots .dot");
  dots.forEach((dot, idx) => {
    dot.classList.toggle("active", idx === photoIndex);
  });
}

if (prevPhotoBtn && nextPhotoBtn) {
  prevPhotoBtn.addEventListener("click", () => {
    const newIdx = (photoIndex - 1 + photoList.length) % photoList.length;
    renderPhoto(newIdx);
  });

  nextPhotoBtn.addEventListener("click", () => {
    const newIdx = (photoIndex + 1) % photoList.length;
    renderPhoto(newIdx);
  });

  setupDots();
}