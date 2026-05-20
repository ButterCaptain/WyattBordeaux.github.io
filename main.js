
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
      <div class="nav-links">
        <a href="index.html#skills">Skills</a>
        <a href="index.html#projects">Projects</a>
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
    .nav-links {
      display: flex;
      align-items: center;
      gap: 2rem;
      font-family: 'Barlow Condensed', sans-serif;
      font-size: 0.82rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .nav-links a { color: #C4C4CC; transition: color 0.2s; }
    .nav-links a:hover { color: #F5F4F0; }
    .nav-links .nav-cta {
      color: #F5F4F0;
      border: 1px solid #C8102E;
      padding: 0.35rem 0.9rem;
      border-radius: 2px;
      transition: background 0.2s;
    }
    .nav-links .nav-cta:hover { background: #C8102E; }
    @media (max-width: 560px) {
      .nav-links a:not(.nav-cta) { display: none; }
    }
  `;
  document.head.appendChild(style);

  // Show frosted glass effect after scrolling past hero top
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
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