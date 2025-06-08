"use strict"



   let education=[];


 
   
   window.onload = init;
   /**
    * Funktion som kallar annan funktion när hemsidan laddas
    * 
    */
   function init () {
          getCourses ()  //När sidan startar så anropas funktionen getCourses
    

   }



 


/**
 * Hämtar data med hjälp av ajaxanrop. Try/Catch Async/Await
 * @async
 * @function getCourses
 * @param {string} url - The URL to download from.
 * @throws {Error} -Om vi inte får någon data
 * @returns {Promise|education}   - Datan som vi får från url
 */
async function getCourses () { 

  try {const response = await fetch ("https://studenter.miun.se/~mallar/dt211g/");

      if (!response.ok){
          throw new Error ("Fel....")  
      }
  education = await response.json();  

  displayChart(education);  



  
}
  catch (error){console.error(error)}   
   }

  


   /**
    * @function displayChart - Funktion som hanterar data från API och skapar ett cirkeldiagram och ett stapeldiagram med data ifrån detta
    * @param {any[]} data --data från förra funktionen
    * @returns {chart} - ctx1, Chart nummer 1 från Chart.js
    * @returns {chart} - ctx2, Chart nummer 1 från Chart.js
    */
   function displayChart(data){

    const ctx = document.getElementById('myChart');

    ctx.innerHTML = "";

    const ctx2 = document.getElementById('myChart2');

    ctx2.innerHTML = "";
    

/**
 * Sorterar datan så att utbildningarna visas ordningen flest till minst som har sökt utbildningarna
 */
data.sort((a, b) => b.applicantsTotal - a.applicantsTotal)
/**
 * Array av kurser taget från API
 * @type {courses[]} 
 */
let courses= data.filter(education=>education.type === "Kurs");
/**
 * Array av program taget från API
 * @type {programs[]} 
 */
let programs= data.filter(education=>education.type === "Program");


 new Chart(ctx, {
  type: 'bar',
  data: {
  labels: courses.map(row=>row.name),   
  datasets: [{
  label: '# Antal som har sökt kursen',
  data: courses.map(row =>row.applicantsTotal), 
  borderWidth: 1,
  backgroundColor:['#cd5c5c', '#50c878']

  }]
  },
  options: {
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 22
                    }
                }
            }
        },
      scales: {
        y: {
          beginAtZero: true
          }, 

        x: {
          max:5
        },
       
      }

     
    }
  });

  
  programs.length=5 

  new Chart(ctx2, {
    type: 'doughnut',
    data: {
    labels: programs.map(row=>row.name),
    datasets: [{
    label: '# Antal',
    data: programs.map(row =>row.applicantsTotal), 
    borderWidth: 1,
    
    
   
    }]
    },
    options: {
          plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 22
                    }
                }
            }
        },
  
      }
    });


   

  }









// Meny-knapparna
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");


openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

//Navigeringsmeny
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


