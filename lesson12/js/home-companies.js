//dynamically load company cards to the page.
//Changes which companies are advertised each load.

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  } //max is excluded

//set random integers for each company index
const company1 = getRndInteger(0, 3)
const company2 = getRndInteger(3, 5)
const company3 = getRndInteger(5, 7)

//create elements and load info from JSON with fetch
//JSON data URL for reference
const referenceURL = "./json/companies.json";

//populate page with town cards
fetch(referenceURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const companies = jsonObject['companies'];
    for (let i = 0; i < companies.length; i++) {
        if (companies[i] == companies[company1] | companies[i] == companies[company2] | companies[i] == companies[company3]) {
            //create the card elements for each selected company
            let card = document.createElement('section'); //card content container
            let div1 = document.createElement('div'); //heading styling container
            let div2 = document.createElement('div'); //data styling container
            let h2 = document.createElement('h2'); //Company name
            let p0 = document.createElement('p'); //description
            let p1 = document.createElement('p'); // phone
            let p2 = document.createElement('p'); // website holder
            let a1 = document.createElement('a'); //anchor for website link
            let p3 = document.createElement('p'); // address
            let image = document.createElement('img');
            
            //set src and alt attributes of each image, set images to lazy loading
            image.setAttribute('src', "images/company-logos/" + companies[i].photo); //name photos the same as in JSON file
            image.setAttribute('alt', companies[i].name + " - " + companies[i].desc);
            image.setAttribute('loading', 'lazy')

            h2.textContent = companies[i].name;
            p0.textContent = companies[i].desc;
            p1.textContent = "Phone: " + companies[i].phone;
            p2.textContent = "Website: ";
            a1.setAttribute('href', companies[i].website);
            a1.textContent = companies[i].website;
            p2.appendChild(a1);
            p3.textContent = companies[i].address1 + "\n" + companies[i].address2;

            //append all pieces to the card
            card.appendChild(image);
            card.appendChild(div1);
            div1.appendChild(h2);
            div1.appendChild(p0);
            card.appendChild(div2);
            div2.appendChild(p1);
            div2.appendChild(p2);
            div2.appendChild(p3);
            

            document.querySelector('section.companies').appendChild(card);
    }
    }

    }); //END FETCH QUERY