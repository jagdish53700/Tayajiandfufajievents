document.addEventListener("DOMContentLoaded", () => {
  const end = document.querySelector('.end');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate'); // 🔁 animate again on scroll up/down
      }
    });
  }, { threshold: 0.1 });

  if (end) observer.observe(end);
});



