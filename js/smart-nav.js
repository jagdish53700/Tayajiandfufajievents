document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("from");
  const scrollTarget = params.get("scrollto");
  const shouldOpenMenu = params.get("openmenu") === "true";

  // === Smart Back Button Handling (on getintouch.html only) ===
  const backButton = document.getElementById("smart-back");
  if (backButton) {
    let backURL = "../index.html"; // default

    if (source === "contact") {
      backURL = "../pages/contact.html";
    } else if (source === "index") {
      backURL = "../index.html";
    }

    if (scrollTarget) {
      backURL += (backURL.includes("?") ? "&" : "?") + "scrollto=" + scrollTarget;
    }

    if (shouldOpenMenu) {
      backURL += (backURL.includes("?") ? "&" : "?") + "openmenu=true";
    }

    backButton.setAttribute("href", backURL);
  }

  // === Scroll to element with specific ID ===
  if (scrollTarget) {
    setTimeout(() => {
      const targetElement = document.getElementById(scrollTarget);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 300); // Allow DOM to fully load
  }

  // === Reopen mobile menu if flagged ===
  if (shouldOpenMenu) {
    const menuToggle = document.getElementById("menu-toggle");
    if (menuToggle) {
      menuToggle.checked = true;
    }
  }

  // === Clean up URL after handling ===
  if (scrollTarget || shouldOpenMenu) {
    history.replaceState(null, "", window.location.pathname);
  }
});
