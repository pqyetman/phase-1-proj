

//Creating constants for the URLs
const cityAPI = "http://localhost:3000/cities";

const newYorkAPI = `http://www.7timer.info/bin/api.pl?lon=-74.00&lat=40.71&product=civillight&output=json`

const sanFranciscoAPI = `http://www.7timer.info/bin/api.pl?lon=-122.41&lat=37.77.00&product=civillight&output=json`

const houstonAPI = `http://www.7timer.info/bin/api.pl?lon=-95.36&lat=29.76&product=civillight&output=json`

const denverAPI = `http://www.7timer.info/bin/api.pl?lon=-104.99&lat=39.74&product=civillight&output=json`


//Global DOM Grab
const cityBar = document.getElementById("weather-bar");
const cityName = document.getElementById("name");
const image = document.getElementById("image");



//Fetch Functions to get Data from local db.json
function getCities() {

  return fetch(cityAPI)
    .then((res) => res.json())
}

//Fetch Functions to get Data from 7Timer!

function getCitiesWeather(url) {

  return fetch(url)
    .then((res) => res.json())
}

//Passing Fetched data into render city functions

getCities().then(data => data.forEach(renderCity))

//

//Render City 

function renderCity(city) {

  const fcSpan = document.createElement("span");
  fcSpan.innerText = city.name;
  cityBar.append(fcSpan)

  fcSpan.addEventListener("click", () => {

    cityName.textContent = city.name
    image.src = city.image
    selectCityandDay()

  });
}


function selectCityandDay(day = 0 ) {

  switch (cityName.textContent) {

    case 'New York City, NY':
      getCitiesWeather(newYorkAPI).then(data => renderWeather((data.dataseries[day])));
      break;
    case 'Houston, TX':
      getCitiesWeather(houstonAPI).then(data => renderWeather((data.dataseries[day])));
      break;
    case 'Denver, CO':
      getCitiesWeather(denverAPI).then(data => renderWeather((data.dataseries[day])));
      break;
    case 'San Francisco, CA':
      getCitiesWeather(sanFranciscoAPI).then(data => renderWeather((data.dataseries[day])));
      break;

  }
}

//Declare constants to grab each radio button
const todayRadio = document.getElementById('today')
const tomRadio = document.getElementById('tomorrow')
const twoDayRadio = document.getElementById('twoDays')

const grabForm = document.getElementById('dayselector')

//add event listeners to radio buttons
todayRadio.addEventListener("change", (e) => showDay(e.target.value));
tomRadio.addEventListener("change", (e) => showDay(e.target.value));
twoDayRadio.addEventListener("change", (e) => showDay(e.target.value));

//usea  a funcion to select the correct radio value and pass it to the renderweather 
//this changes array value to corrrect day-num

function showDay(radioValue) {

  switch (radioValue) {

    case 'today':
      selectCityandDay(0);
      break;
    case 'tomorrow':
      selectCityandDay(1);
      break;
    case 'twoDays':
      selectCityandDay(2);
      break;
  }
}



function renderWeather(cityAPI) {

  //console log to test data
  console.log(cityAPI)

  //DOM grab inside render function

  const date = document.getElementById("Date")
  const temp = document.getElementById("Temp")
  const weather = document.getElementById("Weather")
  const wind = document.getElementById("Wind")

  //assigning values to grabbed DOM elements
  let tempF = parseInt(cityAPI.temp2m.max, 10) * (9 / 5) + 32
  let tempFRound = tempF.toFixed(1)
  date.textContent = reOrderDate(cityAPI.date)
  temp.textContent = `Max Daily Temperature is: ${tempFRound}°F`
  weather.textContent = interpretWeatherAPI(cityAPI.weather)
  wind.textContent = `Wind Conditions: ${interpretWindAPI(cityAPI.wind10m_max)}`

}


//Function to change API data format
function reOrderDate(APIdate) {

  let dateStr = APIdate.toString()
  const dateFirst = dateStr.slice(0, 4);
  const dateMiddle = dateStr.slice(4, 6);
  const dateLast = dateStr.slice(6, 8);
  let fixedDate = `Date:  ${dateMiddle}/${dateLast}/${dateFirst}`

  return fixedDate
}

//Function to change API wind data 

function interpretWindAPI(windAPI) {
  let windAPIstr = `${windAPI}`
  let output = ''

  switch (windAPIstr) {

    case '1':
      output = 'Calm Breeze';
      break;

    case '2':
      output = 'Light Breeze';
      break;

    case '3':
      output = 'Moderate Breeze';
      break;

    case '4':
      output = 'Fresh Beeze';
      break;

    case '5':
      output = 'Strong Winds';
      break;

    case '6':
      output = 'Gale Force Winds';
      break;

    case '7':
      output = 'Stormy Winds';
      break;
    case '8':
      output = 'Here I am...rock you like a hurricane';
      break;

  }
  return output

}

//Function to change API weather data i.e. the most annoying switch statment evet

function interpretWeatherAPI(weatherAPI) {
  let output = ''

  switch (weatherAPI) {

    case 'clear':
      output = 'Total cloud cover less than 20%';
      break;

    case 'pcloudy':
      output = 'Total cloud cover between 20%-60%';
      break;

    case 'mcloudy':
      output = 'Total cloud cover between 60%-80%';
      break;

    case 'cloudy':
      output = 'Total cloud cover between 60%-80%';
      break;

    case 'humid':
      output = 'Relative humidity over 90% with total cloud cover less than 60%';
      break;

    case 'lightrain':
      output = 'Rainfall less than 4mm/hr with total cloud cover more than 80%';
      break;

    case 'oshower':
      output = 'Rainfall rate less than 4mm/hr with total cloud cover between 60%-80%';
      break;

    case 'ishower':
      output = 'Rainfall less than 4mm/hr with total cloud cover less than 60%';
      break;

    case 'lightsnow':
      output = 'SnowFall rate less than 4mm/hr';
      break;

    case 'rain':
      output = 'Rainfall rate over 4mm/hr';
      break;

    case 'snow':
      output = 'SnowFall rate over 4mm/hr';
      break;

    case 'rainsnow':
      output = 'Precipitation type to be ice pellets or freezing rain';
      break;

  }
  return output
}





// js for button(lightSwitch) that toggles on/off dark mode
const lightSwitch = document.getElementById('light-switch')

lightSwitch.addEventListener('click', checkMode)

//checks whether dark mode is on or off and acts accordingly
function checkMode() {
  if (lightSwitch.checked) {
    console.log('dark on');
    darkModeOn();
  }
  else {
    console.log('dark off');
    darkModeOff();
  }
}

function darkModeOn() {
  document.body.classList.add('dark-mode');
}

function darkModeOff() {
  document.body.classList.remove('dark-mode');
}


//Button for music

let playBtn = document.getElementById('play');
let stopBtn = document.getElementById('stop');
let playSound = function () {
  audio.play();
};
playBtn.addEventListener('click', playSound, false);
stopBtn.addEventListener('click', function () { audio.pause() }, false);



