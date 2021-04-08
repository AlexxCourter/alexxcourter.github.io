//menu button toggle to open nav menu
function toggleMenu() {
    document.getElementById("headNav").classList.toggle("hide");
}

function toggleCardView() {
    let selection = document.querySelectorAll(".directory section");
    console.log(selection)
    for (let i = 0; i < selection.length; i++ ) {
        selection[i].setAttribute("class", "card-view");
    }
    
}

function toggleListView() {
    let selection = document.querySelectorAll(".directory section");
    console.log(selection)
    for (let i = 0; i < selection.length; i++ ) {
        selection[i].setAttribute("class", "list-view");
    }
    
}

function closeBox() {
    const element = document.querySelector("#alert-box");
    element.setAttribute("class", "hideme")
}

//page updated date
var updatedMessage = "Last Updated " + document.lastModified;
document.getElementById("update-date").textContent = updatedMessage;

//events list
const referenceURL1 = "./json/events.json"

fetch(referenceURL1)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const events = jsonObject['events'];
    for (let i = 0; i < events.length; i++) {
            //create the card elements for each selected company
            let div1 = document.createElement('div'); //data container
            let h3 = document.createElement('h3'); //event name
            let p0 = document.createElement('p'); //event date
            let p1 = document.createElement('p'); // event address

            h3.textContent = events[i].title;
            p0.innerHTML = events[i].date;
            p1.innerHTML = events[i].address;
            
            //append all pieces to the card
            div1.appendChild(h3);
            div1.appendChild(p0);
            div1.appendChild(p1);

            document.querySelector('article.events').appendChild(div1);
  }});