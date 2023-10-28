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
};

let rating;
let email;
let msg;
const id = `64f389465ae26083f39b1b1f`;

refs.btnCloseRating.addEventListener('click', onCloseBtnRating);
refs.ratingForm.addEventListener('submit', addRating);
refs.ratingForm.email.addEventListener('input', event => {
  email = event.currentTarget.value;
});
refs.ratingForm.message.addEventListener('input', event => {
  msg = event.currentTarget.value;
});

// console.log(refs.ratingForm.message);
console.log(refs.ratingItem);

async function addRating(e) {
  e.preventDefault();
  console.log('hi');
  try {
    for (let rate of refs.ratingItem) {
      if (rate.checked) {
        rating = rate.value;
        //   console.log(rate.value);
      }
    }

    const data = await patchRating(id, rating, email, msg);

    console.log(data);
    // onCloseBtnRating();
    console.log(id);
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
  //   console.log(rating);
  return axios.patch(
    `https://your-energy.b.goit.study/api/exercises/${id}/rating`,
    {
      rate: Number(rating),
      email: email,
      review: msg,
    }
  );
}

function onCloseBtnRating(e) {
  e.preventDefault();
  refs.ratingModalWindow.style.display = 'none';
}

function showErrorNotification(text) {
  Notiflix.Notify.failure(text, {
    position: 'right-top',
    timeout: 3000,
    fontSize: '18px',
    borderRadius: '40px',
  });
}
