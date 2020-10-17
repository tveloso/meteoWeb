class GPSPoint{
    constructor(latitude,longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }
    getUrlJson(){
        return urlMeteo+'lat='+this.latitude+'lng='+this.longitude;
    }
}