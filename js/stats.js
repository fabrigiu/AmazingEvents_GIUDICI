import {
  filterUpcoming,
  filterPast,
  printTr,
  mapCategories,
  filteredByCategory,
  printCategoryRows,
} from "./functions.js";
const table1 = document.getElementById("tbody-1");
const table2 = document.getElementById("tbody-2");
const table3 = document.getElementById("tbody-3");
async function fetchData() {
  await fetch("../data/amazing.json")
    .then((res) => res.json())
    .then((data) => {
      const eventData = data.events;
      const currentDate = data.currentDate;
      let upcomingEvents = filterUpcoming(eventData, currentDate);
      let pastEvents = filterPast(eventData, currentDate);
      let categoriesArrayUpcoming = mapCategories(upcomingEvents);
      let categoriesArrayPast = mapCategories(pastEvents);
      let arrfiltered = filteredByCategory(upcomingEvents, categoriesArrayUpcoming);
      let arrFilteredPast = filteredByCategory(pastEvents, categoriesArrayPast);

      printTr(table1, eventData);

      printCategoryRows(table2, arrfiltered);
      printCategoryRows(table3, arrFilteredPast);
    });
}
fetchData();
