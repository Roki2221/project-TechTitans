import"./exercisesRightFirstPart-21edb697.js";const b=document.querySelector(".button-close"),_=document.querySelector(".btn-delete-favorites");document.querySelector(".btn-rating");const q=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop"),T=document.querySelector(".modal-window");let p;b.addEventListener("click",g);window.addEventListener("keydown",m);u.addEventListener("click",f);function m(e){e.code==="Escape"&&g()}function f(e){e.target===u&&g()}function g(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",m),u.removeEventListener("click",f)}function k(e){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),C(e);q.innerHTML=p,w()}function C(e){const n=localStorage.getItem("exerciseCard"),t=JSON.parse(n);return t.length?t.forEach(a=>{const{id:s,gifUrl:o,name:r,rating:i,target:c,bodyPart:v,equipment:h,popularity:y,burnedCalories:x,description:S}=a;if(s!=e){console.log("немає співпадіння");return}else return T.setAttribute("data-id",`${s}`),p=`      
    
            <div class="info-card">
                <img src="${o}" alt="${r}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${r}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${i}</div>
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
                            <p class="text-info">${S}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function w(){const e=document.querySelectorAll(".rating");e.length>0&&n();function n(){let t,a;for(let i=0;i<e.length;i++){const c=e[i];s(c)}function s(i){o(i),r()}function o(i){t=i.querySelector(".rating__active"),a=i.querySelector(".rating__value")}function r(i=a.innerHTML){const c=i/.05;t.style.width=`${c}%`}}}_.addEventListener("click",L);function L(e){const n=localStorage.getItem("exerciseCard");let t=JSON.parse(n);console.log(t);const a=e.target.closest(".modal-window").dataset.id;console.log(a),t.forEach((s,o)=>{if(console.log(o),s.id!=a){console.log("немає співпадіння");return}else t.length===1?t=[]:(t.splice(o,1),console.log("є співпадіння"),console.log(t)),localStorage.setItem("exerciseCard",JSON.stringify(t)),g();o=1})}const E={onClickStart:k},$="https://your-energy.b.goit.study/api/quote",l={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};let d;M();async function M(){try{const e=await fetch($);if(e.ok){const n=await e.json(),t=n.quote,a=n.author;l.quote.innerHTML=t,l.authorTitle.innerHTML=a}else l.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),l.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}O();function O(){console.log("ми перемальовуємо розмітку");const e=localStorage.getItem("exerciseCard"),n=JSON.parse(e);if(console.log(n.length),n.length===0)l.defaultText.style.display="block";else{l.defaultText.style.display="none";const t=document.querySelector(".exercises-list");n.forEach(a=>{const{id:s,name:o,target:r,bodyPart:i,burnedCalories:c}=a;console.log(o,c,i,r),d=document.createElement("li"),d.className="exercises-item",d.setAttribute("data-id",`${s}`);d.innerHTML=` <div class="exercise-navigation">
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
              <li class="discription-title">Body part: <p class="discription-title-text">${i}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${r}</p>
              </li>
            </ul>`,t.appendChild(d)})}}const A=document.querySelectorAll(".trash_btn");A.forEach(e=>{e.addEventListener("click",n=>{const t=n.target.closest("li");if(n.preventDefault(),t){t.remove();const s=JSON.parse(localStorage.getItem("exerciseCard"))||[],o=a(s,t);console.log(o),o!==-1&&s.splice(o,1),localStorage.setItem("exerciseCard",JSON.stringify(s)),document.querySelectorAll(".exercises-item").length===0&&(l.defaultText.style.display="block")}function a(s,o){console.log(s),console.log(o);const r=s.findIndex(i=>i.exName===o.querySelector(".card-exercise-title").textContent);console.log(r)}})});const B=document.querySelectorAll(".start_btn");B.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),console.log("модалка відкрийся!");const t=n.target.closest(".exercises-item").dataset.id;console.log(t),E.onClickStart(t)})});
