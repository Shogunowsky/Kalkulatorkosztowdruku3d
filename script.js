const printerPower = 400
const electricityCost = 1.20
const laborCost = 5

const materials = {

pla:{price:55, amortization:0.30},
petg:{price:60, amortization:0.40},
abs:{price:60, amortization:0.50},
tpu:{price:100, amortization:0.60}

}

function convertTime(time){

const parts = time.split(":")

const h = parseFloat(parts[0]) || 0
const m = parseFloat(parts[1]) || 0

return h + (m/60)

}

let chart

document.getElementById("form").addEventListener("submit", function(e){

e.preventDefault()

const czasInput = document.getElementById("czas").value

const czas = convertTime(czasInput)

const filament = parseFloat(document.getElementById("filament").value)

const materialType = document.getElementById("filament_typ").value

const filamentPrice = materials[materialType].price
const amortRate = materials[materialType].amortization

const koszt_materialu = (filament/1000) * filamentPrice

const energia = (printerPower/1000) * czas
const koszt_energii = energia * electricityCost

const koszt_robocizny = czas * laborCost

const koszt_amortyzacji = czas * amortRate

const koszt_calkowity = koszt_materialu + koszt_energii + koszt_robocizny + koszt_amortyzacji

const sugerowana_cena = Math.ceil(koszt_calkowity * 1.4)

document.getElementById("wynik").innerHTML =

`
🧵 Materiał: <b>${koszt_materialu.toFixed(2)} zł</b><br>
⚡ Energia: <b>${koszt_energii.toFixed(2)} zł</b><br>
👷 Robocizna: <b>${koszt_robocizny.toFixed(2)} zł</b><br>
🔧 Amortyzacja: <b>${koszt_amortyzacji.toFixed(2)} zł</b><br>
<br>
💰 Koszt produkcji: <b>${koszt_calkowity.toFixed(2)} zł</b><br>
💵 Sugerowana cena sprzedaży: <b>${sugerowana_cena} zł</b>
`

updateChart(koszt_materialu,koszt_energii,koszt_robocizny,koszt_amortyzacji)

})

function updateChart(material,energy,labor,amort){

const ctx = document.getElementById("chart")

if(chart){
chart.destroy()
}

chart = new Chart(ctx,{

type:'doughnut',

data:{

labels:['Materiał','Energia','Robocizna','Amortyzacja'],

datasets:[{

data:[material,energy,labor,amort]

}]

},

options:{

plugins:{

legend:{

labels:{

color:'white',
font:{size:16}

}

}

}

}

})

}
