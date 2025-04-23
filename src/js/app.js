"use strict"

// Meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");


openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Navigeringsmenyn
function toggleMenu() {
    let navMenuEl = document.getElementById("nav-menu");

    //hämtar in css för menyn
    let style = window.getComputedStyle(navMenuEl);

    //koll om navigering är synlig eller ej, ändrar display block/none
    if(style.display === "none") {
        navMenuEl.style.display = "block";
    } else {
        navMenuEl.style.display = "none";
    }
}
//Meny/Hamburgarmenykod är taget från MallarMiun och anpassats till uppgiften






   let education=[];


   window.onload = init;
   function init () {
          getCourses ()  //När sidan startar så anropas funktionen getCourses
  
   }


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


async function getCourses () { //Funktion som hämtar data med hjälp av ajaxanrop. Try/Catch Async/Await

  try {const response = await fetch ("https://studenter.miun.se/~mallar/dt211g/");//Hämtar data

      if (!response.ok){
          throw new Error ("Fel....")  
      }
  education = await response.json();               
  displayChart(education);  

  //console.table(data);
  //console.log(data);
  

  
}
  catch (error){console.error(error)}   
   }
  

   function displayChart(data){

    const ctx = document.getElementById('myChart');

    ctx.innerHTML = "";

    const ctx2 = document.getElementById('myChart2');

    ctx2.innerHTML = "";
    


 


//sortera



data.sort((a, b) => b.applicantsTotal - a.applicantsTotal)
let courses= data.filter(education=>education.type === "Kurs");
let programs= data.filter(education=>education.type === "Program");


console.table(data);

console.table(courses);

console.table(programs);







 new Chart(ctx, {
  type: 'bar',
  data: {
  labels: courses.map(row=>row.name),   //xx ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//   x labels: , [courses.forEach(course =>{course.name})],
  datasets: [{
  label: '# Antal',
  data: courses.map(row =>row.applicantsTotal), //y
  borderWidth: 1
  }]
  },
  options: {
      scales: {
        y: {
          beginAtZero: true
          

        }, 

        x: {
          max:5
        }
      }

     
    }
  });


  new Chart(ctx2, {
    type: 'doughnut',
    data: {
    labels: programs.map(row=>row.name),   //xx ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//   x labels: , [courses.forEach(course =>{course.name})],
    datasets: [{
    label: '# Antal',
    data: programs.map(row =>row.applicantsTotal), //y
    borderWidth: 1
    }]
    },
    options: {
        scales: {
          y: {
            beginAtZero: true
            
  
          }, 
  
          x: {
            max:5
          }
        }
  
       
      }
    });


   }

/*
   function displayChart(data) {   //Funktion som visar kurserna



     //

     //

     let courses = data.filter(education=>education.type === "kurs");
     
console.log(courses);*/

   
    
     
    
     

    

  

    //let coursesEl=document.getElementById("courses"); //Skapar en variabel av ett element

    //coursesEl.innerHTML=""; //Rensar lista

    //courses.sort((a, b) => a.coursename > b.coursename ? 1:-1)



      //courses.forEach(course => {  //Loopar igenom kurser
     // coursesEl.innerHTML += `<td>${course.code}</td> <td>${course.coursename}</td>  <td>${course.progression}</td> `}); } //Skapar tabellinnehåll, kod, namn och progression av kurser. 
   





/*
let courses=[];


window.onload = init;
function init () {
       getCourses ()  //När sidan startar så anropas funktionen getCourses

       document.querySelector("#search").addEventListener("input", filterData); //händelsehanterar som händer när man börjar skriva in text i sökfält
        document.querySelector("#name").addEventListener("click", sortData1); //händelsehanterar som händer när man börjar trycker på överskriften
        document.querySelector("#code").addEventListener("click", sortData2); //händelsehanterar som händer när man börjar trycker på överskriften
        document.querySelector("#prog").addEventListener("click", sortData3);//händelsehanterar som händer när man börjar trycker på överskriften

   
}

async function getCourses () { //Funktion som hämtar data med hjälp av ajaxanrop. Try/Catch Async/Await

    try {const response = await fetch ("https://webbutveckling.miun.se/files/ramschema_ht24.json");//Hämtar data

        if (!response.ok){
            throw new Error ("Fel....")  
        }
    courses = await response.json();               
    displayCourses(courses);  
}
    catch (error){console.log(error)}   
     }





function displayCourses(courses) {   //Funktion som visar kurserna

       
     
    let coursesEl=document.getElementById("courses"); //Skapar en variabel av ett element

    coursesEl.innerHTML=""; //Rensar lista

    //courses.sort((a, b) => a.coursename > b.coursename ? 1:-1)



      courses.forEach(course => {  //Loopar igenom kurser
      coursesEl.innerHTML += `<td>${course.code}</td> <td>${course.coursename}</td>  <td>${course.progression}</td> `}); } //Skapar tabellinnehåll, kod, namn och progression av kurser. 
        

function filterData () {   //Funktion som gör att när man skriver så filtreras datan i tabellen till det man skriver . 


    


let searchphrase = document.querySelector("#search").value;  //värdet som skrivs i i sökfält

let filteredData = courses.filter(course => 
    course.coursename.toLowerCase().includes(searchphrase.toLowerCase()) ||   course.code.toLowerCase().includes(searchphrase.toLowerCase()) //filtreringsfunktion med avseende på kursnamn och kurskod
    

);

displayCourses(filteredData) //anropar funktionen  displayCourses med filtreringsfunktion

}       

function sortData1 (){  //Funktion som sorterar tabell i namnordning

    let sorteddata=courses.sort((a, b) => a.coursename > b.coursename ? 1:-1)

    displayCourses(sorteddata) //anropar funktionen  displayCourses med sorteringsfunktion

}

function sortData2 (){ //Funktion som sorterar tabell i kurskodordning

    let sorteddata=courses.sort((a, b) => a.code > b.code ? 1:-1)

    displayCourses(sorteddata) //anropar funktionen  displayCourses med sorteringsfunktion

}


function sortData3 (){ //Funktion som sorterar tabell i progressionsordning

    let sorteddata=courses.sort((a, b) => a.progression > b.progression ? 1:-1)

    displayCourses(sorteddata) //anropar funktionen  displayCourses med sorteringsfunktion

}



*/