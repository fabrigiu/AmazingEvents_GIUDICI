import data from "./data.js";

const eventData = [...data.events];
const cardSectionPast = document.getElementById('past-cards');

function filterPast(arr){
    let aux = [] ;
    for (let i = 0 ; i< arr.length ; i++) {
        if(data.currentDate>arr[i].date){
            aux.push(arr[i])
        }
    }
    return aux;
}

let pastData = filterPast(eventData);

function createCards(dataArray) {
    let shard = document.createDocumentFragment();
  
    for (const data of dataArray) {
      let div = document.createElement("div");
      div.className = "card bg-dark";
      div.style.width = "18rem";
      div.innerHTML = `
          <img src="${data.image}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${data.name}</h5>
              <p class="card-text">${data.description}</p>
              <div class="card-foot">
                  <p>Price: ${data.price}</p>
                 <a href="./details.html"  class="btn">Details</a>
              </div>
          </div>`;
  
      shard.appendChild(div);
    }
  
    return shard;
  }

cardSectionPast.appendChild(createCards(pastData));
