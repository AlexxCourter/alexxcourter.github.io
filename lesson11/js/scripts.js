//menu button toggle to open nav menu
function toggleMenu() {
    document.getElementById("headNav").classList.toggle("hide");
}

//Today's date display in footer
const save_date = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var today = days[save_date.getDay()] + ", " + save_date.getDate() + " " + months[save_date.getMonth()] + " " + save_date.getFullYear()
document.getElementById("today-date").textContent = today;

//display message for Saturday pancakes ONLY if it is friday
const dayNumber = save_date.getDay(); //use Date() object above

const element = document.getElementById("message");
if (dayNumber == 5) {
    element.classList.add("showme");
} else {
    element.classList.add("hideme");
}

//adjust the number shown for the storm severity rating bar
function adjustRating(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
}