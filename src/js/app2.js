
"use strict"


  

let map = L.map('map').setView([51.505, -0.09], 10);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);





 window.onload = init;

 

   /**
    * Funktion som innehåller en eventlistener som finns när sdian startar
    */
function init () {
 searchbtnEl.addEventListener("click", getLocation)  
}




let searchEl=document.querySelector("#input");
let searchbtnEl=document.getElementById("search-btn")

  /**
   * En tom array som kommer att innehålla data från API
   * @type {any[]}
   */
let location=[];

/**
 * @async
 * @function getLocation- EN async funktion som hämtar data från ett API (Nominatim)
 * @param {string} url - The URL to download from.
 * @throws {Error} -Om vi inte får någon data
 * @returns {Promise|location}   - Datan som vi får från url
 */
async function getLocation () { //Funktion som hämtar data med hjälp av ajaxanrop. Try/Catch Async/Await´


 let place=searchEl.value
  

 try {const response = await fetch (`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${place}&format=jsonv2&limit=1`)
     if (!response.ok){
         throw new Error ("Fel....")  
     }
 location = await response.json();   

 displayPlace(location)
          

 
}
catch (error){console.error(error)}   
};



/**
 * @function displayPlace -Funktion som sätter markör och ändrar karta till platsen som man söker efter
 * @param {any[]} data 
 * @returns {map} -Man får fram ny placering av karta 
 * @returns {marker} -Man får fram ny placering av markör 
 */
function displayPlace(data) {

  /**
   * Latitude av en plats
   * @type {number}
   */
  let latitude = data[0].lat  //["lat"];
  console.log(latitude);
  
  /**
   * Longitude av en plats
   * @type {number}
   */
  let longitude = data[0].lon  //["lat"];
  console.log(longitude)
  

  map.flyTo(new L.LatLng(latitude, longitude), 10);
  /**
   * Markerar ut en plats på en karta
   * @type {any}
   */
  let marker = L.marker([latitude, longitude]).addTo(map);
};  

