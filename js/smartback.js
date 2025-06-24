 document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    if (params.get("reopenmenu") === "true") {
      const toggle = document.getElementById("menu-toggle");
      if (toggle) toggle.checked = true;
      history.replaceState(null, "", window.location.pathname); // Clean up URL
    }
  });