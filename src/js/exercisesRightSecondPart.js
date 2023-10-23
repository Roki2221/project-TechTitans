import axios from 'axios';
import { fetchParams } from './modal';
import { renderModalCard } from './modal';
import sprite from '../public/icon.svg';
import spriteRunningMan from '../public/favicon.svg';

const refs = {
  search: document.querySelector('.exercise-input-container'),
  cardList: document.querySelector('.exercise-card-list'),
  startBtn: document.querySelector('.start-btn'),
  title: document.querySelector('.exercise-section-title'),
  titleSpan: document.querySelector('.exercise-section-title-span'),
};

let idValue;
let limit = 10;
if (window.innerWidth < 768) {
  limit = 8;
}

refs.cardList.addEventListener('click', handleClickCard);

async function handleClickCard(event) {
  if (!event.target.classList.contains('exercise-card-item')) {
    return;
  }

  const currentCard = event.target;
  const queryValue = currentCard.dataset.query;
  let filterValue = currentCard.dataset.filter;

  if (filterValue === 'Body parts') {
    filterValue = 'bodypart';
  }

  try {
    const data = await fetchCards(filterValue, queryValue);

    refs.search.style.display = 'block';
    refs.title.innerHTML = `Exercises /<span class="exercise-section-title-span">${queryValue}</span>`;

    refs.cardList.innerHTML = createMarkupCards(data.results);

    const startButtonList = document.querySelectorAll('.start-btn');
    startButtonList.forEach(button => {
      button.addEventListener('click', event => {
        idValue = button.dataset.id;
        fetchParams(idValue)
          .then(renderModalCard)
          .catch(error => console.log);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

async function fetchCards(part, category) {
  try {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?${part.toLowerCase()}=${category}&page=1&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

function createMarkupCards(arr) {
  return arr
    .map(
      ({ burnedCalories, name, target, rating, bodyPart, time, _id }) => `
      <li class="exercise-card" >
        <div class="first-part">
          <div class="badge">
            <div class="badge-text">WORKOUT</div>
          </div>
          <div class="exercise-card-rating">
            <p class="rating-text">${rating.toFixed(1)}</p>
            <svg class="icon-star" width="18" height="18">
              <use href="${sprite}#icon-star"></use>
            </svg>
          </div>
          <button class="start-btn" data-id="${_id}" type="submit">
            Start
            <svg class="start-btn-icon" width="16" height="16">
              <use href="${sprite}#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div class="second-part">
          <svg class="run-man-icon" width="24" height="24">
            <use href="${spriteRunningMan}#icon-running-stick-figure-in-cyrcle-black"></use>
          </svg>
          <p class="exercise-name">${name}</p>
        </div>
        <div class="third-part">
          <p class="text-card">Burned calories: <span class="value-card">${burnedCalories} / ${time}</span></p>
          <p class="text-card">Body part: <span class="value-card">${bodyPart}</span></p>
          <p class="text-card">Target: <span class="value-card">${target}</span></p>
        </div>
      </li>
    `
    )
    .join('');
}
