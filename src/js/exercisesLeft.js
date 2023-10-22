const quoteURL = "https://your-energy.b.goit.study/api/quote"

const refs = {
    quote: document.querySelector(".quote_text"),
    authorTitle: document.querySelector(".author_name"),
    favoriteEx: document.querySelector(".favorite_exercises"),
    defaultText: document.querySelector(".default_text"),
}

// ============================ОТРИМАННЯ ЦИТАТИ ДНЯ=====================================
quoteOfTheDay()
async function quoteOfTheDay() {
            try {
                const response = await fetch(quoteURL);

                if (response.ok) {
                    const data = await response.json();
                    const quote = data.quote;
                    const author = data.author;

                    refs.quote.innerHTML = quote;
                    refs.authorTitle.innerHTML = author;
                } else {
                    refs.quote.innerHTML = 'Не вдалося отримати цитату';
                    authorTitle.innerHTML = '';
                }
            } catch (error) {
                console.error(error);
                refs.quote.innerHTML = 'Помилка при отриманні цитати';
                authorTitle.textContent = ''; 
            }
        }