import"./header-6979dd00.js";const u="https://your-energy.b.goit.study/api/quote",s={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};d();async function d(){try{const t=await fetch(u);if(t.ok){const e=await t.json(),o=e.quote,r=e.author;s.quote.innerHTML=o,s.authorTitle.innerHTML=r}else s.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(t){console.error(t),s.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}const p=[{exName:"pinanie",calories:188,part:"hand",target:"stronger"},{exName:"spat",calories:788,part:"head",target:"vizhit"}];localStorage.setItem("exerciseCard",JSON.stringify(p));x();function x(){const t=localStorage.getItem("exerciseCard"),e=JSON.parse(t);if(console.log(e),e){s.defaultText.style.display="none";const o=document.querySelector(".exercises-list");e.forEach(r=>{const{exName:i,calories:c,part:a,target:l}=r,n=document.createElement("li");n.className="exercises-item",n.innerHTML=` <div class="exercise-navigation">
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
              <h3 class="card-exercise-title">${i}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${c}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${a}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${l}</p>
              </li>
            </ul>`,o.appendChild(n)})}else return console.error("No data found in local storage")}const h=document.querySelectorAll(".trash_btn");h.forEach(t=>{t.addEventListener("click",e=>{const o=e.target.closest("li");if(e.preventDefault(),o){o.remove();const r=JSON.parse(localStorage.getItem("exerciseCard"))||[],i=g(r,o);i!==-1&&r.splice(i,1),localStorage.setItem("exerciseCard",JSON.stringify(r)),r.length===0&&(s.defaultText.style.display="block"),document.querySelectorAll(".exercises-item").length===0&&(s.defaultText.style.display="block")}})});function g(t,e){return t.findIndex(r=>r.exName===e.querySelector(".card-exercise-title").textContent)}const f=document.querySelectorAll(".start_btn");f.forEach(t=>{t.addEventListener("click",e=>{e.preventDefault(),console.log("модалка відкрийся!")})});
