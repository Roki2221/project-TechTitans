import"./exercisesRightFirstPart-c5fc599b.js";const x=document.querySelector(".button-close");document.querySelector(".btn-remove-favorites");document.querySelector(".btn-rating");const _=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop");let g;x.addEventListener("click",p);window.addEventListener("keydown",m);u.addEventListener("click",f);function m(e){e.code==="Escape"&&p()}function f(e){e.target===u&&p()}function p(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",m),u.removeEventListener("click",f)}function b(){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),q();_.innerHTML=g,S()}function q(){const e=localStorage.getItem("exerciseCard"),t=JSON.parse(e);return t?t.forEach(a=>{const{id:i,gifUrl:r,name:c,rating:d,target:n,bodyPart:o,equipment:l,popularity:v,burnedCalories:h,description:y}=a;return g=`      
    
            <div class="info-card">
                <img src="${r}" alt="${c}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${c}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${d}</div>
                                    <div class="rating__body">
                                        <div class="rating__active"></div>
                                        <div class="rating__items">
                                            <input type="radio" class="rating__item" value="1" name="rating">
                                            <input type="radio" class="rating__item" value="2" name="rating">
                                            <input type="radio" class="rating__item" value="3" name="rating">
                                            <input type="radio" class="rating__item" value="4" name="rating">
                                            <input type="radio" class="rating__item" value="5" name="rating">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                            <div class="info">
                                <p class="info-item">
                                    Target<span class="character">${n}</span>
                                </p>
                                <p class="info-item">
                                    Body Part<span class="character">${o}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${l}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${v}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${h}</span>
                                </p>
                            </div>
                            <p class="text-info">${y}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function S(){const e=document.querySelectorAll(".rating");e.length>0&&t();function t(){let a,i;for(let n=0;n<e.length;n++){const o=e[n];r(o)}function r(n){c(n),d()}function c(n){a=n.querySelector(".rating__active"),i=n.querySelector(".rating__value")}function d(n=i.innerHTML){const o=n/.05;a.style.width=`${o}%`}}}const T={onClickStart:b},k="https://your-energy.b.goit.study/api/quote",s={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};L();async function L(){try{const e=await fetch(k);if(e.ok){const t=await e.json(),a=t.quote,i=t.author;s.quote.innerHTML=a,s.authorTitle.innerHTML=i}else s.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),s.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}C();function C(){const e=localStorage.getItem("exerciseCard"),t=JSON.parse(e);if(console.log(t),t){s.defaultText.style.display="none";const a=document.querySelector(".exercises-list");t.forEach(i=>{const{id:r,name:c,target:d,bodyPart:n,burnedCalories:o}=i,l=document.createElement("li");l.className="exercises-item",l.setAttribute("data-id",`${r}`);l.innerHTML=` <div class="exercise-navigation">
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
              <h3 class="card-exercise-title">${c}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${o}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${n}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${d}</p>
              </li>
            </ul>`,a.appendChild(l)})}else return console.error("No data found in local storage")}const $=document.querySelectorAll(".trash_btn");$.forEach(e=>{e.addEventListener("click",t=>{const a=t.target.closest("li");if(t.preventDefault(),a){a.remove();const i=JSON.parse(localStorage.getItem("exerciseCard"))||[],r=w(i,a);r!==-1&&i.splice(r,1),localStorage.setItem("exerciseCard",JSON.stringify(i)),i.length===0&&(s.defaultText.style.display="block"),document.querySelectorAll(".exercises-item").length===0&&(s.defaultText.style.display="block")}})});function w(e,t){return e.findIndex(i=>i.exName===t.querySelector(".card-exercise-title").textContent)}const E=document.querySelectorAll(".start_btn");E.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault(),console.log("модалка відкрийся!"),T.onClickStart()})});
