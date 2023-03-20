const eventData = await fetch("../data/amazing.json")
  .then((res) => res.json())
  .then((data) => {
    return data.events;
  });
const cardSection = document.getElementById("card-section");
const queryString = location.search;
const params = new URLSearchParams(queryString);
const eventID = params.get("id");

const event = eventData.find((event) => event._id == eventID);

let str = event.assistance
  ? `Assistance: ${event.assistance} people`
  : `Estimated assistance: ${event.estimate} people`;

function printDetail(e, container) {
  let aux = `<div class="card flex-md-row box-shadow h-md-250">
                <section class="card-body d-flex flex-column align-items-start gap-3 p-5">
                    <h2 class="mb-2">${e.name}</h2>
                    <div class="mb-1 text-muted">${e.date}</div>
                    <p class="card-text mb-auto">${e.description}</p>
                    <p class="card-text mb-auto">This event takes place in ${e.place}, it has the capacity for 
                    ${e.capacity} people.</p>
                    <p class="card-text mb-auto">${str}</p>
                    <p class="card-text mb-auto">The current price for this event is: $${e.price} </p>
                </section>
                <img class="card-img-right flex-auto d-none d-lg-block object-fit-fill" style="width: 30rem;" alt="thumbnail"
                    src="${e.image}">
    </div>`;

  container.innerHTML = aux;
}

printDetail(event, cardSection);
