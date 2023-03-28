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

//-------------------Stats Functions----------------------------


//------------Event row------------------
// returns the event with the highest % of assistance
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
  return maxObj;
}
// returns the event with the lowest % of assistance
function lowestPercentage(array) {
  let min = 101;
  let minObj;
  let attest = 0;
  array.forEach((e) => {
    e.assistance ? (attest = e.assistance) : (attest = e.estimate);
    let percent = (attest * 100) / e.capacity;
    if (percent < min) {
      minObj = e;
      min = percent;
    }
  });
  return minObj;
}
//returns the event with the largest capacity
function largestCapacity(array) {
  let event = array.sort((a, b) => b.capacity - a.capacity)[0];
  return event;
}
//prints the table row with the event stats and a link to its details page
function printTr(container, array) {
  let hPercent = highestPercentage(array);
  let lPercent = lowestPercentage(array);
  let lc = largestCapacity(array);
  container.innerHTML = `<tr>
                             <td><a target="blank" href="./details.html?id=${hPercent._id}">${hPercent.name}</a></td>
                             <td><a target="blank" href="./details.html?id=${lPercent._id}">${lPercent.name}</a></td>
                             <td><a target="blank" href="./details.html?id=${lc._id}">${lc.name}</a></td>
                          </tr>`;
}

//------------Category rows------------------

//returns an array of all the categories
function mapCategories(array) {
  return [...new Set(array.map((event) => event.category))];
}
//returns an array with the sum of all the price, assistance and capacity of each category
function filteredByCategory(arrayEvents, arrayCategories) {
  let arrAux = [];
  arrayCategories.forEach((category) => {
    let aux = arrayEvents.filter(
      (event) => event.category.toLowerCase() == category.toLowerCase()
    );
    arrAux.push(aux);
  });

  let newarr = [];
  arrAux.forEach((e) => {
    let auxAssist = 0;
    let auxPrice = 0;
    let auxCategory = "";
    let auxCapacity = 0;
    e.forEach((a) => {
      let attest = 0;
      a.assistance ? (attest = a.assistance) : (attest = a.estimate);
      auxAssist += attest;
      auxPrice += a.price;
      auxCategory = a.category;
      auxCapacity += a.capacity;
    });
    let auxObject = {
      category: auxCategory,
      price: auxPrice,
      capacity: auxCapacity,
      assistance: auxAssist,
    };
    newarr.push(auxObject);
  });
  return newarr;
}
//prints a row for each category and its stats
function printCategoryRows(container, array) {
  let rows = "";
  for (const category of array) {
    let percent = (category.assistance * 100) / category.capacity;
    let revenue = category.price * category.assistance;
    rows += `<tr>
               <td>${category.category}</td>
               <td>&#36;${revenue}</td>
               <td>${percent.toFixed(2)}%</td>
              </tr>`;
  }
  container.innerHTML = rows;
}




export {
  printCards,
  filterUpcoming,
  filterPast,
  printChecks,
  textFilter,
  checkboxFilter,
  printTr,
  mapCategories,
  filteredByCategory,
  printCategoryRows,
};
