import"./styles-ef855444.js";const u="https://your-energy.b.goit.study/api/quote",r={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};d();async function d(){try{const e=await fetch(u);if(e.ok){const t=await e.json(),s=t.quote,i=t.author;r.quote.innerHTML=s,r.authorTitle.innerHTML=i}else r.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),r.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}const p=[{exName:"pinanie",calories:188,part:"hand",target:"stronger"},{exName:"spat",calories:788,part:"head",target:"vizhit"}];localStorage.setItem("exerciseCard",JSON.stringify(p));x();function x(){const e=localStorage.getItem("exerciseCard"),t=JSON.parse(e);if(console.log(t),t){r.defaultText.style.display="none";const s=document.querySelector(".exercises-list");t.forEach(i=>{const{exName:o,calories:c,part:a,target:l}=i,n=document.createElement("li");n.className="exercises-item",n.innerHTML=` <div class="exercise-navigation">
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
              <h3 class="card-exercise-title">${o}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${c}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${a}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${l}</p>
              </li>
            </ul>`,s.appendChild(n)})}else return console.error("No data found in local storage")}const h=document.querySelectorAll(".trash_btn");h.forEach(e=>{e.addEventListener("click",t=>{const s=t.target.closest("li");if(s){s.remove();const i=JSON.parse(localStorage.getItem("exerciseCard"))||[],o=g(i,s);o!==-1&&i.splice(o,1),localStorage.setItem("exerciseCard",JSON.stringify(i)),i.length===0&&(r.defaultText.style.display="block"),document.querySelectorAll(".exercises-item").length===0&&(r.defaultText.style.display="block")}})});function g(e,t){return e.findIndex(i=>i.exName===t.querySelector(".card-exercise-title").textContent)}
