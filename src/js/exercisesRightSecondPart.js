import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchParams } from './modal';
import { renderModalCard } from './modal';
import { setPagination } from './pagination';
import sprite from '../public/icon.svg';
import spriteRunningMan from '../public/favicon.svg';

const refs = {
  search: document.querySelector('.exercise-input-container'),
  cardList: document.querySelector('.exercise-card-list'),
  startBtn: document.querySelector('.start-btn'),
  inputQuery: document.querySelector('.exercise-section-input'),
  title: document.querySelector('.exercise-section-title'),
  titleSpan: document.querySelector('.exercise-section-title-span'),
  pagination: document.getElementById("tui-pagination-container"),
};

let queryValue;
let filterValue;
let idValue;
let limitCards = 10;
if (window.innerWidth < 768) {
  limitCards = 8;
}

refs.cardList.addEventListener('click', handleClickCard);
refs.search.addEventListener('submit', searchExercises);

async function handleClickCard(event) {
  if (!event.target.classList.contains('exercise-card-item')) {
    return;
  }
  const currentCard = event.target;

  queryValue = currentCard.dataset.query;
  filterValue = currentCard.dataset.filter;

  refs.cardList.dataset.query = queryValue;
  refs.cardList.dataset.filter = filterValue;

  try {
    exercisesCardGenerateFunc(queryValue, filterValue);
  } catch (error) {
    console.log(error);
  }
}

export async function exercisesCardGenerateFunc(queryValue, filterValue, page = 1) {
  refs.pagination.style.display = "none";
  refs.cardList.dataset.page = "exercises";

  if (filterValue === 'Body parts') {
    filterValue = 'bodypart';
  }
  const data = await fetchCards(filterValue, queryValue, page);
  const { totalPages } = data;

  setPagination(totalPages, page);

  if (!(totalPages === 1)) {
    refs.pagination.style.display = "flex";
  }

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
}

async function searchExercises(e) {
  e.preventDefault();
  try {
    const keyword = e.currentTarget.elements.filter.value;
    if (filterValue === 'Body parts') {
      filterValue = 'bodypart';
    }
    const data = await fetchSearch(keyword);
    refs.pagination.style.display = "none";
    refs.inputQuery.value = '';
    if (data.results.length === 0) {
      throw new Error();
    }
    refs.cardList.innerHTML = createMarkupCards(data.results);
  } catch (error) {
    showErrorNotification();
    console.log(error);
  }
}

async function fetchCards(part, category, page) {
  try {
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?${part.toLowerCase()}=${category}&page=${page}&limit=${limitCards}`
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
    const response = await axios.get(
      `https://your-energy.b.goit.study/api/exercises?${filterValue.toLowerCase()}=${queryValue}&keyword=${inputWord}&page=1&limit=${limitCards}`
    );
    return response.data;
  } catch (error) {}
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
function showErrorNotification() {
  Notiflix.Notify.failure('Nothing was found for your request', {
    position: 'right-top',
    timeout: 3000,
    fontSize: '18px',
    borderRadius: '15px',
  });
}
