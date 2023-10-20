const quoteURL = "https://your-energy.b.goit.study/api/quote"

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
            const cardLS = [{
                exName: "pinanie",
                calories: 188,
                part: "hand",
                target: "stronger"
            },
            {exName: "spat",
                calories: 788,
                part: "head",
                target: "vizhit"}
        ]
            localStorage.setItem("exerciseCard", JSON.stringify(cardLS));
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
              const {exName, calories, part, target} = item;
            //   console.log(exName, calories, part, target);
              const favCatd = document.createElement('li');
              favCatd.className = 'exercises-item';
            favCatd.innerHTML = 
            ` <div class="exercise-navigation">
              <button class="workout-btn">WORKOUT</button>
              <button type="button" class="trash_btn"><svg width="16px" height="16px">
                  <use href="./public/icon.svg#icon-trash"></use>
                </svg></button>
              <button class="start_btn" type="submit">Start <svg xmlns="http://www.w3.org/2000/svg" width="16"
                  height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M7.5 14L14 7.5M14 7.5L7.5 1M14 7.5H1" stroke="#242424" stroke-width="1.3"
                    stroke-linecap="round" stroke-linejoin="round" />
                </svg></button>
            </div>
            <div class="name-exercise-conteiner">
              <svg class="run-man-icon" width="24px" height="24px">
                <use href="./public/icon.svg#icon-running-stick-figure-in-cyrcle"></use>
              </svg>
              <h3 class="card-exercise-title">${exName}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${calories}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${part}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${target}</p>
              </li>
            </ul>`;
        card.appendChild(favCatd);
            
        });}

            
      }
// ===============================ВИДАЛЕННЯ З LS=============================
    //   const trashBtn = document.querySelectorAll(".trash_btn")
    //   trashBtn.addEventListener("click", deleteCatd)

//       function deleteCatd(evt) {
//         evt.preventDefault();

//         console.log("видалило");
       
//       }

    
        const trashBtn = document.querySelectorAll(".trash_btn");
        trashBtn.forEach((btn) =>
    {
        btn.addEventListener("click", (evt) => {
        const cardRemove = evt.target.closest("li");
  
    if (cardRemove) {
        cardRemove.remove();
        if (document.querySelectorAll(".exercises-item").length === 0) {
        refs.defaultText.style.display = "block";
      }
    }

})
})