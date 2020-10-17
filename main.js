var selectedTown;

const urlMeteo = 'https://www.prevision-meteo.ch/services/json/';

var jsonData;

const mapClass = new Map();
mapClass.map.on('click', onClickMap);

let buttonGo = document.querySelector("#go");
buttonGo.addEventListener('click', (e) => {
    getTownsVicopo();
});

function getTownWeather(town) {
    if (!town) {
        town = document.querySelector('#town').value;
    }
    let url = urlMeteo + town;
    getWeather(url);
}

function getWeather(url) {
    fetchJSONFromURL(url, displayWeather);
}

function displayWeather(json){
    let weather = new Weather(json);
    weather.display();
}



function onClickMap(e) {
    mapClass.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapClass.map);
        mapClass.map.setView(e.latlng,8);
    if (confirm('Show weather ?')) {
        gpsPoint = new GPSPoint(e.latlng.lat,e.latlng.lng);
        let url = gpsPoint.getUrlJson();
        console.log(url);
        getWeather(url);
    }
}

function getTownsVicopo() {
    selectedTown = document.querySelector('#town').value;
    let url = `https://vicopo.selfbuild.fr/?city=${selectedTown}`;
    getCities(url);
}

function getCities(url) {
    fetchJSONFromURL(url, displayOptions);
}

function fetchJSONFromURL(url, callback) {
    fetch(url)
        .then(response => response.json())
        .catch(error => console.error(error))
        .then(json => { callback(json); })
        .catch(error => console.error(error));
}

function displayOptions(json) {
    jsonData = json;
    let div = document.querySelector("#select");
    div.innerHTML = '';
    if (json.cities[0]) {
        if (json.cities[1] || selectedTown.toLowerCase() != json.cities[0].city.toLowerCase()) {
            let template = document.querySelector("#townsSelect");
            let clone = document.importNode(template.content, true);
            div.appendChild(clone);
            let select = document.querySelector("#townSelect");
            for(let key in json.cities){
            let option = document.createElement("option");
            option.text = json.cities[key].code+' '+json.cities[key].city;
            select.add(option);
            }
            // Supprimer le onchange dans le html du coup
            select.addEventListener('change', (e) => {
                onChangeSelectedTownWeather(e);
            });
        }
    }
    else {
        alert("ville inconnue!");
    }
}

function onChangeSelectedTownWeather(e) {
    const selectedTown = e.target.value;
    let filteredCities = [];
    let town;
    if (jsonData && Array.isArray(jsonData.cities) && jsonData.cities.length > 0) {
        filteredCities = jsonData.cities.filter(city => selectedTown.substr(6) === city.city);
        
    } else {
        console.error(`Error : ${jsonData} ${jsonData.cities}`);
    }
    
    if (filteredCities.length > 1) {
        town = `${selectedTown.substr(6)}-${selectedTown.substr(0,2)}`;
    } else {
        town = selectedTown.substr(6);
    }
    getTownWeather(town);
}
