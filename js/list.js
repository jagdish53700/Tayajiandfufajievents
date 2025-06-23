const listItems = document.querySelectorAll('.animated-list li');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // 🔁 Remove class when out of view
    }
  });
}, {
  threshold: 0.1
});

listItems.forEach(item => observer.observe(item));

