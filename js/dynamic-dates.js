//copyright full year
const year = new Date();
document.getElementById("copy-year").textContent = year.getFullYear();
//page updated date
var updatedMessage = "Last Updated " + document.lastModified;
document.getElementById("date-updated").textContent = updatedMessage;