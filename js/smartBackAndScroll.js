function goBack() {
  // Save the current hash
  const hash = window.location.hash || "";
  // Redirect to contact.html and include the hash
  window.location.href = "../pages/contact.html" + hash;
}

window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;

  if (hash === "#feedback") {
    const feedbackBtn = document.querySelector(".feedback-btn");
    if (feedbackBtn) {
      setTimeout(() => {
        feedbackBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }

  if (hash === "#review") {
    const reviewBtn = document.querySelector(".review-btn");
    if (reviewBtn) {
      setTimeout(() => {
        reviewBtn.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }
});
