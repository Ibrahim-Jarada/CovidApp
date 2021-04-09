let userCountryCode = "CHN";
let countrycodes=[]; // object countrycode:api key
let latestDataSummary=[];
let userDataSummary=[];

window.onload = () => {
    getRegions();
    getUserCountryCodeFromIp();
    getLatestDataSummary()
    .then(getUserDataSummary);
  }

  function getUserCountryCodeFromIp() {
    let url='https://get.geojs.io/v1/ip/country.json';
   return fetch(url)
    .then(res=>res.json())
    .then(data=>alert(userCountryCode=data['country_3']))
    
  }
  
  function getLatestDataSummary(){
    url='https://api.quarantine.country/api/v1/summary/latest'
    return fetch(url)
    .then(res=>res.json())
    .then(res2=>latestDataSummary=res2.data)
  }
  function getRegions(){
    let url='https://api.quarantine.country/api/v1/regions'
    fetch(url)
    .then(res=>res.json())
    .then(res2=>res2['data'].forEach(element => {
      countrycodes[element.iso3166a3]=element.key;
    }))
  }
  
  function getUserDataSummary(){
    userDataSummary=latestDataSummary.regions[countrycodes[userCountryCode]];
    alert('done')
  }
    