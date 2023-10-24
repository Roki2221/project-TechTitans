import"./exercisesRightFirstPart-6db6c9e6.js";const S=document.querySelector(".button-close"),_=document.querySelector(".btn-delete-favorites");document.querySelector(".btn-rating");const q=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop"),T=document.querySelector(".modal-window");let p;S.addEventListener("click",g);window.addEventListener("keydown",m);u.addEventListener("click",f);function m(e){e.code==="Escape"&&g()}function f(e){e.target===u&&g()}function g(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",m),u.removeEventListener("click",f)}function k(e){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),w(e);q.innerHTML=p,C()}function w(e){const i=localStorage.getItem("exerciseCard"),t=JSON.parse(i);return t.length?t.forEach(n=>{const{id:o,gifUrl:s,name:l,rating:a,target:r,bodyPart:v,equipment:h,popularity:y,burnedCalories:x,description:b}=n;if(o!=e){console.log("немає співпадіння");return}else return T.setAttribute("data-id",`${o}`),p=`      
    
            <div class="info-card">
                <img src="${s}" alt="${l}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${l}</h3>
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
                                    Body Part<span class="character">${v}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${h}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${y}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${x}</span>
                                </p>
                            </div>
                            <p class="text-info">${b}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function C(){const e=document.querySelectorAll(".rating");e.length>0&&i();function i(){let t,n;for(let a=0;a<e.length;a++){const r=e[a];o(r)}function o(a){s(a),l()}function s(a){t=a.querySelector(".rating__active"),n=a.querySelector(".rating__value")}function l(a=n.innerHTML){const r=a/.05;t.style.width=`${r}%`}}}_.addEventListener("click",L);function L(e){const i=localStorage.getItem("exerciseCard");let t=JSON.parse(i);console.log(t);const n=e.target.closest(".modal-window").dataset.id;console.log(n),t.forEach((o,s)=>{if(console.log(s),o.id!=n){console.log("немає співпадіння");return}else t.length===1?t=[]:(t.splice(s,1),console.log("є співпадіння"),console.log(t)),localStorage.setItem("exerciseCard",JSON.stringify(t)),g();s=1})}const E={onClickStart:k},$="https://your-energy.b.goit.study/api/quote",c={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};let d;M();async function M(){try{const e=await fetch($);if(e.ok){const i=await e.json(),t=i.quote,n=i.author;c.quote.innerHTML=t,c.authorTitle.innerHTML=n}else c.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),c.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}A();function A(){const e=localStorage.getItem("exerciseCard"),i=JSON.parse(e);if(i.length===0)c.defaultText.style.display="block";else{c.defaultText.style.display="none";const t=document.querySelector(".exercises-list");i.forEach(n=>{const{id:o,name:s,target:l,bodyPart:a,burnedCalories:r}=n;d=document.createElement("li"),d.className="exercises-item",d.setAttribute("data-id",`${o}`),d.innerHTML=` <div class="exercise-navigation">
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
              <h3 class="card-exercise-title">${s}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${r}/ 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${a}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${l}</p>
              </li>
            </ul>`,t.appendChild(d)})}}const O=document.querySelectorAll(".trash_btn");O.forEach(e=>{e.addEventListener("click",i=>{const t=i.target.closest("li");if(i.preventDefault(),t){t.remove();const n=JSON.parse(localStorage.getItem("exerciseCard"))||[],o=R(n,t);o!==-1&&n.splice(o,1),localStorage.setItem("exerciseCard",JSON.stringify(n)),document.querySelectorAll(".exercises-item").length===0&&(c.defaultText.style.display="block")}})});function R(e,i){return e.findIndex(n=>n.id===i.getAttribute("data-id"))}const B=document.querySelectorAll(".start_btn");B.forEach(e=>{e.addEventListener("click",i=>{i.preventDefault(),console.log("модалка відкрийся!");const t=i.target.closest(".exercises-item").dataset.id;console.log(t),E.onClickStart(t)})});
