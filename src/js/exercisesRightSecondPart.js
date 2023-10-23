import axios from 'axios';
import { fetchParams } from './modal';
import { renderModalCard } from './modal';

const refs = {
  search: document.querySelector('.exercise-input-container'),
  cardList: document.querySelector('.exercise-card-list'),
  titleSpan: document.querySelector('.exercise-section-title-span'),
  startBtn: document.querySelector('.start-btn'),
  inputQuery: document.querySelector('.exercise-section-input'),
};
let queryValue;
let filterValue;
let idValue;
let limit = 10;
if (window.innerWidth < 768) {
  limit = 8;
}

refs.cardList.addEventListener('click', handleClickCard);
refs.search.addEventListener('submit', searchExercises);
// console.log(refs.search);

async function handleClickCard(event) {
  if (!event.target.classList.contains('exercise-card-item')) {
    return;
  }
  const currentCard = event.target;
  queryValue = currentCard.dataset.query;
  filterValue = currentCard.dataset.filter;

  try {
    const data = await fetchCards(filterValue, queryValue);

    refs.search.style.display = 'block';

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

async function searchExercises(e) {
  e.preventDefault();
  try {
    const keyword = e.currentTarget.elements.filter.value;

    const data = await fetchSearch(keyword);
    if (data.results.length === 0) {
      throw new Error();
    }
    refs.cardList.innerHTML = createMarkupCards(data.results);
  } catch (error) {
    console.log('Nothing was found for your request');
  }
}

async function fetchCards(part, category) {
  try {
    // console.log(part.toLowerCase());
    // console.log(category);
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?${part.toLowerCase()}=${category}&page=1&limit=${limit}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchSearch(inputWord) {
  try {
    if (inputWord.trim() === '') {
      return;
    }
    // console.log(filterValue.toLowerCase());
    // console.log(queryValue);

    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?${filterValue.toLowerCase()}=${queryValue}&keyword=${inputWord}&page=1&limit=${limit}`
    );
    return response.data;
  } catch (error) {}
}

function createMarkupCards(arr) {
  return arr
    .map(
      ({ burnedCalories, name, target, rating, bodyPart, time, _id }) => `
      <div class="card" >
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
          <button class="start-btn" data-id="${_id}" type="submit">
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
