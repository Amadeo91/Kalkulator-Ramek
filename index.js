import { dataProfile, dataGlass } from "./data.js";

const form = document.querySelector(".form");
const price = document.querySelector(".price-container__result");

let selectedProfile;
let selectedGlass;

let profileResult = 0;
let glassResult = 0;
let subtract = 0;
let num = 5;

const selectOption = () => {
  const profilePrice = document.querySelector(".price-info__profile");
  const glassPrice = document.querySelector(".price-info__glass");
  const profiles = document.querySelector("#profile");
  const glass = document.querySelector("#glass");

  dataProfile.forEach((element) => {
    const selectProfile = () => {
      const selectedOption = profiles.options[profiles.selectedIndex];

      if (selectedOption.value === element.name) {
        selectedProfile = element;
        profilePrice.innerText = `${Number(element.price)} zł`;
        calculatePrice();
      }
    };

    profiles.addEventListener("change", selectProfile);
    profiles.selectedIndex = 0;
    selectProfile();
  });

  dataGlass.forEach((element) => {
    const selectGlass = () => {
      const selectedOption = glass.options[glass.selectedIndex];

      if (selectedOption.value === element.name) {
        selectedGlass = element;
        glassPrice.innerText = `${Number(element.price)} zł`;
        calculatePrice();
      }
    };

    glass.addEventListener("change", selectGlass);
    profiles.selectedIndex = 0;
    selectGlass();
  });
};

const choosePercents = () => {
  const btnPercent = document.querySelectorAll(".percent button");

  btnPercent.forEach((option) => {
    option.addEventListener("click", () => {
      const percent = Number(option.value);
      subtract = profileResult * percent;
      num -= num * percent;
      calculatePrice();
    });
  });
};

const checkGlass = () => {
  const isGlass = document.querySelector(".checkbox__glass");
  const glassPanel = document.querySelector(".glass-container");
  const divPercent = document.querySelector(".percent");

  if (isGlass.checked) {
    glassPanel.removeAttribute("hidden");
    divPercent.setAttribute("hidden", "");
  } else {
    glassPanel.setAttribute("hidden", "");
    divPercent.removeAttribute("hidden");
  }

  calculatePrice();
};

const getPrice = () => {
  const amount = document.querySelector(".amount input");
  const dimensions = document.querySelectorAll(".profile-dimensions input");
  const holes = document.querySelector(".additional-holes input");

  const amountValue = Number(amount.value);
  const valueA = Number(dimensions[0].value);
  const valueB = Number(dimensions[1].value);

  const meters = (valueA + valueB) * 2;
  const addHoles = Number(holes.value * 3);
  choosePercents();
  profileResult =
    ((Number(selectedProfile.price) * meters) / 1000 + 45 + addHoles) *
    amountValue;

  if (document.querySelector(".checkbox__glass").checked) {
    glassResult =
      ((Number(valueA * valueB) * selectedGlass.price) / 1000000 + num) *
      amountValue;
  } else {
    glassResult = 0;
  }

  calculatePrice();
};

const calculatePrice = () => {
  let finalPrice = profileResult - subtract + glassResult;
  price.innerText = `Cena: ${finalPrice.toFixed(2)} zł`;
};

const handleBtnClick = (e) => {
  e.preventDefault();
  getPrice();
};

selectOption();

form.addEventListener("submit", handleBtnClick);
document
  .querySelector(".checkbox__glass")
  .addEventListener("click", checkGlass);
