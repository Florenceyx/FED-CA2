  // header on scroll
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  // dust particles
  const dust = document.getElementById('dust');
  for(let i=0;i<24;i++){
    const s = document.createElement('span');
    s.style.left = Math.random()*100+'%';
    s.style.top = Math.random()*100+'%';
    s.style.animationDelay = (Math.random()*9)+'s';
    s.style.animationDuration = (6+Math.random()*6)+'s';
    dust.appendChild(s);
  }

  // begin excavation button scrolls to treasures
  document.getElementById('beginBtn').addEventListener('click', () => {
    document.getElementById('treasures').scrollIntoView({behavior:'smooth'});
  });

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('is-visible'); });
  }, {threshold:.15});
  revealEls.forEach(el => io.observe(el));

  // food card expand
  document.querySelectorAll('.f-card').forEach(card => {
    card.addEventListener('click', () => {
      const isExpanded = card.classList.contains('expanded');
      document.querySelectorAll('.f-card').forEach(c => c.classList.remove('expanded'));
      if(!isExpanded){
        card.classList.add('expanded');
        card.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
      }
    });
  });

  // itinerary highlight on scroll
  const stops = document.querySelectorAll('.stop');
  const cards = document.querySelectorAll('.itin-card');
  const bar = document.getElementById('itinBar');
  const itinSection = document.getElementById('itinerary');

  function updateItinerary(){
    const rect = itinSection.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress through the section, 0 to 1
    let progress = (vh*0.8 - rect.top) / (rect.height - vh*0.2);
    progress = Math.max(0, Math.min(1, progress));
    const activeIndex = Math.min(6, Math.floor(progress * 7));
    bar.style.width = (progress*100)+'%';
    stops.forEach((s,i)=> s.classList.toggle('active', i<=activeIndex));
    cards.forEach((c,i)=> c.classList.toggle('active', i<=activeIndex));
  }
  window.addEventListener('scroll', updateItinerary);
  updateItinerary();
  document.querySelectorAll('.itin-card').forEach(card => {
  card.addEventListener('click', () => {
    document.getElementById('itinModalTitle').textContent = card.dataset.title;
    document.getElementById('itinModalTime').textContent = card.dataset.time;
    document.getElementById('itinModalDesc').textContent = card.dataset.desc;
    document.getElementById('itinModalImg').style.backgroundImage = `url('${card.dataset.img}')`;
  });
});

  // nav active link on scroll
  const navLinks = document.querySelectorAll('nav a');
  const sections = ['home','treasures','food','itinerary','gallery'].map(id=>document.getElementById(id));
  window.addEventListener('scroll', () => {
    let current = sections[0].id;
    sections.forEach(sec => { if(window.scrollY + 140 >= sec.offsetTop) current = sec.id; });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#'+current));
  });