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
    const response = await fetch("./navigationBar.html");

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
