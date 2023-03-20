import { printCards, printChecks, filters } from "./functions.js";

// const eventData = [...data.events];
const cardSection = document.getElementById("card-section");
const checkContainer = document.getElementById("checkbox-container");
const input = document.querySelector("input");
const path = './pages/details.html';
const eventData  =  await fetch('../data/amazing.json')
    .then(res => res.json())
    .then((data)=> {
    return data.events})


console.log(eventData)


printChecks(eventData, checkContainer);
printCards(eventData, cardSection, path);

input.addEventListener("input", filters);

checkContainer.addEventListener("change", filters);
