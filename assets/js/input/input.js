import { dateAdd } from "../dateAdd/dateAdd.js";

export let modalClick = () => {
    const addBtn = document.querySelector('.addBtn');
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

    addDate.addEventListener('click', (event)=> {
        event.preventDefault();
        dateAdd(dateVal);
    })
}