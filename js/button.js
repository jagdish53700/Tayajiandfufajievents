document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prevButton");
  const nextBtn = document.getElementById("nextButton");

  let current = 0;        // for desktop carousel
  let mobileIndex = 0;    // for mobile scroll tracking

  function isMobileView() {
    return window.innerWidth <= 768;
  }

  function updateCarousel() {
    if (!isMobileView()) {
      cards.forEach((card, i) => {
        card.className = "card";
        const total = cards.length;
        const diff = (i - current + total) % total;

        if (i === current) {
          card.classList.add("active");
        } else if (diff === total - 1) {
          card.classList.add("left");
        } else if (diff === 1) {
          card.classList.add("right");
        } else if (diff === total - 2) {
          card.classList.add("left-hide");
        } else if (diff === 2) {
          card.classList.add("right-hide");
        }
      });
    }
  }

  function scrollToMobileCard(index) {
    const targetCard = cards[index];
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }

  function prevCard() {
    if (isMobileView()) {
      mobileIndex = (mobileIndex - 1 + cards.length) % cards.length;
      scrollToMobileCard(mobileIndex);
    } else {
      current = (current - 1 + cards.length) % cards.length;
      updateCarousel();
    }
  }

  function nextCard() {
    if (isMobileView()) {
      mobileIndex = (mobileIndex + 1) % cards.length;
      scrollToMobileCard(mobileIndex);
    } else {
      current = (current + 1) % cards.length;
      updateCarousel();
    }
  }

  prevBtn.addEventListener("click", prevCard);
  nextBtn.addEventListener("click", nextCard);

  let startX = 0;
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;
    if (diff < -50) nextCard();
    else if (diff > 50) prevCard();
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        mobileIndex = Array.from(cards).indexOf(entry.target);
      }
    });
  }, { threshold: 0.6 });

  cards.forEach((card) => observer.observe(card));

  updateCarousel();
});

