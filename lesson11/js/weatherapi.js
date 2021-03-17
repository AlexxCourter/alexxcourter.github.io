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
    document.getElementById('current-temp').textContent = jsObject.main.temp; //currently
    document.getElementById('high-temp').textContent = jsObject.main.temp_max; //High
    document.getElementById('low-temp').textContent = jsObject.main.temp_min; //Low
    //humidity
    document.getElementById('humidity').textContent = `${jsObject.main.humidity}%` ;
    //wind speed
    document.getElementById('speed').textContent = jsObject.wind.speed; //wind

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
        temp.textContent = jsObject2.list[i].main.temp + "\xB0";

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
