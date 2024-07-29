const form = document.getElementById("form");
const tipOutput = document.getElementById("output-tip");
const totalOutput = document.getElementById("output-total");
const resetButton = document.getElementById("button-reset");

let billTotal = 0;
let tipPercentage = 0;
let peopleCount = 0;

// Function to validate input
function validateInput(e) {
  let isValid = true;

  // Update bill total when bill input changes
  if (e.target.id === "input-bill") {
    billTotal = e.target.value ? e.target.value : 0;
  }

  // Update tip percentage when tip button/input changes
  if (e.target.dataset.tip) {
    form
      .querySelectorAll("[data-tip]")
      .forEach((el) => el.classList.remove("active"));

    e.target.classList.add("active");

    tipPercentage =
      e.target.dataset.tip === "custom"
        ? e.target.value || 0
        : e.target.dataset.tip;
  }

  // Validate & update number of people
  if (e.target.id === "input-people") {
    peopleCount = e.target.value ? e.target.value : 0;

    if (peopleCount === 0) {
      e.target.parentNode.classList.add("error");
      e.target.parentNode.querySelector(".message").innerText = "Can't be zero";
      isValid = false;
    } else {
      e.target.parentNode.classList.remove("error");
      e.target.parentNode.querySelector(".message").innerText = "";
    }
  }

  // Update outputs if all inputs are valid
  if (isValid && billTotal > 0 && peopleCount > 0) {
    updateOutput();
  }
}

// Function to calculate and display tip and total amounts per person
function updateOutput() {
  const tipPerPerson = (billTotal / peopleCount) * (tipPercentage / 100);
  const totalPerPerson = billTotal / peopleCount + tipPerPerson;

  tipOutput.innerText = tipPerPerson.toFixed(2);
  totalOutput.innerText = totalPerPerson.toFixed(2);
}

// Function to reset the form and output fields
function resetForm() {
  form.reset();
  billTotal = 0;
  tipPercentage = 0;
  peopleCount = 0;
  tipOutput.innerText = "0.00";
  totalOutput.innerText = "0.00";
  form
    .querySelectorAll("[data-tip]")
    .forEach((el) => el.classList.remove("active"));
  form
    .querySelectorAll(".error")
    .forEach((element) => element.classList.remove("error"));
  form
    .querySelectorAll(".message")
    .forEach((element) => (element.innerText = ""));
}

// Event listeners for user interactions
form.addEventListener("click", validateInput);
form.addEventListener("input", validateInput);
resetButton.addEventListener("click", resetForm);
