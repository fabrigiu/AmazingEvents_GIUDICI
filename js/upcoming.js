import {
  printCards,
  printChecks,
  textFilter,
  checkboxFilter,
  filterUpcoming,
} from "./functions.js";

const cardSection = document.getElementById("card-section");
const checkContainer = document.getElementById("checkbox-container");
const input = document.querySelector("input");
const path = "./details.html";
async function fetchData() {
  await fetch("../data/amazing.json")
    .then((res) => res.json())
    .then((data) => {
      const eventData = data.events;
      const currentDate = data.currentDate;
      const upcomingData = filterUpcoming(eventData,currentDate);
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
    });
}
fetchData();
