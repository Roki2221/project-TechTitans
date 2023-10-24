import"./exercisesRightFirstPart-150d96ff.js";const b=document.querySelector(".button-close");document.querySelector(".btn-remove-favorites");document.querySelector(".btn-rating");const q=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop");let g;b.addEventListener("click",p);window.addEventListener("keydown",m);u.addEventListener("click",f);function m(e){e.code==="Escape"&&p()}function f(e){e.target===u&&p()}function p(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",m),u.removeEventListener("click",f)}function S(e){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),T(e);q.innerHTML=g,k()}function T(e){const n=localStorage.getItem("exerciseCard"),i=JSON.parse(n);return i.length?i.forEach(s=>{const{id:a,gifUrl:o,name:r,rating:t,target:c,bodyPart:v,equipment:h,popularity:y,burnedCalories:x,description:_}=s;if(a!=e){console.log("немає співпадіння");return}else return g=`      
    
            <div class="info-card">
                <img src="${o}" alt="${r}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${r}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${t}</div>
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
                                    Target<span class="character">${c}</span>
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
                            <p class="text-info">${_}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function k(){const e=document.querySelectorAll(".rating");e.length>0&&n();function n(){let i,s;for(let t=0;t<e.length;t++){const c=e[t];a(c)}function a(t){o(t),r()}function o(t){i=t.querySelector(".rating__active"),s=t.querySelector(".rating__value")}function r(t=s.innerHTML){const c=t/.05;i.style.width=`${c}%`}}}const L={onClickStart:S},C="https://your-energy.b.goit.study/api/quote",l={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};let d;$();async function $(){try{const e=await fetch(C);if(e.ok){const n=await e.json(),i=n.quote,s=n.author;l.quote.innerHTML=i,l.authorTitle.innerHTML=s}else l.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),l.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}w();function w(){const e=localStorage.getItem("exerciseCard"),n=JSON.parse(e);if(console.log(n.length),n.length===0)l.defaultText.style.display="block";else{l.defaultText.style.display="none";const i=document.querySelector(".exercises-list");n.forEach(s=>{const{id:a,name:o,target:r,bodyPart:t,burnedCalories:c}=s;console.log(o,c,t,r),d=document.createElement("li"),d.className="exercises-item",d.setAttribute("data-id",`${a}`);d.innerHTML=` <div class="exercise-navigation">
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
              <li class="discription-title">Body part: <p class="discription-title-text">${t}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${r}</p>
              </li>
            </ul>`,i.appendChild(d)})}}const E=document.querySelectorAll(".trash_btn");E.forEach(e=>{e.addEventListener("click",n=>{const i=n.target.closest("li");if(n.preventDefault(),i){i.remove();const a=JSON.parse(localStorage.getItem("exerciseCard"))||[],o=s(a,i);console.log(o),o!==-1&&a.splice(o,1),localStorage.setItem("exerciseCard",JSON.stringify(a)),document.querySelectorAll(".exercises-item").length===0&&(l.defaultText.style.display="block")}function s(a,o){console.log(a),console.log(o);const r=a.findIndex(t=>t.exName===o.querySelector(".card-exercise-title").textContent);console.log(r)}})});const M=document.querySelectorAll(".start_btn");M.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),console.log("модалка відкрийся!");const i=n.target.closest(".exercises-item").dataset.id;console.log(i),L.onClickStart(i)})});
