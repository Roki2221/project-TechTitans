import axios from 'axios';
import Notiflix from 'notiflix';

Notiflix.Notify.init({
  position: 'center-top',
  messageMaxLength: 200,
  width: '300px',
});

const refs = {
  form: document.querySelector('form.subscribe-form'),
};

refs.form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const inputData = event.currentTarget.elements.email.value.trim();

  // const pattern = new RegExp(event.currentTarget.elements.email.pattern);
  // if (!pattern.test(inputData)) {
  //   alert(
  //     'The email must be in format test@gmail.com (after "@" dont use numbers and symblos like "-, _," etc.'
  //   );
  //   return;
  // }

  subscribeService(inputData)
    .then(({ data }) => {
      Notiflix.Notify.success(data.message);
      refs.form.reset();
    })
    .catch(({ response }) => {
      Notiflix.Notify.info(response.data.message);
      if (response.status === 409) {
        refs.form.reset();
      }
    });
}

function subscribeService(email) {
  return axios.post('https://your-energy.b.goit.study/api/subscription', {
    email: email,
  });
}
