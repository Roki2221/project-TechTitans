import axios from 'axios';
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
//! =======частина Олексія =====//
refs.ratingForm.addEventListener('submit', addRating);

const email = 'v1234567@gmail.com';
const id = `64f389465ae26083f39b1b1f`;
console.log(refs.ratingForm);
console.log(refs.ratingItem);

async function addRating(e) {
    e.preventDefault();
    for (let rate of refs.ratingItem) {
        if (rate.checked) {
            rating = rate.value;
            console.log(rate.value);
        }
    }
    const data = await patchRating(rating);
    console.log(data);
}

function patchRating(rating) {
    return axios.patch(
       ` https://your-energy.b.goit.study/api/exercises/${id}/rating`,
        {
            rate: rating,
            email: email,
        }
    );
}
//! =========    ==========//