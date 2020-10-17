class WeatherForecast{
    constructor(json,id){
        this.day = json["fcst_day_"+id]["day_short"];
        this.condition = json["fcst_day_"+id]["icon"];
        this.id = id;
    }
    display(){
        let future = document.querySelectorAll(".future");
        let div = document.createElement('div');
        div.className = 'day';
        let h3 = document.createElement('h3');
        h3.innerText = this.day;
        let p = document.createElement('p');
        let img = document.createElement('img');
        img.src = this.condition;
        p.appendChild(img);
        div.appendChild(h3);
        div.appendChild(p);
        future[future.length-1].appendChild(div);
    }
}