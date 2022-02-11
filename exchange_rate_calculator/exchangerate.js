let api = 'https://v6.exchangerate-api.com/v6/5dc95aa75745f0d9a5ac9331/latest/';
"use strict"
let currencyList='';
const fetchCurrencies = async () => {
   const response = await fetch('./currencies.json');
   const data = await response.json();
   const currency = Object.values(data);

   ['#currencyListSelector','#convertedCurrencySelector'].forEach(function(eleId){
      Object.values(currency).map(function(cur){
         currencyList  = cur;
         let newE = document.createElement('option')
         let optionText = document.createTextNode(`${cur.CurrencyCode} - ${cur.Country}`)
         newE.appendChild(optionText);
         newE.setAttribute('value',cur.CurrencyCode);
         newE.setAttribute('data-Country',cur.Country);
         return document.querySelector(eleId).append(newE);
      })      
   })
}
fetchCurrencies();
const calculaterate = async () => {
   document.querySelector('.FinalExchangeRate').innerHTML = "";   
   let selectedCurrency = document.querySelector('#currencyListSelector').value || 'USD';
   let selectedCountryname = document.querySelector("#currencyListSelector").selectedOptions[0].dataset['country'];
   let convertTo = document.querySelector('#convertedCurrencySelector').value === 'Choosecurrecy' ? "USD" : document.querySelector('#convertedCurrencySelector').value;
   let convertToCountryname = document.querySelector("#convertedCurrencySelector").selectedOptions[0].dataset['country'];
   let userValue = document.querySelector('#exchRate').value === '' ? 1 : Number(document.querySelector('#exchRate').value)
   let res = await fetch(`${api}/${selectedCurrency}`);
   let data = await res.json();
   let rate = data.conversion_rates[convertTo];
   
   let calValue = (userValue * rate).toFixed(5);
   document.querySelector('#conRate').setAttribute('value',calValue);   
   document.querySelector('#conRate').value = calValue;   

   document.querySelector('.FinalExchangeRate').innerHTML = 
      `1 ${selectedCurrency} (${selectedCountryname}) 
         = ${rate} ${convertTo} (${convertToCountryname === undefined ? 
            'United States' : convertToCountryname})`;
   
}
document.querySelector("#currencyListSelector").addEventListener('change',calculaterate);
document.querySelector("#convertedCurrencySelector").addEventListener('change',calculaterate);
document.querySelector('#exchRate').addEventListener('input',calculaterate);
document.querySelector('#conRate').addEventListener('input',calculaterate);

