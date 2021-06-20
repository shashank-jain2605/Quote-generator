//selecting elements:
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");
console.log(loader);
console.log(authorText);

let apiQuotes = [];

//show loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//hide loading
function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show new quote
function newQuote() {
  showLoadingSpinner();
  //pick a random quote from apiQuotes array
  console.log(apiQuotes);
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
  //to check null author field
  if (!quote.author) {
    authorText.textContent = "anonymous";
  } else {
    authorText.textContent = quote.author;
  }

  //check quote length
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote, hide loader
  removeLoadingSpinner();
  quoteText.textContent = quote.text;
}

// get quotes from api

async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    // catch error here
    console.error(err.message);
  }
}

//tweet quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

//event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

//on load
getQuotes();
