
// --------------------
// SETTINGS
// --------------------
const cardCount =
  parseInt(localStorage.getItem('cardCount')) || 30;

const cardsPerRow =
  parseInt(localStorage.getItem('cardsPerRow')) || 5;

let currentPage =
  parseInt(localStorage.getItem('pageNumber')) || 1;

let totalPages = 1;


// --------------------
// DOM ELEMENTS
// --------------------
const container = document.getElementById('cardContainer');
const searchContainer = document.getElementById('search-result');
const searchTitle = document.getElementById('searchTitle');
const paginationContainer = document.getElementById('pagination');

container.style.gridTemplateColumns = `repeat(${cardsPerRow}, 1fr)`;
searchContainer.style.gridTemplateColumns = `repeat(${cardsPerRow}, 1fr)`;


// --------------------
// CARD COMPONENT
// --------------------
function createCard(cardData) {
  const card = document.createElement('div');
  card.classList.add('card');

  card.innerHTML = `
    <img src="${cardData.Image}" alt="${cardData.Name}" class="card-img">
    <div class="card-content">
      <h3>${cardData.Name}</h3>
      <p>Rarity: ${cardData.Rarity}</p>
      <p>Franchise: ${cardData.Franchise}</p>
      <a href="${cardData.Image}" target="_blank">View Card</a>
    </div>
  `;

  return card;
}


// --------------------
// LOAD CARDS
// --------------------
async function loadCards(page) {
  const url = `https://api.lorcana-api.com/cards/all?pagesize=${cardCount}&page=${page}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const cards = await res.json();

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardCount && i < cards.length; i++) {
      fragment.appendChild(createCard(cards[i]));
    }

    container.appendChild(fragment);

    // update state
    currentPage = page;
    localStorage.setItem('pageNumber', page);

    // REALISTIC TOTAL PAGE DETECTION
    if (cards.length < cardCount) {
      totalPages = page;
    } else {
      totalPages = Math.max(totalPages, page + 1);
    }

    renderPagination();

  } catch (err) {
    console.error('Fetch error:', err);
    container.innerHTML = '<p>Error loading cards.</p>';
  }
}


// --------------------
// PAGINATION (1 2 3 ... LAST)
// --------------------
function renderPagination() {
  paginationContainer.innerHTML = '';

  if (totalPages < 1) totalPages = currentPage;

  const addButton = (page) => {
    const btn = document.createElement('button');
    btn.textContent = page;

    if (page === currentPage) {
      btn.disabled = true;
      btn.style.fontWeight = "bold";
    }

    btn.addEventListener('click', () => {
      loadCards(page);
    });

    paginationContainer.appendChild(btn);
  };

  const addDots = () => {
    const span = document.createElement('span');
    span.textContent = '...';
    span.style.padding = '0 8px';
    paginationContainer.appendChild(span);
  };

  // FIRST PAGE
  addButton(1);

  // LEFT DOTS
  if (currentPage > 3) addDots();

  // MIDDLE PAGES
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 1 && i < totalPages) {
      addButton(i);
    }
  }

  // RIGHT DOTS
  if (currentPage < totalPages - 2) addDots();

  // LAST PAGE
  if (totalPages > 1) addButton(totalPages);
}


// --------------------
// INITIAL LOAD
// --------------------
loadCards(currentPage);


// --------------------
// SEARCH
// --------------------
document.getElementById("searchBtn").addEventListener("click", async () => {
  const searchTerm = document.getElementById("searchInput").value.trim();
  if (!searchTerm) return;

  searchTitle.textContent = `Search results for: "${searchTerm}"`;

  const encodedQuery = encodeURIComponent(`name~${searchTerm}`);
  const url = `https://api.lorcana-api.com/cards/fetch?search=${encodedQuery}&pagesize=${cardCount}&page=${currentPage}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);

    const cards = await res.json();

    searchContainer.innerHTML = '';

    if (!Array.isArray(cards) || cards.length === 0) {
      searchContainer.innerHTML = `<p>No results for "${searchTerm}"</p>`;
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < cardCount && i < cards.length; i++) {
      fragment.appendChild(createCard(cards[i]));
    }

    searchContainer.appendChild(fragment);

  } catch (err) {
    console.error("Fetch error:", err);
    searchContainer.innerHTML = '<p>Error loading search results.</p>';
  }
});