function printCards(dataArray, container, path) {
  if (dataArray.length == 0) {
    container.innerHTML = `<h2 class="display-1 fw-bolder">No events found.</h2>`;
    return;
  }
  let cards = "";
  dataArray.forEach((data) => {
    cards += `<div class="card bg-dark" style="width: 18rem;">
        <img src="${data.image}" class="card-img-top" style="height:12rem;" alt="...">
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

//filters the main array by date and creates a new one with the events subsequent to the current date
function filterUpcoming(arr,date) {
  const aux = arr.filter((d) => date < d.date);
  return aux;
}
//filters the main array by date and creates a new one with the events prior to the current date
function filterPast(arr,date) {
  const aux = arr.filter((d) => date > d.date);
  return aux;
}

//captures all the checkboxes and filters the main array with the values of the checked inputs
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

//filters events by name with the search bar
function textFilter(arr, text) {
  let filtered = arr.filter((data) =>
    data.name.toLowerCase().includes(text.toLowerCase())
  );
  return filtered;
}

export {
  printCards,
  filterUpcoming,
  filterPast,
  printChecks,
  textFilter,
  checkboxFilter,
};
