// Load existing settings
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('cardCount').value = localStorage.getItem('cardCount') || 10;
  document.getElementById('cardsPerRow').value = localStorage.getItem('cardsPerRow') || 5;
  document.getElementById('pageNumber').value = localStorage.getItem('pageNumber') || 1;
});

document.getElementById('settingsForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const cardCount = parseInt(document.getElementById('cardCount').value) || 10;
  let cardsPerRow = parseInt(document.getElementById('cardsPerRow').value) || 5;
  if (cardsPerRow > 7) {
  cardsPerRow = 7;
  document.getElementById('cardsPerRow').value = 7; // update input display to reflect max
}
  localStorage.setItem('cardCount', cardCount);
  localStorage.setItem('cardsPerRow', cardsPerRow);

  alert('Settings saved!');
  window.location.href = "../html/home.html"; // Redirect back to main
});
