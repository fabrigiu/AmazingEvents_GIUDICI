import {
  printCards,
  printChecks,
  textFilter,
  checkboxFilter,
  filterUpcoming,
} from "./functions.js";

const eventData = await fetch("../data/amazing.json")
  .then((res) => res.json())
  .then((data) => {
    return data.events;
  });
const cardSection = document.getElementById("card-section");
const checkContainer = document.getElementById("checkbox-container");
const input = document.querySelector("input");
const path = "./details.html";

const upcomingData = filterUpcoming(eventData);
printCards(upcomingData, cardSection, path);
printChecks(upcomingData, checkContainer);

input.addEventListener("input", () => {
  let firstFilter = textFilter(upcomingData, input.value);
  let secondFilter = checkboxFilter(firstFilter);
  printCards(secondFilter, cardSection, path);
});
checkContainer.addEventListener("change", () => {
  let firstFilter = textFilter(upcomingData, input.value);
  let secondFilter = checkboxFilter(firstFilter);
  printCards(secondFilter, cardSection, path);
});
