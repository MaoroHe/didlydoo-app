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