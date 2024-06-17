'use strict'
const baseURL = "https://v6.exchangerate-api.com/v6/d00ea8c9b521b161f2380f97/latest/";




const dropdowns = document.querySelectorAll('.dropdown select');
const btn = document.querySelector('form button');
const fromCurr = document.querySelector('.from select');
const toCurr = document.querySelector('.to select');
const msg = document.querySelector('.msg');

for (let select of dropdowns) {
    for (let countryCode in countryList) {
        let option = document.createElement("option");
        option.innerText = countryCode;
        option.value = countryCode;
        if (select.name === 'from' && countryCode === 'USD') {
            option.selected = 'selected';
        }
        if (select.name === 'to' && countryCode === 'INR') {
            option.selected = 'selected';
        }
        select.append(option);
    }
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}


const updateFlag = (element) => {
    let country = element.value
    let countryCode = countryList[country];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener('click', async (evt) => {
    evt.preventDefault()
    let amount = document.querySelector('.amount input')
    let amtVal = amount.value
    if (amtVal === '' || amtVal < 1) {
        amtVal = 1;
        amount.value = '1';
    }
    // console.log(fromCurr.value, toCurr.value);
    const url = `https://v6.exchangerate-api.com/v6/d00ea8c9b521b161f2380f97/latest/${fromCurr.value}`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        let finalAmt = data.conversion_rates[toCurr.value] * amtVal;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
        // textContent
    })



});




// hi
//     let data = await response.json();
//     let exchangeRate = data.conversion_rates[toCurr.value];
//     let finalAmt = exchangeRate * amtVal;
//     msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;

