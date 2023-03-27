import { filterUpcoming, filterPast } from "./functions.js";
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
      let hPercent = highestPercentage(eventData)
      let lPercent = lowestPercentage(eventData)
      let categoriesArrayUpcoming = mapCategories(upcomingEvents)
      let categoriesArrayPast = mapCategories(pastEvents)


      let arrfiltered= filteredByCategory(upcomingEvents,categoriesArrayUpcoming)
      console.log(categoriesArrayUpcoming);
      printTr(table1,hPercent,lPercent,largestCapacity(eventData));

      printCategoryRows(table2,arrfiltered)
      printCategoryRows(table3,categoriesArrayPast)
    });
}
fetchData();

function printTr(container, high, low, lc) {
  container.innerHTML = `<tr>
                             <td>${high}</td>
                             <td>${low}</td>
                             <td>${lc}</td>
                          </tr>`;
}
function mapCategories(array){
  return [...new Set((array.map(event => event.category)))]
}

function filteredByCategory( arrayEvents, arrayCategories ){
  console.log(arrayEvents);
  console.log(arrayCategories);
  let arrAux = [];
  arrayCategories.forEach(category => {
     let aux = arrayEvents.filter(event => event.category.toLowerCase() == category.toLowerCase());
    arrAux.push(aux)
  })
  console.log(arrAux)
  return arrAux; 
}


function printCategoryRows(container, array){
  let rows = "";
  let attest= 0;
  for (const category of array) {
    category.assistance ? (attest = category.assistance) : (attest = category.estimate);
    let percent = (attest * 100) / category.capacity;
    let revenue = category.price * category.attest
    rows += `<tr>
               <td>${category.category}</td>
               <td>${revenue}</td>
               <td>${percent}</td>
              </tr>`;
  };
  container.innerHTML = rows;
  }

//returns the name of the event with the largest capacity
function largestCapacity(array) {
  let event = array.sort((a, b) => b.capacity - a.capacity)[0].name;
  console.log(event);
  return event;
}
// returns the name of the events with the lowest % of assistance
function lowestPercentage(array) {
  let min = 101;
  let minObj;
  let attest = 0;
  array.forEach((e) => {
    e.assistance ? (attest = e.assistance) : (attest = e.estimate);
    let percent = (attest * 100) / e.capacity;
    if (percent < min) {
      minObj = e.name;
      min = percent;
    }
  });
  return minObj;
}
// returns the name of the events with the highest % of assistance
function highestPercentage(array) {
  let max = 0;
  let maxObj;
  let attest = 0;
  array.forEach((e) => {
    e.assistance ? (attest = e.assistance) : (attest = e.estimate);
    let percent = (attest * 100) / e.capacity;
    if (percent > max) {
      maxObj = e;
      max = percent;
    }
  });
  return maxObj.name;
}