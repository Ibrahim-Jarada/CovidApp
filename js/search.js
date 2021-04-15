let countryName = "none";
let countryData = [];
let latestDataSummary = [];
let regions = [];
let countrycodes = [];
let dataList = document.getElementById("countries");
let countriesInputList = document.getElementById("selectedCountry");
let countries = {};
let top1;
let top2;
let top3;
var top1Data;
var top2Data;
var top3Data;
const top1Ratio=document.getElementById('top1-ratio')
const top1Percentage=document.getElementById('top1-percentage')
const top2Ratio=document.getElementById('top2-ratio')
const top2Percentage=document.getElementById('top2-percentage')
const top3Ratio=document.getElementById('top3-ratio')
const top3Percentage=document.getElementById('top3-percentage')
let top1RatioValue;
let top2RatioValue;
let top3RatioValue;
const top1div=document.getElementById('top1-header')
const top2div=document.getElementById('top2-header')
const top3div=document.getElementById('top3-header')


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
  getRegions()
  getLatestDataSummary()
  .then(getTop3Countries)
  .then(getTop3Ratios)
  .then(showTop3Data)
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

function getTop3Countries(){
  let max=0;
  regions=latestDataSummary['regions'];
    for (key in  regions) {
      if(regions[key]['total_cases']>max ){
        max=regions[key]['total_cases'];
        top1=key;
      }
    }
    var {[top1]:tempVar, ...regions}= regions;
    top1Data=tempVar;
    max=0;
    for (key in  regions) {
      if(regions[key]['total_cases']>max ){
        max=regions[key]['total_cases'];
        top2=key;
      }
    }
    var {[top2]:tempVar, ...regions}= regions;
    top2Data=tempVar;
    max=0;
    for (key in  regions) {
      if(regions[key]['total_cases']>max ){
        max=regions[key]['total_cases'];
        top3=key;
      }
    }
    var {[top3]:tempVar, ...regions}= regions;
    top3Data=tempVar;
    regions=latestDataSummary['regions'];
  }

  function getTop3Ratios(){
    top1RatioValue=top1Data['total_cases']/latestDataSummary['summary']['total_cases'];
    top2RatioValue=top2Data['total_cases']/latestDataSummary['summary']['total_cases'];
    top3RatioValue=top3Data['total_cases']/latestDataSummary['summary']['total_cases'];

  }

  function showTop3Data(){
    top1div.textContent=top1Data['name'];
    top2div.textContent=top2Data['name'];
    top3div.textContent=top3Data['name'];

    top1Ratio.style.setProperty('stroke-dashoffset',(314-314*top1RatioValue).toString())
    top1Percentage.textContent=`${parseInt(top1RatioValue*1000)/10}%`
    top2Ratio.style.setProperty('stroke-dashoffset',(314-314*top2RatioValue).toString())
    top2Percentage.textContent=`${parseInt(top2RatioValue*1000)/10}%`
    top3Ratio.style.setProperty('stroke-dashoffset',(314-314*top3RatioValue).toString())
    top3Percentage.textContent=`${parseInt(top3RatioValue*1000)/10}%`

  }


function showData() {
  countryname.textContent = countryData["name"];

  totalcasesnum.textContent = countryData["total_cases"];
  totalcasesnum.style.color = "#1d4439";
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