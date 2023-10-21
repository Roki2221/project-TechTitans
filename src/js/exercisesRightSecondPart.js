import axios from 'axios';

const refs = {
  cards: document.querySelector('.exercises-cards'),
  search: document.querySelector('.exercise-input-container'),
  cardName: document.querySelector('.exercise-card-list'),
};
refs.cardName.addEventListener('click', handleClickCard);
// console.log(refs.cardName);

function handleClickCard(event) {
  if (event.target.classList.contains('exercise-card-item')) {
    const currentCard = event.target;
    console.log(currentCard);
  }
}

fetchCards('waist').then(data => {
  console.log(data.results);
  // console.log(refs.cardName);
  refs.cards.insertAdjacentHTML('beforeend', createMarkupCards(data.results));
});

async function fetchCards(category) {
  try {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?bodypart=${category}&page=1&limit=10`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

function createMarkupCards(arr) {
  return arr
    .map(
      ({ burnedCalories, name, target, rating, bodyPart, time }) => `
      <div class="card">
        <div class="first-part">
          <div class="badge">
            <div class="badge-text">WORKOUT</div>
          </div>
          <div class="rating">
            <p class="rating-text">${rating}</p>
            <svg class="icon-star" width="18" height="18">
              <use href="/public/icon.svg#icon-star"></use>
            </svg>
          </div>
          <button class="start-btn" type="submit">
            Start
            <svg class="start-btn-icon" width="16" height="16">
              <use href="/public/icon.svg#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div class="second-part">
          <svg class="run-man-icon" width="24" height="24">
            <use href="/public/icon.svg#icon-running-stick-figure-in-cyrcle"></use>
          </svg>
          <p class="exercise-name">${name}</p>
        </div>
        <div class="third-part">
          <p class="text-card">Burned calories: <span class="value-card">${burnedCalories} / ${time}</span></p>
          <p class="text-card">Body part: <span class="value-card">${bodyPart}</span></p>
          <p class="text-card">Target: <span class="value-card">${target}</span></p>
        </div>
      </div>
    `
    )
    .join('');
}
