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
    message: "They took care of managing everything and they did it so well.. My child's first birthday was a very special event for us and they did it very well and Janvi is such a people friendly person that I am still connected with her and she gave that comfort feeling that they will manage and do things for us as we desire. Thanks for all the efforts guys. You really do a great job!"
  },
  {
    name: "Sarita Bhimsaria",
    message: "Tayaji And Fufaji Events is an excellent service with courteous and well-trained professionals. The friendly representatives provide immediate response and attentive service. The reasonably priced options, multiple payment options, and nice arrangements make it a top choice for any event. Their prompt service and attention to detail make them stand out in the industry."
  },
  {
    name: "anurag",
    message: "Tayaji And Fufaji Events is a top-notch service with well-trained professionals who deliver exceptional event management. The friendly representatives ensure a smooth and hassle-free experience. I highly recommend their services for any special occasion."
  },
  {
    name: "ISHAN JAJU",
    message: "Janvi and Manan from Tayaji and Fufaji went above and beyond seamlessly blending professionalism with a family touch to make our wedding an absolute fairy tale. Their attention to detail and personalized approach ensured an unforgettable experience that exceeded all expectations."
  },
  {
    name: "Dr chanchal",
    message: "Both janvi and Manan take all the possible efforts to make our special day memorable. They both put in all their hearts and souls to make the event a grand success. highly recommended"
  },
  {
    name: "samta kasat",
    message: "They work their hearts out to provide you with the best of the arrangements and make sure you love them.<"
  },
  {
    name: "SHRUTI SARDA",
    message: "They understand what you actually desire of and delivers what you have imagined.. would love to avail their services again.. thank you for such a wonderful experience."
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

      if (rating >= 4) {
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


