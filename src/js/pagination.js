import Pagination from 'tui-pagination';

const paginationContainer = document.getElementById('tui-pagination-container');
const exerciseList = document.querySelector('.exercise-card-list');

const itemsPerPage = 5;
const totalItems = 15;
const totalPages = 3;
const pagination = new Pagination(paginationContainer, {
  totalItems: totalItems,
  itemsPerPage: itemsPerPage,
  visiblePages: totalPages,
});

pagination.on('beforeMove', function (event) {
  const currentPage = event.page;
  displayExercisePage(currentPage);
});

function displayExercisePage(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
}

pagination.reset(totalItems);

displayExercisePage(1);
