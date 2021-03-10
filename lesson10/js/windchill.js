//uses the formula f=35.74+0.6215t-35.75s^0.16+0.4275ts^0.16
//wc = 35.74 + (0.6215 * t) - (35.75 * Math.pow(s, 0.16) + (0.4275 * t) * (Math.pow(s, 0.16)))

const tempNumber = parseFloat(document.getElementById("current-temp").textContent);

const speedNumber = parseFloat(document.getElementById("speed").textContent);

let windchill = 35.74 + (0.6215 * tempNumber) - 35.75 * Math.pow(speedNumber, 0.16) + (0.4275 * tempNumber * Math.pow(speedNumber, 0.16));
windchill = Math.round(windchill);

if (tempNumber <= 50 && speedNumber > 3) {
    document.getElementById("chill").textContent = windchill + "\xB0 F";
} else {
    document.getElementById("chill").textContent = "N/A";
}