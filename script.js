const API_KEY = "c82af7a1a8d34146a0ec05cb5e181d3c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await response.json();
  console.log(data);
  bindData(data.articles);
}

function bindData(articles){
    
}