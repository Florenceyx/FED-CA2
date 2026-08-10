(function(){
  "use strict";

  /* ---------- Navbar on scroll ---------- */
  const nav = document.getElementById('siteNav');
  function updateNav(){ if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', updateNav, {passive:true}); updateNav();

  /* ---------- Connected journey line + drone flight ---------- */
  const track = document.getElementById('journeyTrack');
  const pathFg = document.getElementById('pathFg');
  const pathBg = document.getElementById('pathBg');
  const drone = document.getElementById('drone');
  const droneInfo = document.getElementById('droneInfo');
  const droneInfoName = document.getElementById('droneInfoName');
  const blobs = Array.from(document.querySelectorAll('.blob-item'));

  const pathLength = pathFg.getTotalLength();
  pathFg.style.strokeDasharray = pathLength;
  pathFg.style.strokeDashoffset = pathLength;

  // viewBox is 1000x260 -> we convert path points to the track's actual pixel box
  const VB_W = 1000, VB_H = 260;

  function clamp01(v){ return Math.max(0, Math.min(1, v)); }

  function getScrollProgress(){
    const rect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress 0 -> track top at bottom of viewport, 1 -> track bottom at top of viewport
    const total = rect.height + vh * 0.6;
    const traveled = vh * 0.85 - rect.top;
    return clamp01(traveled / total);
  }

  function updateJourney(){
    const progress = getScrollProgress();

    // draw the line left -> right
    const offset = pathLength * (1 - progress);
    pathFg.style.strokeDashoffset = offset;

    // move drone along the path
    const pt = pathFg.getPointAtLength(pathLength * progress);
    const rect = track.getBoundingClientRect();
    const scaleX = rect.width / VB_W;
    const scaleY = rect.height / VB_H;
    drone.style.left = (pt.x * scaleX) + 'px';
    drone.style.top = (pt.y * scaleY) + 'px';

    // subtle camera-follow: nudge the whole row based on progress
    const followOffset = (progress - 0.5) * 14;
    track.style.transform = `translateX(${-followOffset}px)`;

    // light up blobs whose threshold has been passed, find "current" one
    let currentIdx = -1;
    blobs.forEach((b, i)=>{
      const threshold = i / (blobs.length - 1);
      const reached = progress >= threshold - 0.04;
      b.classList.toggle('active', reached);
      b.classList.remove('current');
      if (reached) currentIdx = i;
    });
    if (currentIdx >= 0){
      blobs[currentIdx].classList.add('current');
    }

    // drone info label: show nearest destination name when close to it
    if (currentIdx >= 0){
      const threshold = currentIdx / (blobs.length - 1);
      const dist = Math.abs(progress - threshold);
      if (dist < 0.09){
        droneInfoName.textContent = blobs[currentIdx].dataset.title;
        droneInfo.classList.add('show');
      } else {
        droneInfo.classList.remove('show');
      }
    } else {
      droneInfo.classList.remove('show');
    }
  }

  let ticking = false;
  function onScroll(){
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(()=>{ updateJourney(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  onScroll();

})();
