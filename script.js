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

let exchangeRates = {
  PLN: 1,
  EUR: 4.5,
  USD: 4.0
};

const currencySymbols = {
  PLN: "zł",
  EUR: "€",
  USD: "$"
};

async function fetchExchangeRates() {
  try {
    const response = await fetch('https://api.exchangerate.host/latest?base=PLN&symbols=EUR,USD,PLN');
    const data = await response.json();

    // Przeliczamy, bo API zwraca ile PLN jest w 1 EUR i 1 USD
    // My chcemy ile PLN = 1 EUR itd., więc odwracamy kursy
    exchangeRates.EUR = 1 / data.rates.EUR;
    exchangeRates.USD = 1 / data.rates.USD;
    exchangeRates.PLN = 1; // PLN względem PLN

    console.log("Aktualne kursy walut:", exchangeRates);
  } catch (error) {
    console.error('Błąd pobierania kursów:', error);
    // fallback do statycznych kursów (już są w exchangeRates)
  }
}

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
  const totalCostPLN = materialCost + energyCost + laborCost;

  const selectedCurrency = document.getElementById("currency").value;
  const rate = exchangeRates[selectedCurrency];
  const symbol = currencySymbols[selectedCurrency];

  const displayCost = totalCostPLN / rate;

  document.getElementById("totalCost").textContent = displayCost.toFixed(2) + " " + symbol;
}

document.getElementById("language").addEventListener("change", function () {
  updateLanguage(this.value);
  calculate();
});

document.getElementById("currency").addEventListener("change", calculate);

// Pobierz kursy walut i inicjuj kalkulator
fetchExchangeRates().then(() => {
  updateLanguage("pl");
  calculate();
});
