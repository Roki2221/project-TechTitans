import"./exercisesRightFirstPart-e4d275f3.js";const x=document.querySelector(".button-close");document.querySelector(".btn-remove-favorites");document.querySelector(".btn-rating");const _=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop");let g;x.addEventListener("click",p);window.addEventListener("keydown",m);u.addEventListener("click",v);function m(e){e.code==="Escape"&&p()}function v(e){e.target===u&&p()}function p(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",m),u.removeEventListener("click",v)}function b(){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),q();_.innerHTML=g,S()}function q(){const e=localStorage.getItem("exerciseCard"),n=JSON.parse(e);return n?n.forEach(a=>{const{id:s,gifUrl:o,name:i,rating:r,target:t,bodyPart:c,equipment:d,popularity:f,burnedCalories:h,description:y}=a;return g=`      
    
            <div class="info-card">
                <img src="${o}" alt="${i}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${i}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${r}</div>
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
                                    Target<span class="character">${t}</span>
                                </p>
                                <p class="info-item">
                                    Body Part<span class="character">${c}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${d}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${f}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${h}</span>
                                </p>
                            </div>
                            <p class="text-info">${y}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function S(){const e=document.querySelectorAll(".rating");e.length>0&&n();function n(){let a,s;for(let t=0;t<e.length;t++){const c=e[t];o(c)}function o(t){i(t),r()}function i(t){a=t.querySelector(".rating__active"),s=t.querySelector(".rating__value")}function r(t=s.innerHTML){const c=t/.05;a.style.width=`${c}%`}}}const T={onClickStart:b},k="https://your-energy.b.goit.study/api/quote",l={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};L();async function L(){try{const e=await fetch(k);if(e.ok){const n=await e.json(),a=n.quote,s=n.author;l.quote.innerHTML=a,l.authorTitle.innerHTML=s}else l.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),l.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}C();function C(){const e=localStorage.getItem("exerciseCard"),n=JSON.parse(e);if(console.log(n.length),n.length===0)l.defaultText.style.display="block";else{l.defaultText.style.display="none";const a=document.querySelector(".exercises-list");n.forEach(s=>{const{id:o,name:i,target:r,bodyPart:t,burnedCalories:c}=s;console.log(i,c,t,r);const d=document.createElement("li");d.className="exercises-item",d.setAttribute("data-id",`${o}`);d.innerHTML=` <div class="exercise-navigation">
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
              <li class="discription-title">Body part: <p class="discription-title-text">${t}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${r}</p>
              </li>
            </ul>`,a.appendChild(d)})}}const $=document.querySelectorAll(".trash_btn");$.forEach(e=>{e.addEventListener("click",n=>{const a=n.target.closest("li");if(n.preventDefault(),a){a.remove();const o=JSON.parse(localStorage.getItem("exerciseCard"))||[],i=s(o,a);console.log(i),i!==-1&&o.splice(i,1),localStorage.setItem("exerciseCard",JSON.stringify(o)),document.querySelectorAll(".exercises-item").length===0&&(l.defaultText.style.display="block")}function s(o,i){console.log(o),console.log(i);const r=o.findIndex(t=>t.exName===i.querySelector(".card-exercise-title").textContent);console.log(r)}})});const w=document.querySelectorAll(".start_btn");w.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),console.log("модалка відкрийся!"),T.onClickStart()})});
