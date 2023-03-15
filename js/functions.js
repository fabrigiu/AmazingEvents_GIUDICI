import data from "./data.js";
const eventData = [...data.events];
const input = document.querySelector("input");
const cardSection = document.getElementById("card-section");
const path = './pages/details.html'

function printCards(dataArray, container, path) {
  if (dataArray.length == 0) {
    container.innerHTML = `<h2 class="display-1 fw-bolder">No events found.</h2>`;
    return;
  }
  let cards = "";
  dataArray.forEach((data) => {
    cards += `<div class="card bg-dark" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${data.name}</h5>
            <p class="card-text">${data.description}</p>
            <div class="card-foot">
                <p>Price: ${data.price}</p>
               <a href="${path}?id=${data._id}"  class="btn">Details</a>
            </div>
        </div>
    </div>`;
  });
  container.innerHTML = cards;
}
function printChecks(array, container) {
  let categories = array.map((event) => event.category);
  let setCategories = new Set(categories);
  let categoriesArr = Array.from(setCategories);
  let checkboxes = "";
  categoriesArr.forEach((category) => {
    checkboxes += `<div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" role="switch" id="${category}" value="${category}">
                    <label class="form-check-label" for="${category}">${category}</label>
                  </div>`;
  });
  container.innerHTML = checkboxes;
}

function filterUpcoming(arr) {
  const aux = arr.filter((d) => data.currentDate < d.date);
  return aux;
}
function filterPast(arr) {
  const aux = arr.filter((d) => data.currentDate > d.date);
  return aux;
}
function checkboxFilter(arr) {
  let checkboxes = document.querySelectorAll("input[type='checkbox']");
  let arrayChecks = Array.from(checkboxes);
  let checked = arrayChecks.filter((check) => check.checked);
  let checkedValues = checked.map((checked) => checked.value);
  let filteredArray = arr.filter((aux) => checkedValues.includes(aux.category));
  if (checked.length > 0) {
    return filteredArray;
  }
  return arr;
}
function textFilter(arr, text) {
  let filtered = arr.filter((data) =>
    data.name.toLowerCase().includes(text.toLowerCase())
  );
  return filtered;
}
function filters() {
  let firstFilter = textFilter(eventData, input.value);
  let secondFilter = checkboxFilter(firstFilter);
  printCards(secondFilter, cardSection, path);
}

export {
  printCards,
  filterUpcoming,
  filterPast,
  printChecks,
  filters,
  textFilter,
  checkboxFilter
};
