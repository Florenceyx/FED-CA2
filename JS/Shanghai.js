(function(){
  "use strict";

  /* ---------- Navbar background on scroll ---------- */
  const nav = document.getElementById('siteNav');
  function updateNav(){
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  }
  if (nav) {
    window.addEventListener('scroll', updateNav, {passive:true});
    updateNav();
  }

  /* ---------- Then / Now compare slider ---------- */
  const heroSlider   = document.getElementById('heroSlider');
  const afterImage   = document.getElementById('afterImage');
  const sliderHandle = document.getElementById('sliderHandle');
  const handleLine   = document.getElementById('handleLine');
  const handleCircle = document.getElementById('handleCircle');
  const btnThen      = document.getElementById('btnThen');
  const btnNow       = document.getElementById('btnNow');

  let dragging = false;
  let hasInteracted = false;   // becomes true after the user actually drags
  let downX = null;

  function setSlider(percent, animate){
    percent = Math.max(0, Math.min(100, percent));
    afterImage.style.transition = animate ? 'clip-path .6s cubic-bezier(.2,.7,.2,1)' : 'none';
    sliderHandle.style.transition = animate ? 'left .6s cubic-bezier(.2,.7,.2,1)' : 'none';
    afterImage.style.clipPath = `inset(0 0 0 ${percent}%)`;
    sliderHandle.style.left = percent + '%';
    btnThen.classList.toggle('active', percent < 35);
    btnNow.classList.toggle('active', percent > 65);
  }

  function percentFromClientX(clientX){
    const rect = heroSlider.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * 100;
  }

  function activateGlow(){
    if (hasInteracted) return;
    hasInteracted = true;
    handleLine.classList.add('glow');
  }

  function startDrag(clientX){
    dragging = true;
    downX = clientX;
    document.body.style.userSelect = 'none';
  }
  function moveDrag(clientX){
    if (!dragging) return;
    if (downX !== null && Math.abs(clientX - downX) > 3) activateGlow();
    setSlider(percentFromClientX(clientX), false);
  }
  function endDrag(){
    dragging = false;
    downX = null;
    document.body.style.userSelect = '';
  }

  handleCircle.addEventListener('pointerdown', e=>{ startDrag(e.clientX); e.preventDefault(); });
  heroSlider.addEventListener('pointerdown', e=>{ startDrag(e.clientX); setSlider(percentFromClientX(e.clientX), false); });
  window.addEventListener('pointermove', e=> moveDrag(e.clientX));
  window.addEventListener('pointerup', endDrag);

  btnThen.addEventListener('click', ()=>{ setSlider(0, true); activateGlow(); });
  btnNow.addEventListener('click',  ()=>{ setSlider(100, true); activateGlow(); });

  setSlider(50, false);

  /* ---------- Connector: slider line morphs into the timeline ---------- */
  const connectorZone = document.getElementById('connectorZone');
  const connectorLine = document.getElementById('connectorLine');
  const timelineRailFill = document.getElementById('railFill');

  // horizontal position (in vw) where the timeline dots sit (left: 8%)
  function targetLeftPercent(){ return 8; }

  function clamp01(v){ return Math.max(0, Math.min(1, v)); }

  function updateConnector(){
    const rect = connectorZone.getBoundingClientRect();
    const vh = window.innerHeight;

    // progress: 0 when the zone's top is at the bottom of the viewport,
    // 1 when the zone's top has scrolled to the top of the viewport.
    const progress = clamp01((vh - rect.top) / (vh + rect.height * 0.4));

    connectorLine.style.height = (progress * 100) + '%';

    const startLeft = 50;               // hero slider was centred
    const endLeft = targetLeftPercent();// timeline dot column
    const left = startLeft + (endLeft - startLeft) * progress;
    connectorLine.style.left = left + '%';

    const glowStrength = hasInteracted ? 1 : 0.45;
    connectorLine.style.opacity = (0.2 + progress * 0.8 * glowStrength).toFixed(2);
    connectorLine.style.boxShadow =
      `0 0 ${16*progress}px ${2*progress}px rgba(198,138,78,${0.55*glowStrength}), 0 0 ${34*progress}px ${6*progress}px rgba(198,138,78,${0.22*glowStrength})`;
  }

  /* ---------- Timeline rail fill (progress line running down the timeline) ---------- */
  const timelineSection = document.getElementById('timeline');
  function updateRail(){
    const rect = timelineSection.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const scrolled = clamp01((vh * 0.75 - rect.top) / total);
    timelineRailFill.style.height = (scrolled * 100) + '%';
  }

  let ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{
      updateConnector();
      updateRail();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Timeline items: light up one by one as they enter view ---------- */
  const items = document.querySelectorAll('.timeline-item');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if (entry.isIntersecting){
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.32, rootMargin: '0px 0px -10% 0px' });

  items.forEach(item=> io.observe(item));

})();
