function printAvrahamSuite(){
    console.log("For BetKnest");
    console.log("For Holidays");
    console.log("For Wedding");
}

console.log("start!!! ")

printAvrahamSuite();

console.log("end!!! ")


const countriesApi = "https://restcountries.com/v3.1/all";

fetch(countriesApi)
    .then(response => response.json())
    .then(data =>{
        console.log("start!!! ")
        console.log(data);
    })
    .catch(error => console.error(error));

console.log("end!!! ")