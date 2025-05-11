



  let map = L.map('map').setView([51.505, -0.09], 10);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);



 // let marker = L.marker([51.5, -0.09]).addTo(map);

 window.onload = init;
 function init () {
  searchbtnEl.addEventListener("click", getLocation)  //När sidan startar så anropas funktionen getCourses
}

// //händelsehanterar som händer när man börjar skriva in text i sökfält


let searchEl=document.querySelector("#testar");
let searchbtnEl=document.getElementById("testar-btn")

//let data300=[]
let location=[];

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




function displayPlace(data) {





  let latitude = data[0].lat  //["lat"];
  console.log(latitude);
  
  let longitude = data[0].lon  //["lat"];
  console.log(longitude)

  map.flyTo(new L.LatLng(latitude, longitude), 10);
 /* L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);*/




  let marker = L.marker([latitude, longitude]).addTo(map);



  //let courses= data.filter(education=>education.type === "Kurs");
 //  let data1 = data1.filter(lat => lat.lat)
  //console.log("Titta"+data1);
  

};  



//let latitude=[];
//let longitude=[];

/*
   const ctx = document.getElementById('myChart');

   fetch    ("https://studenter.miun.se/~mallar/dt211g/")
   .then(function(response) {
    if(response.ok==true) {
      return response.json();
    }

   })
   .then (function(data) {
    console.log(data);
    
    displayChart(data)
   });
*/

