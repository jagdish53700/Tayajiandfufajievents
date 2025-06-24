// smart-back.js

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("from");
  const shouldOpenMenu = params.get("openmenu") === "true";

  // Default back destination
  let backURL = "../index.html";

  if (source === "contact") {
    backURL = "../pages/contact.html";
  } else if (source === "index") {
    backURL = "../index.html";
  }

  // Preserve instruction to reopen mobile menu
  if (shouldOpenMenu) {
    backURL += (backURL.includes("?") ? "&" : "?") + "reopenmenu=true";
  }

  // Set back button URL
  const backButton = document.getElementById("smart-back");
  if (backButton) {
    backButton.setAttribute("href", backURL);
  }
});
