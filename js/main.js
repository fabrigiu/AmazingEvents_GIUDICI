import data from "./data.js";

const eventData = [...data.events];
const cardSection = document.getElementById("card-section");

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
               <a href="./pages/details.html"  class="btn">Details</a>
            </div>
        </div>`;

    shard.appendChild(div);
  }

  return shard;
}

cardSection.appendChild(createCards(eventData));
