import Pagination from 'tui-pagination';

import { getExerciseCardsData } from './exercisesRightFirstPart';
import { markupExerciseCards } from './exercisesRightFirstPart';

const paginationContainer = document.getElementById('tui-pagination-container');


let itemsPerPage = 12;
if (window.innerWidth < 768) {
  itemsPerPage = 9;
}
let totalItems = 146;
const totalPages = Math.ceil(totalItems / itemsPerPage);


const pagination = new Pagination(paginationContainer, {
  totalItems: totalItems,
  itemsPerPage: itemsPerPage,
  visiblePages: 3,
  firstItemClassName: 'first-child',
  lastItemClassName: 'last-child',
});


pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  const selectedSection = document.querySelector('.js-active-filter-button').dataset.filter;
  getExerciseCardsData(selectedSection, currentPage, itemsPerPage)
    .then(() => {
      markupExerciseCards(selectedSection);
    });
});


const sectionButtons = document.querySelectorAll('.exercise-section-button');
const activeClass = 'js-active-filter-button';

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    sectionButtons.forEach((btn) => btn.classList.remove(activeClass));
    button.classList.add(activeClass);
    const selectedSection = button.dataset.filter;
    getExerciseCardsData(selectedSection, 1, itemsPerPage);
  });
});
