const appID = "2f35ec7ffdcd2042fc4fe8fc077b764f"
// PRESTON DATA
const prestonID = "5604473"
// SODA SPRINGS DATA
const sodaSpringsID = "5607916"
// FISH HAVEN DATA
const fishHavenID = "5585000"

//preston default
let apiURL = `//api.openweathermap.org/data/2.5/weather?id=${prestonID}&units=imperial&appid=${appID}`;
let forecastURL = `//api.openweathermap.org/data/2.5/forecast?id=${prestonID}&units=imperial&appid=${appID}`;

//change to soda springs
if (document.getElementById("town-name").textContent == "Soda Springs") {
  apiURL = `//api.openweathermap.org/data/2.5/weather?id=${sodaSpringsID}&units=imperial&appid=${appID}`;
  forecastURL = `//api.openweathermap.org/data/2.5/forecast?id=${sodaSpringsID}&units=imperial&appid=${appID}`;
}

//change to fish haven
if (document.getElementById("town-name").textContent == "Fish Haven") {
  apiURL = `//api.openweathermap.org/data/2.5/weather?id=${fishHavenID}&units=imperial&appid=${appID}`;
  forecastURL = `//api.openweathermap.org/data/2.5/forecast?id=${fishHavenID}&units=imperial&appid=${appID}`;
}

const mydate = new Date()
const mytoday = mydate.getDay()
const myweekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]



fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    console.log(jsObject);

    /*******************
     * WEATHER SUMMARY *
     *******************/

    //weather description
    document.getElementById('current-weather').textContent = jsObject.weather[0].description;
    //temperatures
    document.getElementById('current-temp').textContent = jsObject.main.temp.toFixed(0); //currently
    document.getElementById('high-temp').textContent = jsObject.main.temp_max.toFixed(0); //High
    document.getElementById('low-temp').textContent = jsObject.main.temp_min.toFixed(0); //Low
    //humidity
    document.getElementById('humidity').textContent = `${jsObject.main.humidity}%` ;
    //wind speed
    document.getElementById('speed').textContent = jsObject.wind.speed.toFixed(0); //wind

    //CALCULATE WIND CHILL
    //uses the formula f=35.74+0.6215t-35.75s^0.16+0.4275ts^0.16
    //wc = 35.74 + (0.6215 * t) - (35.75 * Math.pow(s, 0.16) + (0.4275 * t) * (Math.pow(s, 0.16)))
    const tempNumber = jsObject.main.temp;
    console.log(tempNumber);

    const speedNumber = jsObject.wind.speed;
    console.log(speedNumber);

    let windchill = 35.74 + (0.6215 * tempNumber) - 35.75 * Math.pow(speedNumber, 0.16) + (0.4275 * tempNumber * Math.pow(speedNumber, 0.16));
    windchill = Math.round(windchill);

    if (tempNumber <= 50 && speedNumber > 3) {
        document.getElementById("chill").textContent = windchill.toFixed(0) + "\xB0 F";
    } else {
        document.getElementById("chill").textContent = "N/A";
    }

}); //end weather summary fetch

fetch(forecastURL)
  .then((response) => response.json())
  .then((jsObject2) => {

    /*******************
     * 5-DAY FORECAST  *
     *******************/
    let forecastDay = mytoday;
    let mylist = jsObject2.list;
    for (i = 0; i < mylist.length; i++) {
      let time = mylist[i].dt_txt;

      if (time.includes('18:00:00')) {
        forecastDay += 1;
        if (forecastDay === 7){forecastDay = 0};

        let dayName = document.createElement("p");

        dayName.textContent = myweekday[forecastDay];

        let temp = document.createElement("p");
        temp.textContent = jsObject2.list[i].main.temp.toFixed(0) + "\xB0";

        const iconcode = jsObject2.list[i].weather[0].icon;
        const iconURL = "//openweathermap.org/img/w/" + iconcode + ".png";
        let theIcon = document.createElement("img");
        theIcon.src = iconURL;
        theIcon.alt = jsObject2.list[i].weather[0].description;

        let theDay = document.createElement("div");
        theDay.appendChild(dayName);
        theDay.appendChild(theIcon);
        theDay.appendChild(temp);
        
        document.getElementById("five-day").appendChild(theDay);
      }
    }
  }); //end forecast fetch



