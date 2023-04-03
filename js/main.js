console.log('Weather App');

let form = document.getElementById('weatherForm');

form.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e){
    e.preventDefault(e);
    let cityName = e.target.cityName.value;
    console.log(cityName);

    let cityWeather = await getCityWeather(cityName);
    console.log(cityWeather);

    buildCityWeatherCard(cityWeather);

    e.target.cityName.value = '';
}

async function getCityWeather(cityName){
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/current.json?key"API KEY HERE"${cityName}`);
        let data = await response.json();
        return data;
    } catch(err){
        console.error(err);
    };
};


function buildCityWeatherCard(data){
    let card = document.createElement('div');
    card.className = 'card h-100';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let cityName = document.createElement('h5');
    cityName.innerHTML = data.location.name;
    cityName.className = 'card-title';

    let cityCurrent = document.createElement('p');
    cityCurrent.innerHTML = `Currently: ${data.current.condition.text}`;
    cityCurrent.className = 'card-text';

    let cityTemp = document.createElement('p');
    cityTemp.innerHTML = `Current Temperature is: ${data.current.temp_f}`;
    cityTemp.className = 'card-text';

    let cityTempFeelsLike = document.createElement('p');
    cityTempFeelsLike.innerHTML = `Current Temperature Feels Like: ${data.current.feelslike_f}`;
    cityTempFeelsLike.className = 'card-text';

    cardBody.append(cityName);
    cardBody.append(cityCurrent);
    cardBody.append(cityTemp);
    cardBody.append(cityTempFeelsLike);

    card.append(cardBody);

    let col = document.createElement('div');
    col.className = 'col-12 col-md-6 col-lg-3 my-3';

    col.append(card);

    let weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.append(col);
};