

const cityAPI = "http://localhost:3000/cities";

function getCities (){

  return fetch(cityAPI)
  .then((res) => res.json())}



function renderCities(cities) {
  
  cities.forEach(renderInfo);
}


const cityBar = document.getElementById("character-bar");
const detailedInfo = document.getElementById("detailed-info");
const cityName = document.getElementById("name");
const image = document.getElementById("image");


let currentCity;

function renderCity(city) {
  const fcSpan = document.createElement("span");

  fcSpan.innerText = city.name;
  document.querySelector('#character-bar').append(fcSpan);

  fcSpan.addEventListener("click", () => {
    
      cityName.textContent = city.name
      image.src = city.image   


    /*
      <div class="characterInfo">
        <div id="detailed-info">
          <p id="name">Character's Name</p>
          <img
            id="image"
            alt="Character's Name">
        </div>
        */
  
  });
}

function info(city) {

  cityName.innerText = city.name;
  image.src = city.image;

  }

getCities().then(data => data.forEach(renderCity))