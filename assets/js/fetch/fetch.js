import { displayEvents } from "../agenda-creation/agenda-creation";
import { postToApi } from "../post/post.js";

// Récupération des informations depuis l'API
export function fetchData() {
    fetch("http://localhost:3000/api/events/")
    .then((response) => response.json())
    .then((json) => {
        console.log(json);
        displayEvents(json);
    });
}


export let submitReset = () => {
    const btnSub = document.getElementById('eventSubmit');
    const maine = document.getElementById('events')

    btnSub.addEventListener('click', (event) => {
        event.preventDefault();
        postToApi();
        boite.style.display = "none";
        maine.innerHTML = "";

        setTimeout(fetchData, 100);
    })
}