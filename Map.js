class Map{
    constructor(){
        this.map = L.map('map').setView([44.837789,-0.57918], 6);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20
        }).addTo(this.map);
        this.popup = L.popup();
        this.map.options.minZoom = 4;
    }
}