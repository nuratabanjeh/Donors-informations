'use strict';
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}
var allDonators = [];
var headerArray = ['Donor Name', 'Donor Age', 'Amount']
function Donators(donorName, amount) {
    this.donorName = donorName;
    this.amount = amount;
    this.minAge = 18;
    this.maxAge = 30;
    this.age = 0;
    allDonators.push(this);

}
let submit = document.getElementById('form');
submit.addEventListener('submit', getDataFromForm);
Donators.prototype.getAge = function () {
    for (let i = 0; i < allDonators.length; i++) {
        this.age = getRandomInt(this.minAge, this.maxAge);

    }
}


function getDataFromForm(event) {
    event.preventDefault();
    let newName = event.target.donorName.value;
    let newAmount = event.target.amount.value;

    let newDonator = new Donators(newName, newAmount);
    newDonator.getAge();
    saveData();
    newDonator.render();
}

function saveData() {
    let theDonators = JSON.stringify(allDonators);
    localStorage.setItem('myDonators', theDonators);
    getDonatorData();
}
function getDonatorData() {
    let info = localStorage.getItem('myDonators');
    let userDonator = JSON.parse(info);
    return userDonator;
}

let table = document.createElement('table');
table.id = 'table';
let bigTable = document.getElementById('donationInfo');
bigTable.appendChild(table);
function headRow() {
    let tHeader = document.createElement('thead');
    table.appendChild(tHeader);
    let tableHeadRow = document.createElement('tr');
    tHeader.appendChild(tableHeadRow);
    for (let x = 0; x < headerArray.length; x++) {
        let cell = document.createElement('th');
        tableHeadRow.appendChild(cell);
        cell.textContent = headerArray[x];



    }
}
Donators.prototype.render = function () {
    document.getElementById('table').innerHTML = '';
    headRow();
    let tableBody = document.createElement('tbody');
    table.appendChild(tableBody);
    let donatorData = getDonatorData();
    for (let y = 0; y < donatorData.length; y++) {
        let donatorRow = document.createElement('tr');
        tableBody.appendChild(donatorRow);
        let donatorName = document.createElement('td');
        donatorRow.appendChild(donatorName);
        donatorName.textContent = donatorData[y].donorName;
        let donatorAge = document.createElement('td');
        donatorRow.appendChild(donatorAge);
        donatorAge.textContent = donatorData[y].age;
        let donationAmount = document.createElement('td');
        donatorRow.appendChild(donationAmount);
        donationAmount.textContent = donatorData[y].amount;


    }
}