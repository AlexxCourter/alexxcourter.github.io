//appID owned by website author, Alex Courter
const appID = "2f35ec7ffdcd2042fc4fe8fc077b764f";
//latitude and longitude of selected location: Neptune City
const lat = "40.198162";
const lon = "-74.029536";

//date object for 3 day forecast
const date_obj = new Date()
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const today = date_obj.getDay()

//reference URL
const refURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely&appid=${appID}`;

fetch(refURL)
  .then((response) => response.json())
  .then((jsObject) => {
    //weather description
    document.getElementById('desc').textContent = jsObject.current.weather[0].description;
    //temperatures
    document.getElementById('current-temp').textContent = `${jsObject.current.temp}\xB0 F`; //currently
    //humidity
    document.getElementById('humid').textContent = `Humidity: ${jsObject.current.humidity}%`;
    //icon
    let img1 = document.createElement("img");
    let iconcode = jsObject.current.weather[0].icon;
    const iconURL = "//openweathermap.org/img/w/" + iconcode + ".png";
    img1.src = iconURL;
    document.getElementById('icon').appendChild(img1);
    //3 day forecast
    day = today;
    for (let i = 0; i < 3; i++) {
        
        if (day > 6) {
            day = 0;
        }
        //create elements of card
        let div1 = document.createElement("div");
        let span1 = document.createElement("span");
        let p1 = document.createElement("p");

        //calculate daily temperatures
        p1.textContent = weekdays[day];
        span1.textContent = `${jsObject.daily[i].temp.day}\xB0 F`;

        //add children elements to div, add div to weather section
        div1.appendChild(p1);
        div1.appendChild(span1);
        div1.setAttribute('class', 'forecast');
        document.querySelector('.weather').appendChild(div1);
        day++;
    }
    
    const weatherAlert = document.querySelector("#alert-box");
    if (jsObject.alerts) {
        let wa1 = document.createElement("p");
        let wa2 = document.createElement("p");
        let wa3 = document.createElement("button");
        wa1.textContent = "WEATHER ALERT:";
        wa2.textContent = jsObject.alerts.event + " - " + jsObject.alerts.description;
        wa3.textContent = "Close";
        wa3.setAttribute("onclick", 'closeBox()');

        weatherAlert.appendChild(wa1);
        weatherAlert.appendChild(wa2);
        weatherAlert.appendChild(wa3);
    } else {weatherAlert.setAttribute("class", "hideme");}

}); //end weather summary fetch