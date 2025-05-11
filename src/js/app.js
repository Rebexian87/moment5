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


  
  programs.length=5 

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
    labels: programs.map(row=>row.name),
     //xx ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],//   x labels: , [courses.forEach(course =>{course.name})],
    datasets: [{
    label: '# Antal',
    data: programs.map(row =>row.applicantsTotal), //y
    borderWidth: 1,
    
    
   
    }]
    },
    options: {
  
      }
    });


   

  }



/* Här börjar js för kartan */




