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

// ============================ПРИКЛАД ЗАПИСУ В LS========================================
        //     const cardLS = [{
        //         exName: "pinanie",
        //         calories: 188,
        //         part: "hand",
        //         target: "stronger"
        //     },
        //     {exName: "spat",
        //         calories: 788,
        //         part: "head",
        //         target: "vizhit"}
        // ]
// const cardLS = {
//   id: `${data._id}`,
//   gifUrl: `${data.gifUrl}`,
//   name: `${data.name}`,
//   rating: `${data.rating}`,
//   target: `${data.target}`,
//   bodyPart: `${data.bodyPart}`,
//   equipment: `${data.equipment}`,
//   popularity: `${data.popularity}`,
//   burnedCalories: `${data.burnedCalories}`,
//   description: `${data.description}`
//         }
        //     localStorage.setItem("exerciseCard", JSON.stringify(cardLS));
// =========================================================================================

// ===============================СТВОРЕННЯ РОЗМІТКИ========================================
        createMurkup();
        
        function createMurkup() {
          const saved = localStorage.getItem("exerciseCard");
            const parsed = JSON.parse(saved);
            console.log(parsed);

            if (!parsed) {
        return console.error("No data found in local storage");
            }
             else {
              refs.defaultText.style.display = "none";
              const card = document.querySelector(".exercises-list");
        parsed.forEach((item) => {
          //! const { exName, calories, part, target } = item;
          const { id, name, target, bodyPart, burnedCalories } = item;
            //   console.log(exName, calories, part, target);
              const favCatd = document.createElement('li');
          favCatd.className = 'exercises-item';
          favCatd.setAttribute ('data-id',`${id}`);
        //     favCatd.innerHTML = 
        //     ` <div class="exercise-navigation">
        //       <button class="workout-btn">WORKOUT</button>
        //       <button type="button" class="trash_btn"><svg width="16px" height="16px">
        //           <use href="./public/icon.svg#icon-trash"></use>
        //         </svg></button>
        //       <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
        //   <use href="./public/icon.svg#icon-arrow"></use>
        // </svg></button>
        //     </div>
        //     <div class="name-exercise-conteiner">
        //       <svg class="run-man-icon" width="24px" height="24px">
        //         <use href="./public/icon.svg#icon-running-stick-figure-in-cyrcle"></use>
        //       </svg>
        //       <h3 class="card-exercise-title">${exName}</h3>
        //     </div>
        //     <ul class="discription">
        //       <li class="discription-title">Burned calories: <p class="discription-title-text">${calories}/ 3 min</p>
        //       </li>
        //       <li class="discription-title">Body part: <p class="discription-title-text">${part}</p>
        //       </li>
        //       <li class="discription-title">Target: <p class="discription-title-text">${target}</p>
        //       </li>
        //     </ul>`;
          //!замінила данні виходячи з нового лс та додала дата атрибут , щоб було легше знайти
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
        const trashBtn = document.querySelectorAll(".trash_btn");  //! щось у вас не вірно видаляє картку, коли обновляєш сторінку картка повертається
        
        trashBtn.forEach((btn) =>
        {btn.addEventListener("click", (evt) => {
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
        refs.defaultText.style.display = "block";}}

        })
        }); 
        function findIndexToDelete(items, cardRemove) {
        const indexToDelete = items.findIndex(item => {
        return item.exName === cardRemove.querySelector('.card-exercise-title').textContent;
        });
        return indexToDelete;
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

