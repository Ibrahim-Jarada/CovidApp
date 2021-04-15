let countryName = "none";
let countryData = [];
let latestDataSummary = [];
let regions = [];
let countrycodes = [];
let dataList = document.getElementById("countries");
let countriesInputList = document.getElementById("selectedCountry");
let countries = {};

const countryname = document.querySelector(".country-name");

const totalcasesnum = document.querySelector("#total-cases ");
const totalcases = document.querySelector(".total-cases ");

const activecasesnum = document.querySelector("#active-cases");
const activecases = document.querySelector(".active-cases");

const deathcasesnum = document.querySelector("#death-cases");
const deathcases = document.querySelector(".death-cases");

const infected = document.querySelector("#infected");
const infectedtext = document.querySelector(".infectedtext");

const death = document.querySelector("#death");
const deathtext = document.querySelector(".deathtext");

var searchCounty = document.getElementById("search-button");
searchCounty.addEventListener("click", onClick);

let country_list_element = document.getElementById("menu-item");
function setCountryName() {
  if (countries[countriesInputList.value]) {
    countryName = countries[countriesInputList.value];
  }
}
window.onload = () => {
  getRegions();
  getLatestDataSummary();
};
function onClick() {
  setCountryName();
  countryData = latestDataSummary.regions[countryName];
  showData();
}

function getRegions() {
  let url = "https://api.quarantine.country/api/v1/regions";
  fetch(url)
    .then((res) => res.json())
    .then((res2) =>
      res2["data"].forEach((element) => {
        countries[element["name"]] = element["key"];
        countrycodes[element.iso3166a3] = element.key;
      })
    )
    .then(() => (countries["Taiwan"] = "taiwan"))
    .then(() => createDatalist());
}

function createDatalist() {
  for (key in countries) {
    createNewOption = () => {
      const option = document.createElement("option");
      option.value = key;
      dataList.appendChild(option);
    };
    createNewOption();
  }
}

function getLatestDataSummary() {
  url = "https://api.quarantine.country/api/v1/summary/latest";
  return fetch(url)
    .then((res) => res.json())
    .then((res2) => (latestDataSummary = res2.data));
}

function showData() {
  countryname.textContent = countryData["name"];

  totalcasesnum.textContent = countryData["total_cases"];
  totalcasesnum.style.color = "#00C48C";
  totalcases.textContent = ` Total cases:       `;
  totalcases.appendChild(totalcasesnum);

  activecasesnum.textContent = countryData["active_cases"];
  activecasesnum.style.color = "#FF647C";
  activecases.textContent = ` Active cases:       `;
  activecases.appendChild(activecasesnum);

  infected.textContent = countryData.change["recovered"];
  infectedtext.textContent = ` recovered cases reported `;
  infected.appendChild(infectedtext);

  deathcasesnum.innerText = countryData["deaths"];
  deathcasesnum.style.color = "#382d2d9f";
  deathcases.textContent = ` Death cases:       `;
  deathcases.appendChild(deathcasesnum);

  death.textContent = countryData.change["deaths"];
  deathtext.textContent = ` died cases reported `;
  death.appendChild(deathtext);
}
