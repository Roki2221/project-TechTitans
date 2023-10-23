import clickOnBtnStart from './modal-favorites';

const quoteURL = "https://your-energy.b.goit.study/api/quote";

const refs = {
quote: document.querySelector(".quote_text"),
authorTitle: document.querySelector(".author_name"),
favoriteEx: document.querySelector(".favorite_exercises"),
defaultText: document.querySelector(".default_text"),
}

// ============================ОТРИМАННЯ ЦИТАТИ ДНЯ=====================================
quoteOfTheDay()
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
          const saved = localStorage.getItem("exerciseCard");
            const parsed = JSON.parse(saved);
            if (parsed.length === 0) {
        return refs.defaultText.style.display = "block";
            }
             else {
              refs.defaultText.style.display = "none";
              const card = document.querySelector(".exercises-list");
        parsed.forEach((item) => {
          const { id, name, target, bodyPart, burnedCalories } = item;
              const favCatd = document.createElement('li');
          favCatd.className = 'exercises-item';
          favCatd.setAttribute ('data-id',`${id}`);
          
          favCatd.innerHTML =
            ` <div class="exercise-navigation">
              <button class="workout-btn">WORKOUT</button>
              <button type="button" class="trash_btn"><svg width="16px" height="16px">
                  <use href="./public/icon.svg#icon-trash"></use>
                </svg></button>
              <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
          <use href="./public/icon.svg#icon-arrow"></use>
        </svg></button>
            </div>
            <div class="name-exercise-conteiner">
              <svg class="run-man-icon" width="24px" height="24px">
                <use href="./public/icon.svg#icon-running-stick-figure-in-cyrcle"></use>
              </svg>
              <h3 class="card-exercise-title">${name}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${burnedCalories}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${bodyPart}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${target}</p>
              </li>
            </ul>`;
        card.appendChild(favCatd);    
        })}      
      }
// ===============================ВИДАЛЕННЯ З LS=============================   
        const trashBtn = document.querySelectorAll(".trash_btn");  
         trashBtn.forEach((btn) =>
    {
        btn.addEventListener("click", (evt) => {
        const cardRemove = evt.target.closest("li");
        evt.preventDefault();
  
    if (cardRemove) {
        cardRemove.remove();

        const items = JSON.parse(localStorage.getItem('exerciseCard')) || []; 
        const indexToDelete = findIndexToDelete(items, cardRemove);
        if (indexToDelete !== -1) {
        items.splice(indexToDelete, 1);
      }  localStorage.setItem('exerciseCard', JSON.stringify(items));
      // if (items.length === 0) {
      //   refs.defaultText.style.display = "block";
      // };

        if (document.querySelectorAll(".exercises-item").length === 0) {
        refs.defaultText.style.display = "block";}
      }

        })
        });
        function findIndexToDelete(items, cardRemove) {
        const indexToDelete = items.findIndex(item => {
        return item.exName === cardRemove.querySelector('.card-exercise-title').textContent;
        });
}

// =====================================ВИКЛИК МОДАЛКИ========================================

const startBtn = document.querySelectorAll(".start_btn");

startBtn.forEach((btn) => {
  btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    console.log("модалка відкрийся!");
    clickOnBtnStart.onClickStart();
  
  })
});

// ====================================ПАГІНАЦІЯ================================================
// pag()
// function pag() {
//   const getObj = localStorage.getItem("exerciseCard");
//   const parsed = JSON.parse(getObj);

//   let currentPage = 1;
//   let rows = 10;
//   console.log(parsed);

//   const exList = document.querySelector(".exercises-list");
//   function dispList(data, perPage, page) {
//     const start = perPage * page;
//     const end = start + perPage;
//     const paginate = data.slice(start, end);
//     paginate.forEach((el) => {
//       const postEl =  
//     })
//   }

// } 