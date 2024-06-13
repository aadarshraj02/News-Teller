const API_KEY = "c82af7a1a8d34146a0ec05cb5e181d3c";
const url = "https://newsapi.org/v2/everything?q=";

const newsInput = document.querySelector(".news-input");
const searchBtn = document.querySelector(".search-btn");

function reload() {
  window.location.reload();
}

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  try {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();

    if (data.articles && data.articles.length > 0) {
      bindData(data.articles);
    } else {
      showError();
    }
  } catch (error) {
    showError();
  }
}

function bindData(articles) {
  const cardsContainer = document.querySelector(".cards-container");
  const newsCardTemplate = document.querySelector("#template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardsClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardsClone, article);
    cardsContainer.appendChild(cardsClone);
  });
}

function fillDataInCard(cardsClone, article) {
  const newsImg = cardsClone.querySelector("#news-img");
  const newsTitle = cardsClone.querySelector("#news-title");
  const newsSrc = cardsClone.querySelector("#news-src");
  const newsDesc = cardsClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSrc.innerHTML = `${article.source.name}.${date}`;

  cardsClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

function showError() {
  const cardsContainer = document.querySelector(".cards-container");
  cardsContainer.innerHTML =
    "<p class = 'error'>No news found for the given query. Please try again.</p>";
}

let currentSelectedNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = navItem;
  currentSelectedNav.classList.add("active");
}

searchBtn.addEventListener("click", () => {
  const query = newsInput.value;
  if (!query) return;
  fetchNews(query);
  currentSelectedNav?.classList.remove("active");
  currentSelectedNav = null;
});
