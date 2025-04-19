const labelImage = document.getElementById("imagelabel");
const inputImage = document.getElementById("image");
const backimage = document.getElementById("backimage");
const span = document.querySelector("#imagelabel span");
const buttons = document.querySelector(".buttons");
const changeButt = document.getElementById("change");
const removeButt = document.getElementById("remove");
const submitButt = document.getElementById("submit");

inputImage.addEventListener("change", uploadimage);

function uploadimage() {
  let urllink = URL.createObjectURL(inputImage.files[0]);

  if (inputImage.files[0].size / 1024 > 500) {
    showSmall(inputImage.id);
  } else {
    backimage.src = urllink;
    backimage.style.padding = "0px";
    backimage.style.width = "40px";
    backimage.style.height = "40px";
    span.style.display = "none";
    buttons.style.display = "block";
    hideSmall(inputImage.id);
  }
}

labelImage.addEventListener("dragover", (e) => {
  e.preventDefault();
});

labelImage.addEventListener("drop", (e) => {
  e.preventDefault();
  inputImage.files = e.dataTransfer.files;
  uploadimage();
});

changeButt.addEventListener("click", function (event) {
  event.preventDefault();
  inputImage.click();
});

removeButt.addEventListener("click", function (event) {
  event.preventDefault();
  backimage.src = "./assets/images/icon-upload.svg";
  backimage.style.padding = "10px";
  backimage.style.width = "30px";
  backimage.style.height = "30px";
  span.style.display = "block";
  buttons.style.display = "none";
});

submitButt.addEventListener("click", (e) => {
  e.preventDefault();

  const name = document.getElementById("name");
  const emil = document.getElementById("email");
  const gethub = document.getElementById("gethub");
  const modal = document.getElementById("ticket-modal");
  const ticketContainer = document.getElementById("ticket-container");
  const closeModal = document.getElementById("close-modal");

  let reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let daten = new Date();

  inputImage.files[0] === undefined ? showSmall(inputImage.id) : hideSmall(inputImage.id);
  reg.test(emil.value) ? hideSmall(emil.id) : showSmall(emil.id);
  name.value === "" ? showSmall(name.id) : hideSmall(name.id);
  gethub.value === "" ? showSmall(gethub.id) : hideSmall(gethub.id);

  if (gethub.value !== "" && reg.test(emil.value) && name.value !== "" && inputImage.files[0] !== undefined) {
    ticketContainer.innerHTML = "";

    const ticket = document.createElement("div");
    ticket.className = "ticket";

    const ticketHeader = document.createElement("div");
    ticketHeader.className = "ticket-header";
    ticketHeader.innerHTML = `<img src="./assets/images/logo-full.svg" alt="Logo" />`;

    const ticketBody = document.createElement("div");
    ticketBody.className = "ticket-body";
    ticketBody.innerHTML = `
      <div class="ticket-left">
        <p class="ticket-event">Dev Conference 2025</p>
        <p class="ticket-name">${name.value}</p>
        <p class="ticket-venue">Venue: Event Hall, Tech City</p>
        <p class="ticket-date">Date: ${daten.getFullYear()}/${daten.getMonth() + 1}/${daten.getDate()}</p>
        <p class="ticket-time">Time: 8:00 PM</p>
        <p class="ticket-id">Ticket #: #${Math.floor(Math.random() * 9000 + 1000)}</p>
      </div>
      <div class="ticket-divider"></div>
      <div class="ticket-right">
        <img src="${URL.createObjectURL(inputImage.files[0])}" alt="Avatar" class="ticket-avatar" />
        <div class="ticket-github">
          <img src="./assets/images/icon-github.svg" alt="GitHub Icon" />
          <p>${gethub.value}</p>
        </div>
        <div class="ticket-barcode"></div>
      </div>
    `;

    ticket.appendChild(ticketHeader);
    ticket.appendChild(ticketBody);
    ticketContainer.appendChild(ticket);

    modal.style.display = "flex";

    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  }
});

function showSmall(id) {
  let small = document.getElementById(`small-${id}`);
  small.style.display = "block";
}

function hideSmall(id) {
  let small = document.getElementById(`small-${id}`);
  small.style.display = "none";
}