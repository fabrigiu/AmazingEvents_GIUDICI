import data from "./data.js";
import {
  printCards,
  printChecks,
  textFilter,
  checkboxFilter,
  filterPast,
} from "./functions.js";

const eventData = [...data.events];
const cardSection = document.getElementById("card-section");
const checkContainer = document.getElementById("checkbox-container");
const input = document.querySelector("input");
const path = './details.html';

const pastData = filterPast(eventData);

printCards(pastData, cardSection, path);
printChecks(pastData, checkContainer);

input.addEventListener("input", () => {
  let firstFilter = textFilter(pastData, input.value);
  let secondFilter = checkboxFilter(firstFilter);
  printCards(secondFilter, cardSection, path);
});
checkContainer.addEventListener("change", () => {
  let firstFilter = textFilter(pastData, input.value);
  let secondFilter = checkboxFilter(firstFilter);
  printCards(secondFilter, cardSection, path);
});
