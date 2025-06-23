const cards = document.querySelectorAll(".card");
    const carousel = document.getElementById("carousel");
    let current = 0;

    function updateCarousel() {
      cards.forEach((card, i) => {
        card.className = 'card';
        const total = cards.length;
        const diff = (i - current + total) % total;

        if (i === current) {
          card.classList.add('active');
        } else if (diff === total - 1) {
          card.classList.add('left');
        } else if (diff === 1) {
          card.classList.add('right');
        } else if (diff === total - 2) {
          card.classList.add('left-hide');
        } else if (diff === 2) {
          card.classList.add('right-hide');
        }
      });
    }

    function prevCard() {
      current = (current - 1 + cards.length) % cards.length;
      updateCarousel();
    }

    function nextCard() {
      current = (current + 1) % cards.length;
      updateCarousel();
    }

    // Swipe support
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

    updateCarousel();