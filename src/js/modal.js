const LOCALSTORAGE_KEY = 'exerciseCard';
let infoData;
let cardForLS = {};
let b;
// ======== перевіряємо наявність даних   =========//
  const LSData = localStorage.getItem('exerciseCard');
infoData = JSON.parse(LSData);
if (!infoData) {
  console.log('якщо даних немає');
  infoData = [];
  }
  console.log(infoData);
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


// fetchParams('64f389465ae26083f39b17a6') //!тут всередині повина бути id
//   .then(renderModalCard)
//   .catch(error => console.log(error));

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
  btnAddFavorites.removeEventListener('click', addToFavorites);
  btnAddFavorites.style.display = 'none';
  btnRemoveFavorites.classList.remove('is-hidden');
  btnRemoveFavorites.addEventListener('click', onClickBtnRemoveFavorites);
  e.preventDefault();
  console.log('by');
  // heart.classList.add('add-red');
  writeFormToLS();
}
function writeFormToLS(event) {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(infoData));
}

function createObjectLS(data) {
  createDataCardForLS(data);
  b = {
    cardForLS: cardForLS,
    id: `${data._id}`,
  };
  if (!infoData.length) {
    infoData.push(b);
  } else {
    infoData.map(info => {
      if (info.id === b.id) {
        console.log('Ця вправа вже додана в улюблені!');
        return;
      } else {
        infoData.push(b);
      }
    });
  }
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
  // infoData.map((info) => {
  //   console.log('ми в мап');
  //   if (info.id === cardForLS.id) {
  //     console.log('Ця вправа вже додана в улюблені!');
  //     return;
  //   }
  // });
  // console.log('схожих немає');
  // infoData.push(cardForLS); 
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
  btnAddFavorites.style.display = '';
  btnRemoveFavorites.style.display = 'none';
  btnRemoveFavorites.removeEventListener('click', onClickBtnRemoveFavorites);
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

        // *==================================================*//

export {
  onCloseModal,
  closeModal,
  onCloseModalBackdrop,
  fetchParams,
  renderModalCard,
};
