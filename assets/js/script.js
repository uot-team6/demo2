var getPlaces=document.querySelector("#get-places");
var weatherDetails=document.querySelector("#weather-details");
var activities=document.querySelector("#activities-details");

//to display location
var displayLocation=function(event){
    event.preventDefault();


    getWeather(49.808,-99.9411);
}

//to get weather accoring to the location
var getWeather=function(lat,lon){
    var weatherApi="https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&APPID=a1ebf05a20a8fd712b4baf5c960acf21";
    fetch(weatherApi).then(function(response){
        response.json().then(function(data){
            weatherDetails.innerHTML=" ";
            displayWeather(data);
        })
    })

}

//to display weather
var displayWeather=function(data){
    
    for(var i=0;i<1;i++){
        var divEl=document.createElement("div");
        divEl.classList="three-weather";

        var weatherCode=data.daily[i].weather[0].icon;
        var icon="http://openweathermap.org/img/wn/"+weatherCode+".png";
        var imgEl=document.createElement("img");
        imgEl.setAttribute("src",icon);
        divEl.appendChild(imgEl);
        
        var h2El=document.createElement("h2");
        h2El.textContent="Date: "+moment.unix(data.daily[i].dt).format("Do MMM YYYY");
        divEl.appendChild(h2El);

        var arr=[data.daily[i].temp.day,data.daily[i].wind_speed,data.daily[i].humidity];
        var arrName=["Temp: ","Wind: ","Humidity: "];
        var arrSymbol=["° F"," MPH"," %"];
        for(var j=0;j<arr.length;j++){
            var pEl=document.createElement("p");
            pEl.textContent=arrName[j]+arr[j]+arrSymbol[j];
            divEl.appendChild(pEl);
        }
        weatherDetails.appendChild(divEl);
        weatherDetails.style.padding="20px";

        getActivities(data.daily[0].weather[0].main);
    }
}

//get activities according to the weather
var getActivities=function(weatherCondition){
    console.log(weatherCondition);
    var h2El=document.createElement("h2");
    h2El.classList="display-activity-header";
    var pEl1=document.createElement("p");
    var pEl2=document.createElement("p");
    if(weatherCondition=="Clouds"){
        h2El.textContent="Today's weather is going to be cloudly."
        activities.appendChild(h2El);
        var cloud_activities=["Visit a Museum/Art-Gallery/Library","Go see a movie","Go to shopping","Go visit club/cafe/resturant"];
        displayActivities(cloud_activities);
    }
    else if(weatherCondition=="Rain"){
        var rain_activities=["Visit a Museum/Art-Gallery/Library","Go see a movie","Go to shopping","Go visit club/cafe/resturant"];
        h2El.textContent="Today is going to Rain. Make sure to carry an Umbrella."
        activities.appendChild(h2El); 
        displayActivities(rain_activities);
    }
    else if(weatherCondition=="Thunderstrom"){
        h2El.textContent="It's not recomended to go out because there are chances of thunder strom today!";
        activities.appendChild(h2El); 
    }
    else if(weatherCondition=="Drizzle"){
        h2El.textContent="Today there are chances of Drizzle.So make sure to carry an umbrella.";
        activities.appendChild(h2El); 
        var rain_activities=["Visit a Museum/Art-Gallery/Library","Go see a movie","Go to shopping","Go visit club/cafe/resturant"];
        displayActivities(rain_activities);
    }
    else if(weatherCondition=="Clear"){
        h2El.textContent="Today's weather is going to be clear."
        activities.appendChild(h2El);
        var clear_activities=["Go to a beach","Go to a Park","Go see a movie"];
        displayActivities(clear_activities);
    }
    else if(weatherCondition=="Snow"){
        h2El.textContent="Today is going to have a snowfall, so it's recommended to keep your self warm";
        activities.appendChild(h2El);
        var rain_activities=["Visit a Museum/Art-Gallery/Library","Go see a movie","Go to shopping","Go visit club/cafe/resturant"];
        displayActivities(rain_activities);
    }
}

//to display activities according to the weather
var displayActivities=function(activity){
    for(var i=0;i<activity.length;i++){
        var buttonEl=document.createElement("button");
        buttonEl.setAttribute("id","button"+i);
        console.log(buttonEl);
        buttonEl.textContent=activity[i];
        buttonEl.classList="display_btn";
        activities.appendChild(buttonEl);
        console.log(activity[i]);
        
    }
}
getPlaces.addEventListener("click",displayLocation);