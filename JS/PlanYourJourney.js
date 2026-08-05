/* The original answer values, weights, city vectors and result maths are preserved below. */
const AX=['adventure','culture','nature','food','luxury','nightlife'];
const AXLABEL={adventure:'Adventure',culture:'Culture',nature:'Nature',food:'Food',luxury:'Luxury',nightlife:'Nightlife'};
const CITY_ORDER=['Beijing','Shanghai','Shenzhen','Chongqing','Guilin','Zhangjiajie',"Xi'an",'Yunnan','Chengdu'];
const CITY={
  Beijing:{v:{adventure:4,culture:10,nature:4,food:7,luxury:6,nightlife:6},pal:'warm',land:'wall',seed:.6,tags:['Imperial History','Great Wall','Street Food']},
  Shanghai:{v:{adventure:3,culture:6,nature:2,food:8,luxury:9,nightlife:9},pal:'night',land:'skyline',seed:4.4,tags:['Skyline','Luxury','Nightlife']},
  Shenzhen:{v:{adventure:5,culture:3,nature:4,food:6,luxury:8,nightlife:8},pal:'night',land:'skyline',seed:3.3,tags:['Modern City','Innovation','Coast']},
  Chongqing:{v:{adventure:6,culture:5,nature:5,food:10,luxury:5,nightlife:8},pal:'night',land:'skyline',seed:1.8,tags:['Hotpot','River Nights','Mountain City']},
  Guilin:{v:{adventure:6,culture:5,nature:10,food:5,luxury:3,nightlife:2},pal:'jade',land:'karst',seed:2.7,tags:['Karst Rivers','Cruises','Nature']},
  Zhangjiajie:{v:{adventure:9,culture:3,nature:10,food:4,luxury:3,nightlife:2},pal:'jade',land:'pillars',seed:1.1,tags:['Peaks','Hiking','Adventure']},
  "Xi'an":{v:{adventure:4,culture:10,nature:3,food:8,luxury:4,nightlife:5},pal:'warm',land:'pagoda',seed:2.6,tags:['Terracotta Army','Ancient Walls','Cuisine']},
  Yunnan:{v:{adventure:7,culture:8,nature:9,food:6,luxury:4,nightlife:3},pal:'warm',land:'terraces',seed:.9,tags:['Ethnic Culture','Nature','Old Towns']},
  Chengdu:{v:{adventure:5,culture:7,nature:6,food:10,luxury:5,nightlife:6},pal:'rose',land:'pagoda',seed:3.9,tags:['Pandas','Food','Teahouses']}
};
const CITY_PLAN={
  Beijing:'Forbidden City, hutong walk and a day trip to the Great Wall.',
  Shanghai:'The Bund, Yu Garden and an evening skyline experience.',
  Shenzhen:'Creative districts, modern landmarks and a relaxed coastal visit.',
  Chongqing:'Mountain-city viewpoints, riverside streets and a hotpot evening.',
  Guilin:'Li River cruise, karst scenery and countryside around Yangshuo.',
  Zhangjiajie:'Forest trails, sandstone peaks and a panoramic mountain viewpoint.',
  "Xi'an":'Terracotta Army, Ancient City Wall and the Muslim Quarter.',
  Yunnan:'Old towns, local culture and a scenic tea or rice-terrace experience.',
  Chengdu:'Panda Base, traditional teahouse and an authentic Sichuan food evening.'
};
const PLAN_DAYS=['DAYS 1–3','DAYS 4–5','DAYS 6–7'];
const TYPE={
  adventure:{name:'Adventure Seeker',desc:'You chase the trail, the summit and the view most people never reach. Rugged landscapes and active days are your idea of a great trip.'},
  culture:{name:'Heritage Seeker',desc:'History speaks to you. You travel for ancient walls, living traditions and the stories behind every place.'},
  nature:{name:'Nature Explorer',desc:'You love wild landscapes, peaceful scenery and authentic, unhurried experiences close to the land.'},
  food:{name:'Culinary Voyager',desc:'You taste your way through a country. Markets, street stalls and regional flavours are the heart of your journey.'},
  luxury:{name:'Refined Escapist',desc:'Comfort and beauty matter. You favour elegant stays, sweeping views and journeys that feel effortless.'},
  nightlife:{name:'City Nightowl',desc:'You come alive after dark. Skylines, energy and buzzing streets are exactly your kind of adventure.'}
};

/* ================= ORIGINAL QUESTIONS ================= */
const QUESTIONS=[
  {type:'grid',q:'Which scene calls to you?',options:[
    {name:'Misty Mountains',pal:'jade',land:'karst',seed:2,w:{nature:3,adventure:1}},
    {name:'Ancient Temples',pal:'warm',land:'pagoda',seed:1,w:{culture:3}},
    {name:'Futuristic Skyline',pal:'night',land:'skyline',seed:4,w:{nightlife:2,luxury:2}},
    {name:'Night Market Streets',pal:'warm',land:'skyline',seed:3,w:{food:2,nightlife:2}}
  ]},
  {type:'icons',cols:'c4',q:'Your ideal morning?',options:[
    {name:'Sunrise hike',icon:'hike',w:{adventure:3,nature:2}},
    {name:'Coffee with a view',icon:'coffee',w:{luxury:2,nature:1}},
    {name:'Wander an old town',icon:'town',w:{culture:2,nature:1}},
    {name:'Local breakfast',icon:'bowl',w:{food:3}}
  ]},
  {type:'grid',q:'Which landscape excites you most?',options:[
    {name:'Karst rivers',pal:'jade',land:'karst',seed:5,w:{nature:3}},
    {name:'Snow-capped peaks',pal:'snow',land:'pillars',seed:6,w:{adventure:2,nature:2}},
    {name:'Golden rice terraces',pal:'warm',land:'terraces',seed:7,w:{nature:2,culture:1}},
    {name:'City lights at night',pal:'night',land:'skyline',seed:8,w:{nightlife:3}}
  ]},
  {type:'slider',q:'What&rsquo;s your travel budget?',left:{t:'Budget',icon:'compass'},right:{t:'Luxury',icon:'crown'},
    fmt:t=>t<.33?'Smart & thrifty':t<.66?'Comfortable middle':'Full-on luxury',
    apply:(t,ax)=>{ax.luxury+=t*4;ax.adventure+=(1-t)*1.5;}},
  {type:'icons',cols:'c3',q:'What&rsquo;s your travel pace?',options:[
    {name:'Slow Explorer',sub:'Soak in the moment',icon:'turtle',w:{luxury:1,culture:1,food:1}},
    {name:'Balanced',sub:'A bit of everything',icon:'compass',w:{culture:1,nature:1}},
    {name:'Adventure Seeker',sub:'Off the beaten path',icon:'mtn',w:{adventure:3,nature:1}}
  ]},
  {type:'icons',cols:'c4',q:'Who do you travel with?',options:[
    {name:'Solo',icon:'solo',w:{adventure:1,culture:1}},
    {name:'Couple',icon:'couple',w:{luxury:2}},
    {name:'Family',icon:'family',w:{culture:1,nature:1}},
    {name:'Friends',icon:'friends',w:{nightlife:2,food:1}}
  ]},
  {type:'slider',q:'What matters more on the trip?',left:{t:'Flavours',icon:'noodle'},right:{t:'Landmarks',icon:'temple'},
    fmt:t=>t<.4?'It&rsquo;s all about the food':t>.6?'It&rsquo;s all about the sights':'A taste of both',
    apply:(t,ax)=>{ax.food+=(1-t)*3;ax.culture+=t*3;}},
  {type:'multi',max:3,q:'What surprises you most? (pick up to 3)',options:[
    {name:'Wildlife',icon:'paw',w:{nature:2}},
    {name:'Architecture',icon:'temple',w:{culture:2}},
    {name:'Culture',icon:'globe',w:{culture:2}},
    {name:'Nature',icon:'leaf',w:{nature:2}},
    {name:'Nightlife',icon:'moon',w:{nightlife:2}},
    {name:'Food',icon:'noodle',w:{food:2}},
    {name:'Photography',icon:'camera',w:{nature:1,culture:1}},
    {name:'Luxury',icon:'crown',w:{luxury:2}}
  ]}
];
const REQUIRED=QUESTIONS.map((q,i)=>q.type!=='slider'?i:-1).filter(i=>i>=0);

const answers={};
const sliderVal={3:50,6:50};
const SCENES=[
  '../images/Season/Summer/Zhangjiajie.jpeg',
  '../images/Season/Spring/Beijing.jpeg',
  '../images/Season/Summer/Guilin.jpeg',
  '../images/Season/Autumn/Shanghai.jpeg',
  '../images/Season/Autumn/Yunnan.jpeg',
  '../images/Season/Spring/Chengdu.jpeg',
  '../images/Season/Summer/Chongqing.jpeg',
  '../images/Season/Winter/Yunnan.jpeg'
];
const CITY_SCENE={Beijing:SCENES[0],Shanghai:SCENES[7],Shenzhen:SCENES[7],Chongqing:SCENES[4],Guilin:SCENES[2],Zhangjiajie:SCENES[2],"Xi'an":SCENES[4],Yunnan:SCENES[3],Chengdu:SCENES[0]};
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

const intro=document.getElementById('intro');
const quiz=document.getElementById('quiz');
const results=document.getElementById('results');
const questionMount=document.getElementById('questionMount');
const continueBtn=document.getElementById('continueBtn');
const backBtn=document.getElementById('backBtn');
const progressCurrent=document.getElementById('progressCurrent');
const progressFill=document.getElementById('progressFill');
const progressNodes=document.querySelectorAll('#progressNodes span');
const backgroundLayers=[document.getElementById('backgroundA'),document.getElementById('backgroundB')];
let activeBackground=0;
let currentQuestion=0;
let transitioning=false;

function preloadScene(index){if(index<0||index>=SCENES.length)return;const image=new Image();image.decoding='async';image.src=SCENES[index];}
SCENES.forEach((_,i)=>{if(i<2)preloadScene(i);});

/* Reusable one-question scene component. */
function QuestionScene(question,index,direction=1){
  let answerMarkup='';
  if(question.type==='slider'){
    const value=sliderVal[index]??50;
    answerMarkup=`<div class="slider-answer">
      <div class="slider-labels"><span>${question.left.t}</span><span>${question.right.t}</span></div>
      <input id="questionSlider" type="range" min="0" max="100" value="${value}" aria-label="${question.q.replace(/&[^;]+;/g,' ')}" style="--slider-progress:${value}%">
      <p class="slider-value" id="sliderValue">${question.fmt(value/100)}</p>
    </div>`;
  }else{
    const chosen=question.type==='multi'?(answers[index]||[]):[answers[index]];
    const note=question.type==='multi'?`<p class="multi-note">Select one, two or three answers.</p>`:'';
    answerMarkup=note+`<div class="answer-list" role="group" aria-label="Answer options">${question.options.map((option,optionIndex)=>{
      const selected=chosen.includes(optionIndex);
      return `<button class="answer-option${selected?' is-selected':''}" data-option="${optionIndex}" aria-pressed="${selected}">
        <span class="option-index">${String(optionIndex+1).padStart(2,'0')}</span>
        <span>${option.name}${option.sub?`<small class="option-sub">${option.sub}</small>`:''}</span>
      </button>`;
    }).join('')}</div>`;
  }
  return `<div class="question-scene ${direction>0?'enter-from-right':'enter-from-left'}" data-question-scene>
    <p class="question-number">QUESTION ${String(index+1).padStart(2,'0')} / 08</p>
    <h2>${question.q}</h2>
    ${answerMarkup}
  </div>`;
}

function syncControls(){
  const question=QUESTIONS[currentQuestion];
  progressCurrent.textContent=String(currentQuestion+1).padStart(2,'0');
  progressFill.style.width=`${((currentQuestion+1)/QUESTIONS.length)*100}%`;
  progressNodes.forEach((node,index)=>{
    node.classList.toggle('is-complete',index<currentQuestion);
    node.classList.toggle('is-current',index===currentQuestion);
  });
  backBtn.style.visibility='visible';
  const needsContinue=question.type==='slider'||question.type==='multi';
  continueBtn.style.visibility=needsContinue?'visible':'hidden';
  continueBtn.disabled=question.type==='multi'&&!(answers[currentQuestion]||[]).length;
  preloadScene(currentQuestion+1);
}

function setBackground(index){
  const incoming=1-activeBackground;
  backgroundLayers[incoming].style.backgroundImage=`url("${SCENES[index]}")`;
  backgroundLayers[incoming].classList.add('is-active');
  backgroundLayers[activeBackground].classList.remove('is-active');
  activeBackground=incoming;
}

function renderQuestion(index,direction=1,animate=true){
  currentQuestion=index;
  questionMount.innerHTML=QuestionScene(QUESTIONS[index],index,direction);
  syncControls();
  const scene=questionMount.querySelector('[data-question-scene]');
  if(!animate||reduceMotion){scene.classList.remove('enter-from-right','enter-from-left');return;}
  requestAnimationFrame(()=>requestAnimationFrame(()=>scene.classList.remove('enter-from-right','enter-from-left')));
}

function transitionTo(index,direction=1){
  if(transitioning||index<0||index>=QUESTIONS.length)return;
  transitioning=true;
  const oldScene=questionMount.querySelector('[data-question-scene]');
  if(oldScene)oldScene.classList.add(direction>0?'is-leaving-forward':'is-leaving-back');
  setBackground(index);
  if(reduceMotion){
    renderQuestion(index,direction,false);
    transitioning=false;
    return;
  }

  currentQuestion=index;
  questionMount.insertAdjacentHTML('beforeend',QuestionScene(QUESTIONS[index],index,direction));
  const scenes=questionMount.querySelectorAll('[data-question-scene]');
  const incomingScene=scenes[scenes.length-1];
  syncControls();

  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    incomingScene.classList.remove('enter-from-right','enter-from-left');
  }));

  setTimeout(()=>{
    if(oldScene)oldScene.remove();
    transitioning=false;
  },640);
}

function advance(){
  if(currentQuestion===QUESTIONS.length-1){reveal();return;}
  transitionTo(currentQuestion+1,1);
}

function selectOption(optionIndex){
  if(transitioning)return;
  const question=QUESTIONS[currentQuestion];
  if(question.type==='multi'){
    let selected=answers[currentQuestion]||[];
    if(selected.includes(optionIndex))selected=selected.filter(value=>value!==optionIndex);
    else if(selected.length<question.max)selected=[...selected,optionIndex];
    answers[currentQuestion]=selected;
    questionMount.querySelectorAll('[data-option]').forEach(button=>{
      const active=selected.includes(Number(button.dataset.option));
      button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));
    });
    syncControls();
    return;
  }
  answers[currentQuestion]=optionIndex;
  questionMount.querySelectorAll('[data-option]').forEach(button=>{
    const active=Number(button.dataset.option)===optionIndex;
    button.classList.toggle('is-selected',active);button.setAttribute('aria-pressed',String(active));
  });
  setTimeout(advance,reduceMotion?0:440);
}

function startQuiz(){
  intro.hidden=true;results.hidden=true;quiz.hidden=false;
  backgroundLayers[0].style.backgroundImage=`url("${SCENES[0]}")`;
  backgroundLayers[0].classList.add('is-active');backgroundLayers[1].classList.remove('is-active');activeBackground=0;
  renderQuestion(0,1,true);
}

document.getElementById('startBtn').addEventListener('click',startQuiz);
questionMount.addEventListener('click',event=>{const option=event.target.closest('[data-option]');if(option)selectOption(Number(option.dataset.option));});
questionMount.addEventListener('input',event=>{
  if(event.target.id!=='questionSlider')return;
  const value=Number(event.target.value);sliderVal[currentQuestion]=value;
  event.target.style.setProperty('--slider-progress',`${value}%`);
  document.getElementById('sliderValue').innerHTML=QUESTIONS[currentQuestion].fmt(value/100);
});
continueBtn.addEventListener('click',advance);
backBtn.addEventListener('click',()=>{
  if(transitioning)return;
  if(currentQuestion===0){quiz.hidden=true;intro.hidden=false;return;}
  transitionTo(currentQuestion-1,-1);
});

/* ================= ORIGINAL SCORING ================= */
function addW(ax,w){for(const k in w)ax[k]+=w[k];}
function computeAxes(){
  const ax={adventure:0,culture:0,nature:0,food:0,luxury:0,nightlife:0};
  QUESTIONS.forEach((q,i)=>{
    if(q.type==='slider')q.apply((sliderVal[i]??50)/100,ax);
    else if(q.type==='multi')(answers[i]||[]).forEach(oi=>addW(ax,q.options[oi].w));
    else if(answers[i]!=null)addW(ax,q.options[answers[i]].w);
  });
  return ax;
}
function vec(ax){return AX.map(k=>ax[k]);}
function cos(a,b){let d=0,na=0,nb=0;for(let i=0;i<a.length;i++){d+=a[i]*b[i];na+=a[i]*a[i];nb+=b[i]*b[i];}return (na&&nb)?d/(Math.sqrt(na)*Math.sqrt(nb)):0;}
function rankCities(ax){const uv=vec(ax);return CITY_ORDER.map(c=>({c,s:cos(uv,vec(CITY[c].v))})).sort((a,b)=>b.s-a.s);}
function topType(ax){let best='nature',bv=-1;AX.forEach(k=>{if(ax[k]>bv){bv=ax[k];best=k;}});return best;}
function answeredCount(){return REQUIRED.filter(i=>QUESTIONS[i].type==='multi'?(answers[i]||[]).length>0:answers[i]!=null).length;}

/* ================= ORIGINAL ROUTE MODEL ================= */
const NODES={Beijing:[78,26],"Xi'an":[60,45],Shanghai:[88,49],Chengdu:[45,54],Chongqing:[55,60],Zhangjiajie:[65,63],Guilin:[63,76],Shenzhen:[80,81],Yunnan:[39,74]};
const EDGES=[['Beijing',"Xi'an"],["Xi'an",'Chengdu'],['Chengdu','Chongqing'],['Chongqing','Zhangjiajie'],['Zhangjiajie','Guilin'],['Guilin','Shenzhen'],['Chengdu','Yunnan'],['Yunnan','Guilin'],["Xi'an",'Shanghai'],['Beijing','Shanghai']];
function mapSVG(opt){
  opt=opt||{};const hi=opt.highlight||[];
  let svg='<svg viewBox="0 0 100 100" role="img" aria-label="Recommended route map">';
  EDGES.forEach(([a,b])=>{const[x1,y1]=NODES[a],[x2,y2]=NODES[b];svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#d7b56d" stroke-width=".5" opacity="${hi.length?.18:.42}"/>`;});
  if(hi.length){const ordered=[...hi].sort((a,b)=>NODES[a][1]-NODES[b][1]);for(let i=0;i<ordered.length-1;i++){const[x1,y1]=NODES[ordered[i]],[x2,y2]=NODES[ordered[i+1]];svg+=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#f5dc9c" stroke-width="1.1" stroke-linecap="round"/>`;}}
  for(const city in NODES){const[x,y]=NODES[city],active=hi.includes(city);svg+=`<circle cx="${x}" cy="${y}" r="${active?2.2:1}" fill="${active?'#f5dc9c':'#d7b56d'}" opacity="${active?1:.6}"/>`;if(active)svg+=`<text x="${x}" y="${y-3.6}" text-anchor="middle" font-size="3" fill="#f4efe4" font-family="Georgia,serif">${city}</text>`;}
  return svg+'</svg>';
}

function drawRadar(ax){
  const cx=100,cy=100,R=72,n=6,mx=Math.max(1,...AX.map(k=>ax[k]));let grid='',axes='',labels='',points='';
  for(let ring=1;ring<=3;ring++){let ringPoints='';for(let i=0;i<n;i++){const angle=-Math.PI/2+i*2*Math.PI/n,radius=R*ring/3;ringPoints+=`${(cx+radius*Math.cos(angle)).toFixed(1)},${(cy+radius*Math.sin(angle)).toFixed(1)} `;}grid+=`<polygon points="${ringPoints}" fill="none" stroke="#d8cbb0" stroke-width=".8"/>`;}
  for(let i=0;i<n;i++){const angle=-Math.PI/2+i*2*Math.PI/n,lx=cx+(R+14)*Math.cos(angle),ly=cy+(R+14)*Math.sin(angle);axes+=`<line x1="${cx}" y1="${cy}" x2="${(cx+R*Math.cos(angle)).toFixed(1)}" y2="${(cy+R*Math.sin(angle)).toFixed(1)}" stroke="#e2d8c2" stroke-width=".6"/>`;labels+=`<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="8" fill="#f4efe4" text-anchor="middle" dominant-baseline="middle">${AXLABEL[AX[i]]}</text>`;const radius=R*(ax[AX[i]]/mx);points+=`${(cx+radius*Math.cos(angle)).toFixed(1)},${(cy+radius*Math.sin(angle)).toFixed(1)} `;}
  document.getElementById('radar').innerHTML=grid+axes+labels+`<polygon points="${points}" fill="rgba(215,181,109,.3)" stroke="#d7b56d" stroke-width="1.6"/>`;
}

/* ================= ORIGINAL RESULT CALCULATION ================= */
let lastResult=null;
function reveal(){
  if(answeredCount()<REQUIRED.length)return;
  transitioning=true;
  const ax=computeAxes(),ranked=rankCities(ax),tKey=topType(ax);
  const top3=ranked.slice(0,3);
  const disp=c=>Math.min(99,Math.round(74+top3.find(x=>x.c===c).s*25));
  const matches={};top3.forEach(x=>matches[x.c]=Math.min(99,Math.round(74+x.s*25)));
  lastResult={ax,tKey,top3,matches};

  quiz.hidden=true;intro.hidden=true;results.hidden=false;
  document.getElementById('rcalc').hidden=false;document.getElementById('rpanel').hidden=true;
  document.getElementById('resultLandscape').style.backgroundImage=`url("${CITY_SCENE[top3[0].c]}")`;
  setTimeout(()=>{
    document.getElementById('rcalc').hidden=true;document.getElementById('rpanel').hidden=false;
    document.getElementById('resultMap').innerHTML=mapSVG({highlight:top3.map(x=>x.c)});
    document.getElementById('rType').textContent=TYPE[tKey].name;
    document.getElementById('rDesc').textContent=TYPE[tKey].desc;
    const topPct=matches[top3[0].c];
    countUp(document.getElementById('rMatch'),topPct);countUp(document.getElementById('ringPct'),topPct,'%');countUp(document.getElementById('ppPct'),topPct,'%');
    document.getElementById('rList').innerHTML=top3.map((x,index)=>`<div class="route-item"><div class="route-city"><span>${x.c}</span><em>${PLAN_DAYS[index]} · ${matches[x.c]}% MATCH</em></div><div class="route-tags">${CITY[x.c].tags.map(tag=>`<span>${tag}</span>`).join('')}</div><p class="route-plan">${CITY_PLAN[x.c]}</p></div>`).join('');
    document.getElementById('ppType').textContent=TYPE[tKey].name;document.getElementById('ppRoute').textContent=top3.map(x=>x.c).join(' → ');
    drawRadar(ax);transitioning=false;
  },1500);
}
function countUp(element,to,suffix){let started=null;const duration=900;function step(time){if(!started)started=time;const progress=Math.min(1,(time-started)/duration);element.textContent=Math.round(to*(.2+.8*progress*(2-progress)))+(suffix||'');if(progress<1)requestAnimationFrame(step);else element.textContent=to+(suffix||'');}requestAnimationFrame(step);}

document.getElementById('againBtn').addEventListener('click',()=>{
  for(const key in answers)delete answers[key];sliderVal[3]=50;sliderVal[6]=50;lastResult=null;transitioning=false;
  results.hidden=true;intro.hidden=true;quiz.hidden=false;startQuiz();
});

/* ================= ORIGINAL PASSPORT DOWNLOAD ================= */
document.getElementById('dlBtn').addEventListener('click',()=>{
  if(!lastResult)return;
  const canvas=document.getElementById('planCanvas'),context=canvas.getContext('2d'),W=canvas.width,H=canvas.height;

  context.fillStyle='#f4efe4';context.fillRect(0,0,W,H);
  context.fillStyle='#0e1b2a';context.fillRect(0,0,W,112);
  context.fillStyle='#d7b56d';context.fillRect(0,0,W,8);
  context.strokeStyle='#c6a24b';context.lineWidth=2;context.strokeRect(22,22,W-44,H-44);

  context.fillStyle='#f4efe4';context.font='600 38px Georgia';context.fillText('MY CHINA JOURNEY PLAN',48,67);
  context.fillStyle='#d7b56d';context.font='600 14px Arial';context.fillText('CHINA UNFOLDED · 7 DAYS',50,92);

  context.fillStyle='#756849';context.font='600 13px Arial';context.fillText('TRAVELLER TYPE',48,143);
  context.fillStyle='#18283d';context.font='600 26px Georgia';context.fillText(TYPE[lastResult.tKey].name,48,174);

  lastResult.top3.forEach((item,index)=>{
    const y=205+index*112;
    context.fillStyle=index%2===0?'#ebe1cf':'#f0e8da';
    context.fillRect(48,y,864,94);
    context.fillStyle='#a57e2d';context.font='600 13px Arial';context.fillText(PLAN_DAYS[index],68,y+26);
    context.fillStyle='#17283d';context.font='600 28px Georgia';context.fillText(item.c,68,y+57);
    context.fillStyle='#5f5a50';context.font='16px Arial';context.fillText(CITY_PLAN[item.c],255,y+55);
    context.fillStyle='#3f7c58';context.font='600 13px Arial';context.textAlign='right';
    context.fillText(lastResult.matches[item.c]+'% MATCH',890,y+26);context.textAlign='left';
  });

  context.fillStyle='#756849';context.font='13px Arial';
  context.fillText('A personalised recommendation generated from your China Unfolded quiz.',48,565);

  const link=document.createElement('a');
  link.download='my-china-journey-plan.png';
  link.href=canvas.toDataURL('image/png');
  link.click();
});
