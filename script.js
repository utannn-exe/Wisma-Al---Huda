/* ============================
   WISMA AL-HUDA — JAVASCRIPT
   ============================ */

/* ---- THEME DATA ---- */
const branchData = {
  unnes: {
    heroSub: "Tempat tinggal yang nyaman, aman, dan tenang dekat Kampus UNNES — Gunungpati, Semarang.",
    heroCardTag: "Dekat UNNES",
    heroCardAddr: "Sekaran, Gunungpati, Semarang 50229",
    pillLabel: "Cabang UNNES",
  },
  unwahas: {
    heroSub: "Kos nyaman, bersih, dan bernuansa Islami dekat Kampus UNWAHAS — Nongkosawit, Gunungpati, Semarang.",
    heroCardTag: "Dekat UNWAHAS",
    heroCardAddr: "Jl. Nongkosawit Raya No.4, Semarang 50224",
    pillLabel: "Cabang UNWAHAS",
  }
};

/* ---- BRANCH SWITCHER ---- */
const body = document.body;
const pillUnnes = document.getElementById('pillUnnes');
const pillUnwahas = document.getElementById('pillUnwahas');
const heroSub = document.getElementById('heroSub');
const heroCardTag = document.getElementById('heroCardTag');
const heroCardAddr = document.getElementById('heroCardAddr');

function switchBranch(branch) {
  body.setAttribute('data-branch', branch);

  // Update pills
  if (branch === 'unnes') {
    pillUnnes.classList.add('active');
    pillUnwahas.classList.remove('active');
  } else {
    pillUnwahas.classList.add('active');
    pillUnnes.classList.remove('active');
  }

  // Update hero content
  const data = branchData[branch];
  heroSub.style.opacity = '0';
  setTimeout(() => {
    heroSub.textContent = data.heroSub;
    heroSub.style.opacity = '1';
  }, 250);
  heroCardTag.textContent = data.heroCardTag;
  heroCardAddr.textContent = data.heroCardAddr;

  // Scroll to top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Save to sessionStorage
  sessionStorage.setItem('branch', branch);
}

pillUnnes.addEventListener('click', () => switchBranch('unnes'));
pillUnwahas.addEventListener('click', () => switchBranch('unwahas'));

// Restore last branch
const savedBranch = sessionStorage.getItem('branch');
if (savedBranch) switchBranch(savedBranch);


/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar
  if (scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll to top button
  if (scrollY > 300) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ---- HAMBURGER MENU ---- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);

  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});


/* ---- LOKASI TABS ---- */
const ltabs = document.querySelectorAll('.ltab');
const lokPanels = document.querySelectorAll('.lok-panel');

ltabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const loc = tab.getAttribute('data-loc');

    // Update tabs
    ltabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Update panels with fade
    lokPanels.forEach(p => {
      p.classList.remove('active');
      p.style.opacity = '0';
    });

    const targetPanel = document.getElementById('lok' + loc.charAt(0).toUpperCase() + loc.slice(1));
    if (targetPanel) {
      targetPanel.classList.add('active');
      setTimeout(() => {
        targetPanel.style.opacity = '1';
      }, 50);
    }
  });
});

// Set initial opacity for panels
lokPanels.forEach(p => {
  p.style.transition = 'opacity 0.3s ease';
  if (p.classList.contains('active')) p.style.opacity = '1';
});


/* ---- SCROLL REVEAL ---- */
function addRevealClasses() {
  const targets = [
    '.tentang-text',
    '.tentang-visual',
    '.fas-card',
    '.branch-card',
    '.lok-panel',
    '.kontak-text',
    '.kform',
    '.footer-brand',
    '.footer-links',
    '.footer-cabang',
  ];

  targets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        el.style.transitionDelay = `${i * 0.08}s`;
      }
    });
  });
}

function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

addRevealClasses();
window.addEventListener('scroll', revealOnScroll, { passive: true });
revealOnScroll(); // Run once on load


/* ---- SMOOTH ACTIVE NAV ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(section => {
    const sTop = section.offsetTop;
    const sHeight = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollY >= sTop && scrollY < sTop + sHeight) {
      navLinks.forEach(a => {
        a.style.color = '';
        a.style.fontWeight = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink && !activeLink.classList.contains('nav-cta')) {
        activeLink.style.color = 'var(--theme-primary)';
        activeLink.style.fontWeight = '600';
      }
    }
  });
}, { passive: true });


/* ---- BRANCH CARDS LINK TO TABS ---- */
// Clicking "tanya ketersediaan" on branch cards auto-switches lokasi tab
document.querySelectorAll('.btn-branch--unnes').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      const ltab = document.querySelector('.ltab[data-loc="unnes"]');
      if (ltab) ltab.click();
    }, 300);
  });
});
document.querySelectorAll('.btn-branch--unwahas').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      const ltab = document.querySelector('.ltab[data-loc="unwahas"]');
      if (ltab) ltab.click();
    }, 300);
  });
});


/* ---- WHATSAPP SEND ---- */
function sendWhatsApp() {
  const name = document.querySelector('.kfield input[placeholder*="nama"]')?.value || '';
  const phone = document.querySelector('.kfield input[placeholder*="08"]')?.value || '';
  const branch = document.querySelector('.kfield select')?.value || 'UNNES';
  const msg = document.querySelector('.kfield textarea')?.value || '';

  const waNumber = '6287809134363'; // Replace with actual number
  const text = encodeURIComponent(
    `Assalamu'alaikum, perkenalkan saya *${name || '...'}*.\n\n` +
    `Saya tertarik dengan *Wisma Al-Huda ${branch}*.\n\n` +
    (msg ? `Pesan: ${msg}\n\n` : '') +
    `No. WA saya: ${phone || '...'}\n\n` +
    `Mohon info lebih lanjut. Terima kasih 🙏`
  );

  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
}


/* ---- HERO CARD FLOAT ANIMATION ---- */
const hcards = document.querySelectorAll('.hcard');
hcards.forEach((card, i) => {
  card.animate([
    { transform: card.style.transform || 'none' },
    { transform: (card.style.transform || '') + ' translateY(-8px)' },
    { transform: card.style.transform || 'none' },
  ], {
    duration: 3000 + i * 700,
    iterations: Infinity,
    easing: 'ease-in-out',
    delay: i * 500,
  });
});


/* ---- TOUCH: Branch pills highlight on mobile ---- */
const pills = document.querySelectorAll('.pill');
pills.forEach(pill => {
  pill.addEventListener('touchstart', () => {
    pill.style.transform = 'scale(0.96)';
  }, { passive: true });
  pill.addEventListener('touchend', () => {
    pill.style.transform = '';
  }, { passive: true });
});


/* ---- PREFERS REDUCED MOTION ---- */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.querySelectorAll('.t-ornament-ring').forEach(el => {
    el.style.animation = 'none';
  });
  document.querySelectorAll('.t-badge-float').forEach(el => {
    el.style.animation = 'none';
  });
}


/* ---- GALERI TABS ---- */
const gtabs = document.querySelectorAll('.gtab');
const galeriPanels = document.querySelectorAll('.galeri-panel');

gtabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-galeri');

    gtabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    galeriPanels.forEach(p => p.classList.remove('active'));
    const panel = document.getElementById('galeri' + target.charAt(0).toUpperCase() + target.slice(1));
    if (panel) panel.classList.add('active');
  });
});

// Auto-sync galeri tab with branch switcher
function syncGaleriTab(branch) {
  const matchTab = document.querySelector(`.gtab[data-galeri="${branch}"]`);
  if (matchTab) matchTab.click();
}

// Hook into existing switchBranch (patch)
const _origSwitchBranch = switchBranch;
window.switchBranch = function(branch) {
  _origSwitchBranch(branch);
  syncGaleriTab(branch);
};
pillUnnes.addEventListener('click', () => syncGaleriTab('unnes'));
pillUnwahas.addEventListener('click', () => syncGaleriTab('unwahas'));


/* ---- LIGHTBOX ---- */
let lightboxItems = [];
let lightboxIndex = 0;

function openLightbox(el) {
  const img = el.querySelector('img');
  if (!img || !img.src || img.style.display === 'none') return;

  // Collect all visible images in the same galeri panel
  const panel = el.closest('.galeri-panel');
  lightboxItems = Array.from(panel.querySelectorAll('.galeri-item')).filter(item => {
    const i = item.querySelector('img');
    return i && i.style.display !== 'none';
  });
  lightboxIndex = lightboxItems.indexOf(el);

  showLightboxSlide(lightboxIndex);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxSlide(idx) {
  const item = lightboxItems[idx];
  if (!item) return;
  const img = item.querySelector('img');
  const caption = item.querySelector('.galeri-caption');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightboxCaption').textContent = caption ? caption.textContent : '';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

function moveLightbox(dir) {
  lightboxIndex = (lightboxIndex + dir + lightboxItems.length) % lightboxItems.length;
  showLightboxSlide(lightboxIndex);
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') moveLightbox(1);
  if (e.key === 'ArrowLeft') moveLightbox(-1);
});


/* ---- CONSOLE GREETING ---- */
console.log('%c🕌 Wisma Al-Huda', 'font-size:20px;font-weight:bold;color:#2D6A4F;');
console.log('%cKos Nyaman & Islami · Gunungpati, Semarang', 'color:#52B788;');