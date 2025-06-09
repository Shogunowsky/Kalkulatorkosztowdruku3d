const translations = {
  pl: {
    title: "Kalkulator kosztów druku 3D",
    timeHours: "Czas pracy – godziny:",
    timeMinutes: "Czas pracy – minuty:",
    filament: "Ilość filamentu (g):",
    filamentPrice: "Cena filamentu za 1 kg (zł):",
    powerUsed: "Zużycie energii (kWh):",
    powerCost: "Cena 1 kWh (zł):",
    laborRate: "Stawka roboczogodziny (zł/h):",
    calculate: "Oblicz",
    resultTitle: "Wynik:",
    resultText: "Całkowity koszt: "
  },
  en: {
    title: "3D Printing Cost Calculator",
    timeHours: "Working time – hours:",
    timeMinutes: "Working time – minutes:",
    filament: "Filament used (g):",
    filamentPrice: "Filament price per 1 kg (PLN):",
    powerUsed: "Energy used (kWh):",
    powerCost: "Electricity cost (PLN/kWh):",
    laborRate: "Labor cost (PLN/h):",
    calculate: "Calculate",
    resultTitle: "Result:",
    resultText: "Total cost: "
  }
};

function updateLanguage(lang) {
  const t = translations[lang];
  document.querySelector('h1').textContent = t.title;
  document.querySelector('label[for="hours"]').textContent = t.timeHours;
  document.querySelector('label[for="minutes"]').textContent = t.timeMinutes;
  document.querySelector('label[for="filament"]').textContent = t.filament;
  document.querySelector('label[for="filamentPrice"]').textContent = t.filamentPrice;
  document.querySelector('label[for="power"]').textContent = t.powerUsed;
  document.querySelector('label[for="powerCost"]').textContent = t.powerCost;
  document.querySelector('label[for="labor"]').textContent = t.laborRate;
  document.querySelector('button').textContent = t.calculate;
  document.querySelector('.result-title').textContent = t.resultTitle;
  document.querySelector('.result-cost-label').textContent = t.resultText;
}

document.getElementById("language").addEventListener("change", function () {
  updateLanguage(this.value);
});
updateLanguage("pl");

function calculate() {
  const hours = parseFloat(document.getElementById("hours").value) || 0;
  const minutes = parseFloat(document.getElementById("minutes").value) || 0;
  const filament = parseFloat(document.getElementById("filament").value) || 0;
  const filamentPrice = parseFloat(document.getElementById("filamentPrice").value) || 0;
  const power = parseFloat(document.getElementById("power").value) || 0;
  const powerCost = parseFloat(document.getElementById("powerCost").value) || 0;
  const laborRate = parseFloat(document.getElementById("labor").value) || 0;

  const totalTime = hours + (minutes / 60);
  const materialCost = (filament / 1000) * filamentPrice;
  const energyCost = power * powerCost;
  const laborCost = totalTime * laborRate;
  const totalCost = materialCost + energyCost + laborCost;

  document.getElementById("totalCost").textContent = totalCost.toFixed(2) + " zł";
}
