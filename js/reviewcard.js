const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT-INHYuXekCmgd-oHiPSMH7kDXOLUwl5fx9KVVxS1biaKkVVyOwZ9IxNieUtsts6AGoTZWmx0FMpWP/pub?output=csv";
const container = document.getElementById("review-container");

// 1. Show custom reviews FIRST
const customReviews = [
  {
    name: "vishvendrasingh Thakur",
    message: "They are well trained professionals & with their help you can enjoy your events or family functions while they work hard to make your events successful & memorable."
  },
  {
    name: "bhagyashree bohra",
    message: "They took care of managing everything and they did it so well..."
  },
  {
    name: "Sarita Bhimsaria",
    message: "Tayaji And Fufaji Events is an excellent service..."
  },
  {
    name: "anurag",
    message: "Tayaji And Fufaji Events is a top-notch service..."
  },
  {
    name: "ISHAN JAJU",
    message: "Janvi and Manan from Tayaji and Fufaji went above and beyond..."
  },
  {
    name: "Dr chanchal",
    message: "Both Janvi and Manan take all the possible efforts..."
  },
  {
    name: "samta kasat",
    message: "They work their hearts out to provide the best arrangements..."
  },
  {
    name: "SHRUTI SARDA",
    message: "They understand what you actually desire and deliver it..."
  }
];

customReviews.forEach(review => {
  addReviewCard(review.name, "⭐⭐⭐⭐⭐", review.message);
});

// 2. THEN fetch from Google Sheet
fetch(SHEET_CSV_URL)
  .then(response => response.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1); // skip header

    let validCount = 0;

    rows.forEach(row => {
      const cols = row.split(",");

      // Ensure row has all required fields
      if (cols.length < 4) return;

      const name = cols[1]?.trim();
      const rating = parseFloat(cols[2]);
      const message = cols[3]?.trim();

      // Skip if any required value is missing
      if (!name || !message || isNaN(rating)) return;

      if (rating >= 3) {
        const stars = "⭐".repeat(Math.round(rating));
        addReviewCard(name, stars, message);
        validCount++;
      }
    });

    if (validCount === 0) {
      console.log("No 3-star+ reviews in Google Sheet");
    }
  })
  .catch(err => {
    console.error("Failed to load reviews:", err);
    // Don't clear existing content — just show message below heading
    const error = document.createElement("p");
    error.textContent = "Failed to load reviews more reviews.";
    error.style.textAlign = "center";
    error.style.color = "crimson";
    container.appendChild(error);
  });

// Helper function
function addReviewCard(name, stars, message) {
  const card = document.createElement("div");
  card.className = "review-card";
  card.innerHTML = `
    <h3>${name}</h3>
    <div class="rating">${stars}</div>
    <p>${message}</p>
  `;
  container.appendChild(card);
}


