"use strict";

const billInput = document.querySelector("#bill");
const billTitle = document.querySelector(".bill");
const peopleTitle = document.querySelector(".people");
const peopleInput = document.querySelector("#people");
const customInput = document.querySelector("#custom");
const tipAmount = document.querySelector(".card__summary-amount-tip");
const totalAmount = document.querySelector(".card__summary-amount-total");
const tipBtnContainer = document.querySelector(".card__tip");
const allTipBtns = document.querySelectorAll(".btn__tip");
const resetBtn = document.querySelector(".btn__reset");

let selectedTip = +document.querySelector(".btn__tip--selected").dataset
  .tipPercent;
let bill = 0;
let people = 1;

tipBtnContainer.addEventListener("click", (e) => {
  const clickedBtn = e.target.closest(".btn__tip");

  if (e.target === customInput) {
    unselectAllBtns();

    customInput.addEventListener("input", () => {
      selectedTip = customInput.value;
      updateSummary();
    });
  }

  if (!clickedBtn) return;
  unselectAllBtns();

  clickedBtn.classList.add("btn__tip--selected");
  selectedTip = clickedBtn.dataset.tipPercent;
  updateSummary();
});

billInput.addEventListener("input", () => {
  bill = billInput.value;

  removeInvalid(billInput, billTitle);

  if (bill < 0 || !bill) {
    bill = "0";
    addInvalid(billInput, billTitle);
  }
  updateSummary();
});
peopleInput.addEventListener("input", () => {
  people = peopleInput.value;

  removeInvalid(peopleInput, peopleTitle);

  if (people < 1 || !people) {
    people = "1";
    addInvalid(peopleInput, peopleTitle);
  }
  updateSummary();
});

resetBtn.addEventListener("click", () => {
  billInput.value = "";
  peopleInput.value = "";
  customInput.value = "";
  bill = 0;
  updateSummary();
});

const updateSummary = () => {
  const tip = bill * (selectedTip / 100);
  const individualTip = tip / people;
  const individualTotal = bill / people + individualTip;

  tipAmount.textContent = `$${individualTip.toFixed(2)}`;
  totalAmount.textContent = `$${individualTotal.toFixed(2)}`;
};

const unselectAllBtns = () => {
  allTipBtns.forEach((btn) => {
    btn.classList.remove("btn__tip--selected");
  });
};

const addInvalid = (input, label) => {
  input.classList.add("invalid");
  label.classList.add("invalid");
};

const removeInvalid = (input, label) => {
  input.classList.remove("invalid");
  label.classList.remove("invalid");
};
