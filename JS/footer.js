/* =========================
   FOOTER SHARE BUTTONS
========================= */

function initializeFooter() {
const pageURL = window.location.href;
const pageTitle = document.title;


const whatsappShare = document.getElementById("shareWhatsApp");

if (whatsappShare) {
  whatsappShare.href =
    "https://wa.me/?text=" +
    encodeURIComponent(
      "Explore this China Unfolded page:\n" + pageTitle + "\n" + pageURL
    );
}

const emailShare = document.getElementById("shareEmail");

if (emailShare) {
  emailShare.href =
    "mailto:?subject=" +
    encodeURIComponent(pageTitle) +
    "&body=" +
    encodeURIComponent(
      "I would like to share this page with you:\n\n" + pageURL
    );
}

const instagramShare = document.getElementById("shareInstagram");

if (instagramShare) {
  instagramShare.addEventListener("click", async function (event) {
    event.preventDefault();

    const pageURL = window.location.href;

  
    try {
      await navigator.clipboard.writeText(pageURL);
    } catch (error) {
      console.log("Unable to copy the page link.");
    }

    
    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      
      window.location.href =
        "intent://instagram.com/#Intent;" +
        "scheme=https;" +
        "package=com.instagram.android;" +
        "S.browser_fallback_url=https%3A%2F%2Fwww.instagram.com%2F;" +
        "end";
    } else if (isIOS) {
      
      window.location.href = "instagram://app";

      
      setTimeout(function () {
        window.location.href = "https://www.instagram.com/";
      }, 1500);
    } else {
      
      window.open(
        "https://www.instagram.com/",
        "_blank",
        "noopener,noreferrer"
      );
    }
  });
}
}

async function loadFooter() {
  const placeholder = document.getElementById("footer-placeholder");

  if (!placeholder) {
    return;
  }

  try {
    const response = await fetch("./footer.html", { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Footer could not load: ${response.status}`);
    }

    placeholder.innerHTML = await response.text();
    initializeFooter();
  } catch (error) {
    console.error(error);
  }
}

loadFooter();
