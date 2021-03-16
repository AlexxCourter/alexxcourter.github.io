//JSON data URL for reference
const refURL = "https://byui-cit230.github.io/weather/data/towndata.json";

//populate page with town cards
fetch(refURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing
    
    if (document.querySelector('h1#town-name').textContent == "Preston Idaho") {var townIndex = 6;}
    if (document.querySelector('h1#town-name').textContent == "Soda Springs") {var townIndex = 0;}
    if (document.querySelector('h1#town-name').textContent == "Fish Haven") {var townIndex = 2;}

    const town = jsonObject['towns'][townIndex];
    for (let i = 0; i < town.events.length; i++) {
        console.log(i);
        console.log(town.events[i]); //debugs

        let p1 = document.createElement('p');
        p1.textContent = town.events[i]

        document.querySelector("article#events").appendChild(p1);
    }
}); //END FETCH QUERY