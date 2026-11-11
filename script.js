document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Interactive Welcome Screen ---
  const overlay = document.getElementById("welcomeOverlay");
  const enterBtn = document.getElementById("enterSurpriseBtn");
  const canvas = document.getElementById("welcomeCanvas");
  const card = document.getElementById("welcomeCard");

  if (overlay && enterBtn) {
    let animFrameId = null;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);
      const particles = [];
      const pointer = { x: null, y: null };

      window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      });

      window.addEventListener("mousemove", (e) => {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (card && window.innerWidth > 600) {
          const rotateY = ((e.clientX / width) - 0.5) * 12;
          const rotateX = ((e.clientY / height) - 0.5) * -12;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        }
      });

      window.addEventListener("touchmove", (e) => {
        if (e.touches.length > 0) {
          pointer.x = e.touches[0].clientX;
          pointer.y = e.touches[0].clientY;
        }
      }, { passive: true });

      const colors = ["#ec4899", "#a855f7", "#38bdf8", "#fbbf24"];
      const particleCount = window.innerWidth < 600 ? 40 : 65;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.75,
          vy: (Math.random() - 0.5) * 0.75,
          radius: Math.random() * 2.2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 105) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(236, 72, 153, ${0.22 * (1 - dist / 105)})`;
              ctx.lineWidth = 0.8;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }

          if (pointer.x !== null) {
            const pointerDist = Math.hypot(p.x - pointer.x, p.y - pointer.y);
            if (pointerDist < 140) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.42 * (1 - pointerDist / 140)})`;
              ctx.lineWidth = 1;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(pointer.x, pointer.y);
              ctx.stroke();
            }
          }
        }

        animFrameId = requestAnimationFrame(animateParticles);
      }

      animateParticles();
    }

    enterBtn.addEventListener("click", () => {
      overlay.classList.add("fade-out");
      overlay.style.opacity = "0";
      overlay.style.pointerEvents = "none";
      setTimeout(() => {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        overlay.remove();
      }, 850);
    });
  }

  // --- 2. Main 5-Step Flow ---
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

  function spawnBalloons() {
    const container = document.getElementById("balloon-container");
    if (!container) return;
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

  function triggerCelebration() {
    if (typeof confetti !== "function") return;
    const end = Date.now() + 3000;
    const colors = ["#ec4899", "#a855f7", "#38bdf8", "#fbbf24"];

    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  const personalWish = "Happy Birthday Diksha! 🤍️\n\nYou know, I've always felt that some of our conversations were really special. It's funny how sometimes just a few words or a simple chat can make someone's day a little better. Our conversations made me realise how much happiness even the smallest things can bring.\n\nWishing you a year filled with countless little moments that bring a genuine smile to your face.\n\nThank you for being so amazing. I hope life brings you all the happiness you deserve. Here's to making this year the best one yet! 🥂";

  function startTypewriter() {
    const target = document.getElementById("typewriterText");
    if (!target) return;
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

  function switchScene(nextIndex) {
    const currentScene = document.getElementById(steps[currentStep].sceneId);
    const nextScene = document.getElementById(steps[nextIndex].sceneId);
    if (currentScene) currentScene.classList.remove("active");
    currentStep = nextIndex;
    if (nextScene) nextScene.classList.add("active");
    if (actionBtn) actionBtn.textContent = steps[currentStep].buttonText;
    if (statusPill) statusPill.textContent = steps[currentStep].status;
  }

  if (actionBtn) {
    actionBtn.addEventListener("click", () => {
      if (currentStep === 0) {
        document.body.classList.remove("dark-mode");
        document.body.classList.add("light-mode");
        switchScene(1);
      } else if (currentStep === 1) {
        if (bgMusic) bgMusic.play().catch(e => console.log("Audio play blocked:", e));
        switchScene(2);
      } else if (currentStep === 2) {
        if (bannerWrapper) bannerWrapper.classList.add("show");
        spawnBalloons();
        switchScene(3);
      } else if (currentStep === 3) {
        if (flame) flame.classList.add("extinguished");
        setTimeout(() => {
          switchScene(4);
          triggerCelebration();
          startTypewriter();
        }, 700);
      } else if (currentStep === 4) {
        triggerCelebration();
      }
    });
  }

  // --- 3. Multi-Photo Gallery Configuration ---
  const photoList = [
    { src: "assets/dikshaBD.png", caption: "Feeling 22 ✨" },
    { src: "assets/DSakshi.png", caption: "Cuteness Overloaded 📸" }
  ];

  photoList.forEach((item) => {
    const preloadImg = new Image();
    preloadImg.src = item.src;
  });

  let photoIndex = 0;
  let isAnimating = false;

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
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        if (idx !== photoIndex) renderPhoto(idx);
      });
      galleryDotsContainer.appendChild(dot);
    });
  }

  function renderPhoto(index) {
    if (isAnimating || !galleryImg) return;
    isAnimating = true;
    photoIndex = index;

    galleryImg.style.opacity = "0";
    galleryImg.style.transform = "scale(0.96)";

    setTimeout(() => {
      galleryImg.src = photoList[photoIndex].src;
      if (galleryCaption) galleryCaption.textContent = photoList[photoIndex].caption;

      const reveal = () => {
        galleryImg.style.opacity = "1";
        galleryImg.style.transform = "scale(1)";
        isAnimating = false;
      };

      if (galleryImg.complete) {
        reveal();
      } else {
        galleryImg.onload = reveal;
        galleryImg.onerror = reveal;
      }
    }, 180);

    const dots = document.querySelectorAll(".gallery-dots .dot");
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === photoIndex);
    });
  }

  if (prevPhotoBtn && nextPhotoBtn) {
    prevPhotoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const newIdx = (photoIndex - 1 + photoList.length) % photoList.length;
      renderPhoto(newIdx);
    });

    nextPhotoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const newIdx = (photoIndex + 1) % photoList.length;
      renderPhoto(newIdx);
    });

    setupDots();
  }
});