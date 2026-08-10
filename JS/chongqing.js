(function(){
  "use strict";

  /* ---------- Navbar on scroll ---------- */
  const nav = document.getElementById('siteNav');
  function updateNav(){ if (nav) nav.classList.toggle('scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', updateNav, {passive:true}); updateNav();

  /* ---------- Dish data ---------- */
  const dishData = {
    'shrimp-dumplings': {
      title:'Shrimp Dumplings', sub:'Har Gow', img:'../Chongqing/Shrimp Dumplings.jpg',
      story:'A Cantonese dim sum classic made with a paper-thin, translucent wrapper wrapped around fresh shrimp. Getting the wrapper thin enough to see the shrimp through it without tearing is considered one of the trickiest skills in dim sum kitchens.',
      ingredients:['Fresh shrimp','Wheat starch & tapioca dough','Bamboo shoots','Sesame oil'],
      where:'Traditional dim sum teahouses across Chongqing\'s riverside districts, usually served fresh from bamboo steamers.',
      fact:'A well-made har gow should have <b>at least 7 pleats</b> along the wrapper — fewer, and a dim sum chef might consider it unfinished work.'
    },
    'char-siu-bao': {
      title:'Char Siu Bao', sub:'BBQ Pork Bun', img:'../Chongqing/Char Siu Bao.jpg',
      story:'A fluffy, pillowy steamed bun filled with sweet and savory barbecue pork. It\'s a teahouse staple found throughout southern China, equally popular as a breakfast bite or afternoon snack.',
      ingredients:['BBQ pork (char siu)','Yeasted bun dough','Oyster sauce','Honey glaze'],
      where:'Neighborhood bakeries and traditional dim sum houses across Chongqing\'s old town.',
      fact:'The name translates roughly to <b>"fork-roasted bun"</b> — a nod to the skewers traditionally used to roast the pork before it\'s diced into the filling.'
    },
    'grilled-fish': {
      title:'Grilled Fish', sub:'Kao Yu', img:'../Chongqing/Grilled Fish.jpg',
      story:'A whole fish grilled over charcoal, then simmered tableside in a fiery chili and Sichuan peppercorn broth. It\'s become a defining feature of Chongqing\'s riverside night-market food culture.',
      ingredients:['Whole river fish','Dried chilies','Sichuan peppercorns','Garlic & scallion','Savory chili broth'],
      where:'Riverside grilled fish restaurants lining the banks of the Jialing and Yangtze rivers.',
      fact:'Chongqing\'s grilled fish culture is said to have grown from <b>fishermen grilling their catch riverside</b> — today entire streets in the city are dedicated to the dish.'
    },
    'la-zi-ji': {
      title:'La Zi Ji', sub:'Spicy Diced Chicken', img:'../Chongqing/La Zi Ji.jpg',
      story:'Crispy fried chicken tossed with a mountain of dried chilies and Sichuan peppercorns — so generously spiced that finding the chicken among the peppers is half the fun.',
      ingredients:['Diced chicken, fried crisp','Dried chilies','Sichuan peppercorns','Garlic & scallion'],
      where:'Sichuan-style hotpot and stir-fry restaurants found throughout Chongqing.',
      fact:'The name literally means <b>"chili chicken"</b> — locals joke that eating it is "chili first, chicken second."'
    }
  };

  /* ---------- Hover plate 3D tilt ---------- */
  const plateCards = document.querySelectorAll('.plate-card');
  plateCards.forEach(card=>{
    const wrap = card.querySelector('.plate-wrap');

    card.addEventListener('mousemove', (e)=>{
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 8;   // tilt toward mouse, left-right
      const rotateX = -((y - cy) / cy) * 8;  // tilt toward mouse, up-down
      wrap.style.transform = `translateY(-10px) scale(1.04) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.classList.add('hover');
    });

    card.addEventListener('mouseleave', ()=>{
      wrap.style.transform = 'translateY(0) scale(1) rotateX(0) rotateY(0)';
      card.classList.remove('hover');
    });

    card.addEventListener('click', ()=> openDishPanel(card.dataset.dish));
  });

  /* ---------- Side panel open/close ---------- */
  const dishPanel = document.getElementById('dishPanel');
  const dishOverlay = document.getElementById('dishOverlay');
  const dishPanelClose = document.getElementById('dishPanelClose');

  function openDishPanel(key){
    const d = dishData[key];
    if (!d) return;
    document.getElementById('dishPanelImg').src = d.img;
    document.getElementById('dishPanelImg').alt = d.title;
    document.getElementById('dishPanelTitle').textContent = d.title;
    document.getElementById('dishPanelSub').textContent = d.sub;
    document.getElementById('dishPanelStory').textContent = d.story;
    document.getElementById('dishPanelWhere').textContent = d.where;
    document.getElementById('dishPanelFact').innerHTML = d.fact;

    const ingList = document.getElementById('dishPanelIngredients');
    ingList.innerHTML = '';
    d.ingredients.forEach(item=>{
      const li = document.createElement('li');
      li.textContent = item;
      ingList.appendChild(li);
    });

    dishPanel.classList.add('open');
    dishOverlay.classList.add('open');
  }

  function closeDishPanel(){
    dishPanel.classList.remove('open');
    dishOverlay.classList.remove('open');
  }

  dishPanelClose.addEventListener('click', closeDishPanel);
  dishOverlay.addEventListener('click', closeDishPanel);
  document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeDishPanel(); });

})();
