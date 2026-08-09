document.addEventListener('DOMContentLoaded', function () {

  var hero = document.getElementById('hero');
  var mist = document.getElementById('heroMist');

  function updateMist() {
    var heroHeight = hero.offsetHeight;
    var scrolled = window.scrollY;
    var progress = Math.min(scrolled / (heroHeight * 0.7), 1);
    mist.style.opacity = 1 - progress;
    mist.style.transform = 'translateY(' + (-progress * 40) + 'px) scale(' + (1 + progress * 0.08) + ')';
  }
  updateMist();
  window.addEventListener('scroll', updateMist, { passive: true });
  window.addEventListener('resize', updateMist);

  var foodWheelEl = document.getElementById('foodWheel');
  var foodModalEl = document.getElementById('foodModal');
  var foodModal = new bootstrap.Modal(foodModalEl);
  var foodModalImg = document.getElementById('foodModalImg');
  var foodModalTitle = document.getElementById('foodModalTitle');
  var foodModalDesc = document.getElementById('foodModalDesc');

  foodWheelEl.addEventListener('click', function (e) {
    var item = e.target.closest('.food-item');
    if (!item) return;
    foodModalImg.style.backgroundImage = "url('" + item.getAttribute('data-img') + "')";
    foodModalTitle.textContent = item.getAttribute('data-title');
    foodModalDesc.textContent = item.getAttribute('data-desc');
    foodModal.show();
  });

  var placeModalEl = document.getElementById('placeModal');
  placeModalEl.addEventListener('show.bs.modal', function (e) {
    var btn = e.relatedTarget;
    if (!btn) return;
    document.getElementById('placeModalTitle').textContent = btn.getAttribute('data-title');
    document.getElementById('placeModalText').textContent = btn.getAttribute('data-text');
  });

  var wheel = foodWheelEl;
  var wheelItems = Array.prototype.slice.call(wheel.children);  
  var itemCount = wheelItems.length;
  var angleStep = 360 / itemCount;
  var rotationOffset = 0;
  var spinning = true;
  var lastTime = null;
  var speed = 0.012;

  function getRadius() {
    return wheel.offsetWidth / 2 - 75;
  }

  function layoutWheel() {
    var radius = getRadius();
    wheelItems.forEach(function (item, i) {
      var angle = (i * angleStep + rotationOffset) * Math.PI / 180;
      var x = Math.cos(angle) * radius;
      var y = Math.sin(angle) * radius;
      item.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
  }

  function tick(timestamp) {
    if (lastTime === null) lastTime = timestamp;
    var delta = timestamp - lastTime;
    lastTime = timestamp;
    if (spinning) {
      rotationOffset += speed * delta;
      layoutWheel();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  wheel.addEventListener('mouseenter', function () { spinning = false; });
  wheel.addEventListener('mouseleave', function () { spinning = true; });

  window.addEventListener('resize', layoutWheel);

  var timelineItems = document.querySelectorAll('.timeline-item');
  var imageCols = document.querySelectorAll('.itinerary-img-col');

  function setActiveStep(index) {
    timelineItems.forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-index') === String(index));
    });
    imageCols.forEach(function (el) {
      el.classList.toggle('active', el.getAttribute('data-index') === String(index));
    });
  }

  var itineraryModalEl = document.getElementById('itineraryModal');
  var itineraryModal = new bootstrap.Modal(itineraryModalEl);
  var itineraryModalImg = document.getElementById('itineraryModalImg');
  var itineraryModalTime = document.getElementById('itineraryModalTime');
  var itineraryModalTitle = document.getElementById('itineraryModalTitle');
  var itineraryModalDesc = document.getElementById('itineraryModalDesc');

timelineItems.forEach(function (item) {
    item.addEventListener('click', function () {
      setActiveStep(item.getAttribute('data-index'));
    });
  });

  imageCols.forEach(function (col) {
    col.addEventListener('click', function () {
      setActiveStep(col.getAttribute('data-index'));
      itineraryModalImg.style.backgroundImage = "url('" + col.getAttribute('data-img') + "')";
      itineraryModalTime.textContent = col.getAttribute('data-time');
      itineraryModalTitle.textContent = col.getAttribute('data-title');
      itineraryModalDesc.textContent = col.getAttribute('data-desc');
      itineraryModal.show();
    });
  });

  var itinerarySection = document.getElementById('itinerary');
  var stepCount = timelineItems.length;

  function updateItineraryProgress() {
    var rect = itinerarySection.getBoundingClientRect();
    var viewportH = window.innerHeight;
    var total = rect.height + viewportH;
    var scrolledInto = viewportH - rect.top;
    var progress = Math.min(Math.max(scrolledInto / total, 0), 0.999);
    var idx = Math.floor(progress * stepCount);
    if (idx < 0) idx = 0;
    if (idx > stepCount - 1) idx = stepCount - 1;
    setActiveStep(idx);
  }

  window.addEventListener('scroll', updateItineraryProgress, { passive: true });
  window.addEventListener('resize', updateItineraryProgress);
  updateItineraryProgress();
});