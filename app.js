const createTab = document.getElementById("createTab");
const oldTab = document.getElementById("oldTab");

const createSection = document.getElementById("createSection");
const oldSection = document.getElementById("oldSection");

const getQuoteBtn = document.getElementById("getQuoteBtn");
const quoteBox = document.getElementById("quoteBox");
const quoteText = document.getElementById("quoteText");

const saveBtn = document.getElementById("saveBtn");
const skipBtn = document.getElementById("skipBtn");

const quoteList = document.getElementById("quoteList");

let currentQuote = "";

/* NAVBAR */
createTab.onclick = () => {
  createSection.classList.add("active");
  oldSection.classList.remove("active");
};

oldTab.onclick = () => {
  createSection.classList.remove("active");
  oldSection.classList.add("active");
  renderQuotes();
};

/* CREATE QUOTE — AXIOS */
getQuoteBtn.onclick = async () => {
  try {
    const res = await axios.get("https://dummyjson.com/quotes/random");
    currentQuote = res.data.content;
    quoteText.textContent = currentQuote;
    quoteBox.classList.remove("hidden");
  } catch (err) {
    quoteText.textContent = "Quote yüklənmədi 😔";
    quoteBox.classList.remove("hidden");
  }
};

/* SAVE TO LOCALSTORAGE */
saveBtn.onclick = () => {
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];
  quotes.push(currentQuote);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  quoteBox.classList.add("hidden");
};

/* SKIP */
skipBtn.onclick = () => {
  quoteBox.classList.add("hidden");
};

/* OLD QUOTES */
function renderQuotes() {
  quoteList.innerHTML = "";
  const quotes = JSON.parse(localStorage.getItem("quotes")) || [];

  if (quotes.length === 0) {
    quoteList.innerHTML = "<li>Heç bir quote yoxdur 💙</li>";
    return;
  }

  quotes.forEach((q, i) => {
    const li = document.createElement("li");
    li.textContent = q;

    const btn = document.createElement("button");
    btn.textContent = "Sil";
    btn.onclick = () => {
      quotes.splice(i, 1);
      localStorage.setItem("quotes", JSON.stringify(quotes));
      renderQuotes();
    };

    li.appendChild(btn);
    quoteList.appendChild(li);
  });
}

