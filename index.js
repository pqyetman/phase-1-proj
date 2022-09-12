const cityAPI = "http://localhost:3000/cities";

fetch(cityAPI)
  .then((res) => res.json())
  .then(renderCities);

function renderCities(cities) {
  characters.forEach(renderInfo);
}

function el(id) { 
    return document.getElementById(id);
  }

const cityBar = el("character-bar");
const detailedInfo = el("detailed-info");
const cityName = el("name");
const image = el("image");


let currentCity;


function renderCity(city) {
  const fcSpan = document.createElement("span");
  fcSpan.innerText = city.name;
  fcBar.append(fcSpan);

  fcSpan.addEventListener("click", () => {
    currentFc = city;
    info(city);
  });
}

function info(character) {
  cityName.innerText = character.name;
  image.src = character.image;
  voteCount.innerText = character.votes;
}

<script type="text/javascript" src="http://localhost:3000/characters"></script>