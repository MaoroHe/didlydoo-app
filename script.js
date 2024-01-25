/* Import */
import '/assets/scss/style.css';
import { modalClick } from './assets/js/input/input';
import { fetchData, submitReset } from './assets/js/fetch/fetch';
import { darkmode, darkInit } from './assets/js/darkmode/darkmode';

/* Variables */
const btn = document.querySelector(".header__btn");
let updatedData = [];
let nameArray = [];

/* Appels de fonctions */
darkInit();
fetchData();
submitReset();
darkmode();
console.log(nameArray);
console.log(updatedData);

/* Evènements */
// btn.addEventListener("click", createEvent);

modalClick();