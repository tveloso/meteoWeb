class Weather{
    constructor(json){
        this.condition = json["current_condition"]["icon"];
        this.temperature = json["current_condition"]["tmp"];
        this.wind = json["current_condition"]["wnd_spd"];
        this.city = json["city_info"]["name"];
        this.country = json["city_info"]["country"];
        this.arrayForecast = [];
        for(let i = 1; i<5; i++){
            let weatherForecast = new WeatherForecast(json,i);
            this.arrayForecast.push(weatherForecast);
        }
    }
    display(){
        let template = document.querySelector("#meteoDisplay");
        let container = document.querySelector(".container");
        let clone = document.importNode(template.content, true);
        let divCity = clone.querySelectorAll("div.city");
        if(this.city !== 'NA'){
            divCity[0].innerHTML += this.city;
        }
        else{
            divCity[0].innerHTML = '';
        }
        let divTemp = clone.querySelectorAll("div.temp");
        divTemp[0].innerHTML = this.temperature + divTemp[0].innerHTML;
        let divWind = clone.querySelectorAll("div.wind");
        divWind[0].innerHTML += this.wind+' km/h';
        let divCondition = clone.querySelectorAll("div.icon");
        let img = document.createElement('img');
        img.src = this.condition;
        divCondition[0].appendChild(img);
        container.appendChild(clone);

        for (let i = 0; i<this.arrayForecast.length;i++){
            this.arrayForecast[i].display();
        }
    }
}