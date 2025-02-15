// var getPlaces=document.querySelector("#get-places");
var weatherDetails=document.querySelector("#weather-details");
var activities=document.querySelector("#activities-details");
var x = document.getElementById("demo");

//francis part
//google map section
//map search
function initAutocomplete() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 43.973810027649364, lng: -79.27475048680624},
    zoom: 13,
    mapTypeId: "roadmap",
  });
  // Create the search box and link it to the UI element.
  const input = document.getElementById("pac-input");
  const searchBox = new google.maps.places.SearchBox(input);
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", () => {
    searchBox.setBounds(map.getBounds());
  });
  let markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", () => {
    const places = searchBox.getPlaces();

    if (places.length == 0) {
      return;
    }
    // Clear out the old markers.
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];
    // For each place, get the icon, name and location.
    const bounds = new google.maps.LatLngBounds();
    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }
      const icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25),
      };
      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map,
          icon,
          title: place.name,
          position: place.geometry.location,
        })
      );
      GetLatlong();
      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}

//to get lat and long for the page for the page
function GetLatlong() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('pac-input').value;

  geocoder.geocode({
    'address': address
  }, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      getWeather(latitude,longitude);
    }
  });
}


//to display the weather for current location
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function showPosition(position) {
  getWeather(position.coords.latitude,position.coords.longitude);
}
//francis end



//Honey's part start

//get weather from lat and lon
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
      divEl.innerHTML=" ";
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
    var h2El=document.createElement("h3");
    h2El.classList="display-activity-header";
    activities.innerHTML="";
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
        buttonEl.textContent=activity[i];
        buttonEl.classList="display_btn";
        activities.appendChild(buttonEl);
    }
}
// getPlaces.addEventListener("click",displayLocation);
