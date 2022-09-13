
document.addEventListener("DOMContentLoaded", ()=> {

  //Creating constants for the URLs
const cityAPI = "http://localhost:3000/cities";

const newYorkAPI = `http://www.7timer.info/bin/api.pl?lon=-74.00&lat=40.71&product=civillight&output=json`

const sanFranciscoAPI = `http://www.7timer.info/bin/api.pl?lon=-122.41&lat=37.77.00&product=civillight&output=json`

const houstonAPI = `http://www.7timer.info/bin/api.pl?lon=-95.36&lat=29.76&product=civillight&output=json`

const denverAPI = `http://www.7timer.info/bin/api.pl?lon=-104.99&lat=39.74&product=civillight&output=json`


//Global DOM Grab
const cityBar = document.getElementById("character-bar");
const cityName = document.getElementById("name");
const image = document.getElementById("image");



//Fetch Functions to get Data from local db.json
function getCities (){

    return fetch(cityAPI)
    .then((res) => res.json())

  }

  //Fetch Functions to get Data from 7Timer!

function getCitiesWeather (url) {

    return fetch(url)
    .then((res) => res.json())
}

//Passing Fetched data into rendering functions



getCities().then(data => data.forEach(renderCity))


function renderWeather (cityAPI) {

  //console log to test data
  console.log(cityAPI)

    //DOM grab inside render function

    const date = document.getElementById("Date")
    const temp = document.getElementById("Temp")
    const weather = document.getElementById("Weather")
    const wind = document.getElementById("Wind")

  //assigning values to grabbed DOM elements
  let tempF = parseInt(cityAPI.temp2m.max, 10)*(9/5) + 32
  let tempFRound = tempF.toFixed(1)
  date.textContent = cityAPI.date
  temp.textContent = `Max Daily Temperature is: ${tempFRound}°F`
  weather.textContent = cityAPI.weather  
  wind.textContent = cityAPI.wind10m_max

}



function renderCity(city) {

  const fcSpan = document.createElement("span");
  fcSpan.innerText = city.name;
  cityBar.append(fcSpan);

  fcSpan.addEventListener("click", () => {
    
      cityName.textContent = city.name
      image.src = city.image 
  
      if (city.name === 'New York City, NY') {

        return getCitiesWeather(newYorkAPI).then(data => renderWeather((data.dataseries[0])));
      }

      else if (city.name === "Houston, TX") {

        return getCitiesWeather(houstonAPI).then(data => renderWeather((data.dataseries[0])));
      }

      else if(city.name === 'Denver, CO') {

       return getCitiesWeather(denverAPI).then(data => renderWeather((data.dataseries[0])));

      }

      else if (city.name === 'San Francisco, CA') {

       return getCitiesWeather(sanFranciscoAPI).then(data => renderWeather((data.dataseries[0])));
      }



  
    });
}




})