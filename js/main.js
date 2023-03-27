import { printCards, printChecks, textFilter, checkboxFilter } from "./functions.js";
const cardSection = document.getElementById("card-section");
const checkContainer = document.getElementById("checkbox-container");
const input = document.querySelector("input");
const path = "./pages/details.html";

async function fetchData() {
  await fetch("../data/amazing.json")
    .then((res) => res.json())
    .then((data) => {
      const eventData = data.events;
      printChecks(eventData, checkContainer);
      printCards(eventData, cardSection, path);

      input.addEventListener("input", () => {
        let firstFilter = textFilter(eventData, input.value);
        let secondFilter = checkboxFilter(firstFilter);
        printCards(secondFilter, cardSection, path);
      });

      checkContainer.addEventListener("change", () => {
        let firstFilter = textFilter(eventData, input.value);
        let secondFilter = checkboxFilter(firstFilter);
        printCards(secondFilter, cardSection, path);
      });
    });
}
fetchData();
