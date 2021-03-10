const apiURL = "//api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&appid=2f35ec7ffdcd2042fc4fe8fc077b764f"
const forecastURL = "//api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&appid=2f35ec7ffdcd2042fc4fe8fc077b764f"

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
    //temperatures
    document.getElementById('current-temp').textContent = jsObject.main.temp; //currently
    document.getElementById('high-temp').textContent = jsObject.main.temp_max; //High
    document.getElementById('low-temp').textContent = jsObject.main.temp_min; //Low

    
    const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';  // note the concatenation
    const desc = jsObject.weather[0].description;  // note how we reference the weather array
    
    //wind speed
    document.getElementById('speed').textContent = jsObject.wind.speed; //wind

});

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

        let theDay = document.createElement("div");
        theDay.appendChild(dayName);
        theDay.appendChild(theIcon);
        theDay.appendChild(temp);
        
        document.getElementById("five-day").appendChild(theDay);
      }
    }



  });
