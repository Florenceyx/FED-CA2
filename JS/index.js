const MAP="../images/image/china-map.png";
const VB={w:1506,h:1024};
/* Add each city page path here when the page is ready. */
const PAGES={
  Beijing:'./Beijing.html',
  "Xi'an":"./Xi'an.html",
  Shanghai:'./Shanghai.html',
  Shenzhen:'./Shenzhen.html',
  Chongqing:'./Chongqing.html',
  Zhangjiajie:'./Zhangjiajie.html',
  Guilin:'./Guilin.html',
  Chengdu:'./Chengdu.html',
  Yunnan:'./Yunnan.html'
};

/* Add each journey page path here when the page is ready. */
const JOURNEY_PAGES={
  ancient:'./Beijing.html',
  modern:'./Shanghai.html',
  natural:'./Zhangjiajie.html',
  cultural:'./Chengdu.html'
};

const THEME={
  ancient:{name:'Ancient China',color:'#b5342a',cities:'Beijing · Xi\u2019an',cap:['Walk through thousands','of years of history.'],
    icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l9 4-1 1.6H4L3 7z"/><path d="M5 10h2v7H5zM11 10h2v7h-2zM17 10h2v7h-2zM3 18h18v2H3z"/></svg>'},
  modern:{name:'Modern China',color:'#2b7cc0',cities:'Shanghai · Shenzhen',cap:['Experience the pulse','of tomorrow.'],
    icon:'<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="8" width="6" height="13"/><rect x="11" y="3" width="5" height="18"/><rect x="17" y="11" width="3" height="10"/></svg>'},
  natural:{name:'Natural China',color:'#3f9057',cities:'Zhangjiajie · Guilin',cap:['Escape into misty mountains,','rivers and landscapes','that feel unreal.'],
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M3 20l6-11 4 7 3-5 5 9z"/></svg>'},
  cultural:{name:'Cultural China',color:'#c99a3a',cities:'Chengdu · Yunnan',cap:['Discover traditions,','cultures and local','ways of life.'],
    icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 4c3 2-3 4 0 6s-3 4 0 6M12 4c-3 2 3 4 0 6s3 4 0 6M6 10c2 0 2 4 6 4s4-4 6-4M6 14c2 0 2-4 6-4s4 4 6 4"/></svg>'}
};
const CITIES={
  Beijing:{prov:'Beijing 直辖市',theme:'ancient',pt:[1005,300],poly:[[975,296],[998,282],[1022,282],[1038,300],[1030,326],[1006,338],[982,328],[968,310]]},
  "Xi'an":{prov:'陕西省',theme:'ancient',pt:[866,452],poly:[[838,372],[878,360],[900,384],[892,420],[906,452],[898,492],[882,532],[856,548],[838,520],[848,484],[832,452],[830,414]]},
  Shanghai:{prov:'上海 直辖市',theme:'modern',pt:[1203,542],poly:[[1186,522],[1210,516],[1228,528],[1230,548],[1212,562],[1190,552],[1182,536]]},
  Shenzhen:{prov:'广东省',theme:'modern',pt:[1150,725],poly:[[1046,668],[1104,654],[1162,662],[1204,690],[1210,730],[1188,766],[1132,784],[1076,776],[1044,742],[1036,700]]},
  Chongqing:{prov:'重庆 直辖市',theme:'modern',pt:[1018,584],poly:[[980,556],[1016,546],[1052,552],[1072,574],[1064,600],[1034,616],[1000,610],[978,588]]},
  Zhangjiajie:{prov:'湖南省',theme:'natural',pt:[722,572],poly:[[668,548],[716,536],[766,548],[792,580],[786,622],[754,650],[712,654],[676,628],[658,586]]},
  Guilin:{prov:'广西壮族自治区',theme:'natural',pt:[652,718],poly:[[586,676],[642,662],[694,672],[720,704],[714,748],[682,782],[628,790],[586,762],[568,714]]},
  Chengdu:{prov:'四川省',theme:'cultural',pt:[848,650],poly:[[724,592],[780,568],[848,560],[906,580],[934,620],[928,668],[892,706],[834,720],[778,712],[736,684],[712,644],[712,616]]},
  Yunnan:{prov:'云南省',theme:'cultural',pt:[758,808],poly:[[636,744],[700,722],[770,716],[834,732],[864,764],[858,812],[818,850],[752,868],[688,854],[646,814],[628,776]]}
};
const CITY_TAGS={
  Beijing:{x:1014,y:294,w:76},
  "Xi'an":{x:814,y:458,w:68},
  Shanghai:{x:1198,y:535,w:84},
  Shenzhen:{x:1150,y:735,w:84},
  Chongqing:{x:1000,y:578,w:96},
  Zhangjiajie:{x:674,y:551,w:100},
  Guilin:{x:627,y:729,w:66},
  Chengdu:{x:868,y:646,w:84},
  Yunnan:{x:768,y:815,w:74}
};
THEME.modern.cities='Shanghai \u00b7 Chongqing \u00b7 Shenzhen';
const THEME_LABELS=[{t:'ancient',x:760,y:150},{t:'modern',x:1230,y:404},{t:'natural',x:340,y:548},{t:'cultural',x:900,y:682}];

function pts2str(p){return p.map(a=>a.join(',')).join(' ');}
function buildMap(){
  let provs='',themes='',tags='';
  const tagDefs=`<defs>
    <linearGradient id="tag-ancient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bd120e"/><stop offset="1" stop-color="#920500"/></linearGradient>
    <linearGradient id="tag-modern" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#155997"/><stop offset="1" stop-color="#073568"/></linearGradient>
    <linearGradient id="tag-natural" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16803d"/><stop offset="1" stop-color="#075f28"/></linearGradient>
    <linearGradient id="tag-cultural" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#df9511"/><stop offset="1" stop-color="#b86700"/></linearGradient>
  </defs>`;
  Object.entries(CITIES).forEach(([city,d],i)=>{
    const pts=pts2str(d.poly);
    const tag=CITY_TAGS[city];
    provs+=`<g class="prov" data-city="${city}"><polygon class="hit" points="${pts}"/></g>`;
    tags+=`<a class="city-link" href="${PAGES[city]}" target="_self" aria-label="Explore ${city}"><g class="city-tag" data-city="${city}" data-theme="${d.theme}" transform="translate(${tag.x} ${tag.y})" tabindex="0" role="link"><g class="tag-lift"><rect x="${-tag.w/2}" y="-17" width="${tag.w}" height="34" rx="6" fill="url(#tag-${d.theme})" stroke="rgba(255,255,255,.32)" stroke-width="1"/><text x="0" y="5" text-anchor="middle" fill="#fff" font-family="Inter,sans-serif" font-size="14.5" font-weight="600">${city}</text></g></g></a>`;
  });
  THEME_LABELS.forEach(l=>{const th=THEME[l.t];
    const caps=th.cap.map((line,k)=>`<tspan x="40" dy="${k===0?0:18}">${line}</tspan>`).join('');
    themes+=`<g transform="translate(${l.x} ${l.y})"><g transform="translate(-2 -20) scale(1.4)" style="color:${th.color}">${th.icon.replace('<svg','<svg width="20" height="20"')}</g><text x="40" y="-4" font-family="Playfair Display,serif" font-weight="700" font-size="27" letter-spacing="1" fill="${th.color}" style="paint-order:stroke" stroke="#fff" stroke-width="3.4" stroke-opacity=".55">${th.name.toUpperCase()}</text><text x="40" y="20" font-family="Inter,sans-serif" font-size="14.5" fill="#2c3b50" style="paint-order:stroke" stroke="#fff" stroke-width="3" stroke-opacity=".6">${caps}</text></g>`;
  });
  document.getElementById('heroMap').innerHTML=`<svg viewBox="0 0 ${VB.w} ${VB.h}" xmlns="http://www.w3.org/2000/svg">${tagDefs}<image href="${MAP}" x="0" y="0" width="${VB.w}" height="${VB.h}"/><g id="provGroups">${provs}</g><g id="themeLabels">${themes}</g><g id="cityTags">${tags}</g></svg>`;
}
buildMap();

/* SVG links can behave differently across browsers, so each visible city tag
   also receives an explicit mouse, touch and keyboard navigation handler. */
document.querySelectorAll('.city-tag').forEach(tag=>{
  const openCity=()=>{
    const destination=PAGES[tag.dataset.city];
    if(destination) window.location.assign(destination);
  };

  tag.addEventListener('click',event=>{
    event.preventDefault();
    event.stopPropagation();
    openCity();
  });

  tag.addEventListener('keydown',event=>{
    if(event.key==='Enter'||event.key===' '){
      event.preventDefault();
      openCity();
    }
  });
});

document.getElementById('journeys').innerHTML='<h4>EXPLORE FOUR JOURNEYS</h4>'+
  Object.keys(THEME).map(t=>{const th=THEME[t];return `<a class="jrow" data-theme="${t}" href="${JOURNEY_PAGES[t]}" aria-label="Explore ${th.name}"><div class="ji" style="color:${th.color}">${th.icon}</div><div class="jt"><b>${th.name}</b><span>${th.cities}</span></div><div class="chev">&rsaquo;</div></a>`;}).join('');

const hero=document.getElementById('hero');
document.querySelectorAll('.jrow').forEach(row=>{const t=row.dataset.theme;
  const flash=on=>document.querySelectorAll('.city-tag').forEach(tag=>{if(tag.dataset.theme===t)tag.classList.toggle('flash',on);});
  row.addEventListener('mouseenter',()=>flash(true));row.addEventListener('mouseleave',()=>flash(false));
  row.addEventListener('focus',()=>flash(true));row.addEventListener('blur',()=>flash(false));
});

/* ===== entrance animation ===== */
window.addEventListener('load',()=>{
  const arrivedFromOpening=document.documentElement.classList.contains('from-opening');
  if(arrivedFromOpening){
    const curtain=document.createElement('div');
    curtain.className='opening-curtain';
    curtain.setAttribute('aria-hidden','true');
    document.body.appendChild(curtain);
    requestAnimationFrame(()=>requestAnimationFrame(()=>curtain.classList.add('release')));
    setTimeout(()=>{
      curtain.remove();
      document.documentElement.classList.remove('from-opening');
      sessionStorage.removeItem('chinaOpeningTransition');
    },950);
  }
  document.querySelectorAll('.lead h1 .w').forEach((w,i)=>w.style.transitionDelay=(0.25+i*0.09)+'s');
  const seq=[['.rule',0.75],['.lead p',0.9],['.btn-primary',1.05],['.lead .sub',1.2],['.journeys',1.35]];
  seq.forEach(([sel,d])=>{const el=document.querySelector(sel);if(el)el.style.transitionDelay=d+'s';});
  requestAnimationFrame(()=>document.body.classList.add('in'));
});

/* ===== mouse parallax (clouds behind + map) ===== */
const reduce=(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)||false;
if(!reduce){
  const layers=[['.c-bl',22],['.c-br',-20],['.c-sea',11],['.c-haze',7]];
  const mapPar=document.getElementById('mapPar');
  let tx=0,ty=0,cx=0,cy=0,raf=0;
  hero.addEventListener('mousemove',e=>{const r=hero.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-0.5)*2; ty=((e.clientY-r.top)/r.height-0.5)*2;
    if(!raf)raf=requestAnimationFrame(loop);});
  hero.addEventListener('mouseleave',()=>{tx=0;ty=0;if(!raf)raf=requestAnimationFrame(loop);});
  function loop(){cx+=(tx-cx)*0.06;cy+=(ty-cy)*0.06;
    layers.forEach(([sel,dep])=>{const el=document.querySelector(sel);if(el)el.style.transform=`translate(${(cx*dep).toFixed(1)}px,${(cy*dep*0.5).toFixed(1)}px)`;});
    mapPar.style.transform=`translate(${(-cx*7).toFixed(1)}px,${(-cy*5).toFixed(1)}px)`;
    if(Math.abs(tx-cx)>0.001||Math.abs(ty-cy)>0.001){raf=requestAnimationFrame(loop);}else{raf=0;}
  }
}

