"use strict";

import axios from "axios";

const refs = {
    cardList: document.querySelector(".exercise-card-list"),
    buttonList: document.querySelectorAll(".exercise-section-button"),
}

let exerciseMarkup = "";
let exerciseCardFilterText = "Body parts"
let limit = 12;

if (window.innerWidth < 768) {
    limit = 9;
}

refs.buttonList.forEach(button => {
    button.addEventListener("click", handleClick);
})

function handleClick(event) {
    refs.cardList.innerHTML = '';

    const activeButton = document.querySelector(".js-active-filter-button");
    const currentButton = event.currentTarget;

    activeButton.disabled = false;
    activeButton.classList.remove("js-active-filter-button");
    
    currentButton.classList.add("js-active-filter-button");
    currentButton.disabled = true;

    const query = currentButton.dataset.filter; 
    
    markupExerciseCards(query);
}

async function getExerciseCardsData(query, limit) {
    try {
        const endpoint = `https://your-energy.b.goit.study/api/filters?filter=${query}&page=1&limit=${limit}`;
        const res = await axios.get(endpoint);
        const data = await res.data;
        return data;
    } catch (error) {
        console.log(error);
        document.querySelector(".exercise-error").style.display = "block";
    }
}

async function markupExerciseCards(query) {
    exerciseCardFilterText = query.split("%20").join(' ');

    exerciseMarkup = "";

    const { results: cards } = await getExerciseCardsData(query, limit);

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
    })

    refs.cardList.innerHTML = exerciseMarkup;
}

markupExerciseCards("Body%20parts");