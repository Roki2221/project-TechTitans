// Цитата дня - GET https://your-energy.b.goit.study/api/quote
const quoteURL = "https://your-energy.b.goit.study/api/quote"

const refs = {
quote: document.querySelector(".quote_text")
}
console.log(refs.quote);
const quoteOfTheDay = async () => {
    const response = await fetch(quoteURL);
}
