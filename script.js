const power = 400;
const electricityPrice = 1.20;
const hourlyRate = 5;

const filamentPrices = {
pla:55,
petg:33,
abs:65,
tpu:45
};

const timeInput = document.getElementById("time");
const weightInput = document.getElementById("weight");
const filamentSelect = document.getElementById("filament");

const materialCostText = document.getElementById("materialCost");
const energyCostText = document.getElementById("energyCost");
const laborCostText = document.getElementById("laborCost");
const totalCostText = document.getElementById("totalCost");
const salePriceText = document.getElementById("salePrice");
const profitabilityText = document.getElementById("profitability");

const ctx = document.getElementById('costChart');

let chart = new Chart(ctx,{
type:'doughnut',
data:{
labels:['Materiał','Energia','Robocizna'],
datasets:[{
data:[0,0,0],
backgroundColor:[
'#22c55e',
'#3b82f6',
'#f59e0b'
]
}]
},
options:{
plugins:{
legend:{
labels:{
color:'white'
}
}
}
}
});

function convertTimeToHours(timeString){

if(!timeString.includes(":")) return 0;

const parts = timeString.split(":");

const hours = parseFloat(parts[0]) || 0;
const minutes = parseFloat(parts[1]) || 0;

return hours + (minutes / 60);

}

function calculate(){

const timeString = timeInput.value;

const time = convertTimeToHours(timeString);

const weight = parseFloat(weightInput.value) || 0;
const filament = filamentSelect.value;

const filamentPricePerGram = filamentPrices[filament] / 1000;

const materialCost = weight * filamentPricePerGram;
const energyCost = (power/1000) * time * electricityPrice;
const laborCost = time * hourlyRate;

const totalCost = materialCost + energyCost + laborCost;

const salePrice = totalCost * 1.4;

materialCostText.textContent = materialCost.toFixed(2) + " zł";
energyCostText.textContent = energyCost.toFixed(2) + " zł";
laborCostText.textContent = laborCost.toFixed(2) + " zł";
totalCostText.textContent = totalCost.toFixed(2) + " zł";
salePriceText.textContent = salePrice.toFixed(2) + " zł";

if(totalCost < 10){
profitabilityText.textContent = "🟢 Bardzo opłacalny wydruk";
}
else if(totalCost < 30){
profitabilityText.textContent = "🟡 Średni koszt wydruku";
}
else{
profitabilityText.textContent = "🔴 Drogi wydruk";
}

chart.data.datasets[0].data = [
materialCost,
energyCost,
laborCost
];

chart.update();

}

timeInput.addEventListener("input",calculate);
weightInput.addEventListener("input",calculate);
filamentSelect.addEventListener("change",calculate);

calculate();
