document.addEventListener('DOMContentLoaded', () => {

/* ==================================
   PAGE DOTS (right-side jump nav)
   =================================== */
const pageDots = document.querySelectorAll('.yn-page-dot');
const dotSections = Array.from(pageDots).map(dot => document.getElementById(dot.dataset.target));

pageDots.forEach(dot => {
  dot.addEventListener('click', () => {
    const target = document.getElementById(dot.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

const dotObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const index = dotSections.indexOf(entry.target);
      pageDots.forEach(d => d.classList.remove('active'));
      if (index !== -1) pageDots[index].classList.add('active');
    }
  });
}, { threshold: 0.5 });

dotSections.forEach(section => { if (section) dotObserver.observe(section); });
  
  /* =====================================================
     Helper — turn a dish name into a CSS-safe class name
     e.g. "Dan Dan Noodles" -> "cd-dish-dan-dan-noodles"
     Use this class in ChengDu.css to add each dish's photo:
       .cd-dish-dan-dan-noodles { background-image:url("dan-dan-noodles.jpeg"); }
     ===================================================== */
  function slugify(name) {
    return 'cd-dish-' + name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  /* =====================================================
     HERO — reveal-on-load
     ===================================================== */
  document.querySelectorAll('.cd-hero [data-reveal]').forEach(el => {
    requestAnimationFrame(() => el.classList.add('is-visible'));
  });

  /* =====================================================
     LANDMARKS — cards appear one by one on scroll
     ===================================================== */
  const landmarkCards = document.querySelectorAll('#landmarks [data-reveal]');
  const landmarkObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = Array.from(landmarkCards).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('is-visible'), index * 160);
        landmarkObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  landmarkCards.forEach(card => landmarkObserver.observe(card));

  /* =====================================================
     ITINERARY — alternating photo timeline
        Active item highlighted + progress line fill
     ===================================================== */
  const timelineItems = document.querySelectorAll('.cd-timeline2-item');
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('is-active', entry.isIntersecting);
    });
  }, { threshold: 0.4, rootMargin: '-15% 0px -15% 0px' });
  timelineItems.forEach(item => timelineObserver.observe(item));

  const timeline = document.getElementById('cdTimeline');
  const progressBar = document.getElementById('cdTimelineProgress');
  function updateTimelineProgress() {
    if (!timeline || !progressBar) return;
    const rect = timeline.getBoundingClientRect();
    const viewportH = window.innerHeight;
    const total = rect.height;
    const seen = Math.min(Math.max(viewportH * 0.6 - rect.top, 0), total);
    const pct = total > 0 ? (seen / total) * 100 : 0;
    progressBar.style.height = pct + '%';
  }
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress);
  updateTimelineProgress();

  /* =====================================================
    SPICE METER — each dish card gets its own image
        holder class (see slugify above) + expands with
        more info when tapped/selected
     ===================================================== */
  const spiceData = {
    mild: [
      { name: 'Dan Dan Noodles', tag: 'STREET CLASSIC',
        more: 'A light chili oil and minced pork sauce over thin wheat noodles — the everyday gateway dish.' },
      { name: 'Zhong Dumplings', tag: 'SWEET & SAVOURY',
        more: 'Boiled pork dumplings in a mild soy-chili glaze with a touch of sugar to soften the heat.' },
      { name: 'Clear Broth Side', tag: 'PALATE CLEANSER',
        more: 'Served alongside spicier dishes so you always have somewhere cool to retreat to.' },
    ],
    medium: [
      { name: 'Kung Pao Chicken', tag: 'SICHUAN STAPLE',
        more: 'Diced chicken, peanuts and dried chilies stir-fried in a sweet-savoury sauce with a real kick.' },
      { name: 'Mapo Tofu', tag: 'NUMBING BEGINS',
        more: 'Silken tofu in a red chili-bean sauce — your first real introduction to "ma" (numbing) spice.' },
      { name: 'Twice-Cooked Pork', tag: 'HOME-STYLE',
        more: 'Pork belly boiled, sliced, then fried with fermented bean paste and leeks for deep savoury heat.' },
    ],
    sichuan: [
      { name: 'Mala Hotpot', tag: 'THE MAIN EVENT',
        more: 'A pot of dried chilies, Sichuan peppercorns and beef tallow. Your lips go numb before your tongue burns.' },
      { name: 'Spicy Rabbit Head', tag: 'LOCAL FAVOURITE',
        more: 'A street-market specialty — braised in a fiery marinade and eaten with your hands, tears optional.' },
      { name: 'Water-Boiled Fish', tag: 'DECEPTIVELY RED',
        more: 'Fish fillets swimming under a blanket of whole dried chilies and peppercorns — mostly for aroma. Mostly.' },
    ],
    dangerous: [
      { name: 'Extra-Mala Hotpot', tag: 'ENTER AT OWN RISK',
        more: 'Double the peppercorns, double the chili oil. Locals order this to prove a point, not for flavour balance.' },
      { name: 'Chongqing-Style Dry Pot', tag: 'NO ESCAPE BROTH',
        more: 'No broth to dilute anything — every ingredient is tossed directly in chili and oil. There is no cooling down.' },
      { name: 'Chili Oil Cold Noodles', tag: 'MISLEADINGLY COLD',
        more: 'Served chilled, which somehow makes the heat hit harder and linger longer. A trap for the unprepared.' },
    ],
  };

  const spiceCardsEl = document.getElementById('spiceCards');
  const spiceBtns = document.querySelectorAll('.cd-spice-btn');

  function renderSpiceCards(level) {
    const dishes = spiceData[level] || [];
    spiceCardsEl.innerHTML = dishes.map((d, i) => `
      <div class="col-md-4">
        <div class="cd-spice-card" data-index="${i}">
          <div class="cd-dish-img ${slugify(d.name)}">
            
          </div>
          <div class="cd-spice-card-body">
            <span class="cd-dish-tag">${d.tag}</span>
            <h4>${d.name}</h4>
            <div class="cd-spice-more">${d.more}</div>
            <span class="cd-card-toggle"><i class="bi bi-chevron-down"></i> Tap for more</span>
          </div>
        </div>
      </div>
    `).join('');

    spiceCardsEl.querySelectorAll('.cd-spice-card').forEach(card => {
      card.addEventListener('click', () => {
        const wasOpen = card.classList.contains('is-open');
        spiceCardsEl.querySelectorAll('.cd-spice-card').forEach(c => c.classList.remove('is-open'));
        if (!wasOpen) card.classList.add('is-open');
      });
    });
  }

  spiceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      spiceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSpiceCards(btn.dataset.level);
    });
  });

  renderSpiceCards('mild'); // initial state

  /* =====================================================
     BONUS — Build Your Hotpot mini game
     Result card colour intensifies with the spice level
     chosen — mild is light, Sichuan level is red, dangerous
     is near-black.
     ===================================================== */
  document.querySelectorAll('.cd-choice-group').forEach(group => {
    group.querySelectorAll('.cd-choice').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.cd-choice').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });
  });

  const personalities = {
    'Mild': { emoji: '🍵', title: 'The Slow Living Type',
      text: 'You came for the tea houses, not the tears. Chengdu\'s gentler side suits you best.', cls: 'cd-result-mild' },
    'Sichuan Level': { emoji: '🌶️', title: 'The Adventurous Traveller',
      text: 'Bold enough to chase the numbing tingle, sensible enough to keep tea within reach.', cls: 'cd-result-sichuan' },
    'Dangerous': { emoji: '🔥', title: 'The Fearless Local',
      text: 'You ordered like someone who grew up here. Chengdu respects you — and your stomach lining does not.', cls: 'cd-result-dangerous' },
  };

  const hotpotSubmit = document.getElementById('hotpotSubmit');
  const hotpotResult = document.getElementById('hotpotResult');

  hotpotSubmit.addEventListener('click', () => {
    const values = {};
    document.querySelectorAll('.cd-choice-group').forEach(group => {
      const active = group.querySelector('.cd-choice.active');
      values[group.dataset.group] = active ? active.dataset.value : '';
    });

    const result = personalities[values.spice] || personalities['Mild'];

    hotpotResult.innerHTML = `
      <div class="cd-hotpot-result-inner ${result.cls}">
        <span class="cd-dish-emoji">${result.emoji}</span>
        <h4>${result.title}</h4>
        <p>${result.text}</p>
        <p class="mt-3" style="font-size:.85rem; opacity:.85;">
          Your pot: ${values.base} · ${values.veg} · ${values.meat} · ${values.spice}
        </p>
      </div>
    `;
    hotpotResult.classList.add('is-visible');
  });

  /* =====================================================
     BONUS — Bianlian mask tap-to-change
     Cycles a caption + border tint on the placeholder.
     Once a real photo is on .cd-mask (background-image),
     you can swap the same class-cycling trick to swap
     between several mask photos instead.
     ===================================================== */
  const mask = document.getElementById('bianlianMask');
  const caption = document.getElementById('maskCaption');
  const masks = [
    { label: 'The brave mask — red, for heroic roles', img: '../images/Chengdu/Sichuan Bianlian_red.jpeg', tint: 'var(--gold)' },
    { label: 'The joyful mask — yellow, worn for celebration scenes.', img: '../images/Chengdu/Sichuan Bianlian_yellow.jpeg', tint: 'var(--red)' },
    { label: 'The fierce mask — bold black, for warrior roles.', img: '../images/Chengdu/Sichuan Bianlian_black.jpeg', tint: '#241610' },
    { label: 'The wise mask — deep blue, for scholar roles.', img: '../images/Chengdu/Sichuan Bianlian_blue.jpeg', tint: '#4A5D3A' },
  ];
  let maskIndex = 0;

  mask.addEventListener('click', () => {
    mask.classList.add('is-changing');
    setTimeout(() => {
      maskIndex = (maskIndex + 1) % masks.length;
      mask.style.backgroundImage = `url("${masks[maskIndex].img}")`;
      mask.style.borderColor = masks[maskIndex].tint;
      caption.textContent = masks[maskIndex].label;
    }, 130);
    setTimeout(() => mask.classList.remove('is-changing'), 260);
  });

  /* =====================================================
     MOBILE NAV — hamburger toggle
     ===================================================== */
  const navToggle = document.querySelector('.navtoggle');
  const navLinks = document.querySelector('.navlinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('navlinks-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('navlinks-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =====================================================
     Smooth scroll for in-page nav links
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});
