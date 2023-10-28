import axios from 'axios';
import Notiflix from 'notiflix';
import { fetchParams } from './modal';
import { renderModalCard } from './modal';

const refs = {
    btnCloseRating: document.querySelector('.button-close-f'),
    btnSendRating: document.querySelector('.button-rating-form'),
    ratingModalWindow: document.querySelector('.backdrop-rating'),
    ratingForm: document.querySelector('.rating-form'),
    ratingItem: document.querySelectorAll('.rating__item-f'),
}


refs.btnCloseRating.addEventListener('click', onCloseBtnRating);
function onCloseBtnRating(e) {
    e.preventDefault();
    refs.ratingModalWindow.style.display = 'none';
}
function openRatingModal(value) {
    console.log(value);
    refs.ratingForm.setAttribute('data-id', value);
    refs.ratingModalWindow.style.display = '';
    // createRating()
}
//*=====  функція що відмальовує рейтинг з зірок =======*//

    const ratings = document.querySelectorAll('.rating-f');
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
            if (rating.classList.contains('rating-set')) {
                setRating(rating);
            }
        }
        function initRatingVars(rating) {
            ratingActive = rating.querySelector('.rating__active-f');
            ratingValue = rating.querySelector('.rating__value-f');
        }
        function setRatingActiveWidth(index = ratingValue.innerHTML) {
            const ratingActiveWidth = index / 0.05;
            ratingActive.style.width = `${ratingActiveWidth}%`;
        }
        function setRating(rating) {
            const ratingItems = rating.querySelectorAll('.rating__item-f');
            for (let index = 0; index < ratingItems.length; index++) {
                const ratingItem = ratingItems[index];
                ratingItem.addEventListener('mouseenter', function (e) {
                    //обновляємо змінні
                    initRatingVars(rating);
                    //обновляємо активні зірки
                    setRatingActiveWidth(ratingItem.value);
                })
                ratingItem.addEventListener('mouseleave', function (e) {
                    setRatingActiveWidth();
                })
                ratingItem.addEventListener('click', function (e) {
                    initRatingVars(rating);
                    // if (rating.dataset.ajax) {
                    //     //відправити на сервер
                    //     setRatingValue(ratingItem.value, rating);
                    // }
                    // else {
                        //відобразити вказану оцінку
                        ratingValue.innerHTML = index + 1;
                        setRatingActiveWidth();
                    //}
                })
            }
        }
    }

// *==================================================*//
//! =======частина Олексія =====//

let rating;
let email;
let msg;
const id = `64f389465ae26083f39b1b1f`;

refs.ratingForm.addEventListener('submit', addRating);
refs.ratingForm.email.addEventListener('input', event => {
    email = event.currentTarget.value;
});
refs.ratingForm.message.addEventListener('input', event => {
    msg = event.currentTarget.value;
});
//refs.btnCloseRating.addEventListener('click', onCloseBtnRating);

console.log(refs.ratingForm.message);
console.log(refs.ratingItem);

async function addRating(e) {
    e.preventDefault();
    try {
        for (let rate of refs.ratingItem) {
            if (rate.checked) {
                rating = rate.value;
                //   console.log(rate.value);
            }
        }

        const data = await patchRating(id, rating, email, msg);

        console.log(data);
        onCloseBtnRating(e);
        fetchParams(id)
            .then(renderModalCard)
            .catch(error => console.log);
    } catch (error) {
        if (error.response && error.response.data) {
            showErrorNotification(error.response.data.message);
        } else {
            console.log(error);
        }
    }

}

function patchRating(id, rating, email, msg) {
    //   console.log(email);
    //   console.log(rating);
    //   console.log(id);
    //   console.log(msg);
    return axios.patch(
        `https://your-energy.b.goit.study/api/exercises/${id}/rating`,
        {
            rate: Number(rating),
            email: email,
            review: msg,
        }
    );
}

function showErrorNotification(text) {
    Notiflix.Notify.failure(text, {
        position: 'right-top',
        timeout: 3000,
        fontSize: '18px',
        borderRadius: '40px',
    });
}

//! =========    ==========//
export { openRatingModal };