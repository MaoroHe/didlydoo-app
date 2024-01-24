/* Import */
import '/assets/scss/style.css';
import { fetchData } from './assets/js/fetch/fetch';

/* Variables */
const btn = document.querySelector(".header__btn");
let updatedData = [];
let nameArray = [];

/* Appels de fonctions */
fetchData();
console.log(nameArray);
console.log(updatedData);

/* Evènements */
// btn.addEventListener("click", createEvent);