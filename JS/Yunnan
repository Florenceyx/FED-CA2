/* ============ PATCH CONTENT DATA ============ */
const DATA = {
  dali: {
    en: "Dali", zh: "大理 · marble & Erhai lake", tag: "Bai homeland, lakeside limestone",
    color: "var(--clay)", motif: "p-dali", photo: "../images/Yunnan/dali-erhai.jpeg",
    text: "Dali's old town sits between the Cangshan range and Erhai Lake, walled in grey brick and roofed in curling tile. It is the historic capital of the Bai people, whose whitewashed courtyard houses are trimmed in painted eaves and blue-grey ink murals. The local marble — literally 'Dali stone' in Chinese — gave the city its name and still veins the tabletops and screens sold along Fuxing Road.",
    facts: [["People", "Bai ethnic group"], ["Landmark", "Three Pagodas, Chongsheng Temple"], ["Craft", "Tie-dye batik, marble inlay"], ["Setting", "Cangshan mountains & Erhai Lake"]]
  },
  ethnic: {
    en: "Twenty-Five Peoples", zh: "民族文化 · living diversity", tag: "More languages than any province in China",
    color: "var(--ochre)", motif: "p-ethnic", photo: "../images/Yunnan/twentyfive peoples.jpeg",
    text: "Yunnan recognises more ethnic minority groups than any other province — Bai, Naxi, Yi, Dai, Hani, Wa, Lisu, Jingpo and more, each with its own dress, dialect, and calendar of ritual. Cross-stitch and appliqué embroidery carry clan history in geometric form: a hem pattern can name a village, a headdress can mark a bride.",
    facts: [["Recognised groups", "25 of China's 56"], ["Textile", "Cross-stitch, appliqué, silverwork"], ["Language", "Over a dozen distinct language families"], ["Best seen", "Rural markets & village festivals"]]
  },
  lijiang: {
    en: "Lijiang", zh: "丽江 · canals & old town", tag: "UNESCO old town of the Naxi",
    color: "var(--indigo)", motif: "p-lijiang", photo: "../images/Yunnan/lijiang.jpeg",
    text: "Snowmelt from Jade Dragon Snow Mountain runs straight through Lijiang's old town in stone-lined channels, under willow trees and cobbled bridges. This is Naxi country, home to Dongba script — the world's last living pictographic writing system, still used in ritual scrolls by Naxi priests.",
    facts: [["People", "Naxi ethnic group"], ["Script", "Dongba pictographs"], ["Water", "Canals fed by Jade Dragon Snow Mountain"], ["Status", "UNESCO World Heritage old town"]]
  },
  shangrila: {
    en: "Shangri-La", zh: "香格里拉 · Tibetan highlands", tag: "Zhongdian, renamed for a myth",
    color: "var(--plum)", motif: "p-shangrila", photo: "../images/Yunnan/shangrila.jpeg",
    text: "At over 3,200 metres, the town once called Zhongdian took the name Shangri-La in 2001, after James Hilton's fictional Himalayan utopia. The renaming markets a real thing: golden-roofed Songzanlin Monastery, prayer flags strung across open grassland, and a Tibetan population that has herded and chanted here for centuries.",
    facts: [["Elevation", "~3,200 m"], ["Landmark", "Songzanlin Monastery"], ["People", "Tibetan communities"], ["Drink", "Yak butter tea"]]
  },
  tea: {
    en: "Tea Mountains", zh: "茶山 · Pu'er & the caravan road", tag: "Where pu'er tea is grown, aged, and traded",
    color: "var(--pine)", motif: "p-tea", photo: "../images/Yunnan/teamountains.jpeg",
    text: "Southern Yunnan's mist-covered slopes hold some of the world's oldest cultivated tea trees, some centuries old, still hand-picked leaf by leaf. This is the source of pu'er, the dark fermented tea once carried north on mule trains along the Tea-Horse Caravan Road, trading leaves for Tibetan horses one mountain pass at a time.",
    facts: [["Tea", "Pu'er, fermented & aged"], ["Region", "Xishuangbanna, Pu'er City"], ["History", "Tea-Horse Caravan Road"], ["Trees", "Some centuries-old wild tea trees"]]
  },
  festival: {
    en: "Festivals", zh: "节庆 · torches & water", tag: "A calendar lit by fire and soaked in water",
    color: "var(--thread)", motif: "p-fest", photo: "../images/Yunnan/festival.jpeg",
    text: "Yunnan's calendar turns on festival dates: the Yi and Bai Torch Festival fills mountain villages with bonfires each summer, while the Dai Water-Splashing Festival in Xishuangbanna turns the New Year into a province-wide, joyfully soaking street party. Dali's Third Month Fair, older than either, has drawn traders and pilgrims to the same fairground for over a thousand years.",
    facts: [["Torch Festival", "Yi & Bai, midsummer bonfires"], ["Water-Splashing", "Dai New Year, Xishuangbanna"], ["Third Month Fair", "Dali, 1,000+ years running"], ["Rhythm", "Lunar & ethnic calendars overlap"]]
  }
};

/* ============ UNFOLD PANEL ============ */
const veil = document.getElementById('veil');
const panel = document.getElementById('panel');
const panelHero = document.getElementById('panelHero');
const panelMotif = document.getElementById('panelMotif');
const panelTitle = document.getElementById('panelTitle');
const panelZh = document.getElementById('panelZh');
const panelTag = document.getElementById('panelTag');
const panelText = document.getElementById('panelText');
const panelFacts = document.getElementById('panelFacts');
const closeBtn = document.getElementById('closeBtn');

function openPatch(key) {
  const d = DATA[key];
  if (!d) return;
  panel.style.setProperty('--fold', d.color);
  panelHero.style.backgroundImage = `url('${d.photo}')`;
  panelHero.style.backgroundSize = 'cover';
  panelHero.style.backgroundPosition = 'center';
  panelHero.style.backgroundColor = d.color;
  panelTitle.textContent = d.en;
  panelZh.textContent = d.zh;
  panelTag.textContent = d.tag;
  panelText.textContent = d.text;
  panelFacts.innerHTML = d.facts.map(f => `<div><b>${f[0]}</b>${f[1]}</div>`).join('');

  const srcPattern = document.getElementById(d.motif);
  panelMotif.innerHTML = '';
  const clone = srcPattern.cloneNode(true);
  clone.id = d.motif + '-clone';
  panelMotif.appendChild(clone);
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', '400');
  rect.setAttribute('height', '230');
  rect.setAttribute('fill', `url(#${d.motif}-clone)`);
  panelMotif.appendChild(rect);

  veil.classList.add('show');
  panel.classList.remove('show');
  requestAnimationFrame(() => panel.classList.add('show'));
  document.body.style.overflow = 'hidden';
}

function closePanel() {
  veil.classList.remove('show');
  panel.classList.remove('show');
  document.body.style.overflow = '';
}

document.querySelectorAll('.patch[data-key], .map-pin[data-key]').forEach(btn => {
  btn.addEventListener('click', () => openPatch(btn.dataset.key));
});
closeBtn.addEventListener('click', closePanel);
veil.addEventListener('click', closePanel);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

/* ============ SCROLL REVEALS ============ */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 6) * 70}ms`;
  revealObserver.observe(el);
});

/* seam stitch line + count-up trigger together once diversity stats are visible */
const statSection = document.querySelector('.seam-wrap');
const statNums = document.querySelectorAll('.stat .num[data-count]');
let counted = false;

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      statSection.classList.add('in');
      if (!counted) {
        counted = true;
        statNums.forEach(el => animateCount(el, parseInt(el.dataset.count, 10)));
      }
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
if (statSection) statObserver.observe(statSection);

function animateCount(el, target) {
  const duration = 1200;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ============ SEAL CIRCLE DRAW-IN (closing section) ============ */
const sealCircle = document.getElementById('sealCircle');
const closingSection = document.getElementById('closing');
if (sealCircle && closingSection) {
  const sealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sealCircle.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.8,.2,1)';
        sealCircle.style.strokeDashoffset = '0';
        sealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  sealObserver.observe(closingSection);
}

/* ============ PARALLAX HERO PHOTO ============ */
const heroPhoto = document.getElementById('heroPhoto');
const heroEl = document.getElementById('hero');
function updateParallax() {
  if (!heroPhoto || !heroEl) return;
  const rect = heroEl.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) return;
  const scrollFrac = -rect.top;
  heroPhoto.style.transform = `translateY(${scrollFrac * 0.25}px) scale(1.1)`;
}
window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

/* ============ NEEDLE-AND-THREAD CURSOR TRAIL ============ */
/* A small pool of dots trailing the pointer, only inside hero + quilt sections */
const trailZones = ['hero', 'quilt'].map(id => document.getElementById(id));
const trailContainer = document.getElementById('threadTrail');
const POOL_SIZE = 10;
const pool = [];
for (let i = 0; i < POOL_SIZE; i++) {
  const dot = document.createElement('div');
  dot.className = 'thread-dot';
  dot.style.opacity = '0';
  trailContainer.appendChild(dot);
  pool.push(dot);
}
let poolIndex = 0;
let lastEmit = 0;

function inTrailZone(x, y) {
  return trailZones.some(zone => {
    if (!zone) return false;
    const r = zone.getBoundingClientRect();
    return y >= r.top && y <= r.bottom;
  });
}

window.addEventListener('mousemove', (e) => {
  const now = performance.now();
  if (now - lastEmit < 45) return;
  if (!inTrailZone(e.clientX, e.clientY)) return;
  lastEmit = now;
  const dot = pool[poolIndex];
  poolIndex = (poolIndex + 1) % POOL_SIZE;
  dot.style.left = e.clientX + 'px';
  dot.style.top = e.clientY + 'px';
  dot.style.opacity = '.55';
  dot.style.transform = 'translate(-50%,-50%) scale(1)';
  requestAnimationFrame(() => {
    dot.style.transition = 'opacity 1.1s ease, transform 1.1s ease';
    dot.style.opacity = '0';
    dot.style.transform = 'translate(-50%,-50%) scale(0.3)';
  });
}, { passive: true });
