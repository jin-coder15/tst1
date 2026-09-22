/* ==================================================================
   💌 BIRTHDAY SURPRISE — MAIN SCRIPT
   Scroll down to find each clearly-marked EDITABLE section.
   ================================================================== */

/* ========================================
   🔐 PASSWORD — CHANGE HERE
   ======================================== */
const PASSWORD = "Awais ki jaan";

/* ========================================
   💌 SECRET MESSAGE — EDIT YOUR MESSAGE HERE
   ======================================== */
const SECRET_MESSAGE = `
Ye Dastaan mery Dil ki

تیرے  دید و گفتار  کی  لت  مجھ  کو  پاگل  کر  رہی  ہے۔

میں  ڈھونڈتا  ہوں  تجھے  آسمانوں  میں  خدا  کی  یہ  چھت  مجھ  کو  پاگل  کر  رہی  ہے۔

`;

/* ========================================
   💖 LOVE LETTER — EDIT YOUR LOVE LETTER HERE
   ======================================== */
const LOVE_LETTER = `
Meri Jaan

‎تم  آؤ  میرے  نصیب  میں  اور  خود  کو  میرے  نام  کردو  
‎
‎بناؤ  دیوانہ  تم  مجھے  اپنی  قربت  کا  اور  مجھے  بد  نام  
‎کردو 
‎
‎یا  مجھے  مار  دو  یا  یہ  شبِ ہجر  اختتام  کردو 
‎
‎تم  مصحفَت  محبت  کرو  اور  محبت  کو  شوق  عام  کردو 
‎
"اویس"  ناراضگی  چھوڑو  اور  میرے  خط  کا  پیام  کردو۔

❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️❤️
میں تمہیں تب تک چاہوں گا

تم میرا وہ خیال ہو جسے میں کبھی نہیں بھولوں گا تب بھی جب مجھے سب کچھ بھول جائے گا

تم میری وہ چاہت ہو جسے میں تب تک چاہوں گا جب تک میری آخری سانس اُکھڑ نہ جائے

تم میری وہ یاد ہو جسے میں تب بھی یاد رکھوں گا جب مجھے کچھ بھی یاد نہ رہے

تم میرے لیے کبھی نہیں بدلو گی... میں تمہارے لیے کبھی نہیں بدلوں گا

تم سے چاہت اب دن بہ دن بڑھتی جا رہی ہے

بھلے یہ وقت گزرتا رہے یا گزر جائے، یا میں نہ رہوں، میں تمہیں چاہوں گا۔

`;

/* ========================================
   ✍️ LOVE LETTER SIGNATURE — EDIT HERE
   ======================================== */
const SIGNATURE = "آپ کے Syed Awais کی طرف سے ❤️";

/* ========================================
   🔗 ADD / EDIT YOUR WEBSITE LINKS HERE
   ======================================== */
const WEBSITE_LINKS = [
  {
    name: "Meri Jaan Apky Liy",
    url: "https://jin-coder15.github.io/web1/",
    icon: "❤️",
    description: "Visit my website"
  },
  {
    name: "My Project",
    url: "https://example.com",
    icon: "💻",
    description: "See what I've built"
  },
  {
    name: "My Portfolio",
    url: "https://example.com",
    icon: "🎨",
    description: "Check out my work"
  },
  {
    name: "Special Website",
    url: "https://example.com",
    icon: "❤️",
    description: "Just for you"
  }
];

/* ==================================================================
   STATE MACHINE — step order + transitions
   ================================================================== */
const STEP_ORDER = [
  "step-password",
  "step-q1",
  "step-q2",
  "step-q3",
  "step-fireworks",
  "step-cake",
  "step-secret",
  "step-letter",
  "step-links"
];

let currentStepIndex = -1;

function goToStep(stepId) {
  const targetIndex = STEP_ORDER.indexOf(stepId);
  const current = document.querySelector(".step.active");

  if (current) {
    current.classList.remove("step-in");
    current.classList.add("step-out");
    setTimeout(() => {
      current.classList.remove("active", "step-out");
      showNext(stepId);
    }, 500);
  } else {
    showNext(stepId);
  }

  currentStepIndex = targetIndex;
}

function showNext(stepId) {
  const next = document.getElementById(stepId);
  next.classList.add("active");
  // force reflow so the transition actually plays
  void next.offsetWidth;
  requestAnimationFrame(() => next.classList.add("step-in"));

  // per-step boot logic
  if (stepId === "step-fireworks") startFireworksSequence();
  if (stepId === "step-secret") startTypewriter(document.getElementById("secret-text"), SECRET_MESSAGE.trim(), () => {
    revealElement(document.getElementById("secret-continue"));
  });
  if (stepId === "step-letter") startTypewriter(document.getElementById("letter-text"), LOVE_LETTER.trim(), () => {
    const sig = document.getElementById("signature-text");
    sig.textContent = SIGNATURE;
    revealElement(sig);
    revealElement(document.getElementById("letter-continue"));
  });
  if (stepId === "step-links") renderLinks();
}

function revealElement(el) {
  el.style.opacity = "1";
  el.style.pointerEvents = "auto";
}

/* ==================================================================
   STEP 1 — PASSWORD
   ================================================================== */
const passwordForm = document.getElementById("password-form");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");

passwordForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const entered = passwordInput.value.trim().toLowerCase();
  const correct = PASSWORD.trim().toLowerCase();

  if (entered === correct) {
    passwordError.classList.remove("show");
    goToStep("step-q1");
  } else {
    passwordError.classList.add("show");
    passwordInput.classList.remove("shake");
    void passwordInput.offsetWidth;
    passwordInput.classList.add("shake");
  }
});

/* ==================================================================
   STEP 2 — DO YOU LOVE ME?
   ================================================================== */
const q1Error = document.getElementById("q1-error");

document.querySelectorAll('#step-q1 .btn-choice').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.answer === "yes") {
      q1Error.classList.remove("show");
      goToStep("step-q2");
    } else {
      q1Error.classList.add("show");
      btn.classList.remove("wrong-pick");
      void btn.offsetWidth;
      btn.classList.add("wrong-pick");
    }
  });
});

/* ==================================================================
   STEP 3 — MEMORABLE CONVERSATION (both answers valid)
   ================================================================== */
const teasingPopup = document.getElementById("teasing-popup");
const popupClose = document.getElementById("popup-close");

document.querySelectorAll('#step-q2 .btn-choice').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.answer === "series") {
      teasingPopup.classList.add("show");
    } else {
      goToStep("step-q3");
    }
  });
});

popupClose.addEventListener("click", () => {
  teasingPopup.classList.remove("show");
  goToStep("step-q3");
});

/* ==================================================================
   STEP 4 — WHAT ARE YOU TO ME?
   ================================================================== */
const q3Error = document.getElementById("q3-error");
const heartBurst = document.getElementById("heart-burst");

document.querySelectorAll('#step-q3 .btn-choice').forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.dataset.answer === "wifey") {
      q3Error.classList.remove("show");
      launchHeartBurst();
      setTimeout(() => goToStep("step-fireworks"), 1200);
    } else {
      q3Error.classList.add("show");
      btn.classList.remove("wrong-pick");
      void btn.offsetWidth;
      btn.classList.add("wrong-pick");
    }
  });
});

function launchHeartBurst() {
  const hearts = ["❤️", "💖", "💋", "💕", "😘"];
  for (let i = 0; i < 24; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = Math.random() * 100 + "%";
    h.style.animationDelay = Math.random() * 0.6 + "s";
    h.style.fontSize = 1 + Math.random() * 1.4 + "rem";
    heartBurst.appendChild(h);
    setTimeout(() => h.remove(), 3200);
  }
}

/* ==================================================================
   STEP 5 — FIREWORKS + HAPPY BIRTHDAY
   ================================================================== */
document.getElementById("continue-to-cake").addEventListener("click", () => {
  goToStep("step-cake");
});

function startFireworksSequence() {
  const canvas = document.getElementById("fw-canvas");
  canvas.style.opacity = "1";
  runFireworks(7000); // run for 7 seconds then fade
  setTimeout(() => {
    canvas.style.transition = "opacity 1.2s ease";
    canvas.style.opacity = "0";
  }, 7000);
}

/* ==================================================================
   STEP 6 — CANDLE INTERACTION
   ================================================================== */
const candleSvg = document.getElementById("candle-flame-svg");
const smokeGroup = document.getElementById("smoke-group");
const cakeContinueBtn = document.getElementById("cake-continue");
const cakeSub = document.getElementById("cake-sub");
let candleBlown = false;

function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;
  candleSvg.classList.add("blown");
  cakeSub.textContent = "wish made ✨";
  spawnSmoke();
  launchHeartBurstAt(document.getElementById("step-cake"));
  cakeContinueBtn.disabled = false;
}

function spawnSmoke() {
  for (let i = 0; i < 4; i++) {
    const puff = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    puff.setAttribute("cx", 40 + (Math.random() * 10 - 5));
    puff.setAttribute("cy", 20);
    puff.setAttribute("r", 5 + Math.random() * 4);
    puff.classList.add("smoke-puff");
    puff.style.animationDelay = i * 0.15 + "s";
    smokeGroup.appendChild(puff);
    setTimeout(() => puff.remove(), 2200 + i * 150);
  }
}

function launchHeartBurstAt(container) {
  const hearts = ["🎉", "💋", "🎂", "😘"];
  const wrap = document.createElement("div");
  wrap.className = "heart-burst";
  container.appendChild(wrap);
  for (let i = 0; i < 14; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    h.style.left = 30 + Math.random() * 40 + "%";
    h.style.animationDelay = Math.random() * 0.4 + "s";
    wrap.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }
  setTimeout(() => wrap.remove(), 3200);
}

candleSvg.addEventListener("click", blowCandle);
candleSvg.addEventListener("touchstart", (e) => { e.preventDefault(); blowCandle(); }, { passive: false });

cakeContinueBtn.addEventListener("click", () => goToStep("step-secret"));

/* ==================================================================
   TYPEWRITER EFFECT (used for secret message + love letter)
   ================================================================== */
function startTypewriter(el, text, onDone) {
  el.textContent = "";
  let i = 0;
  const speed = 22; // ms per character — tune for feel
  function tick() {
    if (i < text.length) {
      el.textContent += text[i];
      i++;
      setTimeout(tick, speed);
    } else if (onDone) {
      onDone();
    }
  }
  tick();
}

document.getElementById("secret-continue").addEventListener("click", () => goToStep("step-letter"));
document.getElementById("letter-continue").addEventListener("click", () => goToStep("step-links"));

/* ==================================================================
   STEP 9 — FINAL LINKS RENDERER
   ================================================================== */
function renderLinks() {
  const grid = document.getElementById("links-grid");
  if (grid.dataset.rendered) return;
  grid.dataset.rendered = "true";

  WEBSITE_LINKS.forEach((link) => {
    const a = document.createElement("a");
    a.className = "link-card";
    a.href = link.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.innerHTML = `
      <span class="link-icon">${link.icon}</span>
      <span class="link-name">${link.name}</span>
      <span class="link-desc">${link.description}</span>
    `;
    grid.appendChild(a);
  });
}

/* ==================================================================
   AMBIENT PARTICLE BACKGROUND (lightweight canvas starfield)
   ================================================================== */
(function initBackgroundParticles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  let w, h, particles;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function makeParticles() {
    const count = Math.min(70, Math.floor((w * h) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.18 + 0.03,
      drift: Math.random() * 0.3 - 0.15,
      twinkle: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? "255,201,120" : "255,255,255"
    }));
  }

  function frame() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => {
      p.twinkle += 0.02;
      const alpha = 0.35 + Math.sin(p.twinkle) * 0.25;
      ctx.beginPath();
      ctx.fillStyle = `rgba(${p.hue}, ${Math.max(0, alpha)})`;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift * 0.1;
      if (p.y < -5) { p.y = h + 5; p.x = Math.random() * w; }
    });
    requestAnimationFrame(frame);
  }

  window.addEventListener("resize", () => { resize(); makeParticles(); });
  resize();
  makeParticles();
  frame();
})();

/* ==================================================================
   FIREWORKS ENGINE (canvas, self-contained, GPU-friendly)
   ================================================================== */
let fireworksAnimationId = null;

function runFireworks(durationMs) {
  const canvas = document.getElementById("fw-canvas");
  const ctx = canvas.getContext("2d");
  let w = (canvas.width = window.innerWidth);
  let h = (canvas.height = window.innerHeight);

  const colors = ["#ff6fae", "#ffc978", "#8f6bff", "#ff9ecf", "#ffe08a", "#c9a6ff"];
  let particles = [];
  let running = true;
  const startTime = performance.now();

  function resizeHandler() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  window.addEventListener("resize", resizeHandler);

  function spawnBurst() {
    const cx = w * (0.2 + Math.random() * 0.6);
    const cy = h * (0.15 + Math.random() * 0.35);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const count = 34;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.2;
      const speed = 1.6 + Math.random() * 2.4;
      particles.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.012,
        color,
        r: 1.6 + Math.random() * 1.4
      });
    }
  }

  let lastBurst = 0;
  function tick(t) {
    if (!running) return;
    const elapsed = t - startTime;

    if (elapsed - lastBurst > 550 && elapsed < durationMs - 600) {
      spawnBurst();
      lastBurst = elapsed;
    }

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(10, 6, 18, 0.22)";
    ctx.fillRect(0, 0, w, h);
    ctx.globalCompositeOperation = "lighter";

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.028; // gravity
      p.life -= p.decay;
      if (p.life <= 0) return;
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(p.life, 0);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    particles = particles.filter((p) => p.life > 0 && p.y < h + 20);

    if (elapsed < durationMs) {
      fireworksAnimationId = requestAnimationFrame(tick);
    } else {
      running = false;
      window.removeEventListener("resize", resizeHandler);
      ctx.clearRect(0, 0, w, h);
    }
  }

  fireworksAnimationId = requestAnimationFrame(tick);
}

/* ==================================================================
   BOOT
   ================================================================== */
goToStep("step-password");
