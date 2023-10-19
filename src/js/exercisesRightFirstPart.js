'use strict';

const refs = {
    cardList: document.querySelector(".exercise-card-list")
}

const END_POINT = "https://your-energy.b.goit.study/api/filters?filter=Body%20parts&page=1&limit=9";

let exerciseMarkup = '';

async function gettingExerciseCardsData() {
    try {
        const res = await axios.get(END_POINT);
        console.log(res);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function markupExerciseCards() {
    refs.cardList.innerHTML = '';
    exerciseMarkup = '';

    const { results: cards } = await gettingExerciseCardsData();
    console.log(cards); 

    cards.forEach(card => {
        exerciseMarkup += `
        <li class="exercise-card-item">
            <img class="exercise-card-img" src="${card.imgURL}" alt="${card.name} card exercises">
            <div class="exercise-card-text-container">
                <h2 class="exercise-card-title">${card.name}</h2>
                <p class="exercise-card-filter">Body parts</p>
            </div>
        </li>
        `
    });

    refs.cardList.innerHTML = exerciseMarkup;
}

markupExerciseCards();