import{s as p,a as q}from"./exercisesRightFirstPart-0ac43d60.js";const T=document.querySelector(".button-close"),k=document.querySelector(".btn-delete-favorites");document.querySelector(".btn-rating");const $=document.querySelector(".modal-card-container-f"),u=document.querySelector(".backdrop"),w=document.querySelector(".modal-window");let m;T.addEventListener("click",g);window.addEventListener("keydown",f);u.addEventListener("click",v);function f(e){e.code==="Escape"&&g()}function v(e){e.target===u&&g()}function g(){console.log("hi"),u.classList.add("is-hidden"),window.removeEventListener("keydown",f),u.removeEventListener("click",v)}function C(e){u.classList.remove("is-hidden"),console.log(" привіт це імпорт"),L(e);$.innerHTML=m,E()}function L(e){const n=localStorage.getItem("exerciseCard"),t=JSON.parse(n);return t.length?t.forEach(i=>{const{id:o,gifUrl:s,name:l,rating:a,target:r,bodyPart:y,equipment:x,popularity:S,burnedCalories:b,description:_}=i;if(o!=e){console.log("немає співпадіння");return}else return w.setAttribute("data-id",`${o}`),m=`      
    
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
                                    Body Part<span class="character">${y}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${x}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${S}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${b}</span>
                                </p>
                            </div>
                            <p class="text-info">${_}</p>
                    </div>
            </div>
    `}):console.error("No data found in local storage")}function E(){const e=document.querySelectorAll(".rating");e.length>0&&n();function n(){let t,i;for(let a=0;a<e.length;a++){const r=e[a];o(r)}function o(a){s(a),l()}function s(a){t=a.querySelector(".rating__active"),i=a.querySelector(".rating__value")}function l(a=i.innerHTML){const r=a/.05;t.style.width=`${r}%`}}}k.addEventListener("click",M);function M(e){const n=localStorage.getItem("exerciseCard");let t=JSON.parse(n);console.log(t);const i=e.target.closest(".modal-window").dataset.id;console.log(i),t.forEach((o,s)=>{if(console.log(s),o.id!=i){console.log("немає співпадіння");return}else t.length===1?t=[]:(t.splice(s,1),console.log("є співпадіння"),console.log(t)),localStorage.setItem("exerciseCard",JSON.stringify(t)),g();s=1}),h()}const R={onClickStart:C},A="https://your-energy.b.goit.study/api/quote",c={quote:document.querySelector(".quote_text"),authorTitle:document.querySelector(".author_name"),favoriteEx:document.querySelector(".favorite_exercises"),defaultText:document.querySelector(".default_text")};let d;O();async function O(){try{const e=await fetch(A);if(e.ok){const n=await e.json(),t=n.quote,i=n.author;c.quote.innerHTML=t,c.authorTitle.innerHTML=i}else c.quote.innerHTML="Не вдалося отримати цитату",authorTitle.innerHTML=""}catch(e){console.error(e),c.quote.innerHTML="Помилка при отриманні цитати",authorTitle.textContent=""}}h();function h(){const e=localStorage.getItem("exerciseCard"),n=JSON.parse(e);if(n.length===0)c.defaultText.style.display="block";else{c.defaultText.style.display="none";const t=document.querySelector(".exercises-list");n.forEach(i=>{const{id:o,name:s,target:l,bodyPart:a,burnedCalories:r}=i;d=document.createElement("li"),d.className="exercises-item",d.setAttribute("data-id",`${o}`),d.innerHTML=` <div class="exercise-navigation">
              <button class="workout-btn">WORKOUT</button>
              <button type="button" class="trash_btn"><svg width="16px" height="16px">
                  <use href="${p}#icon-trash"></use>
                </svg></button>
              <button class="start_btn" type="submit">Start <svg width="16px" height="16px ">
          <use href="${p}#icon-arrow"></use>
        </svg></button>
            </div>
            <div class="name-exercise-conteiner">
              <svg class="run-man-icon" width="24px" height="24px">
                <use href="${q}#icon-running-stick-figure-in-cyrcle-black"></use>
              </svg>
              <h3 class="card-exercise-title">${s}</h3>
            </div>
            <ul class="discription">
              <li class="discription-title">Burned calories: <p class="discription-title-text">${r} / 3 min</p>
              </li>
              <li class="discription-title">Body part: <p class="discription-title-text">${a}</p>
              </li>
              <li class="discription-title">Target: <p class="discription-title-text">${l}</p>
              </li>
            </ul>`,t.appendChild(d)})}}const B=document.querySelectorAll(".trash_btn");B.forEach(e=>{e.addEventListener("click",n=>{const t=n.target.closest("li");if(n.preventDefault(),t){t.remove();const i=JSON.parse(localStorage.getItem("exerciseCard"))||[],o=I(i,t);o!==-1&&i.splice(o,1),localStorage.setItem("exerciseCard",JSON.stringify(i)),document.querySelectorAll(".exercises-item").length===0&&(c.defaultText.style.display="block")}})});function I(e,n){return e.findIndex(i=>i.id===n.getAttribute("data-id"))}const H=document.querySelectorAll(".start_btn");H.forEach(e=>{e.addEventListener("click",n=>{n.preventDefault(),console.log("модалка відкрийся!");const t=n.target.closest(".exercises-item").dataset.id;console.log(t),R.onClickStart(t)})});
