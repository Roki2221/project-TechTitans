import{s as v,a as k}from"./scrollUp-88e0346d.js";const h=document.querySelector(".button-close"),L=document.querySelector(".btn-delete-favorites");document.querySelector(".btn-rating");const $=document.querySelector(".modal-card-container-f"),l=document.querySelector(".backdrop"),w=document.querySelector(".modal-window");let y,m=null;const C={defaultText:document.querySelector(".default_text")};h.addEventListener("click",p);window.addEventListener("keydown",g);l.addEventListener("click",f);function g(e){e.code==="Escape"&&p()}function f(e){e.target===l&&p()}function p(){l.classList.add("is-hidden"),window.removeEventListener("keydown",g),l.removeEventListener("click",f)}function E(e,t){h.addEventListener("click",p),window.addEventListener("keydown",g),l.addEventListener("click",f),m=e,l.classList.remove("is-hidden"),M(t);$.innerHTML=y,R()}function M(e){const t=localStorage.getItem("exerciseCard"),n=JSON.parse(t);return n.length?n.forEach(i=>{const{id:o,gifUrl:d,name:c,rating:a,target:r,bodyPart:S,equipment:b,popularity:_,burnedCalories:q,description:T}=i;if(o==e)return w.setAttribute("data-id",`${o}`),y=`      
    
            <div class="info-card">
                <img src="${d}" alt="${c}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${c}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${a}</div>
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
                                    Target<span class="character">${r}</span>
                                </p>
                                <p class="info-item">
                                    Body Part<span class="character">${S}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${b}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${_}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${q}</span>
                                </p>
                            </div>
                            <p class="text-info">${T}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function R(){const e=document.querySelectorAll(".rating");e.length>0&&t();function t(){let n,i;for(let a=0;a<e.length;a++){const r=e[a];o(r)}function o(a){d(a),c()}function d(a){n=a.querySelector(".rating__active"),i=a.querySelector(".rating__value")}function c(a=i.innerHTML){const r=a/.05;n.style.width=`${r}%`}}}L.addEventListener("click",A);function A(e){if(e.preventDefault(),m){m.remove();const t=JSON.parse(localStorage.getItem("exerciseCard"))||[],n=x(t,m);n!==-1&&t.splice(n,1),localStorage.setItem("exerciseCard",JSON.stringify(t)),document.querySelectorAll(".exercises-item").length===0&&(C.defaultText.style.display="block")}p()}const O={onClickStart:E},D="https://your-energy.b.goit.study/api/quote",s={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};let u;H();async function H(){try{const e=await fetch(D);if(e.ok){const t=await e.json(),n=t.quote,i=t.author;s.quote.innerHTML=n,s.authorTitle.innerHTML=i}else s.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),s.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}I();function I(){const e=document.querySelector(".exercises-list"),t=localStorage.getItem("exerciseCard"),n=JSON.parse(t);n.length===0?(e.innerHTML="",s.defaultText.style.display="block"):(s.defaultText.style.display="none",n.forEach(i=>{const{id:o,name:d,target:c,bodyPart:a,burnedCalories:r}=i;u=document.createElement("li"),u.className="exercises-item",u.setAttribute("data-id",`${o}`),u.innerHTML=` <div class="exercise-navigation">
              <button class="workout-btn">WORKOUT</button>
              <button type="button" class="trash_btn"><svg width="16px" height="16px">
                  <use href="${v}#icon-trash"></use>
                </svg></button>
              <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
          <use href="${v}#icon-arrow"></use>
        </svg></button>
            </div>
            <div class="name-exercise-conteiner">
              <svg class="run-man-icon" width="24px" height="24px">
                <use href="${k}#icon-running-stick-figure-in-cyrcle-black"></use>
              </svg>
              <h3 class="exercise-name">${d}</h3>
            </div>
            <ul class="discription">
              <li class="text-card">Burned calories: <p class="discription-title-text">${r} / 3 min</p>
              </li>
              <li class="text-card">Body part: <p class="discription-title-text">${a}</p>
              </li>
              <li class="text-card">Target: <p class="discription-title-text">${c}</p>
              </li>
            </ul>`,e.appendChild(u)}))}const B=document.querySelectorAll(".trash_btn");B.forEach(e=>{e.addEventListener("click",N)});function N(e){const t=e.target.closest("li");if(e.preventDefault(),t){t.remove();const n=JSON.parse(localStorage.getItem("exerciseCard"))||[],i=x(n,t);i!==-1&&n.splice(i,1),localStorage.setItem("exerciseCard",JSON.stringify(n)),document.querySelectorAll(".exercises-item").length===0&&(s.defaultText.style.display="block")}}function x(e,t){return e.findIndex(i=>i.id===t.getAttribute("data-id"))}const J=document.querySelectorAll(".start_btn");J.forEach(e=>{e.addEventListener("click",t=>{t.preventDefault();const n=t.target.closest(".exercises-item").dataset.id,i=t.target.closest("li");O.onClickStart(i,n)})});
