const btnClose = document.querySelector('.button-close');
const btnAddFavorites = document.querySelector('.btn-add-favorites');
const btnRating = document.querySelector('.btn-rating');
const modalWindow = document.querySelector('.modal-window');
const backdrop = document.querySelector('.backdrop');
const heart = document.querySelector('.like-icon');

btnClose.addEventListener('click', onCloseModal);
btnAddFavorites.addEventListener('click', addToFavorites);

fetchParams("64f389465ae26083f39b18d9")
    .then(renderModalCard)
    .catch(error => console.log(error));



function onCloseModal() {
    console.log('hi');
    backdrop.classList.add('is-hidden');
}
function addToFavorites() {
    console.log('by');
    heart.classList.toggle('add-red');



}
function writeForm(event) {
    formData = {
        email: emailInput.value,
        message: messagesInput.value,
    };
    //formData[event.target.name] = event.target.value;
    //console.log(formData);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function fetchParams(id) {
    return fetch(`https://your-energy.b.goit.study/api/exercises/${id}`)
        .then(response => response.json())

}
function renderModalCard(data) {
    const card = createMarkupModal(data);
    modalWindow.insertAdjacentHTML('afterbegin', card);

}
function createMarkupModal(data) {

    return (`      
            <div class="info-card">
                <img src="${data.gifUrl}" alt="${data.name}" class="main-modal-img">
                    <div>
                        <h3 class="modal-header">${data.name}</h3>
                        <img src="./img/rating.png" alt="rating" class="rating-star">
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
    `)

}

