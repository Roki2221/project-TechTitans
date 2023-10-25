import clickOnBtnStart from './modal-favorites';
import sprite from '../public/icon.svg';
import spriteRunningMan from '../public/favicon.svg';
const quoteURL = 'https://your-energy.b.goit.study/api/quote';

const refs = {
  quote: document.querySelector('.quote_text'),
  authorTitle: document.querySelector('.author_name'),
  favoriteEx: document.querySelector('.favorite_exercises'),
  defaultText: document.querySelector('.default_text'),
};
let favCatd;
// ============================ОТРИМАННЯ ЦИТАТИ ДНЯ=====================================
quoteOfTheDay();
async function quoteOfTheDay() {
  try {
    const response = await fetch(quoteURL);

    if (response.ok) {
      const data = await response.json();
      const quote = data.quote;
      const author = data.author;

      refs.quote.innerHTML = quote;
      refs.authorTitle.innerHTML = author;
    } else {
      refs.quote.innerHTML = 'Не вдалося отримати цитату';
      authorTitle.innerHTML = '';
    }
  } catch (error) {
    console.error(error);
    refs.quote.innerHTML = 'Помилка при отриманні цитати';
    authorTitle.textContent = '';
  }
}
// =======================================================================================

// ===============================СТВОРЕННЯ РОЗМІТКИ========================================
createMurkup();

function createMurkup() {
  const saved = localStorage.getItem('exerciseCard');
  const parsed = JSON.parse(saved);

  if (parsed.length === 0) {
    refs.defaultText.style.display = 'block';
  } else {
    refs.defaultText.style.display = 'none';
    const card = document.querySelector('.exercises-list');
    // const content = document.querySelector('.content-favorite-v');
    // parsed.forEach(item => {
    //   const { id, name, target, bodyPart, burnedCalories } = item;
      // favCatd = document.createElement('li');
      // favCatd.className = 'exercises-item';
      // favCatd.setAttribute('data-id', `${id}`);
      // favCatd.innerHTML = ` <div class="exercise-navigation">
      //         <button class="workout-btn">WORKOUT</button>
      //         <button type="button" class="trash_btn"><svg width="16px" height="16px">
      //             <use href="${sprite}#icon-trash"></use>
      //           </svg></button>
      //         <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
      //     <use href="${sprite}#icon-arrow"></use>
      //   </svg></button>
      //       </div>
      //       <div class="name-exercise-conteiner">
      //         <svg class="run-man-icon" width="24px" height="24px">
      //           <use href="${spriteRunningMan}#icon-running-stick-figure-in-cyrcle-black"></use>
      //         </svg>
      //         <h3 class="card-exercise-title">${name}</h3>
      //       </div>
      //       <ul class="discription">
      //         <li class="discription-title">Burned calories: <p class="discription-title-text">${burnedCalories} / 3 min</p>
      //         </li>
      //         <li class="discription-title">Body part: <p class="discription-title-text">${bodyPart}</p>
      //         </li>
      //         <li class="discription-title">Target: <p class="discription-title-text">${target}</p>
      //         </li>
      //       </ul>`;
      // card.appendChild(favCatd);
    //     });
  // }
// }
    card.innerHTML = parsed.map(
       ({id, name, target, bodyPart, burnedCalories })=>
      `<li class="exercises-item" data-id ="${id}"> 
      <div class="exercise-navigation">
              <button class="workout-btn">WORKOUT</button>
              <button type="button" class="trash_btn"><svg width="16px" height="16px">
                  <use href="${sprite}#icon-trash"></use>
                </svg></button>
              <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
          <use href="${sprite}#icon-arrow"></use>
        </svg></button>
            </div>
            <div class="name-exercise-conteiner">
              <svg class="run-man-icon" width="24px" height="24px">
                <use href="${spriteRunningMan}#icon-running-stick-figure-in-cyrcle-black"></use>
              </svg>
              <h3 class="card-exercise-title">${name}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${burnedCalories} / 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${bodyPart}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${target}</p>
              </li>
            </ul>
      </li>`).join('')



//     });
  }
}
// ===============================ВИДАЛЕННЯ З LS=============================
const trashBtn = document.querySelectorAll('.trash_btn');
trashBtn.forEach(btn => {
  btn.addEventListener('click', evt => {
    const cardRemove = evt.target.closest('li'); // записуємо елемент на який відбуваєтся клік
    evt.preventDefault();

    if (cardRemove) {
      cardRemove.remove();

      const items = JSON.parse(localStorage.getItem('exerciseCard')) || []; // отримуємо дані з LS
      const indexToDelete = findIndexToDelete(items, cardRemove); // якщо функція findIndexToDelete задовільняє вимоги тоді спрацьовує cardRemove.remove()
      if (indexToDelete !== -1) {
        items.splice(indexToDelete, 1);
      }
      localStorage.setItem('exerciseCard', JSON.stringify(items));

      if (document.querySelectorAll('.exercises-item').length === 0) {
        refs.defaultText.style.display = 'block';
      }
    }
  });
});
function findIndexToDelete(items, cardRemove) {
  //отримуємо items(масив обєктів з LS)
  const indexToDelete = items.findIndex(itm => {
    return itm.id === cardRemove.getAttribute('data-id'); //отримуємо індекс елементу якщо індекси співпадають
  });
  return indexToDelete;
}

// =====================================ВИКЛИК МОДАЛКИ========================================

const startBtn = document.querySelectorAll('.start_btn');

startBtn.forEach(btn => {
  btn.addEventListener('click', evt => {
    evt.preventDefault();
    console.log('модалка відкрийся!');
    const dataId = evt.target.closest('.exercises-item').dataset.id;
    console.log(dataId);
    clickOnBtnStart.onClickStart(dataId);
  });
});

export { createMurkup };
