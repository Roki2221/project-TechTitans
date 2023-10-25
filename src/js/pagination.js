import Pagination from 'tui-pagination';

import { getExerciseCardsData } from './exercisesRightFirstPart';
import { markupExerciseCards } from './exercisesRightFirstPart';
import { exercisesCardGenerateFunc } from './exercisesRightSecondPart';

const paginationContainer = document.getElementById('tui-pagination-container');
const cardList = document.querySelector(".exercise-card-list");

let limit = 12;
if (window.innerWidth < 768) {
  limit = 9;
}

export function setPagination(totalPages = 1, page) {
  const pagination = new Pagination(paginationContainer, {
    totalItems: totalPages * limit,
    itemsPerPage: limit,
    visiblePages: 3,
    page: page,
  });


  if (!(cardList.dataset.page === "cards")) {
    pagination.on('afterMove', (event) => {
      const currentPage = event.page;
  
      const queryValue = cardList.dataset.query;
      const filterValue = cardList.dataset.filter;
  
      exercisesCardGenerateFunc(queryValue, filterValue, currentPage);
    });

    return;
  }

  pagination.on('afterMove', (event) => {
    const currentPage = event.page;

    const query = document.querySelector(".js-active-filter-button").dataset.filter;

    markupExerciseCards(query, currentPage);
  });
}