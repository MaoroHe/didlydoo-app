import { dateAdd } from "../dateAdd/dateAdd.js";
import { postToApi } from "../post/post.js";

export let modalClick = () => {
    const addBtn = document.querySelector('.addBtn');
    const btnSub = document.getElementById('eventSubmit');
    const addDate = document.getElementById('addDate');
    const close = document.getElementById('close');
    const boite = document.getElementById('boite');
    const dateVal = document.getElementById('eventDate')

    addBtn.addEventListener('click', (event) => {
        boite.style.display = "block";
    })

    close.addEventListener('click', (event) => {
        boite.style.display = "none";
    })

    document.addEventListener('click', (event) => {
        if (event.target == boite) {
            boite.style.display = "none";
          }
    })

    btnSub.addEventListener('click', (event) => {
        event.preventDefault();
        postToApi();
    })

    addDate.addEventListener('click', (event)=> {
        event.preventDefault();
        dateAdd(dateVal);
    })
}