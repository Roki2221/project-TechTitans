const LOCALSTORAGE_KEY = 'exerciseCard';
let infoData;
let cardForLS = {};

// ========   =========//
const btnClose = document.querySelector('.button-close');
const btnAddFavorites = document.querySelector('.btn-add-favorites');
const btnRemoveFavorites = document.querySelector('.btn-delete-favorites');
const btnRating = document.querySelector('.btn-rating');
const modalWindow = document.querySelector('.modal-card-container');
const backdrop = document.querySelector('.backdrop');
const heart = document.querySelector('.like-icon');
const cardModalE = document.querySelector('.modal-window');

btnClose.addEventListener('click', onCloseModal);
btnAddFavorites.addEventListener('click', addToFavorites);
window.addEventListener('keydown', closeModal);
backdrop.addEventListener('click', onCloseModalBackdrop);

function fetchParams(id) {
  backdrop.classList.remove('is-hidden');
  return fetch(`https://your-energy.b.goit.study/api/exercises/${id}`).then(
    response => response.json());
}
// *==================================================*//
// * функція закриття вікна *//
function closeModal(event) {

  if (event.code === 'Escape') {
    onCloseModal();
  }
}
function onCloseModalBackdrop(event) {
  if (event.target === backdrop) {
    onCloseModal();
  }
}
function onCloseModal() {
  console.log('hi');
  backdrop.classList.add('is-hidden');
  // heart.classList.remove('add-red');
  // window.removeEventListener('keydown', closeModal);
  // backdrop.removeEventListener('click', onCloseModalBackdrop);
}
// *==================================================*//
// *  функції що додають дані в локал сторедж *//
function addToFavorites(e) {
  createBtnDelete();
  e.preventDefault();
  console.log('by');
  // heart.classList.add('add-red');
  writeFormToLS();
}
// ======== перевіряємо наявність даних   =========//

let LSData;
LSData = localStorage.getItem(LOCALSTORAGE_KEY);

console.log(LSData);
// if (!LSData || LSData === undefined) {
//   infoData = [];
// }
// else {
//   LSData = localStorage.getItem(LOCALSTORAGE_KEY);
//   infoData = JSON.parse(LSData);
//   console.log(infoData,'якщо лс щось було');
// }
if (LSData) {
  infoData = JSON.parse(LSData);

  if (infoData.length) {
    LSData = localStorage.getItem(LOCALSTORAGE_KEY);
    infoData = JSON.parse(LSData);
    console.log(infoData, 'якщо лс щось було');
  }
  else {
    infoData = [];
  }
}
else {
  infoData = [];
}
console.log(infoData);
function writeFormToLS() {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(infoData));
}

function createDataCardForLS(data) {
  // обʼєкт для запису данних в local storage
  cardForLS = {
    id: `${data._id}`,
    gifUrl: `${data.gifUrl}`,
    name: `${data.name}`,
    rating: `${data.rating}`,
    target: `${data.target}`,
    bodyPart: `${data.bodyPart}`,
    equipment: `${data.equipment}`,
    popularity: `${data.popularity}`,
    burnedCalories: `${data.burnedCalories}`,
    description: `${data.description}`,
  };
  infoData.push(cardForLS);
}
// *==================================================*//
//*=== функція що рендерить картку====*/
function renderModalCard(data) {
  const card = createMarkupModal(data);
  modalWindow.innerHTML = card;
  createRating();
  // createObjectLS(data);
  // console.log(b);
  createDataCardForLS(data);
}

function createMarkupModal(data) {
  let ratingStar = data.rating.toFixed(1);
  // console.log(data._id);
  
  // const saved = localStorage.getItem("exerciseCard");
  // let parsed = JSON.parse(saved);
  // console.log(parsed);

  console.log(infoData);
  for (let item of infoData) {
    console.log(item.id);
      console.log(data._id);
    if (item.id != data._id) {
      console.log('співпадінь немає, кнопка додати');
      createBtnAdd();
    }
    else {
      console.log('у нас є співпадіння, значить кнопка видалити');
      createBtnDelete();
    }
  }
    // for (let item of infoData) {
    //   console.log(item.id);
    //   console.log(data._id);
    //   if (item.id != data._id) {
    //     console.log( 'співпадінь немає, кнопка додати');
    //     createBtnAdd();

    //   }
    //   else {
    //     console.log( 'у нас є співпадіння, значить кнопка видалити');
    //     createBtnDelete();
    //     return
    //   }
    // }

  cardModalE.setAttribute('data-id', `${data._id}`);
  return `      
    
            <div class="info-card">
                <img src="${data.gifUrl}" alt="${data.name}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${data.name}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${ratingStar}</div>
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
                                    Target<span class="character">${data.target}</span>
                                </p>
                                <p class="info-item">
                                    Body Part<span class="character">${data.bodyPart}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${data.equipment}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${data.popularity}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${data.burnedCalories}</span>
                                </p>
                            </div>
                            <p class="text-info">${data.description}</p>
                    </div>
            </div>
    `;
}
// *==================================================*//
//*=====  функція що відмальовує рейтинг з зірок =======*//
function createRating() {
  const ratings = document.querySelectorAll('.rating');
  if (ratings.length > 0) {
    initRatings();
  }
  function initRatings() {
    let ratingActive, ratingValue;
    for (let index = 0; index < ratings.length; index++) {
      const rating = ratings[index];
      initRating(rating);
    }
    function initRating(rating) {
      initRatingVars(rating);
      setRatingActiveWidth();
    }
    function initRatingVars(rating) {
      ratingActive = rating.querySelector('.rating__active');
      ratingValue = rating.querySelector('.rating__value');
    }
    function setRatingActiveWidth(index = ratingValue.innerHTML) {
      const ratingActiveWidth = index / 0.05;
      // console.log(ratingActiveWidth);
      ratingActive.style.width = `${ratingActiveWidth}%`;
    }
  }
}
// *==================================================*//
// * функція видалення вправи з локал сторедж *//

function onClickBtnRemoveFavorites(evt) {
  createBtnAdd();
  const saved2 = localStorage.getItem("exerciseCard");
  let parsed2 = JSON.parse(saved2);
  console.log(parsed2);

  const idCardModalF = evt.target.closest('.modal-window').dataset.id;
  console.log(idCardModalF);
  let i = 0;
  parsed2.forEach((item, i) => {
    console.log(i);

    // const hasId = parsed2.includes(id.idCardModalF);
    //  console.log(hasId);
    if (item.id != idCardModalF) {
      console.log('немає співпадіння');
      return;
    }
    else {
      if (parsed2.length === 1) {
        parsed2 = [];
      } else {
        parsed2.splice(i, 1);
        console.log('є співпадіння');

        console.log(parsed2);
      }
      localStorage.setItem("exerciseCard", JSON.stringify(parsed2));
    }
    i = +1;
  })
  // onCloseModal();

  //reWrite.createMurkup;
}
function createBtnAdd() {
  btnAddFavorites.addEventListener('click', addToFavorites);
  btnAddFavorites.style.display = '';
  btnRemoveFavorites.style.display = 'none';
  btnRemoveFavorites.removeEventListener('click', onClickBtnRemoveFavorites);
}
function createBtnDelete() {
  btnAddFavorites.removeEventListener('click', addToFavorites);
  btnAddFavorites.style.display = 'none';
  btnRemoveFavorites.style.display = '';
  btnRemoveFavorites.addEventListener('click', onClickBtnRemoveFavorites);
}
// *==================================================*//

export {
  onCloseModal,
  closeModal,
  onCloseModalBackdrop,
  fetchParams,
  renderModalCard,
};
