"use strict";

const refs = {
    cardList: document.querySelector(".exercise-card-list"),
    buttonList: document.querySelectorAll(".exercise-section-button"),
}

let exerciseMarkup = "";
let exerciseCardFilterText = "Body parts"
let perPage;

if (window.innerWidth < 768) {
    perPage = 9;
} else {
    perPage = 12;
}

refs.buttonList.forEach(button => {
    button.addEventListener("click", handleClick);
});

function handleClick(event) {
    refs.cardList.innerHTML = '';

    const activeButton = document.querySelector(".js-active-button");
    const currentButton = event.currentTarget;

    activeButton.disabled = false;
    activeButton.classList.remove("js-active-button");

    currentButton.classList.add("js-active-button");
    currentButton.disabled = true;

    const queryWord = currentButton.dataset.filter; 
    
    markupExerciseCards(queryWord);
}

async function gettingExerciseCardsData(queryWord, perPage) {
    try {
        const END_POINT = `https://your-energy.b.goit.study/api/filters?filter=${queryWord}&page=1&limit=${perPage}`;
        const res = await axios.get(END_POINT);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function markupExerciseCards(queryWord) {
    if (queryWord === "Body%20parts") {
        exerciseCardFilterText = "Body parts"
    } else {
        exerciseCardFilterText = queryWord;
    }

    refs.cardList.innerHTML = "";
    exerciseMarkup = "";

    const { results: cards } = await gettingExerciseCardsData(queryWord, perPage);
    console.log(cards); 

    cards.forEach(card => {
        exerciseMarkup += `
        <li class="exercise-card-item">
            <img class="exercise-card-img" src="${card.imgURL}" alt="${card.name} card exercises">
            <div class="exercise-card-text-container">
                <h2 class="exercise-card-title">${card.name}</h2>
                <p class="exercise-card-filter">${exerciseCardFilterText}</p>
            </div>
        </li>
        `
    });

    refs.cardList.innerHTML = exerciseMarkup;
}

markupExerciseCards("Body%20parts");