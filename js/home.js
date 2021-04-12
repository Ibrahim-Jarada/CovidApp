let userCountryCode = "CHN";
let countrycodes=[]; // object countrycode:api key
let latestDataSummary=[];
let userDataSummary=[];
const totalCasesNum=document.getElementById('total-cases-num')
const activeCasesNum=document.getElementById('active-cases-num')
const deathsNum=document.getElementById('deaths-num')
const recoverdNum =document.getElementById('recoverd-num')
const welcome=document.getElementById('welcome')
const deathRatio=document.getElementById('death-ratio')
const recoveryRatio=document.getElementById('recovery-ratio')
const deathPercentage=document.getElementById('death-percentage')
const recoveryPercentage=document.getElementById('recovery-percentage')
let wantToReload=false;


window.onload = () => {
    getRegions();
    getUserCountryCodeFromIp()
    .then(getLatestDataSummary)
    .then(getUserDataSummary)
    .then(showData)
    .catch(()=>{wantToReload=confirm('It seems that your connection is unstable. Do you want to reload the page?');if(wantToReload) location.reload()})
  }

  function getUserCountryCodeFromIp() {
    let url='https://get.geojs.io/v1/ip/country.json';
   return fetch(url)
    .then(res=>res.json())
    .then(data=>userCountryCode=data['country_3'])
    
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
  }
  function showData(){
totalCasesNum.textContent=userDataSummary['total_cases']
activeCasesNum.textContent=userDataSummary['active_cases']
deathsNum.textContent=userDataSummary['deaths']
recoverdNum.textContent=userDataSummary['recovered']
welcome.innerText=`People of ${userDataSummary['name']} \n You Are Welcome`
deathRatio.style.setProperty('stroke-dashoffset',(314-314*userDataSummary['death_ratio']).toString())
recoveryRatio.style.setProperty('stroke-dashoffset',(314-314*userDataSummary['recovery_ratio']).toString())
deathPercentage.textContent=`${parseInt(userDataSummary['death_ratio']*1000)/10}%`
recoveryPercentage.textContent=`${parseInt(userDataSummary['recovery_ratio']*1000)/10}%`

  }
    