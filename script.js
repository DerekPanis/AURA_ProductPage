document.addEventListener("DOMContentLoaded", () => {

  /* ─────────────────────────────
     1. HAMBURGER MENU (FIXED)
  ───────────────────────────── */
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      mobileMenu.classList.toggle("open");
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (
        mobileMenu.classList.contains("open") &&
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
      }
    });
  }


  /* ─────────────────────────────
     2. COUNTDOWN TIMER (WORKING + CLEAN)
  ───────────────────────────── */

  const cdDays = document.getElementById("cd-days");
  const cdHours = document.getElementById("cd-hours");
  const cdMins = document.getElementById("cd-mins");
  const cdSecs = document.getElementById("cd-secs");

  if (cdDays && cdHours && cdMins && cdSecs) {

    const launchTarget = new Date();
    launchTarget.setDate(launchTarget.getDate() + 90);

    function pad(n) {
      return String(n).padStart(2, "0");
    }

    function updateCountdown() {
      const now = new Date();
      const diff = launchTarget - now;

      if (diff <= 0) {
        cdDays.textContent = "00";
        cdHours.textContent = "00";
        cdMins.textContent = "00";
        cdSecs.textContent = "00";
        return;
      }

      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);

      cdDays.textContent = pad(days);
      cdHours.textContent = pad(hours);
      cdMins.textContent = pad(mins);
      cdSecs.textContent = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }


  /* ─────────────────────────────
     3. EMAIL FORM (SAFE)
  ───────────────────────────── */

  const emailInput = document.getElementById("emailInput");
  const notifyBtn = document.getElementById("notifyBtn");
  const notifyMsg = document.getElementById("notifyMsg");

  if (emailInput && notifyBtn && notifyMsg) {

    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    notifyBtn.addEventListener("click", () => {
      const email = emailInput.value.trim();

      if (!email) {
        notifyMsg.textContent = "⚠ Please enter your email.";
        return;
      }

      if (!isValidEmail(email)) {
        notifyMsg.textContent = "⚠ Invalid email format.";
        return;
      }

      notifyMsg.textContent = "✓ You're on the list!";
      emailInput.value = "";
      notifyBtn.disabled = true;
    });
  }


  /* ─────────────────────────────
     4. NAVBAR SCROLL
  ───────────────────────────── */

  const navbar = document.getElementById("navbar");

  if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.style.background =
        window.scrollY > 40
          ? "rgba(6,3,15,0.98)"
          : "rgba(6,3,15,0.85)";
    });
  }


  /* ─────────────────────────────
     5. WATCH CLOCK (SAFE)
  ───────────────────────────── */

  function updateWatchFaces() {
    const heroHour = document.getElementById("hero-hour");
    const heroMin = document.getElementById("hero-minute");
    const heroSec = document.getElementById("hero-second");
    const heroText = document.getElementById("hero-digital");

    const specsHour = document.getElementById("specs-hour");
    const specsMin = document.getElementById("specs-minute");
    const specsSec = document.getElementById("specs-second");
    const specsText = document.getElementById("specs-digital");

    const now = new Date();

    const hrs = now.getHours() % 12;
    const mins = now.getMinutes();
    const secs = now.getSeconds();

    const secDeg = secs * 6;
    const minDeg = mins * 6 + secs * 0.1;
    const hourDeg = hrs * 30 + mins * 0.5;

    const timeStr = String(now.getHours()).padStart(2, "0") + ":" +
                    String(now.getMinutes()).padStart(2, "0");

    function setHand(el, deg, cx, cy) {
      if (el) el.setAttribute("transform", `rotate(${deg}, ${cx}, ${cy})`);
    }

    function setText(el, value) {
      if (el) el.textContent = value;
    }

    setHand(heroHour, hourDeg, 100, 130);
    setHand(heroMin, minDeg, 100, 130);
    setHand(heroSec, secDeg, 100, 130);
    setText(heroText, timeStr);

    setHand(specsHour, hourDeg, 100, 120);
    setHand(specsMin, minDeg, 100, 120);
    setHand(specsSec, secDeg, 100, 120);
    setText(specsText, timeStr);
  }

  updateWatchFaces();
  setInterval(updateWatchFaces, 1000);

});
