
const btnClose = document.querySelector('.button-close');
const btnAddFavorites = document.querySelector('.btn-remove-favorites');
const btnRating = document.querySelector('.btn-rating');
const modalWindow = document.querySelector('.modal-card-container-f');
const backdrop = document.querySelector('.backdrop');
let card1;
 // const heart = document.querySelector('.like-icon');

btnClose.addEventListener('click',onCloseModal);
// btnAddFavorites.addEventListener('click', deleteFromFavorites);
window.addEventListener('keydown', closeModal);
backdrop.addEventListener('click', onCloseModalBackdrop);

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


function onClickStart(dataIdF) {
   
    backdrop.classList.remove('is-hidden');
    console.log(' привіт це імпорт');
    renderModalCardFavorite(dataIdF);//!!! працює дуже дивно
     modalWindow.innerHTML = card1;
      createRating();
    

}


// *==================================================*//
//*=== функція що рендерить картку====*/
function renderModalCardFavorite(dataIdF) {
    const saved1 = localStorage.getItem("exerciseCard");
    const parsed1 = JSON.parse(saved1);
    // console.log(parsed1);

    if (!parsed1.length) {
        return console.error("No data found in local storage");
    }
    else {
        return parsed1.forEach((itemForModal) => {
            // console.log(dataIdF);
           
            const { id, gifUrl, name, rating, target, bodyPart, equipment, popularity, burnedCalories, description } = itemForModal;
            // console.log(id, gifUrl, name, rating, target, bodyPart, equipment, popularity, burnedCalories, description);
          // let ratingStar = rating.toFixed(1);
            //   console.log(rating); 

            if (id != dataIdF) {
                console.log('немає співпадіння');
                return;
            }
            else {
                return card1 = (`      
    
            <div class="info-card">
                <img src="${gifUrl}" alt="${name}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${name}</h3>
                        <form action="rating__form">
                            <div class="form-item-rating">
                                <div class="rating">
                                        <div class="rating__value">${rating}</div>
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
                                    Target<span class="character">${target}</span>
                                </p>
                                <p class="info-item">
                                    Body Part<span class="character">${bodyPart}</span>
                                </p>
                                <p class="info-item">
                                    Equipment<span class="character">${equipment}</span>
                                </p>
                                <p class="info-item">
                                    Popular<span class="character"> ${popularity}</span>
                                </p>
                                <p class="info-item">
                                    Burned calories<span class="character"> ${burnedCalories}</span>
                                </p>
                            </div>
                            <p class="text-info">${description}</p>
                    </div>
            </div>
    `)
            }
            
        })
    }

}

// *==================================================*//
function deleteFromFavorites() {
    console.log('delete');
}
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
// *===================
export default { onClickStart };