
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


window.addEventListener('DOMContentLoaded', () => {
  const profile = document.getElementById('profileSection');
  if (profile) {
    // Small delay so the page paints first, then the card rises in
    setTimeout(() => profile.classList.add('visible'), 200);
  }
});



const heroBg = document.getElementById('heroBg');

function updateParallax() {
  if (!heroBg) return;
  const scrollY = window.scrollY;
  // Move the background layer up as user scrolls
  heroBg.style.transform = `translateY(${scrollY * 0.4}px)`;

  // Fade the whole hero background to 0 opacity by the time
  // scrollY reaches the hero height. Gives the "fades away" effect.
  const heroHeight = document.getElementById('hero').offsetHeight;
  const fadeProgress = Math.min(scrollY / (heroHeight * 0.65), 1);
  heroBg.style.opacity = 1 - fadeProgress;
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax(); // run once on load


const revealTargets = document.querySelectorAll('.reveal, .reveal-stagger');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      // Once revealed, stop watching to save performance
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,      // trigger when 12% of element is visible
  rootMargin: '0px 0px -40px 0px'  // trigger slightly before fully in view
});

revealTargets.forEach(el => revealObserver.observe(el));


(function buildNav() {
  const nav = document.createElement('nav');
  nav.id = 'topNav';
  nav.innerHTML = `
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">UNLV</a>
      <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="navLinks">
        <i class="ph ph-list"></i>
      </button>
      <div class="nav-links" id="navLinks">
        <a href="index.html#skills">Skills</a>
        <a href="index.html#projects">Projects</a>
        <a href="index.html#orgs">Orgs</a>
        <a href="index.html#hobbies">Hobbies</a>
        <a href="mailto:wyatt.l.bordeaux@gmail.com" class="nav-cta">Contact</a>
      </div>
    </div>
  `;
  document.body.prepend(nav);

  const style = document.createElement('style');
  style.textContent = `
    #topNav {
      position: fixed;
      top: 20px; left: 0; right: 0;
      z-index: 100;
      padding: 0 2rem;
      height: 56px;
      display: flex;
      align-items: center;
      background: transparent;
      transition: background 0.35s, backdrop-filter 0.35s, border-color 0.35s;
      border-bottom: 1px solid transparent;
    }
    #topNav.scrolled {
      background: rgba(10, 10, 11, 0.88);
      backdrop-filter: blur(14px);
      border-color: rgba(255,255,255,0.06);
    }
    .nav-inner {
      max-width: 1180px;
      width: 100%;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-logo {
      font-family: 'Cormorant Garamond', serif;
      font-size: 3rem;
      font-weight: 700;
      color: #C8102E;
      letter-spacing: 0.04em;
    }
    .nav-toggle {
      display: none;
      background: none;
      border: none;
      color: #F5F4F0;
      font-size: 1.6rem;
      cursor: pointer;
      padding: 0.25rem;
      line-height: 1;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.82rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .nav-links a { position: relative; color: #C4C4CC; transition: color 0.2s; }
    .nav-links a:hover { color: #F5F4F0; }
    .nav-links a.active { color: #F5F4F0; }
    .nav-links a.active::after {
      content: '';
      position: absolute;
      left: 0; right: 0;
      bottom: -6px;
      height: 2px;
      background: #C8102E;
    }
    .nav-links .nav-cta {
      color: #F5F4F0;
      border: 1px solid #C8102E;
      padding: 0.35rem 0.9rem;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .nav-links .nav-cta:hover { background: #C8102E; }
    .nav-links .nav-cta.active::after { display: none; }
    @media (max-width: 560px) {
      .nav-toggle { display: block; }
      .nav-links {
        position: fixed;
        top: 76px;
        left: 1rem;
        right: 1rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.1rem;
        background: rgba(10, 10, 11, 0.94);
        backdrop-filter: blur(14px);
        border: 1px solid rgba(255,255,255,0.08);
        border-radius: 6px;
        padding: 1.5rem;
        transform-origin: top;
        transform: scaleY(0.95) translateY(-8px);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.2s, transform 0.2s;
      }
      .nav-links.open {
        opacity: 1;
        transform: scaleY(1) translateY(0);
        pointer-events: auto;
      }
      .nav-links a:not(.nav-cta) { display: block; }
    }
  `;
  document.head.appendChild(style);

  // Show frosted glass effect after scrolling past hero top
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile hamburger toggle
  const toggle = nav.querySelector('.nav-toggle');
  const navLinks = nav.querySelector('.nav-links');

  function closeMenu() {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.querySelector('i').className = 'ph ph-list';
  }

  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.querySelector('i').className = isOpen ? 'ph ph-x' : 'ph ph-list';
  });

  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && navLinks.classList.contains('open')) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 560 && navLinks.classList.contains('open')) closeMenu();
  });

  // Active-section highlighting (separate observer from the reveal animation one above)
  const sectionIds = ['skills', 'projects', 'orgs', 'hobbies'];
  const navLinkMap = new Map();
  sectionIds.forEach(id => {
    const link = navLinks.querySelector(`a[href="index.html#${id}"]`);
    if (link) navLinkMap.set(id, link);
  });

  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if (sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const link = navLinkMap.get(entry.target.id);
        if (!link) return;
        navLinkMap.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    }, {
      root: null,
      rootMargin: '-76px 0px -55% 0px',
      threshold: 0
    });

    sections.forEach(s => navObserver.observe(s));
  }
})();


/* ----------------------------------------------------------------
   5. PROJECT CARDS — keyboard accessibility
   Cards use onclick for navigation; this adds Enter key support
   so keyboard users can also activate them.
   ---------------------------------------------------------------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});


/* ----------------------------------------------------------------
   6. ORGS GALLERY — click-to-enlarge lightbox
   Clicking (or Enter/Space on) an org-gallery photo opens it full-size
   in an overlay. Click outside the image, the close button, or Escape
   dismisses it.
   ---------------------------------------------------------------- */
(function initLightbox() {
  const galleryImgs = document.querySelectorAll('.org-gallery img');
  if (!galleryImgs.length) return;

  const overlay = document.createElement('div');
  overlay.id = 'lightboxOverlay';
  overlay.innerHTML = `
    <button class="lightbox-close" aria-label="Close image">
      <i class="ph ph-x"></i>
    </button>
    <img class="lightbox-img" src="" alt="" />
  `;
  document.body.appendChild(overlay);

  const style = document.createElement('style');
  style.textContent = `
    .org-gallery img { cursor: zoom-in; }
    #lightboxOverlay {
      position: fixed;
      inset: 0;
      z-index: 200;
      background: rgba(10, 10, 11, 0.92);
      display: none;
      align-items: center;
      justify-content: center;
      padding: 3rem 2rem;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    #lightboxOverlay.open {
      display: flex;
      opacity: 1;
    }
    .lightbox-img {
      max-width: 90vw;
      max-height: 85vh;
      object-fit: contain;
      border-radius: var(--card-radius);
      box-shadow: 0 20px 60px rgba(0,0,0,0.7);
    }
    .lightbox-close {
      position: fixed;
      top: 1.5rem;
      right: 1.5rem;
      width: 44px;
      height: 44px;
      background: rgba(255,255,255,0.06);
      border: 1px solid var(--gray-600);
      border-radius: 50%;
      color: #F5F4F0;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: border-color 0.2s, background 0.2s;
    }
    .lightbox-close:hover {
      border-color: var(--scarlet);
      background: rgba(200, 16, 46, 0.15);
    }
  `;
  document.head.appendChild(style);

  const lightboxImg = overlay.querySelector('.lightbox-img');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(img) {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || '';
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  galleryImgs.forEach(img => {
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger image');
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeLightbox();
  });
})();