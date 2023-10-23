import Pagination from 'tui-pagination';


const paginationContainer = document.getElementById('tui-pagination-container');
const exerciseList = document.querySelector('.exercise-card-list');

const itemsPerPage = 5;
const totalItems = 15;
const totalPages = 3;

const pagination = new Pagination(paginationContainer, {
  firstItemClassName: 'first-child',
  lastItemClassName: 'last-child',
  totalItems: totalItems,
  itemsPerPage: itemsPerPage,
  visiblePages: totalPages,
});

const sectionButtons = document.querySelectorAll('.exercise-section-button');
const activeClass = 'js-active-filter-button';

sectionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Удаляем класс активной кнопки у всех кнопок
    sectionButtons.forEach((btn) => btn.classList.remove(activeClass));
    // Добавляем класс активной кнопке, которую нажали
    button.classList.add(activeClass);

    // Здесь можно выполнить действия, связанные с выбранным разделом
    const selectedSection = button.dataset.filter;

    // Пример: показать или скрыть контент, связанный с разделами
    if (selectedSection === 'Body%20parts') {
      // Показать контент для раздела "Body parts"
    } else if (selectedSection === 'Muscles') {
      // Показать контент для раздела "Muscles"
    } else if (selectedSection === 'Equipment') {
      // Показать контент для раздела "Equipment"
    }
  });
});