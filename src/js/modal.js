const LOCALSTORAGE_KEY = 'exerciseCard';
let infoData = [];
let cardForLS = {};
let b;

const btnClose = document.querySelector('.button-close');
const btnAddFavorites = document.querySelector('.btn-add-favorites');
const btnRating = document.querySelector('.btn-rating');
const modalWindow = document.querySelector('.modal-card-container');
const backdrop = document.querySelector('.backdrop');
const heart = document.querySelector('.like-icon');

btnClose.addEventListener('click', onCloseModal);
btnAddFavorites.addEventListener('click', addToFavorites);
window.addEventListener('keydown', closeModal);
backdrop.addEventListener('click', onCloseModalBackdrop);

fetchParams('64f389465ae26083f39b17a6') //!тут всередині повина бути id
  .then(renderModalCard)
  .catch(error => console.log(error));

function fetchParams(id) {
  return fetch(`https://your-energy.b.goit.study/api/exercises/${id}`).then(
    response => response.json()
  );
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
  window.removeEventListener('keydown', closeModal);
  backdrop.removeEventListener('click', onCloseModalBackdrop);
}
// *==================================================*//
// *  функції що додають дані в локал сторедж *//
function addToFavorites(e) {
  e.preventDefault();
  console.log('by');
  heart.classList.add('add-red');
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

export {
  onCloseModal,
  closeModal,
  onCloseModalBackdrop,
  fetchParams,
  renderModalCard,
};
