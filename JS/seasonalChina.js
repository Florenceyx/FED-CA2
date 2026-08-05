/* ---------- ICONS ---------- */
const ICONS = {
  flower:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="3.4"/><ellipse cx="12" cy="5.3" rx="2.4" ry="3.4"/><ellipse cx="12" cy="18.7" rx="2.4" ry="3.4"/><ellipse cx="5.3" cy="12" rx="3.4" ry="2.4"/><ellipse cx="18.7" cy="12" rx="3.4" ry="2.4"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="4.4" fill="currentColor" stroke="none"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1"/></svg>',
  leaf:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2 4 4-1-2 4 3 2-3 1 1 4-4-2-1 5-1-5-4 2 1-4-3-1 3-2-2-4 4 1z"/><rect x="11.4" y="14" width="1.2" height="8" rx=".6"/></svg>',
  snow:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M12 2v20M2 12h20M4.5 4.5l15 15M19.5 4.5l-15 15"/><path d="M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2M6 12l-2-2M6 12l-2 2M18 12l2-2M18 12l2 2"/></svg>',
  pin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C7.9 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-2.9-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/></svg>'
};

/* ---------- SCENE GENERATOR ---------- */
function ridge(baseY, amp, n, seed, W){
  let d=`M0 ${baseY}`, step=W/n;
  for(let i=1;i<=n;i++){
    const x=i*step, cx=x-step/2;
    const cy=baseY-amp*(0.45+0.55*Math.abs(Math.sin(seed+i*1.3)));
    const ey=baseY-amp*0.25*Math.sin(seed+i);
    d+=` Q ${cx.toFixed(0)} ${cy.toFixed(0)} ${x.toFixed(0)} ${ey.toFixed(0)}`;
  }
  return d+` L ${W} 1000 L 0 1000 Z`;
}
function karst(baseY, seed, c){
  let d=`M0 1000 L0 ${baseY}`, n=6, step=800/n;
  for(let i=0;i<n;i++){const x=i*step, h=200+150*Math.abs(Math.sin(seed+i*1.7)), px=x+step/2;
    d+=` L ${x.toFixed(0)} ${baseY} Q ${px.toFixed(0)} ${(baseY-h).toFixed(0)} ${(x+step).toFixed(0)} ${baseY}`;}
  return `<path d="${d} L 800 1000 Z" fill="${c}"/>`;
}
function pillars(baseY, seed, c){
  let g=`<g fill="${c}">`;
  [110,215,315,455,555,660].forEach((x,i)=>{const h=210+150*Math.abs(Math.sin(seed+i)), w=42+22*Math.abs(Math.cos(seed+i*1.4));
    g+=`<rect x="${x}" y="${(baseY-h).toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}" rx="${(w/3).toFixed(0)}"/>`;});
  return g+`</g>`;
}
function pagoda(cx, by, s, c){
  const roof=(cy,w)=>{const x0=cx-w/2,x1=cx+w/2;return `M${x0} ${cy} Q ${cx} ${(cy-24*s).toFixed(0)} ${x1} ${cy} L ${(x1-16*s).toFixed(0)} ${cy} Q ${cx} ${(cy-9*s).toFixed(0)} ${(x0+16*s).toFixed(0)} ${cy} Z`;};
  return `<g fill="${c}"><rect x="${(cx-26*s).toFixed(0)}" y="${(by-70*s).toFixed(0)}" width="${(52*s).toFixed(0)}" height="${(70*s).toFixed(0)}"/>
    <path d="${roof(by-70*s,130*s)}"/><path d="${roof(by-108*s,100*s)}"/><path d="${roof(by-142*s,68*s)}"/>
    <rect x="${(cx-3*s).toFixed(0)}" y="${(by-162*s).toFixed(0)}" width="${(6*s).toFixed(0)}" height="${(22*s).toFixed(0)}"/></g>`;
}
function skyline(cx, by, s, c){
  const T=[[-95,150,26],[-58,220,30],[-16,310,36],[30,190,30],[72,130,26]];
  let g=`<g fill="${c}">`;
  T.forEach(([dx,hh,ww])=>{const h=hh*s,w=ww*s,x=cx+dx*s-w/2,y=by-h;
    g+=`<rect x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="${h.toFixed(0)}"/>`;
    if(hh>=300)g+=`<rect x="${(cx+dx*s-2).toFixed(0)}" y="${(y-34*s).toFixed(0)}" width="4" height="${(34*s).toFixed(0)}"/>`;});
  return g+`</g>`;
}
function wall(cx, by, s, c){
  const y=by-46*s;
  return `<g fill="${c}"><path d="M${(cx-180*s).toFixed(0)} ${by} L ${(cx-180*s).toFixed(0)} ${(y+18*s).toFixed(0)} L ${(cx+180*s).toFixed(0)} ${(y-34*s).toFixed(0)} L ${(cx+180*s).toFixed(0)} ${by} Z"/>
    <rect x="${(cx-56*s).toFixed(0)}" y="${(y-78*s).toFixed(0)}" width="${(48*s).toFixed(0)}" height="${(96*s).toFixed(0)}"/>
    <rect x="${(cx+30*s).toFixed(0)}" y="${(y-92*s).toFixed(0)}" width="${(44*s).toFixed(0)}" height="${(112*s).toFixed(0)}"/></g>`;
}
function terraces(by, c){
  let g=`<g fill="${c}" opacity=".9">`;
  for(let i=0;i<5;i++){const yy=by-30+i*40;g+=`<path d="M0 ${yy} Q 400 ${yy-34} 800 ${yy-6} L 800 ${yy+22} Q 400 ${yy-8} 0 ${yy+28} Z"/>`;}
  return g+`</g>`;
}
function boat(x,y,c){return `<g fill="${c}"><path d="M${x-28} ${y} q28 18 56 0 l-9 12 q-19 8 -38 0 Z"/><rect x="${x-1}" y="${y-30}" width="2" height="30"/><path d="M${x+1} ${y-30} l18 20 l-18 0 Z"/></g>`;}

function buildScene(pal, land, seed){
  const W=800,H=1000;
  const [s1,s2]=pal.sky,[m1,m2,m3]=pal.mts,orb=pal.orb;
  const sunY=pal.lowSun?320:190, sunX=pal.lowSun?560:600;
  let s=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${W} ${H}' preserveAspectRatio='xMidYMid slice'>`;
  s+=`<defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='${s1}'/><stop offset='1' stop-color='${s2}'/></linearGradient>`;
  s+=`<radialGradient id='g' cx='.5' cy='.5' r='.5'><stop offset='0' stop-color='${orb}' stop-opacity='.95'/><stop offset='1' stop-color='${orb}' stop-opacity='0'/></radialGradient></defs>`;
  s+=`<rect width='${W}' height='${H}' fill='url(#sky)'/>`;
  s+=`<circle cx='${sunX}' cy='${sunY}' r='180' fill='url(#g)'/><circle cx='${sunX}' cy='${sunY}' r='52' fill='${orb}' opacity='.9'/>`;
  s+=`<path d='${ridge(560,150,5,seed,W)}' fill='${m1}' opacity='.85'/>`;
  if(land==='karst'){ s+=karst(720,seed+1,m2)+karst(820,seed+2.4,m3)+boat(420,905,m3); }
  else if(land==='pillars'){ s+=`<path d='${ridge(760,60,5,seed+2,W)}' fill='${m3}' opacity='.6'/>`+pillars(880,seed,m2)+pillars(920,seed+1.5,m3); }
  else{
    s+=`<path d='${ridge(660,120,6,seed+1.5,W)}' fill='${m2}' opacity='.92'/>`;
    if(land==='pagoda') s+=pagoda(410,720,1,m3);
    else if(land==='skyline') s+=skyline(400,715,1,m3);
    else if(land==='wall') s+=wall(410,700,1,m3);
    else if(land==='terraces') s+=terraces(760,m2);
    s+=`<path d='${ridge(800,110,5,seed+3,W)}' fill='${m3}'/>`;
  }
  s+=`<rect x='0' y='700' width='800' height='150' fill='#ffffff' opacity='.10'/>`;
  if(pal.snow) s+=`<rect x='0' y='840' width='800' height='160' fill='#ffffff' opacity='.22'/>`;
  return "data:image/svg+xml,"+encodeURIComponent(s+"</svg>");
}

/* ---------- DATA ---------- */
const PAL={
  spring:{sky:['#ecc9d2','#f6ece2'],mts:['#c9a3b0','#b07f96','#8f5f79'],orb:'#fbe3ea'},
  summer:{sky:['#a9cbe0','#e2efe4'],mts:['#84b18b','#5f9469','#3f6f4f'],orb:'#fdf3c9'},
  autumn:{sky:['#f2d59a','#f7e8cd'],mts:['#dda65e','#c07a36','#985826'],orb:'#ffe6a8',lowSun:true},
  winter:{sky:['#cdd8e3','#eef2f5'],mts:['#aebccb','#89a0b3','#5e7688'],orb:'#eef4f8',snow:true}
};
const SEASONS=[
  {id:'spring',name:'SPRING',icon:'flower',color:'#b6708a',dates:'MAR — MAY',land:'pagoda',seed:0.6,
   lede:'Flowers bloom across the land — perfect for mild weather, scenery and culture.',
   blurb:'Flowers bloom across the land and nature comes alive. Perfect for mild weather, scenic beauty and cultural exploration.'},
  {id:'summer',name:'SUMMER',icon:'sun',color:'#57895f',dates:'JUN — AUG',land:'karst',seed:1.4,
   lede:'Lively landscapes and vibrant cities full of energy and adventure.',
   blurb:'Vibrant cities, dramatic mountains and exciting adventure. Great for the outdoors and lively experiences.'},
  {id:'autumn',name:'AUTUMN',icon:'leaf',color:'#c07a36',dates:'SEP — NOV',land:'wall',seed:2.2,
   lede:'Cool weather and golden scenery, ideal for unforgettable journeys.',
   blurb:'Cool, clear and colourful. The best season for road trips, photography and unforgettable scenery.'},
  {id:'winter',name:'WINTER',icon:'snow',color:'#5e7688',dates:'DEC — FEB',land:'pagoda',seed:3.1,
   lede:'Snowy landscapes and festive traditions await you.',
   blurb:'Snowy landscapes, cozy cities and warm food. Ideal for fewer crowds and peaceful, unhurried journeys.'}
];
const CITY_ORDER=['Beijing','Shanghai','Shenzhen','Chongqing','Guilin','Zhangjiajie',"Xi'an",'Yunnan','Chengdu'];
const CITY_META={
  Beijing:{land:'wall',seed:0.6}, Shanghai:{land:'skyline',seed:4.4}, Shenzhen:{land:'skyline',seed:3.3},
  Chongqing:{land:'skyline',seed:1.8}, Guilin:{land:'karst',seed:2.7}, Zhangjiajie:{land:'pillars',seed:1.1},
  "Xi'an":{land:'pagoda',seed:2.6}, Yunnan:{land:'terraces',seed:0.9}, Chengdu:{land:'pagoda',seed:3.9}
};
const COPY={
  spring:{
    Beijing:{tag:'Heritage in Bloom',desc:'Iconic palaces and temples framed by blossoming trees and clear blue skies.'},
    Shanghai:{tag:'Gardens & Riverside Walks',desc:'Mild air and blooming parks make the Bund and old lanes a pleasure to wander.'},
    Shenzhen:{tag:'Parks & Fresh Coast',desc:'Warm, breezy days perfect for coastal parks and the city\u2019s many green spaces.'},
    Chongqing:{tag:'Misty Hills & Rivers',desc:'Soft spring mist drapes the hills as the rivers and old streets come alive.'},
    Guilin:{tag:'Clear Rivers & Green Karst',desc:'The Li River runs clear and the karst hills turn their lushest green.'},
    Zhangjiajie:{tag:'Fresh Peaks & Trails',desc:'Cool air and budding forests make the pillar trails especially inviting.'},
    "Xi'an":{tag:'Blossoms & Ancient Walls',desc:'City walls and pagodas glow beneath spring blossoms and gentle sun.'},
    Yunnan:{tag:'Flower Fields & Old Towns',desc:'Colourful blooms and gentle temperatures, ideal for villages and ancient towns.'},
    Chengdu:{tag:'Pandas & Park Life',desc:'Mild days made for panda visits and slow strolls through leafy parks.'}
  },
  summer:{
    Beijing:{tag:'Long Days & Lakes',desc:'Warm evenings by the Houhai lakes and late light over the Forbidden City.'},
    Shanghai:{tag:'Skyline & Waterfront',desc:'Rooftop nights, river breezes and the full buzz of a global city.'},
    Shenzhen:{tag:'Beaches & Modern City',desc:'Beach days, theme parks and China\u2019s most future-facing metropolis.'},
    Chongqing:{tag:'Night Views & Mountain City',desc:'Neon-lit rivers and cliffside streets \u2014 the mountain city at its liveliest.'},
    Guilin:{tag:'Rafting & River Views',desc:'Bamboo rafting and riverside cycling through cool, refreshing scenery.'},
    Zhangjiajie:{tag:'Peaks & Natural Wonders',desc:'Mist-wrapped sandstone pillars and forest trails at their greenest.'},
    "Xi'an":{tag:'History After Dark',desc:'Warm nights bring the lit-up city walls and lively night markets to life.'},
    Yunnan:{tag:'Cool Highland Escape',desc:'Mild mountain air and green plateaus offer a refreshing summer retreat.'},
    Chengdu:{tag:'Teahouses & Spice',desc:'Shady teahouses, spicy hotpot and an easy, unhurried summer pace.'}
  },
  autumn:{
    Beijing:{tag:'Golden Leaves & Old Walls',desc:'The Great Wall and royal palaces framed by golden foliage and crisp air.'},
    Shanghai:{tag:'Crisp Days & Culture',desc:'Cool, clear weather ideal for museums, gardens and riverside strolls.'},
    Shenzhen:{tag:'Warm Coast & Comfort',desc:'Pleasant warmth lingers \u2014 great for the coast without the summer heat.'},
    Chongqing:{tag:'Clear Skies & City Views',desc:'Crisp air lifts the haze for the sharpest views over the mountain city.'},
    Guilin:{tag:'Harvest Along the River',desc:'Golden fields line the Li River under mild, comfortable autumn skies.'},
    Zhangjiajie:{tag:'Colour in the Peaks',desc:'Turning forests paint the sandstone pillars in warm reds and gold.'},
    "Xi'an":{tag:'History & Ancient Walls',desc:'Comfortable weather makes the Terracotta Army and old walls ideal to explore.'},
    Yunnan:{tag:'Terraces Turn Gold',desc:'Harvest turns the rice terraces golden under exceptionally pleasant skies.'},
    Chengdu:{tag:'Food & Easy Escapes',desc:'Prime season for hotpot, food tours and easy trips to nearby scenery.'}
  },
  winter:{
    Beijing:{tag:'Snow on the Wall',desc:'Snow-dusted palaces and a quiet Great Wall under crisp winter light.'},
    Shanghai:{tag:'Festive City Lights',desc:'Cozy caf\u00e9s, holiday markets and the river skyline aglow after dark.'},
    Shenzhen:{tag:'Mild Winter Warmth',desc:'The south stays gentle \u2014 sunny, mild days when the north turns cold.'},
    Chongqing:{tag:'Hotpot & City Nights',desc:'Cool weather is perfect for bubbling hotpot and glowing riverside views.'},
    Guilin:{tag:'Quiet Misty Rivers',desc:'Fewer crowds and soft winter mist give the karst a serene, painterly calm.'},
    Zhangjiajie:{tag:'Snow-capped Pillars',desc:'A dusting of snow turns the towering peaks into a silent wonderland.'},
    "Xi'an":{tag:'Warm Food & Rich History',desc:'Hearty local cuisine and heritage sites in quiet, uncrowded winter light.'},
    Yunnan:{tag:'Mild Sun & Old Towns',desc:'Sunny, mild days make it a warm winter refuge among ancient towns.'},
    Chengdu:{tag:'Teahouses & Snug Days',desc:'Teahouses, spice and unhurried city rhythms exactly when crowds thin.'}
  }
};

/* ---------- RENDER: PICKER ---------- */
const picker=document.getElementById('picker');
SEASONS.forEach(s=>{
  const el=document.createElement('div');
  el.className='pick reveal';
  const fallbackScene=buildScene(PAL[s.id],s.land,s.seed);
  el.innerHTML=`
    <div class="img" style="background-image:url('${fallbackScene}')"></div>
    <video class="season-video" muted loop playsinline preload="auto" aria-hidden="true">
      <source src="../videos/${s.id}.mp4" type="video/mp4">
    </video>
    <div class="scrim"></div>
    <div class="body">
      <h3>${s.name}</h3><div class="dates">${s.dates}</div>
      <p class="lede">${s.lede}</p>
     <a class="cta btn btn-outline-light" href="#${s.id}">
  EXPLORE ${s.name}
</a>
    </div>`;

  const video=el.querySelector('.season-video');
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hoverDevice=window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const canPreviewVideo=!reducedMotion&&hoverDevice;

  const startPreview=()=>{
    if(!canPreviewVideo)return;
    const playRequest=video.play();
    if(playRequest){
      playRequest.catch(()=>stopPreview());
    }
  };

  const stopPreview=()=>{
    el.classList.remove('is-previewing');
    picker.classList.remove('has-preview');
    video.pause();
    try{video.currentTime=0;}catch(_){}
  };

  video.addEventListener('loadeddata',()=>{
    el.classList.add('is-video-ready');
  });

  video.addEventListener('playing',()=>{
    if(!canPreviewVideo)return;
    el.classList.add('is-previewing');
    picker.classList.add('has-preview');
  });

  video.addEventListener('error',()=>{
    el.classList.remove('is-video-ready');
    stopPreview();
  });
  el.addEventListener('mouseenter',startPreview);
  el.addEventListener('mouseleave',stopPreview);
  el.addEventListener('focusin',startPreview);
  el.addEventListener('focusout',e=>{
    if(!el.contains(e.relatedTarget))stopPreview();
  });

  el.querySelector('.cta').addEventListener('click',e=>{e.preventDefault();
    document.getElementById(s.id).scrollIntoView({behavior:'smooth',block:'start'});});
  picker.appendChild(el);
});

/* ---------- RENDER: SEASON ROWS WITH CAROUSEL ---------- */
const rows=document.getElementById('rows');
SEASONS.forEach(s=>{
  const row=document.createElement('section');
  row.className='srow reveal'; row.id=s.id;
  const setHTML=CITY_ORDER.map(city=>{
  const meta = CITY_META[city];
  const c = COPY[s.id][city];

  const imageFile = city === "Xi'an" ? "Xian.jpeg" : `${city}.jpeg`;

const bg =
  s.id === 'spring'
    ? `../images/Season/Spring/${imageFile}`
    : s.id === 'summer'
      ? `../images/Season/Summer/${imageFile}`
      : s.id === 'autumn'
        ? `../images/Season/Autumn/${imageFile}`
        : s.id === 'winter'
          ? `../images/Season/Winter/${imageFile}`
          : buildScene(PAL[s.id], meta.land, meta.seed);
    return `<div class="card">
      <div class="photo"
     style="
       background-image:url('${bg}');
       background-position:${city === "Xi'an" ? "center 35%" : "center"};
     ">
        <div class="g"></div>
        <div class="pin"><span style="color:${s.color}">${ICONS.pin}</span>${city}</div>
        <div class="tag">${c.tag}</div>
      </div>
      <div class="desc"><p class="dtext">${c.desc}</p><span class="more">Explore ${city} &#8594;</span></div>
    </div>`;
  }).join('');
  row.innerHTML=`
    <div class="intro">
      <div class="icon" style="color:${s.color}">${ICONS[s.icon]}</div>
      <h2>${s.name}</h2><div class="dates">${s.dates}</div><div class="rule"></div>
      <p>${s.blurb}</p><div class="count">9 CITIES · DRAG TO EXPLORE</div>
    </div>
    <div class="cwrap">
      <button class="cnav prev" aria-label="Previous">&#8249;</button>
      <div class="cviewport"><div class="ctrack">${setHTML+setHTML+setHTML}</div></div>
      <button class="cnav next" aria-label="Next">&#8250;</button>
    </div>`;
  rows.appendChild(row);
});

/* ---------- CAROUSEL ENGINE (infinite loop) ---------- */
function initCarousel(wrap){
  const track=wrap.querySelector('.ctrack');
  const prev=wrap.querySelector('.prev');
  const next=wrap.querySelector('.next');
  const GAP=parseFloat(getComputedStyle(track).columnGap)||18;
  let cardW, setW;
  function measure(){ cardW=track.children[0].getBoundingClientRect().width; setW=9*(cardW+GAP); }
  measure();
  let pos=-setW-1, hovering=false, dragging=false, startX=0, startPos=0, moved=0, target=null, vel=0, lastX=0, wheelUntil=0;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const speed=reduce?0:0.45;
  function wrapPos(){
    while(pos>-setW){pos-=setW; if(target!==null)target-=setW;}
    while(pos<=-2*setW){pos+=setW; if(target!==null)target+=setW;}
  }
  function frame(){
    const now=performance.now();
    if(target!==null){ pos+=(target-pos)*0.18; if(Math.abs(target-pos)<0.5){pos=target;target=null;} }
    else if(dragging){ /* position driven by pointer */ }
    else if(now<wheelUntil){ /* position driven by trackpad wheel */ }
    else if(Math.abs(vel)>0.15){ pos+=vel; vel*=0.92; }       // glide, gradually slowing
    else if(!hovering){ pos-=speed; }                          // idle auto-scroll
    wrapPos();
    track.style.transform=`translate3d(${pos.toFixed(2)}px,0,0)`;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  wrap.addEventListener('mouseenter',()=>hovering=true);
  wrap.addEventListener('mouseleave',()=>{hovering=false;dragging=false;track.classList.remove('dragging');});
  track.addEventListener('dragstart',e=>e.preventDefault());
  track.addEventListener('pointerdown',e=>{dragging=true;moved=0;startX=lastX=e.clientX;startPos=pos;target=null;vel=0;
    try{track.setPointerCapture(e.pointerId);}catch(_){}track.classList.add('dragging');});
  track.addEventListener('pointermove',e=>{if(!dragging)return;
    vel=e.clientX-lastX; lastX=e.clientX;
    const dx=e.clientX-startX; moved=Math.max(moved,Math.abs(dx));
    pos=startPos+dx; wrapPos();});
  const endDrag=()=>{if(dragging){dragging=false;track.classList.remove('dragging');}};
  track.addEventListener('pointerup',endDrag);
  track.addEventListener('pointercancel',endDrag);
  track.addEventListener('click',e=>{if(moved>6){e.preventDefault();e.stopPropagation();}},true);
  wrap.addEventListener('wheel',e=>{
    const d=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:(e.shiftKey?e.deltaY:0);
    if(!d) return;                 // vertical intent: let the page scroll
    e.preventDefault(); target=null;
    pos-=d; wrapPos();             // 1:1 tracking while swiping
    vel=Math.max(-55,Math.min(55,-d));  // seed a decaying glide on release
    wheelUntil=performance.now()+80;
  },{passive:false});
  const step=()=>cardW+GAP;
  prev.addEventListener('click',()=>{target=(target===null?pos:target)+step();});
  next.addEventListener('click',()=>{target=(target===null?pos:target)-step();});
  window.addEventListener('resize',()=>{measure();wrapPos();});
}
document.querySelectorAll('.cwrap').forEach(initCarousel);

/* ---------- HERO DECORATION ---------- */
document.getElementById('deco').innerHTML=`
  <svg width="180" height="80" style="left:4%;top:34%;opacity:.4" viewBox="0 0 180 80" fill="none" stroke="#c6a24b" stroke-width="2"><path d="M10 50 q20-30 45-15 q10-20 35-8 q25-2 30 18 M20 62 q30-10 60 0"/></svg>
  <svg width="70" height="40" style="right:20%;top:22%;opacity:.55" viewBox="0 0 70 40" fill="#3a4552"><path d="M2 20 Q18 6 34 20 Q50 6 68 20 L60 24 Q46 14 36 24 Q26 14 12 24 Z"/></svg>
  <svg width="52" height="30" style="right:12%;top:30%;opacity:.45" viewBox="0 0 70 40" fill="#3a4552"><path d="M2 20 Q18 6 34 20 Q50 6 68 20 L60 24 Q46 14 36 24 Q26 14 12 24 Z"/></svg>
  <svg width="150" height="70" style="right:2%;top:44%;opacity:.35" viewBox="0 0 180 80" fill="none" stroke="#c6a24b" stroke-width="2"><path d="M10 50 q20-30 45-15 q10-20 35-8 q25-2 30 18"/></svg>`;

/* ---------- SCROLL REVEAL ---------- */
const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
