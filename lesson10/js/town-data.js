//JSON data URL for reference
const refURL = "https://byui-cit230.github.io/weather/data/towndata.json";

//populate page with town cards
fetch(refURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject);  // temporary checking for valid response and data parsing

    const towns = jsonObject['towns'];
    for (let i = 0; i < towns.length; i++) {
        if (towns[i].name == "Preston" | towns[i].name == "Soda Springs" | towns[i].name == "Fish Haven") {
            //create the card elements for each town
            let card = document.createElement('section'); //card content container
            let div1 = document.createElement('div'); //heading styling container
            let div2 = document.createElement('div'); //data styling container
            let h2 = document.createElement('h2'); //Town name
            let p0 = document.createElement('p'); //subtitle
            let p1 = document.createElement('p'); // year founded
            let p2 = document.createElement('p'); // population
            let p3 = document.createElement('p'); // annual rain fall
            let image = document.createElement('img');
            
            //set data-src, src (for loading img) and alt attributes of each image
            image.setAttribute('src', "images/home/" + towns[i].photo); //name photos the same as in JSON file
            image.setAttribute('alt', towns[i].name + " - Founded: " + towns[i].yearFounded);
            image.setAttribute('loading', 'lazy')

            h2.textContent = towns[i].name;
            p0.textContent = towns[i].motto;
            p1.textContent = "Year founded: " + towns[i].yearFounded;
            p2.textContent = "Population: " + towns[i].currentPopulation;
            p3.textContent = "Annual rain fall: " + towns[i].averageRainfall;

            card.appendChild(div1);
            div1.appendChild(h2);
            div1.appendChild(p0);
            card.appendChild(div2);
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3);
            card.appendChild(image);

            document.querySelector('div.town-cards').appendChild(card);
    }
    }
    });