/* Import */
import '/assets/scss/style.css';
import { modalClick } from './assets/js/input/input.js';
import { fetchData, buttonSub } from './assets/js/fetch/fetch';

/* Variables */
const btn = document.querySelector(".header__btn");
let updatedData = [];
let nameArray = [];

/* Appels de fonctions */
fetchData();
console.log(nameArray);
console.log(updatedData);
buttonSub();

/* Evènements */
// btn.addEventListener("click", createEvent);

modalClick();