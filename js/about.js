document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector(".end-section");
    const paragraphs = document.querySelectorAll(".end p");

    // Store original text in data attribute
    paragraphs.forEach(p => {
      p.dataset.fullText = p.textContent;
    });

    function isInViewport(elem) {
      const rect = elem.getBoundingClientRect();
      return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    function resetParagraphs() {
      paragraphs.forEach(p => {
        p.classList.remove("show");
        p.style.display = "none";
        p.style.animation = "none";     // reset animation
        p.textContent = p.dataset.fullText; // restore original text
        p.offsetHeight;                 // force reflow
        p.style.animation = "";         // allow retrigger
      });
    }

    function animateParagraphs() {
      if (!isInViewport(section)) {
        resetParagraphs();
        return;
      }

      let i = 0;
      function showNext() {
        if (i >= paragraphs.length) return;
        const p = paragraphs[i];
        p.style.display = "block";
        p.classList.add("show");
        i++;
        setTimeout(showNext, 600); // spacing between each paragraph
      }

      showNext();
    }

    window.addEventListener("scroll", animateParagraphs);
    window.addEventListener("load", animateParagraphs);
  });
