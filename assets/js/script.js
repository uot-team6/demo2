var getPlaces=document.querySelector("#get-places");
var weatherDetails=document.querySelector("#weather-details");

var displayLocation=function(event){
    event.preventDefault();


    getWeather(49.808,-99.9411);
}

var getWeather=function(lat,lon){
    var weatherApi="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=hourly,minutely&appid=a1ebf05a20a8fd712b4baf5c960acf21";
    console.log(weatherApi);
    fetch(weatherApi).then(function(response){
        response.json().then(function(data){
            weatherDetails.innerHTML=" ";
            displayWeather(data);
        })
    })

}

var displayWeather=function(data){
    var h3El=document.createElement("h3");
    h3El.textContent="Date: "+moment.unix(data.current.dt).format("Do MMM YYYY");
    weatherDetails.appendChild(h3El);
    
}

getPlaces.addEventListener("click",displayLocation);