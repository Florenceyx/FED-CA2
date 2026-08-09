function initializeNavigationBar() {
  const navToggle = document.querySelector(".navtoggle");
  const navLinks = document.querySelector(".navlinks");

  if (!navToggle || !navLinks) {
    return;
  }

  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("navlinks-open");
    navToggle.setAttribute(
      "aria-expanded",
      String(navLinks.classList.contains("navlinks-open"))
    );
  });

  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  const cityPages = new Set([
    "Beijing.html",
    "Chengdu.html",
    "Chongqing.html",
    "Guilin.html",
    "Shanghai.html",
    "Shenzhen.html",
    "Xi'an.html",
    "Yunnan.html",
    "Zhangjiajie.html"
  ]);

  document.body.classList.toggle("shared-nav-on-image", cityPages.has(currentPage));

  const destinationLink = document.querySelector(".main-navbar .destination-link");
  if (destinationLink) {
    destinationLink.classList.toggle("active", cityPages.has(currentPage));
  }

  document.querySelectorAll(".main-navbar [data-page]").forEach(function (link) {
    link.classList.toggle("active", link.dataset.page === currentPage);
  });
}

async function loadNavigationBar() {
  const placeholder = document.getElementById("navigation-placeholder");

  if (!placeholder) {
    return;
  }

  try {
    const response = await fetch("./navigationBar.html", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Navigation could not load: ${response.status}`);
    }

    placeholder.innerHTML = await response.text();
    initializeNavigationBar();
  } catch (error) {
    console.error(error);
  }
}

loadNavigationBar();
