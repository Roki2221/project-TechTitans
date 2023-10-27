'use strict';

import axios from 'axios';
import { setPagination } from './pagination';

const refs = {
  cardList: document.querySelector('.exercise-card-list'),
  buttonList: document.querySelectorAll('.exercise-section-button'),
  inputContainer: document.querySelector('.exercise-input-container'),
  title: document.querySelector('.exercise-section-title'),
  pagination: document.getElementById('tui-pagination-container'),
};

let exerciseMarkup = '';
let exerciseCardFilterText = 'Body parts';
let limit = 12;

if (window.innerWidth < 768) {
  limit = 9;
}

refs.buttonList.forEach(button => {
  button.addEventListener('click', handleClick);
});

function handleClick(event) {
  refs.title.innerHTML = `Exercises<span class="exercise-section-title-span"></span>`;
  refs.cardList.innerHTML = '';
  refs.inputContainer.style.display = 'none';

  const activeButton = document.querySelector('.js-active-filter-button');
  const currentButton = event.currentTarget;

  activeButton.classList.remove('js-active-filter-button');

  currentButton.classList.add('js-active-filter-button');

  const query = currentButton.dataset.filter;

  markupExerciseCards(query);
}
export async function getExerciseCardsData(query, limit, page = 1) {
  try {
    const endpoint = `https://your-energy.b.goit.study/api/filters?filter=${query}&page=${page}&limit=${limit}`;
    const res = await axios.get(endpoint);
    const data = await res.data;
    return data;
  } catch (error) {
    console.log(error);
    document.querySelector('.exercise-error').style.display = 'block';
  }
}
export async function markupExerciseCards(query, page = 1) {
  refs.cardList.dataset.page = 'cards';
  refs.pagination.style.display = 'none';

  exerciseCardFilterText = query.split('%20').join(' ');
  exerciseMarkup = '';

  const { results: cards, totalPages } = await getExerciseCardsData(
    query,
    limit,
    page
  );

  setPagination(totalPages, page);

  if (!(totalPages === 1)) {
    refs.pagination.style.display = 'flex';
  }

  cards.forEach(card => {
    exerciseMarkup += `
        <li class="exercise-card-item" data-query="${card.name}" data-filter="${exerciseCardFilterText}">
            <img class="exercise-card-img" src="${card.imgURL}" alt="${card.name} card exercises" loading="lazy">
            <div class="exercise-card-text-container">
                <h2 class="exercise-card-title">${card.name}</h2>
                <p class="exercise-card-filter">${exerciseCardFilterText}</p>
            </div>
        </li>
        `;
  });

  refs.cardList.innerHTML = exerciseMarkup;
}
markupExerciseCards('Body%20parts');
