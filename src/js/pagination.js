import Pagination from 'tui-pagination';

const paginationContainer = document.getElementById('tui-pagination-container');
const exerciseList = document.querySelector('.exercise-card-list');

const itemsPerPage = 5; // Количество элементов на одной странице
const totalItems = 15; // Общее количество элементов (ваш список упражнений)
const totalPages = 3; // Количество страниц

const pagination = new Pagination(paginationContainer, {
    totalItems: totalItems,
    itemsPerPage: itemsPerPage,
    visiblePages: totalPages, // Отображение 3 страниц
});

pagination.on('beforeMove', function (event) {
    const currentPage = event.page;
    displayExercisePage(currentPage);
});

function displayExercisePage(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Отобразите элементы на текущей странице
    // Например, вставьте элементы из вашего списка упражнений на текущей странице
}

// Инициализация пагинации
pagination.reset(totalItems);

// Первоначальное отображение первой страницы
displayExercisePage(1);
