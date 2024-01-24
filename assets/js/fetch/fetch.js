import { displayEvents } from "../agenda-creation/agenda-creation";

// Récupération des informations depuis l'API
export function fetchData() {
    fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        displayEvents(json);
    });
}

export let buttonSub = () => {
        const btnSub = document.getElementById('eventSubmit');
        const main = document.getElementById('events');
        btnSub.addEventListener('click', (event) => {
           event.preventDefault();
           const boite = document.getElementById('boite');
           boite.style.display = "none";
           postToApi();
           main.innerHTML = '';
   
           // je rappelle la fonction en differée pour etre sur que tt soi push sur l'api
   
           setTimeout(fetchData, 100)
       })
   }