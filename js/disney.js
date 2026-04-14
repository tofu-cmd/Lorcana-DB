// Retrieve settings from localStorage or set defaults
const cardCount = parseInt(localStorage.getItem('cardCount')) || 10;
const cardsPerRow = parseInt(localStorage.getItem('cardsPerRow')) || 5;
const pageNumber = parseInt(localStorage.getItem('pageNumber')) || 1;

// Update grid layout
const container = document.getElementById('cardContainer');
container.style.gridTemplateColumns = `repeat(${cardsPerRow}, 1fr)`;
const searchContainer = document.getElementById('search-result');
searchContainer.style.gridTemplateColumns = `repeat(${cardsPerRow}, 1fr)`;


// Use settings in base API call
const base = `https://api.lorcana-api.com/cards/fetch?pagesize=${cardCount}&page=${pageNumber}`;

fetch(base)
  .then(res => res.json())
  .then(data => {
    const cards = data;
    container.innerHTML = '';

    for (let i = 0; i < cardCount && i < cards.length; i++) {
      let image = cards[i]['Image'];
      let name = cards[i]['Name'];
      let rarity = cards[i]['Rarity'];
      let franchise = cards[i]['Franchise'];
      let cardID = cards[i]['Unique_ID'];

      const card = document.createElement('div');
      card.classList.add('card');

      card.innerHTML = `
        <img src="${image}" alt="${name}" class="card-img">
        <div class="card-content">
          <h3>${name}</h3>
          <p>Rarity: ${rarity}</p>
          <p>Franchise: ${franchise}</p>
          <a href="${image}" target="_blank" class="card-link">View Card</a>
        </div>
      `;

      container.appendChild(card);
    }
  })
  .catch(err => {
    console.error('Fetch error:', err);
    container.innerHTML = '<p>Error loading cards.</p>';
  });

document.getElementById("searchBtn").addEventListener("click", function () {
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (!searchTerm) return;
  const encodedQuery = encodeURIComponent(`name~${searchTerm}`);
  const url = `https://api.lorcana-api.com/cards/fetch?search=${encodedQuery}&pagesize=${cardCount}&page=${pageNumber}`;

  fetch(url)
    .then(res => res.json())
    .then(cards => {
      const container = document.getElementById('search-result');
      container.innerHTML = '';
      if (!Array.isArray(cards) || cards.length === 0) {
        container.innerHTML = '<p>No cards found.</p>';
        return;
      }

      for (let i = 0; i < cardCount && i < cards.length; i++) {
        let image = cards[i]['Image'];
        let name = cards[i]['Name'];
        let rarity = cards[i]['Rarity'];
        let franchise = cards[i]['Franchise'];
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.innerHTML = `
          <img src="${image}" alt="${name}" class="card-img">
          <div class="card-content">
            <h3>${name}</h3>
            <p>Rarity: ${rarity}</p>
            <p>Franchise: ${franchise}</p>
            <a href="${image}" target="_blank" class="card-link">View Card</a>
          </div>
        `;

        container.appendChild(cardDiv);
      }
    })
    .catch(err => {
      console.error("Fetch error:", err);
      document.getElementById('cardContainer').innerHTML = '<p>Error loading cards.</p>';
    });
});
