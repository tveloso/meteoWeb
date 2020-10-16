var selectedTown;
const urlMeteo = 'https://www.prevision-meteo.ch/services/json';

function getTownWeather(town){
    if (town === undefined){
        town = document.querySelector('#town').value;
    }
    let url = urlMeteo+'/'+town;
    getWeather(url);
}

function getWeather(url) {
    fetch(url).then(response =>{
        response.json().then( 
             json => { 
                displayWeather(json)  
        })
});}

function displayWeather(json){
    let weather = new Weather(json);
    weather.display();
}
var jsonData;
const mapClass = new Map();
mapClass.map.on('click', onMapClick);
function onMapClick(e) {
    mapClass.popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mapClass.map);
        mapClass.map.setView(e.latlng,8);
    if(confirm('Show weather ?')){
        gpsPoint = new GPSPoint(e.latlng.lat,e.latlng.lng);
        let url = gpsPoint.getUrlJson();
        console.log(url);
        getWeather(url);
    }
}

function getTownsVicopo(){
    selectedTown = document.querySelector('#town').value;
    let url = 'https://vicopo.selfbuild.fr/?city='+selectedTown;
    getCities(url);
}

function getCities(url){
    fetch(url).then(response =>{
        response.json().then( 
            json => { 
                displayOptions(json) 
        })
    });
}

function displayOptions(json){
    jsonData = json;
    let div = document.querySelector("#select");
    div.innerHTML = '';
    if(json.cities[0]){
        if(json.cities[1] || selectedTown.toLowerCase() != json.cities[0].city.toLowerCase()){
            let template = document.querySelector("#townsSelect");
            let clone = document.importNode(template.content, true);
            div.appendChild(clone);
            let select = document.querySelector("#townSelect");
            for(let key in json.cities){
            let option = document.createElement("option");
            option.text = json.cities[key].code+' '+json.cities[key].city;
            select.add(option);
            }
        }
    }
    else{
        alert("ville inconnue!");
    }
}

function getSelectedTownWeather(){
    let selectTown = document.getElementById("townSelect"); 
    let town = selectTown.options[selectTown.selectedIndex].value;
    let cpt = 0;
    for(let key in jsonData.cities){
        if (jsonData.cities[key].city === town.substr(6)){
            cpt++;
            if(cpt > 1){
                break;
            }
        }

    }
    if (cpt>1){
        town = town.substr(6)+'-'+town.substr(0,2);
    }
    else{
        town = town.substr(6);
    }
    getTownWeather(town);
}


