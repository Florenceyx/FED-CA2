function photoBox(file, alt){
  const src = `../images/${file}.jpg`;
  return `<div class="photo-frame" data-file="${src}">
      <img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove(); this.parentElement.classList.add('img-missing')">
    </div>`;
}

/* ============ BOOK CONTENT ============ */
const chapters = [
  {
    title:"Origins of Beijing",
    img:"origins-of-beijing",
    fact:"The city was originally known as Ji, over 3,000 years ago.",
    text:"Long before it bore the name Beijing, this basin at the edge of the northern plains was a meeting point of trade routes, rivers and rival peoples. Settlements here stretch back over three thousand years, growing from a frontier outpost into a seat of power that would one day command an empire."
  },
  {
    title:"Dynasties",
    img:"dynasties",
    fact:"Beijing has served as an imperial capital under five different dynasties.",
    text:"Yuan, Ming and Qing rulers each left their mark on the city, rebuilding its walls, gates and palaces to declare their legitimacy under heaven. Each dynasty inherited the last one's foundations and raised the skyline a little higher, layering court upon court of imperial ambition."
  },
  {
    title:"Forbidden City",
    img:"forbidden-city",
    fact:"Nearly a million labourers helped build it over roughly 14 years.",
    text:"For five centuries, the Forbidden City stood at the heart of Beijing as the private world of emperors — nearly a thousand buildings arranged along a single sacred axis, closed to all but the imperial household. Today its vermilion walls and golden roofs remain the city's ceremonial centre."
  },
  {
    title:"Temple of Heaven",
    img:"temple-of-heaven",
    fact:"Its main hall was built entirely without a single nail.",
    text:"Twice a year, the emperor processed to this temple to pray for a good harvest on behalf of his people. Its circular halls and triple-tiered roofs, set within a vast park, embody an ancient cosmology in which heaven is round and earth is square."
  },
  {
    title:"Summer Palace",
    img:"summer-palace",
    fact:"Its Long Corridor is painted with over 14,000 individual scenes.",
    text:"Built around the still waters of Kunming Lake, the Summer Palace was the imperial family's escape from the formality of the court — a landscape of pavilions, bridges and covered walkways designed for leisure rather than ceremony, and a retreat that survives as a garden masterpiece."
  }
];

const pageIndicator = document.getElementById('pageIndicator');
const pageLeft = document.getElementById('pageLeft');
const pageRight = document.getElementById('pageRight');
const book3d = document.getElementById('book3d');
let currentChapter = -1; // -1 = contents/cover view

function renderContentsLeft(){
  pageLeft.innerHTML = `
    <div class="page-illustration">${photoBox('great-wall','The Great Wall of China')}</div>
    <div class="page-caption">THE GREAT WALL OF CHINA</div>`;
}
function renderContentsRight(){
  const items = chapters.map((c,i)=>`
    <li data-idx="${i}">
      <div class="li-row">
        <span class="num">${String(i+1).padStart(2,'0')}</span>
        <span>${c.title}</span>
      </div>
      <div class="li-tooltip">
        <div class="li-thumb">${photoBox(c.img, c.title)}</div>
        <span>${c.fact}</span>
      </div>
    </li>`).join('');
  pageRight.innerHTML = `
    <div class="contents-title">CONTENTS</div>
    <div class="contents-rule"></div>
    <ul class="contents-list">${items}</ul>`;
  pageRight.querySelectorAll('.contents-list li').forEach(li=>{
    li.addEventListener('click', ()=> goToChapter(parseInt(li.dataset.idx), 'next'));
  });
}
function renderChapter(i){
  const c = chapters[i];
  pageLeft.innerHTML = `
    <div class="page-illustration">${photoBox(c.img, c.title)}</div>
    <div class="page-caption">${c.title.toUpperCase()}</div>`;
  pageRight.innerHTML = `
    <div class="chapter-title">${c.title}</div>
    <div class="chapter-text">${c.text}</div>`;
}

function turnPage(direction, renderFn){
  const isNext = direction === 'next';
  const sourcePage = isNext ? pageRight : pageLeft;
  const leaf = document.createElement('div');
  leaf.className = 'flip-leaf ' + (isNext ? 'right' : 'left');
  leaf.innerHTML = sourcePage.innerHTML;
  book3d.appendChild(leaf);

  renderFn(); // swap the real content in immediately, underneath the leaf

  void leaf.offsetWidth; // force layout so the transition below actually animates
  requestAnimationFrame(()=> leaf.classList.add('do-flip'));
  leaf.addEventListener('transitionend', ()=> leaf.remove(), {once:true});
}

function goToContents(direction='prev'){
  currentChapter = -1;
  turnPage(direction, ()=>{ renderContentsLeft(); renderContentsRight(); });
  pageIndicator.textContent = "CONTENTS";
  updatePrevNextState();
}
function goToChapter(i, direction='next'){
  currentChapter = i;
  turnPage(direction, ()=> renderChapter(i));
  pageIndicator.textContent = `${i+1} / ${chapters.length}`;
  updatePrevNextState();
}
document.getElementById('prevPage').addEventListener('click', ()=>{
  if(currentChapter === -1) return;
  if(currentChapter === 0) goToContents('prev');
  else goToChapter(currentChapter-1, 'prev');
});
document.getElementById('nextPage').addEventListener('click', ()=>{
  if(currentChapter === -1) goToChapter(0, 'next');
  else if(currentChapter < chapters.length-1) goToChapter(currentChapter+1, 'next');
});
document.getElementById('exploreBtn').addEventListener('click', ()=>{
  document.getElementById('book').scrollIntoView({behavior:'smooth'});
  if(currentChapter === -1) setTimeout(()=>goToChapter(0, 'next'), 400);
});
document.getElementById('beginBtn').addEventListener('click', function(e){
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height) * 1.2;
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = size + 'px';
  ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
  ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', ()=> ripple.remove(), {once:true});
  btn.classList.add('pulse-glow');
  setTimeout(()=> btn.classList.remove('pulse-glow'), 700);
  document.getElementById('book').scrollIntoView({behavior:'smooth'});
});
function updatePrevNextState(){
  document.getElementById('prevPage').disabled = currentChapter === -1;
}
updatePrevNextState();
renderContentsLeft();
renderContentsRight();

/* ============ IMPERIAL FLAVOUR ============ */
const dishes = [
  {name:"Peking Duck", img:"peking-duck", desc:"Roasted until the skin turns burnished and crisp, then carved tableside and wrapped in thin pancakes with scallion, cucumber and sweet bean sauce.", price:"¥ 218 / whole duck", place:"Quanjude, Qianmen", funFact:"Served at the imperial court since the Ming Dynasty."},
  {name:"Zhajiangmian", img:"zhajiangmian", desc:"Thick wheat noodles tossed in a rich, savoury paste of fermented soybean sauce and minced pork, finished with fresh shredded vegetables.", price:"¥ 28 / bowl", place:"Old Beijing Zhajiangmian King", funFact:"Sometimes nicknamed 'Beijing spaghetti' by visitors."},
  {name:"Douzhi", img:"douzhi", desc:"A tangy, fermented mung-bean drink that is very much an acquired taste — locals swear by its distinctive sourness.", price:"¥ 8 / bowl", place:"Nishilou Douzhi", funFact:"Its smell alone is enough to divide a room."},
  {name:"Lüdagun", img:"ludagun", desc:"Sweet glutinous rice rolled in toasted soybean flour, known as 'rolling donkey' for the dusty golden coating left in its wake.", price:"¥ 15 / 3 pieces", place:"Baodu Feng, Nanluoguxiang", funFact:"Named for the dust a donkey kicks up rolling in dirt."},
  {name:"Honeysuckle Cake", img:"honeysuckle-cake", desc:"Delicate layered pastries infused with fragrant honeysuckle, a snack steeped in old Beijing teahouse culture.", price:"¥ 20 / box", place:"Daoxiang Village", funFact:"A favourite treat of old Beijing teahouses."}
];
const foodScroll = document.getElementById('foodScroll');

foodScroll.innerHTML = dishes.map((d)=>`
  <div class="food-card" tabindex="0" role="button" aria-pressed="false">
    <div class="flip-inner">
      <div class="flip-face flip-front">
        <div class="food-media">${photoBox(d.img, d.name)}</div>
        <div class="food-name">${d.name.toUpperCase()}</div>
      </div>
      <div class="flip-face flip-back">
        <h4>${d.name}</h4>
        <p class="fb-desc">${d.desc}</p>
        <div class="fb-meta"><span>${d.price}</span><span>${d.place}</span></div>
        <p class="fb-fact">${d.funFact}</p>
      </div>
    </div>
  </div>`).join('');

/* tap-to-flip for touch devices (desktop already flips on :hover via CSS) */
foodScroll.querySelectorAll('.food-card').forEach(card=>{
  card.addEventListener('click', ()=> card.classList.toggle('flipped'));
  card.addEventListener('keydown', e=>{
    if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); card.classList.toggle('flipped'); }
  });
});
document.getElementById('foodPrev').addEventListener('click', ()=> foodScroll.scrollBy({left:-260, behavior:'smooth'}));
document.getElementById('foodNext').addEventListener('click', ()=> foodScroll.scrollBy({left:260, behavior:'smooth'}));

let autoScrollDir = 1;
let autoScrollPaused = false;
foodScroll.addEventListener('mouseenter', ()=> autoScrollPaused = true);
foodScroll.addEventListener('mouseleave', ()=> autoScrollPaused = false);
foodScroll.addEventListener('touchstart', ()=> autoScrollPaused = true, {passive:true});
foodScroll.addEventListener('touchend', ()=> setTimeout(()=> autoScrollPaused = false, 1500));
function autoScrollStep(){
  if(!autoScrollPaused){
    const maxScroll = foodScroll.scrollWidth - foodScroll.clientWidth;
    if(maxScroll > 0){
      foodScroll.scrollLeft += autoScrollDir * 1.4;
      if(foodScroll.scrollLeft >= maxScroll - 1) autoScrollDir = -1;
      else if(foodScroll.scrollLeft <= 1) autoScrollDir = 1;
    }
  }
  requestAnimationFrame(autoScrollStep);
}
requestAnimationFrame(autoScrollStep);

/* ============ ITINERARY ============ */
const stops = [
  {time:"06:30", place:"Great Wall", img:"great-wall"},
  {time:"09:30", place:"Forbidden City", img:"forbidden-city"},
  {time:"12:30", place:"Lunch — Peking Duck", img:"peking-duck"},
  {time:"14:30", place:"Summer Palace", img:"summer-palace"},
  {time:"17:30", place:"Explore the Hutongs", img:"hutong"},
  {time:"19:30", place:"Wangfujing Snack Street", img:"wangfujing"},
  {time:"21:00", place:"City Lights at Qianmen", img:"qianmen"}
];
const timeline = document.getElementById('timeline');
const timelineFill = document.getElementById('timelineFill');
const itinCards = document.getElementById('itinCards');

stops.forEach((s,i)=>{
  const btn = document.createElement('button');
  btn.className = 'itin-step' + (i===0 ? ' active':'');
  btn.dataset.idx = i;
  btn.innerHTML = `<span class="node"></span><div class="time">${s.time}</div><div class="place">${s.place}</div>`;
  timeline.appendChild(btn);
});
stops.forEach((s,i)=>{
  const card = document.createElement('div');
  card.className = 'itin-card' + (i===0 ? ' active':'');
  card.dataset.idx = i;
  card.innerHTML = `<div class="itin-card-media">${photoBox(s.img, s.place)}</div><div class="itin-card-label">${s.place}</div>`;
  itinCards.appendChild(card);
});

function setActiveStop(i, doScroll=true){
  document.querySelectorAll('.itin-step').forEach(el=>el.classList.toggle('active', parseInt(el.dataset.idx)===i));
  const cards = document.querySelectorAll('.itin-card');
  cards.forEach(el=>el.classList.toggle('active', parseInt(el.dataset.idx)===i));
  const pct = (i/(stops.length-1))*100;
  timelineFill.style.width = pct + '%';
  if(doScroll){
    const target = cards[i];
    if(target){
      const targetRect = target.getBoundingClientRect();
      const containerRect = itinCards.getBoundingClientRect();
      const offset = itinCards.scrollLeft + (targetRect.left - containerRect.left) - (containerRect.width/2) + (targetRect.width/2);
      itinCards.scrollTo({left:offset, behavior:'smooth'});
      itinAutoScrollPaused = true;
      clearTimeout(itinResumeTimer);
      itinResumeTimer = setTimeout(()=> itinAutoScrollPaused = false, 2000);
    }
  }
}
document.querySelectorAll('.itin-step').forEach(el=>{
  el.addEventListener('click', ()=> setActiveStop(parseInt(el.dataset.idx)));
});
document.querySelectorAll('.itin-card').forEach(el=>{
  el.addEventListener('click', ()=> setActiveStop(parseInt(el.dataset.idx)));
});
setActiveStop(0, false);

let itinAutoScrollDir = 1;
let itinAutoScrollPaused = false;
let itinResumeTimer = null;
itinCards.addEventListener('mouseenter', ()=> itinAutoScrollPaused = true);
itinCards.addEventListener('mouseleave', ()=> itinAutoScrollPaused = false);
itinCards.addEventListener('touchstart', ()=> itinAutoScrollPaused = true, {passive:true});
itinCards.addEventListener('touchend', ()=> setTimeout(()=> itinAutoScrollPaused = false, 1500));
function itinAutoScrollStep(){
  if(!itinAutoScrollPaused){
    const maxScroll = itinCards.scrollWidth - itinCards.clientWidth;
    if(maxScroll > 0){
      itinCards.scrollLeft += itinAutoScrollDir * 1.1;
      if(itinCards.scrollLeft >= maxScroll - 1) itinAutoScrollDir = -1;
      else if(itinCards.scrollLeft <= 1) itinAutoScrollDir = 1;
    }
  }
  requestAnimationFrame(itinAutoScrollStep);
}
requestAnimationFrame(itinAutoScrollStep);

/* ============ NAV ============ */
const topnav = document.getElementById('topnav');
window.addEventListener('scroll', ()=>{
  topnav.classList.toggle('scrolled', window.scrollY > 60);
}, {passive:true});

/* ============ HERO ============ */
const skyTint = document.getElementById('skyTint');
const cityLights = document.getElementById('cityLights');
const SKY_SUNRISE = {top:[255,183,120], bot:[255,140,90]};
const SKY_AFTERNOON = {top:[255,224,168], bot:[255,193,110]};
const SKY_NIGHT = {top:[28,28,66], bot:[14,14,38]};
function lerpColor(a,b,t){ return a.map((v,i)=> Math.round(v + (b[i]-v)*t)); }
function updateSky(){
  const t = Math.max(0, Math.min(1, window.scrollY / window.innerHeight));
  let top, bot;
  if(t < 0.5){
    const local = t / 0.5;
    top = lerpColor(SKY_SUNRISE.top, SKY_AFTERNOON.top, local);
    bot = lerpColor(SKY_SUNRISE.bot, SKY_AFTERNOON.bot, local);
  } else {
    const local = (t - 0.5) / 0.5;
    top = lerpColor(SKY_AFTERNOON.top, SKY_NIGHT.top, local);
    bot = lerpColor(SKY_AFTERNOON.bot, SKY_NIGHT.bot, local);
  }
  skyTint.style.background = `linear-gradient(180deg, rgb(${top.join(',')}), rgb(${bot.join(',')}))`;
  cityLights.style.opacity = Math.max(0, (t - 0.55) / 0.45);
}
window.addEventListener('scroll', updateSky, {passive:true});
updateSky();

const navLinks = document.querySelectorAll('#navlinks a');
const sections = ['home','book','flavour','itinerary'].map(id=>document.getElementById(id));

function setActiveSection(id){
  navLinks.forEach(a=>a.classList.toggle('active', a.dataset.target===id));
}
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting && entry.intersectionRatio >= 0.4){
      setActiveSection(entry.target.id);
    }
  });
}, {threshold:[0.4]});
sections.forEach(s=> observer.observe(s));

navLinks.forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    document.getElementById(a.dataset.target).scrollIntoView({behavior:'smooth'});
  });
});